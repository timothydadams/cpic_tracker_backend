/* Access rules

1. everyone, including unauthenticated users, should be able to view strategies
2. Only global admin can delete or add
3. Global admin, cpic admin and cpic members can update strategies

*/

export const canCreate = (user, strategy) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin")
    );
}

export const canRead = (user=null, strategy=null) => {
    return (
        true
    );
}

export const canUpdate = (user, strategy) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin")
    )
}

export const canDelete = (user, strategy) => {
    return (
        user.roles.includes("Admin")
    );
}