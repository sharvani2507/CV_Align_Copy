import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const CreateJobRole = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobRole, setJobRole] = useState({
    title: '',
    description: '',
    type: '',
    department: '',
    location: '',
    education: '',
    skills: '',
    experience: '',
    deadline: '',
    requirements: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobRole(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert skills string to array and format deadline
      const formattedJobRole = {
        ...jobRole,
        skills: jobRole.skills.split(',').map(skill => skill.trim()),
        deadline: new Date(jobRole.deadline).toISOString()
      };

      const response = await axios.post(
        'http://localhost:8000/job-roles/',
        formattedJobRole,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        navigate('/hiring-manager/manage/job-roles');
      }
    } catch (err) {
      console.error('Error creating job role:', err.response?.data);
      setError(err.response?.data?.detail || 'Failed to create job role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <HiringManagerNavbar />
      
      <div className="px-36 py-8">
        <Link to="/hiring-manager/manage/job-roles" className="text-white hover:text-gray-300 transition">
          <i className="fas fa-arrow-left text-2xl"></i>
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">CREATE NEW JOB ROLE</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-[#F4FFF9]/30 rounded-2xl p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#A2E8DD] text-lg mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                value={jobRole.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-[#A2E8DD] text-lg mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                rows={6}
                className="w-full h-[125px] bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none resize-none"
                value={jobRole.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[#A2E8DD] text-lg mb-2">
                  Job Type
                </label>
                <input
                  type="text"
                  name="type"
                  className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                  value={jobRole.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[#A2E8DD] text-lg mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                  value={jobRole.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[#A2E8DD] text-lg mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                  value={jobRole.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[#A2E8DD] text-lg mb-2">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                  value={jobRole.education}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A2E8DD] text-lg mb-2">
                Skills Required (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                value={jobRole.skills}
                onChange={handleInputChange}
                placeholder="e.g. Python, JavaScript, React"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[#A2E8DD] text-lg mb-2">
                  Experience level
                </label>
                <input
                  type="text"
                  name="experience"
                  className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                  value={jobRole.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[#A2E8DD] text-lg mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none"
                  value={jobRole.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A2E8DD] text-lg mb-2">
                Additional Requirements
              </label>
              <textarea
                name="requirements"
                rows={4}
                className="w-full bg-[#F4FFF9]/56 rounded-lg px-4 py-3 text-[#01295B] font-semibold placeholder-gray-300 focus:outline-none resize-none"
                value={jobRole.requirements}
                onChange={handleInputChange}
                placeholder="Any additional requirements or qualifications"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#A2E8DD] text-[#01295B] px-8 py-3 rounded-lg font-semibold hover:bg-[#8CD3C7] transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Job Role'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobRole; 