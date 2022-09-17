import mongoose from 'mongoose'
import IUserInfo from '../interface/userInfo'

let Schema = new mongoose.Schema({
    widgetId: Number,
    accountId: Number,
    cacheKey: String,    
    profileId: Number,
    accountName: String,
    account: Object, 
    additional: Object,
    public: Object,
    badges: Array,
    extension: Array,
    recoveryFactor: Number,
    absoluteGain: Number,
    downsideDeviation: Number,
    sharpeRatio: Number,
    totalProfit: Number
});

export default mongoose.model<IUserInfo>('UserInfo', Schema)
