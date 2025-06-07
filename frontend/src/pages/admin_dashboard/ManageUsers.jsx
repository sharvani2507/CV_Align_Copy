import { useState, useMemo } from 'react';
import UserFilters from '../../components/UserFilters';
import DashboardNavbar from '../../components/AdminNavbar';

function ManageUsers() {
  // Mock data - replace with actual API data later
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Vaishnavi',
      email: 'vaishnav0910@gmail.com',
      company: 'XYZ',
      role: 'Recruiter',
      apiCalls: 30,
      isEnabled: true
    },
    {
      id: 2,
      name: 'Jinay',
      email: 'vaishnav0910@gmail.com',
      company: 'XYZ',
      role: 'Hiring Manager',
      apiCalls: 30,
      isEnabled: true
    }
  ]);

  const [filters, setFilters] = useState({
    name: '',
    company: '',
    role: '',
    status: ''
  });

  // Sorting state
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

  // Sort handler
  const handleSort = (key) => {
    setSortConfig(prevSort => ({
      key,
      direction: 
        prevSort.key === key && prevSort.direction === 'asc'
          ? 'desc'
          : 'asc'
    }));
  };

  // Sort indicator component
  const SortIndicator = ({ column }) => {
    if (sortConfig.key !== column) {
      return (
        <span className="ml-1 text-gray-400">↕</span>
      );
    }
    return (
      <span className="ml-1">
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase()) || !filters.name;
      const companyMatch = user.company.toLowerCase().includes(filters.company.toLowerCase()) || !filters.company;
      const roleMatch = user.role === filters.role || !filters.role;
      const statusMatch = 
        (filters.status === 'enabled' && user.isEnabled) ||
        (filters.status === 'disabled' && !user.isEnabled) ||
        !filters.status;

      return nameMatch && companyMatch && roleMatch && statusMatch;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle special cases
        if (sortConfig.key === 'isEnabled') {
          return sortConfig.direction === 'asc'
            ? Number(a.isEnabled) - Number(b.isEnabled)
            : Number(b.isEnabled) - Number(a.isEnabled);
        }

        // Convert to lowercase for string comparison
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
  }, [users, filters, sortConfig]);

  const handleToggleStatus = (userId) => {
    // TODO: Add API call here to update user status
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isEnabled: !user.isEnabled }
          : user
      )
    );
  };

  // Column configuration
  const columns = [
    { key: 'id', label: 'S.No.', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email Address', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'apiCalls', label: 'API calls', sortable: true },
    { key: 'isEnabled', label: 'Enable/Disable', sortable: true }
  ];

  return (
    <div className="min-h-screen bg-[#001F3F]">
      <DashboardNavbar />
      
      <div className="px-36 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Manage Users</h1>

        <div className="bg-gray-300/80 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#01295B] mb-4">Filters:</h2>
            <UserFilters onFilterChange={handleFilterChange} />
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
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user.id}
                    className="border-b border-gray-300 hover:bg-gray-200/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-[#01295B]">{index + 1}</td>
                    <td className="py-3 px-4 text-[#01295B] font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-[#01295B]">{user.email}</td>
                    <td className="py-3 px-4 text-[#01295B]">{user.company}</td>
                    <td className="py-3 px-4 text-[#01295B]">{user.role}</td>
                    <td className="py-3 px-4 text-[#01295B]">{user.apiCalls}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                            user.isEnabled
                              ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              : 'bg-[#008B8B] text-white hover:bg-[#007a7a]'
                          }`}
                        >
                          Enable
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                            user.isEnabled
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          Disable
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
}

export default ManageUsers; 