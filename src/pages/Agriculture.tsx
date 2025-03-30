import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import PageHeader from '@/components/PageHeader';
import SchemeList from '@/components/SchemeList';
import { fetchAgricultureSchemes } from '@/api/perplexityApi';

interface SchemeItem {
  title: string;
  description: string;
  eligibility?: string;
  howToApply?: string;
  deadline?: string;
  source?: string;
}

const parseSchemes = (rawText: string): SchemeItem[] => {
  try {
    const itemRegex = /\d+\.\s+(.*?)(?=\d+\.|$)/gs;
    const matches = [...rawText.matchAll(itemRegex)];
    
    return matches.map(match => {
      const itemText = match[1].trim();
      
      const titleMatch = itemText.match(/^(.+?)(?::|\.)/);
      const title = titleMatch ? titleMatch[1].trim() : "Agriculture Scheme";
      
      let description = itemText;
      const eligibilityIndex = itemText.indexOf("Eligibility");
      const howToApplyIndex = itemText.indexOf("How to Apply");
      
      if (eligibilityIndex > -1) {
        description = itemText.substring(0, eligibilityIndex).trim();
      } else if (howToApplyIndex > -1) {
        description = itemText.substring(0, howToApplyIndex).trim();
      }
      
      description = titleMatch 
        ? description.substring(titleMatch[0].length).trim() 
        : description;
      
      let eligibility;
      if (eligibilityIndex > -1) {
        const endIndex = howToApplyIndex > -1 ? howToApplyIndex : itemText.length;
        eligibility = itemText.substring(eligibilityIndex, endIndex).replace(/Eligibility:?\s*/i, '').trim();
      }
      
      let howToApply;
      if (howToApplyIndex > -1) {
        howToApply = itemText.substring(howToApplyIndex).replace(/How to Apply:?\s*/i, '').trim();
      }
      
      return {
        title,
        description,
        ...(eligibility && { eligibility }),
        ...(howToApply && { howToApply })
      };
    });
  } catch (error) {
    console.error("Error parsing schemes:", error);
    
    return [{
      title: "Agriculture Schemes",
      description: rawText
    }];
  }
};

const Agriculture = () => {
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userLocation = localStorage.getItem('userLocation') || 'your area';

  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const rawData = await fetchAgricultureSchemes();
      const parsedSchemes = parseSchemes(rawData);
      setSchemes(parsedSchemes);
    } catch (err) {
      console.error("Error fetching agriculture schemes:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch agriculture schemes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageHeader 
          title="Agriculture Schemes" 
          description={`Discover government schemes, subsidies, and opportunities available for farmers in ${userLocation}.`}
          icon={<Home className="h-6 w-6" />}
        />
        
        <div className="mb-6">
          <LocationInput onSave={() => fetchSchemes()} />
        </div>
        
        {loading ? (
          <LoadingState message="Fetching agriculture schemes" />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchSchemes} />
        ) : (
          <SchemeList 
            schemes={schemes} 
            emptyMessage="No agriculture schemes found for your location."
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Agriculture;
