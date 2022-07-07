import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";


export const userRouter = express.Router();

const userBusiness = new UserBusiness(new UserDatabase(), new HashManager(), new Authenticator(), new IdGenerator())

console.log(userBusiness)
const userController = new UserController(userBusiness);

userRouter.post("/signup",(req, res)=> userController.signup(req, res));
userRouter.post("/login",(req, res)=> userController.login(req, res));