function CVFilters({ onFilterChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          onChange={(e) => onFilterChange('recruiter', e.target.value)}
        />
      </div>

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
          onChange={(e) => onFilterChange('fileName', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="score" className="block text-sm font-medium text-[#01295B] mb-1">
          Score Range
        </label>
        <select
          id="score"
          name="score"
          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#008B8B] focus:border-[#008B8B]"
          onChange={(e) => onFilterChange('scoreRange', e.target.value)}
        >
          <option value="">All Scores</option>
          <option value="90-100">90-100 (Excellent)</option>
          <option value="70-89">70-89 (Good)</option>
          <option value="50-69">50-69 (Average)</option>
          <option value="30-49">30-49 (Below Average)</option>
          <option value="0-29">Below 30 (Poor)</option>
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
          <option value="active">Active</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>
    </div>
  );
}

export default CVFilters; 