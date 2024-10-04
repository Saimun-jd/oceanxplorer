import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, FileText, Image, FileSpreadsheet } from 'lucide-react';

const sections = [
    {
        name: 'Chlorophyll data',
        icon: <FileText />,
        files: [
            { name: 'report.pdf', url: '/files/report.pdf' },
            { name: 'presentation.pptx', url: '/files/presentation.pptx' },
        ],
    },
    {
        name: 'Ocean Color',
        icon: <Image />,
        files: [
            { name: 'logo.png', url: '/files/logo.png' },
            { name: 'banner.jpg', url: '/files/banner.jpg' },
        ],
    },
    {
        name: 'Aerosol depth',
        icon: <FileSpreadsheet />,
        files: [
            { name: 'budget.xlsx', url: '/files/budget.xlsx' },
            { name: 'data.csv', url: '/files/data.csv' },
        ],
    },
    {
        name: 'Want to explore more?',
        icon: <FileSpreadsheet />,
        files: [
            { name: 'SeaDas', url: '/' },
            { name: 'Geovanni', url: '/files/data.csv' },
            { name: 'Matlab', url: '/files/data.csv' },
        ],
    },
];

const DataAccess = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const handleDownload = (url, fileName) => {
        console.log(`Downloading ${fileName} from ${url}`);
    };

    return (
        <div className='relative flex flex-col w-full min-h-screen'>
            <div
                className='absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out blur-md'
                style={{
                    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/aisatellite.webp")',
                    
                }}
            ></div>
            <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.h1
                        className="text-4xl font-extrabold text-center text-green-600 mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        PACE Simplified
                    </motion.h1>
                    <motion.p 
                        className="text-md font-semibold text-center text-white mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Our platform simplifies access to PACE satellite data by enabling easy conversion from netCDF to CSV, allowing students to work with real world data in familliar formats like excel or python for their research and projects.
                    </motion.p>
                    <div className='flex flex-col justify-center items-center'>

                    <motion.div
                        className="bg-white/90 shadow-xl rounded-lg overflow-hidden backdrop-blur-sm w-[400px] sm:w-[800px] md:w-[1200px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                className="border-b border-gray-200 last:border-b-0"
                                initial={false}
                                animate={{ backgroundColor: openSection === index ? "#F3F4F6" : "rgba(255, 255, 255, 0.9)" }}
                                transition={{ duration: 0.2 }}
                            >
                                <button
                                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                                    onClick={() => toggleSection(index)}
                                >
                                    <span className="flex items-center space-x-3">
                                        <motion.span
                                            className="text-indigo-500"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {section.icon}
                                        </motion.span>
                                        <span className="font-medium text-gray-800">{section.name}</span>
                                    </span>
                                    <motion.span
                                        animate={{ rotate: openSection === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {openSection === index && (
                                        <motion.ul
                                            className="bg-gray-50/80 py-2"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {section.files.map((file, fileIndex) => (
                                                <motion.li
                                                    key={fileIndex}
                                                    className="px-6 py-2 flex items-center justify-between"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2, delay: fileIndex * 0.1 }}
                                                >
                                                    <span className="text-sm text-gray-700">{file.name}</span>
                                                    <motion.button
                                                        className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
                                                        onClick={() => handleDownload(file.url, file.name)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Download className="h-5 w-5" />
                                                    </motion.button>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataAccess;