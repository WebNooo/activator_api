import {Router} from "express";
import {FileController} from "../controllers";

const fileRoute = Router();

fileRoute.get("/version", FileController.Version)
fileRoute.get("/download/:type/:file", FileController.Download)
fileRoute.post("/upload/:version/:type", FileController.Upload)
fileRoute.post("/upload/:type", FileController.Upload)
fileRoute.get("/:type", FileController.Index)

export default fileRoute