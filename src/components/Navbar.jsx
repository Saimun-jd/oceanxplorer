import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navbarClass = `fixed top-0 left-0 right-0 z-50 p-4 ${
    isMobile ? 'bg-gradient-to-br from-purple-900 to-blue-900' : 'bg-transparent'
  }`;

  return (
    <nav className={navbarClass}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-white text-xl font-bold">HOME</NavLink>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/insight" className="text-white text-xl">INSIGHT</NavLink>
            <NavLink to="/globe" className="text-white text-xl">EARTH</NavLink>
            <NavLink to="https://pace.oceansciences.org/news.htm" className="text-white text-xl">NEWS AND UPDATES</NavLink>
            <NavLink to="/choosescene" className="text-white text-xl">ECOSYSTEM</NavLink>
            <NavLink to="/game" className="text-white text-xl">GAMES</NavLink>
            <NavLink to="/facts" className="text-white text-xl">FACTS</NavLink>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
              <input type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} className="bg-transparent text-white placeholder-white outline-none" />
              <Search className="text-white ml-2" size={20} />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4">
            <NavLink to="/insight" className="block text-white text-xl py-2">INSIGHT</NavLink>
            <NavLink to="/globe" className="block text-white text-xl py-2">EARTH</NavLink>
            <NavLink to="https://pace.oceansciences.org/news.htm" className="block text-white text-xl py-2">NEWS AND UPDATES</NavLink>
            <NavLink to="/exploreocean" className="block text-white text-xl py-2">ECOSYSTEM</NavLink>
            <NavLink to="https://pace.oceansciences.org/aerosol_quiz.htm" className="block text-white text-xl py-2">GAMES</NavLink>
            <NavLink to="/facts" className="block text-white text-xl py-2">FACTS</NavLink>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 mt-2">
              <input type="text" value={searchVal} onChange={(e)=> setSearchVal(e.target.value)} className="bg-transparent text-white placeholder-white outline-none w-full" />
              <Search className="text-white ml-2" size={20} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;