// ===== ROSANO LANDING PAGE JS =====

// --- Default Collections (landing page category cards) ---
const DEFAULT_COLLECTIONS = [
    {
        id: 'sizin', category: 'sizin',
        title: 'Sizin İçin',
        description: 'Bloxie tokalar, jumbo scrunchie\'ler ve Rosie Belle bluzlar.',
        image: 'images/products/bloxie-scrunchie-set.png',
        bgClass: 'bg-rose'
    },
    {
        id: 'dostunuz', category: 'dostunuz',
        title: 'Dostunuz İçin',
        description: 'Kelebek yakalıklar, çiçekli modeller ve PawBow serisi.',
        image: 'images/products/dog-collar-red.png',
        bgClass: 'bg-green'
    },
    {
        id: 'birlikte', category: 'birlikte',
        title: 'Birlikte (Mükemmel Uyum)',
        description: 'Sahibine uygun toka ve köpeğine uygun yakalık içeren ikili setler.',
        image: 'images/products/scrunchie-plaid-lace.png',
        bgClass: 'bg-gold'
    }
];

// --- Default Products (actual items sold, managed via admin) ---
const DEFAULT_CATALOG_PRODUCTS = [
    {
        id: 101, category: 'sizin',
        title: 'Bloxie Toka - Çiçek Deseni',
        description: 'El yapımı çiçek desenli Bloxie toka. Her parça özenle stüdyomuzda dikilmektedir.',
        image: 'images/products/bloxie-scrunchie-set.png',
        prices: [{ name: 'Bloxie Toka', price: '1.250 TL' }],
        link: 'https://www.shopier.com/rosanostudio',
        bgClass: 'bg-rose'
    },
    {
        id: 102, category: 'dostunuz',
        title: 'PawBow Star Yakalık',
        description: 'Kırmızı papyonlu el yapımı köpek yakalığı. Patili dostunuz için en şık aksesuar.',
        image: 'images/products/dog-collar-red.png',
        prices: [{ name: 'PawBow Star', price: '1.700 TL' }],
        link: 'https://www.shopier.com/rosanostudio',
        bgClass: 'bg-green'
    },
    {
        id: 103, category: 'birlikte',
        title: 'Ekose & Dantel İkili Set',
        description: 'Sahibine uygun scrunchie ve köpeğine uygun yakalık içeren uyumlu ikili set.',
        image: 'images/products/scrunchie-plaid-lace.png',
        prices: [{ name: 'İkili Takım', price: '3.000 TL' }],
        link: 'https://www.shopier.com/rosanostudio',
        bgClass: 'bg-gold'
    }
];

const DEFAULT_CONTENT = {
    heroBadge: 'Özel Tasarım El Yapımı Aksesuarlar',
    heroTitle: 'Mutluluk <br>Küçük Detaylarda Saklıdır',
    heroSubtitle: 'Sizin ve patili dostunuzun uyumlu bir stile sahip olması için özenle tasarlanmış, tamamen el işçiliği butik aksesuarlar.',
    storyTitle: 'Tebessümün Hikayesi',
    storyParagraphs: [
        'Rosano, modaya ve saç aksesuarlarına olan ilgimin, patili dostum için aldığım aksesuarlarla birleşmesi sonucu benzersiz ve uyumlu tasarımlar oluşturma fikriyle doğdu.',
        'Markanın ismi benim için çok özel bir anlam taşıyor. Adım olan <strong>"Hande"</strong>nin anlamı olan "Tebessüm, gülümsemek" ile soyadım <strong>Komorosano</strong>\'yu kısalttım. Bunu da İngilizcede gül anlamına gelen "rose" ile bağdaştırarak <strong>ROSANO</strong> markasını hayata geçirdim.',
        'Her bir tasarım, stüdyomda benim tarafımdan el işçiliğiyle üretilmektedir. Misyonumuz; sıradan bir kombini küçük detaylarla değiştirerek büyük farklar yaratabileceğini göstermek ve patili dostlarınızla aranızdaki o güzel duygusal bağı stilinize yansıtmaktır.'
    ],
    feature1Title: '%100 El Emeği',
    feature1Desc: 'Her bir parça stüdyomuzda sevgiyle ve özenle dikilmektedir.',
    feature2Title: 'Sınırlı Üretim',
    feature2Desc: 'Herkeste olmayan tasarımlarla farklı olma imkanı.',
    feature3Title: 'Özenli Dikim & Kalite',
    feature3Desc: 'Duygusal bağ kurarak stilinizi tamamlayan yüksek kalite.',
    howToUseTitle: 'Nasıl Kullanılır?',
    howToUseDesc: 'Aksesuarlarımızın çok yönlü dünyasını keşfedin. Çanta süsünün scrunchie\'ye dönüşümü ve patili dostunuzla uyumlu kombin fikirleri.',
    howToUseVideo: 'images/how-to-video.mp4' // Placeholder for video
};

// --- Initialize Data ---
function initData() {
    // Migrate old data format (products that were actually collections)
    const existingProducts = localStorage.getItem('rosano_products');
    if (existingProducts) {
        try {
            const parsed = JSON.parse(existingProducts);
            // Detect old format: products with ids 1,2,3 that are really collections
            const hasOldFormat = parsed.some(p => [1, 2, 3].includes(p.id) && ['Sizin İçin', 'Dostunuz İçin'].includes(p.title));
            if (hasOldFormat) {
                localStorage.setItem('rosano_products', JSON.stringify(DEFAULT_CATALOG_PRODUCTS));
            }
        } catch { }
    }
    if (!localStorage.getItem('rosano_collections')) {
        localStorage.setItem('rosano_collections', JSON.stringify(DEFAULT_COLLECTIONS));
    }
    if (!localStorage.getItem('rosano_products')) {
        localStorage.setItem('rosano_products', JSON.stringify(DEFAULT_CATALOG_PRODUCTS));
    }
    if (!localStorage.getItem('rosano_content')) {
        localStorage.setItem('rosano_content', JSON.stringify(DEFAULT_CONTENT));
    }
}

function getCollections() {
    try { return JSON.parse(localStorage.getItem('rosano_collections')) || DEFAULT_COLLECTIONS; }
    catch { return DEFAULT_COLLECTIONS; }
}

function getProducts() {
    try { return JSON.parse(localStorage.getItem('rosano_products')) || DEFAULT_CATALOG_PRODUCTS; }
    catch { return DEFAULT_CATALOG_PRODUCTS; }
}

function getContent() {
    try { return JSON.parse(localStorage.getItem('rosano_content')) || DEFAULT_CONTENT; }
    catch { return DEFAULT_CONTENT; }
}

// --- Render Collection Cards (categories on landing page) ---
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const collections = getCollections();
    const catLinks = { sizin: 'category.html?cat=sizin', dostunuz: 'category.html?cat=dostunuz', birlikte: 'category.html?cat=birlikte' };
    const hoverColors = { sizin: 'rose-900', dostunuz: 'emerald-900', birlikte: 'amber-900' };
    const colorMap = { 'rose-900': '#881337', 'emerald-900': '#064e3b', 'amber-900': '#78350f' };

    grid.innerHTML = collections.map(p => {
        const hc = hoverColors[p.category] || 'rose-900';
        const link = catLinks[p.category] || 'category.html';
        return `
        <div class="product-card">
            <a href="${link}" class="image-wrap ${p.bgClass || ''}">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
                <div class="image-overlay"></div>
            </a>
            <h3>${p.title}</h3>
            <p class="desc">${p.description}</p>
            <a href="${link}" class="view-link" 
               onmouseover="this.style.color='${colorMap[hc]}';this.style.borderColor='${colorMap[hc]}'"
               onmouseout="this.style.color='';this.style.borderColor=''">Koleksiyonu Keşfet</a>
        </div>`;
    }).join('');
}

// --- Render Content ---
function renderContent() {
    const content = getContent();
    const setHTML = (id, val) => { const el = document.getElementById(id); if (el && val) el.innerHTML = val; };
    const setText = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };

    setHTML('heroBadge', content.heroBadge);
    setHTML('heroTitle', content.heroTitle);
    setHTML('heroSubtitle', content.heroSubtitle);
    setHTML('storyTitle', content.storyTitle);
    setText('feature1Title', content.feature1Title);
    setText('feature1Desc', content.feature1Desc);
    setText('feature2Title', content.feature2Title);
    setText('feature2Desc', content.feature2Desc);
    setText('feature3Title', content.feature3Title);
    setText('feature3Desc', content.feature3Desc);
    setText('howToUseTitle', content.howToUseTitle);
    setText('howToUseDesc', content.howToUseDesc);

    const videoEl = document.getElementById('howToUseVideo');
    if (videoEl && content.howToUseVideo) {
        videoEl.src = content.howToUseVideo;
    }

    if (content.storyParagraphs) {
        const container = document.getElementById('storyParagraphs');
        if (container) {
            container.innerHTML = content.storyParagraphs.map(p => `<p>${p}</p>`).join('');
        }
    }
}

// --- Mobile Menu ---
function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    if (menu) menu.classList.remove('active');
    if (menuIcon) menuIcon.style.display = '';
    if (closeIcon) closeIcon.style.display = 'none';
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    initData();
    renderProducts();
    renderContent();

    // Footer year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu toggle
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('active');
            menuIcon.style.display = isOpen ? 'none' : '';
            closeIcon.style.display = isOpen ? '' : 'none';
        });
    }

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız. 🌹');
            form.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only handle links that STILL point to an anchor
            if (!href || href === '#' || !href.startsWith('#')) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
