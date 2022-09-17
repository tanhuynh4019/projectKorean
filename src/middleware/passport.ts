import passport from 'passport'
import { Strategy } from 'passport-jwt'
import localStrategy from 'passport-local'
import bcrypt from 'bcryptjs'
import userModelInfo from '../model/userInfo'

const {
    ExtractJwt
} = require('passport-jwt')

passport.use(new localStrategy.Strategy({
    usernameField: 'email'
}, async(email: string, password: string, done: any) => {
    try {
        
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: 'NodejsApiAuthentication'
}, async(payload: any, done: any) => {
    try {
        const getProfile = await userModelInfo.findOne({ id: payload.id})

        if (!getProfile) return done(null, false)

        done(null, getProfile);
    } catch (error) {
        done(error, false);
    }
}))