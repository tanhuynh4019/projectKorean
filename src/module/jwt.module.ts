import jwt from 'jsonwebtoken'

class JWT {
    private exp: number = new Date().setDate(new Date().getDate() + 3)
    private iat: number = new Date().getTime()
    private jwt_secret: string = String(process.env.JWT_SECRET)

    public async endcodedToken(token: string) {
        const c_token = await jwt.sign({
            sub: token,
            iat: this.iat,
            exp: this.exp
        }, this.jwt_secret)
        return c_token
    }
}

export default new JWT()