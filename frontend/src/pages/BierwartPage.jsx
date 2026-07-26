import {useState} from "react";
import DrinksTab from "../components/bierwart/drink/DrinksTab.jsx";
import BookingsTab from "../components/bierwart/booking/BookingsTab.jsx";

function BierwartPage() {
    const [activeTab, setActiveTab] = useState("drinks");

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
            </div>

            {/* content */}
            {activeTab === "bookings" && <BookingsTab/>}
            {activeTab === "drinks" && <DrinksTab/>}
        </div>

    )
}

export default BierwartPage;