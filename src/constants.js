export const expirationOptions = [
  'After reading',
  'After 1 hour',
  'After 24 hours',
  'After 7 days',
  'After 30 days',
];

// constants.js
export const textinfo = {
  intro: "With Privnote you can send notes that will self-destruct after being read.",
  steps: [
    "Write the note below, encrypt it and get a link.",
    "Send the link to whom you want to read the note.",
    "The note will self-destruct after being read by the recipient.",
  ],
  outro: "By clicking the options button, you can:",
  options: [
    "Set a manual password to encrypt the note",
    "Set an expiration date",
    "Be notified when the note is destroyed",
  ],
};


export const copytextnote = `Copy the link, paste it into an email or instant message and send it to the person who should read the note.`

// API Configuration
// For local testing, use localhost. For production, use the deployed URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';