class BuyerBar {
    constructor() {
        this.bar = null;
        this.init();
    }

    init() {
        if (document.getElementById('buyerBar')) return;

        const bar = document.createElement('div');
        bar.id = 'buyerBar';
        bar.className = 'buyer-bar hidden';
        bar.innerHTML = `
            <div class="buyer-bar__inner">
                <div class="buyer-bar__summary">
                    <i class="fas fa-heart text-red-500" aria-hidden="true"></i>
                    <span id="buyerBarCount">0 saved</span>
                </div>
                <div class="buyer-bar__actions">
                    <a href="saved-products.html" class="buyer-bar__link">View shortlist</a>
                    <a href="contact-us.html" id="buyerBarInquiry" class="buyer-bar__cta">Send inquiry</a>
                </div>
            </div>
        `;
        document.body.appendChild(bar);
        this.bar = bar;
        this.countEl = bar.querySelector('#buyerBarCount');
        this.inquiryEl = bar.querySelector('#buyerBarInquiry');

        window.addEventListener('cenovia:wishlist-changed', () => this.update());
        this.update();
    }

    update() {
        const keys = BuyerUtils.getWishlist();
        const count = keys.length;

        if (!count) {
            this.bar.classList.add('hidden');
            return;
        }

        this.bar.classList.remove('hidden');
        this.countEl.textContent = `${count} saved product${count === 1 ? '' : 's'}`;
        this.inquiryEl.href = BuyerUtils.buildInquiryUrl(keys);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof BuyerUtils !== 'undefined') {
        new BuyerBar();
    }
});
