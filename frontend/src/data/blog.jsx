export const faqs = [
  {
    question: "What is the cost of solar installation in Delta State?",
    answer: "The cost depends on your energy requirements. We offer a free solar sizing tool to help you estimate your needs and get an instant recommendation."
  },
  {
    question: "How long does a solar system last?",
    answer: "With proper maintenance, our solar panels are designed to last over 25 years, with inverters and batteries having their own service lifespans."
  },
  {
    question: "Do you provide after-sales support?",
    answer: "Yes, we provide comprehensive after-sales support, including system monitoring and routine maintenance for all our installations."
  }
];

export const tips = [
  {
    slug: "maximizing-solar-battery-life",
    title: "Maximizing Solar Battery Life",
    excerpt: "Learn how to optimize your battery settings to ensure longevity and consistent power throughout the night.",
    content: (
      <>
        <p className="mb-4">Maintaining your solar battery bank is crucial for long-term savings. Here are key strategies:</p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Depth of Discharge:</strong> Keep your depth of discharge (DoD) above 50% whenever possible to prolong battery chemistry life.</li>
          <li><strong>Temperature Control:</strong> Ensure your battery bank is kept in a cool, ventilated area. Heat is the primary enemy of battery capacity.</li>
          <li><strong>Regular Checks:</strong> Perform monthly checks on connections to ensure they remain tight and free of corrosion.</li>
        </ul>
        <p>By following these steps, you can add years to the life of your storage system.</p>
      </>
    )
  },
  {
    slug: "understanding-inverter-loads",
    title: "Understanding Inverter Loads",
    excerpt: "Avoid common mistakes by understanding which appliances consume the most power and how to manage them.",
    content: (
      <>
        <p className="mb-4">The inverter is the heart of your solar system. Efficiently managing the load on your inverter prevents system trips and extends equipment life.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Key Appliances to Monitor:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Heating Elements:</strong> Irons, electric kettles, and water heaters are high-draw appliances that should be used sparingly during peak production hours.</li>
          <li><strong>Motors:</strong> Pumps and large refrigeration units have high "startup" currents that can spike your inverter load.</li>
        </ul>
        <p>If you find your system frequently cutting out, contact our technical team in Delta State for a system load review.</p>
      </>
    )
  }
];

