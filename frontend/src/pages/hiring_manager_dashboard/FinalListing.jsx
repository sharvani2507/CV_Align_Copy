import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';

function FinalListing() {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([
    { 
      id: 1,
      name: "Vaishnavi", 
      role: "SWE Intern", 
      score: "88", 
      recruiter: "Jinay Mehta",
      recruiterStatus: "Selected",
      status: "Shortlisted"
    },
    { 
      id: 4,
      name: "Vaishnavi", 
      role: "SWE Intern", 
      score: "85", 
      recruiter: "Jinay Mehta",
      recruiterStatus: "Selected",
      status: "Shortlisted"
    }
  ]);

  const [sorting, setSorting] = useState({
    field: null,
    direction: 'asc'
  });

  const handleSort = (field) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIndicator = ({ column }) => {
    if (sorting.field !== column) {
      return <span className="ml-1 text-gray-400">↕</span>;
    }
    return <span className="ml-1">{sorting.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  const sortedCandidates = useMemo(() => {
    if (!sorting.field) return shortlistedCandidates;

    return [...shortlistedCandidates].sort((a, b) => {
      let aValue = a[sorting.field];
      let bValue = b[sorting.field];

      // Convert score to number for proper numeric sorting
      if (sorting.field === 'score') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (aValue < bValue) return sorting.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sorting.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [shortlistedCandidates, sorting]);

  const handleRemoveFromShortlist = (candidateId) => {
    setShortlistedCandidates(candidates => 
      candidates.filter(candidate => candidate.id !== candidateId)
    );
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <HiringManagerNavbar />
      
      <main className="px-36 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Shortlisted Candidates</h1>

        <div className="bg-gray-300/80 rounded-lg p-6 mb-8">
          <div className="bg-gray-100/90 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th 
                    className="text-left py-3 px-4 text-[#008B8B] font-medium cursor-pointer hover:text-[#006d6d]"
                    onClick={() => handleSort('name')}
                  >
                    Name <SortIndicator column="name" />
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-[#008B8B] font-medium cursor-pointer hover:text-[#006d6d]"
                    onClick={() => handleSort('role')}
                  >
                    Role Applied for <SortIndicator column="role" />
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-[#008B8B] font-medium cursor-pointer hover:text-[#006d6d]"
                    onClick={() => handleSort('score')}
                  >
                    Score <SortIndicator column="score" />
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-[#008B8B] font-medium cursor-pointer hover:text-[#006d6d]"
                    onClick={() => handleSort('recruiter')}
                  >
                    Recruiter <SortIndicator column="recruiter" />
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-[#008B8B] font-medium cursor-pointer hover:text-[#006d6d]"
                    onClick={() => handleSort('recruiterStatus')}
                  >
                    Recruiter Decision <SortIndicator column="recruiterStatus" />
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-[#008B8B] font-medium cursor-pointer hover:text-[#006d6d]"
                    onClick={() => handleSort('status')}
                  >
                    Status <SortIndicator column="status" />
                  </th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">View Feedback</th>
                  <th className="text-left py-3 px-4 text-[#008B8B] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCandidates.map((candidate, index) => (
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
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
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
                        <button
                          onClick={() => handleRemoveFromShortlist(candidate.id)}
                          className="px-4 py-1 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FinalListing; 