"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = new mongoose_1.default.Schema({
    user_auth: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    accountId: { type: String, default: '' },
    symbolFrom: { type: String, default: '' },
    symbolTo: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    create_at: { type: Date, default: new Date(Date.now()) }
});
exports.default = mongoose_1.default.model('HistoryCopytrading', Schema);
