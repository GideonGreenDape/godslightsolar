const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const BRAND_NAVY = '#0b1f3d';
const BRAND_YELLOW = '#f5a623';
const TEXT_GRAY = '#4b5563';
const LEFT = 50;
const LOGO_PATH = path.join(__dirname, '..', '..', 'frontend', 'src', 'asset', 'GodslightLogo.jfif');
const LOGO_SIZE = 56;

function drawHeader(doc, title) {
  doc.rect(0, 0, doc.page.width, 90).fill(BRAND_NAVY);

  const hasLogo = fs.existsSync(LOGO_PATH);
  if (hasLogo) {
    doc.image(LOGO_PATH, LEFT, (90 - LOGO_SIZE) / 2, { width: LOGO_SIZE, height: LOGO_SIZE });
  }
  const textX = hasLogo ? LEFT + LOGO_SIZE + 14 : LEFT;

  doc
    .fillColor('#ffffff')
    .font('Helvetica-Bold')
    .fontSize(20)
    .text('Godslight Solars', textX, 28);
  doc
    .fillColor(BRAND_YELLOW)
    .font('Helvetica')
    .fontSize(11)
    .text('Smart Energy & Technical Services', textX, 54);
  doc
    .fillColor('#ffffff')
    .font('Helvetica-Bold')
    .fontSize(13)
    .text(title, 50, 62, { align: 'right', width: doc.page.width - 100 });
  doc.moveDown();
  doc.y = 110;
}

function drawSectionTitle(doc, text) {
  doc.moveDown(0.5);
  doc.fillColor(BRAND_NAVY).font('Helvetica-Bold').fontSize(13).text(text, LEFT, doc.y);
  doc.moveDown(0.2);
  doc
    .strokeColor(BRAND_YELLOW)
    .lineWidth(2)
    .moveTo(LEFT, doc.y)
    .lineTo(LEFT + 100, doc.y)
    .stroke();
  doc.moveDown(0.5);
  doc.x = LEFT;
}

function drawKeyValueRow(doc, label, value) {
  const y = doc.y;
  const contentWidth = doc.page.width - LEFT * 2;
  const labelWidth = contentWidth * 0.6;

  doc.fillColor(TEXT_GRAY).font('Helvetica').fontSize(11);
  const labelHeight = doc.heightOfString(label, { width: labelWidth });
  doc.text(label, LEFT, y, { width: labelWidth });

  doc.fillColor('#111827').font('Helvetica-Bold').fontSize(11);
  const valueHeight = doc.heightOfString(String(value), { width: contentWidth });
  doc.text(String(value), LEFT, y, { align: 'right', width: contentWidth });

  doc.x = LEFT;
  doc.y = y + Math.max(labelHeight, valueHeight) + 6;
}

function generateQuotePdf({ customer, appliances, totals }, res) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(res);

  drawHeader(doc, 'Solar Sizing Estimate');

  if (customer && (customer.name || customer.phone || customer.email)) {
    drawSectionTitle(doc, 'Prepared For');
    if (customer.name) drawKeyValueRow(doc, 'Name', customer.name);
    if (customer.phone) drawKeyValueRow(doc, 'Phone', customer.phone);
    if (customer.email) drawKeyValueRow(doc, 'Email', customer.email);
  }

  drawSectionTitle(doc, 'Selected Appliances');

  const tableTop = doc.y;
  const colX = { name: 50, qty: 260, hours: 330, watt: 410, wh: 490 };

  doc.font('Helvetica-Bold').fontSize(10).fillColor(BRAND_NAVY);
  doc.text('Appliance', colX.name, tableTop);
  doc.text('Qty', colX.qty, tableTop);
  doc.text('Hrs/Day', colX.hours, tableTop);
  doc.text('Watts', colX.watt, tableTop);
  doc.text('Wh/Day', colX.wh, tableTop);
  doc.moveDown(0.5);
  doc
    .strokeColor('#e5e7eb')
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke();
  doc.moveDown(0.3);

  doc.font('Helvetica').fontSize(10).fillColor('#111827');
  (appliances || []).forEach((item) => {
    const y = doc.y;
    doc.text(item.name, colX.name, y, { width: 200 });
    doc.text(String(item.quantity), colX.qty, y);
    doc.text(String(item.hoursPerDay), colX.hours, y);
    doc.text(String(item.watts), colX.watt, y);
    doc.text(String(Math.round(item.dailyWh)), colX.wh, y);
    doc.moveDown(0.5);
  });

  doc.moveDown(0.5);
  doc
    .strokeColor('#e5e7eb')
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke();

  drawSectionTitle(doc, 'System Recommendation');
  drawKeyValueRow(doc, 'Total Daily Energy Consumption', `${totals.dailyKwh.toFixed(2)} kWh (${Math.round(totals.dailyWh)} Wh)`);
  drawKeyValueRow(doc, 'Recommended Inverter Size', `${totals.inverterKw.toFixed(2)} kW`);
  drawKeyValueRow(doc, `Recommended Battery Bank (${totals.batteryVoltage}V system)`, `${Math.round(totals.batteryAh)} Ah  (${totals.batteryKwh.toFixed(2)} kWh usable)`);
  drawKeyValueRow(doc, 'Recommended Solar Array Size', `${Math.round(totals.solarWatts)} W`);
  drawKeyValueRow(doc, 'Number of Solar Panels Needed', `${totals.panelCount} x ${totals.panelWatts}W panels`);
  drawKeyValueRow(doc, 'Estimated Peak Sun Hours Used', `${totals.peakSunHours} hrs/day`);

  doc.moveDown(1);
  doc
    .fillColor(TEXT_GRAY)
    .font('Helvetica-Oblique')
    .fontSize(9)
    .text(
      'This estimate is a guide based on the appliances and usage hours you selected. Actual system sizing may vary based on site survey, backup days required, battery depth-of-discharge, and inverter surge requirements. Contact Godslight Solars for a free professional site assessment.',
      LEFT,
      doc.y,
      { width: doc.page.width - LEFT * 2 }
    );

  doc.moveDown(1.5);
  doc
    .fillColor(BRAND_NAVY)
    .font('Helvetica-Bold')
    .fontSize(11)
    .text('Get your accurate quote today:', LEFT, doc.y);
  doc.fillColor('#111827').font('Helvetica').fontSize(10).text('Phone / WhatsApp: +234 800 000 0000', LEFT, doc.y);
  doc.text('Email: info@godslightsolars.com', LEFT, doc.y);

  doc.end();
}

module.exports = { generateQuotePdf };
