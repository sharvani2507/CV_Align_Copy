import { useState } from 'react';
import RecruiterNavbar from '../../components/RecruiterNavbar';

function ViewFeedback() {
  // Mock feedback data - replace with actual API call later
  const [feedback] = useState({
    candidateName: "John Smith",
    appliedFor: "Software Developer II",
    score: "85%",
    recentExperience: "Interned at Barclays",
    education: "B.Tech in CSE, IITG",
    strengths: [
      "Strength 1",
      "Strength 2",
      "Strength 3"
    ],
    weaknesses: [
      "Weakness 1",
      "Weakness 2",
      "Weakness 3"
    ],
    summaryPoints: [
      "One liner feedback, summary type here",
      "One liner feedback, summary type here",
      "One liner feedback, summary type here",
      "One liner feedback, summary type here",
      "One liner feedback, summary type here"
    ],
    detailedFeedback: "Detailed analysis of the candidate's performance, skills, and potential fit for the role..."
  });

  const [status, setStatus] = useState('pending'); // 'pending', 'selected', 'rejected'

  const handleSelect = () => {
    setStatus(status === 'selected' ? 'pending' : 'selected');
  };

  const handleReject = () => {
    setStatus(status === 'rejected' ? 'pending' : 'rejected');
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <RecruiterNavbar />
      
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
}

export default ViewFeedback; 