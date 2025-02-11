class TopRibbon extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="bg-custom-beige py-3">
                <div class="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                    <div class="flex items-center space-x-4 mb-2 sm:mb-0">
                        <a href="tel:+919727444678" class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-base sm:text-lg">
                            <i class="fas fa-phone text-black" aria-hidden="true"></i>
                            <span>+91 6360817265</span>
                        </a>
                        <a href="mailto:support@cenoviainternational.com" class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-base sm:text-lg">
                            <i class="fas fa-envelope text-black" aria-hidden="true"></i>
                            <span>support@cenoviainternational.com</span>
                        </a>
                    </div>
                    <div class="flex space-x-6">
                        <a href="#" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="Facebook">
                            <i class="fab fa-facebook text-lg"></i>
                        </a>
                        <a href="#" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="Twitter">
                            <i class="fab fa-twitter text-lg"></i>
                        </a>
                        <a href="#" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                            <i class="fab fa-linkedin text-lg"></i>
                        </a>
                        <a href="#" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="Instagram">
                            <i class="fab fa-instagram text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('top-ribbon', TopRibbon);