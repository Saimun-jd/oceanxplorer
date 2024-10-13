import React, { useState } from 'react';
import { Download, FileSpreadsheet, ChevronDown, ChevronUp, Moon, Star, Sun, Info, BarChart2, Clock } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Mission Data',
    icon: <Moon className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Mars Rover Telemetry', size: '2.3 MB', downloads: 1234, lastUpdated: '2024-03-15' },
      { id: 2, name: 'ISS Experiments Log', size: '2.5 MB', downloads: 987, lastUpdated: '2024-03-10' },
      { id: 3, name: 'Artemis Mission Plan', size: '4.1 MB', downloads: 2345, lastUpdated: '2024-03-05' },
    ],
  },
  {
    id: 2,
    name: 'Astronomical Observations',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Exoplanet Catalog 2024', size: '1.8 MB', downloads: 3456, lastUpdated: '2024-03-01' },
      { id: 2, name: 'Galaxy Cluster Survey', size: '3.2 MB', downloads: 1765, lastUpdated: '2024-02-28' },
    ],
  },
  {
    id: 3,
    name: 'Earth Science',
    icon: <Sun className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Global Climate Data', size: '1.5 MB', downloads: 5678, lastUpdated: '2024-02-25' },
      { id: 2, name: 'Vegetation Index', size: '0.8 MB', downloads: 3210, lastUpdated: '2024-02-20' },
    ],
  },
  {
    id: 4,
    name: 'Space Technology',
    icon: <Moon className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Satellite Propulsion Systems', size: '3.7 MB', downloads: 2100, lastUpdated: '2024-02-18' },
      { id: 2, name: 'Advanced Materials Research', size: '2.9 MB', downloads: 1890, lastUpdated: '2024-02-15' },
    ],
  },
  {
    id: 5,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },
  {
    id: 6,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },
  {
    id: 7,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },
  {
    id: 8,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },
  {
    id: 9,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },
  {
    id: 10,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },{
    id: 11,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },
  {
    id: 12,
    name: 'Astrophysics',
    icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
    files: [
      { id: 1, name: 'Black Hole Simulations', size: '5.2 MB', downloads: 4321, lastUpdated: '2024-02-10' },
      { id: 2, name: 'Cosmic Microwave Background Data', size: '4.8 MB', downloads: 3987, lastUpdated: '2024-02-05' },
    ],
  },
];

const DataAccess = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 flex flex-col">
      <div className="flex-grow overflow-hidden flex flex-col">
        {/* Top section with title and stats */}
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-300 mb-8 animate-pulse">
            PACE Simplified
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 bg-opacity-80 rounded-lg p-4 flex items-center justify-between backdrop-filter backdrop-blur-lg">
              <div className="flex items-center">
                <BarChart2 className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-gray-200">Total Downloads</span>
              </div>
              <span className="text-2xl font-bold text-blue-300">18,675</span>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-lg p-4 flex items-center justify-between backdrop-filter backdrop-blur-lg">
              <div className="flex items-center">
                <FileSpreadsheet className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-gray-200">Available Files</span>
              </div>
              <span className="text-2xl font-bold text-blue-300">{categories.reduce((acc, cat) => acc + cat.files.length, 0)}</span>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-lg p-4 flex items-center justify-between backdrop-filter backdrop-blur-lg">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-gray-200">Last Updated</span>
              </div>
              <span className="text-xl font-bold text-blue-300">2024-03-15</span>
            </div>
          </div>
        </div>

        {/* Data archive section with border and scrolling */}
        <div className="flex-grow px-4 sm:px-6 lg:px-8 pb-4 overflow-hidden">
          <div className="max-w-4xl max-h-80 sm:max-h-96 md:max-h-[520px] mx-auto border-4 border-blue-500 rounded-lg overflow-hidden">
            <div className="bg-gray-800 bg-opacity-80 p-4 backdrop-filter backdrop-blur-lg">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">Data Categories</h2>
            </div>
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="bg-gray-800 bg-opacity-80 shadow-lg overflow-hidden backdrop-filter backdrop-blur-lg transition-all duration-300 ease-in-out">
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                    className="w-full px-4 py-3 md:px-6 md:py-4 bg-blue-900 bg-opacity-60 flex justify-between items-center hover:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="text-blue-300">
                        {category.icon}
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-blue-300">{category.name}</h2>
                    </div>
                    {expandedCategory === category.name ? (
                      <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-blue-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-blue-300" />
                    )}
                  </button>
                  {expandedCategory === category.name && (
                    <ul className="divide-y divide-gray-700">
                      {category.files.map((file) => (
                        <li key={file.id} className="px-4 py-3 md:px-6 md:py-4 hover:bg-gray-700 transition duration-150 ease-in-out">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center mb-2 md:mb-0">
                              <FileSpreadsheet className="h-5 w-5 md:h-6 md:w-6 text-blue-400 mr-3" />
                              <div>
                                <p className="text-sm md:text-base font-medium text-gray-200">{file.name}</p>
                                <p className="text-xs md:text-sm text-gray-400">{file.size}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end space-x-4">
                              <div className="flex items-center space-x-1 text-gray-400">
                                <BarChart2 className="h-4 w-4" />
                                <span className="text-xs">{file.downloads}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-gray-400">
                                <Clock className="h-4 w-4" />
                                <span className="text-xs">{file.lastUpdated}</span>
                              </div>
                              <button className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-blue-100 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                                <Download className="h-4 w-4 md:h-5 md:w-5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Static bottom section */}
      <div className="bg-gray-800 bg-opacity-80 p-4 sm:p-6 lg:p-8 backdrop-filter backdrop-blur-lg mt-auto">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-blue-300 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            About NASA Data Archives
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            Our platform simplifies access to PACE satellite data by enabing easy conversion from netCDF and other complex data format to csv, allowing students to work with real world data in familiar formats like excel, python and matlab for their reaearch purpose and projects.
          </p>
        </div>
      </div>

      {/* Background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DataAccess;