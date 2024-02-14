import express from "express";
import  {register, login, getCurrent, logout,updateAvatar }  from "../controllers/authControlers.js";
import { authenticate } from "../helpers/authenticate.js";
import { upload } from './../helpers/upload.js';

const AuthRouter = express.Router()

export default AuthRouter;

AuthRouter.post("/register", register)

AuthRouter.post("/login", login)

AuthRouter.get("/current", authenticate, getCurrent)

AuthRouter.post("/logout", authenticate, logout)

AuthRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar )