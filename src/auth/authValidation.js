const Joi = require("joi");

const register = Joi.object({
    sFirstName: Joi.string().min(3).max(30).required(),
    slastName: Joi.string().min(3).max(30).required(),
    sEmail: Joi.string().email().required(),
    sPassword: Joi.string().min(6).required(),
    // confirmPassword: Joi.string().valid(Joi.ref("password")).required()
    //     .messages({ "any.only": "Passwords must match" }),
});

const login = Joi.object({
    sEmail: Joi.string().email().required(),
    sPassword: Joi.string().required(),
});

const forgotPassword = Joi.object({
    sEmail: Joi.string().email().required(),
});
const resetPassword = Joi.object({
    newPassword: Joi.string().required(),
    token: Joi.string().required()
});

module.exports = { 
    register, 
    login ,
    forgotPassword,
    resetPassword
};
