// ===== ROSANO ADMIN PANEL JS =====

// --- Default Products (actual items sold, managed via admin) ---
const DEFAULT_CATALOG_PRODUCTS = [
    {
        id: 101, category: 'sizin', title: 'Bloxie Toka - Çiçek Deseni',
        description: 'El yapımı çiçek desenli Bloxie toka. Her parça özenle stüdyomuzda dikilmektedir.',
        image: 'images/products/bloxie-scrunchie-set.png',
        prices: [{ name: 'Bloxie Toka', price: '1.250 TL' }],
        link: 'https://www.shopier.com/rosanostudio', bgClass: 'bg-rose'
    },
    {
        id: 102, category: 'dostunuz', title: 'PawBow Star Yakalık',
        description: 'Kırmızı papyonlu el yapımı köpek yakalığı. Patili dostunuz için en şık aksesuar.',
        image: 'images/products/dog-collar-red.png',
        prices: [{ name: 'PawBow Star', price: '1.700 TL' }],
        link: 'https://www.shopier.com/rosanostudio', bgClass: 'bg-green'
    },
    {
        id: 103, category: 'birlikte', title: 'Ekose & Dantel İkili Set',
        description: 'Sahibine uygun scrunchie ve köpeğine uygun yakalık içeren uyumlu ikili set.',
        image: 'images/products/scrunchie-plaid-lace.png',
        prices: [{ name: 'İkili Takım', price: '3.000 TL' }],
        link: 'https://www.shopier.com/rosanostudio', bgClass: 'bg-gold'
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
    feature1Title: '%100 El Emeği', feature1Desc: 'Her bir parça stüdyomuzda sevgiyle ve özenle dikilmektedir.',
    feature2Title: 'Sınırlı Üretim', feature2Desc: 'Herkeste olmayan tasarımlarla farklı olma imkanı.',
    feature3Title: 'Özenli Dikim & Kalite', feature3Desc: 'Duygusal bağ kurarak stilinizi tamamlayan yüksek kalite.'
};

// --- Helpers ---
function getProducts() {
    try { return JSON.parse(localStorage.getItem('rosano_products')) || DEFAULT_CATALOG_PRODUCTS; }
    catch { return DEFAULT_CATALOG_PRODUCTS; }
}
function saveProducts(products) { localStorage.setItem('rosano_products', JSON.stringify(products)); }
function getContent() {
    try { return JSON.parse(localStorage.getItem('rosano_content')) || DEFAULT_CONTENT; }
    catch { return DEFAULT_CONTENT; }
}
function saveContentData(content) { localStorage.setItem('rosano_content', JSON.stringify(content)); }

const CAT_LABELS = { sizin: 'Sizin İçin', dostunuz: 'Dostunuz İçin', birlikte: 'Birlikte' };
const CAT_CLASSES = { sizin: 'cat-sizin', dostunuz: 'cat-dostunuz', birlikte: 'cat-birlikte' };
const BG_CLASSES = { sizin: 'bg-rose', dostunuz: 'bg-green', birlikte: 'bg-gold' };

// --- Toast ---
function showToast(msg, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- Section Switching ---
function switchSection(section, el) {
    if (el) el.preventDefault && el.preventDefault();
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    const sec = document.getElementById('sec-' + section);
    if (sec) sec.classList.add('active');
    if (el) el.classList.add('active');
    const titles = { dashboard: 'Dashboard', products: 'Ürünler', content: 'İçerik Yönetimi', settings: 'Ayarlar' };
    document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';
    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('adminOverlay').classList.remove('active');
    if (section === 'products') renderProductTable();
    if (section === 'content') loadContentFields();
    if (section === 'dashboard') renderStats();
}

// --- Sidebar Toggle (mobile) ---
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('adminOverlay').classList.toggle('active');
}

// --- Stats ---
function renderStats() {
    const products = getProducts();
    const cats = {};
    products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    const grid = document.getElementById('statsGrid');
    grid.innerHTML = `
        <div class="stat-card"><div class="label">Toplam Ürün</div><div class="value">${products.length}</div></div>
        <div class="stat-card"><div class="label">Sizin İçin</div><div class="value">${cats.sizin || 0}</div></div>
        <div class="stat-card"><div class="label">Dostunuz İçin</div><div class="value">${cats.dostunuz || 0}</div></div>
        <div class="stat-card"><div class="label">Birlikte</div><div class="value">${cats.birlikte || 0}</div></div>
    `;
}

// --- Product Table ---
function renderProductTable() {
    const products = getProducts();
    const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        (CAT_LABELS[p.category] || '').toLowerCase().includes(search)
    );
    const tbody = document.getElementById('productTableBody');
    if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:rgba(74,64,54,0.5);">Ürün bulunamadı</td></tr>';
        return;
    }
    tbody.innerHTML = filtered.map(p => {
        const pricesText = p.prices.map(pr => `${pr.name} — ${pr.price}`).join('<br>');
        const shortLink = p.link ? (p.link.length > 30 ? p.link.substring(0, 30) + '…' : p.link) : '-';
        return `<tr>
            <td><div class="product-info">
                <img class="product-thumb" src="${p.image}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 48 48%22><rect fill=%22%23F4EBE8%22 width=%2248%22 height=%2248%22/><text x=%2224%22 y=%2230%22 text-anchor=%22middle%22 font-size=%2220%22>🌹</text></svg>'">
                <div><strong>${p.title}</strong><br><span style="font-size:0.8rem;color:rgba(74,64,54,0.5);">${p.description.substring(0, 40)}…</span></div>
            </div></td>
            <td><span class="category-badge ${CAT_CLASSES[p.category] || ''}">${CAT_LABELS[p.category] || p.category}</span></td>
            <td style="font-size:0.8125rem;">${pricesText}</td>
            <td><a href="${p.link}" target="_blank" style="color:var(--rose-900);font-size:0.8125rem;">${shortLink}</a></td>
            <td><div class="actions-cell">
                <button class="btn-secondary" onclick="editProduct(${p.id})">Düzenle</button>
                <button class="btn-danger" onclick="confirmAction('Ürünü Sil','Bu ürünü silmek istediğinize emin misiniz?',()=>deleteProduct(${p.id}))">Sil</button>
            </div></td>
        </tr>`;
    }).join('');
}

// --- Product Modal ---
function openProductModal(product) {
    document.getElementById('modalTitle').textContent = product ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle';
    document.getElementById('editProductId').value = product ? product.id : '';
    document.getElementById('pTitle').value = product ? product.title : '';
    document.getElementById('pCategory').value = product ? product.category : 'sizin';
    document.getElementById('pDesc').value = product ? product.description : '';
    document.getElementById('pImage').value = product ? product.image : '';
    document.getElementById('pLink').value = product ? product.link : 'https://www.shopier.com/rosanostudio';
    document.getElementById('pPrices').value = product ? product.prices.map(p => `${p.name} - ${p.price}`).join('\n') : '';
    previewImage();
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (product) openProductModal(product);
}

function saveProduct() {
    const title = document.getElementById('pTitle').value.trim();
    const category = document.getElementById('pCategory').value;
    const desc = document.getElementById('pDesc').value.trim();
    const image = document.getElementById('pImage').value.trim();
    const link = document.getElementById('pLink').value.trim();
    const pricesRaw = document.getElementById('pPrices').value.trim();
    const editId = document.getElementById('editProductId').value;

    if (!title || !desc || !image) {
        showToast('Lütfen tüm alanları doldurun!', 'error');
        return;
    }

    const prices = pricesRaw.split('\n').filter(l => l.trim()).map(line => {
        const parts = line.split(' - ');
        return { name: parts[0]?.trim() || '', price: parts[1]?.trim() || '' };
    });

    const products = getProducts();

    if (editId) {
        const idx = products.findIndex(p => p.id === parseInt(editId));
        if (idx !== -1) {
            products[idx] = { ...products[idx], title, category, description: desc, image, link, prices, bgClass: BG_CLASSES[category] };
        }
        showToast('Ürün güncellendi! ✅', 'success');
    } else {
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, title, category, description: desc, image, link, prices, bgClass: BG_CLASSES[category] });
        showToast('Yeni ürün eklendi! 🌹', 'success');
    }

    saveProducts(products);
    closeProductModal();
    renderProductTable();
    renderStats();
}

function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderProductTable();
    renderStats();
    showToast('Ürün silindi.', 'success');
}

function previewImage() {
    const url = document.getElementById('pImage').value.trim();
    const preview = document.getElementById('imgPreview');
    if (url) {
        preview.innerHTML = `<img src="${url}" alt="Önizleme" onerror="this.parentElement.innerHTML='Görsel yüklenemedi'">`;
    } else {
        preview.innerHTML = 'Görsel önizleme';
    }
}

// --- Content Editor ---
function loadContentFields() {
    const c = getContent();
    document.getElementById('editHeroBadge').value = c.heroBadge || '';
    document.getElementById('editHeroTitle').value = c.heroTitle || '';
    document.getElementById('editHeroSubtitle').value = c.heroSubtitle || '';
    document.getElementById('editStoryTitle').value = c.storyTitle || '';
    document.getElementById('editStoryP1').value = c.storyParagraphs?.[0] || '';
    document.getElementById('editStoryP2').value = c.storyParagraphs?.[1] || '';
    document.getElementById('editStoryP3').value = c.storyParagraphs?.[2] || '';
    document.getElementById('editF1Title').value = c.feature1Title || '';
    document.getElementById('editF1Desc').value = c.feature1Desc || '';
    document.getElementById('editF2Title').value = c.feature2Title || '';
    document.getElementById('editF2Desc').value = c.feature2Desc || '';
    document.getElementById('editF3Title').value = c.feature3Title || '';
    document.getElementById('editF3Desc').value = c.feature3Desc || '';
    document.getElementById('editHowToTitle').value = c.howToUseTitle || '';
    document.getElementById('editHowToDesc').value = c.howToUseDesc || '';
    document.getElementById('editHowToVideo').value = c.howToUseVideo || '';
}

function saveContent() {
    const content = {
        heroBadge: document.getElementById('editHeroBadge').value.trim(),
        heroTitle: document.getElementById('editHeroTitle').value.trim(),
        heroSubtitle: document.getElementById('editHeroSubtitle').value.trim(),
        storyTitle: document.getElementById('editStoryTitle').value.trim(),
        storyParagraphs: [
            document.getElementById('editStoryP1').value.trim(),
            document.getElementById('editStoryP2').value.trim(),
            document.getElementById('editStoryP3').value.trim()
        ],
        feature1Title: document.getElementById('editF1Title').value.trim(),
        feature1Desc: document.getElementById('editF1Desc').value.trim(),
        feature2Title: document.getElementById('editF2Title').value.trim(),
        feature2Desc: document.getElementById('editF2Desc').value.trim(),
        feature3Title: document.getElementById('editF3Title').value.trim(),
        feature3Desc: document.getElementById('editF3Desc').value.trim(),
        howToUseTitle: document.getElementById('editHowToTitle').value.trim(),
        howToUseDesc: document.getElementById('editHowToDesc').value.trim(),
        howToUseVideo: document.getElementById('editHowToVideo').value.trim()
    };
    saveContentData(content);
    showToast('İçerik kaydedildi! ✅', 'success');
}

// --- Confirm Dialog ---
let pendingAction = null;
function confirmAction(title, msg, action) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMsg').textContent = msg;
    pendingAction = action;
    document.getElementById('confirmBtn').onclick = () => { closeConfirm(); if (pendingAction) pendingAction(); pendingAction = null; };
    document.getElementById('confirmDialog').classList.add('active');
}
function closeConfirm() {
    document.getElementById('confirmDialog').classList.remove('active');
}

// --- Export / Import ---
function exportData() {
    const data = { products: getProducts(), content: getContent(), exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `rosano_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(url);
    showToast('Veri dışa aktarıldı! 📦', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.products) saveProducts(data.products);
            if (data.content) saveContentData(data.content);
            renderProductTable();
            renderStats();
            loadContentFields();
            showToast('Veri içe aktarıldı! ✅', 'success');
        } catch {
            showToast('Geçersiz JSON dosyası!', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function resetAllData() {
    localStorage.setItem('rosano_products', JSON.stringify(DEFAULT_CATALOG_PRODUCTS));
    localStorage.setItem('rosano_content', JSON.stringify(DEFAULT_CONTENT));
    renderProductTable();
    renderStats();
    loadContentFields();
    showToast('Tüm veriler sıfırlandı! 🔄', 'success');
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('rosano_products')) {
        localStorage.setItem('rosano_products', JSON.stringify(DEFAULT_CATALOG_PRODUCTS));
    }
    if (!localStorage.getItem('rosano_content')) {
        localStorage.setItem('rosano_content', JSON.stringify(DEFAULT_CONTENT));
    }
    renderStats();
});
