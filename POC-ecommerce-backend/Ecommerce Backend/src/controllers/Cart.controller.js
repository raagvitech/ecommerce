'use strict';

const { CartValidationSchema, quantityValidationSchema } = require('../validations/Cart.validation');
const Cart = require('../models/Cart.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class CartController {

    static async add(req, res) {

        try {
            let validData = await CartValidationSchema.validateAsync(req.body);

            if (
                (validData.user_uuid == "" || validData.user_uuid == undefined)
            ) {
                return res.status(400).send("Either consumer need.")
            }

            let checkItem = await Cart.findOne({ item_uuid: validData.item_uuid, user_uuid: validData.user_uuid });
            if (checkItem) {
                checkItem.quantity = checkItem.quantity + validData.quantity;
                await checkItem.save();
            } else {
                await Cart.create(validData);
            }

            return res.status(200).send({
                success: true,
                message: "Successfully Added."
            })
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    static async quantityUpdate(req, res) {
        try {

            const uuid = req.params.uuid

            let validData = await quantityValidationSchema.validateAsync(req.body);

            let result = await Cart.findOne({ uuid: uuid });
            if (result) {
                result.quantity = validData.quantity;
                result.save();
            }
            return res.status(200).send({
                success: true,
                message: "Successfully Updated."
            })
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    static async delete(req, res) {
        try {

            let uuid = req.params.uuid;
            let result = await Cart.findOneAndDelete({ uuid: uuid });

            return res.status(200).send({
                success: true,
                message: "Successfully Deleted."
            })
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }

    static async list(req, res) {
        try {

            const { user_uuid } = req.query


            if (user_uuid == "" || user_uuid == undefined) {
                return res.status(400).send('user_uuid is required')
            }

            let match = {
                is_deleted: false,
                user_uuid: user_uuid
            }

            let result = await Cart.aggregate([
                {
                    $match: match
                },
                {
                    $lookup: {
                        from: "products",
                        let: {
                            item_uuid: "$item_uuid",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ["$uuid", "$$item_uuid"] }],
                                    },
                                },
                            },
                            {
                                "$set": {
                                    "image_url": {
                                        $cond: {
                                            if: {
                                                $ne: ["$image", ""]
                                            },
                                            then: {
                                                "$concat": [
                                                    "$image"
                                                ]
                                            },
                                            else: {
                                                "$concat": [
                                                    process.env.SERVER_HOST, 'images/',
                                                    'no-img.png'
                                                ]
                                            }
                                        }
                                    }
                                }
                            },
                        ],
                        as: "products",
                    },
                },

                {
                    $addFields: {
                        'products.total_amount': { '$multiply': [{ $first: "$products.price" }, '$quantity'] },
                    }
                },
                {
                    $project: {
                        _id: "$_id",
                        is_active: "$is_active",
                        is_deleted: "$is_deleted",
                        item_uuid: "$item_uuid",
                        quantity: "$quantity",
                        user_uuid: "$user_uuid",
                        createdAt: "$createdAt",
                        updatedAt: "$updatedAt",
                        uuid: "$uuid",
                        product_name: { $first: "$products.name" },
                        product_price: { $first: "$products.price" },
                        image_url: { $first: "$products.image_url" },
                        total_amount: { $first: "$products.total_amount" },
                    }
                },
                {
                    $sort: { _id: -1 }
                },

            ])

            let sum = await Cart.aggregate([
                {
                    $match: match
                },
                {
                    $lookup: {
                        from: "products",
                        let: {
                            item_uuid: "$item_uuid",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ["$uuid", "$$item_uuid"] }],
                                    },
                                },
                            },
                            {
                                "$set": {
                                    "image_url": {
                                        $cond: {
                                            if: {
                                                $ne: ["$image", ""]
                                            },
                                            then: {
                                                "$concat": [
                                                    process.env.SERVER_HOST, 'images/',
                                                    "$image"
                                                ]
                                            },
                                            else: {
                                                "$concat": [
                                                    process.env.SERVER_HOST, 'images/',
                                                    'no-img.png'
                                                ]
                                            }
                                        }
                                    }
                                }
                            },
                        ],
                        as: "products",
                    },
                },
                {
                    $addFields: {
                        'products.total_amount': { '$multiply': [{ $first: "$products.price" }, '$quantity'] },
                    }
                },
                {
                    $group: {
                        _id: null,
                        amount: { $sum: { $first: "$products.total_amount" } },
                    }
                }
            ]);
            return res.status(200).send({
                count: result.length,
                total_amount: (sum.length > 0) ? sum[0].amount : 0,
                amount: (sum.length > 0) ? sum[0].amount : 0,
                data: result
            })
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}

module.exports = CartController
