import {useState} from "react";
import DrinksTab from "../components/bierwart/drink/DrinksTab.jsx";
import BookingsTab from "../components/bierwart/booking/BookingsTab.jsx";
import DepositsTab from "../components/bierwart/deposit/DepositsTab.jsx";
import AccountBookingsTab from "../components/bierwart/accountBooking/AccountBookingsTab.jsx";
import VendorTab from "../components/bierwart/vendor/VendorTab.jsx";
import SnapshotTab from "../components/bierwart/snapshot/SnapshotTab.jsx";

function BierwartPage() {
    const [activeTab, setActiveTab] = useState("bookings");

    return (
        <div className={"p-8"}>
            <h1 className={"text-3xl font-bold text-gray-800 text-center mb-6"}>
                Bierwart
            </h1>

            {/* Tab Buttons*/}
            <div className={"flex gap-4 mb-6"}>
                <button
                    className={`hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-1 transition 
                    ${activeTab === "bookings"
                        ? "bg-green-500 text-white scale-105"
                        : "bg-green-300 text-black hover:bg-green-500 hover:scale-105"}`}
                    onClick={() => setActiveTab("bookings")}>
                    Buchungen
                </button>
                <button
                    className={`hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-1 transition 
                    ${activeTab === "drinks"
                        ? "bg-green-500 text-white scale-105"
                        : "bg-green-300 text-black hover:bg-green-500 hover:scale-105"}`}
                    onClick={() => setActiveTab("drinks")}>
                    Getränke
                </button>
                <button
                    className={`hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-1 transition 
                    ${activeTab === "deposits"
                        ? "bg-green-500 text-white scale-105"
                        : "bg-green-300 text-black hover:bg-green-500 hover:scale-105"}`}
                    onClick={() => setActiveTab("deposits")}>
                    Einzahlungen
                </button>
                <button
                    className={`hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-1 transition 
                    ${activeTab === "accountBookings"
                        ? "bg-green-500 text-white scale-105"
                        : "bg-green-300 text-black hover:bg-green-500 hover:scale-105"}`}
                    onClick={() => setActiveTab("accountBookings")}>
                    Kassenbuchungen
                </button>
                <button
                    className={`hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-1 transition 
                    ${activeTab === "vendors"
                        ? "bg-green-500 text-white scale-105"
                        : "bg-green-300 text-black hover:bg-green-500 hover:scale-105"}`}
                    onClick={() => setActiveTab("vendors")}>
                    Lieferanten
                </button>
                <button
                    className={`hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-1 transition 
                    ${activeTab === "snapshots"
                        ? "bg-green-500 text-white scale-105"
                        : "bg-green-300 text-black hover:bg-green-500 hover:scale-105"}`}
                    onClick={() => setActiveTab("snapshots")}>
                    Kassenstände
                </button>
            </div>

            {/* content */}
            {activeTab === "bookings" && <BookingsTab/>}
            {activeTab === "drinks" && <DrinksTab/>}
            {activeTab === "deposits" && <DepositsTab/>}
            {activeTab === "accountBookings" && <AccountBookingsTab/>}
            {activeTab === "vendors" && <VendorTab/>}
            {activeTab === "snapshots" && <SnapshotTab/>}
        </div>

    )
}

export default BierwartPage;