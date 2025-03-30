
import { useState } from 'react';
import InfoCard from './InfoCard';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SchemeItem {
  title: string;
  description: string;
  eligibility?: string;
  howToApply?: string;
  deadline?: string;
  source?: string;
}

interface SchemeListProps {
  schemes: SchemeItem[];
  emptyMessage?: string;
}

const SchemeList = ({ schemes, emptyMessage = "No schemes available for your location." }: SchemeListProps) => {
  if (!schemes || schemes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {schemes.map((scheme, index) => (
        <div key={index} className="ghibli-card p-6">
          <h3 className="text-xl font-bold mb-2 text-ghibli-green-dark">
            {scheme.title}
          </h3>
          
          <p className="text-gray-700 mb-4">{scheme.description}</p>
          
          {scheme.eligibility && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-ghibli-cream text-ghibli-brown font-medium">Eligibility</Badge>
              </div>
              <p className="text-sm text-gray-600">{scheme.eligibility}</p>
            </div>
          )}
          
          {scheme.howToApply && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-ghibli-blue-light text-ghibli-blue-dark font-medium">How to Apply</Badge>
              </div>
              <p className="text-sm text-gray-600">{scheme.howToApply}</p>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-ghibli-green-light/50 text-sm text-gray-500 flex justify-between items-center">
            {scheme.deadline && (
              <span>Deadline: {scheme.deadline}</span>
            )}
            {scheme.source && (
              <span>Source: {scheme.source}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchemeList;
