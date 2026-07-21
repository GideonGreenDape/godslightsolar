import { useMemo, useState } from "react";
import { DEFAULT_QUANTITY, DEFAULT_HOURS } from "./applianceData.js";
import { calculateTotals, suggestBatteryVoltage } from "./calculations.js";
import ApplianceGrid from "./ApplianceGrid.jsx";
import ResultsSummary from "./ResultsSummary.jsx";
import MobileEstimateBar from "./MobileEstimateBar.jsx";
import { buildTextReceipt, downloadTextFile } from "./textReceipt.js";
import { downloadQuotePdf, submitContactForm } from "../../utils/api.js";

const DEFAULT_SETTINGS = {
  peakSunHours: 5,
  backupDays: 1,
  batteryType: "lithium",
  batteryVoltage: 24,
};

export default function SolarSizer() {
  const [selections, setSelections] = useState({});
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const totals = useMemo(
    () => calculateTotals(selections, settings),
    [selections, settings],
  );
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
      if (!("batteryVoltage" in patch)) {
        const recalculated = calculateTotals(selections, { ...prev, ...patch });
        next.batteryVoltage =
          prev.batteryVoltage || suggestBatteryVoltage(recalculated.inverterKw);
      }
      return next;
    });
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportError("");
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
    downloadTextFile("godslight-solars-quote.txt", content);
  };

  const handleRequestQuote = async (formData) => {
    try {
      // 1. Download PDF
      await handleExportPdf();

      // 2. Prepare WhatsApp content
      const summaryText = `*Requesting Official Quote*

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

System Summary:
- Daily Energy Use: ${totals.dailyKwh.toFixed(2)} kWh
- Inverter Size: ${totals.inverterKw.toFixed(2)} kW
- Battery Bank: ${Math.round(totals.batteryAh)} Ah
- Solar Array: ${Math.round(totals.solarWatts)} W`;

      // 3. Open WhatsApp
      window.open(
        `https://wa.me/2347064110671?text=${encodeURIComponent(summaryText)}`,
        "_blank",
      );

      // 4. Submit form data to backend
      await submitContactForm({
        ...formData,
        message: `Requesting Official Quote for ${totals.totalKw.toFixed(2)}kW system. Full details sent via WhatsApp.`,
      });

      alert("Quote request sent successfully!");
      setShowQuoteForm(false);
    } catch (err) {
      alert("Failed to send request: " + err.message);
    }
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
            Tap the appliances you use, adjust quantity and hours per day, and
            get an instant recommendation for your inverter, battery bank, and
            solar array.
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
              onRequestQuote={() => setShowQuoteForm(true)}
              isExporting={isExporting}
              hasSelection={hasSelection}
            />
            {exportError && (
              <p className="mt-3 text-center text-sm font-medium text-brand-red-500">
                {exportError}
              </p>
            )}
          </div>
        </div>
      </div>

      {showQuoteForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl dark:bg-brand-navy-800">
            <h3 className="text-xl font-bold dark:text-white">
              Request Official Quote
            </h3>
            <form
              className="mt-4 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleRequestQuote({
                  name: e.target.name.value,
                  email: e.target.email.value,
                  phone: e.target.phone.value,
                });
              }}
            >
              <input
                name="name"
                placeholder="Full Name"
                required
                className="w-full rounded border p-2.5 dark:bg-brand-navy-900 dark:text-white"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full rounded border p-2.5 dark:bg-brand-navy-900 dark:text-white"
              />
              <input
                name="phone"
                placeholder="Phone"
                className="w-full rounded border p-2.5 dark:bg-brand-navy-900 dark:text-white"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded bg-brand-yellow-400 py-2.5 font-bold text-brand-navy-900"
                >
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="rounded bg-gray-200 px-4 py-2.5 dark:bg-gray-700 dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MobileEstimateBar
        totals={totals}
        hasSelection={hasSelection}
        targetId="solar-results"
      />
    </section>
  );
}
