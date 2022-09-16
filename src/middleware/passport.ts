import passport from 'passport'
import db from '../config/db'
import { Strategy } from 'passport-jwt'
import localStrategy from 'passport-local'
import bcrypt from 'bcryptjs'

const {
    ExtractJwt
} = require('passport-jwt')

passport.use(new localStrategy.Strategy({
    usernameField: 'email'
}, async(email: string, password: string, done: any) => {
    try {
        const sql = "SELECT * FROM user WHERE email=?"
        const user = await db.Query(sql, [email])

        if (!user[0]) return done(null, false)

        const isCorrectPassword = await bcrypt.compare(password, user[0].password);
        if (!isCorrectPassword) return done(null, false)
        done(null, user[0])
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: 'NodejsApiAuthentication'
}, async(payload: string, done: any) => {
    try {
        const sql = "SELECT id, login_time, create_time, avatar, name, email, token FROM user WHERE token=?"
        const user = await db.Query(sql, [payload.sub])

        if (!user[0]) return done(null, false)

        done(null, user[0]);
    } catch (error) {
        done(error, false);
    }
}))