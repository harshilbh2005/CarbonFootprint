const SHARE_TEMPLATES = {
  twitter: (score) => ({
    url: "https://twitter.com/intent/tweet",
    params: {
      text: `🌍 I just calculated my carbon footprint: ${score} tons CO₂/year! Calculate yours and join the fight against climate change.`,
      url: window.location.href,
    },
  }),
  facebook: () => ({
    url: "https://www.facebook.com/sharer/sharer.php",
    params: {
      u: window.location.href,
    },
  }),
  linkedin: (score) => ({
    url: "https://www.linkedin.com/shareArticle",
    params: {
      mini: true,
      url: window.location.href,
      title: "Carbon Footprint Calculator",
      summary: `I just calculated my carbon footprint: ${score} tons CO₂/year! Calculate yours and join the sustainability movement.`,
    },
  }),
};

function generateSocialSection(score) {
  return `
        <div class="social-engagement-section">
            <div class="share-container text-center">
                <h3 class="text-2xl font-bold mb-4">Share Your Impact</h3>
                <p class="text-gray-600 mb-6">Inspire others to calculate their carbon footprint!</p>
                
                <div class="social-buttons flex justify-center gap-4 mb-8">
                    ${generateSocialButtons(score)}
                </div>
            </div>

            <div class="newsletter-container bg-green-50 p-8 rounded-lg">
                <h3 class="text-xl font-bold mb-2">Stay Updated</h3>
                <p class="text-gray-600 mb-4">Get monthly tips on reducing your carbon footprint</p>
                
                <form id="newsletterForm" class="flex gap-2">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        class="flex-grow px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                        required
                    >
                    <button 
                        type="submit"
                        class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                        <span>Subscribe</span>
                        <span class="text-xl">→</span>
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Add responsive handling for social buttons
function generateSocialButtons(score) {
  const networks = [
    {
      name: "twitter",
      icon: "fab fa-twitter",
      label: window.innerWidth < 768 ? "Share on Twitter" : "Tweet",
      class: "hover:bg-gray-100",
    },
    {
      name: "facebook",
      icon: "fab fa-facebook-f",
      label: window.innerWidth < 768 ? "Share on Facebook" : "Share",
      class: "hover:bg-gray-100",
    },
    {
      name: "linkedin",
      icon: "fab fa-linkedin-in",
      label: window.innerWidth < 768 ? "Share on LinkedIn" : "Post",
      class: "hover:bg-gray-100",
    },
  ];

  return networks
    .map(
      (network) => `
        <button 
            onclick="shareResult('${network.name}', ${score})"
            class="share-button border border-gray-300 px-6 py-3 rounded-lg flex items-center gap-3 transform hover:scale-105 transition-all ${network.class}"
        >
            <i class="${network.icon} w-5 h-5 flex items-center justify-center text-xl"></i>
            <span>${network.label}</span>
        </button>
    `
    )
    .join("");
}

function shareResult(network, score) {
  const template = SHARE_TEMPLATES[network](score);
  const url = new URL(template.url);
  Object.entries(template.params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  window.open(url.toString(), "_blank");
}

function initializeNewsletter() {
  document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      // Simulate API call
      showToast("Thanks for subscribing! 🌱");
      this.reset();
    });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.remove("translate-y-full", "opacity-0");
  }, 100);

  // Hide and remove toast
  setTimeout(() => {
    toast.classList.add("translate-y-full", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add window resize handler for responsive updates
window.addEventListener("resize", () => {
  if (document.querySelector(".social-buttons")) {
    const buttons = generateSocialButtons(
      document.getElementById("carbonScore").textContent
    );
    document.querySelector(".social-buttons").innerHTML = buttons;
  }
});

// Add this function to check if Font Awesome is loaded
function isFontAwesomeLoaded() {
  return document.querySelector(".fa-brands") !== null;
}

// Update the showResults function to ensure icons are loaded
function showResults(total, breakdown) {
  const calculator = document.getElementById("calculator");
  const results = document.getElementById("results");
  const resultsContent = document.querySelector(".results-content");

  calculator.classList.add("fade-out");

  setTimeout(() => {
    calculator.style.display = "none";
    results.style.display = "block";

    // Initialize results content
    resultsContent.classList.add("fade-in");

    // ... existing chart initialization code ...

    // Add social section immediately
    const socialSection = document.createElement("div");
    socialSection.className = "mt-16 border-t pt-12";
    socialSection.innerHTML = generateSocialSection(total.toFixed(1));
    resultsContent.appendChild(socialSection);

    // Initialize newsletter
    initializeNewsletter();

    // Animate social buttons
    document.querySelectorAll(".share-button").forEach((button, index) => {
      button.style.opacity = "0";
      button.style.transform = "translateY(20px)";

      setTimeout(() => {
        button.style.transition = "all 0.5s ease";
        button.style.opacity = "1";
        button.style.transform = "translateY(0)";
      }, 700 + index * 100);
    });
  }, 500);
}
