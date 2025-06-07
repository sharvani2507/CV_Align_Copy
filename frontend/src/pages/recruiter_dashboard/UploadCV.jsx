import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecruiterNavbar from '../../components/RecruiterNavbar';

function UploadCV() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // List of job roles for the dropdown
  const jobRoles = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Data Analyst',
    'Product Manager',
    'UI/UX Designer',
    'DevOps Engineer',
    'QA Engineer',
    'Machine Learning Engineer',
    'Business Analyst',
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just navigate back
    navigate('/recruiter/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <RecruiterNavbar />
      
      <main className="px-36 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Upload CV</h1>
          
          <form onSubmit={handleSubmit} className="bg-gray-300/80 rounded-lg p-8">
            <div className="mb-6">
              <label htmlFor="jobRole" className="block text-[#01295B] font-medium mb-2">
                Job Role
              </label>
              <select
                id="jobRole"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008B8B] bg-white"
                required
              >
                <option value="">Select a job role</option>
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div 
              className={`relative border-2 border-dashed rounded-lg p-8 text-center mb-6
                ${dragActive ? 'border-[#008B8B] bg-[#008B8B]/10' : 'border-gray-400'}
                ${file ? 'bg-green-50' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="cv-upload"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
              
              {file ? (
                <div className="text-[#01295B]">
                  <p className="font-medium">Selected file:</p>
                  <p>{file.name}</p>
                </div>
              ) : (
                <>
                  <label
                    htmlFor="cv-upload"
                    className="block text-[#01295B] cursor-pointer"
                  >
                    <p className="font-medium mb-2">
                      Drag and drop your CV here or click to browse
                    </p>
                    <p className="text-sm text-gray-600">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                  </label>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/recruiter/dashboard')}
                className="mr-4 px-6 py-2 rounded-lg text-[#01295B] font-medium hover:bg-gray-400/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#008B8B] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#007a7a] transition-colors"
              >
                Upload CV
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UploadCV; 