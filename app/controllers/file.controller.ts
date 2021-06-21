import express from "express";
import fs from "fs";
import VersionModel from "../models/version.model";
import randomstring from "randomstring"
import fileUpload from "express-fileupload";
import FileModel from "../models/file.model";
import IFile from "../interfaces/file.interface";
import IVersion from "../interfaces/version.interface";

class FileController {

    store = "./store"

    Index = async (req: express.Request, res: express.Response) => {
        const version:IVersion | null = await VersionModel.findOne({name: req.params.type})
        if (!version)
            return res.status(404).json({message: "Version not found"});

        const files:IFile[] = await FileModel.find({versionType: version.name, version: version.version})

        const result = files.reduce((res:string[], file:IFile) => [...res, file.name], [])

        res.json(result)

    }

    Version = async (req: express.Request, res: express.Response) => {

        const versions:IVersion[] = await VersionModel.find({})
        let result: { [key: string]: Number } = {}

        versions.forEach(x => {result[x.name] = x.version})

        res.json(result)

    }

    Upload = async (req: express.Request, res: express.Response) => {
        try {
            if (req.files) {
                const version:IVersion | null = await VersionModel.findOne({name: req.params.type})

                if (!version) return res.status(404).json({message: "Version not found"});

                if (req.params.version){
                    version.version = parseInt(req.params.version)
                }else{
                    version.version += 1
                    await version.save();
                }

                const storePath = `${this.store}\\${version.version}`
                if (!fs.existsSync(storePath))
                    fs.mkdirSync(storePath)

                for (let field in req.files) {
                    if (req.files.hasOwnProperty(field)) {
                        const file = req.files[field] as fileUpload.UploadedFile;
                        const type = file.name.split(".").pop()
                        const fileName = randomstring.generate({length: 25, charset: "alphanumeric"})

                        await file.mv(`${storePath}\\${fileName}`)

                        const fileModel = new FileModel({
                            type: type,
                            name: file.name,
                            size: file.size,
                            version: version.version,
                            versionType: version.name,
                            storeName: fileName
                        })

                        await fileModel.save()
                    }
                }
                return res.json({status: true})
            }
            return res.json({status: false})

        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Server error"});
        }
    }

    Download = async (req: express.Request, res: express.Response) => {

        try {
            const version = await VersionModel.findOne({name: req.params.type})
            if (!version)
                return  res.status(404).json({message: "Version not found"})

            const file:IFile | null = await FileModel.findOne({name: req.params.file, version: version.version})

            if (!file)
                return res.status(404).json({message: "File not found"})

            res.download(`${this.store}\\${version.version}\\${file.storeName}`, file.name)

        }catch(e) {
            console.log(e)
            return res.status(500).json({message: "Server error"})
        }
    }

}

export default new FileController