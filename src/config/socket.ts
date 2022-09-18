import { createServer } from 'http'
import delay from 'delay'
import { Server } from 'socket.io'
import axios from 'axios'
import tradingService from '../service/trading'

class SocketIO {

    public Realtime(app: any, port: any) {
        const httpServer = createServer(app)

        const io = new Server(httpServer, {
            cors: {
                origin: "*" || process.env.URL_FRONT_END,
                // origin: process.env.URL_FRONT_END,
                methods: ["GET", "POST"],
            },
        })


        io.on("connection", async (socket: any) => {
            this.loadTradings(socket)
            this.createTradings(socket)
            // this.loadTokenHolders(socket)
        })

        // ** Connect server **

        httpServer.listen(port, () => console.log(`Connect port ${port}`))
    }

    private async loadTradings(socket: any) {
        while (true) {
            console.log('===> 1');
            // const body = {
            //     "top": 10,
            //     "skip": 0,
            //     "orderby": "ratingPoints desc",
            //     "count": true,
            //     "widget_key": "social_platform_ratings"
            // }
            // const tradings: any = await tradingService.list(body)
            // socket.emit("tradings", {
            //     results: tradings,
            // });
            await delay(15000);
        }
    }

    private async createTradings(socket: any) {
        while (true) {
            console.log('===> 2');
            await tradingService.SaveTradinglist();
            await delay(120000);
        }
    }

    // private async loadTokenHolders(socket: any) {
    //     while (true) {
    //         const url = "https://testnet.bscscan.com/token/generic-tokenholders2";
    //         const query = {
    //             m: "normal",
    //             a: "0xbE046Da0eBB8AfA60c8225eB255C22ABa11B1250",
    //             p: "1",
    //         };
    //         const get = await axios.get(url, {
    //             params: query,
    //         });

    //         const dom = new JSDOM(get.data);

    //         const arrText = dom.window.document
    //             .querySelector("tbody")
    //             .textContent.replace("\n", "")
    //             .split(" ");

    //         const output = [];

    //         let sumPrice = 0;
    //         for (var i = 0; i < arrText.length; i++) {
    //             sumPrice += Number(
    //                 arrText[i]
    //                     .substring(43)
    //                     .replace("%", "")
    //                     .replace("0.0000", "")
    //                     .replace(/,/g, "")
    //             );
    //             output.push({
    //                 address: arrText[i].substring(this.checkStt(i), 43),
    //                 quantity: arrText[i]
    //                     .substring(43)
    //                     .replace("%", "")
    //                     .replace("0.0000", "")
    //                     .replace(/,/g, ""),
    //             });
    //         }
    //         socket.emit("message-holders", {
    //             results: output,
    //             sumPrice: sumPrice,
    //         });
    //         await delay(6000);
    //     }
    // }
}

export default new SocketIO()

