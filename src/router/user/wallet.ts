import passport from "passport"
import express from 'express'
import multer from "../../module/multer.module"
import validate from "../../helpers/validate/wallet.validate"
import "../../middleware/passport"

import controller from "../../controller/wallet"

const router = express.Router()

router.post('/api/wallet/v1/get-wallet',passport.authenticate('jwt', {
    session: false
}), controller.GetWallet)
router.post('/api/wallet/v1/create-wallet', validate.validateBody(validate.schemas.userCreateWallet) ,passport.authenticate('jwt', {
    session: false
}), controller.CreateWallet)

export default router

