import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function IssueList({ refresh }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/issues`);
      setIssues(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (issueId) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;
    
    try {
      setDeletingId(issueId);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/issues/${issueId}`);
      setIssues(issues.filter(issue => issue._id !== issueId));
    } catch (err) {
      setError('Failed to delete issue');
    } finally {
      setDeletingId(null);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      Low: 'bg-green-100 text-green-800 border-green-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      High: 'bg-orange-100 text-orange-800 border-orange-200',
      Critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[severity] || colors.Medium;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'bg-gray-100 text-gray-800 border-gray-200',
      Medium: 'bg-blue-100 text-blue-800 border-blue-200',
      High: 'bg-purple-100 text-purple-800 border-purple-200',
      Urgent: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[priority] || colors.Medium;
  };

  useEffect(() => {
    fetchIssues();
  }, [refresh]);

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
          <span className="text-gray-600">Loading issues...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <span className="mr-2">⚠️</span>
          {error}
          <button 
            onClick={fetchIssues}
            className="ml-auto text-red-600 hover:text-red-800 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium mb-2">No Issues Yet</h3>
          <p>Create your first issue to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" rounded-2xl p-6 shadow-lg border border-white/20"
      style={{ backgroundImage: 'url(/back.jpg)', backgroundSize: 'cover' }}>
      <div className="space-y-4 ">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="backdrop-blur-lg border border-gray-200 rounded-xl p-5 shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {issue.title}
                </h3>
                
                {issue.description && (
                  <p className="text-white mb-3 line-clamp-2">
                    {issue.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                    🚨 {issue.severity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                    ⚡ {issue.priority}
                  </span>
                  {issue.status && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      📊 {issue.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <Link
                  to={`/edit/${issue._id}`}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center cursor-pointer"
                >
                  ✏️ Edit
                </Link>
                
                <button
                  onClick={() => handleDelete(issue._id)}
                  disabled={deletingId === issue._id}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {deletingId === issue._id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    '🗑️ Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white-200">
        <p className="bg-black text-sm text-white text-center border-2 rounded-lg px-1 py-2">
          Total Issues: <span className="font-medium">{issues.length}</span>
        </p>
      </div>
    </div>
  );
}