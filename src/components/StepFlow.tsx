import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);

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
    if (currentStep === 2 && !step2Completed) {
      const interval2 = setInterval(() => {
        setProgress2((prev) => {
          if (prev >= 100) {
            clearInterval(interval2);
            setStep2Completed(true);
            onStep2Complete?.();
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval2);
    }
  }, [currentStep, onStep2Complete, step2Completed]);

  useEffect(() => {
    if (step2Completed && !isComplete) {
      setCurrentStep(3);
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
  }, [step2Completed, isComplete]);

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
      
      {isComplete && (
        <div className="mt-8 p-6 bg-[#141414] border border-[#333333] rounded-lg animate-fade-in">
          <h3 className="text-xl font-semibold mb-2 text-white">Insights</h3>
          <p className="text-secondary text-sm mb-4">
            Data collection completed → Market trends analyzed → Actionable insights generated
          </p>
          <p className="text-secondary">
            Based on the analyzed market trends and financial indicators, we observe significant volatility in the stock price over the past month. The price movements suggest a general upward trend with notable resistance levels. Consider monitoring key support and resistance zones for potential trading opportunities.
          </p>
        </div>
      )}
    </div>
  );
};