class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="mt-auto border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <div class="container mx-auto px-4 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 class="text-lg font-semibold mb-4">About Us</h4>
                            <p class="text-[hsl(var(--muted-foreground))]">
                                Your trusted partner in manufacturing and exporting sports apparel, delivering excellence since 2025.
                            </p>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul class="space-y-2">
                                <li><a href="index.html" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">About Us</a></li>
                                <li><a href="product-womenswear.html" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Women's Wear</a></li>
                                <li><a href="product-menswear.html" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Men's Wear</a></li>
                                <li><a href="our-team.html" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Our Team</a></li>
                                <li><a href="contact-us.html" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Contact Us</a></li>
                                <li><a href="saved-products.html" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Saved Products</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Contact</h4>
                            <ul class="space-y-3">
                                <li>
                                    <a href="https://wa.me/916360817265"
                                       class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-2"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <i data-lucide="message-circle"></i>
                                        <span>WhatsApp</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:support@cenoviainternational.com"
                                       class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-2">
                                        <i data-lucide="mail"></i>
                                        <span>support@cenoviainternational.com</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+916360817265"
                                       class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-2">
                                        <i data-lucide="phone"></i>
                                        <span>+91 6360817265</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://maps.google.com/?q=324, 2nd Main Extension Road, KR Puram, Bengaluru, Karnataka 560049"
                                       class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-start gap-2"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <i data-lucide="map-pin" class="mt-1"></i>
                                        <span>
                                            324, 2nd Main Extension Road,<br>
                                            KR Puram, Bengaluru,<br>
                                            Karnataka 560049
                                        </span>
                                    </a>
                                </li>
                            </ul>
                         </div>
                         <div class="flex space-x-5">
                             <a href="https://www.facebook.com/CenoviaInternational"
                                class="hover:scale-110 transition-transform"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Cenovia International on Facebook">
                                 <i data-lucide="facebook"></i>
                             </a>
                             <a href="https://x.com/CenoviaInterNat"
                                class="hover:scale-110 transition-transform"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on X">
                                 <i data-lucide="twitter"></i>
                             </a>
                             <a href="https://www.linkedin.com/company/cenovia-international"
                                class="hover:scale-110 transition-transform"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Cenovia International on LinkedIn">
                                <i data-lucide="linkedin"></i>
                             </a>
                             <a href="https://www.instagram.com/cenovia_international/"
                                class="hover:scale-110 transition-transform"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram">
                                 <i data-lucide="instagram"></i>
                             </a>
                         </div>
                     </div>
                    <div class="text-center mt-8 text-[hsl(var(--muted-foreground))]">
                        <p>© 2025 Cenovia International. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        window.CenoviaUI?.refreshIcons(this);
    }
}

if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
}
