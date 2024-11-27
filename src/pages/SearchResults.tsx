import { Header } from "@/components/Header";
import { SearchResultsBar } from "@/components/SearchResultsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StepFlow } from "@/components/StepFlow";
import { StockPriceChart } from "@/components/StockPriceChart";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('q');

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
            <h2 className="text-xl font-semibold mb-4">Stock Price Trend</h2>
            <StockPriceChart />
          </div>
        </div>

        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border">
          <div className="max-w-3xl mx-auto">
            <div className="pt-4 border-t dark:border-gray-800">
              <SearchResultsBar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;