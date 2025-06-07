import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState({});
  const [showUrlPopup, setShowUrlPopup] = useState(false);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!companyName.trim()) newErrors.companyName = "This field cannot be empty";
    if (!description.trim()) newErrors.description = "This field cannot be empty";
    if (!companyWebsite.trim()) {
      newErrors.companyWebsite = "Please enter company website";
      setShowUrlPopup(true);
      setTimeout(() => setShowUrlPopup(false), 3000); // Hide popup after 3 seconds
    } else if (!validateUrl(companyWebsite)) {
      newErrors.companyWebsite = "Please enter a valid URL (e.g., https://example.com)";
      setShowUrlPopup(true);
      setTimeout(() => setShowUrlPopup(false), 3000);
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Here you would typically make an API call to register the company
        // For now, we'll simulate it with a mock company code
        const mockCompanyCode = "12 dfvib"; // This should come from your API
        
        // Navigate to the company code page with the code
        navigate('/company-code', { state: { companyCode: mockCompanyCode } });
      } catch (error) {
        console.error('Error registering company:', error);
        // Handle error appropriately
      }
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#000B18] to-[#001F3F] overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-[420px] h-[480px] bg-[#BFC8C8] rounded-[30px]" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center px-28 relative h-full py-8">
        {/* Logo and Square */}
        <div className="absolute top-6 right-8 px-36 flex items-center gap-2">
          <Link to="/" className="text-white text-2xl">CV ALIGN</Link>
          <div className="w-[35px] h-[35px] bg-white rounded" />
        </div>
        <div className="max-w-[460px]">
          <h1 className="text-[#A2E8DD] text-4xl font-bold mb-6">Hello!</h1>
          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-[#A2E8DD] mb-3">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-[45px] bg-transparent border-2 border-[#ffffff] rounded-[15px] py-2 px-6 text-[white] focus:outline-none focus:border-[#7FFFD4]"
              />
              {errors.companyName && (
                <p className="text-[#FFAB00] text-sm mt-2">{errors.companyName}</p>
              )}
            </div>
            <div>
              <label className="block text-[#A2E8DD] mb-3">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[80px] bg-transparent border-2 border-white rounded-[15px] py-3 px-6 text-[white] focus:outline-none focus:border-[#7FFFD4] resize-none"
              />
              {errors.description && (
                <p className="text-[#FFAB00] text-sm mt-2">{errors.description}</p>
              )}
            </div>
            <div>
              <label className="block text-[#A2E8DD] mb-3">Company website</label>
              <input
                type="url"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                className="w-full h-[45px] bg-transparent border-2 border-white rounded-[15px] py-3 px-6 text-[white] focus:outline-none focus:border-[#7FFFD4]"
                placeholder="https://example.com"
              />
              {errors.companyWebsite && (
                <p className="text-[#FFAB00] text-sm mt-2">{errors.companyWebsite}</p>
              )}
            </div>
            <button 
              type="submit"
              className="w-full h-[60px] bg-[#A2E8DD] text-[#000913] font-medium text-lg rounded-[15px] hover:bg-opacity-90 transition-all mt-12"
            >
              CREATE COMPANY CODE
            </button>
          </form>
        </div>
      </div>

      {/* URL Popup */}
      {showUrlPopup && (
        <div className="fixed top-4 right-4 bg-[#FFAB00] text-white px-6 py-4 rounded-lg shadow-lg transition-opacity duration-300 z-50">
          <p className="font-medium">{errors.companyWebsite}</p>
        </div>
      )}
    </div>
  );
}

export default RegisterCompany;
