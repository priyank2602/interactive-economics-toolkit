import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { InsightsDisplay } from "./InsightsDisplay";
import { getInsightText } from "@/utils/insightUtils";

interface LoadingStepsProps {
  query: string;
}

export const LoadingSteps = ({ query }: LoadingStepsProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showLoadingSteps, setShowLoadingSteps] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsComplete(true);
        // Hide loading steps after a brief delay
        setTimeout(() => {
          setShowLoadingSteps(false);
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const steps = [
    {
      title: "Data Collection",
      description: "Gathering relevant market data and financial indicators"
    },
    {
      title: "Analysis",
      description: "Processing and analyzing market trends"
    },
    {
      title: "Recommendations",
      description: "Generating actionable insights"
    }
  ];

  return (
    <div className="space-y-8">
      {showLoadingSteps && (
        <div className="bg-black border-[#333333] p-6 rounded-lg shadow-sm border animate-fade-in">
          <div className="flex flex-col items-center justify-center gap-6">
            <Loader2 className={`w-12 h-12 animate-spin ${isComplete ? 'text-green-500' : 'text-primary'}`} />
            <div className="space-y-4 w-full max-w-2xl">
              {steps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      index + 1 < currentStep ? 'bg-green-500' :
                      index + 1 === currentStep ? 'bg-primary animate-pulse' :
                      'bg-[#333333]'
                    }`} />
                    <h3 className={`text-lg font-semibold ${
                      index + 1 < currentStep ? 'text-green-500' :
                      index + 1 === currentStep ? 'text-primary' :
                      'text-[#666666]'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-secondary pl-4">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isComplete && (
        <InsightsDisplay 
          query={query}
          insights={getInsightText(query)}
          showChart={query?.toLowerCase().includes('tesla')}
        />
      )}
    </div>
  );
};