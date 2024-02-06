import express from "express";
import  {register, login, getCurrent, logout}  from "../controllers/authControlers.js";
import { authenticate } from "../helpers/authenticate.js";

const AuthRouter = express.Router()

export default AuthRouter;

AuthRouter.post("/register", register)

AuthRouter.post("/login", login)

AuthRouter.get("/current", authenticate, getCurrent)

AuthRouter.post("/logout", authenticate, logout)