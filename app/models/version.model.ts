import {model, Schema} from "mongoose";
import IVersion from "../interfaces/version.interface";

const VersionModel = new Schema({
    name: {type: String, require: true, unique: true},
    version: {type: Number, require: true}
})

export default model<IVersion>("version", VersionModel)
