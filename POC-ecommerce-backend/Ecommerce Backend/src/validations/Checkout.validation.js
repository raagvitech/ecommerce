'user strict'

const joi = require('joi');
const Joi = require('joi');

const CheckoutValidationSchema = joi.object({
    user_uuid: joi.string().required()
})

module.exports = { CheckoutValidationSchema, }