import { useState } from 'react';
import { motion } from 'framer-motion';
import { Element, getCategoryColor } from '@/data/periodicTableData';
import { cn } from '@/lib/utils';

interface PeriodicElementProps {
  element: Element;
  onClick: (element: Element) => void;
}

const PeriodicElement = ({ element, onClick }: PeriodicElementProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine background color class based on element category
  const getBgColorClass = (category: string) => {
    if (category.includes('alkali metal')) return 'alkali-metal';
    if (category.includes('alkaline earth metal')) return 'alkaline-earth-metal';
    if (category.includes('transition metal')) return 'transition-metal';
    if (category.includes('post-transition metal')) return 'post-transition-metal';
    if (category.includes('metalloid')) return 'metalloid';
    if (category.includes('nonmetal')) return 'nonmetal';
    if (category.includes('halogen')) return 'halogen';
    if (category.includes('noble gas')) return 'noble-gas';
    if (category.includes('lanthanide')) return 'lanthanide';
    if (category.includes('actinide')) return 'actinide';
    return 'unknown';
  };

  return (
    <motion.div
      className={cn(
        "relative w-full h-full cursor-pointer select-none rounded-md overflow-hidden", // Removed fixed width/height to fit grid
        getBgColorClass(element.category) // Use dynamic background color class
      )}
      whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0 5px 10px rgba(0,0,0,0.2)" }} // Reduced scale for grid layout
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(element)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }} // Initial animation
      animate={{ opacity: 1, scale: 1 }} // Entry animation
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full flex flex-col justify-between p-1 text-gray-800 dark:text-white" // Adjusted text color for better contrast
      >
        <div className="flex justify-between items-start text-xs font-bold">
          <span>{element.atomicNumber}</span>
          <span className="text-[0.65rem]">{parseFloat(element.atomicMass).toFixed(1)}</span> {/* Smaller font for atomic mass */}
        </div>
        <div className="text-center">
          <span className="text-lg font-bold">{element.symbol}</span>
        </div>
        <div className="text-center text-[0.65rem] truncate opacity-80"> {/* Smaller font for name */}
          {element.name}
        </div>
      </div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-bold" // Overlay on hover
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {element.symbol}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PeriodicElement;