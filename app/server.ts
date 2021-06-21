import express from "express"
import fileUpload from "express-fileupload"
import appRoute from "./routes";
import mongoose from "mongoose";
import Config from "./utils/config.util"

const PORT = Config.get("server.port")
function main() {

    const app = express()
    app.use(express.json());
    app.use(fileUpload({}));

    mongoose.connect(Config.get("server.db"), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
        console.log(err ? err : "Connected to DataBase")
    })

    app.use("/api", appRoute)

    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`)
    })

}

main();