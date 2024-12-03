type ChatMessageProps = {
  type: 'user' | 'bot';
  content: string;
};

export const ChatMessage = ({ type, content }: ChatMessageProps) => {
  return (
    <div className="bg-[#1e1e1e] rounded p-3 text-sm text-white whitespace-pre-wrap">
      {content}
    </div>
  );
};