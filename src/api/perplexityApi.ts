
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Function to get location from localStorage
const getLocation = () => {
  return localStorage.getItem('userLocation') || 'Unknown location';
};

interface PerplexityRequestOptions {
  message: string;
  systemPrompt?: string;
}

export const fetchFromPerplexity = async ({ message, systemPrompt = 'Be precise and concise.' }: PerplexityRequestOptions) => {
  const location = getLocation();
  
  try {
    const { data, error } = await supabase.functions.invoke('perplexity', {
      body: {
        message,
        systemPrompt,
        userLocation: location
      }
    });
    
    if (error) {
      throw new Error(`Edge function error: ${error.message}`);
    }
    
    return data.content;
  } catch (error) {
    console.error('Error fetching from Perplexity:', error);
    throw error;
  }
};

// Hook for fetching data with automatic toast notifications
export const usePerplexityFetch = () => {
  const { toast } = useToast();
  
  const fetchWithToast = async (options: PerplexityRequestOptions) => {
    try {
      return await fetchFromPerplexity(options);
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return fetchWithToast;
};

// Category-specific fetch methods
export const fetchLocalNews = async () => {
  return fetchFromPerplexity({
    message: "Provide a summary of the most recent local news, including key headlines, important events, and community updates",
    systemPrompt: "You are a helpful local news assistant. Provide factual, recent news from the specified location. Format your response as a structured list of 5 brief news items with titles and short descriptions."
  });
};

export const fetchAgricultureSchemes = async () => {
  return fetchFromPerplexity({
    message: "Provide information about current government agriculture schemes, subsidies, and opportunities available for farmers",
    systemPrompt: "You are a government agriculture policy assistant. Provide accurate information about available agriculture schemes, subsidies, and programs. Format your response as a list of 5 schemes with name, brief description, eligibility, and how to apply."
  });
};

export const fetchHealthcarePrograms = async () => {
  return fetchFromPerplexity({
    message: "Provide information about current government healthcare programs, benefits, and initiatives available to citizens",
    systemPrompt: "You are a healthcare policy assistant. Provide accurate information about available healthcare programs, benefits, and initiatives. Format your response as a list of 5 healthcare programs with name, brief description, eligibility, and how to access."
  });
};

export const fetchEducationOpportunities = async () => {
  return fetchFromPerplexity({
    message: "Provide information about current government education schemes, scholarships, and learning opportunities",
    systemPrompt: "You are an education policy assistant. Provide accurate information about available education schemes, scholarships, and learning opportunities. Format your response as a list of 5 education opportunities with name, brief description, eligibility, and application process."
  });
};

export const fetchFinancialAid = async () => {
  return fetchFromPerplexity({
    message: "Provide information about current government financial aid, loans, subsidies, and economic support programs",
    systemPrompt: "You are a financial aid assistant. Provide accurate information about available financial aid, loans, subsidies, and economic support programs. Format your response as a list of 5 financial programs with name, brief description, eligibility, and application process."
  });
};
