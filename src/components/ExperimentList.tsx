import { useEffect, useState } from 'react';
import { supabase, Experiment } from '../lib/supabase';
import { Code2, ChevronRight, Book } from 'lucide-react';

interface ExperimentListProps {
  onSelectExperiment: (experiment: Experiment) => void;
}

export default function ExperimentList({ onSelectExperiment }: ExperimentListProps) {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  useEffect(() => {
    fetchExperiments();
  }, []);

  async function fetchExperiments() {
    try {
      const { data, error } = await supabase
        .from('experiments')
        .select('*')
        .order('unit_number', { ascending: true })
        .order('experiment_number', { ascending: true });

      if (error) throw error;
      setExperiments(data || []);
    } catch (error) {
      console.error('Error fetching experiments:', error);
    } finally {
      setLoading(false);
    }
  }

  const unit1Experiments = experiments.filter(exp => exp.unit_number === 1);
  const unit2Experiments = experiments.filter(exp => exp.unit_number === 2);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  const renderExperiments = (exps: Experiment[], unitNum: number) => {
    const isExpanded = selectedUnit === unitNum || selectedUnit === null;

    return (
      <div className="mb-6">
        <button
          onClick={() => setSelectedUnit(isExpanded ? null : unitNum)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg flex items-center justify-between hover:shadow-lg transition"
        >
          <div className="flex items-center">
            <Book className="mr-3" size={24} />
            <span className="text-xl font-bold">
              Unit {unitNum}: {unitNum === 1 ? 'Introduction to Markup Languages' : 'Web Page Designing With CSS'}
            </span>
          </div>
          <ChevronRight className={`transform transition ${isExpanded ? 'rotate-90' : ''}`} size={24} />
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            {exps.map((exp) => (
              <div
                key={exp.id}
                onClick={() => onSelectExperiment(exp)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-200 p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                      {exp.experiment_number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{exp.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.key_concepts.slice(0, 3).map((concept, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {concept}
                          </span>
                        ))}
                        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getDifficultyColor(exp.difficulty_level)}`}>
                          {exp.difficulty_level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 flex-shrink-0 ml-4" size={20} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Code2 className="text-blue-600 mr-3" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Lab Experiments</h1>
                <p className="text-gray-600">Click on any experiment to view question and solution</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{experiments.length}</div>
                  <div className="text-sm text-gray-600">Total Experiments</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {experiments.filter(e => e.difficulty_level === 'Easy').length}
                  </div>
                  <div className="text-sm text-gray-600">Easy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {experiments.filter(e => e.difficulty_level === 'Medium').length}
                  </div>
                  <div className="text-sm text-gray-600">Medium</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {experiments.filter(e => e.difficulty_level === 'Hard').length}
                  </div>
                  <div className="text-sm text-gray-600">Hard</div>
                </div>
              </div>
            </div>
          </div>

          {renderExperiments(unit1Experiments, 1)}
          {renderExperiments(unit2Experiments, 2)}
        </div>
      </div>
    </div>
  );
}
