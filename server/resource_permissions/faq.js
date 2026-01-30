
export const canRead = (user = null, comment) => {
    return (
        true
    );
}

export const canCreate = (user) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin") ||
        user.roles.includes("CPIC Member")
    );
}

export const canUpdate = (user, comment) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin") ||
        user.roles.includes("CPIC Member")
    );
}

export const canDelete = (user, comment) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin")
    );
}