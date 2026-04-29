function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:text-base ${
          isUser
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md bg-slate-100 text-slate-900"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default MessageBubble;