import {
  Refrigerator,
  AirVent,
  Tv,
  Lightbulb,
  Fan,
  Microwave,
  WashingMachine,
  Droplets,
  Laptop,
  Snowflake,
  Shirt,
  Wifi,
  SmartphoneCharging,
  BatteryCharging,
} from 'lucide-react';

// surgeMultiplier: how many times rated watts a motor-driven appliance can
// briefly draw on startup. Non-motor (resistive/electronic) loads use 1.
export const APPLIANCES = [
  { id: 'fridge', name: 'Refrigerator', icon: Refrigerator, watts: 150, surgeMultiplier: 3 },
  { id: 'ac', name: 'Air Conditioner (1HP)', icon: AirVent, watts: 900, surgeMultiplier: 3 },
  { id: 'tv', name: 'Television (LED)', icon: Tv, watts: 120, surgeMultiplier: 1 },
  { id: 'lighting', name: 'LED Lighting (per bulb)', icon: Lightbulb, watts: 10, surgeMultiplier: 1 },
  { id: 'fan', name: 'Ceiling Fan', icon: Fan, watts: 75, surgeMultiplier: 2 },
  { id: 'microwave', name: 'Microwave Oven', icon: Microwave, watts: 1000, surgeMultiplier: 1.5 },
  { id: 'washer', name: 'Washing Machine', icon: WashingMachine, watts: 500, surgeMultiplier: 3 },
  { id: 'pump', name: 'Water Pump', icon: Droplets, watts: 750, surgeMultiplier: 3 },
  { id: 'laptop', name: 'Laptop / Computer', icon: Laptop, watts: 65, surgeMultiplier: 1 },
  { id: 'freezer', name: 'Deep Freezer', icon: Snowflake, watts: 200, surgeMultiplier: 3 },
  { id: 'iron', name: 'Electric Iron', icon: Shirt, watts: 1000, surgeMultiplier: 1 },
  { id: 'router', name: 'Wi-Fi Router / Modem', icon: Wifi, watts: 15, surgeMultiplier: 1 },
  { id: 'phone', name: 'Phone Charging', icon: SmartphoneCharging, watts: 10, surgeMultiplier: 1 },
  { id: 'powerbank', name: 'Power Bank Charging', icon: BatteryCharging, watts: 20, surgeMultiplier: 1 },
];

export const DEFAULT_QUANTITY = 1;
export const DEFAULT_HOURS = 4;
