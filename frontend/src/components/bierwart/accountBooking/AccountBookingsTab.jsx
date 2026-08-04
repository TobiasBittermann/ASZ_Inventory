import {useEffect, useState} from "react";
import {FiEdit3, FiPlusCircle, FiTrash2} from "react-icons/fi";
import {Tooltip} from "react-tooltip";
import AccountBookingAddEdit from "./AccountBookingAddEdit.jsx";

function AccountBookingsTab() {
    const [accountBookings, setAccountBookings] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [selectedAccountBooking, setSelectedAccountBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadAccountBookings();
        loadVendors();
    }, [])

    async function loadAccountBookings() {
        const response = await fetch("/bwaccountbookings");

        if (!response.ok) {
            throw new Error("Loading bookings failed")
        }

        const data = await response.json();
        setAccountBookings(data);
    }

    async function loadVendors() {
        const response = await fetch("/vendors")

        if (!response.ok) {
            throw new Error("Loading vendors dailed")
        }

        const data = await response.json();
        setVendors(data);
    }

    async function handleSaveAccountBooking(booking) {
        const isEditMode = booking.id && booking.id > 0;
        const url = isEditMode
            ? `/bwaccountbookings/${booking.id}`
            : "/bwaccountbookings"

        const method = isEditMode ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        });

        if (!response.ok) {
            throw new Error("Account booking could not be saved!")
        }

        await loadAccountBookings();
    }

    function handleEditClick(booking) {
        setSelectedAccountBooking(booking);
        setIsModalOpen(true);
    }

    function handleAddClick() {
        setSelectedAccountBooking(null);
        setIsModalOpen(true);
    }

    async function handleDeleteAccountBooking(id) {
        const response = await fetch(`/bwaccountbookings/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Account booking could not be deleted!");
        }

        await loadAccountBookings();
    }

    function getVendorName(vendors, booking){
        const vendor = vendors.find(vendor => vendor.id === booking.vendorId);

        return vendor ? `${vendor.name}` : "Unbekannt";
    }

    return (
        <div>
            <h3 className={"text-3xl font-bold text-gray-800 text-center"}>
                Buchungen Bierkasse
            </h3>

            <button
                className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-3 transition"}
                data-tooltip-id={"add-tip"}
                data-tooltip-content={"Add a new booking"}
                onClick={handleAddClick}>
                <FiPlusCircle/>
            </button>
            <Tooltip id={"add-tip"}/>

            {
                isModalOpen && (
                    <AccountBookingAddEdit
                        booking={selectedAccountBooking}
                        vendors={vendors}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveAccountBooking}/>
                )}

            <div className={"overflow-x-auto rounded-xl shadow"}>
                <table className={"min-w-full bg-white text-sm text-left"}>
                    <thead className={"bg-gray-200 text-gray-600 uppercase text-xs"}>
                    <tr>
                        <th className={"px-6 py-3"}>Id</th>
                        <th className={"px-6 py-3"}>Buchungsdatum</th>
                        <th className={"px-6 py-3"}>Lieferant</th>
                        <th className={"px-6 py-3"}>Betrag</th>
                        <th className={"px-6 py-3"}>Rechnungsnummer</th>
                        <th className={"px-6 py-3"}>Kommentar</th>
                        <th className={"px-6 py-3"}>Aktionen</th>
                    </tr>
                    </thead>
                    <tbody className={"divide-y divide-gray-100"}>
                    {accountBookings.map(booking => (
                        <tr key={booking.id} className={"hover:bg-gray-50 transition"}>
                            <td className={"px-6 py-3"}>{booking.id}</td>
                            <td className={"px-6 py-3"}>{booking.date}</td>
                            <td className={"px-6 py-3"}>{getVendorName(vendors, booking)}</td>
                            <td className={"px-6 py-3"}>{booking.amount}</td>
                            <td className={"px-6 py-3"}>{booking.invoiceNumber}</td>
                            <td className={"px-6 py-3"}>{booking.note}</td>
                            <td>
                                <button
                                    className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-3 py-1 m-1 transition"}
                                    data-tooltip-id={"edit-tip"}
                                    data-tooltip-content={"Edit a booking entry"}
                                    onClick={() => handleEditClick(booking)}>
                                    <FiEdit3/>
                                </button>
                                <button
                                    className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-3 py-1 m-1 transition"}
                                    data-tooltip-id={"delete-tip"}
                                    data-tooltip-content={"Delete a booking entry"}
                                    onClick={() => handleDeleteAccountBooking(booking.id)}>
                                    <FiTrash2/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Tooltip id={"edit-tip"}/>
                <Tooltip id={"delete-tip"}/>
            </div>
        </div>
    )
}

export default AccountBookingsTab