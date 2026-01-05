import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function generateCaption(base64ImageFile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/png",
          data: base64ImageFile,
        },
      },
      "Caption this image. Keep it short and concise with hashtags and emojis.",
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw error;
  }
}

export default generateCaption