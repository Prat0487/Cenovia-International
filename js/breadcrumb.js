class BreadcrumbNav {
    constructor() {
        this.container = document.getElementById('breadcrumb');
    }

    updateBreadcrumb(path) {
        const parts = path.split('/').filter(Boolean);
        let html = '<nav aria-label="breadcrumb"><ol class="breadcrumb">';
        html += '<li class="breadcrumb-item"><a href="/">Home</a></li>';
        
        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            if (isLast) {
                html += `<li class="breadcrumb-item active" aria-current="page">${part}</li>`;
            } else {
                const url = '/' + parts.slice(0, index + 1).join('/');
                html += `<li class="breadcrumb-item"><a href="${url}">${part}</a></li>`;
            }
        });
        
        html += '</ol></nav>';
        this.container.innerHTML = html;
    }
}
