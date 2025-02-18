'use strict';

const { CategoryValidationSchema } = require('../validations/Category.validation');
const Category  = require('../models/Category.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class CategoryController {

    static async add(req, res){
        try {
             let payload = await CategoryValidationSchema.validateAsync(req.body)

             let result = await Category.create(payload);
             return res.status(200).json(
                new ApiResponse(200, { result },"Category Added Successfully")
             )
        } catch (error) {
            return res.status(400).json(
                new ApiError(400, error.message)
            ) 
        }
    }

    static async list(req, res) {
        try {

            let match = {
                is_active: true,
            }

            let result = await Category.aggregate([
                {
                    $match: { ...match }
                },
                {
                    $sort: { name: 1 }
                }
            ]);
            let results = await Category.aggregate([
                {
                    $match: { ...match }
                },
            ])

            var count = results.length

            return res.status(200).json(
                new ApiResponse(
                    200,
                    { count, result },
                    "Data Fetched Successfully",
                )
            )


        } catch (error) {
            return res.status(400).json(
                new ApiError(400, error.message)
            )
        }
    }
}

module.exports = CategoryController