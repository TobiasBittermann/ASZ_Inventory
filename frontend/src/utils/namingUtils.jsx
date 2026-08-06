export function getAccountTypeLable(type) {
    switch (type) {
        case "BANK_ACCOUNT":
            return "Bierkonto";
        case"CASH_REGISTER":
            return "Bierkasse";
        default:
            return accountType;
    }
}

export function getMemberName(members, id) {
    const member = members.find(member => member.id === id);

    return member
        ? `${member.firstName} ${member.lastName}`
        : "Unbekannt";
}

export function getVendorName(vendors, booking) {
    const vendor = vendors.find(vendor => vendor.id === booking.vendorId);

    return vendor ? `${vendor.name}` : "Unbekannt";
}

export function getDrinkName(drinks, id) {
    const drink = drinks.find(drink => drink.id === id);

    return drink ? `${drink.name}` : "Unbekannt";
}