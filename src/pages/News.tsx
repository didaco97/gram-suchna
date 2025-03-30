
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import { FileText } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput';
import InfoCard from '@/components/InfoCard';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import PageHeader from '@/components/PageHeader';
import { fetchLocalNews } from '@/api/perplexityApi';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

type NewsItem = {
  title: string;
  content: string;
  date?: string;
  source?: string;
};

const parseNewsItems = (rawText: string): NewsItem[] => {
  try {
    // Split by numbered items (1., 2., etc.)
    const itemRegex = /\d+\.\s+(.*?)(?=\d+\.|$)/gs;
    const matches = [...rawText.matchAll(itemRegex)];
    
    return matches.map(match => {
      const itemText = match[1].trim();
      
      // Try to extract title and content
      const titleMatch = itemText.match(/^(.+?)[:|-]/);
      const title = titleMatch ? titleMatch[1].trim() : "News Update";
      
      // Remove the title from the content if found
      let content = titleMatch 
        ? itemText.substring(titleMatch[0].length).trim() 
        : itemText;
      
      // Convert **text** to <strong>text</strong> for bold formatting
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Try to extract date and source if they exist
      const dateMatch = content.match(/Date:?\s*([^,\.]+)/i);
      const sourceMatch = content.match(/Source:?\s*([^,\.]+)/i);
      
      return {
        title,
        content: content
          .replace(/Date:?\s*([^,\.]+)/i, '')
          .replace(/Source:?\s*([^,\.]+)/i, '')
          .trim(),
        ...(dateMatch && { date: dateMatch[1].trim() }),
        ...(sourceMatch && { source: sourceMatch[1].trim() })
      };
    });
  } catch (error) {
    console.error("Error parsing news items:", error);
    
    // Fallback: just return the raw text as a single item
    return [{
      title: "Local News Update",
      content: rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    }];
  }
};

const News = () => {
  const { t } = useTranslation();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const userLocation = localStorage.getItem('userLocation') || t('location.placeholder');

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const rawNewsData = await fetchLocalNews();
      const parsedNews = parseNewsItems(rawNewsData);
      setNewsItems(parsedNews);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch news data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageHeader 
          title={t('pages.news.title')}
          description={t('pages.news.description', { location: userLocation })}
          icon={<FileText className="h-6 w-6" />}
        />
        
        <div className="mb-6">
          <LocationInput onSave={() => fetchNews()} />
        </div>
        
        {loading ? (
          <LoadingState message={t('pages.news.loadingMessage')} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchNews} />
        ) : (
          <>
            {/* Mobile view: Vertically scrolling cards */}
            {isMobile ? (
              <ScrollArea className="h-[60vh]">
                <div className="space-y-5 animate-fade-in">
                  {newsItems.map((item, index) => (
                    <InfoCard
                      key={index}
                      title={item.title}
                      content={item.content}
                      date={item.date}
                      source={item.source}
                      index={index}
                      className="hover-scale"
                    />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              /* Desktop view: Carousel */
              <div className="py-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {newsItems.map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <div className="p-1 h-full">
                          <InfoCard
                            title={item.title}
                            content={item.content}
                            date={item.date}
                            source={item.source}
                            index={index}
                            className="h-full"
                          />
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
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
