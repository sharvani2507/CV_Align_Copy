import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#041C32] to-[#04293A] min-h-screen text-white">
      <Navbar />

      <div className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold">CV ALIGN</h1>
        <p className="text-teal-300 text-xl mt-4">tagline - one liner on the company</p>
        <p className="text-gray-300 max-w-3xl mx-auto mt-2 leading-relaxed">
          Some descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome descriptionSome description
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
          <FeatureCard title="FEATURE 1" hoverType="color" />
          <div className="mt-16 md:mt-8">
            <FeatureCard title="FEATURE 2" hoverType="opacity" />
          </div>
          <FeatureCard title="FEATURE 3" hoverType="opacity" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button text="GET STARTED" outlined />
          <div onClick={() => navigate('/register-company')}>
            <Button text="REGISTER COMPANY" outlined />
          </div>
          <Button text="CONTACT US" outlined />
        </div>
      </div>
    </div>
  );
}

export default Home;
