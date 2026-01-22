import Groq from 'groq-sdk';

let groq = null;

function getGroqClient() {
    if (!groq) {
        groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return groq;
}

export async function getGroqChatCompletions(content) {
    const client = getGroqClient();
    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: content
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const reply = chatCompletion.choices?.[0]?.message?.content;
        return reply || "No response";
    } catch (error) {
        console.error("Groq chat completion error:", error);
        throw new Error("AI service failed");
    }
}

export default { getGroqChatCompletions }