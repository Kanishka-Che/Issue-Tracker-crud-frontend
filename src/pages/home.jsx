import React, { useState } from 'react';
import IssueForm from '../components/issueForm';
import IssueList from '../components/issueList';
import { AiFillControl } from "react-icons/ai";
import { SiReacthookform } from "react-icons/si";
import { SiGoogleforms } from "react-icons/si";


function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleIssueCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-90% rounded-full mb-6 shadow-lg">
           <AiFillControl className="text-5xl"/> 
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-black via-black to-black bg-clip-text text-transparent mb-4">
            Issue Tracker
          </h1>
          <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your workflow with beautiful issue tracking. Create, manage, and resolve issues with ease.
          </p>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
         
          <div className="lg:py-0 lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <SiReacthookform className="w-12 h-8  bg-green-200 rounded-full flex items-center justify-center mr-3"/>
                Create New Issue
              </h2>
              <p className="text-gray-600">
                Report a new issue or feature request
              </p>
            </div>
            <IssueForm onCreated={handleIssueCreated} />
          </div>

          {/* Right Panel: Issue List */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <SiGoogleforms className="w-12 h-8 text-5xl bg-blue-100 rounded-full flex items-center justify-center mr-3"/>
                All Issues
              </h2>
              <p className="text-gray-600">
                View and manage existing issues
              </p>
            </div>
            <IssueList refresh={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
