import { Card } from "./ui/card";

interface CEOCommentaryProps {
  commentary: string[];
}

export const CEOCommentary = ({ commentary }: CEOCommentaryProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">CEO Commentary</h2>
      <Card className="p-6 bg-[#141414] border-[#333333]">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {commentary.map((paragraph, index) => (
            <p key={index} className="text-[rgba(255,255,255,0.65)] mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
};