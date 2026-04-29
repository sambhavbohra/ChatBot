# Persona-Based AI Chatbot

A full-stack chatbot application that adapts responses based on selected personas. Features dynamic persona switching, real-time message streaming, and backend API integration.

## Project Structure

```
ChatBot/
├── Frontend/
│   └── persona-chatbot/          # React + Vite frontend
│       ├── src/
│       │   ├── components/       # Reusable UI components
│       │   ├── data/             # Persona definitions
│       │   └── App.jsx
│       └── package.json
├── Backend/                       # Express.js API server
│   ├── server.js
│   ├── prompts/
│   │   └── personas.js          # Persona prompt templates
│   └── package.json
└── README.md
```

## Tech Stack

### Frontend
- **React** 19.x - UI library
- **Vite** 8.x - Build tool
- **Tailwind CSS** 4.x - Styling
- **JavaScript ES6+**

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **OpenAI API** - LLM integration
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key

### Frontend Setup
```bash
cd Frontend/persona-chatbot
npm install
npm run dev
```
Server runs on `http://localhost:5173`

### Backend Setup
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your OpenAI API key
npm run dev
```
Server runs on `http://localhost:5000`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start production server

## Features

- **Multiple Personas**: Switch between different AI personalities
- **Tailwind Styling**: Modern, responsive UI with Tailwind CSS
- **Real-time Chat**: Message streaming and typing indicators
- **Persona-specific Responses**: Each persona has unique tone and suggestions
- **Error Handling**: Graceful error management for API failures

## Personas

1. **Anshuman Singh** - Co-Founder, Scaler
   - Focus: Tech career guidance
   - Tone: Strategic and mentor-like

2. **Abhimanyu Saxena** - Co-Founder, Scaler & InterviewBit
   - Focus: Industry readiness
   - Tone: Practical and action-oriented

3. **Kshitij Mishra** - Head of Instructors, Scaler
   - Focus: Learning methodology
   - Tone: Instructional and supportive

## API Endpoints

### POST `/api/chat`
Send a message and receive a persona-specific response.

**Request:**
```json
{
  "persona": "anshuman",
  "messages": [
    { "role": "user", "content": "How should I plan my learning?" },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:**
```json
{
  "reply": "..."
}
```

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=sk-...
PORT=5000
NODE_ENV=development
```

## Troubleshooting

- **Build fails**: Clear `node_modules` and reinstall with `npm install`
- **API errors**: Verify OpenAI API key is set in `.env`
- **Port conflicts**: Change `PORT` in backend `.env` or frontend `vite.config.js`

## Future Enhancements

- [ ] Chat history persistence
- [ ] User authentication
- [ ] Conversation export/import
- [ ] Custom persona creation
- [ ] Response tone customization
- [ ] Multi-language support


## Screenshots

The `screenshots/` folder contains UI captures for the main views. Use these when writing docs or reviewing UI changes.

- Landing / Main page: ![Main page](/screenshots/mainpage.png)
- Persona: Anshuman (desktop): ![Anshuman](/screenshots/anshuman.png)
- Persona: Kshitij (desktop): ![Kshitij](/screenshots/Kshitij.png)
- Persona: Abhimanyu (desktop): ![Abhimanyu](/screenshots/Abhimanyu.png)
- Follow-up / Reply example: ![Follow up](/screenshots/followup.png)


