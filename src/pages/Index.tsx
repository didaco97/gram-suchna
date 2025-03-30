
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LocationInput from '@/components/LocationInput';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, User, Home, Info } from 'lucide-react';

const Index = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if user has already set a location
    const location = localStorage.getItem('userLocation');
    setHasLocation(!!location);
    
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      title: 'Local News',
      description: 'Stay updated with the latest news and events happening in your area.',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-ghibli-blue-light',
      path: '/news'
    },
    {
      title: 'Agriculture',
      description: 'Access information about farming subsidies, schemes, and opportunities.',
      icon: <Home className="h-8 w-8" />,
      color: 'bg-ghibli-green-light',
      path: '/agriculture'
    },
    {
      title: 'Healthcare',
      description: 'Learn about healthcare programs, facilities, and medical services.',
      icon: <User className="h-8 w-8" />,
      color: 'bg-ghibli-pink',
      path: '/healthcare'
    },
    {
      title: 'Education',
      description: 'Discover educational schemes, scholarships, and learning resources.',
      icon: <Info className="h-8 w-8" />,
      color: 'bg-ghibli-yellow',
      path: '/education'
    },
    {
      title: 'Financial Aid',
      description: 'Find financial assistance, loans, and economic support programs.',
      icon: <Calendar className="h-8 w-8" />,
      color: 'bg-ghibli-earth',
      path: '/financial'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero section */}
      <section className="relative pt-16 md:pt-24 pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-ghibli-blue opacity-10 animate-float"></div>
          <div className="absolute right-60 top-40 w-40 h-40 rounded-full bg-ghibli-green opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -left-20 top-20 w-60 h-60 rounded-full bg-ghibli-yellow opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-ghibli-green-dark mb-6">
              Local News & Government Schemes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay informed about local news and government opportunities in your area.
              Enter your location to discover relevant schemes in agriculture, healthcare, education, and financial aid.
            </p>
            
            <div className="max-w-lg mx-auto">
              <LocationInput className="mb-6" />
              
              {hasLocation && (
                <div className="mt-4">
                  <Link to="/news">
                    <Button className="ghibli-button">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ghibli-green-dark mb-3">
              Explore Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access the latest information across different sectors that matter to you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.path}
                className="ghibli-card hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="p-6">
                  <div className={`rounded-full w-14 h-14 flex items-center justify-center ${category.color} text-ghibli-green-dark mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-ghibli-green-dark">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ghibli-green-dark mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to stay informed about your local area
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-ghibli-blue-light rounded-full flex items-center justify-center text-2xl font-bold text-ghibli-blue-dark mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ghibli-green-dark">Enter Your Location</h3>
                <p className="text-gray-600">Provide your city or region to get locally relevant information</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-ghibli-green-light rounded-full flex items-center justify-center text-2xl font-bold text-ghibli-green-dark mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ghibli-green-dark">Browse Categories</h3>
                <p className="text-gray-600">Explore different categories based on your interests and needs</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-ghibli-yellow rounded-full flex items-center justify-center text-2xl font-bold text-amber-700 mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ghibli-green-dark">Stay Informed</h3>
                <p className="text-gray-600">Get up-to-date information on news and government schemes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
