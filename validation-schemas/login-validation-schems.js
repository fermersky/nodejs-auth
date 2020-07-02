const joi = require('@hapi/joi');
const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi.string().min(5).max(40).email(),
  password: Joi.string().min(3).max(40),
});

module.exports.loginSchema = loginSchema;
