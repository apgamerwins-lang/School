'use client';

import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface CinematicLoaderProps {
  onLoaded?: () => void;
}

export function CinematicLoader({ onLoaded }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CURATING ACADEMIC HERITAGE');
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const checkTimer = setTimeout(() => {
      // Check session storage
      const hasSeenLoader = typeof window !== 'undefined' ? sessionStorage.getItem('smsj-loader-seen') : null;
      if (hasSeenLoader) {
        setIsFinished(true);
        onLoaded?.();
        return;
      }

      const startTime = performance.now();
      const duration = 1400; // 1.4s responsive luxury reveal

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);

        setProgress(currentProgress);

        if (currentProgress < 35) {
          setStatusText('INITIALIZING ACADEMIC ENVIRONMENT');
        } else if (currentProgress < 75) {
          setStatusText('CONNECTING CAMPUS & ARCHIVE');
        } else {
          setStatusText('WELCOME TO ST. MARY’S, JORHAT');
        }

        if (elapsed < duration) {
          animationFrameId = requestAnimationFrame(tick);
        } else {
          setProgress(100);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsFinished(true);
              try {
                sessionStorage.setItem('smsj-loader-seen', 'true');
              } catch {
                // Ignore
              }
              onLoaded?.();
            }, 600);
          }, 200);
        }
      };

      animationFrameId = requestAnimationFrame(tick);
    }, 0);

    return () => {
      clearTimeout(checkTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onLoaded]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
      try {
        sessionStorage.setItem('smsj-loader-seen', 'true');
      } catch {
        // Ignore
      }
      onLoaded?.();
    }, 150);
  };

  if (isFinished) return null;

  return (
    <aside
      aria-label="Loading St. Mary's School, Jorhat"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F2030] text-[#FAF8F5] transition-all duration-600 ease-out select-none ${
        isExiting ? 'opacity-0 pointer-events-none scale-102 filter blur-xs' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background subtle texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#DCE8F2_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-sm w-full px-6 flex flex-col items-center text-center">
        {/* Emblem Crest in Ivory White & Victory Light Blue */}
        <div className="mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-[#89ACC7]/40 bg-[#132638] shadow-2xl flex items-center justify-center relative">
            <GraduationCap className="w-7 h-7 text-[#FAF8F5]" />
          </div>
        </div>

        {/* Stately Title */}
        <div className="space-y-1 mb-8">
          <p className="text-[10px] tracking-[0.28em] uppercase font-mono text-[#89ACC7]">
            Congregation of MSMHC · Rowriah
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#FAF8F5]">
            ST. MARY’S SCHOOL
          </h1>
          <p className="text-[11px] font-mono tracking-widest text-[#DCE8F2]/75 uppercase">
            Jorhat, Assam · SEBA Affiliated
          </p>
        </div>

        {/* Thin Luxury Loading Bar in Victory Light Blue & Ivory */}
        <div className="w-[200px] sm:w-[280px] space-y-2">
          {/* Header above bar */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#FAF8F5]/80">
            <span className="truncate max-w-[170px] text-left text-[#DCE8F2]">
              {statusText}
            </span>
            <span className="tabular-nums font-bold text-[#FAF8F5]">
              {progress}%
            </span>
          </div>

          {/* Thin luxury bar: 2.5px height with Victory Light Blue progress and Ivory White highlight */}
          <div className="relative h-[2.5px] w-full bg-[#DCE8F2]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#994D7A] via-[#89ACC7] to-[#FAF8F5] rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(137,172,199,0.8)]"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Minimal skip action */}
        <button
          onClick={handleSkip}
          type="button"
          className="mt-8 text-[10px] font-mono uppercase tracking-[0.2em] text-[#DCE8F2]/75 hover:text-[#FAF8F5] transition-colors py-1 px-3 rounded-full hover:bg-[#DCE8F2]/10 focus-visible:outline-hidden"
        >
          Enter Campus →
        </button>
      </div>
    </aside>
  );
}
