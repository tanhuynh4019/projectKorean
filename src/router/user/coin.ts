import express from 'express'
import "../../middleware/passport"

import controller from "../../controller/coin"

const router = express.Router()

router.post('/api/coin/v1/get-coin', controller.GetCoin)

export default router

