"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateBody = (schema) => {
    return (req, res, next) => {
        const validateResult = schema.validate(req.body);
        if (validateResult.error) {
            return res.status(400).json({
                error: true,
                status: 400,
                message: validateResult.error.message
            });
        }
        else {
            if (!req.value)
                req.value = {};
            if (!req.value['params'])
                req.value.params = {};
            req.value.body = validateResult.value;
            next();
        }
    };
};
const schemas = {
    userLogin: joi_1.default.object().keys({
        email: joi_1.default.string().email().empty().required().messages({
            'string.email': 'Email is not valid !',
            'any.required': 'Please enter your email !',
            'string.empty': 'Email cannot be empty !',
        }),
        password: joi_1.default.string().empty().required().messages({
            'any.required': 'Please enter your password !',
            'string.empty': 'Password cannot be empty! ',
        }),
    }),
    userRegister: joi_1.default.object().keys({
        email: joi_1.default.string().email().empty().required().messages({
            'string.email': 'Email is not valid !',
            'any.required': 'Please enter your email !',
            'string.empty': 'Email cannot be empty !',
        }),
        password: joi_1.default.string().empty().required().messages({
            'any.required': 'Please enter your password !',
            'string.empty': 'Password cannot be empty! ',
        }),
        confirmPassword: joi_1.default.string().empty().required().messages({
            'any.required': 'Please enter your password !',
            'string.empty': 'Password cannot be empty! ',
        }),
    }),
};
exports.default = {
    validateBody,
    schemas
};
