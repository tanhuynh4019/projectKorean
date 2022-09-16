import { NextFunction, Request, Response } from "express"
import userService from "../service/user"

class UserController {
    public async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.login();
            if (result) {
                res.status(200).json({ status: 200, error: false, message: userService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: userService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async Register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.register();
            if (result) {
                res.status(200).json({ status: 200, error: false, message: userService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: userService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }

    public async GetProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.profile();
            if (result) {
                res.status(200).json({ status: 200, error: false, message: userService.getMessage(), data: result })
            } else {
                res.status(400).json({ status: 400, error: true, message: userService.getMessage() })
            }

        } catch (error: any) {
            res.status(400).json({ status: 400, error: true, message: error.message })
        }
    }
}

export default new UserController()