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
      <div className="material-card hover:translate-y-[-2px]">
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex items-center text-primary">
          <span className="mr-2 font-medium">Learn more</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};