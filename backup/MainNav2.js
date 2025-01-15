class MainNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="glass-effect sticky top-0 z-50 shadow-lg transform transition-transform duration-300">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center h-20">
                        <a href="index.html" class="flex-shrink-0">
                            <img src="Assets/others/your-logo.png" alt="Company Logo" class="h-12" width="auto" height="48">
                        </a>

                        <!-- Desktop Navigation -->
                        <div class="hidden md:flex space-x-8">
                            <a href="index.html" 
                               class="nav-link hover:text-indigo-700 focus:text-indigo-700 focus:outline-none transition-colors duration-200">
                                ABOUT US
                            </a>
                            
                            <div class="relative">
                                <button class="nav-link flex items-center" 
                                        id="dropdownBtn" 
                                        aria-expanded="false" 
                                        aria-controls="productDropdown">
                                    PRODUCT
                                    <svg class="w-4 h-4 ml-1 transition-transform duration-200" 
                                         id="dropdownArrow"
                                         fill="none" 
                                         stroke="currentColor" 
                                         viewBox="0 0 24 24">
                                        <path stroke-linecap="round" 
                                              stroke-linejoin="round" 
                                              stroke-width="2" 
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>
                                <div id="productDropdown" 
                                     class="origin-top absolute z-50 hidden bg-white shadow-lg mt-2 rounded-lg overflow-hidden min-w-[200px] transition-all duration-200 transform scale-95 opacity-0">
                                    <a href="product-silvercraft.html" 
                                       class="block px-6 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                                        Silvercraft
                                    </a>
                                    <a href="product-sportgoods.html" 
                                       class="block px-6 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                                        Sport Goods
                                    </a>
                                </div>
                            </div>

                            <a href="our-team.html" 
                               class="nav-link hover:text-indigo-700 focus:text-indigo-700 focus:outline-none transition-colors duration-200">
                                OUR TEAM
                            </a>
                            <a href="contact-us.html" 
                               class="nav-link hover:text-indigo-700 focus:text-indigo-700 focus:outline-none transition-colors duration-200">
                                CONTACT US
                            </a>
                        </div>

                        <!-- Mobile Menu Button -->
                        <button class="md:hidden p-2" 
                                id="mobile-menu-button" 
                                aria-label="Toggle menu"
                                aria-expanded="false"
                                aria-controls="mobile-menu">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Mobile Menu -->
                    <div id="mobile-menu" 
                         class="md:hidden hidden transform transition-transform duration-300 ease-in-out">
                        <div class="px-2 pt-2 pb-3 space-y-1">
                            <a href="index.html" 
                               class="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                                ABOUT US
                            </a>
                            <a href="product-silvercraft.html" 
                               class="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                                SILVERCRAFT
                            </a>
                            <a href="product-sportgoods.html" 
                               class="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                                SPORT GOODS
                            </a>
                            <a href="our-team.html" 
                               class="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                                OUR TEAM
                            </a>
                            <a href="contact-us.html" 
                               class="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                                CONTACT US
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        this.initializeEventListeners();
        this.setActiveLink();
    }

    initializeEventListeners() {
        const dropdownBtn = this.querySelector('#dropdownBtn');
        const dropdown = this.querySelector('#productDropdown');
        const arrow = this.querySelector('#dropdownArrow');
        const mobileMenuBtn = this.querySelector('#mobile-menu-button');
        const mobileMenu = this.querySelector('#mobile-menu');
        const nav = this.querySelector('nav');

        // Dropdown functionality
        dropdownBtn.addEventListener('click', () => {
            const isHidden = dropdown.classList.contains('hidden');
            dropdown.classList.toggle('hidden');
            dropdown.classList.toggle('scale-95');
            dropdown.classList.toggle('opacity-0');
            dropdown.classList.toggle('scale-100');
            dropdown.classList.toggle('opacity-100');
            arrow.style.transform = isHidden ? 'rotate(180deg)' : '';
            dropdownBtn.setAttribute('aria-expanded', !isHidden);
        });

        // Mobile menu functionality
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('-translate-y-full');
            mobileMenu.classList.toggle('opacity-0');
            mobileMenuBtn.setAttribute('aria-expanded', !isHidden);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                dropdown.classList.add('hidden', 'scale-95', 'opacity-0');
                dropdown.classList.remove('scale-100', 'opacity-100');
                arrow.style.transform = '';
                dropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Hide/Show on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('-translate-y-full');
            } else {
                nav.classList.remove('-translate-y-full');
            }
            lastScroll = currentScroll;
        });
    }

    setActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('text-indigo-700', 'border-b-2', 'border-indigo-700');
            }
        });
    }
}

customElements.define('main-nav', MainNav);