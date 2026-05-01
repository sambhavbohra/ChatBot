import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-left text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:text-base ${
          isUser
            ? "rounded-br-md bg-[#4648d4] text-white"
            : "rounded-bl-md bg-slate-100 text-slate-900"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="mb-3 last:mb-0">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-[0.92em]">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="mb-3 overflow-x-auto rounded-xl bg-black/5 p-3 font-mono text-sm last:mb-0">
                {children}
              </pre>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default MessageBubble;
