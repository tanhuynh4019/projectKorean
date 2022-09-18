"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const wallet_validate_1 = __importDefault(require("../../helpers/validate/wallet.validate"));
require("../../middleware/passport");
const wallet_1 = __importDefault(require("../../controller/wallet"));
const router = express_1.default.Router();
router.post('/api/wallet/v1/get-wallet', passport_1.default.authenticate('jwt', {
    session: false
}), wallet_1.default.GetWallet);
router.post('/api/wallet/v1/create-wallet', wallet_validate_1.default.validateBody(wallet_validate_1.default.schemas.userCreateWallet), passport_1.default.authenticate('jwt', {
    session: false
}), wallet_1.default.CreateWallet);
exports.default = router;
