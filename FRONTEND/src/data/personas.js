// Persona definitions used across the app.
// Replace `reply` logic in App.jsx with a real LLM API call — this file only
// holds the static presentation data for each persona.

export const personas = [
  {
    id: 'hitesh',
    name: 'Hitesh Choudhary',
    subtitle: 'Chai aur Code',
    initials: 'HC',
    avatar: '/avatars/hitesh.png',
    accent: '#9C5239',
    greeting: 'Namaste! Main Hitesh hoon, Chai aur Code se. Chai leke baitho aur batao kya seekhna hai aaj!',
    suggestions: [
      'Node.js kaise seekhu?',
      'Docker explain karo',
      'Channel ke latest videos kya hain?',
      'DSA pe konsi videos hain?',
    ],
  },
  {
    id: 'piyush',
    name: 'Piyush Garg',
    subtitle: 'Software Engineer & Founder',
    initials: 'PG',
    avatar: '/avatars/piyush.png',
    accent: '#A97559',
    greeting: "Hey everyone! Piyush here. Bata, aaj kya build kar rahe hain? System design, GenAI, ya koi full-stack cheez?",
    suggestions: [
      'Design a URL shortener: walk me through the architecture',
      'How do I build a RAG app in JavaScript?',
      'Docker vs VM: kab kya use karu?',
      'Should I learn Next.js or plain React first?',
    ],
  },
]

export const getPersona = (id) => personas.find((p) => p.id === id) ?? personas[0]
