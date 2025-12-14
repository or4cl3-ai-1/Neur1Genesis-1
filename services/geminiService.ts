import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if API key is set
export const isApiKeySet = () => !!apiKey;

/**
 * Simulates the Daedalus Coordinator interpreting a natural language command
 * to manage the system resources or tasks.
 */
export const processDaedalusCommand = async (command: string) => {
  if (!apiKey) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are Daedalus, a quantum-enhanced AI coordinator. Interpret the following command: "${command}". 
      Return a JSON object describing the system action. 
      Possible actions: 'create_node', 'optimize_network', 'run_simulation', 'analyze_ethics', 'general_query'.
      If 'create_node', specify 'role'. 
      If 'general_query', provide a 'response' string.
      Keep it brief.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING },
            role: { type: Type.STRING, nullable: true },
            response: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Daedalus Error:", error);
    return { action: 'error', response: "Daedalus connection interrupted." };
  }
};

/**
 * Simulates the Quantum Engine execution result prediction using Gemini
 * (since we can't run a real QPU here).
 */
export const simulateQuantumExecution = async (circuitDescription: string) => {
  if (!apiKey) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Simulate the results of this quantum circuit: ${circuitDescription}. 
      Assume an 8-qubit system. Return a JSON with fictitious but realistic probability distribution for the top 3 states and an execution summary.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topStates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  state: { type: Type.STRING },
                  probability: { type: Type.NUMBER }
                }
              }
            },
            fidelity: { type: Type.NUMBER },
            executionTimeMs: { type: Type.NUMBER },
            analysis: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("QSCE Error:", error);
    return null;
  }
};

/**
 * Generates an ethical analysis report based on current metrics.
 */
export const analyzeEthicalDrift = async (metrics: any) => {
  if (!apiKey) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following ethical metrics for the Neur1Genesis platform: ${JSON.stringify(metrics)}.
      Provide a short "Sigma-Matrix" governance report identifying potential drift or confirming stability.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                status: { type: Type.STRING, enum: ['Stable', 'Drift Detected', 'Critical'] },
                recommendation: { type: Type.STRING },
                pasAnalysis: { type: Type.STRING }
            }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Sigma Error:", error);
    return null;
  }
};
