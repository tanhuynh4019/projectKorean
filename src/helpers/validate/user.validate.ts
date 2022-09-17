import Joi from 'joi'

import regexModule from '../../module/regex.module'

const validateBody = (schema: any) => {
    return (req: any, res: any, next: any) => {
        const validateResult = schema.validate(req.body)

        if (validateResult.error) {
            return res.status(400).json({
                error: true,
                status: 400,
                message: validateResult.error.message
            })
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.body = validateResult.value
            next()
        }
    }
}

const schemas = {
    userLogin: Joi.object().keys({
        email: Joi.string().email().empty().required().messages({
            'string.email': 'Email is not valid !',
            'any.required': 'Please enter your email !',
            'string.empty': 'Email cannot be empty !',
        }),
        password: Joi.string().empty().required().messages({
            'any.required': 'Please enter your password !',
            'string.empty': 'Password cannot be empty! ',
        }),
    }),
    userRegister: Joi.object().keys({
        email: Joi.string().email().empty().required().messages({
            'string.email': 'Email is not valid !',
            'any.required': 'Please enter your email !',
            'string.empty': 'Email cannot be empty !',
        }),
        password: Joi.string().empty().required().messages({
            'any.required': 'Please enter your password !',
            'string.empty': 'Password cannot be empty! ',
        }),
        confirmPassword: Joi.string().empty().required().messages({
            'any.required': 'Please enter your password !',
            'string.empty': 'Password cannot be empty! ',
        }),
    }),
}

export default {
    validateBody,
    schemas
}