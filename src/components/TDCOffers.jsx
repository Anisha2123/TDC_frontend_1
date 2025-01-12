import { Book, Tv, Gamepad2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const offerItems = [
  {
    icon: Book,
    title: 'Self-paced Courses',
    description: 'Learn AI, Data Science, and more with industry-aligned courses designed for flexibility and career growth. Get Certified!',
    bgColor: 'bg-[#f0f7ff]',
    iconColor: 'text-[#0066ff]'
  },
  {
    icon: Tv,
    title: 'Hands On Knowledge',
    description: 'Gain hands-on knowledge, work on real-world projects, secure internships, and unlock job opportunities',
    bgColor: 'bg-[#fdf2ff]',
    iconColor: 'text-[#9333ea]'
  },
  {
    icon: Gamepad2,
    title: 'TDC LAB',
    description: 'Pre-configured Environment: Provides an easy, ready-to-use setup for practicing data skills without needing complex configurations.',
    bgColor: 'bg-[#f0fff4]',
    iconColor: 'text-[#22c55e]'
  },
  {
    icon: Building2,
    title: 'Guided Success',
    description: 'Get mentored by highly experienced professionals with personalized support, interview preparation, and guidance at every step of your career journey.',
    bgColor: 'bg-[#fff7ed]',
    iconColor: 'text-[#f97316]'
  }
];

const styles = {
  hamburgerMenu: {
    display: 'none',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 100,
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  '@media screen and (max-width: 768px)': {
    navbar: {
      padding: '1rem',
    },
    
    hamburgerMenu: {
      display: 'block',
      position: 'absolute',
      right: '20px',
      top: '20px',
    },
    
    navLinks: {
      display: 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '60px',
      right: '0',
      backgroundColor: '#fff',
      width: '200px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      borderRadius: '4px',
    },
    
    navLinksActive: {
      display: 'flex',
    }
  },

  '@media screen and (max-width: 480px)': {
    navbar: {
      padding: '0.5rem',
    },
    
    navLinks: {
      width: '100%',
      top: '50px',
    }
  }
};

export default function TDCOffers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="py-20 bg-[#fcfcf8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#333333] mb-4">
            What TDC offers you?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive learning solutions designed to accelerate your tech career
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {offerItems.map((item, index) => (
              <motion.div
                key={index}
                className={`${item.bgColor} rounded-xl p-6 hover:shadow-lg transition-shadow duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`${item.iconColor} mb-4`}>
                  <item.icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <Link
                  to="#"
                  className="inline-flex items-center text-[#333333] font-medium hover:gap-2 transition-all duration-300"
                >
                  Explore More 
                  <span className="ml-2">→</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:block">
            <img
              src="https://res.cloudinary.com/dqt4zammn/image/upload/v1735478059/TDCoffers_s7c0vs.jpg"
              alt="Student with Laptop"
              className="rounded-2xl w-full object-cover h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}