import React, { useEffect } from 'react';
import { API_URL } from '../config/config';
import { motion } from 'framer-motion';
import { Star, Award, Briefcase } from 'lucide-react';

export default function StudentSuccess() {
  const successStories = [
    {
      name: "Priya Sharma",
      role: "Full Stack Developer",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      story: "From a non-tech background to landing my dream job at Microsoft in just 8 months!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Data Scientist",
      company: "Amazon",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      story: "TDC's AI course helped me transition from analytics to data science seamlessly.",
      rating: 5
    },
    {
      name: "Neha Patel",
      role: "Cloud Engineer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      story: "The hands-on projects and mentorship were game-changers in my career.",
      rating: 5
    }
  ];

  useEffect(() => {
    fetch(`${API_URL}/student/success`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      // ...
    });
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful students who transformed their careers with TDC
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{story.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-600">{story.role} at {story.company}</span>
                </div>
                <p className="text-gray-600">{story.story}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-6 py-3 rounded-full">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">Join 10,000+ successful graduates</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 