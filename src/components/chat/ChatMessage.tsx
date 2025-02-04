
import { MessageCircle, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

type ChatMessageProps = {
  type: 'user' | 'bot';
  content: string;
};

export const ChatMessage = ({ type, content }: ChatMessageProps) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className={`rounded-lg p-3 text-sm whitespace-pre-wrap ${
      type === 'user' 
        ? 'bg-muted text-foreground' 
        : 'bg-[#2a2a2a] text-primary'
    }`}>
      <div className="flex gap-2">
        {type === 'user' ? (
          <MessageSquare className="h-5 w-5 mt-0.5 flex-shrink-0" />
        ) : (
          <MessageCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        )}
        <span className="flex-grow">{content}</span>
        {type === 'bot' && (
          <div className="flex gap-2 items-start ml-2">
            <button
              onClick={() => setFeedback('up')}
              className={`p-1.5 rounded-lg hover:bg-muted transition-colors ${
                feedback === 'up' ? 'text-[#F2FCE2]' : 'text-muted-foreground'
              }`}
              aria-label="Thumbs up"
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => setFeedback('down')}
              className={`p-1.5 rounded-lg hover:bg-muted transition-colors ${
                feedback === 'down' ? 'text-[#FFDEE2]' : 'text-muted-foreground'
              }`}
              aria-label="Thumbs down"
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
