"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const db_1 = __importDefault(require("../config/db"));
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = __importDefault(require("passport-local"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { ExtractJwt } = require('passport-jwt');
passport_1.default.use(new passport_local_1.default.Strategy({
    usernameField: 'email'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = "SELECT * FROM user WHERE email=?";
        const user = yield db_1.default.Query(sql, [email]);
        if (!user[0])
            return done(null, false);
        const isCorrectPassword = yield bcryptjs_1.default.compare(password, user[0].password);
        if (!isCorrectPassword)
            return done(null, false);
        done(null, user[0]);
    }
    catch (error) {
        done(error, false);
    }
})));
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: 'NodejsApiAuthentication'
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = "SELECT id, login_time, create_time, avatar, name, email, token FROM user WHERE token=?";
        const user = yield db_1.default.Query(sql, [payload.sub]);
        if (!user[0])
            return done(null, false);
        done(null, user[0]);
    }
    catch (error) {
        done(error, false);
    }
})));
