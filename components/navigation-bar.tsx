'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './theme-provider';
import { LiveClock } from './live-clock';
import { Sun, Moon, Menu, X, ArrowUpRight, GraduationCap } from 'lucide-react';

interface NavigationBarProps {
  onOpenEnquiry?: () => void;
}

export function NavigationBar({ onOpenEnquiry }: NavigationBarProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Academics', href: '#academics' },
    { label: 'Results', href: '#results' },
    { label: 'Campus', href: '#campus' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Student Life', href: '#student-life' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Utility Ribbon with Real-Time Live Clock & Institutional Identifiers */}
      <div className="w-full bg-[#0B1622] border-b border-[#DCE8F2]/12 text-[#FAF8F5]/80 text-xs py-1.5 px-4 sm:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif tracking-wider font-semibold text-[#FAF8F5] hidden sm:inline">
              ST. MARY&apos;S HIGH SCHOOL · JORHAT
            </span>
            <span className="text-[#89ACC7] hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-[#DCE8F2] text-[11px] hidden md:inline font-mono">
              SEBA Affiliated · Managed by MSMHC · Rowriah, Assam
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Real-time live clock with seconds */}
            <LiveClock showDate={true} className="text-[#FAF8F5]" />
            
            <span className="text-[#DCE8F2]/25 hidden sm:inline">|</span>
            
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#DCE8F2]/80 font-mono">
              <span>Office: Mon–Sat 8:00 AM – 2:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation — Deep Victory Navy Anchor */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0F2030]/95 backdrop-blur-md shadow-lg border-b border-[#DCE8F2]/15 py-3'
            : 'bg-[#0F2030] border-b border-[#DCE8F2]/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text wordmark with Victory Light Blue heraldic icon */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-[#FAF8F5] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7] rounded-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#DCE8F2] text-[#0F2030] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 border border-[#89ACC7]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF8F5] leading-tight">
                St. Mary&apos;s School
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#DCE8F2]">
                Jorhat, Assam
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#FAF8F5]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#DCE8F2] transition-colors duration-150 relative py-1 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#89ACC7] rounded-xs group"
              >
                <span>{link.label}</span>
                {/* Active/Hover indicator in Victory Light Blue */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#89ACC7] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions + Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#FAF8F5] hover:bg-[#DCE8F2]/10 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7]"
              aria-label="Toggle visual theme"
              title="Toggle theme"
            >
              {!mounted || theme === 'light' ? (
                <Moon className="w-4 h-4 transition-transform duration-200 hover:rotate-12 text-[#FAF8F5]" />
              ) : (
                <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45 text-[#DCE8F2]" />
              )}
            </button>

            {/* Admissions Enquiry CTA Button — Victory Light Blue Button */}
            <button
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-[#0F2030] bg-[#DCE8F2] hover:bg-[#C8DFF0] rounded-md transition-all shadow-xs active:scale-98 whitespace-nowrap border border-[#89ACC7]/40"
            >
              <span>Admissions 2026–27</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0F2030]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#FAF8F5] hover:bg-[#DCE8F2]/10 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DCE8F2]/15 bg-[#0F2030] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F2]/15">
              <span className="text-xs font-mono uppercase tracking-wider text-[#DCE8F2]">
                School Navigation
              </span>
              <LiveClock showDate={false} className="text-[#FAF8F5]" />
            </div>

            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-serif font-medium text-[#FAF8F5] hover:text-[#DCE8F2] py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#DCE8F2]/15 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-[#0F2030] bg-[#DCE8F2] hover:bg-[#C8DFF0] rounded-md shadow-xs transition-colors"
              >
                Admissions Enquiry 2026–27
              </button>
              <div className="text-[11px] text-center text-[#DCE8F2]/80 font-mono">
                Rowriah, Jorhat, Assam · Helpline: +91 81339 66530
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
