import { useMemo, useState } from 'react';
import { DEFAULT_QUANTITY, DEFAULT_HOURS } from './applianceData.js';
import { calculateTotals, suggestBatteryVoltage } from './calculations.js';
import ApplianceGrid from './ApplianceGrid.jsx';
import ResultsSummary from './ResultsSummary.jsx';
import MobileEstimateBar from './MobileEstimateBar.jsx';
import { buildTextReceipt, downloadTextFile } from './textReceipt.js';
import { downloadQuotePdf } from '../../utils/api.js';

const DEFAULT_SETTINGS = {
  peakSunHours: 5,
  backupDays: 1,
  batteryType: 'lithium',
  batteryVoltage: 24,
};

export default function SolarSizer() {
  const [selections, setSelections] = useState({});
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState('');

  const totals = useMemo(() => calculateTotals(selections, settings), [selections, settings]);
  const hasSelection = totals.items.length > 0;

  const toggleAppliance = (id) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = { quantity: DEFAULT_QUANTITY, hoursPerDay: DEFAULT_HOURS };
      }
      return next;
    });
  };

  const changeQuantity = (id, quantity) => {
    setSelections((prev) => ({ ...prev, [id]: { ...prev[id], quantity } }));
  };

  const changeHours = (id, hoursPerDay) => {
    setSelections((prev) => ({ ...prev, [id]: { ...prev[id], hoursPerDay } }));
  };

  const updateSettings = (patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      // Keep the voltage suggestion in sync unless the user is directly changing it.
      if (!('batteryVoltage' in patch)) {
        const recalculated = calculateTotals(selections, { ...prev, ...patch });
        next.batteryVoltage = prev.batteryVoltage || suggestBatteryVoltage(recalculated.inverterKw);
      }
      return next;
    });
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportError('');
    try {
      await downloadQuotePdf({
        appliances: totals.items,
        totals,
      });
    } catch (err) {
      setExportError(err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportText = () => {
    const content = buildTextReceipt({ appliances: totals.items, totals });
    downloadTextFile('godslight-solars-quote.txt', content);
  };

  return (
    <section
      id="solar-sizer"
      className="bg-white py-20 dark:bg-brand-navy-900/95 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-yellow-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-yellow-700">
            Free Instant Estimate
          </span>
          <h2 className="section-title mt-4">Solar System Sizer</h2>
          <p className="section-subtitle">
            Tap the appliances you use, adjust quantity and hours per day, and get an instant
            recommendation for your inverter, battery bank, and solar array.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <ApplianceGrid
              selections={selections}
              onToggle={toggleAppliance}
              onChangeQuantity={changeQuantity}
              onChangeHours={changeHours}
            />
          </div>

          <div id="solar-results" className="lg:sticky lg:top-24 lg:col-span-2">
            <ResultsSummary
              totals={totals}
              settings={settings}
              onSettingsChange={updateSettings}
              onExportPdf={handleExportPdf}
              onExportText={handleExportText}
              isExporting={isExporting}
              hasSelection={hasSelection}
            />
            {exportError && (
              <p className="mt-3 text-center text-sm font-medium text-brand-red-500">{exportError}</p>
            )}
          </div>
        </div>
      </div>

      <MobileEstimateBar totals={totals} hasSelection={hasSelection} targetId="solar-results" />
    </section>
  );
}
