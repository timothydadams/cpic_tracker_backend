
export const authorize = (policy, resource) => (req, res, next) => {
    const user = res.locals.user;

    if (policy(user, resource)) {
        return next()
    }
    return res.status(403).json({
        status:403,
        message: "Access denied",
    })
}