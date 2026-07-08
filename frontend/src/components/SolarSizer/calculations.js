import { APPLIANCES } from './applianceData.js';

const SAFETY_MARGIN = 1.25; // 25% headroom on top of peak load
const SYSTEM_EFFICIENCY = 0.75; // accounts for inverter, wiring & charge-controller losses
const PANEL_WATTS = 350; // standard monocrystalline panel wattage used for sizing

export const BATTERY_TYPES = {
  lithium: { label: 'Lithium (LiFePO4)', depthOfDischarge: 0.9 },
  leadAcid: { label: 'Lead Acid / AGM', depthOfDischarge: 0.5 },
};

export function suggestBatteryVoltage(inverterKw) {
  if (inverterKw <= 1.5) return 12;
  if (inverterKw <= 3.5) return 24;
  return 48;
}

// Builds the enriched list of selected appliances with their computed daily energy use.
export function buildApplianceSummary(selections) {
  return Object.entries(selections)
    .filter(([, config]) => config.quantity > 0)
    .map(([id, config]) => {
      const appliance = APPLIANCES.find((a) => a.id === id);
      const dailyWh = appliance.watts * config.quantity * config.hoursPerDay;
      return {
        id,
        name: appliance.name,
        watts: appliance.watts,
        surgeMultiplier: appliance.surgeMultiplier,
        quantity: config.quantity,
        hoursPerDay: config.hoursPerDay,
        dailyWh,
      };
    });
}

export function calculateTotals(selections, settings) {
  const items = buildApplianceSummary(selections);

  const dailyWh = items.reduce((sum, item) => sum + item.dailyWh, 0);
  const dailyKwh = dailyWh / 1000;

  const connectedWatts = items.reduce((sum, item) => sum + item.watts * item.quantity, 0);

  // Assume only the single largest motor-driven appliance surges at once;
  // everything else is already running at its steady-state draw.
  let peakWatts = connectedWatts;
  let largestSurgeExtra = 0;
  items.forEach((item) => {
    if (item.surgeMultiplier > 1) {
      const extra = item.watts * item.quantity * (item.surgeMultiplier - 1);
      if (extra > largestSurgeExtra) largestSurgeExtra = extra;
    }
  });
  peakWatts += largestSurgeExtra;

  const inverterWatts = peakWatts * SAFETY_MARGIN;
  const inverterKw = inverterWatts / 1000;

  const batteryType = BATTERY_TYPES[settings.batteryType] || BATTERY_TYPES.lithium;
  const batteryVoltage = settings.batteryVoltage;
  const requiredWh = (dailyWh * settings.backupDays) / batteryType.depthOfDischarge;
  const batteryKwh = requiredWh / 1000;
  const batteryAh = batteryVoltage > 0 ? requiredWh / batteryVoltage : 0;

  const solarWatts = dailyWh > 0 ? dailyWh / (settings.peakSunHours * SYSTEM_EFFICIENCY) : 0;
  const panelWatts = PANEL_WATTS;
  const panelCount = solarWatts > 0 ? Math.ceil(solarWatts / panelWatts) : 0;

  return {
    items,
    dailyWh,
    dailyKwh,
    connectedWatts,
    peakWatts,
    inverterKw,
    batteryVoltage,
    batteryKwh,
    batteryAh,
    solarWatts,
    panelWatts,
    panelCount,
    peakSunHours: settings.peakSunHours,
    backupDays: settings.backupDays,
    batteryTypeLabel: batteryType.label,
  };
}
