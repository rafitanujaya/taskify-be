import authService from "../services/authService.js";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await authService.register(request);

        res.status(201).json({
            message: 'Register Success',
            data: {
                token: result
            }
        })
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body
        const result = await authService.login(request);

        res.status(200).json({
            message: 'Login success',
            data: {
                token: result
            }
        })
    } catch (error) {
        next(error)
    }
}

const verify = async (req, res, next) => {
    try {
        res.json({
            message: 'Verify success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    verify
}