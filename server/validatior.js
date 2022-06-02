const Joi = require('joi');

const schema =  Joi.object({  
    patientname:Joi.string().regex(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).required(),
    age:Joi.number().required(),
    dateofbirth:Joi.date().raw().required(),
    mobileno:Joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).max(10).required(),

    email:Joi.string().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).required(),
    esino:Joi.number().min(12).required(),
    aadharno:Joi.number().min(12).required(),
    requestId:Joi.string().required(),
    password:Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
    cpassword:Joi.string().valid(Joi.ref('password')).required()
  })

  const adminauth = Joi.object({
      loginid:Joi.string().required(),
      password:Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()

  })

  const doctorauthentication = Joi.object({
    loginid:Joi.string().required(),
    email:Joi.string().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).required(),
    password:Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
  })

  const patientauthentication = Joi.object({
    loginid:Joi.string().required(),
    email:Joi.string().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).required(),
    password:Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
  })

  const reportvalidation = Joi.object({
    dietplan:Joi.string().required(),
    diseases:Joi.required(),
    dosage:Joi.string().required(),
    medicineone:Joi.string().required(),
    medicinetwo:Joi.string().required(),
    medicinethree:Joi.string().required(),
    requestId:Joi.string().required(),
    patientname:Joi.string().required(),
    precuations:Joi.string().required(),
    remedies:Joi.string().required(),
    reportby:Joi.string().required(),
    tablets:Joi.string().required(),
    totalreport:Joi.string().required(),
    docid:Joi.string().required(),
  })
  module.exports = {schema,adminauth,doctorauthentication,patientauthentication,reportvalidation}
