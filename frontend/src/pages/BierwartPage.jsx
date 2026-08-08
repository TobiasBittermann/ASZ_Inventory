import {useState} from "react";
import DrinksPage from "./Bierwart/DrinksPage.jsx";
import BookingsTab from "./Bierwart/BookingsPage.jsx";
import DepositsTab from "./Bierwart/DepositsPage.jsx";
import AccountBookingsPage from "./Bierwart/AccountBookingsPage.jsx";
import VendorsPage from "./Bierwart/VendorsPage.jsx";
import SnapshotsPage from "./Bierwart/SnapshotsPage.jsx";

function BierwartPage() {
    const [activeTab, setActiveTab] = useState("bookings");

    const tabs = [
        {id: "snapshots", label: "Kassenstände"},
        {id: "bookings", label: "Kühlschrankbuchungen"},
        {id: "deposits", label: "Einzahlungen"},
        {id: "accountBookings", label: "Kassenbuchungen"},
        {id: "drinks", label: "Getränke"},
        {id: "vendors", label: "Lieferanten"},
    ];

    return (
        <div className="flex min-h-screen p-8">

            {/* Sidebar */}
            <aside className="w-55 bg-gray-100 rounded-lg shadow-md p-2">

                <nav className="flex flex-col gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                text-left px-4 py-3 rounded transition
                                ${
                                activeTab === tab.id
                                    ? "bg-green-500 text-white"
                                    : "bg-green-200 hover:bg-green-400"
                            }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>


            {/* Content */}
            <main className="flex-1 ml-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Bierwart
                </h1>

                {activeTab === "bookings" && <BookingsTab/>}
                {activeTab === "deposits" && <DepositsTab/>}
                {activeTab === "accountBookings" && <AccountBookingsPage/>}
                {activeTab === "snapshots" && <SnapshotsPage/>}
                {activeTab === "drinks" && <DrinksPage/>}
                {activeTab === "vendors" && <VendorsPage/>}

            </main>

        </div>
    );
}

export default BierwartPage;