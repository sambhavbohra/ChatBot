import { useState } from "react";
import { personas } from "./data/personas";
import PersonaSwitcher from "./components/PersonaSwitcher";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [activePersona, setActivePersona] = useState("anshuman");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("discover");

  const handlePersonaChange = (personaId) => {
    setActivePersona(personaId);
    setMessages([]);
  };

  const startChat = (personaId) => {
    handlePersonaChange(personaId);
    setView("chat");
  };

  const active = personas[activePersona];
  const personaList = Object.values(personas);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setView("discover")}
              className="font-display text-2xl font-bold tracking-tight text-indigo-600"
            >
              PersonaAI
            </button>
            <button
              type="button"
              onClick={() => setView("discover")}
              className={`hidden border-b-2 pb-1 text-sm font-semibold md:inline-flex ${
                view === "discover"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-indigo-600"
              }`}
            >
              Discover
            </button>
          </div>

          {view === "chat" && (
            <button
              type="button"
              onClick={() => setView("discover")}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
            >
              All Personas
            </button>
          )}
        </div>
      </nav>

      {view === "discover" ? (
        <>
          <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6">
            <header className="mb-16 text-center sm:mb-20">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#6b38d4]">
                Meet Our Scaler Instructors
              </span>
              <h1 className="font-display mx-auto mb-6 max-w-2xl text-4xl font-bold leading-tight text-[#191c1e] sm:text-5xl">
                Learn from industry experts, powered by AI.
              </h1>
              <p className="mx-auto max-w-xl text-base leading-8 text-[#464554]/80 sm:text-lg">
                Experience personalized guidance from world-class mentors.
                Choose your instructor and start your learning journey today.
              </p>
            </header>

            <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {personaList.map((persona) => (
                <article
                  key={persona.id}
                  className="glass-card group flex overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="flex w-full flex-col">
                    <div className="relative h-72 w-full overflow-hidden sm:h-80">
                      <img
                        src={persona.image}
                        alt={persona.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#f7f9fb]/85 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col items-center p-8 text-center">
                      <h2 className="font-display mb-2 text-2xl font-semibold text-[#191c1e]">
                        {persona.name}
                      </h2>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#006387]">
                        {persona.subtitle}
                      </p>
                      <p className="mb-8 flex-1 text-sm leading-6 text-[#464554]">
                        {persona.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => startChat(persona.id)}
                        className="gloss-effect w-full rounded-2xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(70,72,212,0.3)] transition active:scale-95"
                      >
                        Start Chat
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </main>

          <footer className="w-full border-t border-slate-200 bg-slate-50">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 py-10 md:flex-row">
              <div className="text-center md:text-left">
                <span className="font-display text-lg font-bold text-slate-900">
                  PersonaAI
                </span>
                <p className="mt-2 text-sm text-slate-500">
                  Crafting empathy for the digital age.
                </p>
              </div>
              <p className="text-sm text-slate-500">
                © 2026 PersonaAI. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      ) : (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-8 pt-28 sm:px-6">
          <header className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b38d4]">
                  Active Persona
                </p>
                <h1 className="font-display mt-2 text-3xl font-bold text-slate-950">
                  {active.name}
                </h1>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#006387]">
                  {active.subtitle}
                </p>
              </div>
              <PersonaSwitcher
                personas={personas}
                activePersona={activePersona}
                onChange={handlePersonaChange}
              />
            </div>
          </header>

          <ChatWindow
            messages={messages}
            loading={loading}
            activePersona={activePersona}
            suggestions={active.suggestions}
            setMessages={setMessages}
            setLoading={setLoading}
          />
        </main>
      )}
    </div>
  );
}

export default App;
