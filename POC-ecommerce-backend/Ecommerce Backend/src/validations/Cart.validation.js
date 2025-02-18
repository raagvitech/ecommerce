'user strict'

const joi = require('joi');
const Joi = require('joi');

const CartValidationSchema = joi.object({
    user_uuid: joi.string().required(),
    item_uuid: joi.string().required(),
    quantity: joi.number().required()
})

const quantityValidationSchema = joi.object({
    quantity: Joi.number().required()
})


const listSchema = joi.object({
    quantity: Joi.number().required()
})

module.exports = { CartValidationSchema, quantityValidationSchema, listSchema }