import {useEffect, useState} from "react";

function VendorAddEdit({vendor, onClose, onSave}) {
    const [name, setName] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [address, setAddress] = useState("")
    const [iban, setIban] = useState("")

    useEffect(() => {
        if (vendor) {
            setName(vendor.name)
            setContactPerson(vendor.contactPerson)
            setAddress(vendor.address)
            setIban(vendor.iban)
        } else {
            setName("")
            setContactPerson("")
            setAddress("")
            setIban("")
        }
    }, [vendor]);

    async function handleSubmit(event) {
        event.preventDefault();

        const savedVendor = {
            id: vendor ? vendor.id : 0,
            name: name,
            contactPerson: contactPerson,
            address: address,
            iban: iban
        }

        await onSave(savedVendor);
        onClose();
    }

    return (
        <div className={"fixed inset-0 bg-black/50 flex items-center justify-center z-50"}>
            <div className={"bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"}>

                <h2 className={"text-2xl font-bold text-gray-800 mb-6"}>
                    {vendor ? "Edit Vendor" : "Add Vendor"}
                </h2>

                <form
                    className={"grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4"}
                    onSubmit={handleSubmit}>
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Name:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"text"}
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Kontaktperson:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"text"}
                        value={contactPerson}
                        onChange={event => setContactPerson(event.target.value)}
                    />
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        Adresse:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"text"}
                        value={address}
                        onChange={event => setAddress(event.target.value)}
                    />
                    <label className={"text-sm font-medium text-gray-600 justify-self-start mr-2"}>
                        IBAN:
                    </label>
                    <input
                        className={"border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"}
                        type={"text"}
                        value={iban}
                        onChange={event => setIban(event.target.value)}
                    />

                    <div className={"col-span-2 flex justify-end gap-3 mt-2"}>
                        <button
                            className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-6 py-2 m-1 transition"}
                            type={"submit"}>
                            Save
                        </button>
                        <button
                            className={"hover:bg-green-500 hover:scale-105 bg-green-300 text-black shadow-md rounded px-6 py-2 m-1 transition"}
                            type={"button"} onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default VendorAddEdit;