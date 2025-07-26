import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GrFormEdit } from "react-icons/gr";

export default function EditIssue() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [issue, setIssue] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    priority: 'Medium',
    status: 'Open'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchIssue = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/issues/${id}`);
      setIssue(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load issue');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/issues/${id}`, issue);
      setSuccess(true);
      
   
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update issue');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
            <span className="text-gray-600">Loading issue...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
       
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-4 transition-colors duration-200"
          >
            ← Back to Issues
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <GrFormEdit className="w-12 h-8 text-5xl bg-blue-700 rounded-full flex items-center justify-center mr-3"/>
            Edit Issue
          </h1>
        </div>

        {/* Main Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
              {error.includes('Failed to load') && (
                <button 
                  onClick={fetchIssue}
                  className="ml-auto text-red-600 hover:text-red-800 underline"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
              <span className="mr-2">✅</span>
              Issue updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Issue Title
              </label>
              <input
                name="title"
                value={issue.title}
                onChange={handleChange}
                placeholder="Enter issue title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
                disabled={saving}
              />
            </div>

       
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📋 Description
              </label>
              <textarea
                name="description"
                value={issue.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                rows="4"
                required
                disabled={saving}
              />
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🚨 Severity
                </label>
                <input
                  name="severity"
                  value={issue.severity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  disabled={saving}
                />
              </div>

            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ⚡ Priority
                </label>
                <input
                  name="priority"
                  value={issue.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  disabled={saving}
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📊 Status
                </label>
                <input
                  name="status"
                  value={issue.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  disabled={saving}
                />
               
              </div>
            </div>

           
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="cursor-pointer flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <span className="mr-2"></span>
                    Update Issue
                  </>
                )}
              </button>

              <Link
                to="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}