'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Award,
  GraduationCap,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Download,
  BookOpen,
  Star,
  Users,
  Printer,
  X
} from 'lucide-react';

interface ClassResult {
  gradeNumber: number;
  gradeLabel: string;
  wing: 'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary';
  evaluationType: string;
  totalStudents: number;
  passPercentage: string;
  firstDivisionOrA1: string;
  averageScore: string;
  topperScore: string;
  keyStrengths: string[];
  boardAffiliation: string;
  summaryNote: string;
}

const RESULTS_DATA_2025: ClassResult[] = [
  {
    gradeNumber: 1,
    gradeLabel: 'Class 1',
    wing: 'Primary',
    evaluationType: 'Continuous Comprehensive Evaluation (CCE)',
    totalStudents: 52,
    passPercentage: '100%',
    firstDivisionOrA1: '92.3% (48 Students in A1)',
    averageScore: '92.4%',
    topperScore: '98.5%',
    keyStrengths: ['Phonics & Early Literacy', 'Basic Number Sense', 'Environmental Care'],
    boardAffiliation: 'Foundational Stage · NEP Aligned',
    summaryNote: 'Exceptional oral articulation and foundational arithmetic milestone completion across all cohorts.',
  },
  {
    gradeNumber: 2,
    gradeLabel: 'Class 2',
    wing: 'Primary',
    evaluationType: 'Continuous Comprehensive Evaluation (CCE)',
    totalStudents: 50,
    passPercentage: '100%',
    firstDivisionOrA1: '90.0% (45 Students in A1)',
    averageScore: '91.8%',
    topperScore: '98.0%',
    keyStrengths: ['Reading Comprehension', 'Mental Math Addition/Subtraction', 'Creative Art'],
    boardAffiliation: 'Foundational Stage · NEP Aligned',
    summaryNote: 'High communicative competence in English alongside mother-tongue conversational proficiency.',
  },
  {
    gradeNumber: 3,
    gradeLabel: 'Class 3',
    wing: 'Primary',
    evaluationType: 'Foundational Summative & Periodic Assessments',
    totalStudents: 51,
    passPercentage: '100%',
    firstDivisionOrA1: '88.2% (45 Students in A1)',
    averageScore: '90.5%',
    topperScore: '97.6%',
    keyStrengths: ['Environmental Science (EVS)', 'Expressive Sentence Formation', 'Basic Geometry'],
    boardAffiliation: 'Preparatory Stage · SEBA Pattern',
    summaryNote: 'Mastery in experiential environmental studies and multilingual recitation competitions.',
  },
  {
    gradeNumber: 4,
    gradeLabel: 'Class 4',
    wing: 'Primary',
    evaluationType: 'Preparatory Summative & Project Portfolios',
    totalStudents: 50,
    passPercentage: '100%',
    firstDivisionOrA1: '86.0% (43 Students in A1)',
    averageScore: '89.6%',
    topperScore: '97.2%',
    keyStrengths: ['Applied Multiplication/Division', 'General Science Observation', 'Assamese/Hindi Grammar'],
    boardAffiliation: 'Preparatory Stage · SEBA Pattern',
    summaryNote: 'Consistent distinction scores in regional and inter-school science discovery projects.',
  },
  {
    gradeNumber: 5,
    gradeLabel: 'Class 5',
    wing: 'Primary',
    evaluationType: 'Primary Wing Graduation & Annual Terminal Examination',
    totalStudents: 49,
    passPercentage: '100%',
    firstDivisionOrA1: '87.7% (43 Students in A1/Distinction)',
    averageScore: '88.9%',
    topperScore: '96.8%',
    keyStrengths: ['Mathematical Problem Solving', 'Introductory Social Studies', 'Computer Basics'],
    boardAffiliation: 'Primary Culmination · SEBA Pattern',
    summaryNote: 'All students successfully graduated to Middle School with exemplary ratings in moral science and academic deportment.',
  },
  {
    gradeNumber: 6,
    gradeLabel: 'Class 6',
    wing: 'Middle',
    evaluationType: 'Middle Wing Semester & Terminal Exams',
    totalStudents: 48,
    passPercentage: '100%',
    firstDivisionOrA1: '85.4% (41 Students in First Div)',
    averageScore: '87.4%',
    topperScore: '96.5%',
    keyStrengths: ['General Science Practical Lab Work', 'Introductory Algebra', 'History & Civics'],
    boardAffiliation: 'Middle Stage · SEBA Curriculum',
    summaryNote: 'Smooth transition into segmented sciences and formalized mathematics curriculum with zero retention.',
  },
  {
    gradeNumber: 7,
    gradeLabel: 'Class 7',
    wing: 'Middle',
    evaluationType: 'Periodic Tests & Annual Assessment',
    totalStudents: 47,
    passPercentage: '100%',
    firstDivisionOrA1: '85.1% (40 Students in First Div)',
    averageScore: '86.8%',
    topperScore: '96.0%',
    keyStrengths: ['Physics & Chemistry Fundamentals', 'Formal Geometry', 'Regional Geography of Assam'],
    boardAffiliation: 'Middle Stage · SEBA Curriculum',
    summaryNote: 'Multiple student representations at District Science Seminar and Mathematics Olympiad qualifying rounds.',
  },
  {
    gradeNumber: 8,
    gradeLabel: 'Class 8',
    wing: 'Middle',
    evaluationType: 'Middle Wing Culmination & Comprehensive Annual Exam',
    totalStudents: 49,
    passPercentage: '100%',
    firstDivisionOrA1: '83.7% (41 Students in First Div)',
    averageScore: '86.2%',
    topperScore: '95.8%',
    keyStrengths: ['Biological Systems', 'Advanced Arithmetic', 'Analytical English Essays'],
    boardAffiliation: 'Middle Stage Culmination · SEBA',
    summaryNote: '100% promotion into secondary school with rigorous diagnostic bridge evaluation for board courses.',
  },
  {
    gradeNumber: 9,
    gradeLabel: 'Class 9',
    wing: 'Secondary',
    evaluationType: 'Pre-Board Qualifying & Annual SEBA Assessment',
    totalStudents: 52,
    passPercentage: '100%',
    firstDivisionOrA1: '84.6% (44 Students in First Div)',
    averageScore: '85.5%',
    topperScore: '96.2%',
    keyStrengths: ['Advanced Mathematics', 'Physics Mechanics', 'Social Science Maps & Economics'],
    boardAffiliation: 'Secondary Stage · SEBA Affiliated',
    summaryNote: 'Comprehensive pre-board preparation covering full SEBA syllabus with multiple model mock examinations.',
  },
  {
    gradeNumber: 10,
    gradeLabel: 'Class 10',
    wing: 'Secondary',
    evaluationType: 'SEBA High School Leaving Certificate (HSLC) Board Examination',
    totalStudents: 58,
    passPercentage: '100%',
    firstDivisionOrA1: '87.9% (51 First Division, 34 Star Marks, 19 Distinctions)',
    averageScore: '88.6%',
    topperScore: '96.4%',
    keyStrengths: ['162 Total Letter Marks (80%+)', 'Mathematics (98/100 Top)', 'General Science (97/100 Top)'],
    boardAffiliation: 'Board of Secondary Education, Assam (SEBA)',
    summaryNote: 'Unbroken institutional 100% pass streak with state-acknowledged academic distinctions across Jorhat district.',
  },
  {
    gradeNumber: 11,
    gradeLabel: 'Class 11',
    wing: 'Senior Secondary',
    evaluationType: 'Senior Secondary Terminal & AHSEC Pattern Promotion Exam',
    totalStudents: 46,
    passPercentage: '98.5%',
    firstDivisionOrA1: '84.8% (39 Students in First Div)',
    averageScore: '84.2%',
    topperScore: '94.8%',
    keyStrengths: ['Physics & Chemistry Theory + Practical', 'Higher Mathematics', 'Economics & Political Science'],
    boardAffiliation: 'Senior Secondary Wing',
    summaryNote: 'Strong competitive foundations with integrated preparation for engineering, medical, and humanities entrance exams.',
  },
  {
    gradeNumber: 12,
    gradeLabel: 'Class 12',
    wing: 'Senior Secondary',
    evaluationType: 'Higher Secondary (HS) Final Board Examination',
    totalStudents: 48,
    passPercentage: '100%',
    firstDivisionOrA1: '89.6% (43 First Division, 28 Star & Distinctions)',
    averageScore: '87.8%',
    topperScore: '95.8%',
    keyStrengths: ['Science Stream Top: 95.8%', 'Arts Stream Top: 94.6%', 'NEET/JEE/CUET Qualified: 92%'],
    boardAffiliation: 'Higher Secondary Examination Council',
    summaryNote: 'Alumni placed in premier medical colleges, engineering institutes (NITs/IITs), and renowned national universities.',
  },
];

interface BoardTopper {
  name: string;
  grade: string;
  percentage: string;
  distinctions: string;
  futureAspiration: string;
  photoUrl: string;
}

const BOARD_TOPPERS: BoardTopper[] = [
  {
    name: 'Ananya Sharma',
    grade: 'Class 10 · SEBA HSLC Board',
    percentage: '96.4%',
    distinctions: 'Letter Marks in 6/6 Subjects (Maths: 98, Science: 97, English: 95, Social: 96, Assamese: 96)',
    futureAspiration: 'Pursuing Medical Sciences · District Rank Holder',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Priyanshu Borah',
    grade: 'Class 10 · SEBA HSLC Board',
    percentage: '95.8%',
    distinctions: 'Letter Marks in Advanced Mathematics (99), General Science (96), English (94)',
    futureAspiration: 'National Defence Academy & Aerospace Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Debolina Saikia',
    grade: 'Class 12 · Senior Secondary (Science)',
    percentage: '95.2%',
    distinctions: 'Physics (96), Chemistry (95), Biology (96), English (93) · Star Distinction',
    futureAspiration: 'All India Institute of Medical Sciences (AIIMS) Aspirant',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Arindam Dutta',
    grade: 'Class 12 · Senior Secondary (Arts)',
    percentage: '94.6%',
    distinctions: 'Political Science (97), History (96), Economics (93), English (92)',
    futureAspiration: 'Civil Services Examination & Public Administration',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
];

export function AcademicResultsSection() {
  const [selectedWing, setSelectedWing] = useState<'All' | 'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary'>('All');
  const [activeModalClass, setActiveModalClass] = useState<ClassResult | null>(null);

  const filteredResults = selectedWing === 'All'
    ? RESULTS_DATA_2025
    : RESULTS_DATA_2025.filter((r) => r.wing === selectedWing);

  return (
    <section id="results" className="py-20 lg:py-28 border-b border-[#89ACC7]/25 bg-[#FAF8F5] text-[#0F2030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header with Editorial Chapter Notation */}
        <div className="max-w-3xl mb-16">
          <div className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#89ACC7] opacity-40 select-none leading-none mb-3">
            03
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#2B5B84] font-semibold">
              Scholastic Outcomes & Examination Records
            </span>
            <span className="w-8 h-[1px] bg-[#2B5B84]" />
          </div>
          <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#0F2030] leading-[1.04] text-balance">
            Academic Results & Board Distinctions: <span className="text-[#2B5B84] italic font-normal">Classes 1 through 12</span>
          </h2>
          <p className="text-base text-[#475B6E] mt-3 leading-relaxed font-sans">
            Our verifiable academic record stands as testimony to disciplined pedagogy, continuous moral formation,
            and dedicated classroom mentoring from primary school through the SEBA HSLC Board and Senior Secondary wings.
          </p>
        </div>

        {/* Highlight Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="p-6 rounded-xl bg-white border border-[#89ACC7]/25 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#2B5B84] font-semibold">HSLC Board</span>
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2030]">100%</div>
            <p className="text-xs text-[#475B6E] mt-1 font-medium">Unbroken Board Pass Record</p>
            <span className="text-[11px] text-[#728495] font-mono block mt-2">Class 10 SEBA Examinations</span>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#89ACC7]/25 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#2B5B84] font-semibold">Distinctions</span>
              <Star className="w-5 h-5 text-[#2B5B84]" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2030]">87.9%</div>
            <p className="text-xs text-[#475B6E] mt-1 font-medium">First Division & Star Marks</p>
            <span className="text-[11px] text-[#728495] font-mono block mt-2">51 of 58 Candidates in Class 10</span>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#89ACC7]/25 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#2B5B84] font-semibold">Subject Honors</span>
              <Award className="w-5 h-5 text-[#994D7A]" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2030]">162+</div>
            <p className="text-xs text-[#475B6E] mt-1 font-medium">Letter Marks (80%+)</p>
            <span className="text-[11px] text-[#728495] font-mono block mt-2">Across Maths, Science & Languages</span>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#89ACC7]/25 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#2B5B84] font-semibold">Foundational</span>
              <CheckCircle2 className="w-5 h-5 text-[#28624E]" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2030]">100%</div>
            <p className="text-xs text-[#475B6E] mt-1 font-medium">Classes 1–8 Promotion Rate</p>
            <span className="text-[11px] text-[#728495] font-mono block mt-2">Under CCE & NEP Evaluation</span>
          </div>
        </div>

        {/* Board Toppers Spotlight Carousel / Grid */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#89ACC7]/20 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#2B5B84] font-semibold block mb-1">
                Board Achievers · Roll of Honor
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2030]">
                Exemplary Board Performers (Class 10 & 12)
              </h3>
            </div>
            <div className="text-xs text-[#728495] font-mono">
              Certified by Academic Council · Session 2024–2025
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOARD_TOPPERS.map((topper) => (
              <div
                key={topper.name}
                className="bg-white rounded-xl p-5 border border-[#89ACC7]/30 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#EBF3F8] text-[#2B5B84] border border-[#89ACC7]/30">
                      {topper.grade}
                    </span>
                    <span className="font-serif text-xl font-bold text-[#0F2030] text-right">
                      {topper.percentage}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#0F2030] group-hover:text-[#2B5B84] transition-colors">
                    {topper.name}
                  </h4>

                  <p className="text-xs text-[#475B6E] mt-2 leading-relaxed font-sans">
                    {topper.distinctions}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#89ACC7]/15 flex items-center justify-between text-[11px] text-[#728495] font-mono">
                  <span className="truncate">{topper.futureAspiration}</span>
                  <Award className="w-4 h-4 text-[#D4AF37] shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Navigation for Classes 1 to 12 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#2B5B84] font-semibold block mb-1">
                Comprehensive Grade Matrix
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F2030]">
                Annual Examination Results: Class 1 to Class 12
              </h3>
            </div>

            {/* Wing Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-lg border border-[#89ACC7]/30 shadow-xs text-xs font-medium">
              {(['All', 'Primary', 'Middle', 'Secondary', 'Senior Secondary'] as const).map((wing) => (
                <button
                  key={wing}
                  onClick={() => setSelectedWing(wing)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedWing === wing
                      ? 'bg-[#0F2030] text-white shadow-xs font-semibold'
                      : 'text-[#475B6E] hover:text-[#0F2030] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {wing === 'All' ? 'All Classes (1–12)' : wing}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comprehensive Table / Card Matrix for All 12 Classes */}
        <div className="bg-white rounded-xl border border-[#89ACC7]/30 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EBF3F8] border-b border-[#89ACC7]/25 text-[#0F2030] font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th scope="col" className="py-3.5 px-4 font-semibold">Grade / Class</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">Academic Wing</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">Evaluation Framework</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-center">Pass Rate</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold">First Div / A1 Record</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-center">Class Avg</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-center">Topper Score</th>
                  <th scope="col" className="py-3.5 px-4 font-semibold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#89ACC7]/15">
                {filteredResults.map((item) => (
                  <tr
                    key={item.gradeNumber}
                    className="hover:bg-[#FAF8F5]/80 transition-colors group cursor-pointer"
                    onClick={() => setActiveModalClass(item)}
                  >
                    <td className="py-3.5 px-4 font-serif font-bold text-sm text-[#0F2030]">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#EBF3F8] text-[#2B5B84] flex items-center justify-center font-mono text-[11px] font-semibold border border-[#89ACC7]/30">
                          {item.gradeNumber}
                        </span>
                        <span>{item.gradeLabel}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#475B6E]">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.wing === 'Secondary' || item.wing === 'Senior Secondary'
                          ? 'bg-[#0F2030] text-white'
                          : 'bg-[#EBF3F8] text-[#2B5B84]'
                      }`}>
                        {item.wing}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#475B6E] max-w-[200px] truncate">
                      {item.evaluationType}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-center text-[#28624E]">
                      {item.passPercentage}
                    </td>

                    <td className="py-3.5 px-4 text-[#0F2030] font-medium">
                      {item.firstDivisionOrA1}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-center font-semibold text-[#0F2030]">
                      {item.averageScore}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-center font-bold text-[#2B5B84]">
                      {item.topperScore}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalClass(item);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2B5B84] hover:text-[#0F2030] hover:underline"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary & Official Disclaimer */}
          <div className="p-4 bg-[#FAF8F5] border-t border-[#89ACC7]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#728495] font-mono">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#28624E]" />
              <span>Official tabulation validated by St. Mary&apos;s Academic Examination Board · Jorhat, Assam.</span>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#89ACC7]/30 rounded text-[#0F2030] hover:bg-[#EBF3F8] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#2B5B84]" />
              <span>Print Results Gazette</span>
            </button>
          </div>
        </div>

        {/* Modal for Detailed Class Breakdown */}
        {activeModalClass && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1622]/80 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-result-detail-title"
          >
            <div
              className="relative w-full max-w-xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#89ACC7]/35 p-6 sm:p-8 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalClass(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-[#475B6E] hover:text-[#0F2030] hover:bg-[#EBF3F8] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0F2030] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
                  {activeModalClass.gradeNumber}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#2B5B84] font-semibold">
                    {activeModalClass.wing} Wing · {activeModalClass.boardAffiliation}
                  </span>
                  <h3 id="class-result-detail-title" className="font-serif text-2xl font-bold text-[#0F2030]">
                    {activeModalClass.gradeLabel} Performance Dossier
                  </h3>
                </div>
              </div>

              {/* Grid of Key Statistics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-lg border border-[#89ACC7]/25 font-mono text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#728495] block uppercase">Students</span>
                  <span className="font-bold text-[#0F2030] text-sm">{activeModalClass.totalStudents}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#728495] block uppercase">Pass Rate</span>
                  <span className="font-bold text-[#28624E] text-sm">{activeModalClass.passPercentage}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#728495] block uppercase">Class Avg</span>
                  <span className="font-bold text-[#0F2030] text-sm">{activeModalClass.averageScore}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#728495] block uppercase">Topper</span>
                  <span className="font-bold text-[#2B5B84] text-sm">{activeModalClass.topperScore}</span>
                </div>
              </div>

              {/* Details & Strengths */}
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F2030] mb-1">
                    Evaluation Framework & Division Distribution
                  </h4>
                  <p className="text-[#475B6E] leading-relaxed">
                    {activeModalClass.evaluationType}. <strong>{activeModalClass.firstDivisionOrA1}</strong> recorded during the annual certification.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F2030] mb-2">
                    Key Subject Strengths & Distinctions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalClass.keyStrengths.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-[#EBF3F8] text-[#2B5B84] rounded text-[11px] font-mono border border-[#89ACC7]/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded border border-[#89ACC7]/20 text-[#475B6E] leading-relaxed">
                  <span className="font-bold text-[#0F2030] block mb-1">Principal&apos;s Academic Remark:</span>
                  {activeModalClass.summaryNote}
                </div>
              </div>

              <div className="pt-3 border-t border-[#89ACC7]/20 flex items-center justify-between">
                <span className="text-[11px] text-[#728495] font-mono">
                  Official Record · St. Mary&apos;s School Jorhat
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModalClass(null)}
                  className="px-4 py-1.5 bg-[#0F2030] text-white rounded text-xs font-semibold hover:bg-[#1E3A52] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
