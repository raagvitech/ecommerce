'user strict'

const joi = require('joi');

const ProductValidationSchema = joi.object({
    category_uuid : joi.string().required(),
    name : joi.string().required(),
    price : joi.number().required(),
    size : joi.string().required(),
    color : joi.string().required(),
    image : joi.string().allow("")
})

module.exports = { ProductValidationSchema }