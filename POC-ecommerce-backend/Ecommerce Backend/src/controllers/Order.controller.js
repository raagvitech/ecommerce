'use strict';

const { OrderalidationSchema } = require('../validations/Order.validation');
const Order = require('../models/Order.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const Cart = require('../models/Cart.model')
const Checkout = require('../models/Checkout.model')

class OrderController {

    static async create(req, res) {
        try {

            const validData = await OrderalidationSchema.validateAsync(req.body);

            let checkoutData = await Checkout.findOne({
                uuid: validData.checkout_uuid,
                user_uuid: validData.user_uuid
            });

            if (!checkoutData) {
                return res.status(400).send("Something went wrong!");
            }

            let transaction_id = 'TRANS-' + crypto.pseudoRandomBytes(4).toString('hex').toUpperCase();

            console.log(checkoutData.details)

            let orderData = {
                details : checkoutData.details,
                user_uuid: checkoutData.user_uuid,
                amount : checkoutData.amount,
                total_amount : checkoutData.total_amount,
                transaction_uuid: transaction_id,
            }
            console.log(orderData)

            let result = await Order.create(orderData);
            await Cart.deleteMany({ user_uuid: validData.user_uuid });

            return res.status(200).send({
                status: true,
                message: "Order Successfully Placed",
                data: result
            });
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    static async list(req, res) {
        try {

            let { page, limit, search } = req.query;

            if (page == "" || page == undefined) page = 0;
            if (limit == "" || limit == undefined) limit = 10;

            let skip = Number(page) * Number(limit);

            let match = {
                is_active: true,
            }

            let result = await Order.aggregate([
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
                            { "user_uuid": { $regex: `${search}`, $options: 'i' } },
                        ]
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
            let results = await Order.aggregate([
                {
                    $match: { ...match }
                },
                {
                    $match: {
                        $or: [
                            { "user_uuid": { $regex: `${search}`, $options: 'i' } },
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

    static async Userlist(req, res) {
        try {

            let { page, limit, search, user_uuid } = req.query;

            if (page == "" || page == undefined) page = 0;
            if (limit == "" || limit == undefined) limit = 10;

            let skip = Number(page) * Number(limit);

            if(user_uuid == "" || user_uuid == undefined){
                return res.status(400).send("user uuid Missing.")
             }

            let match = {
                is_active: true,
            }

            if(user_uuid !="" && user_uuid != undefined){
                match.user_uuid = user_uuid
             }

            let result = await Order.aggregate([
                {
                    $match: { ...match }
                },
                {
                    $lookup : {
                        from : 'users',
                        localField : 'user_uuid',
                        foreignField : "uuid",
                        as : 'user'
                    }
                },
                {
                    $match: {
                        $or: [
                            { "user_uuid": { $regex: `${search}`, $options: 'i' } },
                        ]
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
            let results = await Order.aggregate([
                {
                    $match: { ...match }
                },
                {
                    $match: {
                        $or: [
                            { "user_uuid": { $regex: `${search}`, $options: 'i' } },
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

module.exports = OrderController