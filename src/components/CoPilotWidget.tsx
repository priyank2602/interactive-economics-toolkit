import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

type Message = {
  type: 'user' | 'bot';
  content: string;
};

interface CoPilotWidgetProps {
  onUpdateStockPriceDays?: (days: number) => void;
  onShowDividendAnalysis?: () => void;
}

export const CoPilotWidget = ({ onUpdateStockPriceDays, onShowDividendAnalysis }: CoPilotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hello! I'm your iEAT Co Pilot. How can I assist you with JPMC insights today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const generateMarketSummary = () => {
    const summary = "Based on recent market events, JPMC has shown strong performance with positive momentum. Key highlights include:\n\n" +
      "• New digital banking initiative announcement (Feb 15)\n" +
      "• Strong quarterly earnings exceeding expectations (Feb 10)\n" +
      "• Strategic tech partnership established (Feb 5)\n" +
      "• Successful expansion into emerging markets (Jan 25)\n\n" +
      "Overall market sentiment remains positive with these developments.";
    return summary;
  };

  const generateDividendAnalysis = () => {
    return `Here's an analysis of JPMorgan Chase & Co.'s (JPMC) dividend yield, payout consistency, and growth history as of December 3, 2024:

Dividend Yield: JPMC's dividend yield is reported to be between 1.84% and 2%. This yield is relatively attractive for income-focused investors, especially in the financial sector.

Payout Consistency: JPMC has a strong track record of consistent dividend payments, having increased its dividends for 14 consecutive years.

Growth History: The dividend growth rate for JPMC has varied over different time periods:
• Over the past 12 months: ~13.58%
• Over the past 36 months: ~7.53%
• Over the past 60 months: ~6.87%
• Over the past 120 months: ~11.42%

Payout Ratio: 25-27%, suggesting strong sustainability and room for future increases.

Payment Frequency: Quarterly, with an annual dividend of $5.00 per share.`;
  };

  const handleSendMessage = async (text: string) => {
    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);
    
    if (text.toLowerCase().includes('update stock price') && text.toLowerCase().includes('60 days')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onUpdateStockPriceDays?.(60);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I've updated the stock price chart to show data for the last 60 days." 
      }]);
    } else if (text.toLowerCase().includes('summarize market events')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessages(prev => [...prev, { type: 'bot', content: generateMarketSummary() }]);
    } else if (text.toLowerCase().includes('analyze') && text.toLowerCase().includes('dividend')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onShowDividendAnalysis?.();
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: generateDividendAnalysis()
      }]);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I'll help you with that request. Please note that some features are still under development." 
      }]);
    }
    
    setIsTyping(false);
  };

  const handleSuggestedQuery = (query: string) => {
    handleSendMessage(query);
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
          className={`bg-[#141414] border border-[#333333] rounded-lg shadow-lg transition-all duration-300 ${
            isDocked 
              ? 'w-[400px] h-full rounded-none border-r-0 border-t-0 border-b-0' 
              : 'w-[320px] h-[400px]'
          } animate-scale-in`}
        >
          <div className="p-4 border-b border-[#333333] flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">iEAT Co Pilot</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDock}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title={isDocked ? "Undock" : "Dock to side"}
              >
                <div className={`w-4 h-4 border-2 border-current rounded-sm transition-transform ${isDocked ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-64px)] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`bg-[#1e1e1e] rounded p-3 text-sm text-white whitespace-pre-wrap`}
                >
                  {message.content}
                </div>
              ))}
              {isTyping && (
                <div className="bg-[#1e1e1e] rounded p-3 text-sm text-white">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Suggested Queries:</div>
                <button 
                  onClick={() => handleSuggestedQuery("Summarize Market Events")}
                  className="w-full text-left bg-[#1e1e1e] hover:bg-[#2e2e2e] rounded p-2 text-sm text-white transition-colors"
                >
                  Summarize Market Events
                </button>
                <button 
                  onClick={() => handleSuggestedQuery("Help me with divisional results")}
                  className="w-full text-left bg-[#1e1e1e] hover:bg-[#2e2e2e] rounded p-2 text-sm text-white transition-colors"
                >
                  Help me with divisional results
                </button>
              </div>
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
                className="flex-1 bg-[#1e1e1e] border border-[#333333] rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                onClick={() => {
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue.trim());
                  }
                }}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-colors animate-fade-in"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
