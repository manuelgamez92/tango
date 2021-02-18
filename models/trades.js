
const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    id: Number,
    type: String,
    user_id:Number,
    symbol:String,
    shares:Number,
    price:Number,
    timestamp:Number
});

const Trade = mongoose.model("Trade",TradeSchema);

module.exports =Trade;