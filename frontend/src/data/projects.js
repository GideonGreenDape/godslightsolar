import hybridSolarInstall from '../asset/projects/100kva-hybrid-solar-iinstallation.jfif';
import smartOfficeAutomation from '../asset/projects/smart office automation.jfif';
import estatePerimeterSecurity from '../asset/projects/Estate perimeter security.jfif';
import facilityMonitoring from '../asset/projects/32 camera facility monitoring.jfif';
import industrialPanelUpgrade from '../asset/projects/industrial panel upgrade.jfif';
import rooftopSolarArray from '../asset/projects/5kw rooftop solar array.jfif';
import electricalPiping from '../asset/projects/electrical piping done.jfif';
import solarInstallAbraka from '../asset/projects/solar system installation done in abraka.jfif';
import workDoneWarri from '../asset/projects/workdone in warri.jfif';

// `location` is intentionally blank — fill in the real site location for each
// project; it renders as "Work done in {location}" on the projects slider.
export const projects = [
  {
    title: '10kVA Hybrid Solar Install',
    category: 'Solar Sizing & Installation',
    description: 'Full off-grid hybrid solar system for a 5-bedroom residence, including 20kWh battery bank.',
    image: hybridSolarInstall,
    location: 'Kokori',
  },
  {
    title: 'Smart Office Automation',
    category: 'Home & Industrial Automation',
    description: 'Automated lighting, HVAC scheduling, and access control for a 40-desk corporate office.',
    image: smartOfficeAutomation,
    location: 'Ugheli',
  },
  {
    title: 'Estate Perimeter Security',
    category: 'Electric Fencing',
    description: '2km electric fence deployment with energizer monitoring across a residential estate.',
    image: estatePerimeterSecurity,
    location: '',
  },
  {
    title: '32-Camera Facility Monitoring',
    category: 'CCTV Surveillance Systems',
    description: 'Remote-access HD CCTV network covering warehouse, gate, and staff entry points.',
    image: facilityMonitoring,
    location: '',
  },
  {
    title: 'Industrial Panel Upgrade',
    category: 'Electrical Wiring',
    description: 'Full rewiring and distribution panel upgrade for a mid-size manufacturing plant.',
    image: industrialPanelUpgrade,
    location: 'Ugheli',
  },
  {
    title: '5kW Rooftop Solar Array',
    category: 'Solar Sizing & Installation',
    description: 'Grid-tied rooftop solar for a retail complex, cutting monthly energy costs by 60%.',
    image: rooftopSolarArray,
    location: '',
  },
  {
    title: 'Solar System Installation',
    category: 'Solar Sizing & Installation',
    description: 'Complete solar system installation delivering reliable, clean power for the property.',
    image: solarInstallAbraka,
    location: 'Abraka',
  },
  {
    title: 'On-Site Technical Installation',
    category: 'Electrical Wiring',
    description: 'Comprehensive on-site technical installation and system setup.',
    image: workDoneWarri,
    location: 'Warri',
  },
  {
    title: 'Electrical Piping Installation',
    category: 'Electrical Wiring',
    description: 'Professional electrical conduit and piping installation for safe, code-compliant wiring.',
    image: electricalPiping,
    location: 'Delta',
  },
];
