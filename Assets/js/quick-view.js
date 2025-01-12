class QuickView {
    constructor() {
        this.modal = this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black bg-opacity-50" id="modal-overlay"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-11/12 max-w-4xl">
                <div class="relative p-6">
                    <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" id="close-modal">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="quick-view-content">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const quickViewBtn = e.target.closest('.quick-view button');
            if (quickViewBtn) {
                const productCard = quickViewBtn.closest('.product-card');
                this.showQuickView(productCard);
            }
        });

        this.modal.querySelector('#modal-overlay').addEventListener('click', () => this.hideModal());
        this.modal.querySelector('#close-modal').addEventListener('click', () => this.hideModal());
    }

    async showQuickView(productCard) {
        const productId = productCard.dataset.productId;
        const products = await new ProductLoader().loadProducts('silvercraft');
        const product = products.find(p => p.id.toString() === productId);
        
        if (product) {
            const content = this.modal.querySelector('#quick-view-content');
            content.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="w-full rounded-lg">
                </div>
                <div class="product-info">
                    <h2 class="text-2xl font-bold mb-4">${product.name}</h2>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    <div class="specifications mb-6">
                        <h3 class="font-semibold mb-2">Specifications:</h3>
                        <p>Material: ${product.attributes.material}</p>
                        <p>Weight: ${product.attributes.weight}g</p>
                        <p>Purity: ${product.attributes.purity}</p>
                    </div>
                    <div class="price-enquiry flex items-center justify-between">
                        <span class="text-2xl font-bold">${product.price}</span>
                        <a href="contact-us.html" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Enquire Now
                        </a>
                    </div>
                </div>
            `;
            this.showModal();
        }
    }

    showModal() {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}
