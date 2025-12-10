import { GoogleGenAI, Type } from "@google/genai";
import { Question, Topic, Term, DifficultyLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

const TOPIC_PROMPTS: Record<Topic, string> = {
  [Topic.PSEUDO_CODE]: "Basmach 'Machvon Krav'. Create pseudo-code questions. Easy: simple conditions. Medium: single loops. Hard: nested loops, array manipulation by index, variable swapping. Use syntax: 'Move 5 to A', 'Add B to A', 'Jump to line X'. ALWAYS provide a distinct code block.",
  
  [Topic.LOGIC_SERIES]: "Abstract Reasoning & Visual Logic.\n" +
    "Generate two types of questions mixed randomly:\n" +
    "1. SHAPE SERIES: The 'questionText' describes the pattern. 'svgContent' shows the problem sequence (3-4 shapes). The 'options' array MUST contain 4 distinct SVG strings (valid <svg> tags with viewBox) representing the possible answers. Set 'optionsType' to 'svg'. Patterns: Rotation, Overlap, Mirroring. Ensure SVGs are compact and scalable.\n" +
    "2. NUMBER SERIES: 'questionText' must present the series clearly on A SINGLE LINE (e.g., '3, 8, 15, 24, ?'). 'options' should be numbers. Set 'optionsType' to 'text'. Patterns: Geometric, Fibonacci variations, Interleaving.",
    
  [Topic.ENGLISH]: "Technical English. Provide a technical paragraph about a modern CS concept. CRITICAL: Separate each sentence with a newline character (\\n) so they appear on separate lines. The question should follow the text on a new line as well.",
  
  [Topic.ALGORITHMS]: "Algorithmic Thinking. Focus on Recursion logic, Stack/Queue operations, Binary Search Trees (insertion, search logic, pre/in/post-order traversal), and sorting complexity. ALWAYS provide a code-like sequence or step-by-step process.",
  
  [Topic.OOP]: "Object Oriented Programming. Focus on Inheritance, Polymorphism, Encapsulation, and Design Patterns. Provide code snippets in a Java/C# style pseudo-code. CRITICAL: The 'questionText' and the 'explanation' MUST be in Hebrew. The code itself (class names, keywords) should remain in English.",

  [Topic.SQL]: "SQL (Structured Query Language). Focus on fundamental queries: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, and basic JOINS (INNER, LEFT). Questions should present a scenario or a result and ask for the query, or present a schema and query and ask for the result. ALWAYS provide a small database schema or the query itself in the 'codeSnippet' field."
};

const mapTermCategoryToTopic = (category: Term['category']): Topic => {
  switch (category) {
    case 'pseudo': return Topic.PSEUDO_CODE;
    case 'algo': return Topic.ALGORITHMS;
    case 'logic': return Topic.LOGIC_SERIES;
    case 'oop': return Topic.OOP;
    default: return Topic.ALGORITHMS;
  }
};

const parseQuestionsResponse = (responseText: string, topic: Topic, prefixId: string): Question[] => {
  try {
    const rawQuestions = JSON.parse(responseText || "[]");
    return rawQuestions.map((q: any, index: number) => ({
      id: `${prefixId}-${Date.now()}-${index}`,
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
    console.error("Failed to parse questions:", error);
    return [];
  }
};

export const generateQuestions = async (topic: Topic, count: number = 3, difficulty: DifficultyLevel = 'Mixed'): Promise<Question[]> => {
  const difficultyPrompt = difficulty === 'Mixed' 
    ? "Difficulty: Mixed (Easy, Medium, Hard)." 
    : `Difficulty: Strictly ${difficulty} level.`;

  const prompt = `
    You are an expert tutor preparing students for the IDF Basmach (Mamram) entrance exams.
    Generate ${count} multiple-choice questions for the topic: ${TOPIC_PROMPTS[topic]}.
    
    ${difficultyPrompt}
    
    CRITICAL INSTRUCTIONS:
    1. Language: Hebrew (questions and explanations). Technical terms can be in English. For the English topic, the question text MUST be in English.
    2. Code Snippets: For Pseudo-code, Algorithms, OOP, and SQL, you MUST provide a 'codeSnippet'.
    3. Visuals: For LOGIC_SERIES shape questions, provide 'svgContent' for the question AND 'svg' strings for the 'options'.
    4. Format: For Number Series, write the sequence on one line in 'questionText'.
    5. Difficulty: Mark each question strictly as '${difficulty === 'Mixed' ? 'Easy, Medium or Hard' : difficulty}'.
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
              difficulty: { type: Type.STRING, description: "Difficulty level" },
              questionText: { type: Type.STRING, description: "The main question text" },
              codeSnippet: { type: Type.STRING, description: "Code block, schema, or paragraph.", nullable: true },
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

    return parseQuestionsResponse(response.text || "[]", topic, 'quiz');
  } catch (error) {
    console.error("Failed to generate questions:", error);
    throw new Error("Could not generate questions. Please try again.");
  }
};

export const generateTermQuestions = async (term: Term, count: number = 3): Promise<Question[]> => {
  const topic = mapTermCategoryToTopic(term.category);
  
  const prompt = `
    You are an expert tutor preparing students for Computer Science exams.
    Generate ${count} multiple-choice questions SPECIFICALLY about the concept: "${term.title}".
    Context description: "${term.description}".
    
    CRITICAL INSTRUCTIONS:
    1. Language: Hebrew (questions and explanations).
    2. Focus: The questions must test the understanding of ONLY this specific concept/term.
    3. Format: Multiple choice with 4 options.
    4. Code: If the concept is code-related (pseudo/algo/oop), PROVIDE a short 'codeSnippet' illustrating the concept in the question.
    5. Difficulty: Mixed.
    
    Output structured JSON matching the same schema as general questions.
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
              difficulty: { type: Type.STRING, description: "Difficulty level" },
              questionText: { type: Type.STRING, description: "The main question text" },
              codeSnippet: { type: Type.STRING, description: "Code block or example related to the term.", nullable: true },
              svgContent: { type: Type.STRING, description: "Raw SVG string if applicable", nullable: true },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 possible answers."
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

    return parseQuestionsResponse(response.text || "[]", topic, `term-${term.id}`);
  } catch (error) {
    console.error("Failed to generate term questions:", error);
    throw new Error("Could not generate practice questions.");
  }
};

export const getChatResponse = async (userMessage: string): Promise<string> => {
  const prompt = `
    You are the "Basmach Prep AI Assistant".
    Your goal is to help students navigate the website and listen to their feedback/feature requests.
    
    Website capabilities:
    - Practice quizzes for Basmach (Mamram) exams: Pseudo-code, Logic, Algorithms, OOP, SQL, English.
    - Glossary (Dictionary) of CS terms.
    - Success tips.
    
    User message: "${userMessage}"
    
    Respond in Hebrew. Be friendly, encouraging, and concise. 
    If the user asks for a feature, thank them and say you'll note it down.
    If the user asks a CS question, try to answer briefly or direct them to the "Dictionary" or "Practice" sections.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt
    });
    return response.text || "סליחה, לא הצלחתי להבין. נסה שנית.";
  } catch (error) {
    console.error("Chat error:", error);
    return "יש לי בעיית תקשורת כרגע, נסה שוב מאוחר יותר.";
  }
};
