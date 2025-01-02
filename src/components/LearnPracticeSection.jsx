import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, BookOpen, Award, Brain, Laptop } from 'lucide-react';

export default function LearnPracticeSection() {
  const [activeTab, setActiveTab] = useState('codekata');

  const tabs = [
    { id: 'codekata', label: 'Codekata' },
    { id: 'webkata', label: 'Webkata' },
    { id: 'debugging', label: 'Debugging' },
    { id: 'ide', label: 'IDE' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'referral', label: 'Referral' },
    { id: 'forum', label: 'Forum' },
  ];

  const content = {
    codekata: {
      title: "Codekata",
      description: "An interactive platform for programming practice with 1500+ coding problems curated by top programming veterans in the IT industry. CodeKata tracks your performance and develops your coding profile to showcase your skill set in the job recruitment process.",
      image: "https://res.cloudinary.com/dqt4zammn/image/upload/v1734429178/api5kfd3wfdkakatqsbn.jpg",
      icon: <Code className="w-6 h-6" />,
      buttonText: "Explore Codekata"
    },
    webkata: {
      title: "Webkata",
      description: "Master web development through hands-on practice. Build responsive websites and learn modern frontend technologies through interactive challenges.",
      image: "https://your-image-url.com/webkata.jpg",
      icon: <Laptop className="w-6 h-6" />,
      buttonText: "Start Webkata"
    },
    debugging: {
      title: "Debugging",
      description: "Enhance your problem-solving skills by finding and fixing bugs in real-world code scenarios. Learn debugging techniques used by professional developers.",
      image: "https://your-image-url.com/debugging.jpg",
      icon: <Terminal className="w-6 h-6" />,
      buttonText: "Practice Debugging"
    },
    // Add content for other tabs...
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-900 mb-8"
        >
          Learn. Practice. Earn. Have Fun!
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'bg-[#333333] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {content[activeTab] && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  {content[activeTab].icon}
                  <h2 className="text-2xl font-bold text-gray-900">
                    {content[activeTab].title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  {content[activeTab].description}
                </p>
                <button className="px-6 py-3 bg-[#333333] text-white rounded-md hover:bg-gray-700 transition-colors">
                  {content[activeTab].buttonText}
                </button>
              </div>

              <motion.div 
                className="order-1 md:order-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={content[activeTab].image}
                  alt={content[activeTab].title}
                  className="w-full rounded-lg shadow-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 