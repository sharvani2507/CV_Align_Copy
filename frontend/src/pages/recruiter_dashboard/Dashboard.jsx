import { useState } from 'react';
import RecruiterNavbar from '../../components/RecruiterNavbar';
import { Link } from 'react-router-dom';

function RecruiterDashboard() {
  const [recruiterName] = useState("Recruiter's Name");
  
  // Mock data for the dashboard
  const metrics = {
    mostAppliedRole: 'Software Engineer',
    avgFitScore: 89,
    totalCVs: 523,
    rejected: 10,
    shortlisted: 25
  };

  // Mock data for candidate summary
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Vaishnavi',
      role: 'SWE Intern',
      score: 88,
      strengths: 'YZ',
      feedback: 'Feedback',
      isSelected: false,
      isRejected: false
    },
    {
      id: 2,
      name: 'Vaishnavi',
      role: 'Data Analyst',
      score: 65,
      strengths: 'xy',
      feedback: 'Feedback',
      isSelected: false,
      isRejected: false
    },
    {
      id: 3,
      name: 'Vaishnavi',
      role: 'Software Developer',
      score: 89,
      strengths: 'xy',
      feedback: 'Feedback',
      isSelected: false,
      isRejected: false
    },
    {
      id: 4,
      name: 'Vaishnavi',
      role: 'SWE Intern',
      score: 85,
      strengths: 'xy',
      feedback: 'Feedback',
      isSelected: false,
      isRejected: false
    }
  ]);

  const handleSelect = async (id) => {
    try {
      // TODO: Add API call to update candidate status
      setCandidates(prevData =>
        prevData.map(candidate =>
          candidate.id === id
            ? { 
                ...candidate, 
                isSelected: !candidate.isSelected, // Toggle selection
                isRejected: false // Clear rejection if selecting
              }
            : candidate
        )
      );
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      // TODO: Add API call to update candidate status
      setCandidates(prevData =>
        prevData.map(candidate =>
          candidate.id === id
            ? { 
                ...candidate, 
                isRejected: !candidate.isRejected, // Toggle rejection
                isSelected: false // Clear selection if rejecting
              }
            : candidate
        )
      );
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <RecruiterNavbar />
      
      <main className="px-36 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Hello, {recruiterName}!
          </h1>
          <Link 
            to="/recruiter/upload-cv"
            className="bg-[#A2E8DD] text-[#01295B] px-6 py-2 rounded-lg font-medium hover:bg-[#8CD3C7] transition-colors"
          >
            UPLOAD NEW CV
          </Link>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">MOST APPLIED ROLE</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.mostAppliedRole}</p>
          </div>

          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">AVG. FIT SCORE</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.avgFitScore}%</p>
          </div>

          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">TOTAL CVs UPLOADED</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.totalCVs}</p>
          </div>

          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4"># REJECTED</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.rejected}</p>
          </div>

          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4"># SHORTLISTED</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.shortlisted}</p>
          </div>
        </div>

        {/* Candidate Summary */}
        <div className="bg-gray-300/80 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#01295B] mb-6">CANDIDATE SUMMARY</h2>
          
          <div className="bg-gray-100/90 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Role Applied for</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Score</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Strengths</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">View Feedback</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-200/50 transition-colors">
                    <td className="py-3 px-4 text-[#01295B] font-semibold">{candidate.name}</td>
                    <td className="py-3 px-4 text-[#01295B]">{candidate.role}</td>
                    <td className="py-3 px-4 text-[#01295B] font-semibold">{candidate.score}</td>
                    <td className="py-3 px-4 text-[#01295B]">{candidate.strengths}</td>
                    <td className="py-3 px-4">
                      <Link 
                        to={`/recruiter/feedback/${candidate.id}`}
                        className="text-[#01295B] hover:underline hover:font-semibold"
                      >
                        View Feedback
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleSelect(candidate.id)}
                          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                            candidate.isSelected
                              ? 'bg-green-200 text-green-800'
                              : 'bg-[#008B8B] text-white hover:bg-[#007a7a]'
                          }`}
                        >
                          {candidate.isSelected ? 'Selected' : 'Select'}
                        </button>
                        <button
                          onClick={() => handleReject(candidate.id)}
                          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                            candidate.isRejected
                              ? 'bg-red-200 text-red-800'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          {candidate.isRejected ? 'Rejected' : 'Reject'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <Link 
              to="/recruiter/manage/candidates"
              className="text-[#01295B] hover:underline font-medium"
            >
              View All Candidates
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard; 