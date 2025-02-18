'use strict';

const { CheckoutValidationSchema } = require('../validations/Checkout.validation');
const Checkout  = require('../models/Checkout.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart.model')

class CheckoutController {

    static async checkout(req, res){
        try {

            let validData = await CheckoutValidationSchema.validateAsync(req.body);

            if(validData.user_uuid == "" || validData.user_uuid == undefined){
               return res.status(400).send("user id is required.")
            }

            let cart = await Cart.aggregate([
                {
                    $match : {
                        user_uuid : validData.user_uuid
                    }
                },
                {
                    $lookup : {
                        from : 'products',
                        localField : 'item_uuid',
                        foreignField : "uuid",
                        as : 'item'
                    }
                }
             ]);
             if(cart.length == 0){
                return res.status(400).send('Cart is Empty.');
             }
             let checkoutData = [];
             let amount = 0;
             let message =""
              cart.forEach((c)=>{
                if(c.quantity>c.item[0].stock_quantity){
                    
                    message = `Item : ${c.item[0].name}, QTY: ${c.quantity} is Not Available.`;
                }
                let d = {
                    "_id": c.item[0]._id,
                    "type": c.item[0].type,
                    "price": c.item[0].price,
                    "image" : c.item[0].image,
                    "is_active": c.item[0].is_active,
                    "is_deleted": c.item[0].is_deleted,
                    "name": c.item[0].name,
                    "category_uuid": c.item[0].category_uuid,
                    "quantity": c.quantity,
                    "company_uuid": c.item[0].company_uuid,
                    "createdAt": c.item[0].createdAt,
                    "updatedAt": c.item[0].updatedAt,
                    "uuid": c.item[0].uuid,
                }
                amount = amount + c.quantity * c.item[0].price;
                checkoutData.push(d)
              }) 
              let data = {
                details : checkoutData,
                amount : amount,
                total_amount : (amount).toFixed(2),
                user_uuid : validData.user_uuid
              }
             let result = await Checkout.create(data);
             return res.status(200).send({
               success : true,
               data : result
             })
        } catch (error) {
            return res.status(400).json(
                new ApiError(400, error.message)
            ) 
        }
    }
}

module.exports = CheckoutController
