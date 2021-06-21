import express from "express"
import fileUpload from "express-fileupload"
import appRoute from "./routes";
import mongoose from "mongoose";
import UserModel from "./models/user.model";

function main() {

    const app = express()
    app.use(express.json());
    app.use(fileUpload({}));

    mongoose.connect("mongodb://umbrella:75750909@s1.pwserver.ru:21995/umbrella", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
        console.log(err ? err : "Connected to DataBase")
    })

    app.use("/api", appRoute)

    app.listen(80, () =>{
        console.log("Server is running")
    })

}

main();