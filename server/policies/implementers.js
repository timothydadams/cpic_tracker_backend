/* Access rules

1. users can access and update their own data
2. only global admins should be able to update users

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
        user.roles.includes("CPIC Admin") ||
        user.roles.includes("CPIC Member")
    )
}

export const canDelete = (user, strategy) => {
    return (
        user.roles.includes("Admin")
    );
}