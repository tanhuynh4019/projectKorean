// import axios from 'axios'
import bcryptModule from '../module/bcrypt.module'
import db from '../config/db'
import jwtModule from '../module/jwt.module'

class TradingService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async list() {
        try {

            this.setMessage("Danh sách trading!")
            return {}
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async detail() {
        try {

            this.setMessage("Xem chi tiết trading!")
            return {}
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async create() {
        try {

            this.setMessage("Copy thành công!")
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

export default new TradingService('')