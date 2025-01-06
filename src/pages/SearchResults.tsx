import { Header } from "@/components/Header";
import { SearchResultsBar } from "@/components/SearchResultsBar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnalysisSteps } from "@/components/AnalysisSteps";
import { SearchSources } from "@/components/SearchSources";
import { Card } from "@/components/ui/card";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  const [showSources, setShowSources] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
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

  // Mock sources data - in a real app, this would come from your API
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

      // Step 3: Response Generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSteps(prev => prev.map((step, index) => 
        index === 2 ? { ...step, completed: true } : step
      ));
      setShowAnswer(true);
    };

    completeSteps();
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <SearchResultsBar />

          <div className="mt-8 space-y-8">
            <AnalysisSteps steps={steps} />
            
            {showSources && (
              <div className="animate-fade-in">
                <SearchSources sources={sources} />
              </div>
            )}

            {showAnswer && (
              <div className="animate-fade-in">
                <Card className="bg-[#141414] border-[#333333] p-6">
                  <h2 className="text-xl font-semibold mb-4 text-white">Answer</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-secondary">
                      Apple has agreed to pay $95 million to settle a class-action lawsuit that accused 
                      the company of recording Siri conversations without user consent. The settlement 
                      covers Siri-enabled Apple devices owned between September 17, 2014, and December 31, 2024. 
                      Users may be eligible for up to $20 per device, with a maximum of five devices per claimant.
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;