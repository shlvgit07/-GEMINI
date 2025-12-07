import { GoogleGenAI, Type } from "@google/genai";
import { Question, Topic } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

const TOPIC_PROMPTS: Record<Topic, string> = {
  [Topic.PSEUDO_CODE]: "Basmach 'Machvon Krav'. Difficulty: Mixed (Easy, Medium, Hard). Create pseudo-code questions. Easy: simple conditions. Medium: single loops. Hard: nested loops, array manipulation by index, variable swapping. Use syntax: 'Move 5 to A', 'Add B to A', 'Jump to line X'. ALWAYS provide a distinct code block.",
  
  [Topic.LOGIC_SERIES]: "Abstract Reasoning & Visual Logic. Difficulty: Mixed (Easy, Medium, Hard).\n" +
    "Generate two types of questions mixed randomly:\n" +
    "1. SHAPE SERIES: The 'questionText' describes the pattern. 'svgContent' shows the problem sequence (3-4 shapes). The 'options' array MUST contain 4 distinct SVG strings (valid <svg> tags with viewBox) representing the possible answers. Set 'optionsType' to 'svg'. Patterns: Rotation, Overlap, Mirroring. Ensure SVGs are compact and scalable.\n" +
    "2. NUMBER SERIES: 'questionText' must present the series clearly on A SINGLE LINE (e.g., '3, 8, 15, 24, ?'). 'options' should be numbers. Set 'optionsType' to 'text'. Patterns: Geometric, Fibonacci variations, Interleaving.",
    
  [Topic.ENGLISH]: "Technical English. Difficulty: Mixed (Easy, Medium, Hard). Provide a technical paragraph about a modern CS concept. CRITICAL: Separate each sentence with a newline character (\\n) so they appear on separate lines. The question should follow the text on a new line as well.",
  
  [Topic.ALGORITHMS]: "Algorithmic Thinking. Difficulty: Mixed (Easy, Medium, Hard). Focus on Recursion logic, Stack/Queue operations, and sorting complexity logic. ALWAYS provide a code-like sequence or step-by-step process.",
  
  [Topic.OOP]: "Object Oriented Programming. Difficulty: Mixed (Easy, Medium, Hard). Focus on Inheritance, Polymorphism, Encapsulation, and Design Patterns. Provide code snippets in a Java/C# style pseudo-code."
};

export const generateQuestions = async (topic: Topic, count: number = 3): Promise<Question[]> => {
  const prompt = `
    You are an expert tutor preparing students for the IDF Basmach (Mamram) entrance exams.
    Generate ${count} multiple-choice questions with MIXED difficulty levels (Easy, Medium, Hard) for the topic: ${TOPIC_PROMPTS[topic]}.
    
    CRITICAL INSTRUCTIONS:
    1. Language: Hebrew (questions and explanations). Technical terms can be in English. For the English topic, the question text MUST be in English.
    2. Code Snippets: For Pseudo-code, Algorithms, and OOP, you MUST provide a 'codeSnippet'.
    3. Visuals: For LOGIC_SERIES shape questions, provide 'svgContent' for the question AND 'svg' strings for the 'options'.
    4. Format: For Number Series, write the sequence on one line in 'questionText'.
    5. Difficulty: Mark each question as 'Easy', 'Medium', or 'Hard'.
    6. Explanation: The 'explanation' field must be detailed.
    
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
              difficulty: { type: Type.STRING, description: "Difficulty level: 'Easy', 'Medium', or 'Hard'" },
              questionText: { type: Type.STRING, description: "The main question text" },
              codeSnippet: { type: Type.STRING, description: "Code block or paragraph.", nullable: true },
              svgContent: { type: Type.STRING, description: "Raw SVG string for visual logic questions", nullable: true },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 possible answers. Can be text or SVG strings."
              },
              optionsType: { type: Type.STRING, description: "Either 'text' or 'svg'", nullable: true },
              correctIndex: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
              explanation: { type: Type.STRING, description: "Detailed explanation in Hebrew" }
            },
            required: ["questionText", "options", "correctIndex", "explanation", "difficulty"]
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
      svgContent: q.svgContent,
      options: q.options,
      optionsType: q.optionsType || 'text',
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      difficulty: q.difficulty || 'Medium'
    }));

  } catch (error) {
    console.error("Failed to generate questions:", error);
    throw new Error("Could not generate questions. Please try again.");
  }
};