import  jwt  from 'jsonwebtoken';
import HttpError from './HttpError.js';
import User from './../db/user.js';
import 'dotenv/config'
const {SECRET_KEY} = process.env

export const authenticate = async (req, res, next) => {
const {authorization = ""} = req.headers
const [bearer, token] = authorization.split(" ")
if (bearer !== "Bearer") {
    next(HttpError(401))
}
try {
    const {id} = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    
    if (!user || !user.token || user.token !== token) {
        next(HttpError(401))
    }
    req.user = user
    next()
} catch  {
    next(HttpError(401))
}

}