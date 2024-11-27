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

interface StepFlowProps {
  onStep2Complete?: () => void;
}

export const StepFlow = ({ onStep2Complete }: StepFlowProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const showChart = query?.toLowerCase().includes('tesla');

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
        <div className="mt-8 p-6 bg-[#141414] border border-[#333333] rounded-lg animate-fade-in">
          <h3 className="text-xl font-semibold mb-2 text-white">Insights</h3>
          <p className="text-secondary text-sm mb-4">
            Data collection completed → Market trends analyzed → Actionable insights generated
          </p>
          <p className="text-secondary">
            {showChart 
              ? "Based on the analyzed market trends and financial indicators, we observe significant volatility in the stock price over the past month. The price movements suggest a general upward trend with notable resistance levels. Consider monitoring key support and resistance zones for potential trading opportunities."
              : "Based on the analyzed data and trends, we've identified key patterns and insights relevant to your query. The analysis suggests important developments that warrant attention and could influence decision-making processes."}
          </p>
        </div>
      )}
    </div>
  );
};