import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';
import CVFilters from '../../components/CVFilters';

const ManageCVs = () => {
  const navigate = useNavigate();
  const [cvData] = useState([
    { 
      id: 1, 
      fileName: 'cv_resume.pdf', 
      position: 'Software Engineer', 
      score: 95,
      recruiter: 'Jinay Mehta',
      status: 'Selected'
    },
    { 
      id: 2, 
      fileName: 'cv_resume.pdf', 
      position: 'Product Manager', 
      score: 75,
      recruiter: 'Jinay Mehta',
      status: 'Rejected'
    },
    { 
      id: 3, 
      fileName: 'cv_resume.pdf', 
      position: 'UX Designer', 
      score: 25,
      recruiter: 'Jinay Mehta',
      status: 'Selected'
    },
    { 
      id: 4, 
      fileName: 'cv_resume.pdf', 
      position: 'Data Scientist', 
      score: 88,
      recruiter: 'Jinay Mehta',
      status: 'Pending'
    },
    { 
      id: 5, 
      fileName: 'cv_resume.pdf', 
      position: 'DevOps Engineer', 
      score: 65,
      recruiter: 'Jinay Mehta',
      status: 'Pending'
    },
  ]);

  const [filters, setFilters] = useState({
    position: '',
    fileName: '',
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
    if (score >= 30) return 'text-orange-700';
    return 'text-red-700';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
        return 'bg-green-200 text-green-800';
      case 'Rejected':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-yellow-200 text-yellow-800';
    }
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

  const handleViewFeedback = (id) => {
    // Navigate to the feedback page
    const cv = cvData.find(cv => cv.id === id);
    if (cv) {
      navigate(`/hiring-manager/feedback/${encodeURIComponent(cv.fileName.replace('.pdf', ''))}`);
    }
  };

  const filteredCVs = useMemo(() => {
    let filtered = cvData.filter(cv => {
      const positionMatch = cv.position.toLowerCase().includes(filters.position.toLowerCase()) || !filters.position;
      const fileNameMatch = cv.fileName.toLowerCase().includes(filters.fileName.toLowerCase()) || !filters.fileName;
      const scoreMatch = isScoreInRange(cv.score, filters.scoreRange);
      const recruiterMatch = cv.recruiter.toLowerCase().includes(filters.recruiter.toLowerCase()) || !filters.recruiter;
      const statusMatch = !filters.status || cv.status.toLowerCase() === filters.status.toLowerCase();

      return positionMatch && fileNameMatch && scoreMatch && recruiterMatch && statusMatch;
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
  }, [cvData, filters, sortConfig]);

  const columns = [
    { key: 'id', label: 'S.No.', sortable: true },
    { key: 'fileName', label: 'CVs', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { key: 'recruiter', label: 'Recruiter', sortable: true },
    { key: 'score', label: 'Score', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'feedback', label: 'Generated Feedback', sortable: false }
  ];

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <HiringManagerNavbar />
      
      <div className="px-36 py-6">
        <h1 className="text-4xl font-bold text-white mb-8">Manage CVs</h1>
        
        <div className="bg-gray-300/80 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#01295B] mb-4">Filters:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor="fileName" className="block text-sm font-medium text-[#01295B] mb-1">
                  CV Name
                </label>
                <input
                  type="text"
                  id="fileName"
                  name="fileName"
                  className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
                  placeholder="Search by CV name"
                  onChange={(e) => handleFilterChange('fileName', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-[#01295B] mb-1">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
                  placeholder="Search by position"
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
                {filteredCVs.map((cv, index) => (
                  <tr 
                    key={cv.id}
                    className="border-b border-gray-300 hover:bg-gray-200/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-[#01295B]">{index + 1}</td>
                    <td className="py-3 px-4">
                      <a href="#" className="text-[#01295B] hover:underline font-medium">
                        {cv.fileName}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-[#01295B]">{cv.position}</td>
                    <td className="py-3 px-4 text-[#01295B]">{cv.recruiter}</td>
                    <td className={`py-3 px-4 font-medium ${getScoreColor(cv.score)}`}>
                      {cv.score}%
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cv.status)}`}>
                        {cv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewFeedback(cv.id)}
                        className="text-[#01295B] hover:underline font-medium"
                      >
                        View Feedback
                      </button>
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

export default ManageCVs; 