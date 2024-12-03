import { Header } from "@/components/Header";
import { StockPriceChart } from "@/components/StockPriceChart";
import { MarketEvents } from "@/components/MarketEvents";
import { JPMCInsights } from "@/components/JPMCInsights";
import { CoPilotWidget } from "@/components/CoPilotWidget";
import { DividendChart } from "@/components/DividendChart";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const JPMCHighlights = () => {
  const [showChart, setShowChart] = useState(false);
  const [stockPriceDays, setStockPriceDays] = useState(30);
  const [showDividendAnalysis, setShowDividendAnalysis] = useState(false);
  const [isDividendLoading, setIsDividendLoading] = useState(false);
  const [isStockChartLoading, setIsStockChartLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChart(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateStockPriceDays = async (days: number) => {
    setIsStockChartLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
    setStockPriceDays(days);
    setIsStockChartLoading(false);
  };

  const handleShowDividendAnalysis = async () => {
    setIsDividendLoading(true);
    setShowDividendAnalysis(false);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setShowDividendAnalysis(true);
        setIsDividendLoading(false);
        resolve();
      }, 3000);
    });
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-[rgba(255,255,255,0.65)] hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="space-y-6">
            <div className="p-6 bg-[#141414] rounded-lg border border-[#333333] shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">JPMC Stock Price (Last {stockPriceDays} Days)</h2>
              {!showChart ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-sm text-[rgba(255,255,255,0.65)]">Connecting to market data...</p>
                  </div>
                </div>
              ) : (
                <StockPriceChart days={stockPriceDays} isLoading={isStockChartLoading} />
              )}
            </div>
            
            {isDividendLoading && (
              <div className="p-6 bg-[#141414] rounded-lg border border-[#333333] shadow-sm">
                <div className="flex items-center justify-center h-[300px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-sm text-[rgba(255,255,255,0.65)]">Loading dividend analysis...</p>
                  </div>
                </div>
              </div>
            )}
            
            {showDividendAnalysis && !isDividendLoading && (
              <div className="p-6 bg-[#141414] rounded-lg border border-[#333333] shadow-sm">
                <DividendChart />
              </div>
            )}
            
            <MarketEvents />
          </section>
          
          <section>
            <JPMCInsights />
          </section>
        </div>
      </main>

      <CoPilotWidget 
        onUpdateStockPriceDays={handleUpdateStockPriceDays}
        onShowDividendAnalysis={handleShowDividendAnalysis}
      />
    </div>
  );
};

export default JPMCHighlights;