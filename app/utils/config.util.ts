import fs from "fs";

class Config {
    private readonly configPath: string;
    private readonly settings: object;

    constructor() {
        this.configPath = "./configs/default.json"
        this.settings = JSON.parse(String(fs.readFileSync(this.configPath)));
    }

    get<T>(path: string): T {
        return path.split(".").reduce((result: any, n) => result[n], this.settings)
    }

    has(path: string): boolean {
        let status = true;

        path.split(".").reduce((result: any, n) => {
            if (result[n] === undefined) status = false; else return result[n];
        }, this.settings)


        return status;
    }

    set(path: string, value: any) :void {

        const items: string[] = path.split(".");
        const variable: string | undefined = items.pop()
        let result: any = this.settings;

        items.forEach((n) => {
            result = result[n] === undefined ? result[n] = {} : result[n];
        })

        if (variable != undefined) result[variable] = value;
    }

    save() {
        fs.writeFileSync(this.configPath, JSON.stringify(this.settings))
    }
}

export default new Config();

