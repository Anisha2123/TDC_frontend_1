import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, BookOpen, Trophy, Clock } from 'lucide-react';
import './styles.css';
export default function LearningStats() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "500+",
      label: "Active Learners",
      color: "bg-blue-500",
      count: 500 // Actual number for animation
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: "200+",
      label: "Expert-Led Courses",
      color: "bg-green-500",
      count: 200 // Actual number for animation
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: "95%",
      label: "Success Rate",
      color: "bg-yellow-500",
      count: 95 // Actual number for animation
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "24/7",
      label: "Learning Support",
      color: "bg-purple-500",
      count: 24 // Actual number for animation
    }
  ];

  const [animatedValues, setAnimatedValues] = useState(stats.map(stat => ({ ...stat, animatedValue: 0 })));

  useEffect(() => {
    const animateNumbers = () => {
      const intervals = []; // Store intervals to clear them later

      animatedValues.forEach((stat, index) => {
        const targetValue = stat.count;
        let startValue = stat.label === "Active Learners" ? 0 : 1; // Start from 0 for Active Learners

        const duration = 2; // Duration in seconds
        const stepTime = Math.abs(Math.floor(duration * 1000 / targetValue));

        const interval = setInterval(() => {
          if (startValue < targetValue) {
            startValue++;
            setAnimatedValues(prev => {
              const newStats = [...prev];
              newStats[index].animatedValue = startValue;
              return newStats;
            });
          } else {
            clearInterval(interval);
          }
        }, stepTime);

        intervals.push(interval); // Store the interval
      });

      // Clear all intervals when the animation is complete
      return () => intervals.forEach(clearInterval);
    };

    animateNumbers();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          style={{ y, opacity }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {animatedValues.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-8 text-center">
                <div className={`inline-flex p-3 rounded-lg ${stat.color} bg-opacity-10 mb-4`}>
                  <div className={`text-${stat.color.split('-')[1]}-500`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.label === "Success Rate" ? `${stat.animatedValue}%` : stat.label === "Learning Support" ? `${stat.animatedValue}/7` : stat.animatedValue.toLocaleString()}
                </h3>
                <p className="text-gray-600">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 