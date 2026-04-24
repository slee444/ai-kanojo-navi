type Message = {
  role: "user" | "ai";
  text: string;
};

type Props = {
  name?: string;
  messages: Message[];
};

export default function ConversationExample({ name = "AI", messages }: Props) {
  return (
    <div className="not-prose my-6 border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200">
        会話例（{name}）
      </div>
      <div className="p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="shrink-0 w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-xs">
                AI
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-pink-600 text-white rounded-tr-sm"
                  : "bg-gray-100 text-gray-800 rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                私
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
        ※ 実際の会話を再現したものです
      </div>
    </div>
  );
}
