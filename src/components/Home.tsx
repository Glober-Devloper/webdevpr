import { BookOpen, Code, Download, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Web Page Designing Lab
              </h1>
              <p className="text-xl text-gray-600">
                MN-2B (Practical) - Bachelor of Computer Application
              </p>
              <p className="text-lg text-gray-500 mt-2">
                Semester IV | 1 Credit | 30 Minimum Class Hours
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <GraduationCap className="text-blue-600 mr-3" size={28} />
                  <h2 className="text-xl font-bold text-gray-800">Objective</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Familiarize students with markup languages, scripting languages, and CSS.
                  Learn static web page development to design production-ready websites.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <BookOpen className="text-purple-600 mr-3" size={28} />
                  <h2 className="text-xl font-bold text-gray-800">Learning Outcome</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Design and implement static websites with good aesthetic sense using HTML and CSS.
                  Master web development fundamentals and best practices.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-8">
              <div className="flex items-center mb-4">
                <Code className="mr-3" size={28} />
                <h2 className="text-2xl font-bold">Course Structure</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Unit I: Introduction to Markup Languages</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• HTML basics and document structure</li>
                    <li>• Text formatting and styling</li>
                    <li>• Images, links, and image maps</li>
                    <li>• Tables and their attributes</li>
                    <li>• Frames and framesets</li>
                    <li>• HTML forms and input elements</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Unit II: Web Page Designing With CSS</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• CSS syntax and selectors</li>
                    <li>• External, internal, and inline CSS</li>
                    <li>• Box model and positioning</li>
                    <li>• Colors, backgrounds, and borders</li>
                    <li>• Typography and text styling</li>
                    <li>• CSS layouts and navigation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment Structure</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15</div>
                  <div className="text-gray-600">Experiments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">5</div>
                  <div className="text-gray-600">Viva-Voce</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">5</div>
                  <div className="text-gray-600">Practical File</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-gray-800">Total: 25 Marks</div>
                <div className="text-gray-600">Pass Marks: 10</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              <Download className="mr-2" size={20} />
              Download Course Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
