
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-ghibli-green-light mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/logo.svg" 
                alt="LocalGhibli" 
                className="h-8 w-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/32?text=LG';
                }}
              />
              <h3 className="ml-2 text-lg font-bold text-ghibli-green-dark">GramSuchna</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Bringing local news and government scheme information.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-ghibli-green-dark uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-ghibli-green-dark">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-ghibli-green-dark">
                  Local News
                </Link>
              </li>
              <li>
                <Link to="/agriculture" className="text-gray-600 hover:text-ghibli-green-dark">
                  Agriculture
                </Link>
              </li>
              <li>
                <Link to="/healthcare" className="text-gray-600 hover:text-ghibli-green-dark">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-600 hover:text-ghibli-green-dark">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/financial" className="text-gray-600 hover:text-ghibli-green-dark">
                  Financial Aid
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-ghibli-green-dark uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-ghibli-green-dark">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-ghibli-green-dark">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-ghibli-green-light pt-4 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Dhiraj Dahale.
          </p>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            Developed By Dhiraj.D. AVCOE.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
