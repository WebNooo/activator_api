
export default interface IUser {
    username: string
    password: string
    hwid: string
    access: boolean
    isAdmin: boolean
    ip: string
    dateCreate:Date
    dateLogin:Date
}