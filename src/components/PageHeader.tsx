
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

const PageHeader = ({ title, description, icon }: PageHeaderProps) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl px-6 py-8 mb-8 border border-ghibli-green-light">
      <div className="flex items-center">
        {icon && (
          <div className="mr-4 p-3 bg-ghibli-green-light rounded-full text-ghibli-green-dark">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-ghibli-green-dark">{title}</h1>
          {description && (
            <p className="mt-2 text-gray-600 max-w-3xl">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
