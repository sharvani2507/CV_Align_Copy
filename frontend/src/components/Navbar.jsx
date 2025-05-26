function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#00000080]">
      <div className="w-10 h-10 bg-teal-600" />
      <div className="space-x-4 text-white">
        <button className="bg-white text-black px-4 py-1 rounded-full">HOME</button>
        <button className="hover:underline">SIGN IN</button>
        <button className="hover:underline">SIGN UP</button>
      </div>
    </nav>
  );
}

export default Navbar;
