import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../utils/auth';
import './styles.css';
import { FaUserCircle } from 'react-icons/fa';

const NavItem = ({ title, items }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-1 px-4 py-2 text-white hover:text-gray-200">
        {title}
        {items && <ChevronDown className="w-4 h-4 text-white" />}
      </div>
      {items && (
        <div className="absolute left-0 hidden w-48 py-2 bg-[#383838] rounded-md shadow-lg group-hover:block">
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
        <div className="flex items-center space-x-2">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>

        <div className="btn-ls flex items-center gap-4">
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
