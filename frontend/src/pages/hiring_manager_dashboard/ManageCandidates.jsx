import React, { useState, useMemo } from 'react';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      score: 95,
      recruiter: 'Jinay Mehta',
      recruiterStatus: 'Selected',
      status: 'Pending',
      isShortlisted: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Product Manager',
      score: 88,
      recruiter: 'Jinay Mehta',
      recruiterStatus: 'Selected',
      status: 'Shortlisted',
      isShortlisted: true
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'UX Designer',
      score: 92,
      recruiter: 'Jinay Mehta',
      recruiterStatus: 'Selected',
      status: 'Rejected',
      isShortlisted: false
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      position: 'Data Scientist',
      score: 85,
      recruiter: 'Jinay Mehta',
      recruiterStatus: 'Rejected',
      status: 'Rejected',
      isShortlisted: false
    }
  ]);

  const [filters, setFilters] = useState({
    name: '',
    position: '',
    scoreRange: '',
    recruiter: '',
    status: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const isScoreInRange = (score, range) => {
    if (!range) return true;
    const [min, max] = range.split('-').map(Number);
    return score >= min && score <= max;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-700';
    if (score >= 70) return 'text-blue-700';
    if (score >= 50) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-blue-200 text-blue-800';
      case 'Rejected':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-yellow-200 text-yellow-800';
    }
  };

  const getRecruiterStatusColor = (status) => {
    return status === 'Selected' 
      ? 'bg-green-200 text-green-800'
      : 'bg-red-200 text-red-800';
  };

  const handleSort = (key) => {
    setSortConfig(prevSort => ({
      key,
      direction: 
        prevSort.key === key && prevSort.direction === 'asc'
          ? 'desc'
          : 'asc'
    }));
  };

  const SortIndicator = ({ column }) => {
    if (sortConfig.key !== column) {
      return <span className="ml-1 text-gray-400">↕</span>;
    }
    return <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  const handleShortlist = async (id) => {
    try {
      setCandidates(prevData =>
        prevData.map(candidate =>
          candidate.id === id
            ? { ...candidate, status: 'Shortlisted', isShortlisted: true }
            : candidate
        )
      );
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      setCandidates(prevData =>
        prevData.map(candidate =>
          candidate.id === id
            ? { ...candidate, status: 'Rejected', isShortlisted: false }
            : candidate
        )
      );
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  const filteredCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const nameMatch = candidate.name.toLowerCase().includes(filters.name.toLowerCase()) || !filters.name;
      const positionMatch = candidate.position.toLowerCase().includes(filters.position.toLowerCase()) || !filters.position;
      const scoreMatch = isScoreInRange(candidate.score, filters.scoreRange);
      const recruiterMatch = candidate.recruiter.toLowerCase().includes(filters.recruiter.toLowerCase()) || !filters.recruiter;
      const statusMatch = !filters.status || candidate.status.toLowerCase() === filters.status.toLowerCase();

      return nameMatch && positionMatch && scoreMatch && recruiterMatch && statusMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [candidates, filters, sortConfig]);

  const columns = [
    { key: 'serialNo', label: 'S.No', sortable: false },
    { key: 'name', label: 'Candidate Name', sortable: true },
    { key: 'position', label: 'Applied Role', sortable: true },
    { key: 'recruiter', label: 'Recruiter', sortable: true },
    { key: 'score', label: 'Score', sortable: true },
    { key: 'recruiterStatus', label: 'Recruiter Decision', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'feedback', label: 'View Feedback', sortable: false },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <HiringManagerNavbar />
      
      <div className="px-36 py-6">
        <h1 className="text-4xl font-bold text-white mb-8">Manage Candidates</h1>
        
        <div className="bg-gray-300/80 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#01295B] mb-4">Filters:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#01295B] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
                  placeholder="Search by name"
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-[#01295B] mb-1">
                  Applied Role
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
                  placeholder="Search by role"
                  onChange={(e) => handleFilterChange('position', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="recruiter" className="block text-sm font-medium text-[#01295B] mb-1">
                  Recruiter
                </label>
                <input
                  type="text"
                  id="recruiter"
                  name="recruiter"
                  className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
                  placeholder="Search by recruiter"
                  onChange={(e) => handleFilterChange('recruiter', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="scoreRange" className="block text-sm font-medium text-[#01295B] mb-1">
                  Score Range
                </label>
                <select
                  id="scoreRange"
                  name="scoreRange"
                  className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
                  onChange={(e) => handleFilterChange('scoreRange', e.target.value)}
                >
                  <option value="">All Scores</option>
                  <option value="90-100">90-100</option>
                  <option value="80-89">80-89</option>
                  <option value="70-79">70-79</option>
                  <option value="0-69">Below 70</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-[#01295B] mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-400">
                  {columns.map(column => (
                    <th 
                      key={column.key}
                      className={`py-3 px-4 text-left text-[#008B8B] font-medium ${
                        column.sortable ? 'cursor-pointer hover:text-[#006d6d]' : ''
                      }`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center">
                        {column.label}
                        {column.sortable && <SortIndicator column={column.key} />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate, index) => (
                  <tr 
                    key={candidate.id}
                    className="border-b border-gray-300 hover:bg-gray-200/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-[#01295B]">{index + 1}</td>
                    <td className="py-3 px-4 text-[#01295B] font-medium">{candidate.name}</td>
                    <td className="py-3 px-4 text-[#01295B]">{candidate.position}</td>
                    <td className="py-3 px-4 text-[#01295B]">{candidate.recruiter}</td>
                    <td className={`py-3 px-4 font-medium ${getScoreColor(candidate.score)}`}>
                      {candidate.score}%
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecruiterStatusColor(candidate.recruiterStatus)}`}>
                        {candidate.recruiterStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a 
                        href={`/hiring-manager/feedback/${encodeURIComponent(candidate.name)}`}
                        className="text-[#01295B] hover:underline font-medium"
                      >
                        View Feedback
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        {candidate.recruiterStatus === 'Selected' && !candidate.isShortlisted && candidate.status !== 'Rejected' && (
                          <button
                            onClick={() => handleShortlist(candidate.id)}
                            className="px-4 py-1 rounded-full text-sm font-medium bg-[#008B8B] text-white hover:bg-[#007a7a] transition-colors"
                          >
                            Shortlist
                          </button>
                        )}
                        {!candidate.isShortlisted && candidate.status !== 'Rejected' && (
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
        </div>
      </div>
    </div>
  );
};

export default ManageCandidates; 