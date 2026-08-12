import { animate, stagger, inView } from 'https://esm.sh/motion@11.15.0';

const CenoviaUI = {
    animate,
    stagger,
    inView,

    refreshIcons(root = document) {
        if (!window.lucide?.createIcons) return;
        window.lucide.createIcons({
            attrs: {
                'stroke-width': 1.75,
                class: 'ui-icon'
            },
            nameAttr: 'data-lucide',
            root: root === document ? document.body : root
        });
    },

    toast(message) {
        let host = document.getElementById('uiToastHost');
        if (!host) {
            host = document.createElement('div');
            host.id = 'uiToastHost';
            host.className = 'ui-toast-host';
            host.setAttribute('role', 'status');
            document.body.appendChild(host);
        }

        const toast = document.createElement('div');
        toast.className = 'ui-toast';
        toast.textContent = message;
        host.appendChild(toast);
        animate(toast, { opacity: [0, 1], y: [12, 0] }, { duration: 0.28 });
        window.setTimeout(() => {
            animate(toast, { opacity: 0, y: 8 }, { duration: 0.2 }).finished.then(() => toast.remove());
        }, 2400);
    },

    reveal(selector) {
        document.querySelectorAll(selector).forEach((element, index) => {
            inView(element, () => {
                animate(element, { opacity: [0, 1], y: [18, 0] }, { duration: 0.45, delay: index * 0.04 });
            }, { once: true, amount: 0.2 });
        });
    },

    animateCards(container) {
        if (!container) return;
        const cards = container.querySelectorAll('.product-card, .ui-reveal');
        if (!cards.length) return;
        animate(cards, { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.04), duration: 0.35 });
    }
};

window.CenoviaUI = CenoviaUI;

function whenReady(fn) {
    if (window.lucide?.createIcons) {
        fn();
        return;
    }
    const started = Date.now();
    const timer = window.setInterval(() => {
        if (window.lucide?.createIcons || Date.now() - started > 4000) {
            window.clearInterval(timer);
            fn();
        }
    }, 40);
}

function bootUi() {
    whenReady(() => {
        CenoviaUI.refreshIcons();
        CenoviaUI.reveal('[data-ui-reveal]');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootUi);
} else {
    bootUi();
}

document.addEventListener('cenovia:nav-ready', () => CenoviaUI.refreshIcons());
