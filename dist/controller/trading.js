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
const trading_1 = __importDefault(require("../service/trading"));
class TradingController {
    GetList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield trading_1.default.list(req.body);
                if (result) {
                    res.status(200).json({ status: 200, error: false, message: trading_1.default.getMessage(), total: 65, data: result });
                }
                else {
                    res.status(400).json({ status: 400, error: true, message: trading_1.default.getMessage() });
                }
            }
            catch (error) {
                res.status(400).json({ status: 400, error: true, message: error.message });
            }
        });
    }
    SaveTrading(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield trading_1.default.SaveTradinglist();
                if (result) {
                    res.status(200).json({ status: 200, error: false, message: trading_1.default.getMessage(), data: result });
                }
                else {
                    res.status(400).json({ status: 400, error: true, message: trading_1.default.getMessage() });
                }
            }
            catch (error) {
                res.status(400).json({ status: 400, error: true, message: error.message });
            }
        });
    }
    Details(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield trading_1.default.detail(req.params, req.body);
                if (result) {
                    res.status(200).json({ status: 200, error: false, message: trading_1.default.getMessage(), data: result });
                }
                else {
                    res.status(400).json({ status: 400, error: true, message: trading_1.default.getMessage() });
                }
            }
            catch (error) {
                res.status(400).json({ status: 400, error: true, message: error.message });
            }
        });
    }
    Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield trading_1.default.create(req.body, req.user);
                if (result) {
                    res.status(200).json({ status: 200, error: false, message: trading_1.default.getMessage(), data: result });
                }
                else {
                    res.status(400).json({ status: 400, error: true, message: trading_1.default.getMessage() });
                }
            }
            catch (error) {
                res.status(400).json({ status: 400, error: true, message: error.message });
            }
        });
    }
    HistoryTrading(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield trading_1.default.historyByUserID(req.body, req.user);
                if (result) {
                    res.status(200).json({ status: 200, error: false, message: trading_1.default.getMessage(), data: result });
                }
                else {
                    res.status(400).json({ status: 400, error: true, message: trading_1.default.getMessage() });
                }
            }
            catch (error) {
                res.status(400).json({ status: 400, error: true, message: error.message });
            }
        });
    }
}
exports.default = new TradingController();
