import express from "express";
import UserModel from "../models/user.model";

class UserController {

    Index = async (req: express.Request, res: express.Response) => {

        const ip = req.ip.split(":").pop()

        if (!req.headers.hwid)
            return res.status(404).send()

        let user = await UserModel.findOne({hwid: req.headers.hwid?.toString()})

        if (!user) {
            user = new UserModel({hwid: req.headers.hwid, ip: ip == "1" ? "localhost" : ip});
            await user.save()
        }

        res.json({
            username: user.username,
            access: user.access,
        })
    }

    Update = async (req: express.Request, res: express.Response) => {



    }
}

export default new UserController