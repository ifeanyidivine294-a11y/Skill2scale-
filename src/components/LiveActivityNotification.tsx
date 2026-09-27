import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ActivityItem {
  location: string;
  course: string;
  timeAgo: string;
}

const SAMPLE_ACTIVITIES: ActivityItem[] = [
  { location: 'Lagos, Nigeria', course: 'Graphics Design', timeAgo: '2 minutes ago' },
  { location: 'Abuja, Nigeria', course: 'Digital Marketing', timeAgo: '6 minutes ago' },
  { location: 'Port Harcourt, Nigeria', course: 'Website Design', timeAgo: '12 minutes ago' },
  { location: 'Accra, Ghana', course: 'Content Writing', timeAgo: '18 minutes ago' },
  { location: 'Ibadan, Nigeria', course: 'AI & Automation', timeAgo: '24 minutes ago' },
  { location: 'Enugu, Nigeria', course: 'UI/UX Design', timeAgo: '35 minutes ago' },
  { location: 'Nairobi, Kenya', course: 'Video Editing', timeAgo: '42 minutes ago' },
];

export const LiveActivityNotification: React.FC = () => {
  const [current, setCurrent] = useState<ActivityItem | null>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Show first after 4 seconds
    const initialTimer = setTimeout(() => {
      showNext();
    }, 4000);

    const interval = setInterval(() => {
      showNext();
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [index]);

  const showNext = () => {
    setCurrent(SAMPLE_ACTIVITIES[index % SAMPLE_ACTIVITIES.length]);
    setVisible(true);
    setIndex(prev => prev + 1);

    // Hide after 5 seconds
    setTimeout(() => {
      setVisible(false);
    }, 5500);
  };

  if (!visible || !current) return null;

  return (
    <aside
      aria-label="Recent Enrollment Activity"
      className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 text-[#0757D5] rounded-lg shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4 text-[#0757D5]" />
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-xs font-bold text-[#071A3D] leading-tight">
            New Enrollment Received
          </p>
          <p className="text-xs text-slate-600 truncate mt-0.5">
            Learner from <span className="font-semibold text-slate-800">{current.location}</span> enrolled in{' '}
            <span className="font-semibold text-[#0757D5]">{current.course}</span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-slate-400">{current.timeAgo}</span>
            <span className="text-[10px] text-slate-300">·</span>
            <span className="text-[10px] text-emerald-600 font-medium">Verified Application</span>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-slate-600 shrink-0 -mt-1 -mr-1 p-1"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
