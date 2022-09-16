import bcrypt from 'bcryptjs'


class BcryptClass {
    public async hashPassword(password: string) {
        const salt: string = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    public async comparePassword(password: string, passwordHash: string) {
        return await bcrypt.compare(password, passwordHash)
    }
}
export default new BcryptClass()