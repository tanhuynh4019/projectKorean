import passport from "passport"
import express from 'express'
import multer from "../../module/multer.module"
import "../../middleware/passport"

import controller from "../../controller/trading"

const router = express.Router()

router.post('/api/trading/v1/admin/save-trading', controller.SaveTrading)

export default router

