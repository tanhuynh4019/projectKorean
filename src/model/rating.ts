import mongoose from 'mongoose'

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
    totalProfit: Number,
    maxProfit: Number,
    maxProfitTime: Date,
    maxDrawdown: Number,
    maxDrawdownTime: Date,
    maxDailyProfit: Number,
    maxDailyProfitTime: Date,
    maxDailyLoss: Number,
    maxDailyLossTime: Date,
    averageDailyProfit: Number,
    averageDailyLoss: Number,
    dailyReturnVolatility: Number,
    returnVolatility: Number,
    geometricAverageReturnWeekly: Number,
    geometricAverageReturnMonthly: Number,
    geometricStandardDeviation: Number,
    geometricStandardDeviationYear: Number,
    geometricStandardDeviationMonth: Number,
    grossDepositMonth: Number,
    grossWithdrawalMonth: Number,
    netDepositMonth: Number,
    volumeMonth: Number,
    returnAllTime: Number,
    returnYear: String,
    returnHalfYear: String,
    returnQuarter: String,
    returnMonth: String,
    returnWeek: String,
    returnDay: Number,
    returnCalendarMonth: Number,
    returnPreviousMonth: String,
    history: Object,
    age: Number,
    ratingPoints: Number,
    server: Object,
    updatedUtc: Date

});

export default mongoose.model('Trading', Schema)