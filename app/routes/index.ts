import {Router} from "express";
import userRoute from "./user.route";
import fileRoute from "./file.route";

const appRoute = Router();

appRoute.use("/user", userRoute)
appRoute.use("/file", fileRoute)

export default appRoute