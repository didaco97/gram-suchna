
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Info } from 'lucide-react';

const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('perplexityApiKey') || '';
  });
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is already set
    const storedApiKey = localStorage.getItem('perplexityApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to enable data fetching",
        variant: "destructive",
      });
      return;
    }

    // Save API key to localStorage
    localStorage.setItem('perplexityApiKey', apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your Perplexity API key has been saved",
    });

    // Hide the form after saving
    setIsVisible(false);
  };

  return (
    <div className="mb-6">
      {!isVisible ? (
        <div className="bg-ghibli-blue-light/50 backdrop-blur-sm rounded-lg p-4 flex items-start justify-between">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-ghibli-blue-dark mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-ghibli-blue-dark">API Key Required</h3>
              <p className="text-sm text-gray-600 mt-1">
                {apiKey 
                  ? "Your Perplexity API key is saved. You can update it if needed."
                  : "You need to set your Perplexity API key to fetch data."}
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setIsVisible(true)} 
            variant="outline" 
            className="ml-4 bg-white text-ghibli-blue-dark border-ghibli-blue hover:bg-ghibli-blue-light"
          >
            {apiKey ? "Update Key" : "Add Key"}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-ghibli-blue-light">
          <h3 className="font-medium text-ghibli-blue-dark mb-3">Enter your Perplexity API Key</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your API key will be stored locally in your browser. Get a Perplexity API key from{' '}
            <a 
              href="https://www.perplexity.ai/settings/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-ghibli-blue-dark hover:underline"
            >
              perplexity.ai/settings/api
            </a>
          </p>
          
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
            />
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsVisible(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-ghibli-blue hover:bg-ghibli-blue-dark">
                Save API Key
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ApiKeyInput;
