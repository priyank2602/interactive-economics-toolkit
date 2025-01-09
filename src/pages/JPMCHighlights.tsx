import { Header } from "@/components/Header";
import { StockPriceChart } from "@/components/StockPriceChart";
import { MarketEvents } from "@/components/MarketEvents";
import { JPMCInsights } from "@/components/JPMCInsights";
import { CoPilotWidget } from "@/components/CoPilotWidget";
import { DividendChart } from "@/components/DividendChart";
import { CEOCommentary } from "@/components/CEOCommentary";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ceoCommentaryQ32024 = [
  "Jamie Dimon, Chairman and CEO, commented: \"The Firm reported strong underlying business and financial results in the third quarter, generating net income of $12.9 billion and an ROTCE of 19%. In the CIB, investment banking fees grew 31%, while Markets revenue was resilient, rising 8%. Payments fees grew by double-digits as investments are fueling organic growth. In CCB, we ranked #1 in U.S. retail deposits for the fourth consecutive year. Card loans increased 11%, and we saw robust acquisition of 2.5 million accounts. Finally, in AWM, asset management fees rose 15%, and long-term net inflows were a record $72 billion.\"",
  
  "Dimon added: \"We await our regulators' new rules on the Basel III endgame and the G-SIB surcharge as well as any adjustments to the SCB or CCAR. We believe rules can be written that promote a strong financial system without causing undue consequences for the economy, and now is an excellent time to step back and review the extensive set of existing rules – which were put in place for a good reason – to understand their impact on economic growth, the viability of both public and private markets, and secondary market liquidity. Regardless of the outcome of these rules, we have an extraordinarily strong balance sheet, evidenced by total loss-absorbing capacity of $544 billion plus cash and marketable securities of $1.5 trillion, while our riskiest assets, loans, total $1.3 trillion. On share repurchases, given that market levels are at least slightly inflated, we maintain our modest pace of buybacks, although we reserve the right to adjust this at any time.\"",
  
  "Dimon added: \"We have been closely monitoring the geopolitical situation for some time, and recent events show that conditions are treacherous and getting worse. There is significant human suffering, and the outcome of these situations could have far-reaching effects on both short-term economic outcomes and more importantly on the course of history. Additionally, while inflation is slowing and the U.S. economy remains resilient, several critical issues remain, including large fiscal deficits, infrastructure needs, restructuring of trade and remilitarization of the world. While we hope for the best, these events and the prevailing uncertainty demonstrate why we must be prepared for any environment.\"",
  
  "Dimon concluded: \"I get to travel around the country and the globe for our Firm. It gives me immense pride to see our employees tirelessly serve their clients and communities, which include over 82 million U.S. consumers and 6 million small businesses, 40 thousand large and medium-sized businesses – who we bank wherever they do business – and thousands of institutional clients, as well as veterans, schools, cities, states and countries around the world. I know you join me in extending gratitude to our employees.\""
];

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

          <section>
            <CEOCommentary commentary={ceoCommentaryQ32024} />
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