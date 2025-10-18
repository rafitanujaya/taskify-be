import OpenAI from "openai";
import chatRepository from "../repositories/chatRepository.js";
import pgClient from "../database/postgre/pgClient.js";
import { v4 as uuid } from "uuid";
import config from "../config/index.js";

const client = new OpenAI({
  apiKey: process.env.GENAI_API_KEY,
  baseURL: config.base_url_ai,
});

const generateReplay = async (prompt) => {
  console.log(process.env.GENAI_MODEL);
  const response = await client.chat.completions.create({
    model: process.env.GENAI_MODEL,
    max_tokens: 200,
    messages: [
      {
        role: "system",
        content: `
Kamu adalah Orbit — asisten AI pribadi yang ramah dan sopan.
Tugasmu adalah membantu pengguna dengan menjawab pertanyaan atau berdiskusi dalam Bahasa Indonesia.
Gunakan gaya bicara santai tapi tetap profesional, seperti teman yang cerdas dan suportif.
Jika pengguna menyapa, balas dengan hangat dan positif.
Jangan gunakan bahasa Inggris, kecuali jika pengguna meminta.
serta jika menanyakan siapa orang pembuat taskify atau website ini adalah rafi tanujaya
          `.trim(),
      },
      { role: "user", content: prompt },
    ],
    stream: false,
    metadata: { project: "taskify-chatbot" },
  });

  console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
};

const handleChat = async (userId, message) => {
  const client = await pgClient.getClient();
  let id = uuid();

  try {
      await chatRepository.create(
        {
          id,
          userId,
          senderType: "user",
          message,
        },
        client
      );
    
      const replay = await generateReplay(message);
    
      id = uuid();
    
      await chatRepository.create({
        id,
        userId,
        senderType: "bot",
        message: replay,
      }, client);
    
      return {
        id,
        senderType: "bot",
        message: replay,
      };
    
  } catch (error) {
    throw error
  } finally {
    client.release()
  }

};

const getHistory = async (userId) => {
  const client = await pgClient.getClient();

  try {
    
      const result = await chatRepository.getListByUserId(userId, client);
      return result.map((value) => ({
        id: value.id,
        senderType: value.sender_type,
        message: value.message,
      }));
  } catch (error) {
    throw error
  } finally {
    client.release()
  }

};

export default {
  handleChat,
  getHistory,
};
