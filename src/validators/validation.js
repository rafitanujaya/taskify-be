import ResponseError from "../exceptions/responseError.js";

const validate = (schema, payload) => {
    const result = schema.validate(payload, {
        abortEarly: false,
        stripUnkown : true
    })

    if(result.error) {
        throw new ResponseError(400, result.error)
    } else {
        return result.value
    }
}

export default validate