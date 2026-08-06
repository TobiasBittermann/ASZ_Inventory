import {useEffect, useState} from "react";
import {FiEdit3, FiPlusCircle, FiTrash2} from "react-icons/fi";
import SnapshotAddEdit from "./SnapshotAddEdit.jsx";
import {Tooltip} from "react-tooltip";
import {loadSnapshots} from "../../../utils/loadUtils.jsx";
import {deleteEntity, saveEntity} from "../../../utils/crudUtils.js";

function SnapshotTab() {
    const [snapshots, setSnapshots] = useState([])
    const [selectedSnapshot, setSelectedSnapshot] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        loadSnapshots(setSnapshots);
    }, [])



    async function handleSaveSnapshot(snapshot) {
        await saveEntity(snapshot, "/bwsnapshots", loadSnapshots, setSnapshots)
    }

    async function handleDeleteSnapshot(id) {
        await deleteEntity(id, "/bwsnapshots", loadSnapshots, setSnapshots)
    }

    function handleEditClick(snapshot) {
        setSelectedSnapshot(snapshot);
        setIsModalOpen(true);
    }

    function handleAddClick() {
        setSelectedSnapshot(null);
        setIsModalOpen(true);
    }

    return (
        <div>
            <h3 className={"text-3xl font-bold text-gray-800 text-center"}>
                Kassenstände
            </h3>

            <button
                className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md justify-self-start rounded px-6 py-2 m-3 transition"}
                data-tooltip-id={"add-tip"}
                data-tooltip-content={"Add a new drink"}
                onClick={handleAddClick}>
                <FiPlusCircle/>
            </button>

            {
                isModalOpen && (
                    <SnapshotAddEdit
                        snapshot={selectedSnapshot}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveSnapshot}/>
                )}

            <div className={"overflow-x-auto rounded-xl shadow"}>

                <table className={"min-w-full bg-white text-sm text-left"}>
                    <thead className={"bg-gray-200 text-gray-600 uppercase text-xs"}>
                    <tr>
                        <th className={"px-6 py-3"}>Id</th>
                        <th className={"px-6 py-3"}>Bierkonto</th>
                        <th className={"px-6 py-3"}>Bierkasse</th>
                        <th className={"px-6 py-3"}>Inventar</th>
                        <th className={"px-6 py-3"}>Kommantar</th>
                        <th className={"px-6 py-3"}>Datum</th>
                        <th className={"px-6 py-3"}>Aktionen</th>
                    </tr>
                    </thead>
                    <tbody className={"divide-y divide-gray-100"}>
                    {snapshots.map(snapshot => (
                        <tr key={snapshot.id} className={"hover:bg-gray-50 transition"}>
                            <td className={"px-6 py-3"}>{snapshot.id}</td>
                            <td className={"px-6 py-3"}>{snapshot.bankAccount}</td>
                            <td className={"px-6 py-3"}>{snapshot.cashRegister}</td>
                            <td className={"px-6 py-3"}>{snapshot.inventoryValue}</td>
                            <td className={"px-6 py-3"}>{snapshot.note}</td>
                            <td className={"px-6 py-3"}>{snapshot.snapshotDate}</td>
                            <td>
                                <button
                                    className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-3 py-1 m-1 transition"}
                                    data-tooltip-id={"edit-tip"}
                                    data-tooltip-content={"Edit a member entry"}
                                    onClick={() => handleEditClick(snapshot)}>
                                    <FiEdit3 />
                                </button>
                                <button
                                    className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-3 py-1 m-1 transition"}
                                    data-tooltip-id={"delete-tip"}
                                    data-tooltip-content={"Delete a member entry"}
                                    onClick={() => handleDeleteSnapshot(snapshot.id)}>
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Tooltip id={"edit-tip"}/>
                <Tooltip id={"delete-tip"}/>
            </div>
        </div>
    )
}

export default SnapshotTab;