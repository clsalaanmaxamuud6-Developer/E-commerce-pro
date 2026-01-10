const config = {
    whatsapp: "252637265712",
    currency: "$",
    delay: 800
};

let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    initStore();
    setupAnimations();
});

function initStore() {
    const buttons = document.querySelectorAll('.buy-btn');
    const badge = document.createElement('div');
    badge.id = 'cart-badge';
    badge.style.cssText = "position:fixed;top:20px;right:80px;background:#e67e22;color:white;padding:5px 12px;border-radius:50%;font-weight:bold;display:none;z-index:1001;";
    document.body.appendChild(badge);

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const item = {
                name: card.querySelector('h3').textContent,
                price: card.querySelector('.price').textContent
            };
            
            triggerAction(item, badge);
        });
    });
}

function triggerAction(item, badge) {
    cartCount++;
    badge.innerText = cartCount;
    badge.style.display = 'block';

    const notify = document.createElement('div');
    notify.className = 'toast-notification';
    notify.innerHTML = `🛒 Added to cart: <strong>${item.name}</strong>`;
    document.body.appendChild(notify);

    setTimeout(() => {
        notify.classList.add('fade-out');
        const msg = `Order Inquiry:\n\nProduct: ${item.name}\nPrice: ${item.price}\nStore: EliteShop Online`;
        window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
        setTimeout(() => notify.remove(), 500);
    }, config.delay);
}

function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
}
