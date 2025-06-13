import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import HiringManagerNavbar from '../../components/HiringManagerNavbar';

function JobRoleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [jobRole, setJobRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    skills: '',
    location: '',
    salary_range: '',
    status: ''
  });

  useEffect(() => {
    if (!id) {
      setError('No job role ID provided');
      setLoading(false);
      return;
    }
    fetchJobRole();
  }, [id]);

  const fetchJobRole = async () => {
    try {
      console.log('Fetching job role with ID:', id);
      const response = await axios.get(`http://localhost:8000/job-roles/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Job role response:', response.data);
      setJobRole(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        requirements: response.data.requirements,
        skills: Array.isArray(response.data.skills) ? response.data.skills.join(', ') : response.data.skills,
        location: response.data.location,
        salary_range: response.data.salary_range,
        status: response.data.status
      });
    } catch (err) {
      console.error('Error fetching job role:', err);
      setError(err.response?.data?.detail || 'Failed to fetch job role details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/job-roles/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Update response:', response.data);
      setIsEditing(false);
      fetchJobRole();
    } catch (err) {
      console.error('Error updating job role:', err);
      setError(err.response?.data?.detail || 'Failed to update job role');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job role?')) {
      try {
        await axios.delete(`http://localhost:8000/job-roles/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        navigate('/hiring-manager/dashboard');
      } catch (err) {
        console.error('Error deleting job role:', err);
        setError(err.response?.data?.detail || 'Failed to delete job role');
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <HiringManagerNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Loading job role details...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <HiringManagerNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    </div>
  );

  if (!jobRole) return (
    <div className="min-h-screen bg-gray-50">
      <HiringManagerNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Job role not found</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HiringManagerNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#01295B]">
              {isEditing ? 'Edit Job Role' : 'Job Role Details'}
            </h1>
            <div className="space-x-4">
              {!isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#01295B] text-white rounded hover:bg-[#001F3F]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#01295B] focus:ring-[#01295B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#01295B] focus:ring-[#01295B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#01295B] focus:ring-[#01295B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#01295B] focus:ring-[#01295B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#01295B] focus:ring-[#01295B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                <input
                  type="text"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#01295B] focus:ring-[#01295B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#01295B] focus:ring-[#01295B]"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#01295B] text-white rounded hover:bg-[#001F3F]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1">{jobRole.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 whitespace-pre-wrap">{jobRole.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Requirements</h3>
                <p className="mt-1 whitespace-pre-wrap">{jobRole.requirements}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Skills</h3>
                <p className="mt-1">{Array.isArray(jobRole.skills) ? jobRole.skills.join(', ') : jobRole.skills}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1">{jobRole.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Salary Range</h3>
                <p className="mt-1">{jobRole.salary_range}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  jobRole.status === "Active"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}>
                  {jobRole.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobRoleDetails; 