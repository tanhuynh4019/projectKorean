import { NextFunction, Request, Response } from "express"
import walletService from "../service/wallet"

class WalletController {
    public async GetWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await walletService.wallet(req.body, req.user);
            if (result) {
                res.status(200).json({ status: 200, error: false, message: walletService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: walletService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async CreateWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await walletService.createWallet(req.body, req.user);
            if (result) {
                res.status(200).json({ status: 200, error: false, message: walletService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: walletService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new WalletController()