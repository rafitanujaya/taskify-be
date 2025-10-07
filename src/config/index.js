import dotenv from 'dotenv'

dotenv.config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 4000,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    bcryptSalt: Number(process.env.BCRYPT_SALT),
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiredIn: process.env.JWT_EXPIRED_IN
}

export default config