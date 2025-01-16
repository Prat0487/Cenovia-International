class MainNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Logo Section -->
            <div class="bg-white py-4">
                <div class="container mx-auto px-4 flex justify-center">
                    <a href="index.html">

                        <img src="Assets/others/your-logo.png"
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
                                    <a href="product-silvercraft.html"
                                       class="block my-1 px-4 py-2 rounded-md font-bold text-gray-700 
                                              bg-gray-100 hover:bg-indigo-50 hover:scale-105 transition-transform duration-200">
                                        Silvercraft
                                    </a>
                                    <a href="product-sportgoods.html"
                                       class="block my-1 px-4 py-2 rounded-md font-bold text-gray-700 
                                              bg-gray-100 hover:bg-indigo-50 hover:scale-105 transition-transform duration-200">
                                        Sport Goods
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
                        </div>

                        <!-- Mobile Menu Button -->
                        <button class="md:hidden p-2"
                                id="mobile-menu-button"
                                aria-label="Toggle menu">
                            <svg class="w-6 h-6"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>

                            </svg>
                        </button>
                    </div>


                    <!-- Mobile Menu -->
                    <div class="md:hidden hidden" id="mobile-menu">
                        <div class="px-2 pt-2 pb-3 space-y-1">
                            <a href="index.html"
                               class="block px-3 py-2 rounded-md font-bold text-lg text-gray-700 bg-gray-200 
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                ABOUT US
                            </a>
                            <a href="product-silvercraft.html"
                               class="block px-3 py-2 rounded-md font-bold text-lg text-gray-700 bg-gray-200 
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                SILVERCRAFT
                            </a>
                            <a href="product-sportgoods.html"
                               class="block px-3 py-2 rounded-md font-bold text-lg text-gray-700 bg-gray-200
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                SPORT GOODS
                            </a>
                            <a href="our-team.html"
                               class="block px-3 py-2 rounded-md font-bold text-lg text-gray-700 bg-gray-200
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                OUR TEAM
                            </a>
                            <a href="contact-us.html"
                               class="block px-3 py-2 rounded-md font-bold text-lg text-gray-700 bg-gray-200
                                      hover:bg-indigo-100 hover:scale-105 transition-transform duration-200">
                                CONTACT US
                            </a>

                        </div>
                    </div>
                </div>
            </nav>
        `;
        this.initializeEventListeners();
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
}

customElements.define('main-nav', MainNav);