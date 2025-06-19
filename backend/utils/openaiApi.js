import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function generateLLMResponse(prompt) {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-3.5-turbo', // you can change to mistralai/mistral-7b-instruct
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    throw new Error('Failed to generate LLM response');
  }
}
