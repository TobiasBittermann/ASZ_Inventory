import {Link} from "react-router-dom"
import houseImage from "../assets/ASZ_Freiburg_Haus.JPG"

function HomePage() {
    return (
        <div className={"min-h-screen flex flex-col items-center justify-center bg-cover bg-center"}
        style={{backgroundImage:`url(${houseImage})`}}>
            <div className={"bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center gap-6 w-120"}>

                <h1 className={"text-3xl font-bold text-gray-800 text-center"}>
                    ASZ Inventory
                </h1>

                <p className={"text-gray-500 text-sm"}>
                    Was möchtest du verwalten?
                </p>
                <p>
                    <Link to="/members">
                        <button
                            className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-6 py-2 w-48 transition"}>
                            Mitglieder
                        </button>
                    </Link>
                </p>
                <p>
                    <Link to={"/drinks"}>
                        <button
                            className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-6 py-2 w-48 transition"}>
                            Getränke
                        </button>
                    </Link>
                </p>
            </div>
        </div>

    );
}

export default HomePage;