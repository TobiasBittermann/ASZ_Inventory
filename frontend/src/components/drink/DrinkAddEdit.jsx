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

    function handleSubmit(event) {
        event.preventDefault();

        const savedDrink = {
            id: drink ? drink.id : 0,
            name,
            purchasePrice: Number(purchasePrice),
            sellingPrice: Number(sellingPrice),
            factor: Number(factor),
            amount: Number(amount),
            totalValue: Number(totalValue)
        }

        onSave(savedDrink)
        onClose();
    }

    return (
        <div>
            <h2>{drink ? "Edit Drink" : "Add Drink"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type={"text"}
                           value={name}
                           onChange={event => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Einkaufspreis: </label>
                    <input type={"text"}
                           value={purchasePrice}
                           onChange={event => setPurchasePrice(event.target.value)}
                    />
                </div>
                <div>
                    <label>Faktor: </label>
                    <input type={"text"}
                           value={factor}
                           onChange={event => setFactor(event.target.value)}
                    />
                </div>
                <div>
                    <label>Anzahl: </label>
                    <input type={"text"}
                           value={amount}
                           onChange={event => setAmount(event.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}

export default DrinkAddEdit;