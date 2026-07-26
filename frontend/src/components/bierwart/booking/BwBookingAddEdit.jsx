import {useEffect, useState} from "react";

function BwBookingAddEdit({booking, onClose, onSave}) {
    const [memberId, setMemberId] = useState("");
    const [drinkId, setDrinkId] = useState("");
    const [amountDrink, setAmountDrink] = useState("");

    useEffect(() => {
        if (booking) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMemberId(booking.memberId)
            setDrinkId(booking.drinkId)
            setAmountDrink(booking.amountDrink)
        } else {
            setMemberId(null)
            setDrinkId(null)
            setAmountDrink(null)
        }
    }, [booking]);

    function handleSubmit(event) {
        event.preventDefault();

        const savedBwBooking = {
            id: booking ? booking.id : 0,
            memberId: Number(memberId),
            drinkId: Number(drinkId),
            amountDrink: Number(amountDrink)
        }

        onSave(savedBwBooking)
        onClose();
    }

    return (
        <div className={"fixed inset-0 bg-black/50 flex items-center justify-center z-50"}>
            <div className={"bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"}>

                <h2 className={"text-2xl font-bold text-gray-800 mb-6"}>
                    {booking ? "Edit Booking" : "Add Booking"}
                </h2>

                <form
                    className={"grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4"}
                    onSubmit={handleSubmit}>

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Anzahl:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"text"}
                        value={amountDrink}
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

export default BwBookingAddEdit;