import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';

const Feedback = () => {
  const { candidateName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    candidateName: decodeURIComponent(candidateName),
    position: 'Software Engineer',
    recruiter: 'Jinay Mehta',
    score: 92,
    status: 'Selected',
    feedback: {
      technicalSkills: {
        score: 90,
        comments: 'Strong programming fundamentals and problem-solving abilities. Proficient in multiple programming languages and frameworks.',
        strengths: ['Algorithm Design', 'System Architecture', 'Clean Code Practices'],
        areasOfImprovement: ['Cloud Technologies', 'DevOps Practices']
      },
      softSkills: {
        score: 85,
        comments: 'Excellent communication skills and team collaboration. Shows leadership potential.',
        strengths: ['Communication', 'Team Collaboration', 'Problem Solving'],
        areasOfImprovement: ['Public Speaking', 'Conflict Resolution']
      },
      experience: {
        score: 88,
        comments: 'Relevant industry experience with notable projects and achievements.',
        keyProjects: [
          'E-commerce Platform Development',
          'AI-based Recommendation System',
          'Cloud Migration Project'
        ]
      }
    }
  });

  useEffect(() => {
    // Simulate API call to fetch feedback data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [candidateName]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-700';
    if (score >= 70) return 'text-blue-700';
    if (score >= 50) return 'text-yellow-700';
    return 'text-red-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001F3F]">
        <HiringManagerNavbar />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A2E8DD]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <HiringManagerNavbar />
      
      <div className="px-36 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Candidate Feedback</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#A2E8DD] text-[#001F3F] rounded-lg hover:bg-[#8CD3C7] transition-colors"
          >
            Back
          </button>
        </div>

        {/* Candidate Overview */}
        <div className="bg-gray-300/80 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Candidate Name</h3>
              <p className="text-lg font-semibold text-[#008B8B]">{feedback.candidateName}</p>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Position</h3>
              <p className="text-lg font-semibold text-[#008B8B]">{feedback.position}</p>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Recruiter</h3>
              <p className="text-lg font-semibold text-[#008B8B]">{feedback.recruiter}</p>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Overall Score</h3>
              <p className={`text-lg font-semibold ${getScoreColor(feedback.score)}`}>
                {feedback.score}%
              </p>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-gray-300/80 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#01295B] mb-4">Technical Skills</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#01295B] font-medium">Score:</span>
              <span className={`font-semibold ${getScoreColor(feedback.feedback.technicalSkills.score)}`}>
                {feedback.feedback.technicalSkills.score}%
              </span>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Comments</h3>
              <p className="text-[#01295B]">{feedback.feedback.technicalSkills.comments}</p>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.feedback.technicalSkills.strengths.map((strength, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Areas of Improvement</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.feedback.technicalSkills.areasOfImprovement.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-gray-300/80 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#01295B] mb-4">Soft Skills</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#01295B] font-medium">Score:</span>
              <span className={`font-semibold ${getScoreColor(feedback.feedback.softSkills.score)}`}>
                {feedback.feedback.softSkills.score}%
              </span>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Comments</h3>
              <p className="text-[#01295B]">{feedback.feedback.softSkills.comments}</p>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.feedback.softSkills.strengths.map((strength, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Areas of Improvement</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.feedback.softSkills.areasOfImprovement.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-gray-300/80 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#01295B] mb-4">Experience</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#01295B] font-medium">Score:</span>
              <span className={`font-semibold ${getScoreColor(feedback.feedback.experience.score)}`}>
                {feedback.feedback.experience.score}%
              </span>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Comments</h3>
              <p className="text-[#01295B]">{feedback.feedback.experience.comments}</p>
            </div>
            <div>
              <h3 className="text-[#01295B] font-medium mb-2">Key Projects</h3>
              <div className="space-y-2">
                {feedback.feedback.experience.keyProjects.map((project, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg text-sm font-medium"
                  >
                    {project}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 