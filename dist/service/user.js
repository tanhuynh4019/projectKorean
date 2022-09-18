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
// import axios from 'axios'
const bcrypt_module_1 = __importDefault(require("../module/bcrypt.module"));
const jwt_module_1 = __importDefault(require("../module/jwt.module"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../model/user"));
const userInfo_1 = __importDefault(require("../model/userInfo"));
const role_enum_1 = __importDefault(require("../common/role.enum"));
class UserService {
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
    login(body, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = body;
                const findByOneUser = yield user_1.default.findOne({ 'local.email': email });
                if (!findByOneUser) {
                    this.setMessage("No matching account found !");
                    return false;
                }
                // So sánh password hash
                const bcryptCompare = yield bcrypt_1.default.compare(password, findByOneUser.local.password);
                if (!bcryptCompare) {
                    this.setMessage("No matching account found !");
                    return false;
                }
                const payload = {
                    id: findByOneUser._id,
                    email: findByOneUser.local.email,
                };
                // Tạo jwt
                const jwtSign = yield jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 36000 * 24 });
                if (!jwtSign) {
                    this.setMessage("Feature temporarily closed for maintenance!");
                    return false;
                }
                findByOneUser.local.lastLogin = this.dateNow;
                findByOneUser.save();
                let result = {
                    token: jwtSign,
                    data: payload
                };
                this.setMessage("Logged in successfully !");
                return result;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    register(body, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, confirmPassword } = body;
                if (confirmPassword != password) {
                    this.setMessage("Confirmed password is incorrect !");
                    return false;
                }
                const checkExistsEmail = yield user_1.default.findOne({ 'local.email': email });
                if (checkExistsEmail) {
                    this.setMessage("Email already exists !");
                    return false;
                }
                const data = {
                    local: {
                        email,
                        password: yield bcrypt_module_1.default.hashPassword(password),
                        role: role_enum_1.default.USER,
                        fullname: '',
                        token: this.random,
                        regDate: this.dateNow,
                        ip
                    }
                };
                const saveUser = yield user_1.default.create(data);
                saveUser.save();
                if (!saveUser) {
                    this.setMessage("Registration failed !");
                    return false;
                }
                const saveUserInfo = yield userInfo_1.default.create({
                    id: saveUser._id,
                    joinedOn: this.dateNow,
                    email,
                    name: email.substring(0, email.lastIndexOf("@"))
                });
                saveUserInfo.save();
                // Tạo jwt
                const payload = {
                    id: saveUser._id,
                    email
                };
                const jwtSign = yield jwt_module_1.default.sign(payload);
                let result = {
                    token: jwtSign,
                    data: payload
                };
                this.setMessage("Sign Up Success !");
                return result;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Registration failed !");
                return false;
            }
        });
    }
    profile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = user;
                this.setMessage("Information !");
                userData._id = null;
                return userData;
            }
            catch (error) {
                console.log(error);
                this.setMessage("Disconnect! !");
                return false;
            }
        });
    }
}
exports.default = new UserService('');
