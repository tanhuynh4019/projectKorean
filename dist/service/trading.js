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
const axios_1 = __importDefault(require("axios"));
const rating_1 = __importDefault(require("../model/rating"));
const historyCopytrading_1 = __importDefault(require("../model/historyCopytrading"));
const lang_1 = __importDefault(require("../service/lang"));
const wallet_1 = __importDefault(require("../service/wallet"));
const changes_1 = __importDefault(require("../service/changes"));
const history_copytrading_1 = __importDefault(require("../service/history_copytrading"));
const coin_1 = __importDefault(require("../service/coin"));
class TradingService {
    constructor(message) {
        this.random = Math.random().toString(36).substring(2, 7);
        this.dateNow = new Date(Date.now());
        this.getMessage = () => {
            return this.message;
        };
        this.setMessage = (message) => {
            this.message = message;
        };
        this.message = message;
    }
    list(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { top, orderby, count, widget_key, skip } = body;
                const arr = [];
                const getTrading = yield rating_1.default.find().limit(top).skip(skip);
                const langs = yield lang_1.default.getLang();
                for (let i = 0; i < getTrading.length; i++) {
                    for (let j = 0; j < langs.length; j++) {
                        if (getTrading[i].account.countryCode == langs[j].code) {
                            getTrading[i].account.imageLang = langs[j].image;
                            arr.push(getTrading[i]);
                        }
                    }
                }
                this.setMessage("Trading List !");
                return arr;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    SaveTradinglist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://ratings-live.dpcopytrading.com/api/rating/1?$top=65&$orderby=ratingPoints%20desc&$count=true&widget_key=social_platform_ratings`;
                const res = yield axios_1.default.get(url);
                const tradings = res.data.items;
                for (let i = 0; i < tradings.length; i++) {
                    const find = yield rating_1.default.findOne({
                        accountId: tradings[i].accountId
                    });
                    if (!find) {
                        const create = yield rating_1.default.create(tradings[i]);
                        create.save();
                    }
                    else {
                        yield rating_1.default.findOneAndUpdate({ accountId: tradings[i].accountId }, tradings[i]);
                    }
                }
                this.setMessage("Thêm thành công !");
                return {
                    "m": 'Ok'
                };
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    detail(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = params;
                const { type } = body;
                let details;
                switch (type) {
                    case 'profile':
                        var url = `
                    http://ratings-live.dpcopytrading.com/api/rating/1/profile/${id}?widget_key=social_platform_ratings`;
                        details = yield axios_1.default.get(url);
                        const langs = yield lang_1.default.getLang();
                        for (let j = 0; j < langs.length; j++) {
                            if (details.data.account.countryCode == langs[j].code) {
                                details.data.account.imageLang = langs[j].image;
                            }
                        }
                        break;
                    case 'instruments':
                        var url = `
                    http://ratings-live.dpcopytrading.com/api/reports/${id}/instruments?widget_key=social_platform_ratings`;
                        details = yield axios_1.default.get(url);
                        break;
                    case 'trading':
                        var url = `
                    http://ratings-live.dpcopytrading.com/api/reports/${id}/trading?widget_key=social_platform_ratings`;
                        details = yield axios_1.default.get(url);
                        break;
                    case 'indicators':
                        var url = `
                        http://ratings-live.dpcopytrading.com/api/reports/${id}/indicators?widget_key=social_platform_ratings`;
                        details = yield axios_1.default.get(url);
                        break;
                    default:
                        details = [];
                }
                this.setMessage("Detail Trading!");
                return details.data;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    create(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { symbols, amount, accountId } = body;
                const arrSymbol = symbols.split(",");
                for (let i = 0; i < arrSymbol.length; i++) {
                    const checkCoin = yield coin_1.default.checkCoin(arrSymbol[i]);
                    if (!checkCoin) {
                        this.setMessage(`Invalid symbol [${arrSymbol[i]}] !`);
                        return false;
                    }
                }
                const wl = yield wallet_1.default.getWalletToUserIdAndSymbol(user._id, 'USDT');
                if (wl.amount < amount) {
                    this.setMessage("USDT wallet balance is not enough !");
                    return false;
                }
                const limit_from_copytrading = yield changes_1.default.findByName('limit_from_copytrading');
                const limit_to_copytrading = yield changes_1.default.findByName('limit_to_copytrading');
                if (amount < limit_from_copytrading.value) {
                    this.setMessage(`You must deposit more than ${limit_from_copytrading.value} USDT !`);
                    return false;
                }
                if (amount > limit_to_copytrading.value) {
                    this.setMessage(`You must deposit less than ${limit_to_copytrading.value} USDT !`);
                    return false;
                }
                yield wallet_1.default.updateWalletUserIDSubtraction(amount, 'USDT', user._id);
                // Lưu lịch sử
                for (let i = 0; i < arrSymbol.length; i++) {
                    yield history_copytrading_1.default.create(user._id, accountId, 'USDT', arrSymbol[i], amount);
                }
                this.setMessage("Copytrading successfully !");
                return {};
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    historyByUserID(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accountId } = body;
                const getHistory = yield historyCopytrading_1.default.find({
                    accountId,
                    user_auth: user._id
                });
                this.setMessage("List history copytraning !");
                return getHistory;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = new TradingService('');
