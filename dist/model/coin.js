"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = new mongoose_1.default.Schema({
    code: { type: String, default: '' },
    price: { type: Number, default: 0 },
    name: { type: String, default: '' },
    is_active: { type: Boolean, default: true },
    type: { type: String, default: 'PAYMENT' },
    create_AT: { type: Date, default: new Date(Date.now()) }
});
exports.default = mongoose_1.default.model('Code', Schema);
