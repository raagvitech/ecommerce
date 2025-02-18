'user strict'

const joi = require('joi');
const Joi = require('joi');

const CategoryValidationSchema = joi.object({
    name : joi.string().required()
}) 

module.exports = { CategoryValidationSchema, }