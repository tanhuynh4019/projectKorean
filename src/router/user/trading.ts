import passport from "passport"
import express from 'express'
import multer from "../../module/multer.module"
import "../../middleware/passport"

import controller from "../../controller/trading"

const router = express.Router()

// router.post('/api/user/v1/login', validate.validateBody(validate.schemas.userLogin), controller.Login)
router.post('/api/trading/v1/list', controller.GetList)
router.post('/api/trading/v1/details/:id', controller.Details)
router.post('/api/trading/v1/create', controller.Create)

export default router

