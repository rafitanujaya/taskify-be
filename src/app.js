import express from 'express'
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';


const createApp = () => {
    const app = express();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(morgan('dev'));
    // app.use(helmet());
    app.use(cors());

    // Routes
    app.use('/api', router)

    // Error Handling
    app.use(errorMiddleware)

    return app
}

export default createApp