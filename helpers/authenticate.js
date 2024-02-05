import  jwt  from 'jsonwebtoken';
import HttpError from './HttpError.js';
import User from './../db/user.js';

const {SECRET_KEY} = process.env

export const authenticate = async (req, res, next) => {
const {authorization = ""} = req.body
const [bearer, token] = authorization.split(" ")
if (bearer !== "Bearer") {
    next(HttpError(401))
}
try {
    const {id} = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)

    if (!user) {
        next(HttpError(401))
    }
    next()
} catch (error) {
    next(HttpError(401))
}

}