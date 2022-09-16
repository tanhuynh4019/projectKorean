import dotenv from 'dotenv'
dotenv.config()

const SERVER_PORT: Number = Number(process.env.PORT) || 3000


const SERVER = {
    server_port: SERVER_PORT
}

const config = {
    server: SERVER
}

export default config