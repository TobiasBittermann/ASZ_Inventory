import {useEffect, useState} from "react";

function MemberAddEdit({member, onClose, onSave}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        if (member) {
            setFirstName(member.firstName)
            setLastName(member.lastName)
            setEmail(member.email)
            setBalance(member.balance)
        } else {
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
        <div className={"fixed inset-0 bg-black/50 flex items-center justify-center z-50"}>
            <div className={"bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"}>
                <h2 className={"text-2xl font-bold text-gray-800 mb-6"}>
                    {member ? "Edit Member" : "Add Member"}
                </h2>

                <form
                    className={"grid grid-cols-[auto_1fr] items-center gab-x-4 gap-y-4"}
                    onSubmit={handleSubmit}>
                        <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                            Vorname:
                        </label>
                        <input
                            className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                            type={"text"}
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                        <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                            Nachname:
                        </label>
                        <input
                            className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                            type={"text"}
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                        <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                            E-Mail:
                        </label>
                        <input
                            className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                            type={"text"}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                            Kontostand:
                        </label>
                        <input
                            className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                            type={"text"}
                            value={balance}
                            onChange={(event) => setBalance(event.target.value)}
                        />
                    <div className={"col-span-2 flex justify-end gab-3 mt-2"}>
                        <button
                            className={"hover:bg-blue-500 hover:scale-105 bg-blue-300 text-black shadow-md rounded px-6 py-2 m-1 transition"}
                            type={"button"} onClick={handleSubmit}>
                            Save
                        </button>
                        <button
                            className={"hover:bg-blue-500 hover:scale-105 bg-blue-300 text-black shadow-md rounded px-6 py-2 m-1 transition"}
                            type={"button"} onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default MemberAddEdit;