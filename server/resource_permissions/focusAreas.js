/* Access rules

1. users can access and update their own data
2. only global admins should be able to update users

*/

export const canRead = (user=null, item) => {
    return (
        true
    );
}

export const canCreate = (user) => {
    return (
        user.roles.includes("Admin")
    )
}

export const canUpdate = (user, item) => {
    return (
        user.roles.includes("Admin")
    )
}

export const canDelete = (user, item) => {
    return (
        user.roles.includes("Admin")
    );
}