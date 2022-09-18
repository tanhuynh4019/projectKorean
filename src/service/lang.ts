
class LangService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 16)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async getLang() {
        try {
            const data = [{
                code: 'CN',
                image: '/images/lang/cn.svg'
            },
            {
                code: 'TH',
                image: '/images/lang/th.svg'
            },
            {
                code: 'MY',
                image: '/images/lang/my.svg'
            },
            {
                code: 'LA',
                image: '/images/lang/la.svg'
            }]
            return data
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

export default new LangService('')