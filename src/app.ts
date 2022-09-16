import express, { Application } from 'express'
import cors from "cors"
import morgan from "morgan"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

import router from './router'

const app: Application = express()
app.use(cors())

app.use(morgan('combined'))
// connect mongo
mongoose
    .connect(String(process.env.MONGO_URL))
    .then((result: any) => {
        console.log("mongoose connect successfully");
    })
    .catch((error: any) => {
        console.log(error);
    });


// ** Connect router **
import utilsRealtime from './config/socket'
const port = Number(process.env.PORT) || 1000
utilsRealtime.Realtime(app, port)


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('', express.static(__dirname + '/uploads'))

// routes
router(app);
