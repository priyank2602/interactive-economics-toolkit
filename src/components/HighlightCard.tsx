import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HighlightCardProps {
  title: string;
  description: string;
  link: string;
  className?: string;
}

export const HighlightCard = ({ title, description, link, className = "" }: HighlightCardProps) => {
  return (
    <Link to={link} className={`block ${className}`}>
      <div className="p-6 bg-white rounded-lg border shadow-sm card-hover">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-secondary mb-4">{description}</p>
        <div className="flex items-center text-primary">
          <span className="mr-2">Learn more</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};