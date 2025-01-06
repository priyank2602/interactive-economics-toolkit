import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface AnalysisStepsProps {
  steps: Step[];
}

export const AnalysisSteps = ({ steps }: AnalysisStepsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Analysis Progress</h2>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex items-start gap-4 p-4 rounded-lg border ${
              step.completed ? 'bg-[#141414] border-[#333333]' : 'bg-black/50 border-[#333333]'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
              step.completed ? 'bg-primary text-primary-foreground' : 'bg-secondary/20 text-secondary'
            }`}>
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-white font-medium">{step.title}</h3>
              <p className="text-secondary text-sm mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};