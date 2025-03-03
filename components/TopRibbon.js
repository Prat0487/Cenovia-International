class TopRibbon extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="bg-custom-beige py-3">
                <div class="container mx-auto px-4">
                    <!-- Desktop Layout -->
                    <div class="hidden sm:flex justify-between items-center">
                        <div class="flex items-center space-x-4">
                            <a href="tel:+916360817265" class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-lg">
                                <i class="fas fa-phone text-black" aria-hidden="true"></i>
                                <span>+91 6360817265</span>
                            </a>
                            <a href="https://wa.me/916360817265"
                               class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-lg"
                               target="_blank"
                               rel="noopener noreferrer">
                                <i class="fab fa-whatsapp text-black" aria-hidden="true"></i>
                                <span>WhatsApp</span>
                            </a>
                            <a href="mailto:support@cenoviainternational.com" class="text-black hover:text-gray-700 transition-colors duration-200 font-semibold text-lg">
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
                    
                    <!-- Mobile Layout -->
                    <div class="sm:hidden">
                        <!-- Contact Dropdown -->
                        <div class="relative inline-block text-left mb-2" id="contactDropdown">
                            <button type="button" class="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none" id="contactMenuButton" aria-expanded="false" aria-haspopup="true">
                                <i class="fas fa-address-book mr-2"></i> Contact Us
                                <i class="fas fa-chevron-down ml-2"></i>
                            </button>
                            
                            <div class="hidden origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" id="contactMenu" role="menu" aria-orientation="vertical" aria-labelledby="contactMenuButton">
                                <div class="py-1" role="none">
                                    <a href="tel:+916360817265" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                        <i class="fas fa-phone mr-2"></i> +91 6360817265
                                    </a>
                                    <a href="https://wa.me/916360817265" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-whatsapp mr-2"></i> WhatsApp
                                    </a>
                                    <a href="mailto:support@cenoviainternational.com" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                        <i class="fas fa-envelope mr-2"></i> Email Us
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Social Media Icons - Centered on mobile -->
                        <div class="flex justify-center space-x-6">
                            <a href="https://www.facebook.com/CenoviaInternational" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-facebook text-lg"></i>
                            </a>
                            <a href="https://x.com/CenoviaInterNat" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="Follow us on Twitter" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-x text-lg"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/cenovia-international" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="Follow us on LinkedIn" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin text-lg"></i>
                            </a>
                            <a href="https://instagram.com/cenovia_international" class="text-black hover:text-blue-700 transition-all duration-300 hover:scale-110" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-instagram text-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- JavaScript for dropdown toggle -->
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const contactButton = document.getElementById('contactMenuButton');
                    const contactMenu = document.getElementById('contactMenu');
                    
                    if (contactButton && contactMenu) {
                        contactButton.addEventListener('click', function() {
                            contactMenu.classList.toggle('hidden');
                            contactButton.setAttribute('aria-expanded', contactMenu.classList.contains('hidden') ? 'false' : 'true');
                        });
                        
                        // Close dropdown when clicking outside
                        document.addEventListener('click', function(event) {
                            if (!document.getElementById('contactDropdown').contains(event.target)) {
                                contactMenu.classList.add('hidden');
                                contactButton.setAttribute('aria-expanded', 'false');
                            }
                        });
                    }
                });
            </script>
        `;
    }
}

customElements.define('top-ribbon', TopRibbon);