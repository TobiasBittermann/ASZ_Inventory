import {Link} from "react-router-dom"

function HomePage() {
    return (
        <div>
            <p>
               <h2> Hello friend!</h2>
            </p>
            <p>
                You are at the start page right now.
            </p>
            <p>
                <Link to="/members">
                    <button type={"button"}>Members</button>
                </Link>
            </p>
        </div>


    );
}

export default HomePage;