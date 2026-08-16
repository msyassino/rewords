/* ================================================================
ADTOPUP GAMING HUB - MAIN APPLICATION
Secure + Lightweight + Firebase Powered
================================================================ */
'use strict';

// ==================== 1. CONFIGURATION ====================
const CONFIG = {
    firebase: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    },
    site: {
        name: "AdTopUp",
        version: "1.0.0"
    },
    keys: {
        lang: 'adtopup_lang',
        theme: 'adtopup_theme',
        effects: 'adtopup_effects',
        user: 'adtopup_user',
        cookie: 'adtopup_cookie'
    },
    points: {
        dailyGift: 50,
        adWatch: 100,
        taskVisit: 75,
        multiplier: 1.3 // 30% profit margin
    }
};

// ==================== 2. GAMES DATA ====================
const GAMES_DATA = [
    { id: 'freefire', name: { en: 'Free Fire', ar: 'فري فاير' }, icon: 'fa-fire', color: '#FF6B35', currency: 'Diamonds', image: 'https://placehold.co/400x225/1a1a2e/FF6B35?text=Free+Fire', packages: [
        { id: 'ff1', amount: '100 💎', price: 0.99, points: 130 },
        { id: 'ff2', amount: '310 💎', price: 2.99, points: 390 },
        { id: 'ff3', amount: '520 💎', price: 4.99, points: 650 },
        { id: 'ff4', amount: '1080 💎', price: 9.99, points: 1300 },
        { id: 'ff5', amount: '2200 💎', price: 19.99, points: 2600 },
        { id: 'ff6', amount: '5600 💎', price: 49.99, points: 6500, popular: true }
    ]},
    { id: 'pubg', name: { en: 'PUBG Mobile', ar: 'ببجي موبايل' }, icon: 'fa-crosshairs', color: '#F2A900', currency: 'UC', image: 'https://placehold.co/400x225/1a1a2e/F2A900?text=PUBG+Mobile', packages: [
        { id: 'pb1', amount: '60 UC', price: 0.99, points: 130 },
        { id: 'pb2', amount: '325 UC', price: 4.99, points: 650 },
        { id: 'pb3', amount: '660 UC', price: 9.99, points: 1300 },
        { id: 'pb4', amount: '1800 UC', price: 24.99, points: 3250 },
        { id: 'pb5', amount: '3850 UC', price: 49.99, points: 6500, popular: true }
    ]},
    { id: 'ml', name: { en: 'Mobile Legends', ar: 'موبايل ليجندز' }, icon: 'fa-shield-halved', color: '#4A90D9', currency: 'Diamonds', image: 'https://placehold.co/400x225/1a1a2e/4A90D9?text=Mobile+Legends', packages: [
        { id: 'ml1', amount: '86 💎', price: 1.49, points: 195 },
        { id: 'ml2', amount: '172 💎', price: 2.99, points: 390 },
        { id: 'ml3', amount: '257 💎', price: 4.49, points: 585 },
        { id: 'ml4', amount: '706 💎', price: 11.99, points: 1560 },
        { id: 'ml5', amount: '2195 💎', price: 36.99, points: 4810, popular: true }
    ]},
    { id: 'roblox', name: { en: 'Roblox', ar: 'روبلوكس' }, icon: 'fa-cubes', color: '#E2231A', currency: 'Robux', image: 'https://placehold.co/400x225/1a1a2e/E2231A?text=Roblox', packages: [
        { id: 'rb1', amount: '400 Robux', price: 4.99, points: 650 },
        { id: 'rb2', amount: '800 Robux', price: 9.99, points: 1300 },
        { id: 'rb3', amount: '1700 Robux', price: 19.99, points: 2600 },
        { id: 'rb4', amount: '4500 Robux', price: 49.99, points: 6500, popular: true }
    ]},
    { id: 'cod', name: { en: 'COD Mobile', ar: 'كود موبايل' }, icon: 'fa-gun', color: '#00E676', currency: 'CP', image: 'https://placehold.co/400x225/1a1a2e/00E676?text=COD+Mobile', packages: [
        { id: 'cd1', amount: '80 CP', price: 0.99, points: 130 },
        { id: 'cd2', amount: '400 CP', price: 4.99, points: 650 },
        { id: 'cd3', amount: '880 CP', price: 9.99, points: 1300 },
        { id: 'cd4', amount: '2400 CP', price: 24.99, points: 3250 },
        { id: 'cd5', amount: '5000 CP', price: 49.99, points: 6500, popular: true }
    ]},
    { id: 'genshin', name: { en: 'Genshin Impact', ar: 'جينشن إمباكت' }, icon: 'fa-wand-sparkles', color: '#9B59B6', currency: 'Genesis Crystals', image: 'https://placehold.co/400x225/1a1a2e/9B59B6?text=Genshin', packages: [
        { id: 'gs1', amount: '60 Crystals', price: 0.99, points: 130 },
        { id: 'gs2', amount: '330 Crystals', price: 4.99, points: 650 },
        { id: 'gs3', amount: '1090 Crystals', price: 14.99, points: 1950 },
        { id: 'gs4', amount: '3280 Crystals', price: 44.99, points: 5850, popular: true }
    ]},
    { id: 'clash', name: { en: 'Clash of Clans', ar: 'كلاش أوف كلانس' }, icon: 'fa-chess-rook', color: '#FF9800', currency: 'Gems', image: 'https://placehold.co/400x225/1a1a2e/FF9800?text=Clash+of+Clans', packages: [
        { id: 'cc1', amount: '500 Gems', price: 4.99, points: 650 },
        { id: 'cc2', amount: '1200 Gems', price: 9.99, points: 1300 },
        { id: 'cc3', amount: '2500 Gems', price: 19.99, points: 2600 },
        { id: 'cc4', amount: '6500 Gems', price: 49.99, points: 6500, popular: true }
    ]},
    { id: 'fortnite', name: { en: 'Fortnite', ar: 'فورتنايت' }, icon: 'fa-bolt', color: '#00BCD4', currency: 'V-Bucks', image: 'https://placehold.co/400x225/1a1a2e/00BCD4?text=Fortnite', packages: [
        { id: 'fn1', amount: '1000 V-Bucks', price: 7.99, points: 1040 },
        { id: 'fn2', amount: '2800 V-Bucks', price: 19.99, points: 2600 },
        { id: 'fn3', amount: '5000 V-Bucks', price: 31.99, points: 4160 },
        { id: 'fn4', amount: '13500 V-Bucks', price: 79.99, points: 10400, popular: true }
    ]}
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
    async copy(t) {
        try {
            await navigator.clipboard.writeText(t);
            return true;
        } catch (e) {
            const ta = document.createElement('textarea');
            ta.value = t;
            ta.style.cssText = 'position:fixed;opacity:0;';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); return true; }
            catch (e2) { return false; }
            finally { document.body.removeChild(ta); }
        }
    },
    todayStr() { return new Date().toDateString(); }
};

// ==================== 4. LOCAL STORAGE ====================
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

// ==================== 5. FIREBASE ====================
const FB = {
    db: null, auth: null, ok: false, user: null, userPromise: null,
    init() {
        try {
            if (typeof firebase !== 'undefined' && CONFIG.firebase.apiKey !== "YOUR_API_KEY") {
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

// ==================== 6. I18N ====================
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
        document.querySelectorAll('[data-en]').forEach(el => {
            const v = el.getAttribute('data-' + this.lang);
            if (v) el.textContent = v;
        });
        document.querySelectorAll('[data-en-placeholder]').forEach(el => {
            const v = el.getAttribute('data-' + this.lang + '-placeholder');
            if (v) el.placeholder = v;
        });
    }
};

// ==================== 7. THEME ====================
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

// ==================== 8. UI ====================
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

// ==================== 9. EFFECTS ====================
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

// ==================== 10. USER STATE ====================
const UserState = {
    points: 0,
    orders: [],
    lastDaily: null,
    adTimer: null,

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

// ==================== 11. AUTH ====================
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

// ==================== 12. PAGES RENDERER ====================
const Pages = {
    home(c) {
        const L = I18n.lang;
        c.innerHTML = `
            <section class="hero reveal active">
                <div class="hero-badge"><i class="fas fa-bolt"></i> <span data-en="100% Free - Funded by Ads" data-ar="مجاني 100% - ممول بالإعلانات">${L === 'ar' ? 'مجاني 100% - ممول بالإعلانات' : '100% Free - Funded by Ads'}</span></div>
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

            <!-- Ad Placeholder -->
            <div class="ad-placeholder reveal" style="margin-bottom:var(--space-2xl);">
                <i class="fas fa-ad"></i>
                <p>${L === 'ar' ? 'مساحة إعلانية - سيتم تفعيلها بعد الموافقة' : 'Ad Space - Will be activated after approval'}</p>
            </div>

            <!-- Popular Games -->
            <section class="reveal">
                <div class="section-header">
                    <h2 class="section-title"><i class="fas fa-fire"></i> ${L === 'ar' ? 'ألعاب شائعة' : 'Popular Games'}</h2>
                    <a href="#games" class="btn btn-sm btn-secondary">${L === 'ar' ? 'عرض الكل' : 'View All'}</a>
                </div>
                <div class="games-grid">
                    ${GAMES_DATA.slice(0, 4).map(g => this.gameCard(g)).join('')}
                </div>
            </section>

            <!-- How It Works Preview -->
            <section class="reveal" style="margin-top:var(--space-3xl);">
                <div class="section-header">
                    <h2 class="section-title"><i class="fas fa-lightbulb"></i> ${L === 'ar' ? 'كيف يعمل؟' : 'How It Works?'}</h2>
                </div>
                <div class="steps-grid">
                    <div class="step-card card">
                        <div class="step-number">1</div>
                        <h3 class="step-title">${L === 'ar' ? 'شاهد الإعلانات' : 'Watch Ads'}</h3>
                        <p class="step-desc">${L === 'ar' ? 'شاهد الإعلانات وأكمل المهام لجمع النقاط' : 'Watch ads and complete tasks to earn points'}</p>
                    </div>
                    <div class="step-card card">
                        <div class="step-number">2</div>
                        <h3 class="step-title">${L === 'ar' ? 'اجمع النقاط' : 'Collect Points'}</h3>
                        <p class="step-desc">${L === 'ar' ? 'كل إعلان يمنحك نقاط. اجعلها تكفي للباقة المطلوبة' : 'Each ad gives you points. Collect enough for your package'}</p>
                    </div>
                    <div class="step-card card">
                        <div class="step-number">3</div>
                        <h3 class="step-title">${L === 'ar' ? 'اطلب الشحن' : 'Request Top-Up'}</h3>
                        <p class="step-desc">${L === 'ar' ? 'اختر الباقة، أدخل معرفك، وأرسل الطلب' : 'Choose package, enter your ID, submit order'}</p>
                    </div>
                    <div class="step-card card">
                        <div class="step-number">4</div>
                        <h3 class="step-title">${L === 'ar' ? 'استلم الشحن' : 'Receive Top-Up'}</h3>
                        <p class="step-desc">${L === 'ar' ? 'يتم الشحن يدوياً خلال 1-24 ساعة' : 'Manual top-up within 1-24 hours'}</p>
                    </div>
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
                    <img src="${g.image}" alt="${Utils.esc(g.name[L])}" loading="lazy">
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
                <div class="section-header">
                    <h1 class="section-title"><i class="fas fa-gamepad"></i> ${L === 'ar' ? 'جميع الألعاب' : 'All Games'}</h1>
                </div>
                <div class="games-grid">
                    ${GAMES_DATA.map(g => this.gameCard(g)).join('')}
                </div>
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
                    <div>
                        <h1 style="margin:0;">${Utils.esc(game.name[L])}</h1>
                        <p style="margin:0;color:var(--text-muted);">${game.currency}</p>
                    </div>
                </div>

                <div class="ad-placeholder" style="margin-bottom:var(--space-2xl);">
                    <i class="fas fa-ad"></i>
                    <p>${L === 'ar' ? 'مساحة إعلانية' : 'Ad Space'}</p>
                </div>

                <div class="section-header">
                    <h2 class="section-title"><i class="fas fa-coins"></i> ${L === 'ar' ? 'اختر الباقة' : 'Choose Package'}</h2>
                </div>
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
                <div class="section-header">
                    <h1 class="section-title"><i class="fas fa-coins"></i> ${L === 'ar' ? 'اكسب النقاط' : 'Earn Points'}</h1>
                </div>

                <div class="points-balance-card" style="margin-bottom:var(--space-2xl);">
                    <div class="points-balance-icon"><i class="fas fa-coins"></i></div>
                    <div>
                        <div class="points-balance-value" id="earn-page-points">${UserState.points}</div>
                        <div class="points-balance-label">${L === 'ar' ? 'رصيدك الحالي' : 'Your Current Balance'}</div>
                    </div>
                </div>

                <div class="packages-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr));">
                    <div class="card package-card reveal" onclick="TopUp.dailyGift()">
                        <div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon-pink);"><i class="fas fa-gift"></i></div>
                        <div class="package-amount">${L === 'ar' ? 'هدية يومية' : 'Daily Gift'}</div>
                        <div class="package-points" style="font-size:0.9rem;">+${CONFIG.points.dailyGift} ${L === 'ar' ? 'نقطة' : 'points'}</div>
                        <button class="btn btn-sm btn-gold" style="margin-top:var(--space-md);" id="daily-btn">${L === 'ar' ? 'استلم' : 'Claim'}</button>
                    </div>
                    <div class="card package-card reveal" onclick="TopUp.watchAd()">
                        <div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon);"><i class="fas fa-play-circle"></i></div>
                        <div class="package-amount">${L === 'ar' ? 'شاهد إعلان' : 'Watch Ad'}</div>
                        <div class="package-points" style="font-size:0.9rem;">+${CONFIG.points.adWatch} ${L === 'ar' ? 'نقطة' : 'points'}</div>
                        <button class="btn btn-sm btn-primary" style="margin-top:var(--space-md);" id="ad-btn">${L === 'ar' ? 'شاهد' : 'Watch'}</button>
                    </div>
                    <div class="card package-card reveal" onclick="TopUp.visitTask()">
                        <div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon-purple);"><i class="fas fa-external-link-alt"></i></div>
                        <div class="package-amount">${L === 'ar' ? 'زر رابط' : 'Visit Link'}</div>
                        <div class="package-points" style="font-size:0.9rem;">+${CONFIG.points.taskVisit} ${L === 'ar' ? 'نقطة' : 'points'}</div>
                        <button class="btn btn-sm btn-secondary" style="margin-top:var(--space-md);" id="task-btn">${L === 'ar' ? 'زر' : 'Visit'}</button>
                    </div>
                </div>

                <div class="ad-placeholder" style="margin-top:var(--space-2xl);">
                    <i class="fas fa-ad"></i>
                    <p>${L === 'ar' ? 'مساحة إعلانية كبيرة - سيتم ربطها بشبكات الإعلانات' : 'Large Ad Space - Will be connected to ad networks'}</p>
                </div>

                <div style="margin-top:var(--space-2xl);padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid rgba(255,215,0,.3);">
                    <h3 style="font-size:1rem;color:var(--gold);"><i class="fas fa-key"></i> ${L === 'ar' ? 'استخدام كود' : 'Redeem Code'}</h3>
                    <div class="redeem-row" style="margin-top:var(--space-md);">
                        <input type="text" class="form-input" id="redeem-input" placeholder="${L === 'ar' ? 'أدخل الكود' : 'Enter code'}" maxlength="20">
                        <button class="btn btn-gold" onclick="TopUp.redeemCode()">${L === 'ar' ? 'تفعيل' : 'Redeem'}</button>
                    </div>
                </div>
            </section>
        `;
        Effects.reveal();
    },

    orders(c) {
        const L = I18n.lang;
        const orders = UserState.orders.sort((a, b) => b.createdAt - a.createdAt);
        c.innerHTML = `
            <section class="reveal active">
                <div class="section-header">
                    <h1 class="section-title"><i class="fas fa-clipboard-list"></i> ${L === 'ar' ? 'طلباتي' : 'My Orders'}</h1>
                </div>
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
                <div class="section-header">
                    <h1 class="section-title"><i class="fas fa-question-circle"></i> ${L === 'ar' ? 'كيف يعمل الموقع؟' : 'How It Works?'}</h1>
                </div>
                <div style="max-width:800px;margin:0 auto;">
                    <div style="padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--glass-border);margin-bottom:var(--space-xl);">
                        <h3 style="color:var(--neon);"><i class="fas fa-info-circle"></i> ${L === 'ar' ? 'الشفافية الكاملة' : 'Full Transparency'}</h3>
                        <p>${L === 'ar' ? 'هذا الموقع ممول 100% من الإعلانات. نحن نعرض لك إعلانات، ونربح منها، ونستخدم جزءاً من الأرباح لشحن ألعابك. الفرق البسيط هو ربحنا الذي يساعدنا على الاستمرار.' : 'This site is 100% funded by ads. We show you ads, earn from them, and use part of the revenue to top up your games. The small difference is our profit that keeps us running.'}</p>
                    </div>
                    <div class="steps-grid">
                        <div class="step-card card"><div class="step-number">1</div><h3 class="step-title">${L === 'ar' ? 'شاهد الإعلانات' : 'Watch Ads'}</h3><p class="step-desc">${L === 'ar' ? 'كل إعلان تشاهده يولد لنا ربحاً بسيطاً' : 'Each ad generates small revenue for us'}</p></div>
                        <div class="step-card card"><div class="step-number">2</div><h3 class="step-title">${L === 'ar' ? 'اجمع النقاط' : 'Collect Points'}</h3><p class="step-desc">${L === 'ar' ? 'نمنحك نقاط مقابل كل إعلان تشاهده' : 'We give you points for each ad watched'}</p></div>
                        <div class="step-card card"><div class="step-number">3</div><h3 class="step-title">${L === 'ar' ? 'اطلب الشحن' : 'Request Top-Up'}</h3><p class="step-desc">${L === 'ar' ? 'عندما تكفي نقاطك، أرسل طلب الشحن' : 'When you have enough points, submit order'}</p></div>
                        <div class="step-card card"><div class="step-number">4</div><h3 class="step-title">${L === 'ar' ? 'نراجع ونشحن' : 'We Review & Ship'}</h3><p class="step-desc">${L === 'ar' ? 'نتأكد أن أرباح الإعلانات تغطي التكلفة، ثم نشحن' : 'We verify ad revenue covers cost, then ship'}</p></div>
                    </div>
                </div>
            </section>
        `;
        Effects.reveal();
    },

    privacy(c) {
        const L = I18n.lang;
        c.innerHTML = `<div style="max-width:800px;margin:0 auto;" class="reveal active"><h1>${L === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1><p>${L === 'ar' ? 'نجمع الحد الأدنى من البيانات اللازمة لتشغيل الخدمة.' : 'We collect minimal data necessary to run the service.'}</p></div>`;
    },

    terms(c) {
        const L = I18n.lang;
        c.innerHTML = `<div style="max-width:800px;margin:0 auto;" class="reveal active"><h1>${L === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</h1><p>${L === 'ar' ? 'باستخدامك للموقع، أنت توافق على مشاهدة الإعلانات كطريقة للدفع.' : 'By using this site, you agree to watch ads as payment method.'}</p></div>`;
    },

    notFound(c) {
        c.innerHTML = `<section style="text-align:center;padding:var(--space-3xl);"><h1 style="font-family:var(--font-mono);font-size:4rem;color:var(--neon);">404</h1><p>Page not found</p><a href="#home" class="btn btn-primary">Go Home</a></section>`;
    }
};

// ==================== 13. TOP-UP SYSTEM ====================
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
        document.getElementById('order-form')?.addEventListener('submit', e => {
            e.preventDefault();
            this.submitOrder();
        });
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

        // Save to Firebase if available
        if (FB.ok && FB.user) {
            FB.db.collection('orders').doc(order.id).set({
                ...order,
                userId: FB.user.uid,
                userEmail: FB.user.email
            }).catch(() => {});
        }

        UI.closeModal('order-modal');
        UI.showToast(I18n.lang === 'ar' ? 'تم إرسال الطلب! سنتابعه قريباً 🎉' : 'Order submitted! We will process it soon 🎉', 'success');
        location.hash = 'orders';
    },

    dailyGift() {
        const today = Utils.todayStr();
        if (UserState.lastDaily === today) {
            UI.showToast(I18n.lang === 'ar' ? 'تم الاستلام اليوم! عد غداً' : 'Already claimed today! Come back tomorrow', 'warning');
            return;
        }
        UserState.lastDaily = today;
        UserState.addPoints(CONFIG.points.dailyGift);
        UI.showToast(`+${CONFIG.points.dailyGift} ${I18n.lang === 'ar' ? 'نقطة! 🎁' : 'points! 🎁'}`, 'success');
    },

    watchAd() {
        // PLACEHOLDER: Will open actual ad network link
        UI.showToast(I18n.lang === 'ar' ? 'سيتم فتح الإعلان...' : 'Opening ad...', 'info');
        // Simulate ad watching (replace with actual ad network callback)
        setTimeout(() => {
            UserState.addPoints(CONFIG.points.adWatch);
            UI.showToast(`+${CONFIG.points.adWatch} ${I18n.lang === 'ar' ? 'نقطة! 🎉' : 'points! 🎉'}`, 'success');
        }, 2000);
    },

    visitTask() {
        // PLACEHOLDER: Will open actual ad/offer link
        UI.showToast(I18n.lang === 'ar' ? 'سيتم فتح الرابط...' : 'Opening link...', 'info');
        setTimeout(() => {
            UserState.addPoints(CONFIG.points.taskVisit);
            UI.showToast(`+${CONFIG.points.taskVisit} ${I18n.lang === 'ar' ? 'نقطة! ✨' : 'points! ✨'}`, 'success');
        }, 1500);
    },

    redeemCode() {
        const input = document.getElementById('redeem-input');
        const code = (input?.value || '').trim().toUpperCase();
        if (!code) return;

        // Simple code validation (in production, check against Firebase)
        if (code === 'ADTOPUP2026') {
            UserState.addPoints(500);
            input.value = '';
            UI.showToast('+500 points! 🎉', 'success');
        } else {
            UI.showToast(I18n.lang === 'ar' ? 'كود غير صالح!' : 'Invalid code!', 'error');
        }
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
        if (r === 'home' || r === '') Pages.home(c);
        else if (r === 'games') Pages.games(c);
        else if (r.startsWith('game/')) Pages.gameDetail(c, r.split('/')[1]);
        else if (r === 'earn') Pages.earn(c);
        else if (r === 'orders') Pages.orders(c);
        else if (r === 'how') Pages.how(c);
        else if (r === 'privacy') Pages.privacy(c);
        else if (r === 'terms') Pages.terms(c);
        else Pages.notFound(c);
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

        // Ripple effect
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
    }
};

// ==================== 16. COOKIE CONSENT ====================
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

// ==================== 17. FOOTER GAMES ====================
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

// ==================== 18. POINTS MODAL BINDINGS ====================
const PointsModal = {
    init() {
        document.getElementById('daily-gift-btn')?.addEventListener('click', () => TopUp.dailyGift());
        document.getElementById('ad-watch-btn')?.addEventListener('click', () => TopUp.watchAd());
        document.getElementById('tasks-btn')?.addEventListener('click', () => TopUp.visitTask());
        document.getElementById('redeem-btn')?.addEventListener('click', () => {
            const input = document.getElementById('redeem-code-input');
            const code = (input?.value || '').trim().toUpperCase();
            if (code === 'ADTOPUP2026') {
                UserState.addPoints(500);
                input.value = '';
                UI.showToast('+500 points! 🎉', 'success');
            } else {
                UI.showToast('Invalid code!', 'error');
            }
        });
    }
};

// ==================== 19. APP INIT ====================
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

            if (FB.ok) {
                FB.auth.onAuthStateChanged(u => {
                    const btn = document.getElementById('auth-btn');
                    if (btn) btn.querySelector('i').className = u ? 'fas fa-user-check' : 'fas fa-user';
                });
            }

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

// Expose globals
window.UI = UI;
window.Router = Router;
window.TopUp = TopUp;
