"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
// connect mongo
mongoose_1.default
    .connect(String(process.env.MONGO_URL))
    .then((result) => {
    console.log("mongoose connect successfully");
})
    .catch((error) => {
    console.log(error);
});
// ** Connect router **
const socket_1 = __importDefault(require("./config/socket"));
const port = Number(process.env.PORT) || 1000;
socket_1.default.Realtime(app, port);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('', express_1.default.static(__dirname + '/uploads'));
// routes
(0, router_1.default)(app);
