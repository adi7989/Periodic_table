import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { elements, Element } from '@/data/periodicTableData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, X, Trophy, RefreshCw, ArrowRight, SkipForward } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const LearningGame = () => {
  const [gameMode, setGameMode] = useState<'flashcards' | 'quiz'>('flashcards');
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [shuffledElements, setShuffledElements] = useState<Element[]>([]);

  useEffect(() => {
    // Shuffle elements for randomized learning
    const shuffled = [...elements].sort(() => Math.random() - 0.5);
    setShuffledElements(shuffled);
  }, []);

  const currentElement = shuffledElements[currentElementIndex];

  const handleNextElement = () => {
    setIsFlipped(false);
    setCurrentElementIndex((prev) => (prev + 1) % shuffledElements.length);
  };

  const handlePrevElement = () => {
    setIsFlipped(false);
    setCurrentElementIndex((prev) => (prev - 1 + shuffledElements.length) % shuffledElements.length);
  };

  const generateQuestion = () => {
    const questionTypes = [
      'symbol',
      'name',
      'category',
      'atomicNumber',
    ];

    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const correctElement = shuffledElements[Math.floor(Math.random() * shuffledElements.length)];

    let question = '';
    let correctAnswer = '';
    let options: string[] = [];

    switch (questionType) {
      case 'symbol':
        question = `What is the symbol for ${correctElement.name}?`;
        correctAnswer = correctElement.symbol;
        options = [correctElement.symbol];
        // Add 3 random incorrect symbols
        while (options.length < 4) {
          const randomElement = shuffledElements[Math.floor(Math.random() * shuffledElements.length)];
          if (!options.includes(randomElement.symbol) && randomElement.symbol !== correctElement.symbol) {
            options.push(randomElement.symbol);
          }
        }
        break;
      case 'name':
        question = `Which element has the symbol ${correctElement.symbol}?`;
        correctAnswer = correctElement.name;
        options = [correctElement.name];
        // Add 3 random incorrect names
        while (options.length < 4) {
          const randomElement = shuffledElements[Math.floor(Math.random() * shuffledElements.length)];
          if (!options.includes(randomElement.name) && randomElement.name !== correctElement.name) {
            options.push(randomElement.name);
          }
        }
        break;
      case 'category':
        question = `What category does ${correctElement.name} belong to?`;
        correctAnswer = correctElement.category;
        options = [correctElement.category];
        // Add 3 random incorrect categories
        const categories = Array.from(new Set(elements.map(e => e.category)));
        while (options.length < 4 && options.length < categories.length) {
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          if (!options.includes(randomCategory) && randomCategory !== correctElement.category) {
            options.push(randomCategory);
          }
        }
        break;
      case 'atomicNumber':
        question = `What is the atomic number of ${correctElement.name}?`;
        correctAnswer = correctElement.atomicNumber.toString();
        options = [correctElement.atomicNumber.toString()];
        // Add 3 random incorrect atomic numbers
        while (options.length < 4) {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          if (!options.includes(randomNumber.toString()) && randomNumber !== correctElement.atomicNumber) {
            options.push(randomNumber.toString());
          }
        }
        break;
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    return {
      question,
      options,
      correctAnswer
    };
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setQuestionsAnswered(0);
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Great job! You got it right.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer is ${currentQuestion.correctAnswer}`,
        variant: "destructive",
      });
    }

    setQuestionsAnswered(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuestion(generateQuestion());
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setScore(0);
    setQuestionsAnswered(0);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Reshuffle elements
    const shuffled = [...elements].sort(() => Math.random() - 0.5);
    setShuffledElements(shuffled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Periodic Table
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Element Learning Lab
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
            Master the periodic table through interactive flashcards and quizzes. Challenge yourself and have fun while learning!
          </p>
        </header>

        <Tabs value={gameMode} onValueChange={(value) => setGameMode(value as 'flashcards' | 'quiz')} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="mt-6">
            <div className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentElementIndex + (isFlipped ? '-flipped' : '')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="perspective-1000 w-full max-w-md h-64 mb-8 cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  {currentElement && (
                    <div className="relative w-full h-full">
                      {/* Front of card */}
                      <div
                        className={`absolute w-full h-full rounded-xl shadow-xl p-6 flex flex-col justify-center items-center transition-all duration-500 backface-hidden ${
                          isFlipped ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'
                        }`}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <div className="absolute top-4 left-4 text-sm text-gray-500">
                          {currentElementIndex + 1}/{shuffledElements.length}
                        </div>
                        <div className="text-6xl font-bold mb-2">{currentElement.symbol}</div>
                        <div className="text-xl">{currentElement.name}</div>
                        <div className="mt-4">
                          <Badge>{currentElement.category}</Badge>
                        </div>
                        <div className="text-sm text-gray-500 mt-4">Click to flip</div>
                      </div>

                      {/* Back of card */}
                      <div
                        className={`absolute w-full h-full rounded-xl shadow-xl p-6 flex flex-col justify-center items-center transition-all duration-500 backface-hidden ${
                          isFlipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'
                        }`}
                        style={{
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #e2e8f0',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <h3 className="text-xl font-bold mb-4">{currentElement.name} Properties</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm text-left">
                          <div>Atomic Number: <span className="font-medium">{currentElement.atomicNumber}</span></div>
                          <div>Atomic Mass: <span className="font-medium">{currentElement.atomicMass}</span></div>
                          <div>Group: <span className="font-medium">{currentElement.group}</span></div>
                          <div>Period: <span className="font-medium">{currentElement.period}</span></div>
                          <div>Block: <span className="font-medium">{currentElement.block}</span></div>
                          <div>Electron Config: <span className="font-medium">{currentElement.electronConfiguration}</span></div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-4">
                <Button onClick={handlePrevElement} variant="outline">Previous</Button>
                <Button onClick={handleNextElement} variant="default">Next</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            {!quizStarted ? (
              <div className="text-center">
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Test Your Knowledge</h3>
                    <p className="mb-6">Challenge yourself with questions about the periodic table elements. See how many you can get right!</p>
                    <Button onClick={startQuiz} size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div>
                {questionsAnswered >= 10 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          <Trophy size={60} className="text-yellow-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                        <p className="text-lg mb-4">Your score: {score} / 10</p>

                        <div className="mb-6">
                          <Progress value={score * 10} className="h-4" />
                        </div>

                        {score >= 8 ? (
                          <p className="mb-6 text-green-600 dark:text-green-400">Excellent! You're a periodic table master!</p>
                        ) : score >= 5 ? (
                          <p className="mb-6 text-blue-600 dark:text-blue-400">Good job! Keep practicing to improve.</p>
                        ) : (
                          <p className="mb-6 text-orange-600 dark:text-orange-400">Keep learning! You'll get better with practice.</p>
                        )}

                        <Button onClick={resetQuiz} className="flex items-center gap-2">
                          <RefreshCw size={16} />
                          Try Again
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>Question {questionsAnswered + 1}/10</div>
                      <div>Score: {score}</div>
                    </div>

                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-bold mb-6">{currentQuestion?.question}</h3>

                        <div className="grid grid-cols-1 gap-3">
                          {currentQuestion?.options.map((option: string, index: number) => (
                            <Button
                              key={index}
                              variant={selectedAnswer === option
                                ? (isCorrect ? "success" : "destructive")
                                : (selectedAnswer && option === currentQuestion.correctAnswer ? "success" : "outline")}
                              className={`justify-start text-left h-auto py-3 ${
                                selectedAnswer ? 'cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                              disabled={!!selectedAnswer}
                              onClick={() => handleAnswerSelect(option)}
                            >
                              {selectedAnswer === option ? (
                                isCorrect ? (
                                  <Check className="mr-2 h-4 w-4 text-green-500" />
                                ) : (
                                  <X className="mr-2 h-4 w-4 text-red-500" />
                                )
                              ) : (
                                selectedAnswer && option === currentQuestion.correctAnswer && (
                                  <Check className="mr-2 h-4 w-4 text-green-500" />
                                )
                              )}
                              {option}
                            </Button>
                          ))}
                        </div>

                        {/* Next Question Button */}
                        {selectedAnswer && questionsAnswered < 10 && (
                          <div className="mt-6 flex justify-center">
                            <Button
                              onClick={handleNextQuestion}
                              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                            >
                              Next Question
                              <ArrowRight size={16} />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="mb-4">
                      <Progress value={(questionsAnswered / 10) * 100} className="h-2" />
                    </div>

                    {/* Skip Question Button */}
                    {!selectedAnswer && (
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          onClick={handleNextQuestion}
                          className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                          Skip
                          <SkipForward size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningGame;