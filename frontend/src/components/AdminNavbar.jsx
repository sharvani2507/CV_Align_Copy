import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DashboardNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isManageOpen, setIsManageOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-36 py-4 bg-[#000913] backdrop-blur-md">
      {/* Logo */}
      <div 
        className="cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 bg-[#A2E8DD] rounded-lg flex items-center justify-center">
          {/* Replace with your actual logo */}
          <span className="text-[#001F3F] font-bold text-xl">CV</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <button 
          onClick={() => navigate('/admin/dashboard')} 
          className={`${
            isActive('/admin/dashboard')
              ? 'bg-[#A2E8DD] text-[#001F3F]'
              : 'border-2 border-[#A2E8DD] text-[#A2E8DD] hover:bg-[#A2E8DD] hover:text-[#001F3F]'
          } px-6 py-2 rounded-[15px] font-semibold transition-all`}
        >
          DASHBOARD
        </button>

        {/* Manage Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsManageOpen(!isManageOpen)}
            onBlur={() => setTimeout(() => setIsManageOpen(false), 200)}
            className={`${
              isActive('/admin/manage/users') || isActive('/admin/manage/cvs')
                ? 'bg-[#A2E8DD] text-[#001F3F]'
                : 'border-2 border-[#A2E8DD] text-[#A2E8DD] hover:bg-[#A2E8DD] hover:text-[#001F3F]'
            } px-6 py-2 rounded-[15px] transition-all flex items-center space-x-2`}
          >
            <span>MANAGE</span>
            <svg 
              className={`w-4 h-4 transition-transform ${isManageOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isManageOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#001F3F] border border-[#A2E8DD] rounded-[15px] shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  navigate('/admin/manage/users');
                  setIsManageOpen(false);
                }}
                className={`block w-full text-left px-6 py-2 ${
                  isActive('/admin/manage/users')
                    ? 'bg-[#A2E8DD] text-[#001F3F]'
                    : 'text-[#A2E8DD] hover:bg-[#A2E8DD] hover:text-[#001F3F]'
                } transition-all`}
              >
                USERS
              </button>
              <button
                onClick={() => {
                  navigate('/admin/manage/cvs');
                  setIsManageOpen(false);
                }}
                className={`block w-full text-left px-6 py-2 ${
                  isActive('/admin/manage/cvs')
                    ? 'bg-[#A2E8DD] text-[#001F3F]'
                    : 'text-[#A2E8DD] hover:bg-[#A2E8DD] hover:text-[#001F3F]'
                } transition-all`}
              >
                CVs
              </button>
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={() => navigate('/')} 
          className="border-2 border-red-600 text-red-600 px-6 py-2 rounded-[15px] hover:bg-red-600 hover:text-white transition-all"
        >
          SIGN OUT
        </button>
      </div>
    </nav>
  );
}

export default DashboardNavbar; 