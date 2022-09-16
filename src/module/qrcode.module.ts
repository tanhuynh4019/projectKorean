import qrcode from 'qrcode'

class QrCode {

    public async create_qrcode_img(content: string) {
        let img = '';
        let qr = await qrcode.toDataURL(content);
        img = `<image src= " ` + qr + `" />`
        return img
    }
}

export default new QrCode()