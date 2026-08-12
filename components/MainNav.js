class MainNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="bg-white/90 border-b border-[hsl(var(--border))]">
                <div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <a href="index.html" class="flex items-center gap-3">
                        <img src="Assets/others/logo_ci.png"
                             alt="Cenovia International"
                             class="h-14 md:h-16 w-auto"
                             width="auto"
                             height="64">
                    </a>
                    <div class="hidden md:flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                        <i data-lucide="globe"></i>
                        <span>Export-ready sportswear for bulk buyers</span>
                    </div>
                </div>
            </div>

            <nav class="glass-effect sticky top-0 z-50 transition-transform duration-300">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center h-16">
                        <div class="hidden md:flex items-center gap-2 flex-1">
                            <div class="global-search hidden lg:block" id="globalSearch">
                                <label class="sr-only" for="globalSearchInput">Search all products</label>
                                <div class="global-search__field">
                                    <i data-lucide="search" aria-hidden="true"></i>
                                    <input type="search" id="globalSearchInput" placeholder="Search styles, fabric, grammage..." autocomplete="off">
                                </div>
                                <div id="globalSearchResults" class="global-search__results hidden"></div>
                            </div>
                            <div class="flex items-center gap-1 ml-auto">
                            <a href="index.html" class="ui-nav-link">About</a>

                            <div class="relative">
                                <button class="ui-nav-link"
                                        id="dropdownBtn"
                                        aria-expanded="false">
                                    Product
                                    <i data-lucide="chevron-down" id="dropdownArrow"></i>
                                </button>
                                <div id="productDropdown"
                                     class="absolute z-50 hidden ui-card mt-2 min-w-[220px] p-2">
                                    <a href="product-womenswear.html" class="ui-nav-link w-full justify-start">Women</a>
                                    <a href="product-menswear.html" class="ui-nav-link w-full justify-start">Men</a>
                                </div>
                            </div>

                            <a href="our-team.html" class="ui-nav-link">Team</a>
                            <a href="contact-us.html" class="ui-nav-link">Contact</a>
                            <a href="saved-products.html" class="ui-nav-link" id="navSavedLink">
                                <i data-lucide="heart"></i>
                                Saved
                                <span id="navSavedCount" class="ui-badge-count hidden">0</span>
                            </a>
                            </div>
                        </div>

                        <button id="mobile-menu-button"
                                class="mobile-menu-trigger md:hidden p-2"
                                aria-label="Open Menu"
                                aria-expanded="false">
                            <i data-lucide="menu"></i>
                        </button>

                        <div id="mobile-menu"
                             class="mobile-menu-shell md:hidden"
                             aria-hidden="true">
                            <div id="mobile-menu-overlay" class="mobile-menu-overlay"></div>
                            <div class="mobile-menu-panel">
                                <button id="close-mobile-menu"
                                        class="mobile-menu-close"
                                        aria-label="Close Menu">
                                    <i data-lucide="x"></i>
                                </button>

                                <div class="mobile-menu-links">
                                    <div class="global-search global-search--mobile">
                                        <label class="sr-only" for="globalSearchInputMobile">Search all products</label>
                                        <div class="global-search__field">
                                            <i data-lucide="search" aria-hidden="true"></i>
                                            <input type="search" id="globalSearchInputMobile" placeholder="Search all products..." autocomplete="off">
                                        </div>
                                        <div class="global-search__results hidden"></div>
                                    </div>
                                    <a href="index.html" class="mobile-menu-link">About us</a>
                                    <div class="mobile-menu-group">
                                        <button id="mobile-dropdown-btn"
                                                class="mobile-menu-link mobile-menu-product-button"
                                                aria-expanded="false">
                                            Product
                                            <i data-lucide="chevron-down"></i>
                                        </button>
                                        <div id="mobile-product-dropdown" class="mobile-submenu hidden">
                                            <a href="product-womenswear.html" class="mobile-submenu-link">Women</a>
                                            <a href="product-menswear.html" class="mobile-submenu-link">Men</a>
                                        </div>
                                    </div>
                                    <a href="our-team.html" class="mobile-menu-link">Our team</a>
                                    <a href="contact-us.html" class="mobile-menu-link">Contact us</a>
                                    <a href="saved-products.html" class="mobile-menu-link">Saved products</a>
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
            mobileDropdownBtn.setAttribute(
                'aria-expanded',
                String(!mobileProductDropdown.classList.contains('hidden'))
            );
        });

        const dropdownBtn = this.querySelector('#dropdownBtn');
        const dropdown = this.querySelector('#productDropdown');
        const arrow = this.querySelector('#dropdownArrow');
        const nav = this.querySelector('nav');

        dropdownBtn.addEventListener('click', () => {
            const isHidden = dropdown.classList.contains('hidden');
            dropdown.classList.toggle('hidden');
            arrow.style.transform = isHidden ? 'rotate(180deg)' : '';
            dropdownBtn.setAttribute('aria-expanded', String(isHidden));
        });

        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                dropdown.classList.add('hidden');
                arrow.style.transform = '';
                dropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            if (mobileMenu.classList.contains('is-open')) return;
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('-translate-y-full');
            } else {
                nav.classList.remove('-translate-y-full');
            }
            lastScroll = currentScroll;
        });

        const updateSavedCount = () => {
            const count = typeof BuyerUtils !== 'undefined' ? BuyerUtils.getWishlistCount() : 0;
            const badge = this.querySelector('#navSavedCount');
            if (!badge) return;
            badge.textContent = String(count);
            badge.classList.toggle('hidden', count === 0);
        };

        window.addEventListener('cenovia:wishlist-changed', updateSavedCount);
        document.addEventListener('DOMContentLoaded', updateSavedCount);
        updateSavedCount();

        document.dispatchEvent(new CustomEvent('cenovia:nav-ready'));
        window.CenoviaUI?.refreshIcons(this);
    }
}

if (!customElements.get('main-nav')) {
    customElements.define('main-nav', MainNav);
}
