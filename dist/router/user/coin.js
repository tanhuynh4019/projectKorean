"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../../middleware/passport");
const coin_1 = __importDefault(require("../../controller/coin"));
const router = express_1.default.Router();
router.post('/api/coin/v1/get-coin', coin_1.default.GetCoin);
exports.default = router;
