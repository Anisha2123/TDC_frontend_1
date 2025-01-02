import { motion } from 'framer-motion';
import { BookOpen, Code, Video, Trophy, Users, Brain } from 'lucide-react';

export default function HomeFeatures() {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Interactive Coding Labs",
      description: "Practice coding in real-time with our interactive labs. Get instant feedback and improve your skills.",
      color: "bg-blue-50"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Live Expert Sessions",
      description: "Join live sessions with industry experts. Learn from their experiences and get your questions answered.",
      color: "bg-green-50"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Skill Challenges",
      description: "Test your knowledge with daily challenges. Earn badges and showcase your achievements.",
      color: "bg-yellow-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Peer Learning",
      description: "Connect with fellow learners. Collaborate on projects and grow together.",
      color: "bg-purple-50"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Learning Path",
      description: "Personalized learning paths powered by AI. Learn at your own pace and style.",
      color: "bg-pink-50"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Industry Projects",
      description: "Work on real-world projects. Build a portfolio that stands out.",
      color: "bg-orange-50"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose TDC?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our unique approach to tech education that sets us apart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${feature.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center mb-4">
                <div className="text-gray-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>
              <div className="mt-4">
                <button className="text-white-600 hover:text-blue-700 font-medium">
                  Learn more →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-blue-600 font-medium">New!</span>
            <span className="text-gray-700">AI-powered personalized learning paths now available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 