"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    avatar: { type: String, default: '0' },
    joinedOn: { type: Date, default: new Date() },
    email: { type: String, default: '' },
    veryphone: { type: Boolean, default: false },
    veryold: { type: Boolean, default: false }, // Đã từng xác thực
});
exports.default = mongoose_1.default.model('UserInfo', Schema);
