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
const coin_1 = __importDefault(require("../service/coin"));
class CoinController {
    GetCoin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield coin_1.default.getCoin(req.body);
                if (result) {
                    res.status(200).json({ status: 200, error: false, message: coin_1.default.getMessage(), data: result });
                }
                else {
                    res.status(400).json({ status: 400, error: true, message: coin_1.default.getMessage() });
                }
            }
            catch (error) {
                res.status(400).json({ status: 400, error: true, message: error.message });
            }
        });
    }
}
exports.default = new CoinController();
