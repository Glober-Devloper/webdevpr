import { Experiment } from '../lib/supabase';
import { ArrowLeft, Code, Download, Eye, FileText, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface ExperimentDetailProps {
  experiment: Experiment;
  onBack: () => void;
}

export default function ExperimentDetail({ experiment, onBack }: ExperimentDetailProps) {
  const [showPreview, setShowPreview] = useState(false);

  const downloadAsHTML = () => {
    const blob = new Blob([experiment.solution_html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experiment_${experiment.experiment_number}_${experiment.title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsDoc = () => {
    const content = `
WEB PAGE DESIGNING LAB - EXPERIMENT ${experiment.experiment_number}
${experiment.title}
${'='.repeat(60)}

QUESTION:
${experiment.question}

DESCRIPTION:
${experiment.description}

KEY CONCEPTS:
${experiment.key_concepts.map((c, i) => `${i + 1}. ${c}`).join('\n')}

SOLUTION EXPLANATION:
${experiment.solution_explanation}

HTML CODE:
${experiment.solution_html}

${experiment.solution_css ? `CSS CODE:\n${experiment.solution_css}` : ''}

DIFFICULTY LEVEL: ${experiment.difficulty_level}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experiment_${experiment.experiment_number}_${experiment.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Experiments
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                    Unit {experiment.unit_number} - Experiment {experiment.experiment_number}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    experiment.difficulty_level === 'Easy' ? 'bg-green-100 text-green-700' :
                    experiment.difficulty_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {experiment.difficulty_level}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{experiment.title}</h1>
                <p className="text-gray-600">{experiment.description}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
              <div className="flex items-start">
                <FileText className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Question</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{experiment.question}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
              <div className="flex items-start">
                <Lightbulb className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Key Concepts</h2>
                  <div className="flex flex-wrap gap-2">
                    {experiment.key_concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-white text-blue-700 rounded-lg border border-blue-200 font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
              <div className="flex items-start">
                <Code className="text-green-600 mr-3 flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Solution Explanation</h2>
                  <p className="text-gray-700 leading-relaxed">{experiment.solution_explanation}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">HTML Code</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Eye className="mr-2" size={18} />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {experiment.solution_html}
                </pre>
              </div>
            </div>

            {experiment.solution_css && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">CSS Code</h2>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-blue-400 text-sm font-mono whitespace-pre-wrap">
                    {experiment.solution_css}
                  </pre>
                </div>
              </div>
            )}

            {showPreview && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Live Preview</h2>
                <div className="border-4 border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={experiment.solution_html}
                    className="w-full h-96 bg-white"
                    title="Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center pt-6 border-t border-gray-200">
              <button
                onClick={downloadAsHTML}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
              >
                <Download className="mr-2" size={20} />
                Download as HTML
              </button>
              <button
                onClick={downloadAsDoc}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
              >
                <Download className="mr-2" size={20} />
                Download as Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
