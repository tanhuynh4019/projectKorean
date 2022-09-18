
import Web3 from 'web3'
import coinService from '../service/coin'
import walletUser from '../model/wallet_code'
class WalletService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 16)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async wallet(user: any) {
        try {

            const getWallet: any = await walletUser.find({
                user_auth: user._id
            })

            console.log(getWallet);


            const obj: any = {}

            for (let i = 0; i < getWallet.length; i++) {
                obj[`${getWallet[i].code}`] = getWallet[i].amount;
            }

            this.setMessage("List wallet !")
            return obj
        } catch (error) {
            console.log(error);
            this.setMessage("Disconnect! !")
            return false
        }
    }

    public async getWalletToUserIdAndSymbol(userId: string, symbol: string) {
        try {

            const getWallet: any = await walletUser.findOne({
                user_auth: userId, symbol
            })
            return getWallet
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
            const checkCoin = await coinService.checkCoin(symbol)
            if (!checkCoin) {
                this.setMessage("Symbol is not valid !")
                return false
            }

            const check = await walletUser.findOne({
                code: symbol, user_auth: user._id
            })
            if (check) {
                result = {
                    address: check.address,
                    amount: check.amount,
                    code: check.code
                }
            }
            else {
                const wl: any = await this.addWalletCode();

                const data = {
                    user_auth: user._id,
                    address: wl.address,
                    private_key: wl.privateKey,
                    amount: 0,
                    code: symbol
                }
                const createWallet = await walletUser.create(data)
                createWallet.save()

                result = {
                    address: data.address,
                    amount: data.amount,
                    code: data.code
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

    public async updateWalletUserIDSubtraction(amount: any, symbol: String, userID: String) {
        try {
            const res: any = await walletUser.findOne({user_auth: userID, code: symbol})
            res.amount = res.amount - amount;
            res.save()
            return true
        } catch (error) {
            console.log(error);
            this.setMessage("Disconnect! !")
            return false
        }
    }

    private async addWalletCode() {
        try {
            const web3 = new Web3('https://bas-aries-public.nodereal.io');
            const wl = web3.eth.accounts.create();

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