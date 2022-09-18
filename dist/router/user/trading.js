"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
require("../../middleware/passport");
const trading_1 = __importDefault(require("../../controller/trading"));
const router = express_1.default.Router();
// router.post('/api/user/v1/login', validate.validateBody(validate.schemas.userLogin), controller.Login)
router.post('/api/trading/v1/list', trading_1.default.GetList);
router.post('/api/trading/v1/details/:id', trading_1.default.Details);
router.post('/api/trading/v1/create', passport_1.default.authenticate('jwt', {
    session: false
}), trading_1.default.Create);
router.get('/api/trading/v1/history-trading', passport_1.default.authenticate('jwt', {
    session: false
}), trading_1.default.HistoryTrading);
exports.default = router;
