// import axios from 'axios'
import bcryptModule from '../module/bcrypt.module'
import db from '../config/db'
import jwtModule from '../module/jwt.module'

class UserService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async login() {
        try {

            this.setMessage("Đăng nhập thành công!")
            return {}
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async register() {
        try {

            this.setMessage("Đăng ký thành công!")
            return {}
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async profile() {
        try {

            this.setMessage("In danh sách user thành công!")
            return {}
        } catch (error) {
            console.log(error);
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