/* Access rules

1. users can access and update their own data
2. only global admins should be able to update users

*/

export const canRead = (user = null, comment) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin") ||
        user.roles.includes("CPIC Member") ||
        user.roles.includes("Implementer") ||
        true
    );
}

export const canReadAll = (user) => {
    return (
        user.roles.includes("Admin") || user.roles.includes("CPIC Admin")
    )
}

export const canCreate = (user) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin") ||
        user.roles.includes("CPIC Member") ||
        user.roles.includes("Implementer")
    );
}

export const canUpdate = (user, comment) => {
    return (
        user.roles.includes("Admin") ||
        user.id === comment.user_id
    );
}

export const canDelete = (user, comment) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin") ||
        user.id === comment.user_id
    );
}