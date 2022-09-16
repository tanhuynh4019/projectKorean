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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.exp = new Date().setDate(new Date().getDate() + 3);
        this.iat = new Date().getTime();
        this.jwt_secret = String(process.env.JWT_SECRET);
    }
    endcodedToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const c_token = yield jsonwebtoken_1.default.sign({
                sub: token,
                iat: this.iat,
                exp: this.exp
            }, this.jwt_secret);
            return c_token;
        });
    }
}
exports.default = new JWT();
