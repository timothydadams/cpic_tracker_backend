/* Access rules

1. users can access and update their own data
2. only global admins should be able to update users

*/


export const canCreate = (user, resource) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin")
    );
}

export const canRead = (user=null, resource=null) => {
    return (
        true
    );
}

export const canUpdate = (user, resource) => {
    return (
        user.roles.includes("Admin") ||
        user.roles.includes("CPIC Admin")
    )
}

export const canDelete = (user, resource) => {
    return (
        user.roles.includes("Admin")
    );
}