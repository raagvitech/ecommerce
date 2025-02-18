'user strict'

const joi = require('joi');
const Joi = require('joi');

const OrderalidationSchema = joi.object({
    checkout_uuid: Joi.string().required(),
    user_uuid: Joi.string().required()
})

module.exports = { OrderalidationSchema }