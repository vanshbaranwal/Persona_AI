import { SYSTEM_PROMPT as HITESH_PROMPT } from "./hitest_sir.js";
import { SYSTEM_PROMPT as PIYUSH_PROMPT } from "./piyush_sir.js";

// Central registry — this "id" is what the frontend sends in the
// `persona` field of its request body (e.g. persona: "hitesh").
export const PERSONAS = {
  hitesh: {
    id: "hitesh",
    name: "Hitesh Choudhary",
    systemPrompt: HITESH_PROMPT,
  },
  piyush: {
    id: "piyush",
    name: "Piyush Garg",
    systemPrompt: PIYUSH_PROMPT,
  },
};

export function getPersona(id) {
  return PERSONAS[id];
}
