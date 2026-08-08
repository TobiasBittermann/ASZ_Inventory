import {useEffect, useState} from "react";
import {getCurrentLocalDateTime} from "../../utils/dateUtils.jsx";

function SnapshotAddEdit({snapshot, onClose, onSave}) {
    const [bankAccount, setBankAccount] = useState("")
    const [cashRegister, setCashRegister] = useState("")
    const [inventoryValue, setInventoryValue] = useState("")
    const [snapshotDate, setSnapshotDate] = useState("")
    const [note, setNote] = useState("")

    useEffect(() => {
        if(snapshot){
            setBankAccount(snapshot.bankAccount)
            setCashRegister(snapshot.cashRegister)
            setInventoryValue(snapshot.inventoryValue)
            setSnapshotDate(snapshot.snapshotDate)
            setNote(snapshot.note)
        }else{
            setBankAccount("")
            setCashRegister("")
            setInventoryValue("")
            setSnapshotDate(getCurrentLocalDateTime())
            setNote("")
        }
    }, [snapshot])


    async function handleSubmit(event){
        event.preventDefault();

        const savedSnapshot= {
            id: snapshot ? snapshot.id : 0,
            bankAccount: bankAccount,
            cashRegister: cashRegister,
            inventoryValue: inventoryValue,
            snapshotDate: snapshotDate,
            note: note
        }

        await onSave(savedSnapshot)
        onClose();
    }

    return (
        <div className={"fixed inset-0 bg-black/50 flex items-center justify-center z-50"}>
            <div className={"bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"}>

                <h2 className={"text-2xl font-bold text-gray-800 mb-6"}>
                    {snapshot ? "Edit Snapshot" : "Add Snapshot"}
                </h2>

                <form
                    className={"grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4"}
                    onSubmit={handleSubmit}>

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Bierkonto:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"number"}
                        value={bankAccount}
                        onChange={event => setBankAccount(event.target.value)}
                    />

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Bierkasse:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"number"}
                        value={cashRegister}
                        onChange={event => setCashRegister(event.target.value)}
                    />

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Inventar:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"number"}
                        value={inventoryValue}
                        onChange={event => setInventoryValue(event.target.value)}
                    />

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Kommentar:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"text"}
                        value={note}
                        onChange={event => setNote(event.target.value)}
                    />

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Buchungsdatum:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"datetime-local"}
                        value={snapshotDate}
                        onChange={event => setSnapshotDate(event.target.value)}
                        disabled
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

export default SnapshotAddEdit;