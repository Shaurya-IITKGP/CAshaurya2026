import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for expanded table rows
  const [expandedRows, setExpandedRows] = useState({});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || null);
  const [loginError, setLoginError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setToken(result.token);
        sessionStorage.setItem('adminToken', result.token);
      } else {
        setLoginError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('adminToken');
    setData([]);
    setExpandedRows({});
  };

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/api/register`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          if (response.status === 403) {
            handleLogout();
            throw new Error('Session expired or access denied.');
          }
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, apiUrl]);

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredData = data.filter((entry) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (entry.fullName && entry.fullName.toLowerCase().includes(q)) ||
      (entry.unique_id && entry.unique_id.toLowerCase().includes(q)) ||
      (entry.email && entry.email.toLowerCase().includes(q)) ||
      (entry.phone && entry.phone.toLowerCase().includes(q)) ||
      (entry.college && entry.college.toLowerCase().includes(q)) ||
      (entry.cityState && entry.cityState.toLowerCase().includes(q))
    );
  });

  const downloadCSV = () => {
    if (data.length === 0) return;

    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'College',
      'Gender',
      'DOB',
      'City/State',
      'Degree/Year',
      'Heard About',
      'Experience',
      'Past Exp.',
      'Motivation',
      'Registered At'
    ];

    const rows = data.map((entry) => [
      entry.unique_id || '',
      entry.fullName || '',
      entry.email || '',
      entry.phone || '',
      entry.college || '',
      entry.gender || '',
      entry.dob || '',
      entry.cityState || '',
      entry.degreeYear || '',
      entry.heardAbout || '',
      entry.hasExperience ? 'Yes' : 'No',
      entry.pastExperience || '',
      entry.motivation || '',
      entry.created_at || ''
    ]);

    const csvContent =
      [headers.join(',')]
        .concat(
          rows.map((row) =>
            row
              .map((val) => {
                const str = String(val);
                if (str.includes(',') || str.includes('\n') || str.includes('"')) {
                  return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
              })
              .join(',')
          )
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ca_registrations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-20 px-4">
        <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg border border-yellow-500/30">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Admin Login</h2>
          {loginError && <div className="mb-4 text-red-500 text-sm text-center">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-500">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Total Registrations: <span className="text-yellow-400 font-semibold">{data.length}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500 flex-grow md:w-64"
          />
          <button
            onClick={downloadCSV}
            disabled={data.length === 0}
            className="px-5 py-2 bg-yellow-500 text-black text-sm font-semibold rounded-md hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow"
          >
            Download CSV
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-500 transition-colors shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xl text-yellow-400">Loading registrations...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 text-xl">Error: {error}</div>
      ) : (
        <div className="overflow-x-auto bg-[#1a1a1a] rounded-xl shadow-xl border border-yellow-500/30">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#242424] border-b border-yellow-500/30">
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap">ID</th>
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap">Name</th>
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap">Email</th>
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap">Phone</th>
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap">College</th>
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap">City/State</th>
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap">Registered At</th>
                <th className="p-4 font-semibold text-yellow-500 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-400">
                    {searchQuery ? 'No matching registrations found.' : 'No registrations found.'}
                  </td>
                </tr>
              ) : (
                filteredData.map((entry, index) => {
                  const isExpanded = !!expandedRows[entry.unique_id];
                  return (
                    <React.Fragment key={entry.unique_id || index}>
                      <tr
                        onClick={() => toggleExpand(entry.unique_id)}
                        className={`border-b border-gray-800 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-[#262626]' : 'hover:bg-[#222222]'
                        }`}
                      >
                        <td className="p-4 whitespace-nowrap font-mono text-yellow-400 font-medium">
                          {entry.unique_id}
                        </td>
                        <td className="p-4 whitespace-nowrap font-medium text-white">
                          {entry.fullName}
                        </td>
                        <td className="p-4 whitespace-nowrap text-gray-300">{entry.email}</td>
                        <td className="p-4 whitespace-nowrap text-gray-300">{entry.phone}</td>
                        <td className="p-4 text-gray-300 max-w-xs truncate">{entry.college}</td>
                        <td className="p-4 whitespace-nowrap text-gray-300">{entry.cityState}</td>
                        <td className="p-4 whitespace-nowrap text-gray-400">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 whitespace-nowrap text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(entry.unique_id);
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold rounded inline-flex items-center gap-1.5 transition-colors ${
                              isExpanded
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                : 'bg-yellow-500 text-black hover:bg-yellow-400'
                            }`}
                          >
                            <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="inline-block text-[10px]"
                            >
                              ▼
                            </motion.span>
                          </button>
                        </td>
                      </tr>

                      {/* Smoothly Animated Inline Details Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <tr className="bg-[#121212] border-b border-yellow-500/20">
                            <td colSpan="8" className="p-0 overflow-hidden">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 bg-[#181818] border-l-4 border-yellow-500 my-2 mx-4 rounded-r-lg shadow-inner space-y-4 text-sm">
                                  <div className="flex justify-between items-center border-b border-gray-700/60 pb-3">
                                    <h4 className="text-base font-bold text-yellow-400">
                                      Registration Details — {entry.fullName} ({entry.unique_id})
                                    </h4>
                                    <button
                                      onClick={() => toggleExpand(entry.unique_id)}
                                      className="text-xs text-gray-400 hover:text-white transition-colors"
                                    >
                                      Close ▲
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-[#222222] p-3 rounded border border-gray-800">
                                      <span className="text-gray-400 text-xs font-semibold uppercase block">Gender</span>
                                      <span className="text-white font-medium">{entry.gender || 'N/A'}</span>
                                    </div>
                                    <div className="bg-[#222222] p-3 rounded border border-gray-800">
                                      <span className="text-gray-400 text-xs font-semibold uppercase block">Date of Birth</span>
                                      <span className="text-white font-medium">
                                        {entry.dob ? new Date(entry.dob).toLocaleDateString() : 'N/A'}
                                      </span>
                                    </div>
                                    <div className="bg-[#222222] p-3 rounded border border-gray-800">
                                      <span className="text-gray-400 text-xs font-semibold uppercase block">Degree & Year</span>
                                      <span className="text-white font-medium">{entry.degreeYear || 'N/A'}</span>
                                    </div>
                                    <div className="bg-[#222222] p-3 rounded border border-gray-800">
                                      <span className="text-gray-400 text-xs font-semibold uppercase block">How heard about Shaurya</span>
                                      <span className="text-white font-medium">{entry.heardAbout || 'N/A'}</span>
                                    </div>
                                    <div className="bg-[#222222] p-3 rounded border border-gray-800">
                                      <span className="text-gray-400 text-xs font-semibold uppercase block">Prior CA Experience</span>
                                      <span className="text-white font-medium">{entry.hasExperience ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="bg-[#222222] p-3 rounded border border-gray-800">
                                      <span className="text-gray-400 text-xs font-semibold uppercase block">Registration Date & Time</span>
                                      <span className="text-white font-medium">
                                        {entry.created_at ? new Date(entry.created_at).toLocaleString() : 'N/A'}
                                      </span>
                                    </div>
                                  </div>

                                  {entry.hasExperience && entry.pastExperience && (
                                    <div className="border-t border-gray-800 pt-3">
                                      <span className="text-gray-400 text-xs font-semibold uppercase block mb-1">
                                        Past Experience Details
                                      </span>
                                      <p className="text-gray-200 bg-[#222222] p-3.5 rounded border border-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {entry.pastExperience}
                                      </p>
                                    </div>
                                  )}

                                  <div className="border-t border-gray-800 pt-3">
                                    <span className="text-gray-400 text-xs font-semibold uppercase block mb-1">
                                      Motivation / Why do you want to join?
                                    </span>
                                    <p className="text-gray-200 bg-[#222222] p-3.5 rounded border border-gray-800 whitespace-pre-wrap leading-relaxed">
                                      {entry.motivation || 'N/A'}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
