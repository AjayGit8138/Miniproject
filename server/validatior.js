const { string } = require('joi');
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
    patientId:Joi.string().required(),
    diseases:Joi.string().required(),
    dosage:Joi.string().required(),
    medicineone:Joi.string().required(),
    medicinetwo:Joi.string().required(),
    medicinethree:Joi.string().required(),
    tabletscategory:Joi.string().required(),
    patientname:Joi.string().required(),
    precuations:Joi.string().required(),
    remedies:Joi.string().required(),
    reportby:Joi.string().required(),
    totalreport:Joi.string().required(),
    docid:Joi.string().required(),
  })

  const urinetestreport = Joi.object({
    patientId:Joi.string().required(),
    patientname:Joi.string().required(),
    reportby:Joi.string().required(),
    totalreport:Joi.string().required(),
    urinsugar:Joi.string().required(),
    acetone:Joi.string().required(),
    bloodsugarlevels:Joi.string().required(),
    docid:Joi.string().required(),
  })

  const countreport = Joi.object({
    patientId:Joi.string().required(),
    patientname:Joi.string().required(),
    reportby:Joi.string().required(),
    totalreport:Joi.string().required(),
    Rbc:Joi.string().required(),
    hemoglobin:Joi.string().required(),
    hemocrit:Joi.string().required(),
    mcv:Joi.string().required(),
    mch:Joi.string().required(),
    rdw:Joi.string().required(),
    docid:Joi.string().required(),
  })

  const booking = Joi.object({
    appointmentdata:Joi.string().required(),
      appointmenttime:Joi.string().required(),
      dbdoctorid:Joi.string().required(),
      doctorname:Joi.string().required(),
      patientid:Joi.string().required(),
      specialist:Joi.string().required(),
      dbpatientid:Joi.string().required(),
  })
  module.exports = {countreport,schema,adminauth,doctorauthentication,patientauthentication,reportvalidation,urinetestreport,booking}
