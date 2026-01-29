import { HfInference } from '@huggingface/inference';
import 'dotenv/config';

// Hugging Face client initialize
export const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);

console.log('✅ Hugging Face client initialized');
