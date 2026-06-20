class MainNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Logo Section -->
            <div class="bg-white py-4">
                <div class="container mx-auto px-4 flex justify-center">
                    <a href="index.html">
                        <img src="Assets/others/logo_ci.png"
                             alt="Company Logo"
                             class="h-32 md:h-40"
                             width="auto"
                             height="160"
                        >
                    </a>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="glass-effect sticky top-0 z-50 shadow-lg">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center h-20">
                        <!-- Desktop Menu -->
                        <div class="hidden md:flex space-x-4">
                            <a href="index.html"
                               class="inline-block px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-700 
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                ABOUT US
                            </a>

                            <!-- Dropdown Trigger -->
                            <div class="relative">
                                <button class="inline-block px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-700 
                                             hover:bg-indigo-100 hover:scale-105 transition-transform duration-200 flex items-center"
                                        id="dropdownBtn"
                                        aria-expanded="false">
                                    PRODUCT
                                    <svg class="w-4 h-4 ml-1 transition-transform duration-200" 
                                         id="dropdownArrow"
                                         fill="none" 
                                         stroke="currentColor" 
                                         viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>

                                <!-- Dropdown Menu -->
                                <div id="productDropdown"
                                     class="absolute z-50 hidden bg-white shadow-lg mt-2 rounded-lg min-w-[200px] p-2">
                                    <a href="product-womenswear.html"
                                       class="block my-1 px-4 py-2 rounded-md font-bold text-gray-700 
                                              bg-gray-100 hover:bg-indigo-50 hover:scale-105 transition-transform duration-200">
                                        Women
                                    </a>
                                    <a href="product-menswear.html"
                                       class="block my-1 px-4 py-2 rounded-md font-bold text-gray-700 
                                              bg-gray-100 hover:bg-indigo-50 hover:scale-105 transition-transform duration-200">
                                        Men
                                    </a>
                                </div>
                            </div>

                            <a href="our-team.html"
                               class="inline-block px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-700 
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                OUR TEAM
                            </a>
                            <a href="contact-us.html"
                               class="inline-block px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-700 
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                CONTACT US
                            </a>
                            <a href="saved-products.html"
                               class="inline-block px-4 py-2 bg-gray-200 rounded-md text-lg font-bold text-gray-700 
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                SAVED
                            </a>
                        </div>

                        <!-- Mobile Menu Button -->

                        <button id="mobile-menu-button"
                                class="mobile-menu-trigger md:hidden p-2"
                                aria-label="Open Menu"
                                aria-expanded="false">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>

                        <!-- Mobile Menu with Overlay -->
                        <div id="mobile-menu"
                             class="mobile-menu-shell md:hidden"
                             aria-hidden="true">
                            <!-- Overlay Background -->
                            <div id="mobile-menu-overlay"
                                 class="mobile-menu-overlay">
                            </div>

                            <!-- Menu Content -->
                            <div class="mobile-menu-panel">
                                <button id="close-mobile-menu"
                                        class="mobile-menu-close"
                                        aria-label="Close Menu">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>

                                <div class="mobile-menu-links">
                                    <a href="index.html" class="mobile-menu-link">
                                        ABOUT US
                                    </a>
                                    
                                    <!-- Products Dropdown -->
                                    <div class="mobile-menu-group">
                                        <button id="mobile-dropdown-btn"
                                                class="mobile-menu-link mobile-menu-product-button"
                                                aria-expanded="false">
                                            PRODUCT
                                            <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                            </svg>
                                        </button>
                                        <div id="mobile-product-dropdown" class="mobile-submenu hidden">
                                            <a href="product-womenswear.html" class="mobile-submenu-link">
                                                Women
                                            </a>
                                            <a href="product-menswear.html" class="mobile-submenu-link">
                                                Men
                                            </a>
                                        </div>
                                    </div>

                                    <a href="our-team.html" class="mobile-menu-link">
                                        OUR TEAM
                                    </a>
                                    <a href="contact-us.html" class="mobile-menu-link">
                                        CONTACT US
                                    </a>
                                    <a href="saved-products.html" class="mobile-menu-link">
                                        SAVED
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        `;


        const mobileMenuBtn = this.querySelector('#mobile-menu-button');
        const mobileMenu = this.querySelector('#mobile-menu');
        const mobileMenuOverlay = this.querySelector('#mobile-menu-overlay');
        const closeMobileMenuBtn = this.querySelector('#close-mobile-menu');
        const mobileDropdownBtn = this.querySelector('#mobile-dropdown-btn');
        const mobileProductDropdown = this.querySelector('#mobile-product-dropdown');

        const showMenu = () => {
            mobileMenu.classList.add('is-open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const hideMenu = () => {
            mobileMenu.classList.remove('is-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', showMenu);
        closeMobileMenuBtn.addEventListener('click', hideMenu);
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) hideMenu();
        });

        mobileDropdownBtn.addEventListener('click', () => {
            mobileProductDropdown.classList.toggle('hidden');
            mobileDropdownBtn.querySelector('svg').classList.toggle('rotate-180');
            mobileDropdownBtn.setAttribute(
                'aria-expanded',
                String(!mobileProductDropdown.classList.contains('hidden'))
            );
        });

        // Keep existing desktop dropdown functionality
        const dropdownBtn = this.querySelector('#dropdownBtn');
        const dropdown = this.querySelector('#productDropdown');
        const arrow = this.querySelector('#dropdownArrow');


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
            if (mobileMenu.classList.contains('is-open')) {
                return;
            }
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('-translate-y-full');
            } else {
                nav.classList.remove('-translate-y-full');
            }
            lastScroll = currentScroll;
        });
    }
}

if (!customElements.get('main-nav')) {
    customElements.define('main-nav', MainNav);
}
