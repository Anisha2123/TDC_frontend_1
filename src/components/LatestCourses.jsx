import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import './styles.css';

// Use dynamic imports for images
const images = import.meta.glob('../images/*.{png,jpg,jpeg,gif,webp,svg}');

const tabs = [
  "Database and Cloud Computing",
  "Programming Languages",
  "Network and Security",
  "Data Science",
  "Web Development",
  "Software Testing and Automation",
];

const coursesData = {
  "Database and Cloud Computing": [
    {
      title: "Redis RESTful API",
      enrolled: 24155,
      language: "English",
      image: "",
      link: "/courses/redis-python",
    },
    {
      title: "Apache With Python",
      enrolled: 6368,
      language: "English",
      image: "",
      link: "/courses/cassandra-python",
    },
    {
      title: "JDBC for Beginners",
      enrolled: 2003,
      language: "Hindi",
      image: "",
      link: "/courses/jdbc",
    },
    {
      title: "SQL Masterclass",
      enrolled: 2014,
      language: "Tamil",
      image: "",
      link: "/courses/sql",
    },
  ],
  "Programming Languages": [
    {
      title: "Python for Beginners",
      enrolled: 45678,
      language: "English",
      image: "",
      link: "/courses/python-beginners",
    },
    {
      title: "Java Masterclass",
      enrolled: 34567,
      language: "English",
      image: "",
      link: "/courses/java-masterclass",
    },
    {
      title: "JavaScript Fundamentals",
      enrolled: 28945,
      language: "English",
      image: "",
      link: "/courses/javascript-basics",
    },
    {
      title: "C++ Advanced Concepts",
      enrolled: 15789,
      language: "English",
      image: "",
      link: "/courses/cpp-advanced",
    },
  ],
  "Network and Security": [
    {
      title: "Cybersecurity Fundamentals",
      enrolled: 12567,
      language: "English",
      image: "",
      link: "/courses/cyber-security",
    },
    {
      title: "Network Administration",
      enrolled: 8934,
      language: "English",
      image: "",
      link: "/courses/network-admin",
    },
    {
      title: "Ethical Hacking",
      enrolled: 19876,
      language: "English",
      image: "",
      link: "/courses/ethical-hacking",
    },
    {
      title: "Cloud Security",
      enrolled: 7654,
      language: "English",
      image: "",
      link: "/courses/cloud-security",
    },
  ],
  "Data Science": [
    {
      title: "Machine Learning Basics",
      enrolled: 32145,
      language: "English",
      image: "",
      link: "/courses/ml-basics",
    },
    {
      title: "Data Analysis with Python",
      enrolled: 28456,
      language: "English",
      image: "",
      link: "/courses/data-analysis",
    },
    {
      title: "Deep Learning Fundamentals",
      enrolled: 15678,
      language: "English",
      image: "",
      link: "/courses/deep-learning",
    },
    {
      title: "Statistical Analysis",
      enrolled: 9876,
      language: "English",
      image: "",
      link: "/courses/statistics",
    },
  ],
  "Web Development": [
    {
      title: "Full Stack Development",
      enrolled: 42567,
      language: "English",
      image: "",
      link: "/courses/fullstack",
    },
    {
      title: "React.js Advanced",
      enrolled: 31245,
      language: "English",
      image: "",
      link: "/courses/react-advanced",
    },
    {
      title: "Node.js Backend",
      enrolled: 25678,
      language: "English",
      image: "",
      link: "/courses/nodejs",
    },
    {
      title: "MongoDB Complete Guide",
      enrolled: 18934,
      language: "English",
      image: "",
      link: "/courses/mongodb",
    },
  ],
  "Software Testing and Automation": [
    {
      title: "Selenium WebDriver",
      enrolled: 15678,
      language: "English",
      image: "",
      link: "/courses/selenium",
    },
    {
      title: "API Testing",
      enrolled: 12456,
      language: "English",
      image: "/src/images/api.jpg",
      link: "/courses/api-testing",
    },
    {
      title: "Test Automation Framework",
      enrolled: 9876,
      language: "English",
      image: "/src/images/testing.jpg",
      link: "/courses/test-automation",
    },
    {
      title: "Performance Testing",
      enrolled: 7845,
      language: "English",
      image: "/src/images/testing.jpg",
      link: "/courses/performance-testing",
    },
  ],
};

export default function LatestCourses() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setIsAnimating(true);
      setActiveTab(tab);
      setCurrentSlide(0);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => 
        (prev + 1) % Math.ceil(coursesData[activeTab].length / 4)
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => 
        (prev - 1 + Math.ceil(coursesData[activeTab].length / 4)) % Math.ceil(coursesData[activeTab].length / 4)
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Learn Tech from Latest Courses
          </h2>
          <p className="text-gray-600">
            Explore 175+ Premium Courses with New Course Additions every Month
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#333333] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={currentSlide}>
            <motion.div
              key={currentSlide}
              custom={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 50 },
                opacity: { duration: 0.5 }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {coursesData[activeTab]
                .slice(currentSlide * 4, (currentSlide + 1) * 4)
                .map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={course.link} className="block">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="relative">
                          {course.image ? (
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'; // Hide the image if it fails to load
                              }}
                            />
                          ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">No Image Available</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            <span className="font-medium">{course.enrolled.toLocaleString()}</span>{" "}
                            Enrolled
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {course.language}
                            </span>
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                              Premium
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:bg-gray-50 focus:outline-none"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:bg-gray-50 focus:outline-none"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
