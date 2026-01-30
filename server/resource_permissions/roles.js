/* Access rules

1. Only global admin can delete or add

*/

export const canCreate = (user, role) => {
    return (
        user.roles.includes("Admin")
    );
}

export const canRead = (user, role) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin") ||
        user.roles.includes("CPIC Member") ||
        user.roles.includes("Implementer")
    );
}

export const canUpdate = (user, role) => {
    return (
        user.roles.includes("Admin")
    )
}

export const canDelete = (user, role) => {
    return (
        user.roles.includes("Admin")
    );
}