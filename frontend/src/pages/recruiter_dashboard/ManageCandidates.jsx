import React, { useState, useMemo } from 'react';
import RecruiterNavbar from '../../components/RecruiterNavbar';

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      score: 95,
      ViewFeedback: 'https://view.feedback/1',
      isSelected: false,
      isRejected: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Product Manager',
      score: 88,
      ViewFeedback: 'https://view.feedback/2',
      isSelected: false,
      isRejected: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'UX Designer',
      score: 92,
      ViewFeedback: 'https://view.feedback/3',
      isSelected: true,
      isRejected: false
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      position: 'Data Scientist',
      score: 85,
      ViewFeedback: 'https://view.feedback/4',
      isSelected: false,
      isRejected: true
    }
  ]);

  const [filters, setFilters] = useState({
    name: '',
    position: '',
    scoreRange: '',
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

  const getStatusFromFilters = (candidate) => {
    if (candidate.isSelected) return 'selected';
    if (candidate.isRejected) return 'rejected';
    return 'pending';
  };

  const filteredCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const nameMatch = candidate.name.toLowerCase().includes(filters.name.toLowerCase()) || !filters.name;
      const positionMatch = candidate.position.toLowerCase().includes(filters.position.toLowerCase()) || !filters.position;
      const scoreMatch = isScoreInRange(candidate.score, filters.scoreRange);
      const statusMatch = !filters.status || getStatusFromFilters(candidate) === filters.status;

      return nameMatch && positionMatch && scoreMatch && statusMatch;
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
    { key: 'score', label: 'Score', sortable: true },
    { key: 'ViewFeedback', label: 'Generated Feedback', sortable: false },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <RecruiterNavbar />
      
      <div className="px-36 py-6">
        <h1 className="text-4xl font-bold text-white mb-8">Manage Candidates</h1>
        
        <div className="bg-gray-300/80 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#01295B] mb-4">Filters:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <option value="selected">Selected</option>
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
                    <td className={`py-3 px-4 font-medium ${getScoreColor(candidate.score)}`}>
                      {candidate.score}%
                    </td>
                    <td className="py-3 px-4">
                      <a 
                        href={`/recruiter/feedback/${encodeURIComponent(candidate.name)}`}
                        className="text-[#01295B] hover:underline hover:font-semibold"
                      >
                        View Feedback
                      </a>
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
        </div>
      </div>
    </div>
  );
};

export default ManageCandidates; 