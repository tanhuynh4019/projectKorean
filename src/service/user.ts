// import axios from 'axios'
import bcryptModule from '../module/bcrypt.module'
import db from '../config/db'
import jwtModule from '../module/jwt.module'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import timeModule from '../module/time.module'

import modelUser from '../model/user'
import modelUserInfo from '../model/userInfo'

import roleEnum from '../common/role.enum'
class UserService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 16)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async login(body: any, ip: string) {
        try {
            const { email, password } = body
            const findByOneUser: any = await modelUser.findOne({ 'local.email': email })
            if (!findByOneUser) {
                this.setMessage("No matching account found !")
                return false;
            }
            // So sánh password hash
            const bcryptCompare = await bcrypt.compare(password, findByOneUser.local.password)
            if (!bcryptCompare) {
                this.setMessage("No matching account found !")
                return false
            }

            const payload = {
                id: findByOneUser._id,
                email: findByOneUser.local.email,
            }

            // Tạo jwt
            const jwtSign = await jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 36000 * 24 })

            if (!jwtSign) {
                this.setMessage("Feature temporarily closed for maintenance!")
                return false
            }

            findByOneUser.local.lastLogin = this.dateNow
            findByOneUser.save()


            let result = {
                token: jwtSign,
                data: payload
            }

            this.setMessage("Logged in successfully !")
            return result
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async register(body: any, ip: string) {
        try {
            const { email, password, confirmPassword } = body

            if (confirmPassword != password) {
                this.setMessage("Confirmed password is incorrect !")
                return false;
            }

            const checkExistsEmail = await modelUser.findOne({ 'local.email': email })
            if (checkExistsEmail) {
                this.setMessage("Email already exists !")
                return false;
            }

            const data = {
                local: {
                    email,
                    password: await bcryptModule.hashPassword(password),
                    role: roleEnum.USER,
                    fullname: '',
                    token: this.random,
                    regDate: this.dateNow,
                    ip
                }
            }
            const saveUser:any = await modelUser.create(data)
            saveUser.save()

            if (!saveUser) {
                this.setMessage("Registration failed !")
                return false;
            }

            const saveUserInfo = await modelUserInfo.create({
                id:  saveUser._id,   
                joinedOn: this.dateNow, 
                email,
                name: email.substring(0, email.lastIndexOf("@"))
            })
            saveUserInfo.save()

            // Tạo jwt
            const payload = {
                id: saveUser._id,
                email
            }

            const jwtSign = await jwtModule.sign(payload)

            let result = {
                token: jwtSign,
                data: payload
            }

            this.setMessage("Sign Up Success !")
            return result
        } catch (error) {
            console.log(error);
            this.setMessage("Registration failed !")
            return false
        }
    }

    public async profile(user: any) {
        try {
            const userData = user
            this.setMessage("Information !")
            userData._id = null
            return userData
        } catch (error) {
            console.log(error);
            this.setMessage("Disconnect! !")
            return false
        }
    }

    public getMessage = () => {
        return this.message
    }

    private setMessage = (message: string) => {
        this.message = message
    }
}

export default new UserService('')