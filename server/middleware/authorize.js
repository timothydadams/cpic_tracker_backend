import { AppError } from "../errors/AppError.js";

export const authorize = (policy, resource) => (req, res, next) => {
    const user = res.locals.user;

    if (policy(user, resource)) {
        return next()
    }
    
    throw new AppError("Access Denied", 403)

}