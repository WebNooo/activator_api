import {model, Schema} from 'mongoose'
import IUser from "../interfaces/user.interface";

const UserModel = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    hwid: {type: String, required: true, unique: true},
    access: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    ip: {type: String, default: ""},
    dateCreate: {type: Date, default: new Date()},
    dateLogin: {type: Date, default: new Date()}
})

export default model<IUser>("user", UserModel)