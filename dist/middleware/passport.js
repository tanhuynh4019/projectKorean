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
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = __importDefault(require("passport-local"));
const userInfo_1 = __importDefault(require("../model/userInfo"));
const { ExtractJwt } = require('passport-jwt');
passport_1.default.use(new passport_local_1.default.Strategy({
    usernameField: 'email'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const getProfile = yield userInfo_1.default.findOne({ id: payload.id });
        if (!getProfile)
            return done(null, false);
        done(null, getProfile);
    }
    catch (error) {
        done(error, false);
    }
})));
