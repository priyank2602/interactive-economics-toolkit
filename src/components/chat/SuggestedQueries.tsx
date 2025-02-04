interface SuggestedQueriesProps {
  onQuerySelect: (query: string) => void;
  isLoading?: boolean;
}

export const SuggestedQueries = ({ onQuerySelect, isLoading }: SuggestedQueriesProps) => {
  const isCEOQuery = (window as any).lastQuery?.toLowerCase().includes('ceo') || 
                     (window as any).lastQuery?.toLowerCase().includes('q3 2024');

  if (isLoading) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-400">Suggested Queries:</div>
      {isCEOQuery ? (
        <button 
          onClick={() => onQuerySelect("Summarize the CEO comments")}
          className="w-full text-left bg-[#1e1e1e] hover:bg-[#2e2e2e] rounded p-2 text-sm text-white transition-colors"
        >
          Summarize the CEO comments
        </button>
      ) : (
        <>
          <button 
            onClick={() => onQuerySelect("Summarize Market Events")}
            className="w-full text-left bg-[#1e1e1e] hover:bg-[#2e2e2e] rounded p-2 text-sm text-white transition-colors"
          >
            Summarize Market Events
          </button>
          <button 
            onClick={() => onQuerySelect("Help me with divisional results")}
            className="w-full text-left bg-[#1e1e1e] hover:bg-[#2e2e2e] rounded p-2 text-sm text-white transition-colors"
          >
            Help me with divisional results
          </button>
        </>
      )}
    </div>
  );
};