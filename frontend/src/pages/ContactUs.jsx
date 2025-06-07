import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const ContactUs = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    // For now, we'll just redirect to the thank you page
    navigate('/thank-you');
  };

  return (
    <div className="bg-[#041C32] min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-16">
        <div 
          className="max-w-[800px] mx-auto bg-[#004D56] rounded-[25px] p-12"
          style={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)'
          }}
        >
          <h1 className="text-6xl font-bold text-white text-center mb-16">Contact Us</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-white text-xl font-semibold mb-4">NAME</label>
              <input
                type="text"
                className="w-full h-14 bg-[#B4D4D9] bg-opacity-40 rounded-lg px-6 text-[#01295B] font-semibold text-lg focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white text-xl font-semibold mb-4">E-MAIL</label>
              <input
                type="email"
                className="w-full h-14 bg-[#B4D4D9] bg-opacity-40 rounded-lg px-6 text-[#01295B] font-semibold text-lg focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white text-xl font-semibold mb-4">COMPANY</label>
              <input
                type="text"
                className="w-full h-14 bg-[#B4D4D9] bg-opacity-40 rounded-lg px-6 text-[#01295B] font-semibold text-lg focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white text-xl font-semibold mb-4">MESSAGE</label>
              <textarea
                className="w-full h-48 bg-[#B4D4D9] bg-opacity-40 rounded-lg px-6 py-4 text-[#01295B] font-semibold text-lg focus:outline-none resize-none"
                required
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-[#A2E8DD] text-[#004D56] font-semibold text-xl px-12 py-3 rounded-full hover:bg-opacity-90 transition-all"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
