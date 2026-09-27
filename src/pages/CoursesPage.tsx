import React, { useState, useEffect } from 'react';
import { COURSES_DATA, Course } from '../data/courses';
import { Search, ArrowRight, CheckCircle2, Clock, BarChart, Sparkles } from 'lucide-react';

interface CoursesPageProps {
  navigate: (path: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);

  const categories = ['All', 'Design', 'Marketing', 'Writing', 'Tech & Web', 'Administration', 'Advanced'];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApply = (courseName: string) => {
    navigate(`/register?course=${encodeURIComponent(courseName)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
            Official Course Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Choose the Skill You Want to Master
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your next opportunity can begin with one practical skill. Choose the training path that
            matches where you want to go.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by course name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] focus:border-transparent"
              />
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0757D5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
          <span>Showing {filteredCourses.length} of {COURSES_DATA.length} training programs</span>
          <span>16 Standard Programs at ₦5,000 · AI Intensive at ₦26,000</span>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isAI = course.id === 'ai-automation';
            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                  isAI
                    ? 'border-blue-400 ring-2 ring-[#0757D5]/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#0757D5] uppercase tracking-wider">
                      {course.category}
                    </span>
                    {course.badge && (
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#071A3D] mb-2">{course.name}</h3>
                  <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Core Syllabus Highlights:
                    </div>
                    <ul className="space-y-1.5">
                      {course.curriculum.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0757D5] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart className="w-3.5 h-3.5" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Tuition Fee</div>
                    <div className="text-2xl font-black text-[#071A3D]">{course.price}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCourseDetails(course)}
                      className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#071A3D] hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Syllabus
                    </button>
                    <button
                      onClick={() => handleApply(course.name)}
                      className="px-4 py-2 bg-[#0757D5] hover:bg-[#064ab8] text-white text-xs font-bold rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
            <p className="text-slate-600 mb-4">No courses found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-sm font-semibold text-[#0757D5] underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Syllabus Modal */}
      {selectedCourseDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#0757D5] uppercase tracking-wider">
                  {selectedCourseDetails.category}
                </span>
                <h3 className="text-2xl font-bold text-[#071A3D]">{selectedCourseDetails.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCourseDetails(null)}
                className="text-slate-400 hover:text-slate-600 p-2 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-sm text-slate-600">{selectedCourseDetails.description}</p>

              <div>
                <h4 className="text-xs font-bold text-[#071A3D] uppercase tracking-wider mb-2">
                  Complete Curriculum Modules
                </h4>
                <div className="space-y-2">
                  {selectedCourseDetails.curriculum.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#0757D5] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <span className="text-slate-500 block">Duration:</span>
                  <span className="font-bold text-[#071A3D]">{selectedCourseDetails.duration}</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl">
                  <span className="text-slate-500 block">Tuition:</span>
                  <span className="font-bold text-[#071A3D]">{selectedCourseDetails.price}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourseDetails(null)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => handleApply(selectedCourseDetails.name)}
                className="px-6 py-2.5 bg-[#0757D5] hover:bg-[#064ab8] text-white text-sm font-bold rounded-xl shadow-xs"
              >
                Apply for this Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
