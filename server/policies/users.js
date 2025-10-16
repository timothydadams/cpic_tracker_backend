/* Access rules

1. users can access and update their own data
2. only global admins should be able to update users

*/

export const canRead = (requesting_user, userObject = null) => {
    return (
        requesting_user.roles.includes("Admin") ||
        userObject && requesting_user.id === userObject?.id
        //requesting_user !== undefined
    );
}

export const canUpdate = (requesting_user, userObject = null) => {
    return (
        requesting_user.roles.includes("Admin") ||
        userObject && requesting_user.id === userObject?.id
    );
}

export const canDelete = (requesting_user, userObject) => {
    return (
        requesting_user.roles.includes("Admin") ||
        userObject && requesting_user.id === userObject?.id
    );
}