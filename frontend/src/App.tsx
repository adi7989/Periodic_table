import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from 'lucide-react'; // Assuming lucide-react is installed
import PeriodicTable from '@/pages/PeriodicTable';
import LearningGame from '@/pages/LearningGame';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';


function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </Button>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<PeriodicTable />} />
            <Route path="/learn" element={<LearningGame />} />
            <Route path="/home" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <Toaster />
    </div>
  );
}

export default App;