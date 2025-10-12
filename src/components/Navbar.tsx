import { BookOpen } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'experiments';
  onViewChange: (view: 'home' | 'experiments') => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BookOpen size={32} />
            <div>
              <h1 className="text-xl font-bold">Web Page Designing Lab</h1>
              <p className="text-xs text-blue-100">MN-2B (Practical) - BCA Semester IV</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onViewChange('home')}
              className={`px-4 py-2 rounded-lg transition ${
                currentView === 'home'
                  ? 'bg-white text-blue-600 font-semibold'
                  : 'hover:bg-blue-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange('experiments')}
              className={`px-4 py-2 rounded-lg transition ${
                currentView === 'experiments'
                  ? 'bg-white text-blue-600 font-semibold'
                  : 'hover:bg-blue-700'
              }`}
            >
              Experiments
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
