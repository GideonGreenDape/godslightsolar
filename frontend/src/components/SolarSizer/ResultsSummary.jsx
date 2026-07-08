import { BatteryCharging, Sun, Zap, Gauge, LayoutGrid, FileDown, FileText, Loader2 } from 'lucide-react';
import { BATTERY_TYPES, suggestBatteryVoltage } from './calculations.js';

const VOLTAGE_OPTIONS = [12, 24, 48];

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
      <div className="flex items-center gap-2 text-brand-yellow-400">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-xl font-extrabold text-white sm:text-2xl">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-300">{sub}</p>}
    </div>
  );
}

export default function ResultsSummary({ totals, settings, onSettingsChange, onExportPdf, onExportText, isExporting, hasSelection }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-brand-green-800 to-brand-green-900 p-6 shadow-xl sm:p-8">
      <h3 className="text-lg font-bold text-white sm:text-xl">Your Recommended System</h3>
      <p className="mt-1 text-sm text-gray-300">
        Based on {totals.items.length} selected appliance{totals.items.length === 1 ? '' : 's'}.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard
          icon={Zap}
          label="Daily Energy Use"
          value={`${totals.dailyKwh.toFixed(2)} kWh`}
          sub={`${Math.round(totals.dailyWh)} Wh/day`}
        />
        <StatCard
          icon={Gauge}
          label="Inverter Size"
          value={`${totals.inverterKw.toFixed(2)} kW`}
          sub={`Peak load ${Math.round(totals.peakWatts)} W`}
        />
        <StatCard
          icon={BatteryCharging}
          label="Battery Bank"
          value={`${Math.round(totals.batteryAh)} Ah`}
          sub={`${totals.batteryVoltage}V • ${totals.batteryKwh.toFixed(2)} kWh usable`}
        />
        <StatCard
          icon={Sun}
          label="Solar Array"
          value={`${Math.round(totals.solarWatts)} W`}
          sub={`${settings.peakSunHours} peak sun hrs`}
        />
        <StatCard
          icon={LayoutGrid}
          label="Solar Panels"
          value={`${totals.panelCount}`}
          sub={`${totals.panelWatts}W panels`}
        />
      </div>

      {/* Settings */}
      <div className="mt-6 space-y-4 rounded-2xl bg-black/10 p-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-200">
            <span>Peak Sun Hours / Day</span>
            <span className="text-brand-yellow-400">{settings.peakSunHours}h</span>
          </div>
          <input
            type="range"
            min={3}
            max={7}
            step={0.5}
            value={settings.peakSunHours}
            onChange={(e) => onSettingsChange({ peakSunHours: Number(e.target.value) })}
            className="mt-2 w-full accent-brand-yellow-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-200">
            <span>Backup Autonomy (Days)</span>
            <span className="text-brand-yellow-400">{settings.backupDays}</span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={1}
            value={settings.backupDays}
            onChange={(e) => onSettingsChange({ backupDays: Number(e.target.value) })}
            className="mt-2 w-full accent-brand-yellow-400"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-gray-200">Battery Type</label>
            <select
              value={settings.batteryType}
              onChange={(e) => onSettingsChange({ batteryType: e.target.value })}
              className="mt-1 w-full rounded-lg border-none bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow-400"
            >
              {Object.entries(BATTERY_TYPES).map(([key, val]) => (
                <option key={key} value={key} className="text-brand-green-900">
                  {val.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-200">System Voltage</label>
            <select
              value={settings.batteryVoltage}
              onChange={(e) => onSettingsChange({ batteryVoltage: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border-none bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow-400"
            >
              {VOLTAGE_OPTIONS.map((v) => (
                <option key={v} value={v} className="text-brand-green-900">
                  {v}V {v === suggestBatteryVoltage(totals.inverterKw) ? '(suggested)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!hasSelection || isExporting}
          onClick={onExportPdf}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
          Download PDF Quote
        </button>
        <button
          type="button"
          disabled={!hasSelection}
          onClick={onExportText}
          className="btn-secondary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <FileText className="h-4 w-4" />
          Download Text Summary
        </button>
      </div>

      {!hasSelection && (
        <p className="mt-3 text-center text-xs text-gray-400 sm:text-left">
          Select at least one appliance above to see your recommendation.
        </p>
      )}
    </div>
  );
}
