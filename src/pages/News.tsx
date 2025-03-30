
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { FileText } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput';
import InfoCard from '@/components/InfoCard';
import ApiKeyInput from '@/components/ApiKeyInput';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import PageHeader from '@/components/PageHeader';
import { fetchLocalNews } from '@/api/perplexityApi';

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
      const content = titleMatch 
        ? itemText.substring(titleMatch[0].length).trim() 
        : itemText;
      
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
      content: rawText
    }];
  }
};

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const userLocation = localStorage.getItem('userLocation') || 'your area';

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = localStorage.getItem('perplexityApiKey');
      if (!apiKey) {
        setError("Please add your Perplexity API key to fetch news.");
        setLoading(false);
        return;
      }
      
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
          title="Local News" 
          description={`Stay updated with the latest news and events happening in ${userLocation}.`}
          icon={<FileText className="h-6 w-6" />}
        />
        
        <div className="mb-6">
          <LocationInput onSave={() => fetchNews()} />
        </div>
        
        <ApiKeyInput />
        
        {loading ? (
          <LoadingState message="Fetching local news" />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchNews} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.map((item, index) => (
              <InfoCard
                key={index}
                title={item.title}
                content={item.content}
                date={item.date}
                source={item.source}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
