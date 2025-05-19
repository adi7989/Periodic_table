import { useState } from 'react';
import { motion } from 'framer-motion';
import { Element, getCategoryColor } from '@/data/periodicTableData';

interface PeriodicElementProps {
  element: Element;
  onClick: (element: Element) => void;
}

const PeriodicElement = ({ element, onClick }: PeriodicElementProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const backgroundColor = getCategoryColor(element.category);

  return (
    <motion.div
      className="relative w-20 h-20 m-1 cursor-pointer select-none"
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(element)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="w-full h-full rounded-md flex flex-col justify-between p-1 shadow-md transition-all duration-300"
        style={{ 
          backgroundColor,
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 10px 15px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold">{element.atomicNumber}</span>
          <span className="text-xs">{element.atomicMass}</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold">{element.symbol}</span>
        </div>
        <div className="text-center text-xs truncate">
          {element.name}
        </div>
      </div>
      
      {isHovered && (
        <motion.div 
          className="absolute -top-12 left-0 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg z-20 w-32 text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-bold">{element.name}</p>
          <p>Group: {element.group}</p>
          <p>Period: {element.period}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PeriodicElement;