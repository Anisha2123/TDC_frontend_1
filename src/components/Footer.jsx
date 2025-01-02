import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <footer className="bg-[#333333] text-gray-300 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Quick Links */}
          <motion.div {...fadeInUp}>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#ffde58] pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[#ffde58] transition-colors duration-300">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-[#ffde58] transition-colors duration-300">Pricing Detail</Link></li>
              <li><Link to="/privacy" className="hover:text-[#ffde58] transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#ffde58] transition-colors duration-300">Terms and Condition</Link></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#ffde58] pb-2 inline-block">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/webinars" className="hover:text-[#ffde58] transition-colors duration-300">Upcoming Webinar</Link></li>
              <li><Link to="/past-webinars" className="hover:text-[#ffde58] transition-colors duration-300">Past Webinar</Link></li>
              <li><Link to="/docs" className="hover:text-[#ffde58] transition-colors duration-300">Docs</Link></li>
              <li><Link to="/blogs" className="hover:text-[#ffde58] transition-colors duration-300">Blogs</Link></li>
              <li><Link to="/ebooks" className="hover:text-[#ffde58] transition-colors duration-300">Ebooks</Link></li>
            </ul>
          </motion.div>

          {/* Career */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#ffde58] pb-2 inline-block">
              CAREER
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/jobs" className="hover:text-[#ffde58] transition-colors duration-300">Jobs</Link></li>
              <li><Link to="/student-program" className="hover:text-[#ffde58] transition-colors duration-300">Student Program</Link></li>
              <li><Link to="/collaborate" className="hover:text-[#ffde58] transition-colors duration-300">Collaborate</Link></li>
              <li><Link to="/learn-and-earn" className="hover:text-[#ffde58] transition-colors duration-300">Learn and Earn</Link></li>
            </ul>
          </motion.div>

          {/* Subjects */}
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#ffde58] pb-2 inline-block">
              Subjects
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/career-paths" className="hover:text-[#ffde58] transition-colors duration-300">Career Paths</Link></li>
              <li><Link to="/interview-prep" className="hover:text-[#ffde58] transition-colors duration-300">Interview Prep</Link></li>
              <li><Link to="/full-catalog" className="hover:text-[#ffde58] transition-colors duration-300">Full Catalog</Link></li>
              <li><Link to="/roadmap" className="hover:text-[#ffde58] transition-colors duration-300">Roadmap</Link></li>
            </ul>
          </motion.div>

          {/* Community & Contact */}
          <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-[#ffde58] pb-2 inline-block">
              Community
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { icon: <Facebook />, link: "https://facebook.com" },
                { icon: <Twitter />, link: "https://twitter.com" },
                { icon: <Instagram />, link: "https://instagram.com" },
                { icon: <Linkedin />, link: "https://linkedin.com" },
                { icon: <Youtube />, link: "https://youtube.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3, backgroundColor: '#ffde58' }}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700/50 p-2.5 rounded-full hover:text-[#333333] transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="space-y-4 text-sm">
              <motion.div 
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ x: 3 }}
              >
                <Mail className="text-[#ffde58] group-hover:scale-110 transition-transform duration-300" />
                <a href="mailto:media@topdatacoach.com" className="hover:text-[#ffde58] transition-colors duration-300">
                  media@topdatacoach.com
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ x: 3 }}
              >
                <Phone className="text-[#ffde58] group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="hover:text-[#ffde58] transition-colors duration-300">+91 9500125930</p>
                  <p className="hover:text-[#ffde58] transition-colors duration-300">+91 9500120298</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Logo and Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row items-center justify-between"
        >
          <img 
            src="https://res.cloudinary.com/dqt4zammn/image/upload/v1734429178/api5kfd3wfdkakatqsbn.jpg" 
            alt="TDC Logo" 
            className="h-10 mb-4 md:mb-0 brightness-110"
          />
          <p className="text-sm text-gray-400">&copy; 2024 TDC. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

