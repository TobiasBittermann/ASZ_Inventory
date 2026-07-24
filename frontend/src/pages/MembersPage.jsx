import {useEffect, useState} from "react";
import MemberAddEdit from "../components/member/MemberAddEdit.jsx";

function MembersPage() {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        loadMembers();
    }, [])

    function loadMembers() {
        //TODO: find a way to put this into application.properties
        fetch("http://localhost:8080/members")
            .then((response) => response.json())
            .then((data) => setMembers(data));
    }

    async function handleSaveMember(member) {
        const isEditMode = member.id && member.id > 0;
        const url = isEditMode
            ? `http://localhost:8080/members/${member.id}`
            : "http://localhost:8080/members";

        const method = isEditMode ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        });

        if (!response.ok) {
            throw new Error("Member could not be saved!")
        }

        loadMembers();
    }

    function handleEditClick(member) {
        setSelectedMember(member);
        setIsModalOpen(true);
    }

    function handleAddClick() {
        setSelectedMember(null);
        setIsModalOpen(true);
    }

    async function handleDeleteMember(id) {
        const response = await fetch(`http://localhost:8080/members/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Member could not be deleted!")
        }

        loadMembers();
    }

    return (
        <div>
            <h1>Members</h1>


            <button type={"button"} onClick={handleAddClick}>
                Add Member
            </button>

            {isModalOpen && (
                <MemberAddEdit
                    member={selectedMember}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveMember}/>

            )}

            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>E-Mail</th>
                    <th>Kontostand</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.id}>
                        <td>{member.id}</td>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.email}</td>
                        <td>{member.balance}</td>
                        <td>
                            <button type={"button"} onClick={() => handleEditClick(member)}>
                                Edit
                            </button>
                            <button type={"button"} onClick={() => handleDeleteMember(member.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


export default MembersPage;