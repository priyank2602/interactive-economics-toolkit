import { Header } from "@/components/Header";
import { SearchResultsBar } from "@/components/SearchResultsBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnalysisSteps } from "@/components/AnalysisSteps";
import { SearchSources } from "@/components/SearchSources";
import { InsightsDisplay } from "@/components/InsightsDisplay";
import { getInsightText } from "@/utils/insightUtils";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  const [showSources, setShowSources] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [steps, setSteps] = useState([
    {
      title: "Information Gathering",
      description: "Collecting relevant data from multiple sources",
      completed: false
    },
    {
      title: "Analysis",
      description: "Processing and analyzing collected information",
      completed: false
    },
    {
      title: "Response Generation",
      description: "Creating comprehensive insights from analysis",
      completed: false
    }
  ]);

  // Mock sources data
  const sources = [
    {
      title: "Apple agrees to pay $95 million to settle lawsuit",
      url: "https://example.com/article1",
      source: "timesofindia.indiatimes.com",
      icon: "/path-to-icon.png"
    },
    {
      title: "Apple to pay $95 million in Siri privacy settlement",
      url: "https://example.com/article2",
      source: "apnews.com",
      icon: "/path-to-icon.png"
    },
    {
      title: "Is Siri secretly listening to you?",
      url: "https://example.com/article3",
      source: "indianexpress.com",
      icon: "/path-to-icon.png"
    }
  ];

  useEffect(() => {
    const completeSteps = async () => {
      if (!query) return;

      // Step 1: Information Gathering
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSteps(prev => prev.map((step, index) => 
        index === 0 ? { ...step, completed: true } : step
      ));
      setShowSources(true);

      // Step 2: Analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSteps(prev => prev.map((step, index) => 
        index === 1 ? { ...step, completed: true } : step
      ));
      setShowAnswer(true);

      // Step 3: Response Generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSteps(prev => prev.map((step, index) => 
        index === 2 ? { ...step, completed: true } : step
      ));
      setShowSearchBar(true);
    };

    completeSteps();
  }, [query]);

  const insights = getInsightText(query);
  const showChart = query?.toLowerCase().includes('tesla');

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="mt-8 space-y-8">
            <AnalysisSteps steps={steps} />
            
            {showSources && (
              <div className="animate-fade-in">
                <SearchSources sources={sources} />
              </div>
            )}

            {showAnswer && (
              <div className="animate-fade-in">
                <InsightsDisplay 
                  query={query}
                  insights={insights}
                  showChart={showChart}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {showSearchBar && <SearchResultsBar />}
    </div>
  );
};

export default SearchResults;