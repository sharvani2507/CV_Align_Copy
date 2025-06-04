import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#00000080]">
      <div className="w-10 h-10 bg-[#A2E8DD] cursor-pointer" onClick={() => navigate('/')} />
      <div className="space-x-6 text-white">
        <button onClick={() => navigate('/')} className="bg-[#A2E8DD] text-[#001F3F] px-6 py-2 rounded-[15px] font-semibold hover:bg-opacity-90 transition-all">HOME</button>
        <button onClick={() => navigate('/signin')} className="border-2 border-[#A2E8DD] text-[#A2E8DD] px-6 py-2 rounded-[15px] hover:bg-[#A2E8DD] hover:text-[#001F3F] transition-all">SIGN IN</button>
        <button onClick={() => navigate('/signup')} className="border-2 border-[#A2E8DD] text-[#A2E8DD] px-6 py-2 rounded-[15px] hover:bg-[#A2E8DD] hover:text-[#001F3F] transition-all">SIGN UP</button>
      </div>
    </nav>
  );
}

export default Navbar;
