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
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const { JSDOM } = require("jsdom");
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
            // this.loadTransactions(socket)
            // this.loadTokenHolders(socket)
        }));
        // ** Connect server **
        httpServer.listen(port, () => console.log(`Connect port ${port}`));
    }
}
exports.default = new SocketIO();
