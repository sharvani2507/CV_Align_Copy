import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import RecruiterNavbar from '../../components/RecruiterNavbar';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';

const Feedback = () => {
  const { candidateName } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('pending'); // 'pending', 'selected', 'rejected'

  // Determine which navbar to show based on the current path
  const getNavbar = () => {
    if (location.pathname.includes('/admin')) {
      return <AdminNavbar />;
    } else if (location.pathname.includes('/recruiter')) {
      return <RecruiterNavbar />;
    } else if (location.pathname.includes('/hiring-manager')) {
      return <HiringManagerNavbar />;
    }
    return null;
  };

  const [feedback] = useState({
    candidateName: decodeURIComponent(candidateName),
    appliedFor: "Software Developer II",
    score: "92%",
    recentExperience: "Senior Software Engineer at Google",
    education: "M.Tech in CSE, IIT Bombay",
    strengths: [
      "Strong programming fundamentals",
      "Excellent system design skills",
      "Great problem-solving ability"
    ],
    weaknesses: [
      "Limited cloud experience",
      "Could improve on documentation",
      "Needs more team lead experience"
    ],
    summaryPoints: [
      "Demonstrated exceptional coding skills during technical assessment",
      "Shows strong understanding of software architecture principles",
      "Great communication skills and team collaboration abilities",
      "Brings valuable experience from previous roles",
      "Strong potential for growth and leadership"
    ],
    detailedFeedback: "The candidate showcased exceptional technical prowess during the assessment. Their approach to problem-solving was methodical and efficient. They demonstrated a deep understanding of software development principles and best practices. Communication skills were excellent, articulating complex technical concepts clearly. Previous experience aligns well with our requirements, and they show strong potential for growth within the organization."
  });

  useEffect(() => {
    // Simulate API call to fetch feedback data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [candidateName]);

  const handleSelect = () => {
    setStatus(status === 'selected' ? 'pending' : 'selected');
  };

  const handleReject = () => {
    setStatus(status === 'rejected' ? 'pending' : 'rejected');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001F3F]">
        {getNavbar()}
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A2E8DD]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001F3F]">
      {getNavbar()}
      
      <main className="px-36 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="col-span-5">
            {/* Candidate Name and Status */}
            <div className="flex items-center gap-4 mb-8">
              <h1 className="text-4xl font-bold text-white">
                {feedback.candidateName}
              </h1>
              {status !== 'pending' && (
                <div className={`inline-block rounded-full px-4 py-2 text-sm font-bold uppercase ${
                  status === 'selected' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500' 
                    : 'bg-red-500/20 text-red-400 border border-red-500'
                }`}>
                  {status === 'selected' ? 'Selected' : 'Rejected'}
                </div>
              )}
            </div>

            {/* Basic Info Card */}
            <div className="bg-gray-200/70 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg text-[#007180] font-medium mb-1">Applied For:</h3>
                  <p className="text-[#01295B] font-roboto font-semibold">{feedback.appliedFor}</p>
                  
                  <h3 className="text-lg text-[#007180] font-medium mb-1 mt-4">Recent Experience:</h3>
                  <p className="text-[#01295B] font-roboto font-semibold">{feedback.recentExperience}</p>
                </div>
                <div>
                  <h3 className="text-lg text-[#007180] font-medium mb-1">Score:</h3>
                  <p className="text-[#01295B] font-roboto font-semibold">{feedback.score}</p>
                  
                  <h3 className="text-lg text-[#007180] font-medium mb-1 mt-4">Education:</h3>
                  <p className="text-[#01295B] font-roboto font-semibold">{feedback.education}</p>
                </div>
              </div>
            </div>

            {/* Summary Points */}
            <div className="mb-8">
              {feedback.summaryPoints.map((point, index) => (
                <p key={index} className="text-white mb-3 opacity-90">
                  {point}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            {(location.pathname.includes('/recruiter') || location.pathname.includes('/hiring-manager')) && (
              <div className="flex gap-4">
                <button
                  onClick={handleSelect}
                  className={`px-12 py-3 rounded-lg font-bold text-lg uppercase transition-all duration-200 ${
                    status === 'selected'
                      ? 'bg-green-500/20 text-green-400 border-2 border-green-500'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {status === 'selected' ? 'Selected' : 'Select'}
                </button>
                <button
                  onClick={handleReject}
                  className={`px-12 py-3 rounded-lg font-bold text-lg uppercase transition-all duration-200 ${
                    status === 'rejected'
                      ? 'bg-red-500/20 text-red-400 border-2 border-red-500'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {status === 'rejected' ? 'Rejected' : 'Reject'}
                </button>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="col-span-7 py-3">
            {/* Strengths and Weaknesses */}
            <div className="bg-gray-200/70 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2">
                <div className="pr-4">
                  <h2 className="text-2xl font-bold text-white mb-4">Strengths</h2>
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="text-[#01295B] font-roboto font-semibold">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pl-4 border-l border-gray-500">
                  <h2 className="text-2xl font-bold text-white mb-4">Weaknesses</h2>
                  <ul className="space-y-2">
                    {feedback.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-[#01295B] font-roboto font-semibold">
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="bg-gray-200/70 h-[300px] rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Detailed Feedback</h2>
              <p className="text-[#01295B] font-roboto font-semibold leading-relaxed">
                {feedback.detailedFeedback}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback; 