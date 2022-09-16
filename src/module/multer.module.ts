import multer from 'multer'

class MulterClass {
    public uploadImage(url: string, key: string) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {

                cb(null, url);
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
            }
        })

        const fileFilter = function (req: any, file: any, cb: any) {

            const whitelist = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/webp'
            ]

            if (!whitelist.includes(file.mimetype)) {
                return cb('Định dạng ảnh phải là png, jpeg, jpg, webp')
            }

            cb(null, true)
        }

        return multer({ storage, fileFilter }).single(key)
    }

    public uploadNone(){
        return multer().none()
    }
}

export default new MulterClass()