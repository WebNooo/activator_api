import {Document} from "mongoose";

export default interface IVersion extends Document{
    name: string
    version: number
}