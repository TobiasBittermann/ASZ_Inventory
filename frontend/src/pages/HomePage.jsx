import {Link} from "react-router-dom"

function HomePage() {
    return (
        <div>

            <h2><p> Hello friend!</p></h2>

            <p>
                You are at the start page right now.
            </p>
            <p>
                <Link to="/members">
                    <button type={"button"}>Members</button>
                </Link>
            </p>
            <p>
                <Link to={"/drinks"}>
                    <button type={"button"}>Drinks</button>
                </Link>
            </p>
        </div>


    );
}

export default HomePage;