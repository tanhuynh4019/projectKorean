"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
class MulterClass {
    uploadImage(url, key) {
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, url);
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
            }
        });
        const fileFilter = function (req, file, cb) {
            const whitelist = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/webp'
            ];
            if (!whitelist.includes(file.mimetype)) {
                return cb('Định dạng ảnh phải là png, jpeg, jpg, webp');
            }
            cb(null, true);
        };
        return (0, multer_1.default)({ storage, fileFilter }).single(key);
    }
    uploadNone() {
        return (0, multer_1.default)().none();
    }
}
exports.default = new MulterClass();
