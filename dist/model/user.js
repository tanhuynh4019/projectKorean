"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let Schema = new mongoose_1.default.Schema({
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, hide: true },
        role: { type: Number, default: 1 },
        fullname: { Type: String, default: '' },
        token: String,
        lastDate: Date,
        lastLogin: Date,
        regDate: Date,
        ip: String,
    }
});
// Các phương thức ======================
// Tạo mã hóa mật khẩu
Schema.methods.generateHash = function (password) {
    return bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(12));
};
// kiểm tra mật khẩu có trùng khớp
Schema.methods.validPassword = function (password) {
    return bcryptjs_1.default.compareSync(password, this.password);
};
exports.default = mongoose_1.default.model('User', Schema);
