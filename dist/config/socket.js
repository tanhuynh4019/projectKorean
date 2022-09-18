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
const http_1 = require("http");
const delay_1 = __importDefault(require("delay"));
const socket_io_1 = require("socket.io");
const trading_1 = __importDefault(require("../service/trading"));
class SocketIO {
    Realtime(app, port) {
        const httpServer = (0, http_1.createServer)(app);
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*" || process.env.URL_FRONT_END,
                // origin: process.env.URL_FRONT_END,
                methods: ["GET", "POST"],
            },
        });
        io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
            this.loadTradings(socket);
            this.createTradings(socket);
            // this.loadTokenHolders(socket)
        }));
        // ** Connect server **
        httpServer.listen(port, () => console.log(`Connect port ${port}`));
    }
    loadTradings(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                console.log('===> 1');
                // const body = {
                //     "top": 10,
                //     "skip": 0,
                //     "orderby": "ratingPoints desc",
                //     "count": true,
                //     "widget_key": "social_platform_ratings"
                // }
                // const tradings: any = await tradingService.list(body)
                // socket.emit("tradings", {
                //     results: tradings,
                // });
                yield (0, delay_1.default)(15000);
            }
        });
    }
    createTradings(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                console.log('===> 2');
                yield trading_1.default.SaveTradinglist();
                yield (0, delay_1.default)(120000);
            }
        });
    }
}
exports.default = new SocketIO();
