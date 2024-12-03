import { MessageCircle, MessageSquare } from "lucide-react";

type ChatMessageProps = {
  type: 'user' | 'bot';
  content: string;
};

export const ChatMessage = ({ type, content }: ChatMessageProps) => {
  return (
    <div className={`rounded p-3 text-sm whitespace-pre-wrap flex gap-2 items-start ${
      type === 'user' 
        ? 'bg-[#1e1e1e] text-white' 
        : 'bg-[#2a2a2a] text-[#9b87f5]'
    }`}>
      {type === 'user' ? (
        <MessageSquare className="h-5 w-5 mt-0.5 flex-shrink-0" />
      ) : (
        <MessageCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
      )}
      <span>{content}</span>
    </div>
  );
};