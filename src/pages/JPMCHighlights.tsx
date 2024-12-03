import { Header } from "@/components/Header";
import { StockPriceChart } from "@/components/StockPriceChart";
import { MarketEvents } from "@/components/MarketEvents";
import { JPMCInsights } from "@/components/JPMCInsights";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const JPMCHighlights = () => {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChart(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="space-y-6">
            <div className="p-6 bg-[#141414] rounded-lg border border-[#333333] shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">JPMC Stock Price (Last 30 Days)</h2>
              {!showChart ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-sm text-muted-foreground">Connecting to market data to show last 30 days stock price</p>
                  </div>
                </div>
              ) : (
                <StockPriceChart />
              )}
            </div>
            
            <MarketEvents />
          </section>
          
          <section>
            <JPMCInsights />
          </section>
        </div>
      </main>
    </div>
  );
};

export default JPMCHighlights;