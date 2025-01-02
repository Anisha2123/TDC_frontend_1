import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaLightbulb, FaUsers, FaRocket, FaEnvelope } from 'react-icons/fa';
import Footer from '../components/Footer';

export default function ContactUs() {
  const whatsappNumber = "9500120298";
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: FaGraduationCap, count: "10,000+", label: "Students Trained" },
    { icon: FaLightbulb, count: "500+", label: "Courses" },
    { icon: FaUsers, count: "50+", label: "Expert Mentors" },
    { icon: FaRocket, count: "95%", label: "Success Rate" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        e.target.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative bg-[#333333] text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 grid grid-cols-6 gap-2 p-2 pointer-events-none"
        >
          {[...Array(24)].map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-lg"></div>
          ))}
        </motion.div>
        
        <div className="relative container mx-auto px-4 py-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-6"
          >
            Let's Connect
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Transform your learning journey with TDC. We're here to guide you every step of the way.
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <stat.icon className="text-4xl text-[#333333] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#333333] mb-2">{stat.count}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Us Section with Enhanced Design */}
      <motion.div 
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container mx-auto px-4 py-16 bg-gradient-to-r from-gray-50 to-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#333333]">
            About <span className="text-indigo-600">TDC</span>
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-shadow duration-300">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose max-w-none"
            >
              <p className="text-[#333333] text-lg leading-relaxed mb-8">
                TDC is an IIT-M & IIM-A Incubated Ed-tech company that focuses on providing personalized learning solutions for its learners. Our mission is to make quality education accessible to everyone through innovative technology and expert guidance.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="text-xl font-semibold mb-4 text-[#333333]">Our Vision</h3>
                  <p className="text-[#333333]">
                    To revolutionize education through technology and make quality learning accessible to all.
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="text-xl font-semibold mb-4 text-[#333333]">Our Values</h3>
                  <p className="text-[#333333]">
                    Innovation, Excellence, Accessibility, and Student Success drive everything we do.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* YouTube Video Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#333333]">
            Watch Our Introduction
          </h2>
          <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-xl">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/UjxTZJ6UaLY"
              title="TDC Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#333333]">
            Send Us a Message
          </h2>
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#333333] focus:border-transparent transition-all duration-300"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#333333] focus:border-transparent transition-all duration-300"
                  placeholder="john@example.com"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#333333] focus:border-transparent transition-all duration-300"
                placeholder="How can we help you?"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#333333] focus:border-transparent transition-all duration-300"
                placeholder="Your message here..."
              ></textarea>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-end"
            >
              <button
                type="submit"
                className="px-6 py-3 bg-[#333333] text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <FaEnvelope className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>

      {/* Contact Information with Enhanced Layout */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3325752387747!2d80.24107597515626!3d13.010590787308604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526787e5aec557%3A0x3c1cd354b839e1ea!2sIITM%20Research%20Park!5e0!3m2!1sen!2sin!4v1709825431037!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            ></iframe>
          </motion.div>

          {/* Contact Details with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold mb-8 text-[#333333] border-b pb-4">Get in Touch</h3>
              
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <FaMapMarkerAlt className="text-[#333333] text-3xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#333333] text-lg">Address</h4>
                    <p className="text-[#333333] mt-2">
                      IITM Research Park, Taramani,<br />
                      Chennai, Tamil Nadu 600113<br />
                      India
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <FaPhone className="text-[#333333] text-3xl" />
                  <div>
                    <h4 className="font-semibold text-[#333333] text-lg">Phone</h4>
                    <p className="text-[#333333] mt-2">+91 950 0120 298</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <FaWhatsapp className="text-[#333333] text-3xl" />
                  <div>
                    <h4 className="font-semibold text-[#333333] text-lg">WhatsApp</h4>
                    <p className="text-[#333333] mt-2">+91 {whatsappNumber}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button with Enhanced Animation */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 cursor-pointer hover:bg-green-600 transition-colors duration-300"
      >
        <FaWhatsapp className="text-3xl" />
      </motion.button>

      <Footer />
    </div>
  );
}