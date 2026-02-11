import { AppError } from "../errors/AppError.js";

export const authorize = (policy, resource) => async (req, res, next) => {
    const user = res.locals.user;

    if (policy(user, resource)) {
        return await next()
    }

    throw new AppError("Access Denied", 403)

}