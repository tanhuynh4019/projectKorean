import mongoose from 'mongoose'

let Schema = new mongoose.Schema({
    user_auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accountId:  {type:String, default: ''},
    symbolFrom: {type:String, default: ''},
    symbolTo: {type:String, default: ''},
    amount: {type:Number, default: 0},
    create_at: {type: Date, default: new Date(Date.now())}
});

export default mongoose.model('HistoryCopytrading', Schema)