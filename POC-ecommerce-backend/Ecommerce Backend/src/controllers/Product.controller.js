'use strict';

const { ProductValidationSchema } = require('../validations/Product.validation');
const Product  = require('../models/Product.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class ProductController {

    static async add(req, res){
        try {
             let payload = await ProductValidationSchema.validateAsync(req.body)

             let result = await Product.create(payload);
             return res.status(200).json(
                new ApiResponse(200, { result },"Product Added Successfully")
             )
        } catch (error) {
            return res.status(400).json(
                new ApiError(400, error.message)
            ) 
        }
    }

    static async list(req, res) {
        try {

            let { page, limit, search, category_uuid } = req.query;

            if (page == "" || page == undefined) page = 0;
            if (limit == "" || limit == undefined) limit = 10;

            let skip = Number(page) * Number(limit);

            let match = {
                is_deleted: false,
            }

            if(category_uuid !="" && category_uuid != undefined){
                match.category_uuid = category_uuid
             }

            let result = await Product.aggregate([
                {
                    $match: { ...match }
                },
                {
                    $lookup : {
                        from : 'categories',
                        localField : 'category_uuid',
                        foreignField : "uuid",
                        as : 'category'
                    }
                },
                {
                    $match: {
                        $or: [
                            { "name": { $regex: `${search}`, $options: 'i' } },
                        ]
                    }
                },
                {
                    "$set": {
                      "image_url": {
                        $cond : {
                            if : {
                                $ne : ["$image" , ""]
                            },
                            then : {
                                "$concat": [
                                  "$image"
                                ]
                              },
                            else : {
                                "$concat" : [
                                    process.env.IMAGE_URL,'',
                                    'no-img.png'
                                ]
                            }
                        }
                      }
                    }
                },
                {
                    $sort: { name: 1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: Number(limit)
                }
            ]);
            let results = await Product.aggregate([
                {
                    $match: { ...match }
                },
                {
                    $match: {
                        $or: [
                            { "name": { $regex: `${search}`, $options: 'i' } },
                        ]
                    }
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


module.exports = ProductController