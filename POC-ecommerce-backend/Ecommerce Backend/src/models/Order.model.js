'use strict'

const mongoose = require('mongoose')
const crypto = require("crypto");

const OrderSchema = new mongoose.Schema({
    uuid : {
        type : String,
        required : false,
        unique : true
    },
    user_uuid : {
        type : String,
        required: false
    },
    total_amount : {
        type : Number,
        required : true
    },
    details : [],
    amount : {
        type : Number,
        required : true
    },
    is_active : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true,
    strict:  true
});

OrderSchema.pre('save', function(next){
    if(this.uuid) return next();

    this.uuid = "ORD-" + crypto.pseudoRandomBytes(4).toString('hex').toUpperCase();
    next();
});

module.exports = mongoose.model('order',OrderSchema);