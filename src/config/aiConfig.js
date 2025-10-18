export const aiConfig = {
  model: "gpt-4.1-mini",        // Model terbaru, lebih cepat dari GPT-4
  temperature: 0.8,             // Kreativitas respons
  maxTokens: 400,               // Batas panjang jawaban
  presencePenalty: 0.6,         // Hindari pengulangan ide
  frequencyPenalty: 0.5,        // Variasi kata
  defaultTone: "gen_z",         // Tone default (kita buat preset)
  tonePresets: {
    gen_z: `
      You are a Gen Z AI chatbot that uses casual, funny, 
      and emoji-rich language. Mix light Indonesian and English slang naturally.
    `,
    formal: `
      You are a polite, professional AI assistant. 
      Always answer clearly and use formal Indonesian.
    `,
    teacher: `
      You are a patient AI tutor. 
      Always explain complex ideas in simple language and motivate the user.
    `,
  },
};
