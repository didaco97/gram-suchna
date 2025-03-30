
import { useEffect, useState } from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '.';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24 mb-4">
        <div className="animate-float">
          <div className="w-16 h-16 rounded-full bg-ghibli-green opacity-20 absolute top-4 left-4"></div>
          <div className="w-16 h-16 rounded-full bg-ghibli-blue opacity-20 absolute top-2 left-2"></div>
          <div className="w-16 h-16 rounded-full bg-ghibli-yellow opacity-20 absolute top-0 left-0"></div>
        </div>
      </div>
      <p className="text-ghibli-green-dark text-lg font-medium">{message}{dots}</p>
      <p className="text-gray-500 text-sm mt-2">Fetching information from Perplexity</p>
    </div>
  );
};

export default LoadingState;
