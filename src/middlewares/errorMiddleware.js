import ResponseError from "../exceptions/responseError.js";

const errorMiddleware = async (err, req, res, next) => {
    console.log(err);
    console.warn(`Error: ${err}`);

    if(err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        })
    } else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
}

export default errorMiddleware