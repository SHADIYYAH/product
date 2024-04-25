const Joi = require('joi');

const validateCreateAccount = (data) => {

  const createAccountSchema =   Joi.object({
        surname: Joi.string().required(),
        othernames: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_number: Joi.string().required(),
        password: Joi.string().required(),
       
   
    })

    return createAccountSchema.validate(data);
}


module.exports = {
    validateCreateAccount
};