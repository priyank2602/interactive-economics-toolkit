import { Card } from "./ui/card";

interface CEOCommentaryProps {
  commentary: string[];
}

export const CEOCommentary = ({ commentary }: CEOCommentaryProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">JPMC CEO Commentary</h2>
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