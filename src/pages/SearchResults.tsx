import { Header } from "@/components/Header";
import { SearchResultsBar } from "@/components/SearchResultsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { StepFlow } from "@/components/StepFlow";
import { StockPriceChart } from "@/components/StockPriceChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

interface Tab {
  id: string;
  query: string;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const savedTabs = sessionStorage.getItem('searchTabs');
    return savedTabs ? JSON.parse(savedTabs) : [];
  });
  const [activeTab, setActiveTab] = useState<string>(() => {
    const savedActiveTab = sessionStorage.getItem('activeSearchTab');
    return savedActiveTab || "";
  });

  useEffect(() => {
    if (searchQuery) {
      const newTabId = `tab-${Date.now()}`;
      if (!tabs.some(tab => tab.query === searchQuery)) {
        const newTabs = [...tabs, { id: newTabId, query: searchQuery }];
        setTabs(newTabs);
        setActiveTab(newTabId);
        sessionStorage.setItem('searchTabs', JSON.stringify(newTabs));
        sessionStorage.setItem('activeSearchTab', newTabId);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    sessionStorage.setItem('searchTabs', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    sessionStorage.setItem('activeSearchTab', activeTab);
  }, [activeTab]);

  const handleAddTab = () => {
    navigate('/');
  };

  const SearchResultContent = ({ query }: { query: string }) => (
    <>
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
    </>
  );

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
          <h1 className="text-2xl font-bold">Search Results</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center gap-2 mb-6">
            <TabsList className="h-10 flex-grow">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-4 py-2"
                >
                  {tab.query}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddTab}
              className="h-10 w-10 flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <SearchResultContent query={tab.query} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default SearchResults;