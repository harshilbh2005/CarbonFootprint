function generateFooter() {
  const currentYear = new Date().getFullYear();
  return `
        <footer class="footer-section bg-gray-900 text-gray-300 py-8 mt-16">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
                        <p class="text-sm">
                            © ${currentYear} Carbon Footprint Calculator. All rights reserved.
                        </p>
                    </div>
                    
                    <nav class="footer-links">
                        <ul class="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                            <li>
                                <a href="#" class="hover:text-green-400 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:text-green-400 transition-colors">Terms of Use</a>
                            </li>
                            <li>
                                <a href="#" class="hover:text-green-400 transition-colors">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                <div class="mt-6 text-center text-xs text-gray-500">
                    <p>Made with 🌱 for a sustainable future</p>
                </div>
            </div>
        </footer>
    `;
}

// Add footer to the page
function initializeFooter() {
  const footerContainer = document.createElement("div");
  footerContainer.innerHTML = generateFooter();
  document.body.appendChild(footerContainer);
}
