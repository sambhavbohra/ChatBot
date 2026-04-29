import { useState } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001";

function ChatWindow({ messages, setMessages, loading, setLoading, activePersona, suggestions }) {
  const [input, setInput] = useState("");

  const sendMessage = async (text) => {
    const finalText = text || input;
    if (!finalText.trim() || loading) return;

    const userMessage = { role: "user", content: finalText };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persona: activePersona,
          messages: updatedMessages,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      const botMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong while generating the reply.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex min-h-[68vh] flex-col rounded-3xl border border-slate-200 bg-white shadow-lg">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Chat
        </h2>
      </div>

      <div className="chat-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6">
        {messages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500 sm:text-base">
            Start the conversation by asking something about careers, learning, or interview prep.
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} content={msg.content} />
        ))}

        {loading && <TypingIndicator />}
      </div>

      <div className="border-t border-slate-200 px-4 py-3 sm:px-6">
        <SuggestionChips
          suggestions={suggestions}
          onSelect={sendMessage}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:p-6"
      >
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#4648d4] focus:ring-4 focus:ring-indigo-100 sm:text-base"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-[#4648d4] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#383ab8] disabled:cursor-not-allowed disabled:bg-slate-400 sm:text-base"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
