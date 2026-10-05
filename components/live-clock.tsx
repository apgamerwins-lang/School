'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface LiveClockProps {
  className?: string;
  showDate?: boolean;
}

export function LiveClock({ className = '', showDate = true }: LiveClockProps) {
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      // Real-time clock with seconds
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      // Refined Indian Standard date notation
      const formattedDate = now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      setTime(formattedTime);
      setDateStr(formattedDate);
    };

    const initialTick = setTimeout(updateClock, 0);
    const intervalId = setInterval(updateClock, 1000);

    return () => {
      clearTimeout(initialTick);
      clearInterval(intervalId);
    };
  }, []);

  if (!time) {
    return (
      <div className={`flex items-center gap-1.5 text-xs text-[#475B6E] dark:text-[#C8D9E8] font-mono tabular-nums ${className}`}>
        <Clock className="w-3.5 h-3.5 opacity-60 animate-pulse text-[#89ACC7]" />
        <span>--:--:-- --</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 text-xs font-mono tabular-nums text-[#0F2030] dark:text-[#FAF8F5] ${className}`}
      aria-label={`Current time: ${time}${dateStr ? `, ${dateStr}` : ''}`}
      title="Live local device time"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#89ACC7] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F2030] dark:bg-[#DCE8F2]"></span>
      </span>
      <span className="tracking-tight font-medium">{time}</span>
      {showDate && (
        <span className="text-[#475B6E]/80 dark:text-[#C8D9E8]/80 hidden md:inline font-normal">
          · {dateStr}
        </span>
      )}
    </div>
  );
}
