import { Card } from "./ui/card";
import { X } from "lucide-react";

interface CEOCommentaryProps {
  commentary: string[];
  onClose?: () => void;
}

export const CEOCommentary = ({ commentary, onClose }: CEOCommentaryProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">JPMC CEO Commentary</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-300 transition-colors"
          aria-label="Close CEO Commentary"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <Card className="p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {commentary.map((paragraph, index) => (
            <p key={index} className="my-2">{paragraph}</p>
          ))}
        </div>
      </Card>
    </div>
  );
};