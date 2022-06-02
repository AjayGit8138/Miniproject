const Joi = require('joi');

const doctorvalidation = Joi.object({
    doctorname:Joi.string().regex(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).required(),
    email:Joi.string().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).required(),
    mobileno:Joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
    gender:Joi.string().required(),
    dateofbirth:Joi.date().raw().required(),
    profilesnap:Joi.string().required(),
    certificateid:Joi.string().required(),
    specialist:Joi.string().required(),
    education:Joi.string().required(),
    password:Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
    cpassword:Joi.string().valid(Joi.ref('password')).required(),
})

module.exports = {doctorvalidation}