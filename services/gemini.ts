import { GoogleGenAI, Type } from "@google/genai";
import { Question, Topic } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

const TOPIC_PROMPTS: Record<Topic, string> = {
  [Topic.PSEUDO_CODE]: "Basmach 'Machvon Krav' (Computer Instructions). Focus on pseudo-code execution. Use syntax like: 'Move 5 to A', 'Add B to A', 'Jump to line X if A > 0'. ALWAYS provide a distinct code block (codeSnippet). The question should ask for the final value of a variable or how many times a loop ran.",
  [Topic.LOGIC_SERIES]: "Abstract Reasoning, Number Series (e.g., 2, 4, 8, 16...), and Shape Logic description. Focus on finding the pattern.",
  [Topic.ENGLISH]: "Technical English comprehension. Provide a short paragraph related to technology (coding, hardware, ai) and ask a reading comprehension question about it.",
  [Topic.ALGORITHMS]: "Algorithmic thinking. Flowcharts described in text, tracing values through a process, stack/queue logic, or sorting logic. ALWAYS provide a code-like sequence or step-by-step process in the codeSnippet."
};

export const generateQuestions = async (topic: Topic, count: number = 3): Promise<Question[]> => {
  const prompt = `
    You are an expert tutor preparing students for the IDF Basmach (Mamram) entrance exams.
    Generate ${count} difficult multiple-choice questions for the topic: ${TOPIC_PROMPTS[topic]}.
    
    CRITICAL INSTRUCTIONS:
    1. Language: Hebrew (questions and explanations). Technical terms can remain in English.
    2. Code Snippets: For Pseudo-code and Algorithms, you MUST provide a 'codeSnippet'. This should look like a block of code or a numbered list of instructions.
    3. Explanation: The 'explanation' field must be a detailed, step-by-step walkthrough of the solution. If there is code, trace the code execution (e.g., "In the first iteration A is 5, then...").
    
    Output structured JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING, description: "The main question text in Hebrew" },
              codeSnippet: { type: Type.STRING, description: "The code block, sequence of instructions, or English text paragraph.", nullable: true },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 possible answers"
              },
              correctIndex: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
              explanation: { type: Type.STRING, description: "Detailed step-by-step explanation in Hebrew" }
            },
            required: ["questionText", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    const rawQuestions = JSON.parse(response.text || "[]");
    
    // Enrich with IDs and Topic
    return rawQuestions.map((q: any, index: number) => ({
      id: `${topic}-${Date.now()}-${index}`,
      topic,
      questionText: q.questionText,
      codeSnippet: q.codeSnippet,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation
    }));

  } catch (error) {
    console.error("Failed to generate questions:", error);
    throw new Error("Could not generate questions. Please try again.");
  }
};