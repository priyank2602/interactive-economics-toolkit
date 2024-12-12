import { Header } from "@/components/Header";
import { SearchResultsBar } from "@/components/SearchResultsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { LoadingSteps } from "@/components/LoadingSteps";

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
    <div className="space-y-8">
      <div className="bg-black border-[#333333] p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4 text-white">Analysis Progress</h2>
        <LoadingSteps query={query} />
      </div>

      <div className="bg-black border-[#333333] p-6 rounded-lg shadow-sm border">
        <div className="max-w-3xl mx-auto">
          <div className="pt-4 border-t border-[#333333]">
            <SearchResultsBar />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-[#333333] text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Search Results</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center gap-2 mb-6">
            <TabsList className="bg-black border border-[#333333] p-1 flex-grow rounded-lg">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 px-4 py-2 text-white rounded-md data-[state=active]:bg-[#333333] data-[state=active]:text-white hover:bg-[#252525] transition-colors"
                >
                  {tab.query}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddTab}
              className="h-10 w-10 border-[#333333] bg-black text-white hover:bg-[#333333] flex items-center justify-center rounded-lg"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <SearchResultContent query={tab.query} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default SearchResults;