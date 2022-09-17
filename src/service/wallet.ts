// import axios from 'axios'
import bcryptModule from '../module/bcrypt.module'
import db from '../config/db'
import jwtModule from '../module/jwt.module'
import jwt from 'jsonwebtoken'
import Web3 from 'web3'
import timeModule from '../module/time.module'

import coinService from '../service/coin'

import walletUser from '../model/wallet_code'

import roleEnum from '../common/role.enum'
class WalletService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 16)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async wallet(body: any, user: any) {
        try {
            const { symbol } = body

            const check = await walletUser.findOne({
                code: symbol, user_auth: user._id
            })

            this.setMessage("List wallet !")
            return {}
        } catch (error) {
            console.log(error);
            this.setMessage("Disconnect! !")
            return false
        }
    }

    public async createWallet(body: any, user: any) {
        try {
            const { symbol } = body
            let result: any;

            console.log(this.addWalletCode);
            const checkCoin = await coinService.checkCoin(symbol)
            if (!checkCoin) {
                this.setMessage("Symbol is not valid !")
                return false
            }

            const check = await walletUser.findOne({
                code: symbol, user_auth: user._id
            })
            if (check) {
                result = check
            }
            else {
                result = {
                    address: 'aaaa'
                }
            }

            this.setMessage("Deposit !")
            return result
        } catch (error) {
            console.log(error);
            this.setMessage("Disconnect! !")
            return false
        }
    }

    private async addWalletCode(body: any, user: any) {
        try {
            const web3 = new Web3('https://bas-aries-public.nodereal.io');
            const wl = await web3.eth.accounts.create();

            return wl;
        } catch (error) {
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

export default new WalletService('')