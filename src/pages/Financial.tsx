import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LocationInput from '@/components/LocationInput';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import PageHeader from '@/components/PageHeader';
import SchemeList from '@/components/SchemeList';
import { fetchFinancialAid } from '@/api/perplexityApi';

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
      const title = titleMatch ? titleMatch[1].trim() : "Financial Aid Program";
      
      let description = itemText;
      const eligibilityIndex = itemText.indexOf("Eligibility");
      const howToApplyIndex = itemText.indexOf("How to Apply");
      const applicationProcessIndex = itemText.indexOf("Application Process");
      
      if (eligibilityIndex > -1) {
        description = itemText.substring(0, eligibilityIndex).trim();
      } else if (howToApplyIndex > -1) {
        description = itemText.substring(0, howToApplyIndex).trim();
      } else if (applicationProcessIndex > -1) {
        description = itemText.substring(0, applicationProcessIndex).trim();
      }
      
      description = titleMatch 
        ? description.substring(titleMatch[0].length).trim() 
        : description;
      
      let eligibility;
      if (eligibilityIndex > -1) {
        const endIndex = howToApplyIndex > -1 
          ? howToApplyIndex 
          : (applicationProcessIndex > -1 ? applicationProcessIndex : itemText.length);
        eligibility = itemText.substring(eligibilityIndex, endIndex).replace(/Eligibility:?\s*/i, '').trim();
      }
      
      let howToApply;
      if (howToApplyIndex > -1) {
        howToApply = itemText.substring(howToApplyIndex).replace(/How to Apply:?\s*/i, '').trim();
      } else if (applicationProcessIndex > -1) {
        howToApply = itemText.substring(applicationProcessIndex).replace(/Application Process:?\s*/i, '').trim();
      }
      
      return {
        title,
        description,
        ...(eligibility && { eligibility }),
        ...(howToApply && { howToApply })
      };
    });
  } catch (error) {
    console.error("Error parsing financial aid programs:", error);
    
    return [{
      title: "Financial Aid Programs",
      description: rawText
    }];
  }
};

const Financial = () => {
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userLocation = localStorage.getItem('userLocation') || 'your area';

  const fetchFinancialPrograms = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const rawData = await fetchFinancialAid();
      const parsedSchemes = parseSchemes(rawData);
      setSchemes(parsedSchemes);
    } catch (err) {
      console.error("Error fetching financial aid programs:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch financial aid programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialPrograms();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <PageHeader 
          title="Financial Aid" 
          description={`Discover financial assistance, loans, subsidies, and economic support programs available in ${userLocation}.`}
          icon={<Calendar className="h-6 w-6" />}
        />
        
        <div className="mb-6">
          <LocationInput onSave={() => fetchFinancialPrograms()} />
        </div>
        
        {loading ? (
          <LoadingState message="Fetching financial aid programs" />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchFinancialPrograms} />
        ) : (
          <SchemeList 
            schemes={schemes} 
            emptyMessage="No financial aid programs found for your location."
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Financial;
