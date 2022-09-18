import { createServer } from 'http'
import delay from 'delay'
import { Server } from 'socket.io'
import axios from 'axios'
import tradingModel from '../service/trading'

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
            // this.loadTokenHolders(socket)
        })

        // ** Connect server **

        httpServer.listen(port, () => console.log(`Connect port ${port}`))
    }

    private async loadTradings(socket: any) {
        while (true) {
            // const res: any = await tradingModel.SaveTradinglist();
            console.log('hello!');
            await delay(2000);
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

    // private checkStt(i: number) {
    //     const ii = i + 1;
    //     if (ii < 10) {
    //         return 1;
    //     } else if (ii < 100) {
    //         return 2;
    //     } else if (ii < 1000) {
    //         return 3;
    //     } else if (ii < 10000) {
    //         return 4;
    //     } else if (ii < 100000) {
    //         return 5;
    //     } else if (ii < 1000000) {
    //         return 6;
    //     } else if (ii < 10000000) {
    //         return 7;
    //     } else if (ii < 100000000) {
    //         return 8;
    //     } else if (ii < 1000000000) {
    //         return 9;
    //     } else if (ii < 10000000000) {
    //         return 10;
    //     } else if (ii < 100000000000) {
    //         return 11;
    //     } else if (ii < 1000000000000) {
    //         return 12;
    //     } else if (ii < 10000000000000) {
    //         return 13;
    //     } else if (ii < 100000000000000) {
    //         return 14;
    //     } else if (ii < 1000000000000000) {
    //         return 15;
    //     } else {
    //         return 0;
    //     }
    // }
}

export default new SocketIO()

