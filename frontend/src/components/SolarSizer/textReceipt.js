export function buildTextReceipt({ appliances, totals }) {
  const lines = [];
  lines.push('GODSLIGHT SOLARS - SOLAR SIZING ESTIMATE');
  lines.push('='.repeat(42));
  lines.push('');
  lines.push('SELECTED APPLIANCES');
  lines.push('-'.repeat(42));
  appliances.forEach((item) => {
    lines.push(
      `${item.name} x${item.quantity} @ ${item.watts}W, ${item.hoursPerDay}h/day -> ${Math.round(item.dailyWh)} Wh/day`
    );
  });
  lines.push('');
  lines.push('SYSTEM RECOMMENDATION');
  lines.push('-'.repeat(42));
  lines.push(`Total Daily Energy Consumption: ${totals.dailyKwh.toFixed(2)} kWh (${Math.round(totals.dailyWh)} Wh)`);
  lines.push(`Recommended Inverter Size: ${totals.inverterKw.toFixed(2)} kW`);
  lines.push(
    `Recommended Battery Bank (${totals.batteryVoltage}V): ${Math.round(totals.batteryAh)} Ah (${totals.batteryKwh.toFixed(2)} kWh usable)`
  );
  lines.push(`Recommended Solar Array Size: ${Math.round(totals.solarWatts)} W`);
  lines.push(`Number of Solar Panels Needed: ${totals.panelCount} x ${totals.panelWatts}W panels`);
  lines.push(`Peak Sun Hours Used: ${totals.peakSunHours} hrs/day`);
  lines.push('');
  lines.push('This is an estimate only. Contact Godslight Solars for a free site assessment.');
  lines.push('Phone/WhatsApp: +234 800 000 0000 | Email: info@godslightsolars.com');

  return lines.join('\n');
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
