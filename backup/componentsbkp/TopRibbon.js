class TopRibbon extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-3">
                <div class="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                    <div class="flex items-center space-x-4 mb-2 sm:mb-0">
                        <a href="tel:+919727444678" class="hover:text-gray-300 transition-colors duration-200">
                            <i class="fas fa-phone" aria-hidden="true"></i>
                            <span>+91 97274 44678</span>
                        </a>
                        <a href="mailto:example@email.com" class="hover:text-gray-300 transition-colors duration-200">
                            <i class="fas fa-envelope" aria-hidden="true"></i>
                            <span>example@email.com</span>
                        </a>
                    </div>
                    <div class="flex space-x-6">
                        <a href="#" class="hover:text-blue-300 transition-all duration-300 hover:scale-110" aria-label="Facebook">
                            <i class="fab fa-facebook text-lg"></i>
                        </a>
                        <a href="#" class="hover:text-blue-300 transition-all duration-300 hover:scale-110" aria-label="Twitter">
                            <i class="fab fa-twitter text-lg"></i>
                        </a>
                        <a href="#" class="hover:text-blue-300 transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                            <i class="fab fa-linkedin text-lg"></i>
                        </a>
                        <a href="#" class="hover:text-blue-300 transition-all duration-300 hover:scale-110" aria-label="Instagram">
                            <i class="fab fa-instagram text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('top-ribbon', TopRibbon);

customElements.define('top-ribbon', TopRibbon);