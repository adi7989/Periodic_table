import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Beaker, BookOpen, Atom, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Element Explorer
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the periodic table in an interactive way. Learn about elements, their properties, and test your knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Atom className="h-12 w-12 text-blue-400" />}
            title="Interactive Periodic Table"
            description="Explore all elements with detailed information. Filter by properties and search for specific elements."
            link="/"
            delay={0.1}
          />
          
          <FeatureCard 
            icon={<BookOpen className="h-12 w-12 text-purple-400" />}
            title="Learning Games"
            description="Test your knowledge with fun interactive games. Learn element symbols, names, and categories."
            link="/learn"
            delay={0.2}
          />
          
          <FeatureCard 
            icon={<Beaker className="h-12 w-12 text-green-400" />}
            title="Element Details"
            description="Dive deep into each element with comprehensive information about properties, history, and uses."
            link="/"
            delay={0.3}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link to="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2">
              Explore Periodic Table
              <ChevronRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, link, delay }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  link: string,
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
        <CardHeader>
          <div className="mb-4">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-white/70">{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link to={link} className="w-full">
            <Button variant="ghost" className="w-full justify-between border border-white/10 hover:bg-white/10">
              Explore <ChevronRight size={16} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}