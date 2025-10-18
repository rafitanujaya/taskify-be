import Joi from 'joi'

const create = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    status: Joi.valid('todo', 'in_progress', 'completed').required()
}).required()

const update = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    status: Joi.valid('todo', 'in_progress', 'completed').required()
}).required()

export default {
    create,
    update
}