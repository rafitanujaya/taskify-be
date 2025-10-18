import aiService from "../../services/aiService.js";

const initAiHanlder = async (io) => {
    io.on('connection', (socket) => {
        console.info(`User Connected : ${socket.id}`);

        socket.on('send_message', async(userId, message) => {
            try {
                const replay = await aiService.handleChat(userId, message);

                socket.emit('received_message', {
                    id: replay.id,
                    senderType: replay.senderType,
                    message: replay.message
                })
            } catch (error) {
                console.log(error);
                console.error("AI Error:", error.message);
                socket.emit("receive_message", {
                    senderType: "bot",
                    message: "⚠️ TaskBot lagi error. Coba lagi nanti 😅",
                });
            }
        })

        socket.on('load_history', async (userId) => {
            const history = await aiService.getHistory(userId);
            socket.emit('chat_history', history)
        })

        socket.on('disconnect', () => {
            console.info(`Disconnect: ${socket.id}`);
        })
    })
}

export default initAiHanlder