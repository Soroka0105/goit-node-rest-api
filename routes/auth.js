import express from "express";
import  {register, login}  from "../controllers/authControlers.js";

const AuthRouter = express.Router()

export default AuthRouter;

AuthRouter.post("/register", register)

AuthRouter.post("/login", login)