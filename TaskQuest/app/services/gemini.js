import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@env";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const MOCK_RESPONSE = [
  {
    "title": "Research sustainability frameworks",
    "description": "Review major sustainability reporting frameworks like GRI, SASB, and TCFD"
  },
  {
    "title": "Analyze current practices",
    "description": "Examine how companies currently implement sustainability in accounting"
  },
  {
    "title": "Identify key metrics",
    "description": "List important sustainability metrics and KPIs for accounting"
  }
];

export const generateTaskBreakdown = async (prompt) => {
  const USE_MOCK = true;

  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_RESPONSE;
  }

  try {
    console.log('Starting Gemini API call with prompt:', prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(`
      Break down this task into smaller, actionable subtasks: ${prompt}
      
      Rules:
      1. Return ONLY a JSON array with this exact format: [{"title": "subtask title", "description": "subtask description"}]
      2. Each subtask should be clear and actionable
      3. Include 3-5 subtasks
      4. Keep descriptions concise but informative
      5. Return valid JSON only
    `);

    const response = result.response.text();
    console.log('Raw Gemini response:', response);

    // Clean and parse the response
    const cleanedResponse = response.replace(/```json\n?|\n?```/g, '').trim();
    console.log('Cleaned response:', cleanedResponse);

    const parsedResponse = JSON.parse(cleanedResponse);
    console.log('Parsed response:', parsedResponse);
    
    return parsedResponse;
  } catch (error) {
    console.error('Gemini API Error Details:', {
      error: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    throw new Error(`Failed to generate tasks: ${error.message}`);
  }
}; 