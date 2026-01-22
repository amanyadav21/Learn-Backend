import Groq from "groq-sdk";

// AI response generate karne ka function
async function GenerateResponse(chatHistory) {
  
  // Step 1: Groq client banao with API key
  const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
  });

  // Step 2: AI ko puri chat history bhejo (taaki wo previous messages yaad rakhe)
  const response = await groq.chat.completions.create({
    messages: chatHistory,  // Purane messages + naya message
    model: "llama-3.3-70b-versatile"  // AI model ka naam
  });

  // Step 3: AI ka jawab return karo
  const aiAnswer = response.choices[0].message.content;
  return aiAnswer;
}

export default GenerateResponse;
