
import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  content: string;
  icon?: ReactNode;
  date?: string;
  source?: string;
  className?: string;
}

const InfoCard = ({ title, content, icon, date, source, className }: InfoCardProps) => {
  return (
    <div className={`ghibli-card p-6 h-full flex flex-col justify-between ${className || ''}`}>
      <div>
        {icon && (
          <div className="text-ghibli-blue mb-2">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold mb-2 text-ghibli-green-dark">{title}</h3>
        <p className="text-gray-700 mb-4">{content}</p>
      </div>
      <div className="mt-auto">
        {(date || source) && (
          <div className="text-sm text-gray-500 pt-4 border-t border-ghibli-green-light mt-4">
            {date && <span className="block mb-1">Date: {date}</span>}
            {source && <span className="block">Source: {source}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
