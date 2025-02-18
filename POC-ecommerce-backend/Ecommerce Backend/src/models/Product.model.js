'use strict'

const mongoose = require('mongoose');
const crypto = require('crypto');

const ProductSchema = new mongoose.Schema({
    uuid : {
        type : String,
        required : false,
        unique : true
    },
    category_uuid : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type  :Number,
        required : true,
        default : 0
    },
    size : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : '',
        required : false
    },
    is_active : {
        type : Boolean,
        default : true
    },
    is_deleted : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true,
    strict : true
});

ProductSchema.pre("save", function(next){
    if(this.uuid) return next();

    this.uuid = "PROD-"+crypto.pseudoRandomBytes(4).toString('hex').toUpperCase();
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'-');
    next();
});

module.exports = mongoose.model('Product',ProductSchema);