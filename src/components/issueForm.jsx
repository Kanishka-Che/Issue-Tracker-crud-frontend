import { useState } from 'react';
import axios from 'axios';

export default function IssueForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    priority: 'Medium',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/issues`, form);
      setForm({ title: '', description: '', severity: 'Medium', priority: 'Medium' });
      setSuccess(true);
      onCreated?.();
      
      // Auto-hide success message
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
      style={{ backgroundImage: 'url(/back_2.jpeg)', backgroundSize: 'cover' }}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <span className="mr-2">✅</span>
            Issue created successfully!
          </div>
        )}

        
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            📝 Issue Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter a clear, descriptive title..."
            className="backdrop-blur-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
            disabled={loading}
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            📋 Description
          </label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Provide detailed information about the issue..."
            className="backdrop-blur-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
            disabled={loading}
          />
        </div>

        
        <div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              🚨 Severity
            </label>
            <input
              name="severity"
              value={form.severity}
              onChange={handleChange}
              placeholder="Select severity"
              className="backdrop-blur-sm w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              ⚡ Priority
            </label>
            <input
              name="priority"
              value={form.priority}
              onChange={handleChange}
              placeholder="Select priority"
              className="backdrop-blur-sm w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-white"
              disabled={loading}
            />
            
          </div>
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-black-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 "></div>
              Creating Issue...
            </>
          ) : (
            <>
              <span className="mr-2"></span>
              Create Issue
            </>
          )}
        </button>
      </form>
    </div>
  );
}