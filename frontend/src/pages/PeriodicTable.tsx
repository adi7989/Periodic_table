import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { elements, Element as ElementType, categoryColors } from '@/data/periodicTableData';
import PeriodicElement from '@/components/PeriodicElement';
import ElementDetailsModal from '@/components/ElementDetailsModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Beaker, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn for conditional class joining

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleElementClick = (element: ElementType) => {
    setSelectedElement(element);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredElements = elements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          element.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || element.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(elements.map(element => element.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Element Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the fascinating world of chemical elements. Click on any element to learn more about its properties and history.
          </p>
        </header>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search elements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Link to="/learn">
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen size={16} />
                Learning Mode
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {Object.entries(categoryColors).map(([category, color]) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer"
              style={{
                backgroundColor: filterCategory === category ? color : 'transparent',
                borderColor: color,
                color: filterCategory === category ? '#000' : 'inherit'
              }}
              onClick={() => setFilterCategory(filterCategory === category ? 'all' : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="grid" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-6">
            <motion.div
              className="flex flex-wrap justify-center gap-1" // Reverted to flexbox layout
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {filteredElements.map(element => ( // Iterate through filtered elements
                <PeriodicElement
                  key={element.atomicNumber}
                  element={element}
                  onClick={handleElementClick}
                />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="table" className="mt-6">
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Atomic Number</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Atomic Mass</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredElements.map(element => (
                    <tr
                      key={element.atomicNumber}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => handleElementClick(element)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-bold text-lg">{element.symbol}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{element.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{element.atomicNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ backgroundColor: categoryColors[element.category as keyof typeof categoryColors] }}
                        >
                          {element.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{element.atomicMass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      <ElementDetailsModal
        element={selectedElement}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default PeriodicTable;