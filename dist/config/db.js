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
const mysql_1 = __importDefault(require("mysql"));
const util_1 = __importDefault(require("util"));
class MySql {
    constructor() {
        this.query_data = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        };
    }
    Connect() {
        var con = mysql_1.default.createConnection(this.query_data);
        con.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected!");
        });
    }
    Query(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var con = yield mysql_1.default.createConnection(this.query_data);
                const query = util_1.default.promisify(con.query).bind(con);
                const result = yield query(sql, values);
                return result;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
exports.default = new MySql();
