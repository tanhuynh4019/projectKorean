import mongoose from 'mongoose'

let Schema = new mongoose.Schema({
    code: {type:String, default: ''},
    price: {type:Number, default: 0},
    name: {type: String, default: ''},
    is_active: {type:Boolean, default: true},
    type: {type:String, default: 'PAYMENT'},
    create_AT: {type:Date, default: new Date(Date.now())}
});

export default mongoose.model('Code', Schema)