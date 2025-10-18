import pgClient from "../database/postgre/pgClient.js";
import ResponseError from "../exceptions/responseError.js";
import userRepository from "../repositories/userRepository.js";
import userValidation from "../validators/userValidation.js"
import validate from "../validators/validation.js"
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';
import config from "../config/index.js";
import jwt from "../utils/jwt.js";
import { generateUsername } from "../utils/randomName.js";

const register = async (payload) => {
    const user = validate(userValidation.register, payload);
    
    const client = await pgClient.getClient();
    try {
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
            id: user.id,
            username: user.username,
            email: user.email
        }
    
        return jwt.signToken(payloadJwt)
        
    } catch (error) {
        throw error
    } finally {
        client.release()
    }

}

const login = async (payload) => {
    const user = validate(userValidation.login, payload);

    const client = await pgClient.getClient()

    try {
        const currentUser = await userRepository.getByEmail(user.email, client);
    
        if(!currentUser) {
            throw new ResponseError(404, 'Email or Password is wrong')
        }
    
        const passwordValid = await bcrypt.compare(user.password, currentUser.password)
        if (!passwordValid) {
            throw new ResponseError(404, 'Email or Password is wrong')
        }
    
        const payloadJwt = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email
        }
    
        return jwt.signToken(payloadJwt)
        
    } catch (error) {
        throw error
    } finally {
        client.release()
    }

}

const loginGoogle = async (payload) => {
    const client = await pgClient.getClient()

    try {
        const currentUser = await userRepository.getByEmail(payload.data.email, client);
        if(!currentUser) {
            const id = uuid();
            await userRepository.createByGoogle({id, username: `${generateUsername(payload.data.given_name)}` ,email: payload.data.email}, client)

            const payloadJwt = {
                id: id,
                username: payload.data.given_name,
                email: payload.data.email
            }
            return jwt.signToken(payloadJwt)
        } else {
            const payloadJwt = {
                id: currentUser.id,
                username: currentUser.username,
                email: currentUser.email
            }
            return jwt.signToken(payloadJwt)
        }

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

export default {
    register,
    login,
    loginGoogle
}