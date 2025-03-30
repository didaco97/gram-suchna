
import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  content: string;
  icon?: ReactNode;
  date?: string;
  source?: string;
  className?: string;
  index?: number;
}

const InfoCard = ({ title, content, icon, date, source, className, index }: InfoCardProps) => {
  // Format content: Split paragraphs and add spacing
  const formatContent = (text: string) => {
    // Split by periods followed by a space or newline
    const sentences = text.split(/\.(?=\s|$)/).filter(Boolean);
    
    // Group sentences into paragraphs (2-3 sentences per paragraph)
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const group = sentences.slice(i, i + 2).join('. ');
      if (group.trim()) paragraphs.push(group + (group.endsWith('.') ? '' : '.'));
    }
    
    return paragraphs.map((para, idx) => (
      <p key={idx} className="mb-3 text-gray-700">{para}</p>
    ));
  };

  return (
    <Card className={`bg-white/80 backdrop-blur-sm border-ghibli-green-light shadow-md hover:shadow-lg transition-all duration-300 ${className || ''}`}>
      <CardHeader className="pb-2">
        {index !== undefined && (
          <span className="inline-flex items-center justify-center w-6 h-6 bg-ghibli-green-light text-ghibli-green-dark rounded-full text-sm font-medium mb-2">
            {index + 1}
          </span>
        )}
        <div className="flex items-start">
          {icon && (
            <div className="text-ghibli-blue mr-2 flex-shrink-0">
              {icon}
            </div>
          )}
          <CardTitle className="text-xl font-bold text-ghibli-green-dark">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="py-3">
        {formatContent(content)}
      </CardContent>
      
      {(date || source) && (
        <CardFooter className="pt-2 border-t border-ghibli-green-light/30 text-sm text-gray-500 flex flex-col items-start">
          {date && <span className="mb-1">Date: {date}</span>}
          {source && <span>Source: {source}</span>}
        </CardFooter>
      )}
    </Card>
  );
};

export default InfoCard;
