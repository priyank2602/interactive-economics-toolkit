import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('q');

  // Mock data for the chart
  const stockData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    price: Math.random() * 100 + 150
  }));

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Search Results for: {searchQuery}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Stock Price Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">30 Day Stock Performance</h2>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  line: {
                    color: "#9b87f5"
                  }
                }}
              >
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="price" stroke="var(--color-line)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </div>
          </div>

          {/* Market Events */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Market Events</h2>
            <div className="space-y-4">
              {marketEvents.map((event, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <p className="text-sm text-secondary">{event.date}</p>
                  <p className="font-medium">{event.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Best Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold mb-4">Next Best Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nextBestActions.map((action, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="border-t pt-8">
          <SearchBar />
        </div>
      </main>
    </div>
  );
};

export default SearchResults;