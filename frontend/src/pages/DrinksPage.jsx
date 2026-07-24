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
            <h1>Drinks</h1>

            <button type={"button"} onClick={handleAddClick}>
                Add Drink
            </button>

            {
                isModalOpen && (
                    <DrinkAddEdit
                        drink={selectedDrink}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveDrink}/>
                )}

            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Einkaufspreis</th>
                    <th>Verkaufspreis</th>
                    <th>Faktor</th>
                    <th>Menge</th>
                    <th>Gesamtwert</th>
                </tr>
                </thead>
                <tbody>
                {drinks.map(drink => (
                    <tr key={drink.id}>
                        <td>{drink.id}</td>
                        <td>{drink.name}</td>
                        <td>{drink.purchasePrice}</td>
                        <td>{drink.sellingPrice}</td>
                        <td>{drink.factor}</td>
                        <td>{drink.amount}</td>
                        <td>{drink.totalValue}</td>
                        <td>
                            <button type={"button"} onClick={() => handleEditClick(drink)}>
                                Edit
                            </button>
                            <button type={"button"} onClick={() => handleDeleteDrink(drink.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DrinksPage;