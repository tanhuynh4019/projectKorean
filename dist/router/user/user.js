"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
require("../../middleware/passport");
const user_validate_1 = __importDefault(require("../../helpers/validate/user.validate"));
const user_1 = __importDefault(require("../../controller/user"));
const router = express_1.default.Router();
// router.post('/api/user/v1/login', validate.validateBody(validate.schemas.userLogin), controller.Login)
router.post('/api/user/v1/login', user_validate_1.default.validateBody(user_validate_1.default.schemas.userLogin), user_1.default.Login);
router.post('/api/user/v1/register', user_validate_1.default.validateBody(user_validate_1.default.schemas.userRegister), user_1.default.Register);
router.get('/api/user/v1/get-profile', passport_1.default.authenticate('jwt', {
    session: false
}), user_1.default.GetProfile);
exports.default = router;
