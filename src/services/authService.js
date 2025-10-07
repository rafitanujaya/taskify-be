import pgClient from "../database/postgre/pgClient.js";
import ResponseError from "../exceptions/responseError.js";
import userRepository from "../repositories/userRepository.js";
import userValidation from "../validators/userValidation.js"
import validate from "../validators/validation.js"
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';
import config from "../config/index.js";
import jwt from "../utils/jwt.js";

const register = async (payload) => {
    const user = validate(userValidation.register, payload);
    
    const client = await pgClient.getClient();

    const usernameExists = await userRepository.findByUsername(user.username, client);
    if(usernameExists) {
        throw new ResponseError(409, 'Username Already Exists');
    }
    const emailExists = await userRepository.findByEmail(user.email, client);
    if(emailExists) {
        throw new ResponseError(409, 'Email Already Exists');
    }

    user.id = uuid();
    user.password = await bcrypt.hash(user.password, config.bcryptSalt);

    await userRepository.create(user, client);

    const payloadJwt = {
        id: user.id
    }

    return jwt.signToken(payloadJwt)
}

const login = async (payload) => {
    const user = validate(userValidation.login, payload);

    const client = await pgClient.getClient()

    const currentUser = await userRepository.getByEmail(user.email, client);

    if(!currentUser) {
        throw new ResponseError(404, 'Email or Password is wrong')
    }

    const passwordValid = await bcrypt.compare(user.password, currentUser.password)
    if (!passwordValid) {
        throw new ResponseError(404, 'Email or Password is wrong')
    }

    const payloadJwt = {
        id: currentUser.id
    }

    return jwt.signToken(payloadJwt)
}

export default {
    register,
    login
}