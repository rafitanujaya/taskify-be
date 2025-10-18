import { Server } from 'socket.io';
import http from "http";
import createApp from './app.js';
import config from './config/index.js';
import initAiHanlder from './socket/handlers/aiHandler.js';

const app = createApp();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

initAiHanlder(io);

server.listen(config.port, () => {
    console.info(`Server running on port : localhost:${config.port}`);
    console.info(`Environment : ${config.env}`);
})

server.on("error", err => {
    console.info(`Failed to start server: ${err}`);
    process.exit(1)
})

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});