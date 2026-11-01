import { Router } from "express";
import { login, register } from "./authCn.js";
import { loginValidation, registerValidation } from "./authValidator.js";

const authRouter = Router()

authRouter.route('/login').post(loginValidation,login)
authRouter.route('/register').post(registerValidation,register)


export default authRouter