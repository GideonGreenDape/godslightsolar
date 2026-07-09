import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Mobile-only sticky bar that surfaces the live estimate while the user is
// still scrolling through the appliance list, so they get feedback without
// scrolling all the way down. Hides itself once the results panel is in view.
export default function MobileEstimateBar({ totals, hasSelection, targetId }) {
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return undefined;

    const observer = new IntersectionObserver(([entry]) => setResultsVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  if (!hasSelection || resultsVisible) return null;

  const handleViewResults = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-navy-900/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] backdrop-blur lg:hidden">
      <button type="button" onClick={handleViewResults} className="flex w-full items-center justify-between gap-3">
        <span className="text-left">
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-brand-yellow-400">
            Daily Energy Use
          </span>
          <span className="block text-base font-extrabold text-white">{totals.dailyKwh.toFixed(2)} kWh</span>
        </span>
        <span className="flex items-center gap-1 rounded-full bg-brand-yellow-400 px-4 py-2 text-sm font-semibold text-brand-navy-900">
          View Estimate
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
