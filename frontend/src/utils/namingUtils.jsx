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

export function getMemberName(members, deposit) {
    const member = members.find(member => member.id === deposit.memberId);

    return member
        ? `${member.firstName} ${member.lastName}`
        : "Unbekannt";
}

