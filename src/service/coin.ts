// import axios from 'axios'
import bcryptModule from '../module/bcrypt.module'
import db from '../config/db'
import jwtModule from '../module/jwt.module'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import timeModule from '../module/time.module'

import modelCoin from '../model/coin'

import roleEnum from '../common/role.enum'
import coin from '../model/coin'
class CoinService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 16)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async getCoin(body: any) {
        try {
            this.Create();
            const { type } = body
            const typeV = type ? type : 'PAYMENT'

            const findAll = await coin.findOne({type: typeV})

            this.setMessage("List Coin !")
            return findAll
        } catch (error) {
            console.log(error);
            this.setMessage("Disconnect! !")
            return false
        }
    }

    public async checkCoin(symbol: string) {
        try {
            const findAll:any= await coin.find()

            for (let i = 0; i < findAll.length; i++){
                if(findAll[i].code != symbol){
                    return false
                }
            }

            return true
        } catch (error) {
            return false
        }
    }

    public async Create() {
        try {
            const array = [
                {
                    code: 'USDT',
                    price: 1,
                    name: 'Tether USDT'
                }
            ]

            for (let i = 0; i < array.length; i++) {

                const find = await modelCoin.findOne({
                    code: array[i].code
                })

                if (!find) {
                    const createCoin = await modelCoin.create(array[i])
                    createCoin.save()
                }
            }

            this.setMessage("List Coin !")
            return {}
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

export default new CoinService('')