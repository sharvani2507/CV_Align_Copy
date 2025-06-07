import { useState } from 'react';
import { Link } from 'react-router-dom';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';

function HiringManagerDashboard() {
  const [managerName] = useState("Manager's Name");
  
  // Mock data for the dashboard
  const metrics = {
    mostAppliedRole: "Software Engineer",
    avgFitScore: "87%",
    totalCandidates: "1,864",
    topSkills: ["Python", "Javascript", "React"],
    lowestShortlisting: "Data Analyst"
  };

  const [candidates, setCandidates] = useState([
    { 
      id: 1,
      name: "Vaishnavi", 
      role: "SWE Intern", 
      score: "88", 
      recruiter: "Jinay Mehta",
      recruiterStatus: "Selected",
      status: "Pending",
      isShortlisted: false
    },
    { 
      id: 2,
      name: "Vaishnavi", 
      role: "Data Analyst", 
      score: "65", 
      recruiter: "Jinay Mehta",
      recruiterStatus: "Selected",
      status: "Pending",
      isShortlisted: false
    },
    { 
      id: 3,
      name: "Vaishnavi", 
      role: "Software Developer", 
      score: "89", 
      recruiter: "Jinay Mehta",
      recruiterStatus: "Rejected",
      status: "Rejected",
      isShortlisted: false
    },
    { 
      id: 4,
      name: "Vaishnavi", 
      role: "SWE Intern", 
      score: "85", 
      recruiter: "Jinay Mehta",
      recruiterStatus: "Selected",
      status: "Shortlisted",
      isShortlisted: true
    }
  ]);

  const handleShortlist = (candidateId) => {
    setCandidates(candidates.map(candidate => {
      if (candidate.id === candidateId) {
        return {
          ...candidate,
          status: "Shortlisted",
          isShortlisted: true
        };
      }
      return candidate;
    }));
  };

  const handleReject = (candidateId) => {
    setCandidates(candidates.map(candidate => {
      if (candidate.id === candidateId) {
        return {
          ...candidate,
          status: "Rejected",
          isShortlisted: false
        };
      }
      return candidate;
    }));
  };

  const jobRoles = [
    { title: "Senior Software Developer", applications: 150, shortlisted: 10 },
    { title: "Data Analyst", applications: 50, shortlisted: 1 },
    { title: "Software Engineer", applications: 250, shortlisted: 15 }
  ];

  const recruiters = [
    { name: "Jinay Mehta", uploadedCVs: 150, selected: 10, accuracy: "67%" },
    { name: "Jinay Mehta", uploadedCVs: 150, selected: 10, accuracy: "67%" }
  ];

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <HiringManagerNavbar />
      
      <main className="px-36 py-8">
        {/* Welcome Section */}
        <h1 className="text-4xl font-bold text-white mb-8">
          Hello, {managerName}!
        </h1>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {/* Most Applied Role */}
          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">MOST APPLIED ROLE</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.mostAppliedRole}</p>
          </div>

          {/* Average Fit Score */}
          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">AVG. FIT SCORE</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.avgFitScore}</p>
          </div>

          {/* Total Candidates */}
          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">TOTAL CANDIDATES (MONTH)</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.totalCandidates}</p>
          </div>

          {/* Top Skills */}
          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">TOP SKILLS</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.topSkills.join(", ")}</p>
          </div>

          {/* Lowest Shortlistings */}
          <div className="bg-gray-300/80 rounded-lg p-6">
            <h2 className="text-[#01295B] font-bold mb-4">LOWEST SHORTLISTINGS</h2>
            <p className="text-[#008B8B] text-xl font-medium">{metrics.lowestShortlisting}</p>
          </div>
        </div>

        {/* Candidate Summary Section */}
        <div className="bg-gray-300/80 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#01295B] mb-6">CANDIDATE SUMMARY</h2>
          
          <div className="bg-gray-100/90 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Role Applied for</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Score</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Recruiter</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Recruiter Decision</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">View Feedback</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-200/50 transition-colors">
                    <td className="py-3 px-4 text-[#01295B] font-semibold">{candidate.name}</td>
                    <td className="py-3 px-4 text-[#01295B]">{candidate.role}</td>
                    <td className="py-3 px-4 text-[#01295B]">{candidate.score}</td>
                    <td className="py-3 px-4 text-[#01295B]">{candidate.recruiter}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        candidate.recruiterStatus === "Selected" 
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}>
                        {candidate.recruiterStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        candidate.status === "Shortlisted"
                          ? "bg-blue-200 text-blue-800"
                          : candidate.status === "Rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link 
                        to={`/hiring-manager/feedback/${candidate.id}`}
                        className="text-[#01295B] hover:underline hover:font-semibold"
                      >
                        View Feedback
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        {candidate.recruiterStatus === "Selected" && !candidate.isShortlisted && candidate.status !== "Rejected" && (
                          <button
                            onClick={() => handleShortlist(candidate.id)}
                            className="px-4 py-1 rounded-full text-sm font-medium bg-[#008B8B] text-white hover:bg-[#007a7a] transition-colors"
                          >
                            Shortlist
                          </button>
                        )}
                        {!candidate.isShortlisted && candidate.status !== "Rejected" && (
                          <button
                            onClick={() => handleReject(candidate.id)}
                            className="px-4 py-1 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link to="/hiring-manager/final-listing" className="text-[#008B8B] hover:underline hover:font-semibold">
              View Shortlisted Candidates
            </Link>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Recruiter Team Overview */}
          <div className="bg-gray-300/80 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#01295B]">RECRUITER TEAM OVERVIEW</h2>
              <Link to="/hiring-manager/manage/recruiters" className="text-[#008B8B] hover:underline hover:font-semibold">View All</Link>
            </div>
            <div className="space-y-4">
              {recruiters.map((recruiter, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-[#01295B]">{recruiter.name}</h3>
                      <div className="flex gap-6 mt-2 text-sm text-gray-600">
                        <span>Uploaded CVs: {recruiter.uploadedCVs}</span>
                        <span>Selected: {recruiter.selected}</span>
                        <span>Accuracy: {recruiter.accuracy}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-[#008B8B]">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[#008B8B]">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-500">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Roles Section */}
          <div className="bg-gray-300/80 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#01295B]">JOB ROLES</h2>
              <div className="flex gap-4">
                <Link to="/hiring-manager/manage/job-roles" className="text-[#008B8B] hover:underline hover:font-semibold">View All</Link>
              </div>
            </div>
            <div className="space-y-4">
              {jobRoles.map((job, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-[#01295B]">{job.title}</h3>
                      <div className="flex gap-6 mt-2 text-sm text-gray-600">
                        <span>Applications: {job.applications}</span>
                        <span>Shortlisted: {job.shortlisted}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-[#008B8B]">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[#008B8B]">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-500">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HiringManagerDashboard; 