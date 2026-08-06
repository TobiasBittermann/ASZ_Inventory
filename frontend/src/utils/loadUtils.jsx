export async function loadAccountTypes(setAccountTypes) {
    const response = await fetch("/account-types");

    if (!response.ok) {
        throw new Error("Loading account types failed");
    }

    const data = await response.json();
    setAccountTypes(data);
}

export async function loadMembers(setMembers) {
    const response = await fetch("/members")

    if (!response.ok) {
        throw new Error("Loading members failed")
    }

    const data = await response.json()
    setMembers(data);
}

export async function loadBwDeposits(setBwDeposits) {
    const response = await fetch("/bwdeposits");

    if (!response.ok) {
        throw new Error("Loading deposits failed");
    }

    const data = await response.json();
    setBwDeposit(data);
}

export async function loadDrinks(setDrinks) {
    const response = await fetch("/drinks");

    if (!response.ok) {
        throw new Error("Loading drinks failed");
    }

    const data = await response.json();
    setDrinks(data);
}