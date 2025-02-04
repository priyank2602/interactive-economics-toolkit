
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { ChatMessage } from "./chat/ChatMessage";
import { SuggestedQueries } from "./chat/SuggestedQueries";
import { generateMarketSummary, generateDividendAnalysis } from "@/utils/chatUtils";

type Message = {
  type: 'user' | 'bot';
  content: string;
};

interface CoPilotWidgetProps {
  onUpdateStockPriceDays?: (days: number) => void;
  onShowDividendAnalysis?: () => Promise<void>;
  onShowCEOCommentary?: () => void;
}

export const CoPilotWidget = ({ onUpdateStockPriceDays, onShowDividendAnalysis, onShowCEOCommentary }: CoPilotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hello! I'm your iEAT Canvas. How can I assist you with JPMC insights today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [isCEOLoading, setIsCEOLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    (window as any).lastQuery = text;
    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);
    
    if (text.toLowerCase().includes('last 60 days stock price')) {
      setIsLoadingChart(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      await onUpdateStockPriceDays?.(60);
      setIsLoadingChart(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I've updated the stock price chart to show data for the last 60 days." 
      }]);
    } else if (text.toLowerCase().includes('summarize market events')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessages(prev => [...prev, { type: 'bot', content: generateMarketSummary() }]);
    } else if (text.toLowerCase().includes('analyze') && text.toLowerCase().includes('dividend')) {
      try {
        await onShowDividendAnalysis?.();
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: generateDividendAnalysis()
        }]);
      } catch (error) {
        console.error('Error showing dividend analysis:', error);
      }
    } else if (text.toLowerCase().includes('summarize') && text.toLowerCase().includes('ceo')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "The Firm posted Q3 net income of $12.9B with an ROTCE of 19%, driven by a 31% jump in investment banking fees and an 11% rise in card loans. Payments fees grew at a double-digit rate, the Firm maintained its #1 position in U.S. retail deposits for the 4th year, and Asset & Wealth Management notched record net inflows of $72B. Total loss-absorbing capacity stands at $544B, supported by $1.5T in cash and marketable securities, while loans total $1.3T. Amid geopolitical uncertainty and inflation concerns, Jamie Dimon highlighted disciplined share repurchases, a strong balance sheet, and the Firm's commitment to serving 82M consumers and 6M small businesses."
      }]);
    } else if (text.toLowerCase().includes('ceo commentary') || text.toLowerCase().includes('q3 2024')) {
      setIsCEOLoading(true);
      onShowCEOCommentary?.();
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I've displayed the CEO's commentary for Q3 2024 below." 
      }]);
      setTimeout(() => {
        setIsCEOLoading(false);
      }, 3000);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I'll help you with that request. Please note that some features are still under development." 
      }]);
    }
    
    setIsTyping(false);
  };

  const toggleDock = () => {
    setIsDocked(!isDocked);
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-in-out ${
      isOpen 
        ? isDocked 
          ? 'top-0 right-0 bottom-0' 
          : 'bottom-4 right-4'
        : 'bottom-4 right-4'
    }`}>
      {isOpen ? (
        <div 
          className={`ui-card ${
            isDocked 
              ? 'w-[400px] h-full rounded-none border-r-0 border-t-0 border-b-0' 
              : 'w-[320px] h-[400px]'
          } animate-scale-in`}
        >
          <div className="p-4 border-b border-[#333333] flex items-center justify-between">
            <h3 className="ui-heading text-lg">iEAT Canvas</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDock}
                className="ui-button hover:bg-muted"
                title={isDocked ? "Undock" : "Dock to side"}
              >
                <div className={`w-4 h-4 border-2 border-current rounded-sm transition-transform ${isDocked ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="ui-button hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-64px)] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} type={message.type} content={message.content} />
              ))}
              {isTyping && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <SuggestedQueries onQuerySelect={handleSendMessage} isLoading={isCEOLoading} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    handleSendMessage(inputValue.trim());
                  }
                }}
                placeholder="Type your message..."
                className="ui-input flex-1"
              />
              <button 
                onClick={() => {
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue.trim());
                  }
                }}
                className="ui-button ui-button-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="ui-button ui-button-primary rounded-full shadow-lg animate-fade-in"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
