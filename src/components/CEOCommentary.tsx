import { Card } from "./ui/card";
import { X, Pencil, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";

interface CEOCommentaryProps {
  commentary: string[];
  onClose?: () => void;
}

export const CEOCommentary = ({ commentary, onClose }: CEOCommentaryProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentary, setEditedCommentary] = useState<string[]>(commentary);

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
    }, 300);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedCommentary([...commentary]);
    }
  };

  const handleTextChange = (index: number, value: string) => {
    const newCommentary = [...editedCommentary];
    newCommentary[index] = value;
    setEditedCommentary(newCommentary);
  };

  return (
    <div className={`space-y-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">JPMC CEO Commentary</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="text-gray-400 hover:text-gray-300 transition-colors"
            aria-label={isEditing ? "Save CEO Commentary" : "Edit CEO Commentary"}
          >
            {isEditing ? (
              <Save className="h-5 w-5" />
            ) : (
              <Pencil className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="Close CEO Commentary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
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
          ) : isEditing ? (
            <div className="space-y-4">
              {editedCommentary.map((paragraph, index) => (
                <Textarea
                  key={index}
                  value={paragraph}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  className="w-full min-h-[100px] text-sm"
                />
              ))}
            </div>
          ) : (
            editedCommentary.map((paragraph, index) => (
              <p key={index} className="my-2">{paragraph}</p>
            ))
          )}
        </div>
      </Card>
      <p className="text-sm text-gray-400 italic text-center">iEAT can make mistakes. Please review before you share</p>
    </div>
  );
};