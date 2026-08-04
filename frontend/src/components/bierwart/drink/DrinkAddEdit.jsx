import {useEffect, useState} from "react";

function DrinkAddEdit({drink, onClose, onSave}) {
    const [name, setName] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [factor, setFactor] = useState("");
    const [amount, setAmount] = useState("");
    const [totalValue, setTotalValue] = useState("");

    useEffect(() => {
        if (drink) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(drink.name)
            setPurchasePrice(drink.purchasePrice)
            setSellingPrice(drink.sellingPrice)
            setFactor(drink.factor)
            setAmount(drink.amount)
            setTotalValue(drink.totalValue)
        } else {
            setName("")
            setPurchasePrice("")
            setSellingPrice("")
            setFactor("")
            setAmount("")
            setTotalValue("")
        }
    }, [drink]);

    async function handleSubmit(event) {
        event.preventDefault();

        const savedDrink = {
            id: drink ? drink.id : 0,
            name: name,
            purchasePrice: Number(purchasePrice),
            sellingPrice: Number(sellingPrice),
            factor: Number(factor),
            amount: Number(amount),
            totalValue: Number(totalValue)
        }

        await onSave(savedDrink)
        onClose();
    }

    return (
        <div className={"fixed inset-0 bg-black/50 flex items-center justify-center z-50"}>
            <div className={"bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"}>

                <h2 className={"text-2xl font-bold text-gray-800 mb-6"}>
                    {drink ? "Edit Drink" : "Add Drink"}
                </h2>

                <form
                    className={"grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4"}
                    onSubmit={handleSubmit}>
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Name:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"text"}
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Einkaufspreis:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"number"}
                        value={purchasePrice}
                        onChange={event => setPurchasePrice(event.target.value)}
                    />
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Faktor:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"number"}
                        value={factor}
                        onChange={event => setFactor(event.target.value)}
                    />
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Anzahl:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"number"}
                        value={amount}
                        onChange={event => setAmount(event.target.value)}
                    />

                    <div className={"col-span-2 flex justify-end gap-3 mt-2"}>
                        <button
                            className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-6 py-2 m-1 transition"}
                            type={"submit"}>
                            Save
                        </button>
                        <button
                            className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-6 py-2 m-1 transition"}
                            type={"button"} onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DrinkAddEdit;