const SUSTAINABILITY_QUOTES = [
  {
    quote:
      "The greatest threat to our planet is the belief that someone else will save it.",
    author: "Robert Swan",
  },
  {
    quote:
      "We don't inherit the Earth from our ancestors, we borrow it from our children.",
    author: "Native American Proverb",
  },
  {
    quote:
      "Sustainability is no longer about doing less harm. It's about doing more good.",
    author: "Jochen Zeitz",
  },
];

const TIPS_CATEGORIES = {
  transport: {
    icon: "🚗",
    title: "Transportation",
    tips: [
      {
        title: "Switch to Public Transport",
        description:
          "Using public transportation can reduce your carbon emissions by up to 45%",
        icon: "🚌",
        link: "https://www.sustainabletransport.org",
        linkText: "Find Local Transit Options",
        category: "transport",
        forScoreAbove: 2,
      },
      {
        title: "Consider Electric Vehicles",
        description:
          "Electric vehicles produce zero direct emissions and are increasingly affordable",
        icon: "⚡",
        link: "https://www.evfinder.com",
        linkText: "Compare EV Models",
        category: "transport",
        forScoreAbove: 3,
      },
    ],
  },
  energy: {
    icon: "💡",
    title: "Energy Usage",
    tips: [
      {
        title: "Switch to LED Lighting",
        description:
          "LED bulbs use 75% less energy and last 25 times longer than incandescent lighting",
        icon: "💡",
        link: "https://www.energystar.gov/products/lighting_fans",
        linkText: "Shop Energy Star Lighting",
        category: "energy",
        forScoreAbove: 1,
      },
      {
        title: "Smart Thermostat Installation",
        description:
          "Smart thermostats can reduce your heating/cooling costs by 10-15%",
        icon: "🌡️",
        link: "https://www.smartthermostatguide.com",
        linkText: "Compare Smart Thermostats",
        category: "energy",
        forScoreAbove: 2,
      },
    ],
  },
  diet: {
    icon: "🥗",
    title: "Diet & Food",
    tips: [
      {
        title: "Meatless Mondays",
        description:
          "Going meat-free just one day a week can reduce your carbon footprint significantly",
        icon: "🥬",
        link: "https://www.meatlessmonday.com",
        linkText: "Get Vegetarian Recipes",
        category: "diet",
        forScoreAbove: 2,
      },
      {
        title: "Local Food Sources",
        description:
          "Buying local reduces transportation emissions and supports your community",
        icon: "🌾",
        link: "https://www.localharvest.org",
        linkText: "Find Local Markets",
        category: "diet",
        forScoreAbove: 1,
      },
    ],
  },
  waste: {
    icon: "♻️",
    title: "Waste Management",
    tips: [
      {
        title: "Start Composting",
        description:
          "Composting can reduce your waste-related emissions by up to 20%",
        icon: "🌱",
        link: "https://www.composting101.com",
        linkText: "Learn Composting Basics",
        category: "waste",
        forScoreAbove: 1,
      },
      {
        title: "Zero-Waste Shopping",
        description:
          "Using reusable bags and containers can eliminate packaging waste",
        icon: "🛍️",
        link: "https://www.zerowasteshops.com",
        linkText: "Find Zero-Waste Stores",
        category: "waste",
        forScoreAbove: 0.5,
      },
    ],
  },
};

function getRandomQuote() {
  return SUSTAINABILITY_QUOTES[
    Math.floor(Math.random() * SUSTAINABILITY_QUOTES.length)
  ];
}

function generateTipsHTML(breakdown) {
  const quote = getRandomQuote();
  const tipsToShow = [];

  // Select relevant tips based on breakdown scores
  Object.entries(breakdown).forEach(([category, score]) => {
    if (TIPS_CATEGORIES[category]) {
      TIPS_CATEGORIES[category].tips.forEach((tip) => {
        if (score > tip.forScoreAbove) {
          tipsToShow.push(tip);
        }
      });
    }
  });

  return `
        <div class="sustainability-tips">
            <div class="quote-container">
                <blockquote class="sustainability-quote">
                    "${quote.quote}"
                    <footer class="quote-author">— ${quote.author}</footer>
                </blockquote>
            </div>
            
            <div class="tips-grid">
                ${tipsToShow
                  .map(
                    (tip) => `
                    <div class="tip-card">
                        <div class="tip-icon">${tip.icon}</div>
                        <h3 class="tip-title">${tip.title}</h3>
                        <p class="tip-description">${tip.description}</p>
                        <a href="${tip.link}" target="_blank" class="tip-link">
                            ${tip.linkText} →
                        </a>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;
}
