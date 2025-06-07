function UserFilters({ onFilterChange }) {
  return (
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
          onChange={(e) => onFilterChange('name', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-[#01295B] mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
          placeholder="Search by company"
          onChange={(e) => onFilterChange('company', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-[#01295B] mb-1">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
          onChange={(e) => onFilterChange('role', e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Recruiter">Recruiter</option>
          <option value="Hiring Manager">Hiring Manager</option>
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
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
    </div>
  );
}

export default UserFilters; 