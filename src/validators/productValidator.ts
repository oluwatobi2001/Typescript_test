import Joi from 'joi'


const ProductRegSchema =  Joi.object({

    productId: Joi.number().required(),
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    quantity: Joi.number(),


    })

    export {ProductRegSchema}