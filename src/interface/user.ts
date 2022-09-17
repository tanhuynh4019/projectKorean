import { Document } from "mongoose"

export default interface IUser extends Document {
    local: {
        email: string,
        password: string,
        role: Number,
        fullname: string,
        token: string,
        lastDate: string,
        lastLogin: string,
        regDate: string,
        ip: string
    }
}