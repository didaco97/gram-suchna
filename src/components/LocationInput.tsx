
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface LocationInputProps {
  className?: string;
  onSave?: (location: string) => void;
}

const LocationInput = ({ className, onSave }: LocationInputProps) => {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('userLocation') || '';
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      toast({
        title: "Location is required",
        description: "Please enter your location to continue",
        variant: "destructive",
      });
      return;
    }

    // Save location to localStorage
    localStorage.setItem('userLocation', location);
    
    // Call the onSave prop if provided
    if (onSave) {
      onSave(location);
    }

    // Redirect to news page if on home
    if (location.pathname === '/') {
      navigate('/news');
    }

    toast({
      title: "Location updated",
      description: `Your location is now set to ${location}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row items-stretch gap-2 ${className || ''}`}>
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Enter your location (city, state)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="ghibli-input pr-10 w-full"
        />
      </div>
      <Button 
        type="submit" 
        className="ghibli-button"
      >
        <Search className="h-4 w-4 mr-1" />
        <span>Search</span>
      </Button>
    </form>
  );
};

export default LocationInput;
