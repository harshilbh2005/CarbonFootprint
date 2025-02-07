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
      icon: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                   </svg>`,
      label: window.innerWidth < 768 ? "Share on Twitter" : "Tweet",
      class: "bg-[#1DA1F2] hover:bg-[#1a8cd8]",
    },
    {
      name: "facebook",
      icon: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                   </svg>`,
      label: window.innerWidth < 768 ? "Share on Facebook" : "Share",
      class: "bg-[#4267B2] hover:bg-[#365899]",
    },
    {
      name: "linkedin",
      icon: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                   </svg>`,
      label: window.innerWidth < 768 ? "Share on LinkedIn" : "Post",
      class: "bg-[#0077b5] hover:bg-[#006399]",
    },
  ];

  return networks
    .map(
      (network) => `
        <button 
            onclick="shareResult('${network.name}', ${score})"
            class="share-button ${network.class} text-white px-6 py-3 rounded-lg flex items-center gap-3 transform hover:scale-105 transition-all"
        >
            ${network.icon}
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
