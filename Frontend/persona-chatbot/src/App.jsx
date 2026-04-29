import { useState } from "react";
import { personas } from "./data/personas";
import PersonaSwitcher from "./components/PersonaSwitcher";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [activePersona, setActivePersona] = useState("anshuman");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePersonaChange = (personaId) => {
    setActivePersona(personaId);
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-xl backdrop-blur-sm sm:p-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Persona-Based AI Chatbot
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Active Persona:
            <span className="ml-2 rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
              {personas[activePersona].name}
            </span>
          </p>
        </header>

        <PersonaSwitcher
          personas={personas}
          activePersona={activePersona}
          onChange={handlePersonaChange}
        />

        <ChatWindow
          messages={messages}
          loading={loading}
          activePersona={activePersona}
          suggestions={personas[activePersona].suggestions}
          setMessages={setMessages}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

export default App;