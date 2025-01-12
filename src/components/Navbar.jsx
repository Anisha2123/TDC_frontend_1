import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../utils/auth';
import './styles.css';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

const NavItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group w-full lg:w-auto">
      <div 
        className="flex items-center justify-between px-4 py-2 text-white hover:text-gray-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {items && (
          <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 lg:group-hover:rotate-180 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </div>
      {items && (
        <div className={`
          lg:absolute lg:left-0 lg:w-48 lg:py-2 lg:bg-[#383838] lg:rounded-md lg:shadow-lg
          lg:group-hover:block
          ${isOpen ? 'block' : 'hidden'}
          w-full bg-[#404040] lg:bg-[#383838]
        `}>
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block px-4 py-2 text-sm text-white hover:bg-[#4a4a4a] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isValidSession = checkTokenExpiration();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navItems = [
    {
      title: 'Courses',
      items: [
        { name: 'Foundation', href: '/courses' },
        { name: 'Web Development', href: '/courses/web-development' },
        { name: 'Data Science', href: '/courses/data-science' },
      ],
    },
    {
      title: 'Skill Development',
      items: [
        { name: 'Upcoming Classes', href: '/live-classes/upcoming' },
        { name: 'Recorded Sessions', href: '/live-classes/recorded' },
      ],
    },
    {
      title: 'Application',
      items: [
        { name: 'Coding Practice', href: '/practice/coding' },
        { name: 'Projects', href: '/practice/projects' },
      ],
    },
    {
      title: 'Opportunities',
      items: [
        { name: 'Blog', href: '/resources/blog' },
        { name: 'Tutorials', href: '/resources/tutorials' },
      ],
    },
    {
      title: 'Plans & Pricing',
      items: [
        { name: 'For Individuals', href: '/solutions/individuals' },
        { name: 'For Companies', href: '/solutions/companies' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  return (
    <nav className="navbar sticky top-0 z-50 w-full bg-[#333333] shadow-md">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        <Link to="/" className="flex items-center gap-5">
          <img 
            src="https://res.cloudinary.com/dqt4zammn/image/upload/v1734429178/api5kfd3wfdkakatqsbn.jpg" 
            alt="TDC Logo" 
            className="h-10 brightness-110 rounded-lg"
          />
        </Link>

        {/* Hamburger Menu Button - Only visible on mobile */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {!isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {/* Navigation Items */}
        <div className={`
          flex items-center space-x-2
          lg:relative lg:flex lg:flex-row
          absolute top-full left-0 right-0
          bg-[#333333] 
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'flex flex-col items-start p-4' : 'hidden lg:flex'}
          lg:bg-transparent lg:p-0
          ${isMobileMenuOpen ? 'border-t border-gray-600' : ''}
        `}>
          {navItems.map((item, index) => (
            <div key={index} className="w-full lg:w-auto">
              <NavItem {...item} />
            </div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className={`
          btn-ls flex items-center gap-4
          lg:relative lg:flex
          ${isMobileMenuOpen ? 'absolute top-full left-0 right-0 p-4 bg-[#333333] border-t border-gray-600' : 'relative'}
          ${isMobileMenuOpen ? 'flex-col items-start' : 'flex-row items-center'}
          lg:flex-row lg:bg-transparent lg:p-0 lg:border-0
        `}>
          {isValidSession && user ? (
            <>
              <span className="text-sm font-medium text-white">
                Welcome, {user.firstName}
              </span>
              <Link to="/profile" className="text-white mr-4">
                <FaUserCircle className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-[#333333] bg-white rounded-md hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-gray-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-[#333333] bg-gradient-to-r from-white to-gray-200 rounded-md hover:from-gray-200 hover:to-white transition-all duration-300 shadow-md"
              >
                Sign up
              </Link>
            </>
          )}
          {isValidSession && user?.isAdmin && (
            <Link
              to="/admin/users"
              className="px-4 py-2 text-sm font-medium text-white hover:text-gray-200 transition-colors"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
