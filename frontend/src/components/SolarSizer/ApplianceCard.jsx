import { Plus, Minus, Zap } from 'lucide-react';

function Counter({ label, value, min, max, step = 1, onChange, suffix }) {
  return (
    <div className="flex flex-col gap-2 sm:gap-1.5">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-300">{label}</span>
      <div className="flex items-center justify-center gap-2.5 sm:gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(Math.max(min, +(value - step).toFixed(2)));
          }}
          disabled={value <= min}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 transition-colors hover:bg-brand-green-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/10 dark:text-white sm:h-7 sm:w-7"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
        </button>
        <span className="w-9 shrink-0 text-center text-sm font-bold text-brand-green-800 dark:text-white sm:w-8">
          {value}
          {suffix}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(Math.min(max, +(value + step).toFixed(2)));
          }}
          disabled={value >= max}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 transition-colors hover:bg-brand-green-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/10 dark:text-white sm:h-7 sm:w-7"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ApplianceCard({ appliance, selected, config, onToggle, onChangeQuantity, onChangeHours }) {
  const Icon = appliance.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggle(appliance.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(appliance.id);
        }
      }}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? 'border-brand-yellow-400 bg-brand-yellow-50 shadow-glow dark:bg-brand-yellow-400/10'
          : 'border-gray-100 bg-white hover:border-brand-green-200 dark:border-white/10 dark:bg-brand-green-800/40'
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            selected ? 'bg-brand-yellow-400 text-brand-green-900' : 'bg-brand-green-700 text-brand-yellow-400'
          }`}
        >
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
            selected
              ? 'border-brand-yellow-400 bg-brand-yellow-400 text-brand-green-900'
              : 'border-gray-300 dark:border-white/20'
          }`}
        >
          {selected ? '✓' : ''}
        </span>
      </div>

      <h4 className="mt-3 text-sm font-bold text-brand-green-800 dark:text-white">{appliance.name}</h4>
      <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
        <Zap className="h-3 w-3" /> {appliance.watts}W each
      </p>

      {selected && (
        <div
          className="mt-3 space-y-3 border-t border-dashed border-brand-yellow-300/60 pt-3 sm:space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Counter
            label="Quantity"
            value={config.quantity}
            min={1}
            max={50}
            onChange={(val) => onChangeQuantity(appliance.id, val)}
          />
          <Counter
            label="Hours/Day"
            value={config.hoursPerDay}
            min={0.5}
            max={24}
            step={0.5}
            suffix="h"
            onChange={(val) => onChangeHours(appliance.id, val)}
          />
        </div>
      )}
    </div>
  );
}
