import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StockPriceChart } from "./StockPriceChart";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StepProps {
  step: number;
  title: string;
  description: string;
  progress: number;
}

const Step = ({ step, title, description, progress }: StepProps) => {
  return (
    <AccordionItem value={`step-${step}`} className="border-none">
      <AccordionTrigger className="hover:no-underline py-2">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
            {step}
          </div>
          <div className="flex flex-col items-start gap-1 flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Progress value={progress} className="h-2 w-full" />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-12">
        <p className="text-secondary">{description}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

const getInsightText = (query: string | null) => {
  if (!query) return "";
  
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('build story') && lowerQuery.includes('ceo')) {
    return {
      showTiles: true,
      tiles: [
        {
          title: "Strategic Vision",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "Financial Performance",
          content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          title: "Market Position",
          content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
          title: "Future Outlook",
          content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    };
  }
  
  if (lowerQuery.includes('tesla')) {
    return "Based on the analyzed market trends and financial indicators, we observe significant volatility in the stock price over the past month. The price movements suggest a general upward trend with notable resistance levels. Consider monitoring key support and resistance zones for potential trading opportunities.";
  }
  
  if (lowerQuery.includes('cib') || lowerQuery.includes('investment banking')) {
    return "In the context provided, the query \"Are there any notable fluctuations in CIB (Corporate & Investment Banking) or IB (Investment Banking) performance metrics?\" is best addressed through financial commentary. The insights from the CEOs of JPMorgan Chase and Bank of America highlight notable positive fluctuations in performance metrics. JPMorgan Chase experienced a 21% increase in Investment Banking fees, driven by improved activity in Debt Capital Markets and Equity Capital Markets, indicating a significant positive fluctuation in IB performance. Additionally, there was strong growth in Payments fees within the CIB sector. Bank of America reported consistent positive performance in its Global Markets business, achieving its ninth consecutive quarter of year-over-year revenue growth in sales and trading, contributing to overall growth and profitability. These commentaries provide a comprehensive analysis of the positive trends in CIB and IB performance metrics for both banks.";
  }
  
  if (lowerQuery.includes('revenue')) {
    return `The revenue composition analysis of Bank of America and JPMorgan Chase reveals distinct trends and strategic insights based on CEO commentaries and financial data.

Bank of America
CEO Brian Moynihan emphasizes the strength and earnings power of their Consumer Banking segment, complemented by growth in Global Markets, Global Banking, and Wealth Management. Notably, the Global Markets business has shown consistent year-over-year revenue growth in sales and trading, delivering double-digit returns. This reflects a strategic focus on diversifying revenue streams and investing in high-growth areas to enhance shareholder value.

Revenue Highlights:
Total Business Lending Revenue decreased slightly from $2,692 million in Q2 2023 to $2,565 million in Q2 2024.
Total Global Transaction Services Revenue declined from $2,923 million in Q2 2023 to $2,561 million in Q2 2024.
Advisory Revenue, however, experienced significant growth, increasing from $540 million in Q2 2023 to $785 million in Q2 2024.
This suggests a strategic pivot toward advisory services, likely driven by market demand and the bank's focus on high-margin business areas.

JPMorgan Chase
CEO Jamie Dimon highlights strong results underpinned by capital flexibility and growth initiatives. Despite a 4% sequential decline in Net Interest Income (NII), the bank demonstrated robust performance across its business lines.

Revenue Highlights:
The Corporate & Investment Bank (CIB) segment saw a 21% increase in investment banking fees, reflecting improvements in Debt Capital Markets (DCM) and Equity Capital Markets (ECM) activity.
The Commercial Banking (CB) segment achieved strong growth in payments fees and added new client relationships.
Asset & Wealth Management (AWM) reported a 14% increase in asset management fees, supported by continued strong net inflows.`;
  }
  
  return "Based on the analyzed data and trends, we've identified key patterns and insights relevant to your query. The analysis suggests important developments that warrant attention and could influence decision-making processes.";
};

export const StepFlow = ({ onStep2Complete }: StepFlowProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const showChart = query?.toLowerCase().includes('tesla');
  const insights = getInsightText(query);
  const showTiles = typeof insights === 'object' && insights.showTiles;

  const [currentStep, setCurrentStep] = useState(1);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setProgress1((prev) => {
        if (prev >= 100) {
          clearInterval(interval1);
          setCurrentStep(2);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval1);
  }, []);

  useEffect(() => {
    if (currentStep === 2) {
      const interval2 = setInterval(() => {
        setProgress2((prev) => {
          if (prev >= 100) {
            clearInterval(interval2);
            setCurrentStep(3);
            onStep2Complete?.();
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval2);
    }
  }, [currentStep, onStep2Complete]);

  useEffect(() => {
    if (currentStep === 3) {
      const interval3 = setInterval(() => {
        setProgress3((prev) => {
          if (prev >= 100) {
            clearInterval(interval3);
            setIsComplete(true);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval3);
    }
  }, [currentStep]);

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-4">
        <Step
          step={currentStep}
          title={
            currentStep === 1
              ? "Data Collection"
              : currentStep === 2
              ? "Analysis"
              : "Recommendations"
          }
          description={
            currentStep === 1
              ? "Gathering relevant market data and financial indicators"
              : currentStep === 2
              ? "Processing and analyzing market trends"
              : "Generating actionable insights"
          }
          progress={
            currentStep === 1
              ? progress1
              : currentStep === 2
              ? progress2
              : progress3
          }
        />
      </Accordion>
      
      {progress3 > 0 && showChart && (
        <div className="mt-8">
          <div className="bg-[#141414] border border-[#333333] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Stock Price Trend</h3>
            <StockPriceChart />
          </div>
        </div>
      )}

      {isComplete && (
        <div className="mt-8 animate-fade-in">
          {showTiles ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.tiles.map((tile, index) => (
                <Card key={index} className="bg-[#141414] border-[#333333] text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">{tile.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary">{tile.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-[#141414] border border-[#333333] p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-white">Insights</h3>
              <p className="text-secondary text-sm mb-4">
                Data collection completed → Market trends analyzed → Actionable insights generated
              </p>
              <p className="text-secondary whitespace-pre-line">
                {typeof insights === 'string' ? insights : ''}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
