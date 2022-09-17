import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

let Schema = new mongoose.Schema({
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {type:String, default: ''},
    private_key: {type:String, default: ''},
    amount: {type: Number, default: 0},
    code: {type:String, default: ''},
    create_AT: {type:Date, default: new Date(Date.now())}
});

export default mongoose.model('WalletCode', Schema)