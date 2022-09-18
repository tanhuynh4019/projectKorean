import historyCopytradingModel from "../model/historyCopytrading";
class HistoryCopytradingService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 16)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async create(user_auth: string, accountId: number, symbolFrom: string, symbolTo: string, amount: number) {
        try {
            const data = {
                user_auth,
                accountId,
                symbolFrom,
                symbolTo,
                amount
            }

            const create = await historyCopytradingModel.create(data);
            create.save()

            return true;
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

export default new HistoryCopytradingService('')