'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  UserCheck
} from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: 'parent' | 'alumni';
  categoryLabel: string;
  batchOrTenure: string;
  location: string;
  quote: string;
  anecdoteTitle: string;
  anecdote: string;
  avatarInitials: string;
  keyHighlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'saikia',
    name: 'Dr. Pranjal Saikia',
    role: 'Senior Consultant Physician, Jorhat Medical College Hospital',
    category: 'parent',
    categoryLabel: 'Parent Voice',
    batchOrTenure: 'Parent of Class 8 & 10 Students',
    location: 'Jorhat, Assam',
    quote:
      'St. Mary’s provides what modern coaching factories cannot: genuine moral grounding, intellectual curiosity, and an enduring sense of duty.',
    anecdoteTitle: 'Selfless Teachers During Board Prep',
    anecdote:
      'During my daughter’s Class 10 board preparation, Sister Principal and the science faculty held complimentary evening doubt-clearing sessions. She achieved 95% in science, but more importantly, developed a quiet, compassionate work ethic that now guides her higher secondary studies.',
    avatarInitials: 'PS',
    keyHighlight: 'Parent of Board Distinction Achiever',
  },
  {
    id: 'kashyap',
    name: 'Ananya Kashyap, ACS',
    role: 'Assistant Commissioner & Civil Servant, Government of Assam',
    category: 'alumni',
    categoryLabel: 'Alumni Legacy',
    batchOrTenure: 'HSLC Board Topper · Batch of 2014',
    location: 'Guwahati / Jorhat',
    quote:
      'The school instilled a permanent conviction that scholastic brilliance without compassion and humility is fundamentally incomplete.',
    anecdoteTitle: 'From Morning Assembly to Public Service',
    anecdote:
      'From speaking at morning assemblies in Rowriah to participating in inter-school elocutions, St. Mary’s gave a shy girl the confidence to stand before public forums. The Sisters’ lesson on selfless service to the underprivileged became the core moral compass of my administrative career.',
    avatarInitials: 'AK',
    keyHighlight: 'State Civil Service Officer',
  },
  {
    id: 'barua',
    name: 'Wg Cdr Bikramjeet Barua (Retd.)',
    role: 'Aviation Consultant & Former IAF Officer',
    category: 'parent',
    categoryLabel: 'Parent Voice',
    batchOrTenure: 'Parent of Class 2 & 6 Students',
    location: 'Rowriah, Jorhat',
    quote:
      'In an era of hyper-commercialized schooling, St. Mary’s remains an institution of uncompromised integrity, safety, and human dignity.',
    anecdoteTitle: 'Smooth Transition Across Defense Postings',
    anecdote:
      'Having relocated between air bases across India, my primary concern was finding a school with a safe, grounded atmosphere. St. Mary’s has been a blessing. The warm discipline, the lush green grounds, and the personal attention given to character development make it a second home for my sons.',
    avatarInitials: 'BB',
    keyHighlight: 'Defense Veteran & Parent',
  },
  {
    id: 'dutta',
    name: 'Dr. Debopriya Dutta',
    role: 'Resident Surgeon & Medical Researcher, AIIMS New Delhi',
    category: 'alumni',
    categoryLabel: 'Alumni Legacy',
    batchOrTenure: 'Science Stream · Batch of 2016',
    location: 'New Delhi / Jorhat',
    quote:
      'My love for experimental medicine was born in the quiet chemistry and biology laboratories of St. Mary’s in Rowriah.',
    anecdoteTitle: 'Inquiry Over Rote Learning',
    anecdote:
      'I still remember our science exhibition where Sister Superior urged us to question textbook hypotheses and formulate our own experiments. That encouragement to ask "why" instead of merely memorizing for marks shaped my entire approach to surgical research.',
    avatarInitials: 'DD',
    keyHighlight: 'AIIMS Resident Surgeon',
  },
  {
    id: 'hazarika',
    name: 'Mridula Hazarika',
    role: 'Senior Academician & State Education Awardee',
    category: 'parent',
    categoryLabel: 'Parent Voice',
    batchOrTenure: 'Parent of Class 9 Student',
    location: 'Jorhat, Assam',
    quote:
      'As a lifelong educator, I recognize authentic pedagogical dedication. The handwritten feedback and personal mentorship here are unmatched.',
    anecdoteTitle: 'Individual Attention in Every Notebook',
    anecdote:
      'Teachers at St. Mary’s personally inspect every student’s notes, correcting handwriting, sentence structure, and mathematical reasoning with maternal patience. My daughter has blossomed from a hesitant reader into an enthusiastic literary debater.',
    avatarInitials: 'MH',
    keyHighlight: 'Award-Winning Educator',
  },
  {
    id: 'gogoi',
    name: 'Rituraj Gogoi',
    role: 'Robotics Software Architect & Co-Founder',
    category: 'alumni',
    categoryLabel: 'Alumni Legacy',
    batchOrTenure: 'Batch of 2017 · Tech Innovator',
    location: 'Munich, Germany / Bengaluru',
    quote:
      'St. Mary’s gave us the strong mathematical foundation and the moral courage to build ambitious technology that serves society.',
    anecdoteTitle: 'Late Lab Hours for Science Fairs',
    anecdote:
      'When our student team wanted to build an automated rain-gauge sensor for the district science fair, the school granted us lab access after hours and sponsored the electronic modules. That institutional trust sparked my passion for robotics.',
    avatarInitials: 'RG',
    keyHighlight: 'Global Robotics Engineer',
  },
];

export function TestimonialsSlider() {
  const [filter, setFilter] = useState<'all' | 'parent' | 'alumni'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredTestimonials = filter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === filter);

  const maxIndex = Math.max(0, filteredTestimonials.length - 1);

  const handleFilterChange = (newFilter: 'all' | 'parent' | 'alumni') => {
    setFilter(newFilter);
    setCurrentIndex(0);
  };

  // Automatic gentle rotation every 7 seconds when not paused
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const currentItem = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 border-b border-[#89ACC7]/25 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] text-[#0F2030] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#2B5B84] font-semibold">
                Voices of Trust & Gratitude
              </span>
              <span className="w-8 h-[1px] bg-[#2B5B84]" />
            </div>
            <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#0F2030] leading-[1.04] text-balance">
              Parent & Alumni <span className="text-[#2B5B84] italic font-normal">Testimonials</span>
            </h2>
            <p className="text-base text-[#475B6E] mt-3 leading-relaxed font-sans">
              Reflections from families who have entrusted their children to St. Mary’s, and graduates
              whose foundational years in Rowriah shaped their distinguished careers across the nation.
            </p>
          </div>

          {/* Category Filter Pills & Slider Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filter Buttons */}
            <div className="inline-flex p-1 bg-[#EBF3F8] rounded-lg border border-[#89ACC7]/30 text-xs font-medium">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filter === 'all'
                    ? 'bg-[#0F2030] text-white shadow-xs font-semibold'
                    : 'text-[#475B6E] hover:text-[#0F2030]'
                }`}
              >
                All Stories ({TESTIMONIALS.length})
              </button>
              <button
                onClick={() => handleFilterChange('parent')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filter === 'parent'
                    ? 'bg-[#0F2030] text-white shadow-xs font-semibold'
                    : 'text-[#475B6E] hover:text-[#0F2030]'
                }`}
              >
                Parents ({TESTIMONIALS.filter((t) => t.category === 'parent').length})
              </button>
              <button
                onClick={() => handleFilterChange('alumni')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filter === 'alumni'
                    ? 'bg-[#0F2030] text-white shadow-xs font-semibold'
                    : 'text-[#475B6E] hover:text-[#0F2030]'
                }`}
              >
                Alumni ({TESTIMONIALS.filter((t) => t.category === 'alumni').length})
              </button>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-[#89ACC7]/40 bg-white hover:bg-[#EBF3F8] text-[#0F2030] flex items-center justify-center transition-colors shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-[#2B5B84]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-[#89ACC7]/40 bg-white hover:bg-[#EBF3F8] text-[#0F2030] flex items-center justify-center transition-colors shadow-xs active:scale-95"
              >
                <ChevronRight className="w-5 h-5 text-[#2B5B84]" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Editorial Card Showcase */}
        {currentItem && (
          <div className="relative bg-white rounded-2xl border border-[#89ACC7]/30 shadow-lg p-6 sm:p-10 lg:p-12 transition-all">
            {/* Ambient Watermark Quote Icon */}
            <div className="absolute top-6 right-8 text-[#89ACC7]/15 pointer-events-none select-none">
              <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Author Meta, Badges, & Highlights (4 cols) */}
              <div className="lg:col-span-4 space-y-5 border-b lg:border-b-0 lg:border-r border-[#89ACC7]/20 pb-6 lg:pb-0 lg:pr-8">
                {/* Category Badge & Verification */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-semibold tracking-wide ${
                      currentItem.category === 'parent'
                        ? 'bg-[#EBF3F8] text-[#2B5B84] border border-[#89ACC7]/35'
                        : 'bg-[#FAF0F5] text-[#994D7A] border border-[#994D7A]/30'
                    }`}
                  >
                    {currentItem.category === 'parent' ? (
                      <HeartHandshake className="w-3.5 h-3.5" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5" />
                    )}
                    <span>{currentItem.categoryLabel}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#28624E]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Author Avatar Initials & Full Details */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-xs text-white shrink-0 ${
                      currentItem.category === 'parent' ? 'bg-[#0F2030]' : 'bg-[#994D7A]'
                    }`}
                  >
                    {currentItem.avatarInitials}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0F2030] leading-snug">
                      {currentItem.name}
                    </h3>
                    <p className="text-xs text-[#2B5B84] font-mono mt-0.5 font-medium">
                      {currentItem.batchOrTenure}
                    </p>
                  </div>
                </div>

                {/* Role Description & Location */}
                <div className="space-y-1.5 text-xs text-[#475B6E]">
                  <p className="font-medium text-[#0F2030] leading-relaxed">
                    {currentItem.role}
                  </p>
                  <p className="font-mono text-[11px] text-[#728495]">
                    {currentItem.location}
                  </p>
                </div>

                {/* Key Highlight Ribbon */}
                <div className="pt-2">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#89ACC7]/25 text-[11px] font-mono text-[#2B5B84] font-medium">
                    ✦ {currentItem.keyHighlight}
                  </span>
                </div>
              </div>

              {/* Right Column: Prominent Quote & Anecdote Box (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Main Quote */}
                <blockquote className="font-serif text-2xl sm:text-3xl text-[#0F2030] leading-snug tracking-tight font-medium italic">
                  &ldquo;{currentItem.quote}&rdquo;
                </blockquote>

                {/* Brief Anecdote of School Impact */}
                <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-xl border border-[#89ACC7]/25 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-serif font-bold text-sm text-[#0F2030]">
                      Personal Anecdote: {currentItem.anecdoteTitle}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475B6E] leading-relaxed font-sans">
                    {currentItem.anecdote}
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Bottom Progress & Indicators */}
            <div className="pt-8 mt-8 border-t border-[#89ACC7]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {filteredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx
                        ? 'w-8 bg-[#2B5B84]'
                        : 'w-2 bg-[#89ACC7]/35 hover:bg-[#89ACC7]/70'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Current Slide Counter & Pause Status */}
              <div className="flex items-center gap-3 text-xs font-mono text-[#728495]">
                <span>
                  Story <strong>{currentIndex + 1}</strong> of <strong>{filteredTestimonials.length}</strong>
                </span>
                <span>·</span>
                <span className="text-[11px]">
                  {isPaused ? 'Paused for reading' : 'Auto-advances every 7s'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Multi-Card Preview Row (Shows adjacent cards for quick browsing) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                currentIndex === idx
                  ? 'bg-white border-[#2B5B84] shadow-md ring-2 ring-[#2B5B84]/20'
                  : 'bg-white/80 border-[#89ACC7]/25 hover:border-[#89ACC7]/60 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                    item.category === 'parent'
                      ? 'bg-[#EBF3F8] text-[#2B5B84]'
                      : 'bg-[#FAF0F5] text-[#994D7A]'
                  }`}
                >
                  {item.categoryLabel}
                </span>
                <span className="text-[11px] font-mono text-[#728495]">
                  {item.batchOrTenure.split('·')[0]}
                </span>
              </div>

              <h4 className="font-serif font-bold text-sm text-[#0F2030] line-clamp-1">
                {item.name}
              </h4>
              <p className="text-xs text-[#475B6E] mt-1 line-clamp-2 italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-3 pt-3 border-t border-[#89ACC7]/15 flex items-center justify-between text-[11px] font-mono text-[#2B5B84]">
                <span>Read Story</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
