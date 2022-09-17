import bcrypt from 'bcryptjs'


class BcryptClass {
    public async hashPassword(password: string) {
        const salt: string = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    public async comparePassword(password: string, passwordHash: string) {
        return await bcrypt.compare(password, passwordHash)
    }

    public broofa() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}
export default new BcryptClass()