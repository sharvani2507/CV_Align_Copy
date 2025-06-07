import { useState } from 'react';
import DashboardNavbar from '../../components/AdminNavbar';

function AdminDashboard() {
  const [adminName] = useState('Admin Name');
  
  // Mock data - replace with actual API data later
  const metrics = {
    totalCompanies: 10,
    totalUsers: 1000,
    totalCVs: 1000000,
    totalApiCalls: 1200,
    mostAccessedEndpoint: 'xyz'
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <DashboardNavbar />
      
      <main className="px-36 py-8">
        {/* Welcome Section */}
        <h1 className="text-4xl font-bold text-white mb-8">
          Hello, {adminName}!
        </h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Metrics Card */}
          <div className="lg:col-span-2 bg-gray-200/70 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-[#01295B] mb-4">PERFORMANCE METRICS</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-[#008B8B] text-lg font-medium">AVG. RESPONSE TIME</h3>
                <div className="h-56 bg-[#F4FFF9] rounded-lg mt-2">
                  {/* Bar Chart Component will go here */}
                  <div className="text-center py-20 text-gray-500">
                    BAR CHART PER ENDPOINT
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[#008B8B] text-lg font-medium">MAX RESPONSE TIME</h3>
                <p className="text-2xl font-bold text-[#F4FFF9] mt-2">XYZ</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            <div className="bg-gray-200/70 rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#01295B] mb-2">TOTAL REGISTERED COMPANIES</h2>
              <p className="text-5xl font-bold text-[#008B8B]">{metrics.totalCompanies}</p>
            </div>

            <div className="bg-gray-200/70 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#01295B] mb-2">TOTAL REGISTERED USERS</h3>
              <p className="text-5xl font-bold text-[#008B8B]">{metrics.totalUsers}</p>
            </div>

            <div className="bg-gray-200/70 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#01295B] mb-2">TOTAL CVs PROCESSED</h3>
              <p className="text-5xl font-bold text-[#008B8B]">{metrics.totalCVs}</p>
            </div>
          </div>
        </div>

        {/* Usage Metrics Card */}
        <div className="bg-gray-200/70 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#01295B] mb-4">USAGE METRICS</h2>
          
          <div>
            <h3 className="text-[#008B8B] text-lg font-medium mb-2">API calls over time</h3>
            <div className="h-48 bg-white rounded-lg mb-4">
              {/* Line Chart Component will go here */}
              <div className="text-center py-20 text-gray-500">
                LINE CHART CALLS VS TIME
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-[#008B8B] text-lg font-medium">Total API calls</h3>
                <p className="text-3xl font-semibold text-[#001F3F]">{metrics.totalApiCalls}</p>
              </div>
              <div>
                <h3 className="text-[#008B8B] text-lg font-medium">Most accessed API endpoint</h3>
                <p className="text-3xl font-semibold text-[#001F3F]">{metrics.mostAccessedEndpoint}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard; 