'use strict';

const {loginSchema,
     registerValidationSchema } = require('../validations/User.validation');
const User  = require('../models/User.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return {accessToken, refreshToken}
    } catch (error) {
        return res.status(400).json(
            new ApiError(500, "Something went wrong while generating referesh and access token")
        )
    }
}


class AuthController {

    static async register(req, res){
        try {
             let payload = await registerValidationSchema.validateAsync(req.body)

             payload.password = await bcrypt.hash(payload.password, 10);

             let result = await User.create(payload);
             return res.status(200).json(
                new ApiResponse(200, { result },"Register Successfully")
             )
        } catch (error) {
            return res.status(400).json(
                new ApiError(400, error.message)
            ) 
        }
    }

    static async login(req, res){
        try {
             const body = req.body;
             const payload = await loginSchema.validateAsync(body);
             const checkUsername = await User.findOne({email : payload.email,is_active:true,is_deleted:false});
             if(!checkUsername) return res.status(400).json(
                new ApiError(400, "Authentication Failed")
            )
             const isPasswordValid = await checkUsername.isPasswordCorrect(payload.password)
             if (!isPasswordValid) return res.status(400).json(
                new ApiError(400, "Authentication Failed")
            )

            const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(checkUsername._id)

            const loggedInUser = await User.findById(checkUsername._id).select("-password -refreshToken");
            const options = {
                httpOnly: true,
                secure: true
            }
        
            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, 
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged In Successfully"
                )
            )
        } catch (error) {
            return res.status(400).json(
                new ApiError(400, error.message)
            )
        }
    }
}

module.exports = AuthController