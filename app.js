'use strict';

// ==================== 1. CONFIG ====================
const CONFIG = {
    firebase: {
        apiKey: "AIzaSyBPMbRdVEJ85Is7eg4UkAFs_UHq-BD_Fhg",
        authDomain: "rewords-45ccf.firebaseapp.com",
        projectId: "rewords-45ccf",
        storageBucket: "rewords-45ccf.firebasestorage.app",
        messagingSenderId: "324257034049",
        appId: "1:324257034049:web:2e75279382793007683bc0",
        measurementId: "G-5LNDESBVST"
    },
    site: { name: "AdTopUp", version: "1.0.0" },
    keys: {
        lang: 'adtopup_lang',
        theme: 'adtopup_theme',
        effects: 'adtopup_effects',
        user: 'adtopup_user',
        cookie: 'adtopup_cookie',
        adminSession: 'adtopup_admin_session'
    },
    points: {
        dailyGift: 50,
        adWatch: 100,
        taskVisit: 75,
        adRevenuePerUser: 1.5, // Estimated ad revenue per completed order
        profitMargin: 0.3
    }
};

// ==================== 2. GAMES DATA ====================
const GAMES_DATA = [
    {
        id: 'freefire', name: { en: 'Free Fire', ar: 'فري فاير' }, icon: 'fa-fire', color: '#FF6B35',
        currency: 'Diamonds',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
        packages: [
            { id: 'ff1', amount: '100 💎', price: 0.99, points: 130 },
            { id: 'ff2', amount: '310 💎', price: 2.99, points: 390 },
            { id: 'ff3', amount: '520 💎', price: 4.99, points: 650 },
            { id: 'ff4', amount: '1080 💎', price: 9.99, points: 1300 },
            { id: 'ff5', amount: '2200 💎', price: 19.99, points: 2600 },
            { id: 'ff6', amount: '5600 💎', price: 49.99, points: 6500, popular: true }
        ]
    },
    {
        id: 'pubg', name: { en: 'PUBG Mobile', ar: 'ببجي موبايل' }, icon: 'fa-crosshairs', color: '#F2A900',
        currency: 'UC',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop',
        packages: [
            { id: 'pb1', amount: '60 UC', price: 0.99, points: 130 },
            { id: 'pb2', amount: '325 UC', price: 4.99, points: 650 },
            { id: 'pb3', amount: '660 UC', price: 9.99, points: 1300 },
            { id: 'pb4', amount: '1800 UC', price: 24.99, points: 3250 },
            { id: 'pb5', amount: '3850 UC', price: 49.99, points: 6500, popular: true }
        ]
    },
    {
        id: 'ml', name: { en: 'Mobile Legends', ar: 'موبايل ليجندز' }, icon: 'fa-shield-halved', color: '#4A90D9',
        currency: 'Diamonds',
        image: 'https://images.unsplash.com/photo-1511515800041-10d8c01d8b21?w=400&h=225&fit=crop',
        packages: [
            { id: 'ml1', amount: '86 💎', price: 1.49, points: 195 },
            { id: 'ml2', amount: '172 💎', price: 2.99, points: 390 },
            { id: 'ml3', amount: '257 💎', price: 4.49, points: 585 },
            { id: 'ml4', amount: '706 💎', price: 11.99, points: 1560 },
            { id: 'ml5', amount: '2195 💎', price: 36.99, points: 4810, popular: true }
        ]
    },
    {
        id: 'roblox', name: { en: 'Roblox', ar: 'روبلوكس' }, icon: 'fa-cubes', color: '#E2231A',
        currency: 'Robux',
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=225&fit=crop',
        packages: [
            { id: 'rb1', amount: '400 Robux', price: 4.99, points: 650 },
            { id: 'rb2', amount: '800 Robux', price: 9.99, points: 1300 },
            { id: 'rb3', amount: '1700 Robux', price: 19.99, points: 2600 },
            { id: 'rb4', amount: '4500 Robux', price: 49.99, points: 6500, popular: true }
        ]
    },
    {
        id: 'cod', name: { en: 'COD Mobile', ar: 'كود موبايل' }, icon: 'fa-gun', color: '#00E676',
        currency: 'CP',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop',
        packages: [
            { id: 'cd1', amount: '80 CP', price: 0.99, points: 130 },
            { id: 'cd2', amount: '400 CP', price: 4.99, points: 650 },
            { id: 'cd3', amount: '880 CP', price: 9.99, points: 1300 },
            { id: 'cd4', amount: '2400 CP', price: 24.99, points: 3250 },
            { id: 'cd5', amount: '5000 CP', price: 49.99, points: 6500, popular: true }
        ]
    },
    {
        id: 'genshin', name: { en: 'Genshin Impact', ar: 'جينشن إمباكت' }, icon: 'fa-wand-sparkles', color: '#9B59B6',
        currency: 'Crystals',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
        packages: [
            { id: 'gs1', amount: '60 Crystals', price: 0.99, points: 130 },
            { id: 'gs2', amount: '330 Crystals', price: 4.99, points: 650 },
            { id: 'gs3', amount: '1090 Crystals', price: 14.99, points: 1950 },
            { id: 'gs4', amount: '3280 Crystals', price: 44.99, points: 5850, popular: true }
        ]
    },
    {
        id: 'clash', name: { en: 'Clash of Clans', ar: 'كلاش أوف كلانس' }, icon: 'fa-chess-rook', color: '#FF9800',
        currency: 'Gems',
        image: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=400&h=225&fit=crop',
        packages: [
            { id: 'cc1', amount: '500 Gems', price: 4.99, points: 650 },
            { id: 'cc2', amount: '1200 Gems', price: 9.99, points: 1300 },
            { id: 'cc3', amount: '2500 Gems', price: 19.99, points: 2600 },
            { id: 'cc4', amount: '6500 Gems', price: 49.99, points: 6500, popular: true }
        ]
    },
    {
        id: 'fortnite', name: { en: 'Fortnite', ar: 'فورتنايت' }, icon: 'fa-bolt', color: '#00BCD4',
        currency: 'V-Bucks',
        image: 'https://images.unsplash.com/photo-1589241062272-c0a69e70cc2d?w=400&h=225&fit=crop',
        packages: [
            { id: 'fn1', amount: '1000 V-Bucks', price: 7.99, points: 1040 },
            { id: 'fn2', amount: '2800 V-Bucks', price: 19.99, points: 2600 },
            { id: 'fn3', amount: '5000 V-Bucks', price: 31.99, points: 4160 },
            { id: 'fn4', amount: '13500 V-Bucks', price: 79.99, points: 10400, popular: true }
        ]
    }
];

// ==================== 3. UTILITIES ====================
const Utils = {
    esc(s) {
        if (typeof s !== 'string') return '';
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    },
    debounce(fn, d = 300) {
        let t;
        return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); };
    },
    genId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
    },
    formatDate(ts) {
        try {
            return new Date(ts).toLocaleDateString(I18n.lang === 'ar' ? 'ar-EG' : 'en-US', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
        } catch (e) { return ''; }
    },
    isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); },
    isValidPlayerId(id) { return /^[a-zA-Z0-9_]{4,30}$/.test(id); },
    todayStr() { return new Date().toDateString(); }
};

const LS = {
    get(k, d = null) {
        try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }
        catch (e) { return d; }
    },
    set(k, v) {
        try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
    },
    remove(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

// ==================== 4. FIREBASE ====================
const FB = {
    db: null, auth: null, ok: false, user: null, userPromise: null,
    init() {
        try {
            if (typeof firebase !== 'undefined') {
                firebase.initializeApp(CONFIG.firebase);
                this.db = firebase.firestore();
                this.auth = firebase.auth();
                this.ok = true;
                this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
                this.userPromise = new Promise(resolve => {
                    this.auth.onAuthStateChanged(user => { this.user = user; resolve(user); });
                });
            }
        } catch (e) { this.ok = false; }
    },
    async waitForAuth() {
        if (!this.ok) return null;
        if (this.user !== null) return this.user;
        return this.userPromise;
    }
};

// ==================== 5. I18N ====================
const I18n = {
    lang: 'en',
    init() {
        this.lang = LS.get(CONFIG.keys.lang) || (navigator.language.startsWith('ar') ? 'ar' : 'en');
        this.apply();
    },
    toggle() {
        this.lang = this.lang === 'en' ? 'ar' : 'en';
        LS.set(CONFIG.keys.lang, this.lang);
        this.apply();
        Router.renderCurrent();
    },
    apply() {
        const rtl = this.lang === 'ar';
        document.documentElement.lang = this.lang;
        document.documentElement.dir = rtl ? 'rtl' : 'ltr';
        const lt = document.querySelector('#lang-switcher .lang-text');
        if (lt) lt.textContent = this.lang === 'en' ? 'AR' : 'EN';
    }
};

// ==================== 6. THEME ====================
const Theme = {
    current: 'dark',
    init() {
        this.current = LS.get(CONFIG.keys.theme, 'dark');
        this.apply(false);
        document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggle());
    },
    apply(save = true) {
        document.body.classList.toggle('light-theme', this.current === 'light');
        const i = document.querySelector('#theme-toggle i');
        if (i) i.className = this.current === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        if (save) LS.set(CONFIG.keys.theme, this.current);
    },
    toggle() {
        this.current = this.current === 'dark' ? 'light' : 'dark';
        this.apply();
    }
};

// ==================== 7. UI ====================
const UI = {
    hideLoader() {
        const l = document.getElementById('loader');
        if (l) { l.classList.add('hidden'); setTimeout(() => l.style.display = 'none', 600); }
    },
    showToast(msg, type = 'info', dur = 3000) {
        const c = document.getElementById('toast-container');
        if (!c) return;
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        const t = document.createElement('div');
        t.className = 'toast ' + type;
        t.innerHTML = '<i class="fas ' + icons[type] + ' toast-icon"></i><span class="toast-message">' + Utils.esc(msg) + '</span>';
        c.appendChild(t);
        setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, dur);
    },
    openModal(id) { const m = document.getElementById(id); if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; } },
    closeModal(id) { const m = document.getElementById(id); if (m) { m.classList.remove('open'); document.body.style.overflow = ''; } }
};

// ==================== 8. EFFECTS ====================
const Effects = {
    enabled: true, raf: null, particles: [],
    init() {
        this.enabled = LS.get(CONFIG.keys.effects, true) !== false;
        this.apply();
        this.initScroll();
    },
    apply() {
        document.body.classList.toggle('effects-disabled', !this.enabled);
        if (this.enabled) { this.initCursor(); this.initParticles(); }
        else { this.stopParticles(); }
    },
    toggle() { this.enabled = !this.enabled; LS.set(CONFIG.keys.effects, this.enabled); this.apply(); },
    initCursor() {
        const d = document.getElementById('cursor-dot');
        const r = document.getElementById('cursor-ring');
        if (!d || !r || !matchMedia('(hover: hover)').matches) return;
        document.addEventListener('mousemove', e => {
            d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px';
            r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
        });
        document.addEventListener('mouseover', e => {
            r.classList.toggle('hover', !!e.target.closest('a, button, input, [role="button"]'));
        });
    },
    initParticles() {
        this.stopParticles();
        const c = document.getElementById('particles-canvas');
        if (!c) return;
        const ctx = c.getContext('2d');
        const resize = () => { c.width = innerWidth; c.height = innerHeight; };
        resize();
        addEventListener('resize', Utils.debounce(resize, 200));
        const n = Math.min(40, Math.floor(innerWidth / 35));
        this.particles = Array.from({ length: n }, () => ({
            x: Math.random() * c.width, y: Math.random() * c.height,
            s: Math.random() * 2 + 1, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
            o: Math.random() * .3 + .1
        }));
        const draw = () => {
            if (!this.enabled) return;
            ctx.clearRect(0, 0, c.width, c.height);
            const rgb = document.body.classList.contains('light-theme') ? '46,123,255' : '91,159,255';
            this.particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
                if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + rgb + ',' + p.o + ')'; ctx.fill();
            });
            this.raf = requestAnimationFrame(draw);
        };
        draw();
    },
    stopParticles() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = null; } },
    initScroll() {
        const bar = document.querySelector('.scroll-progress-bar');
        const btn = document.getElementById('back-to-top');
        addEventListener('scroll', Utils.debounce(() => {
            if (bar) { const h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%'; }
            if (btn) btn.classList.toggle('visible', scrollY > 300);
        }, 10));
        btn?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    },
    reveal() {
        const obs = new IntersectionObserver(es => {
            es.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
        }, { threshold: 0.08 });
        document.querySelectorAll('.reveal:not(.active)').forEach(el => obs.observe(el));
    }
};

// ==================== 9. USER STATE ====================
const UserState = {
    points: 0,
    orders: [],
    lastDaily: null,
    load() {
        const saved = LS.get(CONFIG.keys.user, null);
        if (saved) {
            this.points = saved.points || 0;
            this.orders = saved.orders || [];
            this.lastDaily = saved.lastDaily || null;
        }
        this.updateUI();
    },
    save() {
        LS.set(CONFIG.keys.user, {
            points: this.points,
            orders: this.orders,
            lastDaily: this.lastDaily
        });
    },
    addPoints(amount) {
        this.points += amount;
        this.save();
        this.updateUI();
    },
    spendPoints(amount) {
        if (this.points < amount) return false;
        this.points -= amount;
        this.save();
        this.updateUI();
        return true;
    },
    updateUI() {
        const nav = document.getElementById('nav-points');
        const modal = document.getElementById('modal-points-value');
        if (nav) nav.textContent = this.points;
        if (modal) modal.textContent = this.points;
    }
};

// ==================== 10. AUTH ====================
const Auth = {
    mode: 'login',
    init() {
        document.getElementById('auth-btn')?.addEventListener('click', () => {
            if (FB.user) {
                FB.auth.signOut();
                UI.showToast('Logged out', 'info');
            } else {
                UI.openModal('auth-modal');
            }
        });
        document.getElementById('auth-login-tab')?.addEventListener('click', () => this.setMode('login'));
        document.getElementById('auth-register-tab')?.addEventListener('click', () => this.setMode('register'));
        document.getElementById('auth-form')?.addEventListener('submit', e => { e.preventDefault(); this.submit(); });
    },
    setMode(m) {
        this.mode = m;
        document.getElementById('auth-login-tab')?.classList.toggle('active', m === 'login');
        document.getElementById('auth-register-tab')?.classList.toggle('active', m === 'register');
        const ng = document.getElementById('auth-name-group');
        if (ng) ng.style.display = m === 'register' ? 'block' : 'none';
        const t = document.getElementById('auth-submit-text');
        if (t) t.textContent = m === 'register' ? 'Register' : 'Login';
        document.getElementById('auth-error').style.display = 'none';
    },
    async submit() {
        const email = document.getElementById('auth-email').value.trim();
        const pass = document.getElementById('auth-password').value;
        const name = document.getElementById('auth-name').value.trim();
        const err = document.getElementById('auth-error');
        if (!FB.ok) { err.textContent = 'Firebase not configured'; err.style.display = 'block'; return; }
        if (!Utils.isValidEmail(email)) { err.textContent = 'Invalid email'; err.style.display = 'block'; return; }
        try {
            if (this.mode === 'register') {
                const cred = await FB.auth.createUserWithEmailAndPassword(email, pass);
                if (name) await cred.user.updateProfile({ displayName: name });
                await FB.db.collection('users').doc(cred.user.uid).set({
                    email, name: name || 'User', points: 0, createdAt: Date.now(), role: 'user'
                });
                UI.closeModal('auth-modal');
                UI.showToast('Account created! 🎉', 'success');
            } else {
                await FB.auth.signInWithEmailAndPassword(email, pass);
                UI.closeModal('auth-modal');
                UI.showToast('Welcome back! 👋', 'success');
            }
        } catch (e) {
            err.textContent = 'Invalid email or password';
            err.style.display = 'block';
        }
    }
};

// ==================== 11. PAGES ====================
const Pages = {
    home(c) {
        const L = I18n.lang;
        c.innerHTML = `
            <section class="hero reveal active">
                <div class="hero-badge"><i class="fas fa-bolt"></i> <span>${L === 'ar' ? 'مجاني 100% - ممول بالإعلانات' : '100% Free - Funded by Ads'}</span></div>
                <h1 class="hero-title">${L === 'ar' ? 'اشحن ألعابك مجاناً' : 'Top Up Games Free'}</h1>
                <p class="hero-subtitle">${L === 'ar' ? 'شاهد الإعلانات، اجمع النقاط، واشحن ألعابك المفضلة. نحن شفافون تماماً: أرباحنا من الإعلانات تغطي تكلفة شحنك!' : 'Watch ads, collect points, and top up your favorite games. We are fully transparent: our ad revenue covers your top-up cost!'}</p>
                <div class="hero-actions">
                    <a href="#games" class="btn btn-primary"><i class="fas fa-gamepad"></i> ${L === 'ar' ? 'اختر لعبتك' : 'Choose Your Game'}</a>
                    <a href="#how" class="btn btn-outline"><i class="fas fa-question-circle"></i> ${L === 'ar' ? 'كيف يعمل؟' : 'How It Works?'}</a>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat"><div class="hero-stat-value">${GAMES_DATA.length}+</div><div class="hero-stat-label">${L === 'ar' ? 'لعبة' : 'Games'}</div></div>
                    <div class="hero-stat"><div class="hero-stat-value">100%</div><div class="hero-stat-label">${L === 'ar' ? 'مجاني' : 'Free'}</div></div>
                    <div class="hero-stat"><div class="hero-stat-value">24h</div><div class="hero-stat-label">${L === 'ar' ? 'تسليم' : 'Delivery'}</div></div>
                </div>
            </section>
            <div class="ad-placeholder reveal" style="margin-bottom:var(--space-2xl);">
                <i class="fas fa-ad"></i>
                <p>${L === 'ar' ? 'مساحة إعلانية - سيتم تفعيلها بعد الموافقة' : 'Ad Space - Will be activated after approval'}</p>
            </div>
            <section class="reveal">
                <div class="section-header">
                    <h2 class="section-title"><i class="fas fa-fire"></i> ${L === 'ar' ? 'ألعاب شائعة' : 'Popular Games'}</h2>
                    <a href="#games" class="btn btn-sm btn-secondary">${L === 'ar' ? 'عرض الكل' : 'View All'}</a>
                </div>
                <div class="games-grid">${GAMES_DATA.slice(0, 4).map(g => this.gameCard(g)).join('')}</div>
            </section>
            <section class="reveal" style="margin-top:var(--space-3xl);">
                <div class="section-header">
                    <h2 class="section-title"><i class="fas fa-lightbulb"></i> ${L === 'ar' ? 'كيف يعمل؟' : 'How It Works?'}</h2>
                </div>
                <div class="steps-grid">
                    <div class="step-card card"><div class="step-number">1</div><h3 class="step-title">${L === 'ar' ? 'شاهد الإعلانات' : 'Watch Ads'}</h3><p class="step-desc">${L === 'ar' ? 'شاهد الإعلانات وأكمل المهام لجمع النقاط' : 'Watch ads and complete tasks to earn points'}</p></div>
                    <div class="step-card card"><div class="step-number">2</div><h3 class="step-title">${L === 'ar' ? 'اجمع النقاط' : 'Collect Points'}</h3><p class="step-desc">${L === 'ar' ? 'كل إعلان يمنحك نقاط. اجعلها تكفي للباقة المطلوبة' : 'Each ad gives you points. Collect enough for your package'}</p></div>
                    <div class="step-card card"><div class="step-number">3</div><h3 class="step-title">${L === 'ar' ? 'اطلب الشحن' : 'Request Top-Up'}</h3><p class="step-desc">${L === 'ar' ? 'اختر الباقة، أدخل معرفك، وأرسل الطلب' : 'Choose package, enter your ID, submit order'}</p></div>
                    <div class="step-card card"><div class="step-number">4</div><h3 class="step-title">${L === 'ar' ? 'استلم الشحن' : 'Receive Top-Up'}</h3><p class="step-desc">${L === 'ar' ? 'يتم الشحن يدوياً خلال 1-24 ساعة' : 'Manual top-up within 1-24 hours'}</p></div>
                </div>
            </section>
        `;
        Effects.reveal();
    },
    gameCard(g) {
        const L = I18n.lang;
        const minPoints = g.packages[0]?.points || 100;
        return `
            <div class="card game-card reveal" onclick="location.hash='game/${g.id}'">
                <div class="game-card-image">
                    <img src="${Utils.esc(g.image)}" alt="${Utils.esc(g.name[L])}" loading="lazy">
                    <span class="game-card-badge"><i class="fas fa-check-circle"></i> ${L === 'ar' ? 'متاح' : 'Available'}</span>
                </div>
                <div class="game-card-body">
                    <h3 class="game-card-title">${Utils.esc(g.name[L])}</h3>
                    <p class="game-card-desc">${g.currency}</p>
                    <div class="game-card-footer">
                        <span class="game-card-price"><i class="fas fa-coins"></i> ${L === 'ar' ? 'من' : 'From'} ${minPoints}</span>
                        <span class="game-card-action">${L === 'ar' ? 'شحن ←' : 'Top Up →'}</span>
                    </div>
                </div>
            </div>
        `;
    },
    games(c) {
        const L = I18n.lang;
        c.innerHTML = `
            <section class="reveal active">
                <div class="section-header"><h1 class="section-title"><i class="fas fa-gamepad"></i> ${L === 'ar' ? 'جميع الألعاب' : 'All Games'}</h1></div>
                <div class="games-grid">${GAMES_DATA.map(g => this.gameCard(g)).join('')}</div>
            </section>
        `;
        Effects.reveal();
    },
    gameDetail(c, gameId) {
        const L = I18n.lang;
        const game = GAMES_DATA.find(g => g.id === gameId);
        if (!game) { this.notFound(c); return; }
        c.innerHTML = `
            <section class="reveal active">
                <div style="margin-bottom:var(--space-xl);">
                    <a href="#games" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> ${L === 'ar' ? 'رجوع' : 'Back'}</a>
                </div>
                <div style="display:flex;align-items:center;gap:var(--space-lg);margin-bottom:var(--space-2xl);flex-wrap:wrap;">
                    <div style="width:70px;height:70px;border-radius:var(--radius-lg);background:${game.color}20;color:${game.color};display:flex;align-items:center;justify-content:center;font-size:2rem;">
                        <i class="fas ${game.icon}"></i>
                    </div>
                    <div><h1 style="margin:0;">${Utils.esc(game.name[L])}</h1><p style="margin:0;color:var(--text-muted);">${game.currency}</p></div>
                </div>
                <div class="ad-placeholder" style="margin-bottom:var(--space-2xl);"><i class="fas fa-ad"></i><p>${L === 'ar' ? 'مساحة إعلانية' : 'Ad Space'}</p></div>
                <div class="section-header"><h2 class="section-title"><i class="fas fa-coins"></i> ${L === 'ar' ? 'اختر الباقة' : 'Choose Package'}</h2></div>
                <div class="packages-grid">
                    ${game.packages.map(p => `
                        <div class="card package-card ${p.popular ? 'popular' : ''} reveal" onclick="TopUp.selectPackage('${game.id}', '${p.id}')">
                            <div class="package-amount">${p.amount}</div>
                            <div class="package-price">$${p.price.toFixed(2)}</div>
                            <div class="package-points"><i class="fas fa-coins"></i> ${p.points} ${L === 'ar' ? 'نقطة' : 'points'}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top:var(--space-2xl);padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--glass-border);">
                    <h3 style="font-size:1rem;color:var(--neon-yellow);"><i class="fas fa-info-circle"></i> ${L === 'ar' ? 'ملاحظة مهمة' : 'Important Note'}</h3>
                    <p style="font-size:0.85rem;margin:0;">${L === 'ar' ? 'يجب أن تجمع نقاط كافية قبل طلب الشحن. النقاط تُخصم فور إرسال الطلب. الشحن يدوي ويتم خلال 1-24 ساعة.' : 'You must collect enough points before requesting. Points are deducted immediately. Top-up is manual and delivered within 1-24 hours.'}</p>
                </div>
            </section>
        `;
        Effects.reveal();
    },
    earn(c) {
        const L = I18n.lang;
        c.innerHTML = `
            <section class="reveal active">
                <div class="section-header"><h1 class="section-title"><i class="fas fa-coins"></i> ${L === 'ar' ? 'اكسب النقاط' : 'Earn Points'}</h1></div>
                <div class="points-balance-card" style="margin-bottom:var(--space-2xl);">
                    <div class="points-balance-icon"><i class="fas fa-coins"></i></div>
                    <div>
                        <div class="points-balance-value" id="earn-page-points">${UserState.points}</div>
                        <div class="points-balance-label">${L === 'ar' ? 'رصيدك الحالي' : 'Your Current Balance'}</div>
                    </div>
                </div>
                <div class="packages-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr));">
                    <div class="card package-card reveal"><div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon-pink);"><i class="fas fa-gift"></i></div><div class="package-amount">${L === 'ar' ? 'هدية يومية' : 'Daily Gift'}</div><div class="package-points" style="font-size:0.9rem;">+${CONFIG.points.dailyGift} ${L === 'ar' ? 'نقطة' : 'points'}</div><button class="btn btn-sm btn-gold" style="margin-top:var(--space-md);" id="daily-btn">${L === 'ar' ? 'استلم' : 'Claim'}</button></div>
                    <div class="card package-card reveal"><div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon);"><i class="fas fa-play-circle"></i></div><div class="package-amount">${L === 'ar' ? 'شاهد إعلان' : 'Watch Ad'}</div><div class="package-points" style="font-size:0.9rem;">+${CONFIG.points.adWatch} ${L === 'ar' ? 'نقطة' : 'points'}</div><button class="btn btn-sm btn-primary" style="margin-top:var(--space-md);" id="ad-btn">${L === 'ar' ? 'شاهد' : 'Watch'}</button></div>
                    <div class="card package-card reveal"><div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon-purple);"><i class="fas fa-external-link-alt"></i></div><div class="package-amount">${L === 'ar' ? 'زر رابط' : 'Visit Link'}</div><div class="package-points" style="font-size:0.9rem;">+${CONFIG.points.taskVisit} ${L === 'ar' ? 'نقطة' : 'points'}</div><button class="btn btn-sm btn-secondary" style="margin-top:var(--space-md);" id="task-btn">${L === 'ar' ? 'زر' : 'Visit'}</button></div>
                </div>
                <div class="ad-placeholder" style="margin-top:var(--space-2xl);"><i class="fas fa-ad"></i><p>${L === 'ar' ? 'مساحة إعلانية كبيرة' : 'Large Ad Space'}</p></div>
                <div style="margin-top:var(--space-2xl);padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid rgba(255,215,0,.3);">
                    <h3 style="font-size:1rem;color:var(--gold);"><i class="fas fa-key"></i> ${L === 'ar' ? 'استخدام كود' : 'Redeem Code'}</h3>
                    <div class="redeem-row" style="margin-top:var(--space-md);">
                        <input type="text" class="form-input" id="redeem-input" placeholder="${L === 'ar' ? 'أدخل الكود' : 'Enter code'}" maxlength="20">
                        <button class="btn btn-gold" id="redeem-page-btn">${L === 'ar' ? 'تفعيل' : 'Redeem'}</button>
                    </div>
                </div>
            </section>
        `;
        document.getElementById('daily-btn')?.addEventListener('click', () => TopUp.dailyGift());
        document.getElementById('ad-btn')?.addEventListener('click', () => TopUp.watchAd());
        document.getElementById('task-btn')?.addEventListener('click', () => TopUp.visitTask());
        document.getElementById('redeem-page-btn')?.addEventListener('click', () => {
            const input = document.getElementById('redeem-input');
            const code = (input?.value || '').trim().toUpperCase();
            if (code === 'ADTOPUP2026') { UserState.addPoints(500); input.value = ''; UI.showToast('+500 points! 🎉', 'success'); }
            else UI.showToast('Invalid code!', 'error');
        });
        Effects.reveal();
    },
    orders(c) {
        const L = I18n.lang;
        const orders = UserState.orders.sort((a, b) => b.createdAt - a.createdAt);
        c.innerHTML = `
            <section class="reveal active">
                <div class="section-header"><h1 class="section-title"><i class="fas fa-clipboard-list"></i> ${L === 'ar' ? 'طلباتي' : 'My Orders'}</h1></div>
                ${orders.length === 0 ? `
                    <div style="text-align:center;padding:var(--space-3xl);">
                        <div style="font-size:3rem;color:var(--text-muted);margin-bottom:var(--space-lg);"><i class="fas fa-inbox"></i></div>
                        <p>${L === 'ar' ? 'لا توجد طلبات بعد' : 'No orders yet'}</p>
                        <a href="#games" class="btn btn-primary">${L === 'ar' ? 'ابدأ الشحن' : 'Start Top-Up'}</a>
                    </div>
                ` : `
                    <div class="orders-list">
                        ${orders.map(o => `
                            <div class="order-item">
                                <div class="order-item-info">
                                    <div class="order-item-icon" style="color:${o.gameColor || 'var(--neon)'};"><i class="fas ${o.gameIcon || 'fa-gamepad'}"></i></div>
                                    <div class="order-item-details">
                                        <div class="order-item-game">${Utils.esc(o.gameName)} - ${Utils.esc(o.packageAmount)}</div>
                                        <div class="order-item-date">${Utils.formatDate(o.createdAt)} • ID: ${Utils.esc(o.gameId)}</div>
                                    </div>
                                </div>
                                <div style="display:flex;align-items:center;gap:var(--space-md);">
                                    <span class="order-item-points"><i class="fas fa-coins"></i> ${o.points}</span>
                                    <span class="order-status ${o.status}">${this.statusLabel(o.status, L)}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </section>
        `;
        Effects.reveal();
    },
    statusLabel(status, L) {
        const labels = {
            pending: L === 'ar' ? 'قيد الانتظار' : 'Pending',
            approved: L === 'ar' ? 'تمت الموافقة' : 'Approved',
            shipped: L === 'ar' ? 'تم الشحن ✅' : 'Shipped ✅',
            rejected: L === 'ar' ? 'مرفوض' : 'Rejected'
        };
        return labels[status] || status;
    },
    how(c) {
        const L = I18n.lang;
        c.innerHTML = `
            <section class="reveal active">
                <div class="section-header"><h1 class="section-title"><i class="fas fa-question-circle"></i> ${L === 'ar' ? 'كيف يعمل الموقع؟' : 'How It Works?'}</h1></div>
                <div style="max-width:800px;margin:0 auto;">
                    <div style="padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--glass-border);margin-bottom:var(--space-xl);">
                        <h3 style="color:var(--neon);"><i class="fas fa-info-circle"></i> ${L === 'ar' ? 'الشفافية الكاملة' : 'Full Transparency'}</h3>
                        <p>${L === 'ar' ? 'هذا الموقع ممول 100% من الإعلانات. نحن نعرض لك إعلانات، ونربح منها، ونستخدم جزءاً من الأرباح لشحن ألعابك.' : 'This site is 100% funded by ads. We show you ads, earn from them, and use part of the revenue to top up your games.'}</p>
                    </div>
                    <div class="steps-grid">
                        <div class="step-card card"><div class="step-number">1</div><h3 class="step-title">${L === 'ar' ? 'شاهد الإعلانات' : 'Watch Ads'}</h3><p class="step-desc">${L === 'ar' ? 'كل إعلان يولد لنا ربحاً' : 'Each ad generates revenue'}</p></div>
                        <div class="step-card card"><div class="step-number">2</div><h3 class="step-title">${L === 'ar' ? 'اجمع النقاط' : 'Collect Points'}</h3><p class="step-desc">${L === 'ar' ? 'نمنحك نقاط مقابل كل إعلان' : 'We give you points for each ad'}</p></div>
                        <div class="step-card card"><div class="step-number">3</div><h3 class="step-title">${L === 'ar' ? 'اطلب الشحن' : 'Request Top-Up'}</h3><p class="step-desc">${L === 'ar' ? 'عندما تكفي نقاطك، أرسل الطلب' : 'When you have enough points, submit'}</p></div>
                        <div class="step-card card"><div class="step-number">4</div><h3 class="step-title">${L === 'ar' ? 'نراجع ونشحن' : 'We Ship'}</h3><p class="step-desc">${L === 'ar' ? 'نتأكد من التغطية ثم نشحن' : 'We verify coverage then ship'}</p></div>
                    </div>
                </div>
            </section>
        `;
        Effects.reveal();
    },
    privacy(c) {
        const L = I18n.lang;
        c.innerHTML = `<div style="max-width:800px;margin:0 auto;" class="reveal active"><h1>${L === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1><p>${L === 'ar' ? 'نجمع الحد الأدنى من البيانات.' : 'We collect minimal data.'}</p></div>`;
    },
    terms(c) {
        const L = I18n.lang;
        c.innerHTML = `<div style="max-width:800px;margin:0 auto;" class="reveal active"><h1>${L === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</h1><p>${L === 'ar' ? 'باستخدامك للموقع، أنت توافق على مشاهدة الإعلانات.' : 'By using this site, you agree to watch ads.'}</p></div>`;
    },
    notFound(c) {
        c.innerHTML = `<section style="text-align:center;padding:var(--space-3xl);"><h1 style="font-family:var(--font-mono);font-size:4rem;color:var(--neon);">404</h1><p>Page not found</p><a href="#home" class="btn btn-primary">Go Home</a></section>`;
    }
};

// ==================== 12. TOP-UP ====================
const TopUp = {
    selectedGame: null,
    selectedPackage: null,
    selectPackage(gameId, packageId) {
        const game = GAMES_DATA.find(g => g.id === gameId);
        if (!game) return;
        const pkg = game.packages.find(p => p.id === packageId);
        if (!pkg) return;
        if (UserState.points < pkg.points) {
            UI.showToast(I18n.lang === 'ar' ? `تحتاج ${pkg.points - UserState.points} نقطة إضافية!` : `You need ${pkg.points - UserState.points} more points!`, 'warning');
            location.hash = 'earn';
            return;
        }
        this.selectedGame = game;
        this.selectedPackage = pkg;
        const L = I18n.lang;
        document.getElementById('order-summary').innerHTML = `
            <div class="order-summary-item"><span class="order-summary-label">${L === 'ar' ? 'اللعبة' : 'Game'}</span><span class="order-summary-value">${Utils.esc(game.name[L])}</span></div>
            <div class="order-summary-item"><span class="order-summary-label">${L === 'ar' ? 'الباقة' : 'Package'}</span><span class="order-summary-value">${Utils.esc(pkg.amount)}</span></div>
            <div class="order-summary-item"><span class="order-summary-label">${L === 'ar' ? 'النقاط المطلوبة' : 'Points Required'}</span><span class="order-summary-value" style="color:var(--gold);"><i class="fas fa-coins"></i> ${pkg.points}</span></div>
        `;
        UI.openModal('order-modal');
    },
    initOrderForm() {
        document.getElementById('order-form')?.addEventListener('submit', e => { e.preventDefault(); this.submitOrder(); });
    },
    submitOrder() {
        const gameId = document.getElementById('order-game-id').value.trim();
        const extra = document.getElementById('order-extra').value.trim();
        if (!Utils.isValidPlayerId(gameId)) {
            UI.showToast(I18n.lang === 'ar' ? 'معرف اللاعب غير صالح!' : 'Invalid Player ID!', 'error');
            return;
        }
        if (!this.selectedGame || !this.selectedPackage) return;
        if (!UserState.spendPoints(this.selectedPackage.points)) {
            UI.showToast(I18n.lang === 'ar' ? 'نقاط غير كافية!' : 'Not enough points!', 'error');
            return;
        }
        const order = {
            id: Utils.genId(),
            gameId: this.selectedGame.id,
            gameName: this.selectedGame.name[I18n.lang],
            gameIcon: this.selectedGame.icon,
            gameColor: this.selectedGame.color,
            packageId: this.selectedPackage.id,
            packageAmount: this.selectedPackage.amount,
            points: this.selectedPackage.points,
            playerId: gameId,
            extra: extra,
            status: 'pending',
            createdAt: Date.now()
        };
        UserState.orders.push(order);
        UserState.save();
        if (FB.ok && FB.user) {
            FB.db.collection('orders').doc(order.id).set({
                ...order, userId: FB.user.uid, userEmail: FB.user.email
            }).catch(() => {});
        }
        UI.closeModal('order-modal');
        UI.showToast(I18n.lang === 'ar' ? 'تم إرسال الطلب! 🎉' : 'Order submitted! 🎉', 'success');
        location.hash = 'orders';
    },
    dailyGift() {
        const today = Utils.todayStr();
        if (UserState.lastDaily === today) {
            UI.showToast(I18n.lang === 'ar' ? 'تم الاستلام اليوم! عد غداً' : 'Already claimed today!', 'warning');
            return;
        }
        UserState.lastDaily = today;
        UserState.addPoints(CONFIG.points.dailyGift);
        UI.showToast(`+${CONFIG.points.dailyGift} ${I18n.lang === 'ar' ? 'نقطة! 🎁' : 'points! 🎁'}`, 'success');
    },
    watchAd() {
        UI.showToast(I18n.lang === 'ar' ? 'سيتم فتح الإعلان...' : 'Opening ad...', 'info');
        setTimeout(() => {
            UserState.addPoints(CONFIG.points.adWatch);
            UI.showToast(`+${CONFIG.points.adWatch} ${I18n.lang === 'ar' ? 'نقطة! 🎉' : 'points! 🎉'}`, 'success');
        }, 2000);
    },
    visitTask() {
        UI.showToast(I18n.lang === 'ar' ? 'سيتم فتح الرابط...' : 'Opening link...', 'info');
        setTimeout(() => {
            UserState.addPoints(CONFIG.points.taskVisit);
            UI.showToast(`+${CONFIG.points.taskVisit} ${I18n.lang === 'ar' ? 'نقطة! ✨' : 'points! ✨'}`, 'success');
        }, 1500);
    }
};

// ==================== 13. ADMIN PANEL ====================
const AdminPanel = {
    isAdmin: false,
    currentTab: 'dashboard',
    sessionTimeout: 30 * 60 * 1000,

    checkSession() {
        try {
            const s = JSON.parse(localStorage.getItem(CONFIG.keys.adminSession));
            return s && (Date.now() - s.time) < this.sessionTimeout;
        } catch (e) { return false; }
    },

    async login(email, password) {
        if (!FB.ok) return { success: false, error: 'Firebase not available' };
        try {
            const cred = await FB.auth.signInWithEmailAndPassword(email, password);
            let isAdmin = false;
            try {
                const doc = await FB.db.collection('users').doc(cred.user.uid).get();
                isAdmin = doc.exists && doc.data().role === 'admin';
            } catch (e) { isAdmin = false; }
            if (!isAdmin) {
                await FB.auth.signOut();
                return { success: false, error: 'Not authorized as admin' };
            }
            localStorage.setItem(CONFIG.keys.adminSession, JSON.stringify({
                uid: cred.user.uid, email, time: Date.now()
            }));
            return { success: true };
        } catch (e) {
            return { success: false, error: 'Invalid credentials' };
        }
    },

    logout() {
        localStorage.removeItem(CONFIG.keys.adminSession);
        if (FB.ok) FB.auth.signOut();
        this.isAdmin = false;
        location.hash = 'home';
        location.reload();
    },

    render(container) {
        const sessionOk = this.checkSession();
        if (!sessionOk) {
            this.renderLogin(container);
        } else {
            this.renderDashboard(container);
        }
    },

    renderLogin(container) {
        container.innerHTML = `
            <div class="admin-screen">
                <div class="admin-login">
                    <div class="admin-login-card">
                        <div class="admin-login-logo">
                            <i class="fas fa-shield-alt"></i>
                            <div class="admin-login-title">ADMIN PANEL</div>
                        </div>
                        <form id="admin-login-form">
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" id="admin-email" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-input" id="admin-password" required>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width:100%;">Login</button>
                            <div class="auth-error" id="admin-login-error"></div>
                        </form>
                        <div style="text-align:center;margin-top:var(--space-lg);">
                            <a href="#home" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> Back to Site</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('admin-login-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value.trim();
            const pass = document.getElementById('admin-password').value;
            const err = document.getElementById('admin-login-error');
            err.style.display = 'none';
            const btn = e.target.querySelector('button[type="submit"]');
            btn.disabled = true;
            const r = await this.login(email, pass);
            btn.disabled = false;
            if (r.success) {
                this.renderDashboard(container);
                UI.showToast('Welcome, Admin!', 'success');
            } else {
                err.textContent = r.error;
                err.style.display = 'block';
            }
        });
    },

    renderDashboard(container) {
        container.innerHTML = `
            <div class="admin-screen">
                <div class="admin-layout">
                    <aside class="admin-sidebar" id="admin-sidebar">
                        <div class="admin-sidebar-header">
                            <i class="fas fa-shield-alt"></i>
                            <span class="admin-sidebar-title">ADMIN</span>
                        </div>
                        <div class="admin-nav-item active" data-tab="dashboard"><i class="fas fa-chart-line"></i> Dashboard</div>
                        <div class="admin-nav-item" data-tab="orders"><i class="fas fa-shopping-cart"></i> Orders</div>
                        <div class="admin-nav-item" data-tab="users"><i class="fas fa-users"></i> Users</div>
                        <div class="admin-nav-item" data-tab="games"><i class="fas fa-gamepad"></i> Games</div>
                        <div class="admin-nav-item" data-tab="codes"><i class="fas fa-key"></i> Coin Codes</div>
                        <div class="admin-nav-item" data-tab="settings"><i class="fas fa-cog"></i> Settings</div>
                        <div style="margin-top:auto;padding-top:var(--space-lg);border-top:1px solid var(--glass-border);">
                            <div class="admin-nav-item" id="admin-view-site"><i class="fas fa-globe"></i> View Site</div>
                            <div class="admin-nav-item" id="admin-logout" style="color:var(--neon-pink);"><i class="fas fa-sign-out-alt"></i> Logout</div>
                        </div>
                    </aside>
                    <div class="admin-content" id="admin-content-area"></div>
                </div>
            </div>
        `;
        document.getElementById('admin-view-site')?.addEventListener('click', () => location.hash = 'home');
        document.getElementById('admin-logout')?.addEventListener('click', () => this.logout());
        document.querySelectorAll('.admin-nav-item[data-tab]').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.admin-nav-item[data-tab]').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.currentTab = item.dataset.tab;
                this.renderTab(item.dataset.tab);
            });
        });
        this.renderTab('dashboard');
    },

    renderTab(tab) {
        const area = document.getElementById('admin-content-area');
        if (!area) return;
        switch (tab) {
            case 'dashboard': this.renderDashboardTab(area); break;
            case 'orders': this.renderOrdersTab(area); break;
            case 'users': this.renderUsersTab(area); break;
            case 'games': this.renderGamesTab(area); break;
            case 'codes': this.renderCodesTab(area); break;
            case 'settings': this.renderSettingsTab(area); break;
        }
    },

    async renderDashboardTab(area) {
        area.innerHTML = `
            <div class="admin-header">
                <h1 class="admin-title"><i class="fas fa-chart-line"></i> Dashboard</h1>
                <span style="color:var(--text-muted);font-size:0.85rem;">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="admin-profit-box">
                <h3 style="margin-bottom:var(--space-lg);"><i class="fas fa-dollar-sign"></i> Financial Overview</h3>
                <div class="admin-profit-grid">
                    <div class="admin-profit-item"><div class="admin-profit-label">Est. Ad Revenue</div><div class="admin-profit-value green" id="est-revenue">$0.00</div></div>
                    <div class="admin-profit-item"><div class="admin-profit-label">Top-Up Costs</div><div class="admin-profit-value pink" id="topup-costs">$0.00</div></div>
                    <div class="admin-profit-item"><div class="admin-profit-label">Net Profit</div><div class="admin-profit-value gold" id="net-profit">$0.00</div></div>
                </div>
            </div>
            <div class="admin-stats">
                <div class="admin-stat"><i class="fas fa-shopping-cart admin-stat-icon"></i><div class="admin-stat-label">Total Orders</div><div class="admin-stat-value" id="stat-total-orders">0</div></div>
                <div class="admin-stat gold"><i class="fas fa-clock admin-stat-icon"></i><div class="admin-stat-label">Pending</div><div class="admin-stat-value" id="stat-pending">0</div></div>
                <div class="admin-stat green"><i class="fas fa-check admin-stat-icon"></i><div class="admin-stat-label">Shipped</div><div class="admin-stat-value" id="stat-shipped">0</div></div>
                <div class="admin-stat pink"><i class="fas fa-users admin-stat-icon"></i><div class="admin-stat-label">Total Users</div><div class="admin-stat-value" id="stat-users">0</div></div>
            </div>
            <div class="admin-card">
                <div class="admin-card-title"><i class="fas fa-fire"></i> Recent Orders</div>
                <div id="recent-orders-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div>
            </div>
        `;
        await this.loadDashboardData();
    },

    async loadDashboardData() {
        let orders = [], users = [];
        if (FB.ok) {
            try {
                const ordersSnap = await FB.db.collection('orders').orderBy('createdAt', 'desc').limit(100).get();
                orders = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            } catch (e) { console.warn('Orders load failed:', e); }
            try {
                const usersSnap = await FB.db.collection('users').get();
                users = usersSnap.docs.map(d => d.data());
            } catch (e) {}
        }
        if (orders.length === 0) orders = UserState.orders;
        const pending = orders.filter(o => o.status === 'pending').length;
        const shipped = orders.filter(o => o.status === 'shipped').length;
        const totalPoints = orders.reduce((s, o) => s + (o.points || 0), 0);
        const pointValue = 0.001;
        const estRevenue = totalPoints * pointValue * 1.3;
        const topupCosts = shipped * 5;
        const netProfit = estRevenue - topupCosts;

        document.getElementById('stat-total-orders').textContent = orders.length;
        document.getElementById('stat-pending').textContent = pending;
        document.getElementById('stat-shipped').textContent = shipped;
        document.getElementById('stat-users').textContent = users.length || 'N/A';
        document.getElementById('est-revenue').textContent = '$' + estRevenue.toFixed(2);
        document.getElementById('topup-costs').textContent = '$' + topupCosts.toFixed(2);
        document.getElementById('net-profit').textContent = '$' + netProfit.toFixed(2);

        const recent = orders.slice(0, 10);
        document.getElementById('recent-orders-list').innerHTML = recent.length === 0
            ? '<div class="admin-empty"><i class="fas fa-inbox"></i> No orders yet</div>'
            : '<table class="admin-table"><thead><tr><th>Game</th><th>Package</th><th>Player ID</th><th>Status</th><th>Date</th></tr></thead><tbody>' +
                recent.map(o => `<tr>
                    <td><i class="fas ${o.gameIcon || 'fa-gamepad'}" style="color:${o.gameColor || 'var(--neon)'}"></i> ${Utils.esc(o.gameName || '')}</td>
                    <td>${Utils.esc(o.packageAmount || '')}</td>
                    <td><code>${Utils.esc(o.playerId || '')}</code></td>
                    <td><span class="order-status ${o.status || 'pending'}">${o.status || 'pending'}</span></td>
                    <td>${Utils.formatDate(o.createdAt || 0)}</td>
                </tr>`).join('') + '</tbody></table>';
    },

    async renderOrdersTab(area) {
        area.innerHTML = `
            <div class="admin-header"><h1 class="admin-title"><i class="fas fa-shopping-cart"></i> Orders Management</h1></div>
            <div class="admin-card">
                <div id="orders-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div>
            </div>
        `;
        let orders = [];
        if (FB.ok) {
            try {
                const snap = await FB.db.collection('orders').orderBy('createdAt', 'desc').limit(200).get();
                orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            } catch (e) {}
        }
        if (orders.length === 0) orders = UserState.orders;
        document.getElementById('orders-list').innerHTML = orders.length === 0
            ? '<div class="admin-empty"><i class="fas fa-inbox"></i> No orders</div>'
            : '<table class="admin-table"><thead><tr><th>ID</th><th>Game</th><th>Package</th><th>Player ID</th><th>Extra</th><th>Points</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
                orders.map(o => `<tr>
                    <td><code style="font-size:0.75rem;">${Utils.esc(o.id || '')}</code></td>
                    <td><i class="fas ${o.gameIcon || 'fa-gamepad'}" style="color:${o.gameColor || 'var(--neon)'}"></i> ${Utils.esc(o.gameName || '')}</td>
                    <td>${Utils.esc(o.packageAmount || '')}</td>
                    <td><code>${Utils.esc(o.playerId || '')}</code></td>
                    <td>${Utils.esc(o.extra || '-')}</td>
                    <td><i class="fas fa-coins" style="color:var(--gold);"></i> ${o.points || 0}</td>
                    <td><span class="order-status ${o.status || 'pending'}">${o.status || 'pending'}</span></td>
                    <td>
                        <button class="admin-action-btn approve" onclick="AdminPanel.updateOrderStatus('${o.id}', 'approved')" title="Approve"><i class="fas fa-check"></i></button>
                        <button class="admin-action-btn ship" onclick="AdminPanel.updateOrderStatus('${o.id}', 'shipped')" title="Ship"><i class="fas fa-truck"></i></button>
                        <button class="admin-action-btn reject" onclick="AdminPanel.updateOrderStatus('${o.id}', 'rejected')" title="Reject"><i class="fas fa-times"></i></button>
                    </td>
                </tr>`).join('') + '</tbody></table>';
    },

    async updateOrderStatus(orderId, status) {
        if (FB.ok) {
            try {
                await FB.db.collection('orders').doc(orderId).update({ status, updatedAt: Date.now() });
                UI.showToast('Order updated to ' + status, 'success');
                this.renderTab('orders');
            } catch (e) {
                UI.showToast('Update failed', 'error');
            }
        }
    },

    async renderUsersTab(area) {
        area.innerHTML = `
            <div class="admin-header"><h1 class="admin-title"><i class="fas fa-users"></i> Users</h1></div>
            <div class="admin-card"><div id="users-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div></div>
        `;
        let users = [];
        if (FB.ok) {
            try {
                const snap = await FB.db.collection('users').get();
                users = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            } catch (e) {}
        }
        document.getElementById('users-list').innerHTML = users.length === 0
            ? '<div class="admin-empty"><i class="fas fa-users"></i> No users</div>'
            : '<table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead><tbody>' +
                users.map(u => `<tr>
                    <td>${Utils.esc(u.name || '-')}</td>
                    <td>${Utils.esc(u.email || '-')}</td>
                    <td><span class="order-status ${u.role === 'admin' ? 'shipped' : 'approved'}">${u.role || 'user'}</span></td>
                    <td>${Utils.formatDate(u.createdAt || 0)}</td>
                </tr>`).join('') + '</tbody></table>';
    },

    renderGamesTab(area) {
        area.innerHTML = `
            <div class="admin-header"><h1 class="admin-title"><i class="fas fa-gamepad"></i> Games Management</h1></div>
            <div class="admin-card">
                <table class="admin-table">
                    <thead><tr><th>Game</th><th>Currency</th><th>Packages</th><th>Min Points</th></tr></thead>
                    <tbody>
                        ${GAMES_DATA.map(g => `<tr>
                            <td><i class="fas ${g.icon}" style="color:${g.color}"></i> ${Utils.esc(g.name.en)}</td>
                            <td>${g.currency}</td>
                            <td>${g.packages.length}</td>
                            <td><i class="fas fa-coins" style="color:var(--gold);"></i> ${g.packages[0].points}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
            <div class="admin-card">
                <div class="admin-card-title"><i class="fas fa-info-circle"></i> Note</div>
                <p style="font-size:0.9rem;color:var(--text-secondary);">To modify games/packages, edit the <code>GAMES_DATA</code> array in app.js.</p>
            </div>
        `;
    },

    renderCodesTab(area) {
        area.innerHTML = `
            <div class="admin-header"><h1 class="admin-title"><i class="fas fa-key"></i> Coin Codes</h1></div>
            <div class="admin-card">
                <div class="admin-card-title"><i class="fas fa-plus"></i> Generate New Code</div>
                <div class="admin-form-grid">
                    <div class="form-group"><label class="form-label">Code (optional)</label><input type="text" class="form-input" id="new-code-text" placeholder="AUTO-GENERATE" maxlength="20"></div>
                    <div class="form-group"><label class="form-label">Amount</label><input type="number" class="form-input" id="new-code-amount" value="100"></div>
                </div>
                <button class="btn btn-primary" id="gen-code-btn"><i class="fas fa-key"></i> Generate Code</button>
            </div>
            <div class="admin-card">
                <div class="admin-card-title"><i class="fas fa-list"></i> Active Codes</div>
                <div id="codes-list"><div class="admin-empty"><i class="fas fa-key"></i> Use default: ADTOPUP2026 (+500 points)</div></div>
            </div>
        `;
        document.getElementById('gen-code-btn')?.addEventListener('click', async () => {
            const text = (document.getElementById('new-code-text').value || '').trim().toUpperCase() || 'CODE-' + Utils.genId().toUpperCase();
            const amount = parseInt(document.getElementById('new-code-amount').value) || 100;
            if (FB.ok) {
                try {
                    await FB.db.collection('coin_codes').doc(text).set({ code: text, amount, active: true, usedCount: 0, createdAt: Date.now() });
                    UI.showToast('Code created: ' + text, 'success');
                } catch (e) {
                    UI.showToast('Failed: ' + e.message, 'error');
                }
            }
        });
    },

    renderSettingsTab(area) {
        area.innerHTML = `
            <div class="admin-header"><h1 class="admin-title"><i class="fas fa-cog"></i> Settings</h1></div>
            <div class="admin-card">
                <div class="admin-card-title"><i class="fas fa-coins"></i> Points Settings</div>
                <div class="admin-form-grid">
                    <div class="form-group"><label class="form-label">Daily Gift</label><input type="number" class="form-input" id="set-daily" value="${CONFIG.points.dailyGift}"></div>
                    <div class="form-group"><label class="form-label">Ad Watch Reward</label><input type="number" class="form-input" id="set-ad" value="${CONFIG.points.adWatch}"></div>
                    <div class="form-group"><label class="form-label">Visit Task Reward</label><input type="number" class="form-input" id="set-task" value="${CONFIG.points.taskVisit}"></div>
                    <div class="form-group"><label class="form-label">Ad Revenue/User ($)</label><input type="number" step="0.01" class="form-input" id="set-rev" value="${CONFIG.points.adRevenuePerUser}"></div>
                </div>
                <button class="btn btn-primary" id="save-settings-btn"><i class="fas fa-save"></i> Save Settings</button>
            </div>
            <div class="admin-card">
                <div class="admin-card-title"><i class="fas fa-exclamation-triangle" style="color:var(--neon-pink);"></i> Danger Zone</div>
                <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:var(--space-md);">Reset local data and reload.</p>
                <button class="btn btn-danger" id="reset-btn"><i class="fas fa-trash"></i> Reset Local Data</button>
            </div>
        `;
        document.getElementById('save-settings-btn')?.addEventListener('click', async () => {
            CONFIG.points.dailyGift = parseInt(document.getElementById('set-daily').value) || 50;
            CONFIG.points.adWatch = parseInt(document.getElementById('set-ad').value) || 100;
            CONFIG.points.taskVisit = parseInt(document.getElementById('set-task').value) || 75;
            CONFIG.points.adRevenuePerUser = parseFloat(document.getElementById('set-rev').value) || 1.5;
            if (FB.ok) {
                try {
                    await FB.db.collection('settings').doc('site').set({ points: CONFIG.points }, { merge: true });
                    UI.showToast('Settings saved!', 'success');
                } catch (e) {
                    UI.showToast('Save failed', 'error');
                }
            }
        });
        document.getElementById('reset-btn')?.addEventListener('click', () => {
            if (confirm('Reset all local data?')) {
                localStorage.clear();
                location.reload();
            }
        });
    }
};

// ==================== 14. ROUTER ====================
const Router = {
    route: '',
    init() {
        addEventListener('hashchange', () => this.handle());
        this.handle();
    },
    handle() {
        this.route = location.hash.slice(1) || 'home';
        document.getElementById('mobile-menu')?.classList.remove('open');
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => {
            l.classList.toggle('active', (l.getAttribute('href') || '').slice(1) === this.route);
        });
        scrollTo(0, 0);
        this.renderCurrent();
    },
    renderCurrent() {
        const c = document.getElementById('app-container');
        if (!c) return;
        const r = this.route;
        if (r === 'admin') {
            AdminPanel.render(c);
        } else if (r === 'home' || r === '') {
            Pages.home(c);
        } else if (r === 'games') {
            Pages.games(c);
        } else if (r.startsWith('game/')) {
            Pages.gameDetail(c, r.split('/')[1]);
        } else if (r === 'earn') {
            Pages.earn(c);
        } else if (r === 'orders') {
            Pages.orders(c);
        } else if (r === 'how') {
            Pages.how(c);
        } else if (r === 'privacy') {
            Pages.privacy(c);
        } else if (r === 'terms') {
            Pages.terms(c);
        } else {
            Pages.notFound(c);
        }
        Effects.reveal();
    }
};

// ==================== 15. NAVBAR ====================
const Navbar = {
    init() {
        addEventListener('scroll', Utils.debounce(() => {
            document.getElementById('navbar')?.classList.toggle('scrolled', scrollY > 50);
        }, 100));
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        btn?.addEventListener('click', () => {
            const o = menu.classList.toggle('open');
            btn.querySelector('i').className = o ? 'fas fa-times' : 'fas fa-bars';
        });
        document.getElementById('lang-switcher')?.addEventListener('click', () => I18n.toggle());
        document.getElementById('effects-toggle')?.addEventListener('click', () => Effects.toggle());
        document.getElementById('coins-btn')?.addEventListener('click', () => {
            UserState.updateUI();
            UI.openModal('points-modal');
        });
        document.addEventListener('click', e => {
            const b = e.target.closest('.btn');
            if (b && Effects.enabled) {
                const r = document.createElement('span');
                r.className = 'ripple';
                const rect = b.getBoundingClientRect();
                const s = Math.max(rect.width, rect.height);
                r.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - rect.left - s/2}px;top:${e.clientY - rect.top - s/2}px;`;
                b.appendChild(r);
                setTimeout(() => r.remove(), 600);
            }
        });
        // Admin shortcuts
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
                e.preventDefault();
                location.hash = 'admin';
            }
        });
        let buf = '';
        document.addEventListener('keypress', e => {
            const t = document.activeElement?.tagName;
            if (t === 'INPUT' || t === 'TEXTAREA') return;
            buf += e.key.toLowerCase();
            if (buf.includes('admin')) { location.hash = 'admin'; buf = ''; }
            if (buf.length > 10) buf = buf.slice(-10);
        });
    }
};

const CookieConsent = {
    init() {
        const consent = LS.get(CONFIG.keys.cookie);
        if (consent) return;
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'block';
        document.getElementById('cookie-accept')?.addEventListener('click', () => {
            LS.set(CONFIG.keys.cookie, 'accepted');
            banner.style.display = 'none';
        });
    }
};

const FooterGames = {
    render() {
        const el = document.getElementById('footer-games');
        if (el) {
            el.innerHTML = GAMES_DATA.slice(0, 5).map(g =>
                `<li><a href="#game/${g.id}">${Utils.esc(g.name[I18n.lang])}</a></li>`
            ).join('');
        }
    }
};

const PointsModal = {
    init() {
        document.getElementById('daily-gift-btn')?.addEventListener('click', () => TopUp.dailyGift());
        document.getElementById('ad-watch-btn')?.addEventListener('click', () => TopUp.watchAd());
        document.getElementById('tasks-btn')?.addEventListener('click', () => TopUp.visitTask());
        document.getElementById('redeem-btn')?.addEventListener('click', () => {
            const input = document.getElementById('redeem-code-input');
            const code = (input?.value || '').trim().toUpperCase();
            if (code === 'ADTOPUP2026') { UserState.addPoints(500); input.value = ''; UI.showToast('+500 points! 🎉', 'success'); }
            else UI.showToast('Invalid code!', 'error');
        });
    }
};

// Expose for inline handlers
window.AdminPanel = AdminPanel;

// ==================== 16. APP INIT ====================
const App = {
    async init() {
        try {
            FB.init();
            I18n.init();
            Theme.init();
            Effects.init();
            UserState.load();
            Auth.init();
            Navbar.init();
            CookieConsent.init();
            TopUp.initOrderForm();
            PointsModal.init();
            FooterGames.render();
            Router.init();
            setTimeout(() => UI.hideLoader(), 1200);
            console.log('✅ AdTopUp ready!');
        } catch (e) {
            console.error('Init error:', e);
            UI.hideLoader();
        }
    }
};

window.addEventListener('error', e => console.warn('Caught:', e.message));
document.addEventListener('DOMContentLoaded', () => App.init());
window.UI = UI;
window.Router = Router;
window.TopUp = TopUp;
