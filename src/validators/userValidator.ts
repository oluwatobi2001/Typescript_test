import Joi from 'joi';


const UserRegSchema =  Joi.object({

    email: Joi.string().email({
        minDomainSegments: 2, 
        tlds: {
            allow: ['com', 'net']
        }
    }),
    firstName : Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    role: Joi.string(),
    residence: Joi.string().min(4).max(20),
    password: Joi.string().alphanum().min(8).required(),


});

const UserLoginSchema =  Joi.object({

    email: Joi.string().email({
        minDomainSegments: 2, 
        tlds: {
            allow: ['com', 'net']
        }
    }),
   
    
    password: Joi.string().alphanum().min(8).required(),


});



export {UserRegSchema, UserLoginSchema};
