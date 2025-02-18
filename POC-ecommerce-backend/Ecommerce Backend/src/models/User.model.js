'use strict'

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    uuid : {
            type : String,
            required : false
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    full_name:{
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type: String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['admin','consumer'],
        default : "consumer"
        
    },
    profile_image : {
        type: String,
        required : false,
    },
    is_active : {
        type : Boolean,
        default : true
    },
    is_deleted : {
        type : Boolean,
        default : false
    },
    refreshToken :{
        type : String,
        required : false
    }
},{
    timestamps : true,
    strict : true
})

UserSchema.pre("save",function(next){
   
    if(this.uuid) return  next();
    const codes = {
        admin    :'AD',
        Consumer : 'CN'

    }
    if (!this.profile) {
        this.profile = {};
    }
    this.full_name =  this.first_name +" "+this.last_name;
    this.uuid = codes[this.role] +"-"+crypto.pseudoRandomBytes(4).toString('hex').toUpperCase()
    next();
})



UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            uuid : this.uuid,
            role : this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

module.exports = mongoose.model("User", UserSchema);