import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StepFlow } from "@/components/StepFlow";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('q');

  // Mock market events
  const marketEvents = [
    { date: "2024-02-01", event: "Quarterly Earnings Report Released" },
    { date: "2024-01-25", event: "New Product Launch Announcement" },
    { date: "2024-01-15", event: "Strategic Partnership Agreement" },
  ];

  // Mock next best actions
  const nextBestActions = [
    "Review quarterly financial statements",
    "Analyze competitor market position",
    "Monitor industry regulatory changes",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Results for: {searchQuery}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Analysis Progress</h2>
            <StepFlow />
          </div>

          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Market Events</h2>
            <div className="space-y-4">
              {marketEvents.map((event, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 dark:border-gray-800">
                  <p className="text-sm text-secondary">{event.date}</p>
                  <p className="font-medium">{event.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Next Best Actions</h2>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {nextBestActions.map((action, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-sm font-medium">{action}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t dark:border-gray-800">
              <SearchBar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;