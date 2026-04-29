function PersonaSwitcher({ personas, activePersona, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2">
      {Object.values(personas).map((persona) => (
        <button
          key={persona.id}
          onClick={() => onChange(persona.id)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            activePersona === persona.id
              ? "bg-[#4648d4] text-white shadow-md"
              : "bg-white text-slate-700 hover:bg-slate-200"
          }`}
        >
          {persona.name}
        </button>
      ))}
    </div>
  );
}

export default PersonaSwitcher;
