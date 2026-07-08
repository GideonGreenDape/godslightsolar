import { APPLIANCES } from './applianceData.js';
import ApplianceCard from './ApplianceCard.jsx';

export default function ApplianceGrid({ selections, onToggle, onChangeQuantity, onChangeHours }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {APPLIANCES.map((appliance) => {
        const config = selections[appliance.id];
        return (
          <ApplianceCard
            key={appliance.id}
            appliance={appliance}
            selected={Boolean(config)}
            config={config || { quantity: 1, hoursPerDay: 4 }}
            onToggle={onToggle}
            onChangeQuantity={onChangeQuantity}
            onChangeHours={onChangeHours}
          />
        );
      })}
    </div>
  );
}
