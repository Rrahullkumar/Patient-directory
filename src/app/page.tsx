'use client';

import { useState } from 'react';
import DataTable from '@/components/DataTable';
import DataCards from '@/components/DataCard';
import ViewToggle from '@/components/ViewToggle';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [sortOrder, setSortOrder] = useState('none');
  const [currentView, setCurrentView] = useState('table'); // 'table' or 'card'

  return (
    <div className="min-h-screen">
      {/* Filter Section */}
      <section className="bg-white p-4">
        <div className="max-w-8xl mx-auto">
          {/* View Toggle Tabs */}
          <ViewToggle currentView={currentView} setCurrentView={setCurrentView} />

          {/* Search Bar and Sort */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <img
                src="/search.svg"
                alt="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-blue-500"
              />
              <img
                src="/filterIcon.svg"
                alt="Filter"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-15 h-15 cursor-pointer hover:opacity-70"
                onClick={() => console.log('Filter clicked!')}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">Select Field</option>
                <option value="patient_name">Name</option>
                <option value="age">Age</option>
                <option value="medical_issue">Medical Issue</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">Select Order</option>
                <option value="asc">ID Low to High</option>
                <option value="desc">ID High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Data Display - Conditional Rendering */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'table' ? (
          <DataTable
            searchTerm={searchTerm}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        ) : (
          <DataCards
            searchTerm={searchTerm}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        )}
      </main>
    </div>
  );
}
