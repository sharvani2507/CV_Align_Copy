import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    if (!validateUrl(companyWebsite)) {
      newErrors.companyWebsite = "Please enter a valid URL ";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/company/register', {
          name: companyName.trim(),
          description: description.trim(),
          website: companyWebsite.trim()
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false
        });
        
        // Navigate to the company code page with the code from the response
        navigate('/company-code', { state: { companyCode: response.data.code } });
      } catch (error) {
        console.error('Error registering company:', error);
        setErrors({
          submit: error.response?.data?.detail || 'Failed to register company. Please try again.'
        });
      } finally {
        setIsLoading(false);
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
              disabled={isLoading}
              className="w-full h-[60px] bg-[#A2E8DD] text-[#000913] font-medium text-lg rounded-[15px] hover:bg-opacity-90 transition-all mt-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "CREATING..." : "CREATE COMPANY CODE"}
            </button>
            {errors.submit && (
              <p className="text-[#FFAB00] text-sm mt-2 text-center">{errors.submit}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterCompany;
