import {Link} from "react-router-dom"

function HomePage() {
    return (
        <div className={"min-h-screen bg-gray-100 flex flex-col items-center justify-center"}>
            <div className={"bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center gap-6 w-80"}>


            <h1 className={"text-3xl font-bold text-gray-800 text-center"}>
                ASZ Inventory
            </h1>

            <p className={"text-gray-500 text-sm"}>
                Was möchtest du verwalten?
            </p>
            <p>
                <Link to="/members">
                    <button className={"hover:bg-blue-500 hover:scale-105 bg-blue-300 text-black shadow-md rounded px-6 py-2 w-48 transition"}>Members</button>
                </Link>
            </p>
            <p>
                <Link to={"/drinks"}>
                    <button className={"hover:bg-blue-500 hover:scale-105 bg-blue-300 text-black shadow-md rounded px-6 py-2 w-48 transition"}>Drinks</button>
                </Link>
            </p>
        </div>

        </div>

    );
}

export default HomePage;