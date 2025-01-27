class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-gray-100 text-gray-700 mt-auto">
                <div class="container mx-auto px-4 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 class="text-lg font-semibold mb-4">About Us</h4>
                            <p class="text-gray-600">
                                Your trusted partner in silvercraft and sporting goods, delivering excellence since 2025.
                            </p>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul class="space-y-2">
                                <li><a href="index.html" class="text-gray-600 hover:text-gray-800 transition-colors duration-200">About Us</a></li>
                                <li><a href="product-womenswear.html" class="text-gray-600 hover:text-gray-800 transition-colors duration-200">Silvercraft</a></li>
                                <li><a href="product-menswear.html" class="text-gray-600 hover:text-gray-800 transition-colors duration-200">Sport Goods</a></li>
                                <li><a href="our-team.html" class="text-gray-600 hover:text-gray-800 transition-colors duration-200">Our Team</a></li>
                                <li><a href="contact-us.html" class="text-gray-600 hover:text-gray-800 transition-colors duration-200">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Contact</h4>
                            <ul class="space-y-2">
                                <li class="flex items-center text-gray-600">
                                    <i class="fas fa-envelope w-6"></i>
                                    <span class="ml-2">example@email.com</span>
                                </li>
                                <li class="flex items-center text-gray-600">
                                    <i class="fas fa-phone w-6"></i>
                                    <span class="ml-2">+91 97274 44678</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-600 hover:text-gray-800 transition-colors duration-200" aria-label="Facebook">
                                    <i class="fab fa-facebook text-lg"></i>
                                </a>
                                <a href="#" class="text-gray-600 hover:text-gray-800 transition-colors duration-200" aria-label="Twitter">
                                    <i class="fab fa-twitter text-lg"></i>
                                </a>
                                <a href="#" class="text-gray-600 hover:text-gray-800 transition-colors duration-200" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin text-lg"></i>
                                </a>
                                <a href="#" class="text-gray-600 hover:text-gray-800 transition-colors duration-200" aria-label="Instagram">
                                    <i class="fab fa-instagram text-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-8 text-gray-600">
                        <p>© 2025 Cenovia International. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);