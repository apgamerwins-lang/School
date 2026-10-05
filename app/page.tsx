'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  BookOpen,
  Compass,
  Award,
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  FileCheck,
  ArrowRight,
  ChevronRight,
  HeartHandshake,
  Microscope,
  Trophy,
  Bell,
} from 'lucide-react';

import { CinematicLoader } from '@/components/cinematic-loader';
import { NavigationBar } from '@/components/navigation-bar';
import { Hero3DScene } from '@/components/hero-3d-scene';
import { AdmissionEnquiryModal } from '@/components/admission-enquiry-modal';
import { ScrollToTop } from '@/components/scroll-to-top';
import { GalleryLightbox, GalleryItem } from '@/components/gallery-lightbox';
import { ArtisanFlakesBackground } from '@/components/artisan-flakes';
import { AcademicResultsSection } from '@/components/academic-results-section';
import { TestimonialsSlider } from '@/components/testimonials-slider';

export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [activeAcademicTab, setActiveAcademicTab] = useState<'primary' | 'middle' | 'secondary'>('secondary');
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  // Contact section quick form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  // Gallery items using verified generated high-fidelity assets
  const galleryItems: GalleryItem[] = [
    {
      id: 'img-1',
      title: 'Architectural Campus Facade & Lawns',
      category: 'Campus Architecture',
      description: 'The school pavilion and serene grounds in Jamuguri, Rowriah, surrounded by lush Assam greenery.',
      src: '/images/campus_architecture_1790957630596.jpg',
      location: 'Main Block, Rowriah',
    },
    {
      id: 'img-2',
      title: 'Scholastic Reading Hall & Library',
      category: 'Academic Life',
      description: 'Curated reference library housing encyclopedias, literature, and quiet individual reading desks.',
      src: '/images/academic_library_1790957642997.jpg',
      location: 'Central Academic Wing',
    },
    {
      id: 'img-3',
      title: 'Physics & Chemistry Science Lab',
      category: 'Laboratories',
      description: 'Well-appointed practical workbenches equipped for hands-on secondary SEBA science experiments.',
      src: '/images/science_lab_1790957656204.jpg',
      location: 'Science Block',
    },
    {
      id: 'img-4',
      title: 'Athletic Sports Grounds & Track',
      category: 'Sports & Athletics',
      description: 'Expansive outdoor field for football, volleyball, track athletics, and regular physical training.',
      src: '/images/sports_ground_1790957667679.jpg',
      location: 'Junior & Senior Playfields',
    },
    {
      id: 'img-5',
      title: 'Assembly Auditorium & Dais',
      category: 'Cultural Celebrations',
      description: 'Dedicated assembly hall for morning prayers, elocution, debates, and annual cultural celebrations.',
      src: '/images/cultural_hall_1790957680357.jpg',
      location: 'Auditorium Hall',
    },
  ];

  const filteredGallery =
    galleryFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) =>
          item.category.toLowerCase().includes(galleryFilter.toLowerCase())
        );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim()) {
      setContactError('Please provide your name and contact phone number.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0A1622] text-[#0F2030] dark:text-[#FAF8F5] transition-colors duration-250">
      {/* Cinematic Academic Intro Loader */}
      <CinematicLoader />

      {/* Top Navigation */}
      <NavigationBar onOpenEnquiry={() => setEnquiryOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: Architectural 3D + Editorial Typography                  */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-[#89ACC7]/25 bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-[#F5F2EB] text-[#0F2030]">
          {/* Artisan Flakes of Green, Blue, Red and Gold on White & Ivory */}
          <ArtisanFlakesBackground />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Editorial Introduction & CTAs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Institutional Verification Kicker */}
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#0F2030] bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-sm border border-[#89ACC7]/35 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2B5B84]" />
                  <span>SEBA Affiliated · Managed by MSMHC · Established in Jorhat</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif font-bold text-[clamp(3.5rem,7.8vw,7.8rem)] tracking-tight text-[#0F2030] leading-[0.98] text-balance">
                  Nurturing <span className="text-[#2B5B84] italic font-normal">Character</span>, Intellectual Clarity & Moral Grace
                </h1>

                {/* Narrative Subtitle */}
                <p className="text-base sm:text-lg text-[#475B6E] leading-relaxed max-w-2xl font-sans">
                  Guided by the educational vision of the Missionary Sisters of Mary Help of Christians (MSMHC),
                  St. Mary&apos;s High School in Rowriah, Jorhat, provides balanced English-medium schooling from Grade 1
                  through Grade 10, combining rigorous academic grounding with enduring human values.
                </p>

                {/* Primary & Secondary Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#0F2030] hover:bg-[#1E3A52] rounded-md transition-all shadow-md hover:shadow-lg active:scale-98 border border-[#0F2030]"
                  >
                    <span>Admissions 2026–2027</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <a
                    href="#academics"
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#0F2030] hover:bg-[#0F2030]/5 rounded-md transition-colors border border-[#0F2030]/25 bg-white/70 backdrop-blur-xs shadow-xs"
                  >
                    <span>View Curriculum</span>
                    <ChevronRight className="w-4 h-4 text-[#2B5B84]" />
                  </a>
                </div>

                {/* Operational Quick Stats / Fact Strip */}
                <div className="pt-8 border-t border-[#0F2030]/15 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#2B5B84] font-semibold">
                      Curriculum
                    </span>
                    <span className="font-serif text-lg font-bold text-[#0F2030]">
                      SEBA Board
                    </span>
                    <span className="block text-[11px] text-[#728495]">
                      English Medium · Co-ed
                    </span>
                  </div>

                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#2B5B84] font-semibold">
                      Academic Scope
                    </span>
                    <span className="font-serif text-lg font-bold text-[#0F2030]">
                      Grades 1 – 10
                    </span>
                    <span className="block text-[11px] text-[#728495]">
                      Primary to High School
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#2B5B84] font-semibold">
                      School Hours
                    </span>
                    <span className="font-serif text-lg font-bold text-[#0F2030]">
                      8:00 AM – 2:00 PM
                    </span>
                    <span className="block text-[11px] text-[#728495]">
                      Monday to Saturday
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Three.js Interactive Architectural Scene (5 cols) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="w-full bg-white/85 backdrop-blur-md rounded-2xl p-2 border border-[#89ACC7]/30 shadow-xl">
                  <Hero3DScene />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OFFICIAL INSTITUTIONAL NOTICE BOARD BANNER                             */}
        {/* ========================================================================= */}
        <section className="bg-[#FAF8F5] text-[#0F2030] py-3.5 px-4 sm:px-8 shadow-xs border-y border-[#89ACC7]/25">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1 rounded-sm bg-[#994D7A] text-white">
                <Bell className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono uppercase tracking-wider text-[#994D7A] font-semibold text-[11px]">
                Official Notice:
              </span>
              <span className="text-[#0F2030] font-medium">Admissions Enquiry Desk is currently open for Academic Session 2026–2027 (Grades 1 to 10).</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="text-[#2B5B84] hover:text-[#0F2030] underline font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Register Enquiry</span>
                <ArrowRight className="w-3 h-3 text-[#2B5B84]" />
              </button>
              <span className="text-[#89ACC7]/50">|</span>
              <a href="tel:+918133966530" className="text-[#0F2030] hover:text-[#2B5B84] transition-colors font-semibold">
                Helpline: +91 81339 66530
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ABOUT US: Heritage, MSMHC Governance & Philosophy                      */}
        {/* ========================================================================= */}
        <section id="about" className="py-20 lg:py-28 border-b border-[#C48D92]/30 dark:border-[#FAF8F5]/15 bg-[#FAF8F5] dark:bg-[#0A1622]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Section Header */}
            <div className="max-w-2xl mb-16">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#0F2030] dark:text-[#994D7A] font-semibold">
                  01 · Institutional Heritage & Mission
                </span>
                <span className="w-8 h-[1px] bg-[#994D7A]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2030] dark:text-[#FAF8F5]">
                Founded on Service, Character & Intellectual Enlightenment
              </h2>
            </div>

            {/* Editorial 2-Column Story */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: MSMHC Story (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-[#0F2030] dark:text-[#FAF8F5] text-base leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#0F2030] dark:first-letter:text-[#994D7A]">
                  St. Mary&apos;s High School, Jorhat, is managed and administered by the
                  <strong> Missionary Sisters of Mary Help of Christians (MSMHC)</strong>, an indigenous religious
                  congregation founded on October 24, 1942, in Guwahati, Assam, by the Venerable Stephen Ferrando, SDB,
                  then Bishop of Shillong. The congregation has dedicated over eight decades to advancing educational access,
                  empowering young minds, and fostering ethical integrity throughout North East India.
                </p>

                <p className="text-[#475B6E] dark:text-[#C8D9E8]">
                  Situated in the tranquil surroundings of Jamuguri, Rowriah, the school provides an atmosphere free from
                  urban congestion, allowing students from diverse backgrounds across the Jorhat district to flourish in an
                  environment of mutual respect, disciplined study, and deep civic responsibility.
                </p>

                <div className="p-5 rounded-lg bg-[#DCE8F2]/60 dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F2030] dark:text-[#994D7A] font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#994D7A]" />
                    <span>Fact & Governance Transparency</span>
                  </div>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                    St. Mary&apos;s High School is recognized by the Department of School Education, Government of Assam,
                    and follows the curriculum established by the Board of Secondary Education, Assam (SEBA).
                    Official administrative contact is verified through the Rowriah campus office desk.
                  </p>
                </div>
              </div>

              {/* Right Column: 4 Foundational Pillars (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5] pb-2 border-b border-[#C48D92]/30 dark:border-[#FAF8F5]/15">
                  Core Educational Pillars
                </h3>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-1 shadow-xs">
                    <span className="font-mono text-xs text-[#994D7A] dark:text-[#C48D92] font-semibold">
                      01 / Moral Grounding
                    </span>
                    <h4 className="font-serif font-semibold text-[#0F2030] dark:text-[#FAF8F5]">
                      Value-Centered Education
                    </h4>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                      Nurturing integrity, truthfulness, empathy, and respect for every human person regardless of community or faith.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-1 shadow-xs">
                    <span className="font-mono text-xs text-[#994D7A] dark:text-[#C48D92] font-semibold">
                      02 / Academic Discipline
                    </span>
                    <h4 className="font-serif font-semibold text-[#0F2030] dark:text-[#FAF8F5]">
                      Conceptual Rigor & Curiosity
                    </h4>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                      Cultivating critical inquiry, scientific reasoning, and linguistic clarity in English, Assamese, and Hindi.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-1 shadow-xs">
                    <span className="font-mono text-xs text-[#994D7A] dark:text-[#C48D92] font-semibold">
                      03 / Cultural Harmony
                    </span>
                    <h4 className="font-serif font-semibold text-[#0F2030] dark:text-[#FAF8F5]">
                      Assam&apos;s Rich Heritage
                    </h4>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                      Celebrating the composite cultural traditions of the Brahmaputra Valley, from Bihu to national observances.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-1 shadow-xs">
                    <span className="font-mono text-xs text-[#994D7A] dark:text-[#C48D92] font-semibold">
                      04 / Social Responsibility
                    </span>
                    <h4 className="font-serif font-semibold text-[#0F2030] dark:text-[#FAF8F5]">
                      Compassion in Action
                    </h4>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                      Encouraging community service, environmental stewardship, and care for the vulnerable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ACADEMICS: Curriculum, SEBA Framework, Daily Rhythm                    */}
        {/* ========================================================================= */}
        <section id="academics" className="py-20 lg:py-28 bg-[#DCE8F2] text-[#0F2030] border-b border-[#89ACC7]/25 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Section Header with Oversized Chapter Numeral */}
            <div className="max-w-3xl mb-12">
              <div className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0F2030] opacity-30 select-none leading-none mb-3">02</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#0F2030] font-semibold">Academic Structure & Pedagogy</span><span className="w-8 h-[1px] bg-[#0F2030]" />
              </div>
              <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#0F2030] leading-[1.04] text-balance">A Structured Curriculum for <span className="text-[#132638] italic font-normal">Holistic Intellectual Growth</span></h2>
              <p className="text-sm text-[#475B6E] dark:text-[#C8D9E8] mt-2 leading-relaxed">
                St. Mary&apos;s School implements the official State Board syllabus of the Board of Secondary Education, Assam (SEBA),
                taught in English medium with continuous formative assessments and dedicated teacher mentorship.
              </p>
            </div>

            {/* Interactive Academic Wing Tabs */}
            <div className="flex items-center gap-2.5 pb-6 border-b border-[#0F2030]/15 overflow-x-auto">
              <button
                onClick={() => setActiveAcademicTab('primary')}
                className={`px-4 py-2.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeAcademicTab === 'primary' ? 'bg-[#0F2030] text-[#FAF8F5] font-semibold shadow-md border border-[#0F2030]' : 'bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#0F2030] border border-[#89ACC7]/30'
                }`}
              >
                Primary Wing (Grades 1–5)
              </button>

              <button
                onClick={() => setActiveAcademicTab('middle')}
                className={`px-4 py-2.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeAcademicTab === 'middle' ? 'bg-[#0F2030] text-[#FAF8F5] font-semibold shadow-md border border-[#0F2030]' : 'bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#0F2030] border border-[#89ACC7]/30'
                }`}
              >
                Middle School (Grades 6–8)
              </button>

              <button
                onClick={() => setActiveAcademicTab('secondary')}
                className={`px-4 py-2.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeAcademicTab === 'secondary' ? 'bg-[#0F2030] text-[#FAF8F5] font-semibold shadow-md border border-[#0F2030]' : 'bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#0F2030] border border-[#89ACC7]/30'
                }`}
              >
                High School / SEBA Board (Grades 9–10)
              </button>
            </div>

            {/* Academic Tab Content */}
            <div className="pt-8">
              {activeAcademicTab === 'primary' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Primary Wing: Foundational Wonder & Joyful Literacy
                    </h3>
                    <p className="text-sm text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                      In the primary grades (Class 1 to 5), the curriculum is designed to stimulate natural curiosity and build rock-solid foundational literacy in English, arithmetic, and native language appreciation. Children learn in nurturing, communicative classrooms where confidence and moral empathy are cultivated early.
                    </p>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#0F2030]/15 shadow-sm text-[#0F2030]">
                        <span className="font-semibold block text-[#0F2030] dark:text-[#FAF8F5] mb-1 font-serif">
                          Core Subject Areas
                        </span>
                        <ul className="space-y-1 text-[#475B6E] dark:text-[#C8D9E8] list-disc list-inside">
                          <li>English Prose, Poetry & Phonics</li>
                          <li>Foundational Mathematics & Mental Arithmetic</li>
                          <li>Environmental Studies (EVS)</li>
                          <li>Vernacular Language (Assamese / Hindi)</li>
                          <li>Moral Science & Value Education</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#0F2030]/15 shadow-sm text-[#0F2030]">
                        <span className="font-semibold block text-[#0F2030] dark:text-[#FAF8F5] mb-1 font-serif">
                          Creative & Physical Growth
                        </span>
                        <ul className="space-y-1 text-[#475B6E] dark:text-[#C8D9E8] list-disc list-inside">
                          <li>Art, Drawing & Craftwork</li>
                          <li>Action Songs, Recitation & Rhymes</li>
                          <li>Physical Education & Group Games</li>
                          <li>Reading Habit & Story Hours</li>
                          <li>Civic Manners & Hygiene Habits</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-xl border border-[#0F2030]/15 space-y-4 shadow-sm text-[#0F2030]">
                    <h4 className="font-serif text-base font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Primary Wing Highlights
                    </h4>
                    <ul className="space-y-3 text-xs text-[#475B6E] dark:text-[#C8D9E8]">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#28624E] dark:text-[#388E6C] shrink-0 mt-0.5" />
                        <span>Gentle, child-centric classroom pace without intimidating examination pressure.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#28624E] dark:text-[#388E6C] shrink-0 mt-0.5" />
                        <span>Strong emphasis on spoken English fluency and clean handwriting.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#28624E] dark:text-[#388E6C] shrink-0 mt-0.5" />
                        <span>Regular parent-teacher dialogues to support individual student learning habits.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeAcademicTab === 'middle' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Middle School: Analytical Discovery & Skill Expansion
                    </h3>
                    <p className="text-sm text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                      Grades 6 through 8 mark the transition from foundational learning into formal analytical subjects. Students engage with structured sciences, algebra and geometry, history and geography, and introductory information technology.
                    </p>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#0F2030]/15 shadow-sm text-[#0F2030]">
                        <span className="font-semibold block text-[#0F2030] dark:text-[#FAF8F5] mb-1 font-serif">
                          Curricular Focus
                        </span>
                        <ul className="space-y-1 text-[#475B6E] dark:text-[#C8D9E8] list-disc list-inside">
                          <li>English Literature & Advanced Grammar</li>
                          <li>General Science (Physics, Chemistry, Biology concepts)</li>
                          <li>Mathematics (Arithmetic, Algebra, Geometry)</li>
                          <li>Social Sciences (History, Civics, Geography)</li>
                          <li>Regional Language Proficiency</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#0F2030]/15 shadow-sm text-[#0F2030]">
                        <span className="font-semibold block text-[#0F2030] dark:text-[#FAF8F5] mb-1 font-serif">
                          Practical Competencies
                        </span>
                        <ul className="space-y-1 text-[#475B6E] dark:text-[#C8D9E8] list-disc list-inside">
                          <li>Computer Literacy & Hands-on Lab Sessions</li>
                          <li>Project Submissions & Science Exhibitions</li>
                          <li>Debates, Elocution & Essay Writing</li>
                          <li>Physical Training & Inter-House Sports</li>
                          <li>Environmental Clubs & Field Observations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-xl border border-[#0F2030]/15 space-y-4 shadow-sm text-[#0F2030]">
                    <h4 className="font-serif text-base font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Middle Wing Development
                    </h4>
                    <ul className="space-y-3 text-xs text-[#475B6E] dark:text-[#C8D9E8]">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#28624E] dark:text-[#388E6C] shrink-0 mt-0.5" />
                        <span>Dedicated teachers fostering self-study and independent inquiry.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#28624E] dark:text-[#388E6C] shrink-0 mt-0.5" />
                        <span>Integration into school House leadership and sports squads.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#28624E] dark:text-[#388E6C] shrink-0 mt-0.5" />
                        <span>Term assessments structured to prepare students for board-level rigor.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeAcademicTab === 'secondary' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      High School: Board Preparation & Character Maturity
                    </h3>
                    <p className="text-sm text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                      Grades 9 and 10 represent the culmination of secondary schooling under the Board of Secondary Education, Assam (SEBA). The program combines thorough textbook mastery with regular laboratory practicals, sample board question analysis, and individualized remedial classes for board candidates.
                    </p>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#0F2030]/15 shadow-sm text-[#0F2030]">
                        <span className="font-semibold block text-[#0F2030] dark:text-[#FAF8F5] mb-1 font-serif">
                          SEBA Core Subjects
                        </span>
                        <ul className="space-y-1 text-[#475B6E] dark:text-[#C8D9E8] list-disc list-inside">
                          <li>English (First / Second Language)</li>
                          <li>General Science (Physics, Chemistry & Biology)</li>
                          <li>General Mathematics & Advanced Electives</li>
                          <li>Social Science (History, Geography, Political Science, Economics)</li>
                          <li>MIL (Modern Indian Language) / Alternative English</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#0F2030]/15 shadow-sm text-[#0F2030]">
                        <span className="font-semibold block text-[#0F2030] dark:text-[#FAF8F5] mb-1 font-serif">
                          Examination Support
                        </span>
                        <ul className="space-y-1 text-[#475B6E] dark:text-[#C8D9E8] list-disc list-inside">
                          <li>Unit Tests, Half-Yearly & Pre-Board Mock Exams</li>
                          <li>Structured Science Laboratory practical records</li>
                          <li>Career counseling & higher secondary guidance</li>
                          <li>Moral science workshops & leadership roles</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-xl border border-[#0F2030]/15 space-y-4 shadow-sm text-[#0F2030]">
                    <h4 className="font-serif text-base font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Daily School Schedule
                    </h4>
                    <div className="space-y-2.5 text-xs font-mono text-[#475B6E] dark:text-[#C8D9E8]">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#C48D92]/30 dark:border-[#FAF8F5]/15">
                        <span className="text-[#0F2030] dark:text-[#994D7A] font-semibold">08:00 AM – 08:20 AM</span>
                        <span className="font-sans font-medium text-[#0F2030] dark:text-[#FAF8F5]">Morning Assembly & Prayer</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#C48D92]/30 dark:border-[#FAF8F5]/15">
                        <span className="text-[#0F2030] dark:text-[#994D7A] font-semibold">08:20 AM – 11:00 AM</span>
                        <span className="font-sans font-medium text-[#0F2030] dark:text-[#FAF8F5]">Instructional Periods 1 – 4</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#C48D92]/30 dark:border-[#FAF8F5]/15">
                        <span className="text-[#0F2030] dark:text-[#994D7A] font-semibold">11:00 AM – 11:30 AM</span>
                        <span className="font-sans font-medium text-[#0F2030] dark:text-[#FAF8F5]">Midday Recess & Refreshment</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#C48D92]/30 dark:border-[#FAF8F5]/15">
                        <span className="text-[#0F2030] dark:text-[#994D7A] font-semibold">11:30 AM – 01:50 PM</span>
                        <span className="font-sans font-medium text-[#0F2030] dark:text-[#FAF8F5]">Periods 5 – 7 & Lab Practical</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#0F2030] dark:text-[#994D7A] font-semibold">02:00 PM</span>
                        <span className="font-sans font-medium text-[#0F2030] dark:text-[#FAF8F5]">Orderly Dispersal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ACADEMIC RESULTS: Classes 1 to 12 & Board Distinctions                 */}
        {/* ========================================================================= */}
        <AcademicResultsSection />

        {/* ========================================================================= */}
        {/* 5. CAMPUS: Purpose-Built Facilities in Jamuguri, Rowriah                  */}
        {/* ========================================================================= */}
        <section id="campus" className="py-20 lg:py-28 bg-[#994D7A] text-[#FAF8F5] border-b border-[#DCE8F2]/20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Section Header with Oversized Chapter Numeral */}
            <div className="max-w-3xl mb-16">
              <div className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF8F5] opacity-35 select-none leading-none mb-3">04</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#DCE8F2] font-semibold">Campus Facilities & Architecture</span><span className="w-8 h-[1px] bg-[#DCE8F2]" />
              </div>
              <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#FAF8F5] leading-[1.04] text-balance">Purpose-Built Facilities in <span className="text-[#DCE8F2] italic font-normal">Jamuguri, Rowriah</span></h2>
              <p className="text-base text-[#FAF8F5]/85 mt-2 leading-relaxed max-w-2xl font-sans">St. Mary&apos;s campus offers a quiet, safe, and green learning atmosphere in Jorhat with well-maintained academic infrastructure, laboratories, sports grounds, and reading spaces.</p>
            </div>

            {/* Asymmetric Facility Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Facility 1: Science Lab */}
              <div className="group rounded-xl overflow-hidden bg-[#FAF8F5] text-[#0F2030] border border-[#FAF8F5]/20 shadow-xl flex flex-col hover:scale-[1.01] transition-all">
                <div className="relative aspect-4/3 overflow-hidden bg-[#DCE8F2] dark:bg-[#172F44]">
                  <Image
                    src="/images/science_lab_1790957656204.jpg"
                    alt="Science Laboratories at St. Mary's School Jorhat"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F2030]/95 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs border border-[#994D7A]/30">
                    Laboratories
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Secondary Science Laboratories
                    </h3>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed mt-1">
                      Equipped with physical science apparatus, chemical reagents, and biological specimens to provide practical experience for SEBA board requirements.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#C48D92]/30/60 dark:border-[#FAF8F5]/15 text-[11px] font-mono text-[#728495] dark:text-[#8AA4BC]">
                    Physics · Chemistry · Biology
                  </div>
                </div>
              </div>

              {/* Facility 2: Library */}
              <div className="group rounded-xl overflow-hidden bg-[#FAF8F5] text-[#0F2030] border border-[#FAF8F5]/20 shadow-xl flex flex-col hover:scale-[1.01] transition-all">
                <div className="relative aspect-4/3 overflow-hidden bg-[#DCE8F2] dark:bg-[#172F44]">
                  <Image
                    src="/images/academic_library_1790957642997.jpg"
                    alt="Academic Library and Reading Room"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F2030]/95 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs border border-[#994D7A]/30">
                    Library
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Library & Reading Room
                    </h3>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed mt-1">
                      Houses a curated collection of reference books, classic children&apos;s literature, periodicals, and quiet study alcoves to instill lifelong reading habits.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#C48D92]/30/60 dark:border-[#FAF8F5]/15 text-[11px] font-mono text-[#728495] dark:text-[#8AA4BC]">
                    Reference · Fiction · Periodicals
                  </div>
                </div>
              </div>

              {/* Facility 3: Sports Ground */}
              <div className="group rounded-xl overflow-hidden bg-[#FAF8F5] text-[#0F2030] border border-[#FAF8F5]/20 shadow-xl flex flex-col hover:scale-[1.01] transition-all">
                <div className="relative aspect-4/3 overflow-hidden bg-[#DCE8F2] dark:bg-[#172F44]">
                  <Image
                    src="/images/sports_ground_1790957667679.jpg"
                    alt="Outdoor Athletic Playfields"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F2030]/95 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs border border-[#994D7A]/30">
                    Athletics
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Playground & Sports Field
                    </h3>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed mt-1">
                      Spacious open grounds for daily physical training, annual athletic meets, football, volleyball, badminton, and marching drill practices.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#C48D92]/30/60 dark:border-[#FAF8F5]/15 text-[11px] font-mono text-[#728495] dark:text-[#8AA4BC]">
                    Football · Volleyball · Track Events
                  </div>
                </div>
              </div>

              {/* Facility 4: Cultural Auditorium */}
              <div className="group rounded-xl overflow-hidden bg-[#FAF8F5] text-[#0F2030] border border-[#FAF8F5]/20 shadow-xl flex flex-col hover:scale-[1.01] transition-all">
                <div className="relative aspect-4/3 overflow-hidden bg-[#DCE8F2] dark:bg-[#172F44]">
                  <Image
                    src="/images/cultural_hall_1790957680357.jpg"
                    alt="School Assembly and Cultural Dais"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F2030]/95 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs border border-[#994D7A]/30">
                    Assembly
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Assembly & Cultural Hall
                    </h3>
                    <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed mt-1">
                      A central hall for morning reflections, public speaking competitions, inter-house debates, celebrations, and festive assemblies.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#C48D92]/30/60 dark:border-[#FAF8F5]/15 text-[11px] font-mono text-[#728495] dark:text-[#8AA4BC]">
                    Elocution · Assemblies · Festivals
                  </div>
                </div>
              </div>

              {/* Facility 5: Digital Education & IT Lab */}
              <div className="group rounded-xl overflow-hidden bg-[#FAF8F5] text-[#0F2030] border border-[#FAF8F5]/20 shadow-xl flex flex-col justify-between p-6 hover:scale-[1.01] transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F2030] text-[#FAF8F5] dark:bg-[#172F44] dark:text-[#994D7A] flex items-center justify-center border border-[#994D7A]/30">
                    <Compass className="w-5 h-5 text-[#994D7A]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                    Digital Learning & Computer Education
                  </h3>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                    Dedicated computer stations providing students with practical computational thinking, keyboard skills, basic programming logic, and safe internet awareness under guided faculty supervision.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#C48D92]/30/60 dark:border-[#FAF8F5]/15 text-[11px] font-mono text-[#728495] dark:text-[#8AA4BC]">
                  IT Curriculum · Hands-On Practice
                </div>
              </div>

              {/* Facility 6: Campus Safety & Health Infrastructure */}
              <div className="group rounded-xl overflow-hidden bg-[#FAF8F5] text-[#0F2030] border border-[#FAF8F5]/20 shadow-xl flex flex-col justify-between p-6 hover:scale-[1.01] transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F2030] text-[#FAF8F5] dark:bg-[#172F44] dark:text-[#994D7A] flex items-center justify-center border border-[#994D7A]/30">
                    <ShieldCheck className="w-5 h-5 text-[#994D7A]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                    Safe, Sanitized & Eco-Friendly Grounds
                  </h3>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                    Certified UV/RO filtered drinking water stations, regular sanitation of washrooms, secure boundary perimeter, first-aid facility, and lush shaded gardens encouraging environmental respect.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#C48D92]/30/60 dark:border-[#FAF8F5]/15 text-[11px] font-mono text-[#728495] dark:text-[#8AA4BC]">
                  Pure Water · Perimeter Safety · Greenery
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CAMPUS & FACILITIES: Verified Environment & Laboratories               */}
        {/* ========================================================================= */}
        <section id="admissions" className="py-20 lg:py-28 border-b border-[#89ACC7]/25 bg-[#FAF8F5] text-[#0F2030]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Section Header with Oversized Chapter Numeral */}
            <div className="max-w-3xl mb-16">
              <div className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#89ACC7] opacity-40 select-none leading-none mb-3">05</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#89ACC7] font-semibold">Prospective Families & Admissions</span><span className="w-8 h-[1px] bg-[#89ACC7]" />
              </div>
              <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#0F2030] leading-[1.04] text-balance">Admissions Procedure & <span className="text-[#89ACC7] italic font-normal">Documentation</span></h2>
              <p className="text-sm text-[#475B6E] dark:text-[#C8D9E8] mt-2 leading-relaxed">
                Admissions to St. Mary&apos;s High School, Jorhat, for Academic Session 2026–2027 are conducted with complete transparency.
                We welcome prospective parents to review requirements and begin their enquiry.
              </p>
            </div>

            {/* 4-Step Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="p-6 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors relative space-y-3 shadow-xs">
                <span className="font-mono text-2xl font-bold text-[#994D7A] dark:text-[#C48D92]">
                  01
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                  Enquiry & Prospectus
                </h4>
                <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                  Submit online enquiry or collect the official school prospectus from the campus office in Rowriah.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors relative space-y-3 shadow-xs">
                <span className="font-mono text-2xl font-bold text-[#994D7A] dark:text-[#C48D92]">
                  02
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                  Document Submission
                </h4>
                <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                  Submit required certificates (Birth certificate, marksheets, transfer certificate) at the administration office.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors relative space-y-3 shadow-xs">
                <span className="font-mono text-2xl font-bold text-[#994D7A] dark:text-[#C48D92]">
                  03
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                  Interaction / Assessment
                </h4>
                <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                  Foundational informal interaction for Primary grades; diagnostic assessment in English and Math for higher grades.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors relative space-y-3 shadow-xs">
                <span className="font-mono text-2xl font-bold text-[#994D7A] dark:text-[#C48D92]">
                  04
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                  Enrollment & Induction
                </h4>
                <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                  Confirmation of admission, fee verification, student ID generation, uniform guide, and welcome session.
                </p>
              </div>
            </div>

            {/* Checklist & Direct Action Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#DCE8F2]/60 dark:bg-[#0F2030] p-8 rounded-xl border border-[#C48D92]/30 dark:border-[#FAF8F5]/15">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F2030] dark:text-[#994D7A] font-semibold">
                  <FileCheck className="w-4 h-4 text-[#994D7A]" />
                  <span>Mandatory Documentation Checklist</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                  Ready to Apply for Session 2026–2027?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0F2030] dark:text-[#FAF8F5]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F2030] dark:text-[#994D7A] font-bold">✓</span>
                    <span>Birth Certificate (Municipal / Registrar)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F2030] dark:text-[#994D7A] font-bold">✓</span>
                    <span>Transfer Certificate (Original from previous school)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F2030] dark:text-[#994D7A] font-bold">✓</span>
                    <span>Recent Passport Photographs (4 copies)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F2030] dark:text-[#994D7A] font-bold">✓</span>
                    <span>Previous Academic Year Marksheet / Report Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F2030] dark:text-[#994D7A] font-bold">✓</span>
                    <span>Proof of Residence / Address (Aadhaar / Voter ID)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F2030] dark:text-[#994D7A] font-bold">✓</span>
                    <span>Immunization / Health Card Copy (Primary entry)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-start lg:items-end">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#0F2030] hover:bg-[#994D7A] dark:bg-[#994D7A] dark:text-[#0A1622] dark:hover:bg-[#C48D92] rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 border border-transparent dark:border-[#C48D92]/40"
                >
                  <span>Open Online Enquiry Form</span>
                  <ArrowRight className="w-4 h-4 text-[#994D7A] dark:text-[#0A1622]" />
                </button>
                <span className="text-xs text-[#475B6E] dark:text-[#C8D9E8] font-mono text-center lg:text-right">
                  Or call the office at +91 81339 66530
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. STUDENT LIFE: House System, Traditions, Outreach                       */}
        {/* ========================================================================= */}
        <section id="student-life" className="py-20 lg:py-28 border-b border-[#89ACC7]/25 bg-[#FAF8F5] text-[#0F2030]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Section Header with Oversized Chapter Numeral */}
            <div className="max-w-3xl mb-16">
              <div className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#994D7A] opacity-35 select-none leading-none mb-3">
                06
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#994D7A] font-semibold">
                  Student Life & House Traditions
                </span>
                <span className="w-8 h-[1px] bg-[#994D7A]" />
              </div>
              <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#0F2030] leading-[1.04] text-balance">
                Character Formation Beyond the <span className="text-[#994D7A] italic font-normal">Classroom</span>
              </h2>
              <p className="text-base text-[#475B6E] mt-2 leading-relaxed max-w-2xl font-sans">
                Education at St. Mary&apos;s transcends classroom instruction. Through our house system, celebrations,
                and social service initiatives, each child learns teamwork, moral discernment, and mutual respect.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* House System (6 cols) */}
              <div className="lg:col-span-6 bg-white dark:bg-[#0F2030] p-8 rounded-xl border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 space-y-6 shadow-xs">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#994D7A] font-semibold">
                    House System
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2030] dark:text-[#FAF8F5] mt-1">
                    Fostering Healthy Loyalty & Teamwork
                  </h3>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] mt-2 leading-relaxed">
                    Students are grouped into four traditional school houses under dedicated house teachers and student captains. Points are earned through academics, sports, discipline, and cultural participation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#0F2030] border border-[#C48D92]/50">
                    <span className="text-xs font-bold text-[#963548] dark:text-[#C48D92] block font-serif">Red House</span>
                    <span className="text-[11px] text-[#475B6E] dark:text-[#C8D9E8]">Courage & Conviction</span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#0F2030] border border-[#0F2030]/20 dark:border-[#FAF8F5]/20">
                    <span className="text-xs font-bold text-[#0F2030] dark:text-[#FAF8F5] block font-serif">Blue House</span>
                    <span className="text-[11px] text-[#475B6E] dark:text-[#C8D9E8]">Loyalty & Truth</span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#0F2030] border border-[#28624E]/30 dark:border-[#388E6C]/30">
                    <span className="text-xs font-bold text-[#28624E] dark:text-[#388E6C] block font-serif">Green House</span>
                    <span className="text-[11px] text-[#475B6E] dark:text-[#C8D9E8]">Perseverance & Growth</span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF8F5] dark:bg-[#0F2030] border border-[#994D7A]/40 dark:border-[#994D7A]/40">
                    <span className="text-xs font-bold text-[#994D7A] dark:text-[#C48D92] block font-serif">Yellow House</span>
                    <span className="text-[11px] text-[#475B6E] dark:text-[#C8D9E8]">Wisdom & Cheerfulness</span>
                  </div>
                </div>
              </div>

              {/* Annual Traditions & Celebrations (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#994D7A]" />
                    <h4 className="font-serif font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Rongali & Bhogali Bihu Observance
                    </h4>
                  </div>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                    Honoring Assam&apos;s agrarian heartbeat with traditional dhol-pepa performances, folk songs, ethnic dress presentations, and regional delicacies prepared by student clubs.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#994D7A]" />
                    <h4 className="font-serif font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Annual Sports Week & Drill Display
                    </h4>
                  </div>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                    A three-day athletic festival featuring track sprints, relay races, high and long jumps, tug-of-war, and synchronized marching contingents.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-[#994D7A]" />
                    <h4 className="font-serif font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Science & Social Studies Exhibition
                    </h4>
                  </div>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                    Working models on renewable solar energy, tea garden ecosystem biology, rainwater harvesting, and Assam historical heritage monuments created by students.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 hover:border-[#994D7A]/70 transition-colors space-y-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#994D7A]" />
                    <h4 className="font-serif font-bold text-[#0F2030] dark:text-[#FAF8F5]">
                      Social Outreach & Environmental Care
                    </h4>
                  </div>
                  <p className="text-xs text-[#475B6E] dark:text-[#C8D9E8] leading-relaxed">
                    In keeping with the MSMHC founding vision, students participate in campus tree-planting drives, clean-up activities, and sharing with disadvantaged neighbor schools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PARENT & ALUMNI TESTIMONIALS: Voices of Trust & Gratitude             */}
        {/* ========================================================================= */}
        <TestimonialsSlider />

        {/* ========================================================================= */}
        {/* 8. GALLERY: Filterable Grid with Enlarged Lightbox View                    */}
        {/* ========================================================================= */}
        <section id="gallery" className="py-20 lg:py-28 border-b border-[#89ACC7]/25 bg-[#FAF8F5] text-[#0F2030]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#994D7A] font-semibold">
                    Visual Archive · St. Mary&apos;s
                  </span>
                  <span className="w-8 h-[1px] bg-[#994D7A]" />
                </div>
                <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#0F2030] leading-[1.04] text-balance">
                  Life at St. Mary&apos;s <span className="text-[#994D7A] italic font-normal">School</span>
                </h2>
                <p className="text-base text-[#475B6E] mt-2 leading-relaxed font-sans">
                  Moments from our campus grounds, scholastic halls, science laboratories, and athletic fields.
                </p>
              </div>

              {/* Segmented Filter Controls */}
              <div className="flex items-center gap-1.5 p-1 bg-[#DCE8F2] dark:bg-[#0F2030] rounded-lg overflow-x-auto border border-[#C48D92]/30 dark:border-[#FAF8F5]/15">
                {['all', 'Campus', 'Academic', 'Laboratories', 'Sports', 'Cultural'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat.toLowerCase())}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      galleryFilter === cat.toLowerCase()
                        ? 'bg-white text-[#0F2030] dark:bg-[#172F44] dark:text-[#FAF8F5] shadow-xs font-semibold'
                        : 'text-[#475B6E] dark:text-[#C8D9E8] hover:text-[#0F2030] dark:hover:text-[#FAF8F5]'
                    }`}
                  >
                    {cat === 'all' ? 'All Images' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="group relative rounded-xl overflow-hidden bg-[#DCE8F2] dark:bg-[#0F2030] border border-[#C48D92]/30 dark:border-[#FAF8F5]/15 cursor-pointer shadow-xs hover:shadow-md hover:border-[#994D7A]/70 transition-all"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLightboxItem(item);
                    }
                  }}
                  aria-label={`View enlarged image: ${item.title}`}
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1622]/80 via-[#0A1622]/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-3 left-3 bg-[#0A1622]/80 text-[#FAF8F5] text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs border border-[#994D7A]/30">
                      {item.category}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-[#FAF8F5]">
                      <h4 className="font-serif text-base font-semibold leading-tight drop-shadow-xs">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#C8D9E8] line-clamp-1 mt-0.5 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. CONTACT & CAMPUS LOCATION: Route, Operating Hours, Form               */}
        {/* ========================================================================= */}
        <section id="contact" className="relative overflow-hidden py-20 lg:py-28 border-b border-[#89ACC7]/25 bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-[#F5F2EB] text-[#0F2030]">
          {/* Artisan Flakes of Green, Blue, Red and Gold on White & Ivory */}
          <ArtisanFlakesBackground />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
            {/* Section Header with Oversized Chapter Numeral */}
            <div className="max-w-3xl mb-16">
              <div className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#89ACC7] opacity-40 select-none leading-none mb-3">
                07
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#2B5B84] font-semibold">
                  Communication & Campus Location
                </span>
                <span className="w-8 h-[1px] bg-[#2B5B84]" />
              </div>
              <h2 className="font-serif font-bold text-[clamp(2.4rem,5vw,4.8rem)] tracking-tight text-[#0F2030] leading-[1.04] text-balance">
                Visiting St. Mary&apos;s School in <span className="text-[#2B5B84] italic font-normal">Rowriah, Jorhat</span>
              </h2>
              <p className="text-base text-[#475B6E] mt-2 leading-relaxed max-w-2xl font-sans">
                Parents, alumni, and guardians are welcome to visit our administrative office in Rowriah during official operating hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Official Contact Card (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-xl bg-white/95 backdrop-blur-md border border-[#89ACC7]/30 space-y-6 shadow-md text-[#0F2030]">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0F2030]">St. Mary&apos;s High School</h3>
                    <p className="text-xs text-[#2B5B84] font-mono mt-0.5">SEBA Affiliation · Managed by MSMHC</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#2B5B84] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#0F2030] font-serif">Campus Address</span>
                        <p className="text-[#475B6E] mt-0.5 leading-relaxed">Jamuguri, Rowriah, Jorhat, Assam 785004 / 785006, India.</p>
                        <span className="text-[11px] text-[#728495] font-mono block mt-1">
                          Landmark: Near Rowriah Airport / AT Road corridor
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#2B5B84] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#0F2030] font-serif">Helpline / Office Desk</span>
                        <a
                          href="tel:+918133966530"
                          className="text-[#0F2030] hover:text-[#2B5B84] font-mono font-medium hover:underline text-sm block mt-0.5"
                        >
                          +91 81339 66530
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#2B5B84] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#0F2030] font-serif">Institutional Correspondence</span>
                        <a
                          href="mailto:stmarysjorhat@gmail.com"
                          className="text-[#475B6E] hover:text-[#0F2030] hover:underline block mt-0.5 font-mono"
                        >
                          stmarysjorhat@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#2B5B84] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#0F2030] font-serif">Office Working Hours</span>
                        <p className="text-[#475B6E] mt-0.5 leading-relaxed font-mono">Monday to Saturday: 8:00 AM – 2:00 PM<br />Sunday & Notified Government Holidays: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Guidance Note */}
                <div className="p-4 rounded-lg bg-white/80 backdrop-blur-xs border border-[#89ACC7]/25 text-xs text-[#475B6E] leading-relaxed shadow-xs">
                  <span className="font-semibold text-[#0F2030] block mb-1">
                    Visitor Advisory:
                  </span>
                  Parents visiting for fee submission, prospectus collection, or interaction with school authorities are requested to arrive between 8:30 AM and 1:00 PM on weekdays.
                </div>
              </div>

              {/* Right Column: Quick Contact Enquiry Form (7 cols) */}
              <div className="lg:col-span-7 bg-white/95 backdrop-blur-md p-8 rounded-xl border border-[#89ACC7]/30 shadow-xl text-[#0F2030]">
                <h3 className="font-serif text-2xl font-bold text-[#0F2030] mb-2">Send a Direct Message to the Office Desk</h3>
                <p className="text-xs text-[#475B6E] mb-6 leading-relaxed">Have a question regarding school transport, class syllabus, transfer certificates, or school timings? Fill in your message below.</p>

                {contactSubmitted ? (
                  <div className="p-6 rounded-lg bg-[#DCE8F2]/60 border border-[#89ACC7]/35 space-y-3">
                    <div className="flex items-center gap-2 text-[#28624E]">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold text-sm">Message Recorded</span>
                    </div>
                    <p className="text-xs text-[#0F2030] leading-relaxed">
                      Thank you, <strong>{contactForm.name}</strong>. Your message regarding &ldquo;{contactForm.subject}&rdquo; has been logged for our school office desk. For urgent queries, please call us directly at <strong>+91 81339 66530</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({
                          name: '',
                          phone: '',
                          email: '',
                          subject: 'General Enquiry',
                          message: '',
                        });
                      }}
                      className="text-xs text-[#2B5B84] font-semibold underline pt-2 hover:opacity-85"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {contactError && (
                      <div className="p-3 text-xs bg-[#FAF8F5] text-[#963548] rounded border border-[#963548]/40">
                        {contactError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#0F2030] mb-1">
                          Your Full Name <span className="text-[#963548]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/35 bg-[#FAF8F5] text-[#0F2030] focus:outline-hidden focus:ring-2 focus:ring-[#2B5B84]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#0F2030] mb-1">
                          Phone Number <span className="text-[#963548]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="10-digit mobile number"
                          className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/35 bg-[#FAF8F5] text-[#0F2030] focus:outline-hidden focus:ring-2 focus:ring-[#2B5B84] font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#0F2030] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/35 bg-[#FAF8F5] text-[#0F2030] focus:outline-hidden focus:ring-2 focus:ring-[#2B5B84]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#0F2030] mb-1">
                          Enquiry Subject
                        </label>
                        <select
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/35 bg-[#FAF8F5] text-[#0F2030] focus:outline-hidden focus:ring-2 focus:ring-[#2B5B84]"
                        >
                          <option value="General Enquiry">General Enquiry</option>
                          <option value="Admissions 2026-27">Admissions 2026–27</option>
                          <option value="Transfer Certificate">Transfer Certificate (TC)</option>
                          <option value="School Bus / Transport">School Bus / Transport Routes</option>
                          <option value="Fee Structure">Fee Information Desk</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#0F2030] mb-1">
                        Your Message / Question
                      </label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Please write your query clearly..."
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#89ACC7]/35 bg-[#FAF8F5] text-[#0F2030] focus:outline-hidden focus:ring-2 focus:ring-[#2B5B84]"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-[#475B6E] font-mono">
                        Desk Hours: Mon–Sat 8am–2pm
                      </span>
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F2030] hover:bg-[#1E3A52] rounded-md transition-colors shadow-sm"
                      >
                        Submit Query
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 10. REFINED EDITORIAL FOOTER WITH MANDATORY AURAXIN CREDIT                */}
      {/* ========================================================================= */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-[#F5F2EB] to-[#EDE7DD] text-[#0F2030] pt-16 pb-12 border-t border-[#89ACC7]/25">
        {/* Artisan Flakes on Footer */}
        <ArtisanFlakesBackground className="opacity-70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* School Lockup (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0F2030] text-[#FAF8F5] flex items-center justify-center font-serif font-bold text-lg border border-[#2B5B84]/50 shadow-xs">
                  SM
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F2030] tracking-tight">
                    St. Mary&apos;s High School
                  </h3>
                  <p className="text-xs text-[#2B5B84] font-mono font-medium">
                    Jamuguri, Rowriah, Jorhat, Assam
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#475B6E] leading-relaxed max-w-sm">
                A premier English-medium co-educational institution managed by the Congregation of the Missionary Sisters of Mary Help of Christians (MSMHC) and affiliated with the Board of Secondary Education, Assam (SEBA).
              </p>

              <div className="pt-2 text-[11px] font-mono text-[#2B5B84] font-semibold">
                School Timings: Mon – Sat 8:00 AM – 2:00 PM
              </div>
            </div>

            {/* Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-serif text-sm font-semibold text-[#0F2030] uppercase tracking-wider">
                Sections
              </h4>
              <ul className="space-y-2 text-xs text-[#475B6E]">
                <li><a href="#about" className="hover:text-[#2B5B84] transition-colors">About Us</a></li>
                <li><a href="#academics" className="hover:text-[#2B5B84] transition-colors">Curriculum & SEBA</a></li>
                <li><a href="#results" className="hover:text-[#2B5B84] transition-colors font-medium">Academic Results (1–12)</a></li>
                <li><a href="#campus" className="hover:text-[#2B5B84] transition-colors">Campus & Labs</a></li>
                <li><a href="#admissions" className="hover:text-[#2B5B84] transition-colors">Admissions 2026–27</a></li>
                <li><a href="#student-life" className="hover:text-[#2B5B84] transition-colors">Student Life</a></li>
                <li><a href="#testimonials" className="hover:text-[#2B5B84] transition-colors">Testimonials</a></li>
                <li><a href="#gallery" className="hover:text-[#2B5B84] transition-colors">Visual Gallery</a></li>
                <li><a href="#contact" className="hover:text-[#2B5B84] transition-colors">Contact Desk</a></li>
              </ul>
            </div>

            {/* Admissions & Governance (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-serif text-sm font-semibold text-[#0F2030] uppercase tracking-wider">
                Admissions
              </h4>
              <ul className="space-y-2 text-xs text-[#475B6E]">
                <li>
                  <button onClick={() => setEnquiryOpen(true)} className="hover:text-[#2B5B84] text-left transition-colors font-medium">
                    Online Enquiry Form
                  </button>
                </li>
                <li><a href="#admissions" className="hover:text-[#2B5B84] transition-colors">Required Documents</a></li>
                <li><a href="#admissions" className="hover:text-[#2B5B84] transition-colors">Admission Steps</a></li>
                <li><a href="#academics" className="hover:text-[#2B5B84] transition-colors">Daily Class Schedule</a></li>
                <li><a href="#about" className="hover:text-[#2B5B84] transition-colors">MSMHC Society</a></li>
              </ul>
            </div>

            {/* Verified Address & Helpline (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif text-sm font-semibold text-[#0F2030] uppercase tracking-wider">
                Contact Office
              </h4>
              <div className="space-y-2 text-xs text-[#475B6E] leading-relaxed font-mono">
                <p>
                  Jamuguri, Rowriah<br />
                  Jorhat, Assam – 785004 / 785006
                </p>
                <p>
                  Phone: <a href="tel:+918133966530" className="text-[#2B5B84] hover:underline font-semibold">+91 81339 66530</a>
                </p>
                <p>
                  Email: <a href="mailto:stmarysjorhat@gmail.com" className="text-[#0F2030] hover:text-[#2B5B84] hover:underline font-medium">stmarysjorhat@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Hairline Bar with Auraxin Credit shifted to left */}
          <div className="pt-8 border-t border-[#0F2030]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#728495]">
            {/* Exact Auraxin Credit on the left as requested */}
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[#475B6E]">Website by</span>
              <a
                href="https://auraxin.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2B5B84] hover:text-[#0F2030] underline underline-offset-2 transition-colors font-semibold"
              >
                Auraxin
              </a>
            </div>

            <div>
              © {new Date().getFullYear()} St. Mary&apos;s High School, Jorhat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* Interactive Admission Enquiry Modal */}
      <AdmissionEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      {/* Interactive Gallery Lightbox */}
      <GalleryLightbox
        item={activeLightboxItem}
        items={galleryItems}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(item) => setActiveLightboxItem(item)}
      />
    </div>
  );
}
