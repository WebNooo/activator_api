import {Router} from "express";
import {UserController} from "../controllers";

const userRoute = Router();

userRoute.get("", UserController.Index)

export default userRoute