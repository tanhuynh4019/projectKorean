"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../../middleware/passport");
const trading_1 = __importDefault(require("../../controller/trading"));
const router = express_1.default.Router();
// router.post('/api/user/v1/login', validate.validateBody(validate.schemas.userLogin), controller.Login)
router.post('/api/trading/v1/list', trading_1.default.GetList);
router.get('/api/trading/v1/details', trading_1.default.Details);
router.post('/api/trading/v1/create', trading_1.default.Create);
exports.default = router;
