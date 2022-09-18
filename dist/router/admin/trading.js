"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../../middleware/passport");
const trading_1 = __importDefault(require("../../controller/trading"));
const router = express_1.default.Router();
router.post('/api/trading/v1/admin/save-trading', trading_1.default.SaveTrading);
exports.default = router;
