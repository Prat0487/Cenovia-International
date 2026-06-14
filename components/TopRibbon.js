class TopRibbon extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="bg-custom-beige py-3">
                <div class="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-3">
                    <div class="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mb-2 lg:mb-0 text-center lg:text-left">
                        <a href="tel:+916360817265" class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-base sm:text-lg">
                            <i class="fas fa-phone text-black" aria-hidden="true"></i>
                            <span>+91 6360817265</span>
                        </a>
                        <a href="https://wa.me/916360817265"
                           class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-base sm:text-lg"
                           target="_blank"
                           rel="noopener noreferrer">
                            <i class="fab fa-whatsapp text-black" aria-hidden="true"></i>
                            <span>WhatsApp</span>
                        </a>
                        <a href="mailto:support@cenoviainternational.com" class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-base sm:text-lg">
                            <i class="fas fa-envelope text-black" aria-hidden="true"></i>
                            <span>support@cenoviainternational.com</span>
                        </a>
                    </div>
                    <div class="flex space-x-6">
                        <a href="https://www.facebook.com/CenoviaInternational" 
                           class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" 
                           aria-label="Follow us on Facebook"
                           target="_blank"
                           rel="noopener noreferrer">
                            <i class="fab fa-facebook text-lg"></i>
                        </a>
                        <a href="https://x.com/CenoviaInterNat"
                            class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110"
                            aria-label="Follow us on Twitter"
                            target="_blank"
                            rel="noopener noreferrer">
                            <i class="fab fa-x text-lg"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/cenovia-international" 
                           class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" 
                           aria-label="Follow us on LinkedIn"
                           target="_blank"
                           rel="noopener noreferrer">
                            <i class="fab fa-linkedin text-lg"></i>
                        </a>
                       <a href="https://instagram.com/cenovia_international" 
                           class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" 
                           aria-label="Follow us on Instagram"
                           target="_blank"
                           rel="noopener noreferrer">
                           <i class="fab fa-instagram text-lg"></i>
                       </a>
                   </div>
               </div>
            </div>
        `;
    }
}

if (!customElements.get('top-ribbon')) {
    customElements.define('top-ribbon', TopRibbon);
}
