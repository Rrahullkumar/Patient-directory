interface ViewToggleProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function ViewToggle({ currentView, setCurrentView }: ViewToggleProps) {
  return (
    <div className="flex space-x-4 mb-4">
      <button 
        onClick={() => setCurrentView('table')}
        className={`px-4 py-2 font-medium ${
          currentView === 'table' 
            ? 'text-gray-900 border-b-2 border-blue-500' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Table View
      </button>
      <button 
        onClick={() => setCurrentView('card')}
        className={`px-4 py-2 font-medium ${
          currentView === 'card' 
            ? 'text-gray-900 border-b-2 border-blue-500' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Card View
      </button>
      
      <div className="flex items-center ml-auto">
        <img
          src="/filterIcon.svg"
          alt="Filter"
          className="w-15 h-15 cursor-pointer hover:opacity-70"
          onClick={() => console.log('Left filter clicked!')}
        />
        <span className="text-sm text-gray-500">Active Filters: 0</span>
      </div>
    </div>
  );
}
