import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Source {
  title: string;
  url: string;
  source: string;
  icon?: string;
}

interface SearchSourcesProps {
  sources: Source[];
}

export const SearchSources = ({ sources }: SearchSourcesProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-white">Sources</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {sources.map((source, index) => (
          <Card key={index} className="min-w-[300px] bg-[#141414] border-[#333333] hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium line-clamp-2 mb-2">{source.title}</h3>
                  <div className="flex items-center gap-2 text-secondary text-sm">
                    {source.icon && <img src={source.icon} alt={source.source} className="w-4 h-4" />}
                    <span>{source.source}</span>
                  </div>
                </div>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};