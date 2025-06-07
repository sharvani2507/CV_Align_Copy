import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] to-[#000C1A] text-white overflow-hidden relative">
      {/* Decorative Ellipses */}
      <div 
        className="absolute w-[886px] h-[839px] left-[-23px] top-[-293px] rounded-full"
        style={{
          background: 'rgba(0, 113, 128, 0.33)',
          border: '1px solid #000000',
          filter: 'blur(300px)',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          zIndex: '0'
        }}
      />
      
      {/* Second Ellipse - Bottom Right */}
      <div 
        className="absolute w-[833px] h-[777px] left-[747px] top-[439px] rounded-full"
        style={{
          background: 'rgba(1, 41, 91, 0.74)',
          border: '1px solid #000000',
          filter: 'blur(300px)',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          zIndex: '0'
        }}
      />

      {/* Content wrapper with relative positioning to stay above the blur */}
      <div className="relative z-10">
        <Navbar />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
  <h1 className="text-[60px] md:text-[px] font-bold italic mb-8 leading-[90px] font-['Open_Sans']">
    Thank You<br/>for<br/>Contacting<br/>Us!
  </h1>
  <p className="text-lg md:text-xl mb-8">
    We have received your message and will get back to you soon.
  </p>

          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 text-lg border-2 border-[#A2E8DD] text-white rounded-full hover:bg-[#A2E8DD] hover:text-[#001F3F] transition-colors duration-300"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 