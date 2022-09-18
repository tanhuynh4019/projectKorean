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
class LangService {
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
    getLang() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = [{
                        code: 'CN',
                        image: '/images/lang/cn.svg'
                    },
                    {
                        code: 'TH',
                        image: '/images/lang/th.svg'
                    },
                    {
                        code: 'MY',
                        image: '/images/lang/my.svg'
                    },
                    {
                        code: 'LA',
                        image: '/images/lang/la.svg'
                    }];
                return data;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
}
exports.default = new LangService('');
