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
const web3_1 = __importDefault(require("web3"));
const coin_1 = __importDefault(require("../service/coin"));
const wallet_code_1 = __importDefault(require("../model/wallet_code"));
class WalletService {
    constructor(message) {
        this.random = Math.random().toString(36).substring(2, 16);
        this.dateNow = new Date(Date.now());
        this.getMessage = () => {
            return this.message;
        };
        this.setMessage = (message) => {
            this.message = message;
        };
        this.message = message;
    }
    wallet(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getWallet = yield wallet_code_1.default.find({
                    user_auth: user._id
                });
                console.log(getWallet);
                const obj = {};
                for (let i = 0; i < getWallet.length; i++) {
                    obj[`${getWallet[i].code}`] = getWallet[i].amount;
                }
                this.setMessage("List wallet !");
                return obj;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
    getWalletToUserIdAndSymbol(userId, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getWallet = yield wallet_code_1.default.findOne({
                    user_auth: userId, symbol
                });
                return getWallet;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
    createWallet(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { symbol } = body;
                let result;
                const checkCoin = yield coin_1.default.checkCoin(symbol);
                if (!checkCoin) {
                    this.setMessage("Symbol is not valid !");
                    return false;
                }
                const check = yield wallet_code_1.default.findOne({
                    code: symbol, user_auth: user._id
                });
                if (check) {
                    result = {
                        address: check.address,
                        amount: check.amount,
                        code: check.code
                    };
                }
                else {
                    const wl = yield this.addWalletCode();
                    const data = {
                        user_auth: user._id,
                        address: wl.address,
                        private_key: wl.privateKey,
                        amount: 0,
                        code: symbol
                    };
                    const createWallet = yield wallet_code_1.default.create(data);
                    createWallet.save();
                    result = {
                        address: data.address,
                        amount: data.amount,
                        code: data.code
                    };
                }
                this.setMessage("Deposit !");
                return result;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
    updateWalletUserIDSubtraction(amount, symbol, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield wallet_code_1.default.findOne({ user_auth: userID, code: symbol });
                res.amount = res.amount - amount;
                res.save();
                return true;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
    addWalletCode() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const web3 = new web3_1.default('https://bas-aries-public.nodereal.io');
                const wl = web3.eth.accounts.create();
                return wl;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = new WalletService('');
