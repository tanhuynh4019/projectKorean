import Joi from 'joi'

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
    userCreateWallet: Joi.object().keys({
        symbol: Joi.string().empty().required().messages({
            'any.required': 'Please enter your symbol !',
            'string.empty': 'Symbol cannot be empty !',
        })
    }),
}

export default {
    validateBody,
    schemas
}