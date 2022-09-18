import passport from "passport"
import express from 'express'
import multer from "../../module/multer.module"
import "../../middleware/passport"

import validate from "../../helpers/validate/user.validate"

import controller from "../../controller/user"

const router = express.Router()

// router.post('/api/user/v1/login', validate.validateBody(validate.schemas.userLogin), controller.Login)
router.post('/api/user/v1/login', validate.validateBody(validate.schemas.userLogin), controller.Login)
router.post('/api/user/v1/register', validate.validateBody(validate.schemas.userRegister), controller.Register)
router.get('/api/user/v1/get-profile', passport.authenticate('jwt', {
    session: false
}), controller.GetProfile)


export default router

