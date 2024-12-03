import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export const CoPilotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-[#141414] border border-[#333333] rounded-lg shadow-lg w-[320px] h-[400px] animate-scale-in">
          <div className="p-4 border-b border-[#333333] flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">iEAT Co Pilot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-[calc(400px-64px)] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="bg-[#1e1e1e] rounded p-3 text-sm text-white">
                Hello! I'm your iEAT Co Pilot. How can I assist you with JPMC insights today?
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-[#1e1e1e] border border-[#333333] rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded text-sm transition-colors">
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