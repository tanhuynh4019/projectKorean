import { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'

import userRouter from './user/user'
import tradimgRouter from './user/trading'

const router = (app: Application) => {

    app.use(userRouter)
    app.use(tradimgRouter)

    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new createHttpError.NotFound())
    })

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        res.status(err.status || 500)
        res.send({
            status: err.status || 500,
            message: err.message
        })
    }

    app.use(errorHandler)
}

export default router
