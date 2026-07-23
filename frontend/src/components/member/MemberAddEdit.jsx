import {useEffect, useState} from "react";

function MemberAddEdit({member, onClose, onSave}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(() =>{
        if (member){
            setFirstName(member.firstName)
            setLastName(member.lastName)
            setEmail(member.email)
            setBalance(member.balance)
        }else{
            setFirstName("")
            setLastName("")
            setEmail("")
            setBalance("")
        }
    }, [member]);

    function handleSubmit(event) {
        event.preventDefault();

        const savedMember = {
            id: member ? member.id : 0,
            firstName,
            lastName,
            email,
            balance: Number(balance)
        }

        onSave(savedMember)
        onClose();
    }

    return (
        <div>
            <div>
                <h2>{member ? "Edit Member" : "Add Member"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Vorname: </label>
                        <input type={"text"}
                               value={firstName}
                               onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div>
                        <label>Nachname: </label>
                        <input type={"text"}
                               value={lastName}
                               onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>
                    <div>
                        <label>E-Mail: </label>
                        <input type={"text"}
                               value={email}
                               onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <label>Kontostand: </label>
                        <input type={"text"}
                               value={balance}
                               onChange={(event) => setBalance(event.target.value)}
                        />
                    </div>

                    <button type={"submit"} >Save</button>
                    <button type={"button"} onClick={onClose}>Close</button>
                </form>

            </div>
        </div>
    )
}

export default MemberAddEdit;