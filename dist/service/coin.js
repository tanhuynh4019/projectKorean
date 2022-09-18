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
const coin_1 = __importDefault(require("../model/coin"));
const coin_2 = __importDefault(require("../model/coin"));
class CoinService {
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
    getCoin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = body;
                const typeV = type ? type : 'PAYMENT';
                const findAll = yield coin_2.default.findOne({ type: typeV });
                this.setMessage("List Coin !");
                return findAll;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
    checkCoin(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findAll = yield coin_2.default.find();
                for (let i = 0; i < findAll.length; i++) {
                    if (findAll[i].code != symbol) {
                        return false;
                    }
                }
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    Create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const array = [
                    {
                        code: 'USDT',
                        price: 1,
                        name: 'Tether USDT',
                        image: '/images/coin/USDT.png'
                    }
                ];
                for (let i = 0; i < array.length; i++) {
                    const find = yield coin_1.default.findOne({
                        code: array[i].code
                    });
                    if (!find) {
                        const createCoin = yield coin_1.default.create(array[i]);
                        createCoin.save();
                    }
                }
                this.setMessage("List Coin !");
                return {};
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
}
exports.default = new CoinService('');
