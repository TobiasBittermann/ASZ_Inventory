import {useEffect, useState} from "react";
/* Declaration out of function because of linter error: ESLint: Error: Cannot access variable before it is declared (react-hooks/immutability)*/
function getCurrentLocalDateTime(){
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0,16);
}

function BwBookingAddEdit({booking, members, drinks, onClose, onSave}) {
    const [memberId, setMemberId] = useState("");
    const [drinkId, setDrinkId] = useState("");
    const [amountDrink, setAmountDrink] = useState("");
    const [bookingDate, setBookingDate] = useState("")

    useEffect(() => {
        if (booking) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMemberId(booking.memberId)
            setDrinkId(booking.drinkId)
            setAmountDrink(booking.amountDrink)
            setBookingDate(booking.bookingDate)
        } else {
            setMemberId("")
            setDrinkId("")
            setAmountDrink("")
            setBookingDate(getCurrentLocalDateTime());
        }
    }, [booking]);

    async function handleSubmit(event) {
        event.preventDefault();

        const savedBwBooking = {
            id: booking ? booking.id : 0,
            memberId: Number(memberId),
            drinkId: Number(drinkId),
            amountDrink: Number(amountDrink),
            bookingDate: bookingDate
        }

        await onSave(savedBwBooking)
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
                        Mitglied:
                    </label>
                    <select
                        className={"w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 shadow-sm cursor-pointer hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"}
                        value={memberId}
                            onChange={e => setMemberId(e.target.value)}>
                        <option value={""}>Bitte Mitglied auswählen</option>
                        {members.map(member => (
                            <option key={member.id} value={member.id}>
                                {member.firstName} {member.lastName}
                            </option>
                        ))}
                    </select>

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Getränk:
                    </label>
                    <select
                        className={"w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 shadow-sm cursor-pointer hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"}
                        value={drinkId}
                        onChange={e => setDrinkId(e.target.value)}>
                        <option value={""}>Bitte Getränk auswählen</option>
                        {drinks.map(drink => (
                            <option key={drink.id} value={drink.id}>
                                {drink.name}
                            </option>
                        ))}
                    </select>

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Anzahl:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"number"}
                        value={amountDrink}
                        onChange={event => setAmountDrink(event.target.value)}
                    />

                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Buchungsdatum:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"datetime-local"}
                        value={bookingDate}
                        onChange={event => setBookingDate(event.target.value)}
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

export default BwBookingAddEdit;