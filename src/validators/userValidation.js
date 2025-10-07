import Joi from "joi";

const register = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32)
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32)
})

export default {
    register,
    login
}