class TimeClass {
    public async getDateNow() {
        return new Date(Date.now())
    }
}

export default new TimeClass()