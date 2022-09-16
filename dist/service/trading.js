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
Object.defineProperty(exports, "__esModule", { value: true });
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
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setMessage("Danh sách trading!");
                return {};
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    detail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setMessage("Xem chi tiết trading!");
                return {};
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setMessage("Copy thành công!");
                return {};
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = new TradingService('');
