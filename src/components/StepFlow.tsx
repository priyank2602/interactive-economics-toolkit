import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface StepProps {
  step: number;
  title: string;
  description: string;
  progress: number;
}

const Step = ({ step, title, description, progress }: StepProps) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-black rounded-lg shadow-sm border animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
          {step}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-secondary ml-12">{description}</p>
      <div className="mt-2 ml-12">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export const StepFlow = () => {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

  useEffect(() => {
    // Animate progress bars sequentially
    const timer1 = setTimeout(() => {
      const interval1 = setInterval(() => {
        setProgress1((prev) => {
          if (prev >= 100) {
            clearInterval(interval1);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval1);
    }, 0);

    const timer2 = setTimeout(() => {
      const interval2 = setInterval(() => {
        setProgress2((prev) => {
          if (prev >= 100) {
            clearInterval(interval2);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval2);
    }, 2000);

    const timer3 = setTimeout(() => {
      const interval3 = setInterval(() => {
        setProgress3((prev) => {
          if (prev >= 100) {
            clearInterval(interval3);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval3);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="space-y-4">
      <Step
        step={1}
        title="Data Collection"
        description="Gathering relevant market data and financial indicators"
        progress={progress1}
      />
      <Step
        step={2}
        title="Analysis"
        description="Processing and analyzing market trends"
        progress={progress2}
      />
      <Step
        step={3}
        title="Recommendations"
        description="Generating actionable insights"
        progress={progress3}
      />
    </div>
  );
};