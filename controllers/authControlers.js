import User from "../db/user.js";
import 'dotenv/config'
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import jwt from 'jsonwebtoken';
import handleMongooseError from "../helpers/handleMongooseError.js"
import gravatar from "gravatar"
import path from 'path'
import Jimp from "jimp";
import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import {
    registerSchema,
    loginSchema
} from "../schemas/userSchemas.js"
import fs from "fs/promises"

const {SECRET_KEY} = process.env

const avatarsDir = path.join(__dirname, "../", "public", "avatars")

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
    const avatarURL = gravatar.url(email)

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL})

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
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"});
        await User.findByIdAndUpdate(user._id, {token})

        res.json({
            token,
        })

    } catch (error) {
        next(error);
    }
    
    
}

export const getCurrent = async (req, res, next) => {
    const {email, _id} = req.user

    res.json({
        email,
        _id,
    })

}

export const logout = async (req, res, next) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""})
    res.json({
        message: "Logout success"
    })


}

export const updateAvatar = async (req, res, next) => {
    const {_id} = req.user
    const {path: tempUpload, originalname} = req.file
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, filename)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join("avatars", filename)

    Jimp.read(avatarURL)
    .then((image) => image.resize(250,250))
    .catch((error) => console.log(error))
    


    await User.findByIdAndUpdate(_id, {avatarURL})

    res.json({avatarURL,})

}