import { NextFunction, Request, Response } from "express"
import coinService from "../service/coin"

class CoinController {
    public async GetCoin(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await coinService.getCoin(req.body);
            if (result) {
                res.status(200).json({ status: 200, error: false, message: coinService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: coinService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new CoinController()