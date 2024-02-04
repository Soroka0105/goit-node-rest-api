import User from "../db/user.js";
import 'dotenv/config'
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import jwt from 'jsonwebtoken';
import handleMongooseError from "../helpers/handleMongooseError.js"
import {
    registerSchema,
    loginSchema
} from "../schemas/userSchemas.js"

const {SECRET_KEY} = process.env

export const register = async (req, res, next) => {
try {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    const {error} = registerSchema.validate(req.body);

    if (error) {
        throw HttpError(400, error.message)
    }

    if(user) {
        throw HttpError(409, "email already in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword})

res.status(201).json({
    password: newUser.password,
    email: newUser.email
})

}
 catch (error) {
    next(error);
}
}



export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body 
        const user = await User.findOne({email})

        if (!user) {
            throw HttpError(401, "Email or password invalid")
        }
        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid")
        }

        const payload = {
            id:user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"})

        res.json({
            token,
        })

    } catch (error) {
        next(error);
    }
    
    
}
