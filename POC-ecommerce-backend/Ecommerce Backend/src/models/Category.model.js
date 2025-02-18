'use strict';

const mongoose  = require('mongoose');
const crypto = require('crypto');

const CategorySchema = new mongoose.Schema({
    uuid : {
        type : String,
        required : false
    },
    name : {
        type : String,
        required : true
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

CategorySchema.pre('save', function(next){
    if(this.uuid) return next();

    this.uuid = 'CAT-'+ crypto.pseudoRandomBytes(4).toString('hex').toUpperCase();
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'-');
    next();
})

module.exports = mongoose.model('Category', CategorySchema);