function SuggestionChips({ suggestions, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect?.(item)}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default SuggestionChips;