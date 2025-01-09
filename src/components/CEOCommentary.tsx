import { Card } from "./ui/card";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

interface CEOCommentaryProps {
  commentary: string[];
  onClose?: () => void;
}

export const CEOCommentary = ({ commentary, onClose }: CEOCommentaryProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300); // Match the animation duration
  };

  return (
    <div className={`space-y-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">JPMC CEO Commentary</h2>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-300 transition-colors"
          aria-label="Close CEO Commentary"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <Card className="p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-[#8E9196]" />
              <Skeleton className="h-4 w-[90%] bg-[#8E9196]" />
              <Skeleton className="h-4 w-[95%] bg-[#8E9196]" />
              <Skeleton className="h-4 w-[85%] bg-[#8E9196]" />
              <Skeleton className="h-4 w-full bg-[#8E9196]" />
              <Skeleton className="h-4 w-[92%] bg-[#8E9196]" />
            </div>
          ) : (
            commentary.map((paragraph, index) => (
              <p key={index} className="my-2">{paragraph}</p>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};