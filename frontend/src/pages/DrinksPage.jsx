import {useEffect, useState} from "react";
import DrinkAddEdit from "../components/drink/DrinkAddEdit.jsx";

function DrinksPage() {
    const [drinks, setDrinks] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadDrinks();
    }, [])

    function loadDrinks() {
        //TODO: find a way to put this into application.properties
        fetch("http://localhost:8080/drinks")
            .then(response => response.json())
            .then(data => setDrinks(data));
    }

    async function handleSaveDrink(drink) {
        const isEditMode = drink.id && drink.id > 0;
        const url = isEditMode
            ? `http://localhost:8080/drinks/${drink.id}`
            : "http://localhost:8080/drinks";

        const method = isEditMode ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(drink)
        });

        if (!response.ok) {
            throw new Error("Drink could not be saved!")
        }

        loadDrinks();
    }

    function handleEditClick(drink) {
        setSelectedDrink(drink);
        setIsModalOpen(true);
    }

    function handleAddClick() {
        setSelectedDrink(null);
        setIsModalOpen(true);
    }

    async function handleDeleteDrink(id) {
        const response = await fetch(`http://localhost:8080/drinks/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Drink could not be deleted!");
        }

        loadDrinks();
    }

    return (
        <div>
            <h1 className={"text-3xl font-bold text-gray-800 text-center"}>
                Getränke
            </h1>

            <button
                className={"hover:bg-blue-500 hover:scale-105 bg-blue-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-3 transition"}
                onClick={handleAddClick}>
                Add Drink
            </button>

            {
                isModalOpen && (
                    <DrinkAddEdit
                        drink={selectedDrink}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveDrink}/>
                )}

            <div className={"overflow-x-auto rounded-xl shadow"}>

                <table className={"min-w-full bg-white text-sm text-left"}>
                    <thead className={"bg-gray-200 text-gray-600 uppercase text-xs"}>
                    <tr>
                        <th className={"px-6 py-3"}>Id</th>
                        <th className={"px-6 py-3"}>Name</th>
                        <th className={"px-6 py-3"}>Einkaufspreis</th>
                        <th className={"px-6 py-3"}>Verkaufspreis</th>
                        <th className={"px-6 py-3"}>Faktor</th>
                        <th className={"px-6 py-3"}>Menge</th>
                        <th className={"px-6 py-3"}>Gesamtwert</th>
                        <th className={"px-6 py-3"}>Aktionen</th>
                    </tr>
                    </thead>
                    <tbody className={"divide-y divide-gray-100"}>
                    {drinks.map(drink => (
                        <tr key={drink.id} className={"hover:gb-grey-50 transition"}>
                            <td className={"px-6 py-3"}>{drink.id}</td>
                            <td className={"px-6 py-3"}>{drink.name}</td>
                            <td className={"px-6 py-3"}>{drink.purchasePrice}</td>
                            <td className={"px-6 py-3"}>{drink.sellingPrice}</td>
                            <td className={"px-6 py-3"}>{drink.factor}</td>
                            <td className={"px-6 py-3"}>{drink.amount}</td>
                            <td className={"px-6 py-3"}>{drink.totalValue}</td>
                            <td>
                                <button
                                    className={"hover:bg-blue-500 hover:scale-105 bg-blue-300 text-black shadow-md rounded px-3 py-1 m-1 transition"}
                                    onClick={() => handleEditClick(drink)}>
                                    Edit
                                </button>
                                <button
                                    className={"hover:bg-blue-500 hover:scale-105 bg-blue-300 text-black shadow-md rounded px-3 py-1 m-1 transition"}
                                    onClick={() => handleDeleteDrink(drink.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DrinksPage;