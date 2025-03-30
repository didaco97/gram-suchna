
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import InfoCard from './InfoCard';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

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
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  if (!schemes || schemes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  const SchemeCard = ({ scheme, index }: { scheme: SchemeItem; index: number }) => (
    <div className="bg-white/80 backdrop-blur-sm border border-ghibli-green-light/50 rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-2 mb-3">
        <span className="flex items-center justify-center w-6 h-6 bg-ghibli-green-light text-ghibli-green-dark rounded-full text-sm font-medium flex-shrink-0">
          {index + 1}
        </span>
        <h3 className="text-xl font-bold text-ghibli-green-dark">
          {scheme.title}
        </h3>
      </div>
      
      <div className="space-y-3">
        <p className="text-gray-700">{scheme.description}</p>
        
        {scheme.eligibility && (
          <div className="bg-ghibli-cream/30 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-ghibli-cream text-ghibli-brown font-medium">{t('common.eligibility')}</Badge>
            </div>
            <p className="text-sm text-gray-700">{scheme.eligibility}</p>
          </div>
        )}
        
        {scheme.howToApply && (
          <div className="bg-ghibli-blue-light/20 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-ghibli-blue-light text-ghibli-blue-dark font-medium">{t('common.howToApply')}</Badge>
            </div>
            <p className="text-sm text-gray-700">{scheme.howToApply}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-ghibli-green-light/50 text-sm text-gray-500 flex justify-between items-center">
        {scheme.deadline && (
          <span>{t('common.deadline')}: {scheme.deadline}</span>
        )}
        {scheme.source && (
          <span>{t('common.source')}: {scheme.source}</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile view: Vertical scrolling cards */}
      {isMobile ? (
        <ScrollArea className="h-[60vh]">
          <div className="space-y-5 animate-fade-in">
            {schemes.map((scheme, index) => (
              <div key={index} className="hover-scale">
                <SchemeCard scheme={scheme} index={index} />
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        /* Desktop view: Carousel */
        <div className="py-4">
          <Carousel className="w-full">
            <CarouselContent>
              {schemes.map((scheme, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <div className="p-1 h-full">
                    <SchemeCard scheme={scheme} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      )}
    </>
  );
};

export default SchemeList;
