import { NextFunction, Request, Response } from "express"
import tradingService from "../service/trading"

class TradingController {
    public async GetList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await tradingService.list(req.body);
            if (result) {
                res.status(200).json({ status: 200, error: false, message: tradingService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: tradingService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async SaveTrading(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await tradingService.SaveTradinglist();
            if (result) {
                res.status(200).json({ status: 200, error: false, message: tradingService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: tradingService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async Details(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await tradingService.detail(req.params, req.body);
            if (result) {
                res.status(200).json({ status: 200, error: false, message: tradingService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: tradingService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async Create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await tradingService.create();
            if (result) {
                res.status(200).json({ status: 200, error: false, message: tradingService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: tradingService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new TradingController()