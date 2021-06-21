import {model, Schema} from "mongoose";
import IFile from "../interfaces/file.interface";

const FileModel = new Schema({
    name: {type:String, required: true},
    type: {type:String, required: true},
    version: {type: Number, required: true},
    versionType: {type: String, required: true},
    size: {type: Number, required: true},
    storeName: {type:String, required: true, unique: true},
    date: {type: Date, default: new Date()}
})

export default model<IFile>("file", FileModel);