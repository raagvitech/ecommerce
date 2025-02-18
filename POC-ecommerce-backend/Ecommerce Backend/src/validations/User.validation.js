'user strict'

const joi = require('joi');

const registerValidationSchema = joi.object({
    first_name : joi.string().required(),
    last_name : joi.string().required(),
    email : joi.string().email().required(),
    mobile: joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
    password : joi.string().required(),
    profile_image : joi.string().allow("")
})

const loginSchema = joi.object({
    email : joi.string().required(),
    password : joi.string().min(6).max(100).required(),
})

module.exports = {
    registerValidationSchema, loginSchema
}
