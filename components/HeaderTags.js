class HeaderTags extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y1XFVFSHZN"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config','G-Y1XFVFSHZN');
            </script>
        `;
    }
}

customElements.define('header-tags', HeaderTags);