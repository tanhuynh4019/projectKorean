import axios from 'axios'
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

    public async list(body: any) {
        try {
            const { top, orderby, count, widget_key } = body
            const url = `
                https://ratings-live.dpcopytrading.com/api/rating/1?
                $top=${top}
                &$orderby=${orderby}
                &$count=${count}
                &widget_key=${widget_key}
            `
            const getTrading = await axios.get(url)
            this.setMessage("Trading List !")
            return getTrading.data
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
                    http://ratings-live.dpcopytrading.com/api/rating/1/profile/${id}?widget_key=social_platform_ratings`
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