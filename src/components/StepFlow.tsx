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

export const StepFlow = () => {
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
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval2);
    }
  }, [currentStep]);

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

  const getCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step
            step={1}
            title="Data Collection"
            description="Gathering relevant market data and financial indicators"
            progress={progress1}
          />
        );
      case 2:
        return (
          <Step
            step={2}
            title="Analysis"
            description="Processing and analyzing market trends"
            progress={progress2}
          />
        );
      case 3:
        return (
          <Step
            step={3}
            title="Recommendations"
            description="Generating actionable insights"
            progress={progress3}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-4">
        {getCurrentStep()}
      </Accordion>
      
      {isComplete && (
        <div className="mt-8 p-6 bg-white dark:bg-black rounded-lg border animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Analysis Complete</h3>
          <p className="text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      )}
    </div>
  );
};