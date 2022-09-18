import changeModule from '../model/change'
class ChangeService {

    private message: string;
    private random: string = Math.random().toString(36).substring(2, 16)
    private dateNow = new Date(Date.now())


    constructor(message: string) {
        this.message = message
    }

    public async findByName(name: string) {
        try {
            const findByOne = await changeModule.findOne({
                name
            })
            return findByOne
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

export default new ChangeService('')