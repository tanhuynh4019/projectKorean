"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../../middleware/passport");
const user_1 = __importDefault(require("../../controller/user"));
const router = express_1.default.Router();
// router.post('/api/user/v1/login', validate.validateBody(validate.schemas.userLogin), controller.Login)
router.post('/api/user/v1/login', user_1.default.Login);
router.post('/api/user/v1/register', user_1.default.Register);
router.get('/api/user/v1/get-profile', user_1.default.GetProfile);
exports.default = router;
