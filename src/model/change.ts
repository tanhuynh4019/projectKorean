import mongoose from 'mongoose'

let Schema = new mongoose.Schema({
    name: {type:String},
    value: {type:String},
});

export default mongoose.model('Change', Schema)