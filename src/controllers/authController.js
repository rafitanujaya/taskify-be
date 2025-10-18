import { google } from "googleapis";
import googleClient from "../config/googleClient.js";
import authService from "../services/authService.js";
import ResponseError from "../exceptions/responseError.js";
import config from "../config/index.js";

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

const loginGoogle = async (req, res, next) => {
    try {
        res.redirect(googleClient.authorizationUrl)
    } catch (error) {
        next(error)
    }
}

const loginGoogleCb = async (req, res, next) => {
    try {
        const {code} = req.query
        const {tokens} = await googleClient.oauth2Client.getToken(code)

        googleClient.oauth2Client.setCredentials(tokens)

        const oauth2 = google.oauth2({
            version: 'v2',
            auth: googleClient.oauth2Client
        })

        const data = await oauth2.userinfo.get();

        if(!data) {
            throw new ResponseError(500, 'kesalahan server hehe')
        }

        const tokenJwt = await authService.loginGoogle(data);

        res.redirect(`${config.frontendRedirectUrl}?token=${tokenJwt}`)
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    verify,
    loginGoogle,
    loginGoogleCb
}