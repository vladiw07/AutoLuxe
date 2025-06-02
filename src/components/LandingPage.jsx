import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import background from '../assets/images/backgroundCarImage.png';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset any open dropdown when toggling the menu
    setActiveDropdown(null);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Dropdown content data
  const dropdownOptions = {
    cars: [
      { name: 'Luxury Sedans', link: '#luxury-sedans' },
      { name: 'Sports Cars', link: '#sports-cars' },
      { name: 'SUVs', link: '#suvs' },
      { name: 'Electric Vehicles', link: '#electric-vehicles' },
      { name: 'Convertibles', link: '#convertibles' },
      { name: 'Vintage Collection', link: '#vintage-collection' },
    ],
    models: [
      { name: 'Mercedes-Benz', link: '#mercedes' },
      { name: 'BMW', link: '#bmw' },
      { name: 'Audi', link: '#audi' },
      { name: 'Tesla', link: '#tesla' },
      { name: 'Porsche', link: '#porsche' },
      { name: 'Lamborghini', link: '#lamborghini' },
    ],
    prices: [
      { name: 'Under $100/day', link: '#under-100' },
      { name: '$100-$200/day', link: '#100-200' },
      { name: '$200-$300/day', link: '#200-300' },
      { name: '$300-$500/day', link: '#300-500' },
      { name: '$500-$1000/day', link: '#500-1000' },
      { name: 'Premium ($1000+/day)', link: '#premium' },
    ],
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat font-parkinsans px-4 sm:px-8 md:px-16 lg:px-32 py-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-4 md:p-6 text-white relative z-30">
          <div className="text-[18px] sm:text-[20px] font-medium">AutoLuxe</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex text-[18px] space-x-8" ref={dropdownRef}>
            <a href="#" className="hover:text-gray-300 flex items-center gap-1 group">
              Home 
            </a>
            
            {/* Cars Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('cars')} 
                className="hover:text-gray-300 flex items-center gap-1 group"
              >
                Cars <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'cars' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'cars' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-black bg-opacity-90 rounded-md shadow-lg py-2 z-40">
                  {dropdownOptions.cars.map((option, index) => (
                    <a 
                      key={index} 
                      href={option.link} 
                      className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-150"
                    >
                      {option.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {/* Models Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('models')} 
                className="hover:text-gray-300 flex items-center gap-1 group"
              >
                Models <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'models' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'models' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-black bg-opacity-90 rounded-md shadow-lg py-2 z-40">
                  {dropdownOptions.models.map((option, index) => (
                    <a 
                      key={index} 
                      href={option.link} 
                      className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-150"
                    >
                      {option.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {/* Prices Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('prices')} 
                className="hover:text-gray-300 flex items-center gap-1 group"
              >
                Prices <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'prices' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'prices' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-black bg-opacity-90 rounded-md shadow-lg py-2 z-40">
                  {dropdownOptions.prices.map((option, index) => (
                    <a 
                      key={index} 
                      href={option.link} 
                      className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-150"
                    >
                      {option.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop CTA Button */}
          <button className="hidden md:block px-6 py-2 bg-white rounded-xl text-black text-[18px] transition-all duration-300 hover:bg-gray-100 hover:shadow-md active:scale-[0.98]">
            Book a call
          </button>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden text-white text-2xl focus:outline-none relative z-30"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* Mobile Navigation Fullscreen */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black z-20 flex flex-col pt-20">
            <div className="flex flex-col space-y-2 text-white text-[22px] px-4">
              <a href="#" className="hover:text-gray-300 py-3 border-b border-gray-700">
                Home
              </a>
              
              {/* Mobile Cars Dropdown */}
              <div className="border-b border-gray-700">
                <button 
                  onClick={() => toggleDropdown('mobile-cars')}
                  className="hover:text-gray-300 py-3 w-full flex justify-between items-center"
                >
                  Cars <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'mobile-cars' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-cars' && (
                  <div className="pl-4 pb-3">
                    {dropdownOptions.cars.map((option, index) => (
                      <a 
                        key={index} 
                        href={option.link} 
                        className="block py-2 text-gray-300 hover:text-white text-[18px]"
                      >
                        {option.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mobile Models Dropdown */}
              <div className="border-b border-gray-700">
                <button 
                  onClick={() => toggleDropdown('mobile-models')}
                  className="hover:text-gray-300 py-3 w-full flex justify-between items-center"
                >
                  Models <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'mobile-models' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-models' && (
                  <div className="pl-4 pb-3">
                    {dropdownOptions.models.map((option, index) => (
                      <a 
                        key={index} 
                        href={option.link} 
                        className="block py-2 text-gray-300 hover:text-white text-[18px]"
                      >
                        {option.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mobile Prices Dropdown */}
              <div className="border-b border-gray-700">
                <button 
                  onClick={() => toggleDropdown('mobile-prices')}
                  className="hover:text-gray-300 py-3 w-full flex justify-between items-center"
                >
                  Prices <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'mobile-prices' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-prices' && (
                  <div className="pl-4 pb-3">
                    {dropdownOptions.prices.map((option, index) => (
                      <a 
                        key={index} 
                        href={option.link} 
                        className="block py-2 text-gray-300 hover:text-white text-[18px]"
                      >
                        {option.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <button className="self-start mt-6 px-8 py-3 bg-white rounded-xl text-black text-[18px] transition-all duration-300 hover:bg-gray-100 hover:shadow-md active:scale-[0.98]">
                Book a call
              </button>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className={`flex-grow mt-8 sm:mt-12 md:mt-20 flex flex-col px-2 sm:px-6 max-w-4xl text-white ${isMenuOpen ? 'hidden md:flex' : 'flex'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] mb-4 leading-[1.1]">
            Plan your next ride with<br />our professional help
          </h1>
          <p className="text-base sm:text-lg md:text-[20px] mb-6 md:mb-8">
            Reserve the car of your dreams for the time <br className="hidden sm:block" /> you need, and
            experience the perfect <br className="hidden sm:block" /> blend of luxury and comfort
          </p>
          <button className="self-start px-6 sm:px-8 py-2 sm:py-3 bg-white rounded-xl text-black transition-all duration-300 text-base sm:text-[18px] hover:bg-gray-100 hover:shadow-md active:scale-[0.98]">
            Let's ride!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;