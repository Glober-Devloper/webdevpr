import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ExperimentList from './components/ExperimentList';
import ExperimentDetail from './components/ExperimentDetail';
import { Experiment } from './lib/supabase';

type View = 'home' | 'experiments' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const handleViewChange = (view: 'home' | 'experiments') => {
    setCurrentView(view);
    setSelectedExperiment(null);
  };

  const handleSelectExperiment = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('experiments');
    setSelectedExperiment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentView={currentView === 'detail' ? 'experiments' : currentView}
        onViewChange={handleViewChange}
      />

      {currentView === 'home' && <Home />}

      {currentView === 'experiments' && (
        <ExperimentList onSelectExperiment={handleSelectExperiment} />
      )}

      {currentView === 'detail' && selectedExperiment && (
        <ExperimentDetail experiment={selectedExperiment} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
