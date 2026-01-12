import { GoogleGenAI } from "@google/genai";


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function GenerateResponse(propmt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: propmt
    })

    return response.text
}

export default GenerateResponse