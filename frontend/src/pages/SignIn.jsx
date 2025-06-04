import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your signin logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#000B18] to-[#001F3F] overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-[420px] h-[480px] bg-[#BFC8C8] rounded-[30px]" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center px-16 relative h-full py-8">
        {/* Logo and Square */}
        <div className="absolute top-6 right-8 flex items-center gap-2">
          <Link to="/" className="text-white text-xl">CV ALIGN</Link>
          <div className="w-[30px] h-[30px] bg-white rounded" />
        </div>

        {/* Form */}
        <div className="w-full max-w-[460px]">
          <h1 className="text-[#A2E8DD] text-4xl font-bold mb-6">Welcome!</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-[#A2E8DD] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[45px] bg-transparent border-2 border-[#ffffff] rounded-[15px] py-2 px-6 text-white focus:outline-none focus:border-[#7FFFD4]"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#A2E8DD] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[45px] bg-transparent border-2 border-[#ffffff] rounded-[15px] py-2 px-6 text-white focus:outline-none focus:border-[#7FFFD4]"
                required
              />
            </div>
            <div>
              <label htmlFor="companyCode" className="block text-[#A2E8DD] mb-2">
                Company Code
              </label>
              <input
                type="text"
                id="companyCode"
                name="companyCode"
                value={formData.companyCode}
                onChange={handleChange}
                className="w-full h-[45px] bg-transparent border-2 border-[#ffffff] rounded-[15px] py-2 px-6 text-white focus:outline-none focus:border-[#7FFFD4]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full h-[50px] bg-[#A2E8DD] text-[#001F3F] font-semibold text-lg rounded-[15px] hover:bg-opacity-90 transition-all mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
