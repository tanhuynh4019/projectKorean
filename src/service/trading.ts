import axios from 'axios'
import jsonTrading from '../json/tradings'

import tradingModel from '../model/rating'
import historyCopytradingModel from '../model/historyCopytrading'

import langService from '../service/lang'
import walletService from '../service/wallet'
import changeService from '../service/changes'
import historyCopytradingService from '../service/history_copytrading'
import coinService from '../service/coin'

class TradingService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 7)
    private dateNow = new Date(Date.now())

    constructor(message: string) {
        this.message = message
    }

    public async list(body: any) {
        try {
            const { top, orderby, count, widget_key, skip } = body
            const arr: any = []
            const getTrading = await tradingModel.find().limit(top).skip(skip)
            const langs: any = await langService.getLang();
            for (let i = 0; i < getTrading.length; i++) {
                for (let j = 0; j < langs.length; j++) {
                    if (getTrading[i].account.countryCode == langs[j].code) {
                        getTrading[i].account.imageLang = langs[j].image
                        arr.push(getTrading[i])
                    }
                }
            }
            this.setMessage("Trading List !")
            return arr
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async SaveTradinglist() {
        try {

            const url = `https://ratings-live.dpcopytrading.com/api/rating/1?$top=65&$orderby=ratingPoints%20desc&$count=true&widget_key=social_platform_ratings`
            const res: any = await axios.get(url)
            const tradings = res.data.items

            for (let i = 0; i < tradings.length; i++) {
                const find: any = await tradingModel.findOne({
                    accountId: tradings[i].accountId
                })

                if (!find) {
                    const create = await tradingModel.create(tradings[i])
                    create.save()
                }
                else {
                    await tradingModel.findOneAndUpdate({ accountId: tradings[i].accountId }, tradings[i])
                }
            }

            this.setMessage("Thêm thành công !")
            return {
                "m": 'Ok'
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async detail(params: any, body: any) {
        try {
            const { id } = params
            const { type } = body
            let details: any

            switch (type) {
                case 'profile':
                    var url = `
                    http://ratings-live.dpcopytrading.com/api/rating/1/profile/${id}?widget_key=social_platform_ratings`
                    details = await axios.get(url)
                    break;
                case 'instruments':
                    var url = `
                    http://ratings-live.dpcopytrading.com/api/reports/${id}/instruments?widget_key=social_platform_ratings`
                    details = await axios.get(url)
                    break
                case 'trading':
                    var url = `
                    http://ratings-live.dpcopytrading.com/api/reports/${id}/trading?widget_key=social_platform_ratings`
                    details = await axios.get(url)
                    break
                case 'indicators':
                    var url = `
                        http://ratings-live.dpcopytrading.com/api/reports/${id}/indicators?widget_key=social_platform_ratings`
                    details = await axios.get(url)
                    break
                default:
                    details = []
            }


            this.setMessage("Detail Trading!")
            return details.data
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async create(body: any, user: any) {
        try {

            const { symbols, amount,  accountId} = body
            const arrSymbol = symbols.split(",")

            for (let i = 0; i < arrSymbol.length; i++) {
                const checkCoin = await coinService.checkCoin(arrSymbol[i]);
                if(!checkCoin) {
                    this.setMessage(`Invalid symbol [${arrSymbol[i]}] !`)
                    return false
                }
            }

            const wl = await walletService.getWalletToUserIdAndSymbol(user._id, 'USDT')
            if (wl.amount < amount) {
                this.setMessage("USDT wallet balance is not enough !")
                return false
            }
            
            const limit_from_copytrading: any = await changeService.findByName('limit_from_copytrading');
            const limit_to_copytrading: any = await changeService.findByName('limit_to_copytrading')
            if(amount < limit_from_copytrading.value){
                this.setMessage(`You must deposit more than ${limit_from_copytrading.value} USDT !`)
                return false
            }

            if(amount > limit_to_copytrading.value){
                this.setMessage(`You must deposit less than ${limit_to_copytrading.value} USDT !`)
                return false
            }

            await walletService.updateWalletUserIDSubtraction(amount, 'USDT', user._id)

            // Lưu lịch sử
            for (let i = 0; i < arrSymbol.length; i++) {
                await historyCopytradingService.create(user._id, accountId, 'USDT', arrSymbol[i], amount)
            }
            
            this.setMessage("Copytrading successfully !")
            return {}
        } catch (error) {
            console.log(error);
            return false
        }
    }

    public async historyByUserID(body: any, user: any) {
        try {

            const { accountId} = body

            const getHistory = await historyCopytradingModel.find({
                accountId,
                user_auth: user._id
            })
            
            this.setMessage("List history copytraning !")
            return getHistory
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