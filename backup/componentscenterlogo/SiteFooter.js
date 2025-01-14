class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-gray-800 text-white mt-auto">
                <div class="container mx-auto px-4 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 class="text-lg font-semibold mb-4">About Us</h4>
                            <p class="text-gray-400">
                                Your trusted partner in silvercraft and sporting goods, delivering excellence since 2025.
                            </p>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul class="space-y-2">
                                <li><a href="index.html" class="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                                <li><a href="product-silvercraft.html" class="text-gray-400 hover:text-white transition-colors duration-200">Silvercraft</a></li>
                                <li><a href="product-sportgoods.html" class="text-gray-400 hover:text-white transition-colors duration-200">Sport Goods</a></li>
                                <li><a href="our-team.html" class="text-gray-400 hover:text-white transition-colors duration-200">Our Team</a></li>
                                <li><a href="contact-us.html" class="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2">
                                <li class="flex items-center text-gray-400">
                                    <i class="fas fa-envelope w-6"></i>
                                    <a href="mailto:info@example.com" class="hover:text-white transition-colors duration-200">info@example.com</a>
                                </li>
                                <li class="flex items-center text-gray-400">
                                    <i class="fas fa-phone w-6"></i>
                                    <a href="tel:+1234567890" class="hover:text-white transition-colors duration-200">(123) 456-7890</a>
                                </li>
                                <li class="flex items-start text-gray-400">
                                    <i class="fas fa-map-marker-alt w-6 mt-1"></i>
                                    <span>123 Street Name<br>City, State 12345</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
                                    <i class="fab fa-twitter text-2xl"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Facebook">
                                    <i class="fab fa-facebook text-2xl"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin text-2xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2025 Cenovia International. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}
customElements.define('site-footer', SiteFooter);

customElements.define('site-footer', SiteFooter);