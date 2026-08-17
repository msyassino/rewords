'use strict';
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
    site: { name: "ReWords", version: "2.0.0", url: "https://rewords.alouanepx.workers.dev" },
    keys: { lang: 'rw_lang', theme: 'rw_theme', effects: 'rw_effects', user: 'rw_user', cookie: 'rw_cookie', adminSession: 'rw_admin_session' },
    points: { dailyGift: 50, adWatch: 100, taskVisit: 75, referralBonus: 100, spinCooldown: 86400000, profitMargin: 1.5 },
    ads: { smartlink: 'https://www.effectivecpmnetwork.com/k92kfsc3?key=5558f1cfe654ce78931098e005c15fc7', freecash: 'https://freecash.com/r/34GRD6', freecashBanner: 'https://cdn.phototourl.com/free/2026-08-17-d1178f26-4ff4-4f4d-aad0-8b528e531e10.png' },
    col: { users: 'users', orders: 'orders', coinCodes: 'coin_codes', settings: 'settings', games: 'games', announcements: 'announcements', tickets: 'tickets', referrals: 'referrals' }
};
const DEFAULT_ACHIEVEMENTS = [
    { id: 'first_order', name: { en: 'First Order', ar: 'طلب الأول' }, desc: { en: 'Place your first order', ar: 'أرسل طلبك الأول' }, icon: 'fa-shopping-cart', reward: 50, max: 1 },
    { id: 'orders_10', name: { en: 'Regular', ar: 'عادي' }, desc: { en: 'Place 10 orders', ar: 'أرسل 10 طلبات' }, icon: 'fa-fire', reward: 200, max: 10 },
    { id: 'points_1000', name: { en: 'Collector', ar: 'جامع' }, desc: { en: 'Earn 1000 total points', ar: 'اجمع 1000 نقطة' }, icon: 'fa-coins', reward: 100, max: 1000 },
    { id: 'points_5000', name: { en: 'Big Spender', ar: '큰 أنفق' }, desc: { en: 'Earn 5000 total points', ar: 'اجمع 5000 نقطة' }, icon: 'fa-gem', reward: 500, max: 5000 },
    { id: 'spin_7', name: { en: 'Lucky Seven', ar: 'سبع محظوظ' }, desc: { en: 'Spin 7 times', ar: 'دوّر 7 مرات' }, icon: 'fa-dharmachakra', reward: 150, max: 7 },
    { id: 'referral_1', name: { en: 'Influencer', ar: 'مؤثر' }, desc: { en: 'Refer 1 friend', ar: 'ادعُ صديق واحد' }, icon: 'fa-users', reward: 100, max: 1 },
    { id: 'daily_7', name: { en: 'Dedicated', ar: 'مخلص' }, desc: { en: 'Claim daily gift 7 times', ar: 'استلم الهدية 7 مرات' }, icon: 'fa-calendar-check', reward: 200, max: 7 }
];
const SPIN_PRIZES = [10, 25, 50, 75, 100, 150, 200, 500];
const SPIN_COLORS = ['#FF6B35', '#5B9FFF', '#FF2E63', '#00FF9D', '#8B5CF6', '#FFE600', '#00BCD4', '#FF9800'];
const DEFAULT_GAMES_DATA = [
    { id: 'freefire', name: { en: 'Free Fire', ar: 'فري فاير' }, icon: 'fa-fire', color: '#FF6B35', currency: { en: 'Diamonds', ar: 'جواهر' }, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop', active: true, order: 1, packages: [{ id: 'ff1', amount: '108 💎', price: 0.99, points: 130 }, { id: 'ff2', amount: '310 💎', price: 2.99, points: 390 }, { id: 'ff3', amount: '520 💎', price: 4.99, points: 650 }, { id: 'ff4', amount: '1080 💎', price: 9.99, points: 1300, popular: true }, { id: 'ff5', amount: '2200 💎', price: 19.99, points: 2600 }, { id: 'ff6', amount: '5600 💎', price: 49.99, points: 6500 }] },
    { id: 'pubg', name: { en: 'PUBG Mobile', ar: 'ببجي موبايل' }, icon: 'fa-crosshairs', color: '#F2A900', currency: { en: 'UC', ar: 'يو سي' }, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop', active: true, order: 2, packages: [{ id: 'pb1', amount: '60 UC', price: 0.99, points: 130 }, { id: 'pb2', amount: '325 UC', price: 4.99, points: 650 }, { id: 'pb3', amount: '660 UC', price: 9.99, points: 1300 }, { id: 'pb4', amount: '1800 UC', price: 24.99, points: 3250 }, { id: 'pb5', amount: '3850 UC', price: 49.99, points: 6500, popular: true }] },
    { id: 'ml', name: { en: 'Mobile Legends', ar: 'موبايل ليجندز' }, icon: 'fa-shield-halved', color: '#4A90D9', currency: { en: 'Diamonds', ar: 'جواهر' }, image: 'https://images.unsplash.com/photo-1511515800041-10d8c01d8b21?w=400&h=225&fit=crop', active: true, order: 3, packages: [{ id: 'ml1', amount: '86 💎', price: 1.49, points: 195 }, { id: 'ml2', amount: '172 💎', price: 2.99, points: 390 }, { id: 'ml3', amount: '257 💎', price: 4.49, points: 585 }, { id: 'ml4', amount: '706 💎', price: 11.99, points: 1560 }, { id: 'ml5', amount: '2195 💎', price: 36.99, points: 4810, popular: true }] },
    { id: 'roblox', name: { en: 'Roblox', ar: 'روبلوكس' }, icon: 'fa-cubes', color: '#E2231A', currency: { en: 'Robux', ar: 'روبوكس' }, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=225&fit=crop', active: true, order: 4, packages: [{ id: 'rb1', amount: '400 Robux', price: 4.99, points: 650 }, { id: 'rb2', amount: '800 Robux', price: 9.99, points: 1300 }, { id: 'rb3', amount: '1700 Robux', price: 19.99, points: 2600 }, { id: 'rb4', amount: '4500 Robux', price: 49.99, points: 6500, popular: true }] },
    { id: 'cod', name: { en: 'COD Mobile', ar: 'كود موبايل' }, icon: 'fa-gun', color: '#00E676', currency: { en: 'CP', ar: 'سي بي' }, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop', active: true, order: 5, packages: [{ id: 'cd1', amount: '80 CP', price: 0.99, points: 130 }, { id: 'cd2', amount: '400 CP', price: 4.99, points: 650 }, { id: 'cd3', amount: '880 CP', price: 9.99, points: 1300 }, { id: 'cd4', amount: '2400 CP', price: 24.99, points: 3250 }, { id: 'cd5', amount: '5000 CP', price: 49.99, points: 6500, popular: true }] },
    { id: 'genshin', name: { en: 'Genshin Impact', ar: 'جينشن إمباكت' }, icon: 'fa-wand-sparkles', color: '#9B59B6', currency: { en: 'Crystals', ar: 'كristals' }, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop', active: true, order: 6, packages: [{ id: 'gs1', amount: '60 Crystals', price: 0.99, points: 130 }, { id: 'gs2', amount: '330 Crystals', price: 4.99, points: 650 }, { id: 'gs3', amount: '1090 Crystals', price: 14.99, points: 1950 }, { id: 'gs4', amount: '3280 Crystals', price: 44.99, points: 5850, popular: true }] },
    { id: 'clash', name: { en: 'Clash of Clans', ar: 'كلاش أوف كلانس' }, icon: 'fa-chess-rook', color: '#FF9800', currency: { en: 'Gems', ar: 'جواهر' }, image: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=400&h=225&fit=crop', active: true, order: 7, packages: [{ id: 'cc1', amount: '500 Gems', price: 4.99, points: 650 }, { id: 'cc2', amount: '1200 Gems', price: 9.99, points: 1300 }, { id: 'cc3', amount: '2500 Gems', price: 19.99, points: 2600 }, { id: 'cc4', amount: '6500 Gems', price: 49.99, points: 6500, popular: true }] },
    { id: 'fortnite', name: { en: 'Fortnite', ar: 'فورتنايت' }, icon: 'fa-bolt', color: '#00BCD4', currency: { en: 'V-Bucks', ar: 'في-بكس' }, image: 'https://images.unsplash.com/photo-1589241062272-c0a69e70cc2d?w=400&h=225&fit=crop', active: true, order: 8, packages: [{ id: 'fn1', amount: '1000 V-Bucks', price: 7.99, points: 1040 }, { id: 'fn2', amount: '2800 V-Bucks', price: 19.99, points: 2600 }, { id: 'fn3', amount: '5000 V-Bucks', price: 31.99, points: 4160 }, { id: 'fn4', amount: '13500 V-Bucks', price: 79.99, points: 10400, popular: true }] }
];
let GAMES_DATA = [...DEFAULT_GAMES_DATA];
const Utils = {
    esc(s) { if (typeof s !== 'string') return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; },
    debounce(fn, d = 300) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; },
    genId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 8); },
    genRefCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 6; i++) r += c[Math.floor(Math.random() * c.length)]; return r; },
    formatDate(ts) { try { return new Date(ts).toLocaleDateString(I18n.lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } },
    isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); },
    isValidPlayerId(id) { return /^[a-zA-Z0-9_]{4,30}$/.test(id); },
    todayStr() { return new Date().toDateString(); },
    t(obj) { if (!obj) return ''; if (typeof obj === 'string') return obj; return obj[I18n.lang] || obj.en || ''; },
    rateLimit(key, ms) { const last = LS.get('rw_rl_' + key, 0); if (Date.now() - last < ms) return false; LS.set('rw_rl_' + key, Date.now()); return true; }
};
const LS = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    remove(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
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
                this.userPromise = new Promise(resolve => { this.auth.onAuthStateChanged(user => { this.user = user; resolve(user); }); });
            }
        } catch (e) { this.ok = false; }
    },
    async waitForAuth() { if (!this.ok) return null; if (this.user !== null) return this.user; return this.userPromise; }
};
const I18n = {
    lang: 'en',
    init() { this.lang = LS.get(CONFIG.keys.lang) || (navigator.language.startsWith('ar') ? 'ar' : 'en'); this.apply(); },
    toggle() { this.lang = this.lang === 'en' ? 'ar' : 'en'; LS.set(CONFIG.keys.lang, this.lang); this.apply(); Router.renderCurrent(); FooterGames.render(); },
    apply() { const rtl = this.lang === 'ar'; document.documentElement.lang = this.lang; document.documentElement.dir = rtl ? 'rtl' : 'ltr'; const lt = document.querySelector('#lang-switcher .lang-text'); if (lt) lt.textContent = this.lang === 'en' ? 'AR' : 'EN'; }
};
const Theme = {
    current: 'dark',
    init() { this.current = LS.get(CONFIG.keys.theme, 'dark'); this.apply(false); document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggle()); },
    apply(save = true) { document.body.classList.toggle('light-theme', this.current === 'light'); const i = document.querySelector('#theme-toggle i'); if (i) i.className = this.current === 'light' ? 'fas fa-moon' : 'fas fa-sun'; if (save) LS.set(CONFIG.keys.theme, this.current); },
    toggle() { this.current = this.current === 'dark' ? 'light' : 'dark'; this.apply(); }
};
const UI = {
    hideLoader() { const l = document.getElementById('loader'); if (l) { l.classList.add('hidden'); setTimeout(() => l.style.display = 'none', 600); } },
    showToast(msg, type = 'info', dur = 3000) {
        const c = document.getElementById('toast-container'); if (!c) return;
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        const t = document.createElement('div'); t.className = 'toast ' + type;
        t.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + ' toast-icon"></i><span class="toast-message">' + Utils.esc(msg) + '</span>';
        c.appendChild(t); setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, dur);
    },
    openModal(id) { const m = document.getElementById(id); if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; } },
    closeModal(id) { const m = document.getElementById(id); if (m) { m.classList.remove('open'); document.body.style.overflow = ''; } },
    closeAllModals() { document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open')); document.body.style.overflow = ''; }
};
const Effects = {
    enabled: true, raf: null, particles: [],
    init() { this.enabled = LS.get(CONFIG.keys.effects, true) !== false; this.apply(); this.initScroll(); },
    apply() { document.body.classList.toggle('effects-disabled', !this.enabled); if (this.enabled) { this.initCursor(); this.initParticles(); } else { this.stopParticles(); } },
    toggle() { this.enabled = !this.enabled; LS.set(CONFIG.keys.effects, this.enabled); this.apply(); },
    initCursor() {
        const d = document.getElementById('cursor-dot'), r = document.getElementById('cursor-ring');
        if (!d || !r || !matchMedia('(hover: hover)').matches) return;
        document.addEventListener('mousemove', e => { d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px'; r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'; });
        document.addEventListener('mouseover', e => { r.classList.toggle('hover', !!e.target.closest('a, button, input, [role="button"]')); });
    },
    initParticles() {
        this.stopParticles();
        const c = document.getElementById('particles-canvas'); if (!c) return;
        const ctx = c.getContext('2d');
        const resize = () => { c.width = innerWidth; c.height = innerHeight; }; resize();
        addEventListener('resize', Utils.debounce(resize, 200));
        const n = Math.min(40, Math.floor(innerWidth / 35));
        this.particles = Array.from({ length: n }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, s: Math.random() * 2 + 1, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, o: Math.random() * .3 + .1 }));
        const draw = () => {
            if (!this.enabled) return; ctx.clearRect(0, 0, c.width, c.height);
            const rgb = document.body.classList.contains('light-theme') ? '46,123,255' : '91,159,255';
            this.particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0; if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fillStyle = 'rgba(' + rgb + ',' + p.o + ')'; ctx.fill(); });
            this.raf = requestAnimationFrame(draw);
        }; draw();
    },
    stopParticles() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = null; } },
    initScroll() {
        const bar = document.querySelector('.scroll-progress-bar'), btn = document.getElementById('back-to-top');
        addEventListener('scroll', Utils.debounce(() => { if (bar) { const h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%'; } if (btn) btn.classList.toggle('visible', scrollY > 300); }, 10));
        btn?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    },
    reveal() { const obs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }); }, { threshold: 0.08 }); document.querySelectorAll('.reveal:not(.active)').forEach(el => obs.observe(el)); }
};
const UserState = {
    points: 0, orders: [], lastDaily: null, lastSpin: null, spinHistory: [], referralCode: '', referredBy: '', totalEarned: 0, totalSpent: 0, achievements: {}, dailyGiftCount: 0,
    load() {
        const saved = LS.get(CONFIG.keys.user, null);
        if (saved) { Object.assign(this, { points: 0, orders: [], lastDaily: null, lastSpin: null, spinHistory: [], referralCode: '', referredBy: '', totalEarned: 0, totalSpent: 0, achievements: {}, dailyGiftCount: 0 }, saved); }
        if (!this.referralCode) { this.referralCode = Utils.genRefCode(); this.save(); }
        this.updateUI();
    },
    save() { LS.set(CONFIG.keys.user, { points: this.points, orders: this.orders, lastDaily: this.lastDaily, lastSpin: this.lastSpin, spinHistory: this.spinHistory, referralCode: this.referralCode, referredBy: this.referredBy, totalEarned: this.totalEarned, totalSpent: this.totalSpent, achievements: this.achievements, dailyGiftCount: this.dailyGiftCount }); },
    addPoints(amount) { this.points += amount; this.totalEarned += amount; this.save(); this.updateUI(); Achievements.check(); },
    spendPoints(amount) { if (this.points < amount) return false; this.points -= amount; this.totalSpent += amount; this.save(); this.updateUI(); return true; },
    updateUI() { const nav = document.getElementById('nav-points'); const modal = document.getElementById('modal-points-value'); if (nav) nav.textContent = this.points; if (modal) modal.textContent = this.points; }
};
const Auth = {
    mode: 'login',
    renderLogin(c) { UI.openModal('auth-modal'); location.hash = 'home'; },
    init() {
        document.getElementById('auth-login-tab')?.addEventListener('click', () => this.setMode('login'));
        document.getElementById('auth-register-tab')?.addEventListener('click', () => this.setMode('register'));
        document.getElementById('auth-form')?.addEventListener('submit', e => { e.preventDefault(); this.submit(); });
    },
    setMode(m) {
        this.mode = m;
        document.getElementById('auth-login-tab')?.classList.toggle('active', m === 'login');
        document.getElementById('auth-register-tab')?.classList.toggle('active', m === 'register');
        const ng = document.getElementById('auth-name-group'); if (ng) ng.style.display = m === 'register' ? 'block' : 'none';
        const rg = document.getElementById('auth-ref-group'); if (rg) rg.style.display = m === 'register' ? 'block' : 'none';
        const t = document.getElementById('auth-submit-text'); if (t) t.textContent = m === 'register' ? (I18n.lang === 'ar' ? 'إنشاء حساب' : 'Register') : (I18n.lang === 'ar' ? 'دخول' : 'Login');
        const err = document.getElementById('auth-error'); if (err) err.style.display = 'none';
    },
    async submit() {
        const email = document.getElementById('auth-email').value.trim(), pass = document.getElementById('auth-password').value, name = document.getElementById('auth-name')?.value.trim(), refCode = (document.getElementById('auth-ref')?.value || '').trim().toUpperCase();
        const err = document.getElementById('auth-error');
        if (!FB.ok) { err.textContent = 'Firebase not configured'; err.style.display = 'block'; return; }
        if (!Utils.isValidEmail(email)) { err.textContent = I18n.lang === 'ar' ? 'بريد غير صالح' : 'Invalid email'; err.style.display = 'block'; return; }
        try {
            if (this.mode === 'register') {
                const cred = await FB.auth.createUserWithEmailAndPassword(email, pass);
                if (name) await cred.user.updateProfile({ displayName: name });
                await FB.db.collection(CONFIG.col.users).doc(cred.user.uid).set({ email, name: name || 'User', points: 0, createdAt: Date.now(), role: 'user', referralCode: Utils.genRefCode(), referredBy: refCode || '' });
                if (refCode) await ReferralSystem.processReferral(refCode, cred.user.uid, name || 'User');
                UI.closeModal('auth-modal'); UI.showToast(I18n.lang === 'ar' ? 'تم إنشاء الحساب! 🎉' : 'Account created! 🎉', 'success');
            } else {
                await FB.auth.signInWithEmailAndPassword(email, pass);
                UI.closeModal('auth-modal'); UI.showToast(I18n.lang === 'ar' ? 'مرحباً بعودتك! 👋' : 'Welcome back! 👋', 'success');
            }
            Navbar.updateAuthBtn();
        } catch (e) {
            const msg = e.code === 'auth/email-already-in-use' ? 'Email already in use' : e.code === 'auth/user-not-found' ? 'User not found' : e.code === 'auth/wrong-password' ? 'Wrong password' : 'Invalid email or password';
            err.textContent = msg; err.style.display = 'block';
        }
    }
};
const GamesManager = {
    loaded: false,
    async load() { if (!FB.ok) { this.loaded = true; return; } try { const snap = await FB.db.collection(CONFIG.col.games).orderBy('order').get(); if (!snap.empty) { GAMES_DATA = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(g => g.active !== false); } } catch (e) {} this.loaded = true; },
    getGame(id) { return GAMES_DATA.find(g => g.id === id); },
    async saveGame(game) { if (!FB.ok) return false; try { await FB.db.collection(CONFIG.col.games).doc(game.id).set(game, { merge: true }); const idx = GAMES_DATA.findIndex(g => g.id === game.id); if (idx >= 0) GAMES_DATA[idx] = game; else GAMES_DATA.push(game); return true; } catch (e) { return false; } },
    async deleteGame(id) { if (!FB.ok) return false; try { await FB.db.collection(CONFIG.col.games).doc(id).delete(); GAMES_DATA = GAMES_DATA.filter(g => g.id !== id); return true; } catch (e) { return false; } }
};
const Announcements = {
    items: [],
    async load() { if (!FB.ok) return; try { const snap = await FB.db.collection(CONFIG.col.announcements).where('active', '==', true).orderBy('createdAt', 'desc').limit(10).get(); const now = Date.now(); this.items = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(a => !a.expiresAt || a.expiresAt > now); } catch (e) {} },
    getLatest(count = 3) { return this.items.slice(0, count); }
};
const SpinWheel = {
    canSpin() { if (!UserState.lastSpin) return true; return (Date.now() - UserState.lastSpin) >= CONFIG.points.spinCooldown; },
    spin() {
        if (!this.canSpin()) { UI.showToast(I18n.lang === 'ar' ? 'انتظر 24 ساعة!' : 'Wait 24 hours!', 'warning'); return null; }
        const idx = Math.floor(Math.random() * SPIN_PRIZES.length), prize = SPIN_PRIZES[idx];
        UserState.addPoints(prize); UserState.lastSpin = Date.now();
        UserState.spinHistory.unshift({ prize, date: Date.now() });
        if (UserState.spinHistory.length > 30) UserState.spinHistory = UserState.spinHistory.slice(0, 30);
        UserState.save();
        if (FB.ok && FB.user) { FB.db.collection(CONFIG.col.users).doc(FB.user.uid).update({ points: UserState.points, lastSpin: UserState.lastSpin }).catch(() => {}); }
        Achievements.check(); return { prize, idx };
    }
};
const ReferralSystem = {
    async processReferral(code, newUserId, newName) {
        if (!FB.ok || !code) return;
        try { const q = await FB.db.collection(CONFIG.col.users).where('referralCode', '==', code).limit(1).get(); if (q.empty) return; const referrerDoc = q.docs[0]; await FB.db.collection(CONFIG.col.referrals).add({ referrerId: referrerDoc.id, referredId: newUserId, referredName: newName, bonus: CONFIG.points.referralBonus, createdAt: Date.now() }); const rd = referrerDoc.data(); await FB.db.collection(CONFIG.col.users).doc(referrerDoc.id).update({ points: (rd.points || 0) + CONFIG.points.referralBonus }); } catch (e) {}
    },
    async getReferralCount(code) { if (!FB.ok) return 0; try { const q = await FB.db.collection(CONFIG.col.users).where('referredBy', '==', code).get(); return q.size; } catch (e) { return 0; } }
};
const Achievements = {
    defs: DEFAULT_ACHIEVEMENTS,
    check() {
        const a = UserState.achievements;
        [{ id: 'first_order', val: UserState.orders.length, max: 1 }, { id: 'orders_10', val: UserState.orders.length, max: 10 }, { id: 'points_1000', val: UserState.totalEarned, max: 1000 }, { id: 'points_5000', val: UserState.totalEarned, max: 5000 }, { id: 'spin_7', val: UserState.spinHistory.length, max: 7 }, { id: 'daily_7', val: UserState.dailyGiftCount, max: 7 }]
        .forEach(c => { if (!a[c.id]) a[c.id] = { progress: 0, unlocked: false }; a[c.id].progress = Math.min(c.val, c.max); if (c.val >= c.max && !a[c.id].unlocked) { a[c.id].unlocked = true; a[c.id].unlockedAt = Date.now(); const def = this.defs.find(d => d.id === c.id); if (def) UserState.addPoints(def.reward); } });
        UserState.save();
    },
    getProgress(id) { return UserState.achievements[id] || { progress: 0, unlocked: false }; }
};
const Tickets = {
    async submit(subject, message) { if (!FB.ok || !FB.user) { UI.showToast(I18n.lang === 'ar' ? 'سجّل الدخول أولاً' : 'Login first', 'warning'); return false; } try { await FB.db.collection(CONFIG.col.tickets).add({ userId: FB.user.uid, userEmail: FB.user.email, userName: FB.user.displayName || 'User', subject, message, status: 'open', replies: [], createdAt: Date.now() }); return true; } catch (e) { return false; } },
    async getMyTickets() { if (!FB.ok || !FB.user) return []; try { const snap = await FB.db.collection(CONFIG.col.tickets).where('userId', '==', FB.user.uid).orderBy('createdAt', 'desc').get(); return snap.docs.map(d => ({ id: d.id, ...d.data() })); } catch (e) { return []; } },
    async getAllTickets() { if (!FB.ok) return []; try { const snap = await FB.db.collection(CONFIG.col.tickets).orderBy('createdAt', 'desc').get(); return snap.docs.map(d => ({ id: d.id, ...d.data() })); } catch (e) { return []; } },
    async reply(ticketId, reply) { if (!FB.ok) return false; try { await FB.db.collection(CONFIG.col.tickets).doc(ticketId).update({ replies: firebase.firestore.FieldValue.arrayUnion({ text: reply, by: 'admin', at: Date.now() }), status: 'responded' }); return true; } catch (e) { return false; } },
    async closeTicket(ticketId) { if (!FB.ok) return false; try { await FB.db.collection(CONFIG.col.tickets).doc(ticketId).update({ status: 'closed' }); return true; } catch (e) { return false; } }
};
const PromoCodes = {
    async redeem(code) { if (!code) return null; code = code.toUpperCase().trim(); if (code === 'ADTOPUP2026') return { amount: 500, source: 'builtin' }; if (!FB.ok) return null; try { const doc = await FB.db.collection(CONFIG.col.coinCodes).doc(code).get(); if (!doc.exists) return null; const data = doc.data(); if (!data.active) return null; if (data.maxUses && data.usedCount >= data.maxUses) return null; await FB.db.collection(CONFIG.col.coinCodes).doc(code).update({ usedCount: (data.usedCount || 0) + 1 }); return { amount: data.amount, source: 'firestore' }; } catch (e) { return null; } }
};
const Pages = {
    home(c) {
        const L = I18n.lang;
        let annHtml = '';
        const latest = Announcements.getLatest(1);
        if (latest.length > 0) { const a = latest[0]; const tc = a.type || 'info'; const ic = { info: 'fa-info-circle', warning: 'fa-exclamation-triangle', update: 'fa-bullhorn' }; annHtml = '<div class="announce-banner ' + tc + '"><i class="fas ' + (ic[tc] || ic.info) + ' announce-banner-icon"></i><div class="announce-banner-text"><strong>' + Utils.esc(Utils.t(a.title)) + '</strong> - ' + Utils.esc(Utils.t(a.content)) + '</div><button class="announce-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button></div>'; }
        c.innerHTML = annHtml + '<section class="hero reveal active"><div class="hero-badge"><i class="fas fa-bolt"></i> <span>' + (L === 'ar' ? 'مجاني 100% - ممول بالإعلانات' : '100% Free - Funded by Ads') + '</span></div><h1 class="hero-title">' + (L === 'ar' ? 'اشحن ألعابك مجاناً' : 'Top Up Games Free') + '</h1><p class="hero-subtitle">' + (L === 'ar' ? 'شاهد الإعلانات، اجمع النقاط، واشحن ألعابك المفضلة. نحن شفافون تماماً!' : 'Watch ads, collect points, and top up your favorite games. We are fully transparent!') + '</p><div class="hero-actions"><a href="#games" class="btn btn-primary"><i class="fas fa-gamepad"></i> ' + (L === 'ar' ? 'اختر لعبتك' : 'Choose Your Game') + '</a><a href="#how" class="btn btn-outline"><i class="fas fa-question-circle"></i> ' + (L === 'ar' ? 'كيف يعمل؟' : 'How It Works?') + '</a></div><div class="hero-stats"><div class="hero-stat"><div class="hero-stat-value">' + GAMES_DATA.length + '+</div><div class="hero-stat-label">' + (L === 'ar' ? 'لعبة' : 'Games') + '</div></div><div class="hero-stat"><div class="hero-stat-value">100%</div><div class="hero-stat-label">' + (L === 'ar' ? 'مجاني' : 'Free') + '</div></div><div class="hero-stat"><div class="hero-stat-value">24h</div><div class="hero-stat-label">' + (L === 'ar' ? 'تسليم' : 'Delivery') + '</div></div></div></section>' +
        '<div class="ad-banner-container" style="margin-bottom:var(--space-2xl);text-align:center;"><a href="' + CONFIG.ads.smartlink + '" target="_blank" rel="noopener sponsored"><img src="' + CONFIG.ads.freecashBanner + '" alt="Offers" style="max-width:728px;width:100%;border-radius:var(--radius-md);"></a></div>' +
        '<section class="reveal"><div class="section-header"><h2 class="section-title"><i class="fas fa-fire"></i> ' + (L === 'ar' ? 'ألعاب شائعة' : 'Popular Games') + '</h2><a href="#games" class="btn btn-sm btn-secondary">' + (L === 'ar' ? 'عرض الكل' : 'View All') + '</a></div><div class="games-grid">' + GAMES_DATA.filter(g => g.active !== false).slice(0, 4).map(g => this.gameCard(g)).join('') + '</div></section>' +
        '<section class="reveal" style="margin-top:var(--space-3xl);"><div class="section-header"><h2 class="section-title"><i class="fas fa-lightbulb"></i> ' + (L === 'ar' ? 'كيف يعمل؟' : 'How It Works?') + '</h2></div><div class="steps-grid"><div class="step-card card"><div class="step-number">1</div><h3 class="step-title">' + (L === 'ar' ? 'شاهد الإعلانات' : 'Watch Ads') + '</h3><p class="step-desc">' + (L === 'ar' ? 'شاهد الإعلانات وأكمل المهام لجمع النقاط' : 'Watch ads and complete tasks to earn points') + '</p></div><div class="step-card card"><div class="step-number">2</div><h3 class="step-title">' + (L === 'ar' ? 'اجمع النقاط' : 'Collect Points') + '</h3><p class="step-desc">' + (L === 'ar' ? 'كل إعلان يمنحك نقاط' : 'Each ad gives you points') + '</p></div><div class="step-card card"><div class="step-number">3</div><h3 class="step-title">' + (L === 'ar' ? 'اطلب الشحن' : 'Request Top-Up') + '</h3><p class="step-desc">' + (L === 'ar' ? 'اختر الباقة وأرسل الطلب' : 'Choose package, submit order') + '</p></div><div class="step-card card"><div class="step-number">4</div><h3 class="step-title">' + (L === 'ar' ? 'استلم الشحن' : 'Receive Top-Up') + '</h3><p class="step-desc">' + (L === 'ar' ? 'يتم الشحن خلال 1-24 ساعة' : 'Manual top-up within 1-24 hours') + '</p></div></div></section>';
        Effects.reveal();
    },
    gameCard(g) {
        const L = I18n.lang, currency = Utils.t(g.currency), minPts = g.packages[0]?.points || 100;
        return '<div class="card game-card reveal" onclick="location.hash=\'game/' + g.id + '\'"><div class="game-card-image"><img src="' + Utils.esc(g.image) + '" alt="' + Utils.esc(Utils.t(g.name)) + '" loading="lazy" onerror="this.src=\'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop\'"><span class="game-card-badge"><i class="fas fa-check-circle"></i> ' + (L === 'ar' ? 'متاح' : 'Available') + '</span></div><div class="game-card-body"><h3 class="game-card-title">' + Utils.esc(Utils.t(g.name)) + '</h3><p class="game-card-desc">' + Utils.esc(currency) + '</p><div class="game-card-footer"><span class="game-card-price"><i class="fas fa-coins"></i> ' + (L === 'ar' ? 'من' : 'From') + ' ' + minPts + '</span><span class="game-card-action">' + (L === 'ar' ? 'شحن ←' : 'Top Up →') + '</span></div></div></div>';
    },
    games(c) { const L = I18n.lang; c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-gamepad"></i> ' + (L === 'ar' ? 'جميع الألعاب' : 'All Games') + '</h1></div><div class="games-grid">' + GAMES_DATA.filter(g => g.active !== false).map(g => this.gameCard(g)).join('') + '</div></section>'; Effects.reveal(); },
    gameDetail(c, gameId) {
        const L = I18n.lang, game = GamesManager.getGame(gameId);
        if (!game) { this.notFound(c); return; }
        const currency = Utils.t(game.currency);
        c.innerHTML = '<section class="reveal active"><div style="margin-bottom:var(--space-xl);"><a href="#games" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> ' + (L === 'ar' ? 'رجوع' : 'Back') + '</a></div><div style="display:flex;align-items:center;gap:var(--space-lg);margin-bottom:var(--space-2xl);flex-wrap:wrap;"><div style="width:70px;height:70px;border-radius:var(--radius-lg);background:' + game.color + '20;color:' + game.color + ';display:flex;align-items:center;justify-content:center;font-size:2rem;"><i class="fas ' + game.icon + '"></i></div><div><h1 style="margin:0;">' + Utils.esc(Utils.t(game.name)) + '</h1><p style="margin:0;color:var(--text-muted);">' + Utils.esc(currency) + '</p></div></div><div class="section-header"><h2 class="section-title"><i class="fas fa-coins"></i> ' + (L === 'ar' ? 'اختر الباقة' : 'Choose Package') + '</h2></div><div class="packages-grid">' + game.packages.map(p => '<div class="card package-card ' + (p.popular ? 'popular' : '') + ' reveal" onclick="TopUp.selectPackage(\'' + game.id + '\', \'' + p.id + '\')"><div class="package-amount">' + Utils.esc(p.amount) + '</div><div class="package-price">$' + p.price.toFixed(2) + '</div><div class="package-points"><i class="fas fa-coins"></i> ' + p.points + ' ' + (L === 'ar' ? 'نقطة' : 'points') + '</div></div>').join('') + '</div><div style="margin-top:var(--space-2xl);padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--glass-border);"><h3 style="font-size:1rem;color:var(--neon-yellow);"><i class="fas fa-info-circle"></i> ' + (L === 'ar' ? 'ملاحظة مهمة' : 'Important Note') + '</h3><p style="font-size:0.85rem;margin:0;">' + (L === 'ar' ? 'النقاط تُخصم فوراً. الشحن يدوي خلال 1-24 ساعة.' : 'Points deducted immediately. Manual top-up within 1-24 hours.') + '</p></div></section>';
        Effects.reveal();
    },
    earn(c) {
        const L = I18n.lang;
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-coins"></i> ' + (L === 'ar' ? 'اكسب النقاط' : 'Earn Points') + '</h1></div><div class="points-balance-card" style="margin-bottom:var(--space-2xl);"><div class="points-balance-icon"><i class="fas fa-coins"></i></div><div><div class="points-balance-value" id="earn-page-points">' + UserState.points + '</div><div class="points-balance-label">' + (L === 'ar' ? 'رصيدك الحالي' : 'Your Current Balance') + '</div></div></div><div class="packages-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr));"><div class="card package-card reveal"><div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon-pink);"><i class="fas fa-gift"></i></div><div class="package-amount">' + (L === 'ar' ? 'هدية يومية' : 'Daily Gift') + '</div><div class="package-points" style="font-size:0.9rem;">+' + CONFIG.points.dailyGift + ' ' + (L === 'ar' ? 'نقطة' : 'points') + '</div><button class="btn btn-sm btn-gold" style="margin-top:var(--space-md);" id="daily-btn">' + (L === 'ar' ? 'استلم' : 'Claim') + '</button></div><div class="card package-card reveal"><div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon);"><i class="fas fa-play-circle"></i></div><div class="package-amount">' + (L === 'ar' ? 'شاهد إعلان' : 'Watch Ad') + '</div><div class="package-points" style="font-size:0.9rem;">+' + CONFIG.points.adWatch + ' ' + (L === 'ar' ? 'نقطة' : 'points') + '</div><button class="btn btn-sm btn-primary" style="margin-top:var(--space-md);" id="ad-btn">' + (L === 'ar' ? 'شاهد' : 'Watch') + '</button></div><div class="card package-card reveal"><div style="font-size:2rem;margin-bottom:var(--space-md);color:var(--neon-purple);"><i class="fas fa-external-link-alt"></i></div><div class="package-amount">' + (L === 'ar' ? 'زر رابط' : 'Visit Link') + '</div><div class="package-points" style="font-size:0.9rem;">+' + CONFIG.points.taskVisit + ' ' + (L === 'ar' ? 'نقطة' : 'points') + '</div><button class="btn btn-sm btn-secondary" style="margin-top:var(--space-md);" id="task-btn">' + (L === 'ar' ? 'زر' : 'Visit') + '</button></div></div><div class="ad-banner-container" style="margin-top:var(--space-2xl);text-align:center;"><a href="' + CONFIG.ads.smartlink + '" target="_blank" rel="noopener sponsored"><img src="' + CONFIG.ads.freecashBanner + '" alt="Offers" style="max-width:728px;width:100%;border-radius:var(--radius-md);"></a></div><div style="margin-top:var(--space-2xl);padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid rgba(255,215,0,.3);"><h3 style="font-size:1rem;color:var(--gold);"><i class="fas fa-key"></i> ' + (L === 'ar' ? 'استخدام كود' : 'Redeem Code') + '</h3><div class="redeem-row" style="margin-top:var(--space-md);"><input type="text" class="form-input" id="redeem-input" placeholder="' + (L === 'ar' ? 'أدخل الكود' : 'Enter code') + '" maxlength="20"><button class="btn btn-gold" id="redeem-page-btn">' + (L === 'ar' ? 'تفعيل' : 'Redeem') + '</button></div></div></section>';
        document.getElementById('daily-btn')?.addEventListener('click', () => TopUp.dailyGift());
        document.getElementById('ad-btn')?.addEventListener('click', () => TopUp.watchAd());
        document.getElementById('task-btn')?.addEventListener('click', () => TopUp.visitTask());
        document.getElementById('redeem-page-btn')?.addEventListener('click', async () => { const input = document.getElementById('redeem-input'); const code = (input?.value || '').trim(); if (!code) return; const result = await PromoCodes.redeem(code); if (result) { UserState.addPoints(result.amount); input.value = ''; UI.showToast('+' + result.amount + ' ' + (L === 'ar' ? 'نقطة! 🎉' : 'points! 🎉'), 'success'); } else { UI.showToast(L === 'ar' ? 'كود غير صالح!' : 'Invalid code!', 'error'); } });
        Effects.reveal();
    },
    spin(c) {
        const L = I18n.lang, canSpin = SpinWheel.canSpin();
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-dharmachakra"></i> ' + (L === 'ar' ? 'عجلة الحظ' : 'Spin Wheel') + '</h1></div><div class="spin-container"><div class="spin-info"><p class="spin-info-text">' + (canSpin ? (L === 'ar' ? 'دوّر الآن واربح نقاط مجانية!' : 'Spin now and win free points!') : (L === 'ar' ? 'انتظر 24 ساعة بين كل دورة' : 'Wait 24 hours between spins')) + '</p></div><div class="spin-wheel-wrapper"><div class="spin-pointer"></div><canvas id="spin-canvas" width="320" height="320" class="spin-wheel-static" style="border-radius:50%;border:6px solid var(--neon);box-shadow:0 0 40px rgba(91,159,255,.3);"></canvas><div class="spin-center"><i class="fas fa-play"></i></div></div><button class="btn btn-primary spin-btn" id="spin-btn" ' + (canSpin ? '' : 'disabled style="opacity:0.5;pointer-events:none;"') + '><i class="fas fa-dharmachakra"></i> ' + (L === 'ar' ? 'دوّر!' : 'SPIN!') + '</button><div class="spin-result" id="spin-result" style="display:none;"></div><div class="spin-history"><div class="spin-history-title">' + (L === 'ar' ? 'سجل الدورات' : 'Spin History') + '</div>' + (UserState.spinHistory.length === 0 ? '<p style="font-size:0.85rem;color:var(--text-muted);">' + (L === 'ar' ? 'لم تدوّر بعد' : 'No spins yet') + '</p>' : UserState.spinHistory.slice(0, 10).map(s => '<div class="spin-history-item"><span class="spin-history-pts">+' + s.prize + '</span><span class="spin-history-date">' + Utils.formatDate(s.date) + '</span></div>').join('')) + '</div></div></section>';
        this.drawSpinWheel();
        document.getElementById('spin-btn')?.addEventListener('click', () => this.doSpin());
        Effects.reveal();
    },
    drawSpinWheel() {
        const canvas = document.getElementById('spin-canvas'); if (!canvas) return;
        const ctx = canvas.getContext('2d'), cx = 160, cy = 160, r = 150, seg = (Math.PI * 2) / SPIN_PRIZES.length;
        ctx.clearRect(0, 0, 320, 320);
        SPIN_PRIZES.forEach((p, i) => { const start = i * seg - Math.PI / 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, start + seg); ctx.closePath(); ctx.fillStyle = SPIN_COLORS[i]; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 2; ctx.stroke(); ctx.save(); ctx.translate(cx, cy); ctx.rotate(start + seg / 2); ctx.fillStyle = '#fff'; ctx.font = 'bold 14px Orbitron, monospace'; ctx.textAlign = 'center'; ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 3; ctx.fillText(p, r * 0.6, 5); ctx.restore(); });
    },
    doSpin() {
        const result = SpinWheel.spin(); if (!result) return;
        const canvas = document.getElementById('spin-canvas'), btn = document.getElementById('spin-btn');
        if (!canvas || !btn) return; btn.disabled = true; btn.style.opacity = '0.5';
        const seg = 360 / SPIN_PRIZES.length, targetAngle = 360 * 5 + (360 - result.idx * seg - seg / 2);
        let current = 0;
        const step = () => { current += (targetAngle - current) * 0.05; canvas.style.transform = 'rotate(' + current + 'deg)'; if (Math.abs(targetAngle - current) > 0.5) requestAnimationFrame(step); else { canvas.style.transform = 'rotate(' + targetAngle + 'deg)'; const L = I18n.lang; const resDiv = document.getElementById('spin-result'); if (resDiv) { resDiv.style.display = 'block'; resDiv.innerHTML = '<div class="spin-result-label">' + (L === 'ar' ? 'ربحت!' : 'You won!') + '</div><div class="spin-result-value">+' + result.prize + '</div><div class="spin-result-label">' + (L === 'ar' ? 'نقطة' : 'points') + '</div>'; } UserState.updateUI(); } };
        requestAnimationFrame(step);
    },
    orders(c) {
        const L = I18n.lang, orders = [...UserState.orders].sort((a, b) => b.createdAt - a.createdAt);
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-clipboard-list"></i> ' + (L === 'ar' ? 'طلباتي' : 'My Orders') + '</h1></div>' + (orders.length === 0 ? '<div style="text-align:center;padding:var(--space-3xl);"><div style="font-size:3rem;color:var(--text-muted);margin-bottom:var(--space-lg);"><i class="fas fa-inbox"></i></div><p>' + (L === 'ar' ? 'لا توجد طلبات بعد' : 'No orders yet') + '</p><a href="#games" class="btn btn-primary">' + (L === 'ar' ? 'ابدأ الشحن' : 'Start Top-Up') + '</a></div>' : '<div class="orders-list">' + orders.map(o => '<div class="order-item"><div class="order-item-info"><div class="order-item-icon" style="color:' + (o.gameColor || 'var(--neon)') + ';"><i class="fas ' + (o.gameIcon || 'fa-gamepad') + '"></i></div><div class="order-item-details"><div class="order-item-game">' + Utils.esc(o.gameName) + ' - ' + Utils.esc(o.packageAmount) + '</div><div class="order-item-date">' + Utils.formatDate(o.createdAt) + ' • ID: ' + Utils.esc(o.playerId) + '</div><div class="order-timeline">' + ['pending', 'approved', 'shipped'].map((s, i) => { const si = ['pending', 'approved', 'shipped'].indexOf(o.status); const done = i < si, active = i === si; return '<div class="order-timeline-step"><div class="order-timeline-dot ' + (done ? 'done' : active ? 'active' : '') + '"><i class="fas fa-' + (i === 0 ? 'clock' : i === 1 ? 'check' : 'truck') + '"></i></div><div class="order-timeline-label">' + (i === 0 ? 'Pending' : i === 1 ? 'Approved' : 'Shipped') + '</div></div>'; }).join('') + '</div></div></div><div style="display:flex;align-items:center;gap:var(--space-md);"><span class="order-item-points"><i class="fas fa-coins"></i> ' + o.points + '</span><span class="order-status ' + o.status + '">' + this.statusLabel(o.status, L) + '</span></div></div>').join('') + '</div>') + '</section>';
        Effects.reveal();
    },
    statusLabel(status, L) { return ({ pending: L === 'ar' ? 'قيد الانتظار' : 'Pending', approved: L === 'ar' ? 'تمت الموافقة' : 'Approved', shipped: L === 'ar' ? 'تم الشحن ✅' : 'Shipped ✅', rejected: L === 'ar' ? 'مرفوض ❌' : 'Rejected ❌' })[status] || status; },
    how(c) {
        const L = I18n.lang;
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-question-circle"></i> ' + (L === 'ar' ? 'كيف يعمل الموقع؟' : 'How It Works?') + '</h1></div><div style="max-width:800px;margin:0 auto;"><div style="padding:var(--space-xl);background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--glass-border);margin-bottom:var(--space-xl);"><h3 style="color:var(--neon);"><i class="fas fa-info-circle"></i> ' + (L === 'ar' ? 'الشفافية الكاملة' : 'Full Transparency') + '</h3><p>' + (L === 'ar' ? 'هذا الموقع ممول 100% من الإعلانات. نعرض إعلانات، نربح منها، ونستخدم جزءاً من الأرباح لشحن ألعابك.' : 'This site is 100% funded by ads. We show ads, earn from them, and use part of the revenue to top up your games.') + '</p></div><div class="steps-grid"><div class="step-card card"><div class="step-number">1</div><h3 class="step-title">' + (L === 'ar' ? 'شاهد الإعلانات' : 'Watch Ads') + '</h3><p class="step-desc">' + (L === 'ar' ? 'كل إعلان يولد ربحاً' : 'Each ad generates revenue') + '</p></div><div class="step-card card"><div class="step-number">2</div><h3 class="step-title">' + (L === 'ar' ? 'اجمع النقاط' : 'Collect Points') + '</h3><p class="step-desc">' + (L === 'ar' ? 'نمنحك نقاطاً مقابل كل إعلان' : 'We give you points for each ad') + '</p></div><div class="step-card card"><div class="step-number">3</div><h3 class="step-title">' + (L === 'ar' ? 'اطلب الشحن' : 'Request Top-Up') + '</h3><p class="step-desc">' + (L === 'ar' ? 'اختر الباقة وأرسل الطلب' : 'Choose package, submit order') + '</p></div><div class="step-card card"><div class="step-number">4</div><h3 class="step-title">' + (L === 'ar' ? 'نشحن لك' : 'We Ship') + '</h3><p class="step-desc">' + (L === 'ar' ? 'نشحن خلال 1-24 ساعة' : 'Top-up within 1-24 hours') + '</p></div></div></div></section>';
        Effects.reveal();
    },
    updates(c) {
        const L = I18n.lang, items = Announcements.items;
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-bullhorn"></i> ' + (L === 'ar' ? 'التحديثات' : 'Updates') + '</h1></div>' + (items.length === 0 ? '<div style="text-align:center;padding:var(--space-3xl);color:var(--text-muted);"><div style="font-size:3rem;margin-bottom:var(--space-lg);opacity:0.3;"><i class="fas fa-bullhorn"></i></div><p>' + (L === 'ar' ? 'لا توجد تحديثات حالياً' : 'No updates yet') + '</p></div>' : items.map(a => '<div class="update-card reveal"><div class="update-card-header"><span class="update-card-type ' + (a.type || 'info') + '"><i class="fas fa-' + (a.type === 'warning' ? 'exclamation-triangle' : a.type === 'update' ? 'bullhorn' : 'info-circle') + '"></i> ' + (a.type || 'info').toUpperCase() + '</span><span class="update-card-date">' + Utils.formatDate(a.createdAt) + '</span></div><div class="update-card-title">' + Utils.esc(Utils.t(a.title)) + '</div><div class="update-card-content">' + Utils.esc(Utils.t(a.content)) + '</div></div>').join('')) + '</section>';
        Effects.reveal();
    },
    referrals(c) {
        const L = I18n.lang, code = UserState.referralCode, link = CONFIG.site.url + '?ref=' + code;
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-users"></i> ' + (L === 'ar' ? 'نظام الإحالة' : 'Referral System') + '</h1></div><div class="referral-card reveal"><div class="referral-title"><i class="fas fa-share-nodes"></i> ' + (L === 'ar' ? 'ادعُ أصدقاءك واربح' : 'Invite Friends & Earn') + '</div><div class="referral-desc">' + (L === 'ar' ? 'شارك الكود مع أصدقائك. كل صديق يسجل يمنحك ' + CONFIG.points.referralBonus + ' نقطة!' : 'Share your code. Each friend who signs up earns you ' + CONFIG.points.referralBonus + ' points!') + '</div><div class="referral-code-box"><div class="referral-code">' + Utils.esc(code) + '</div><button class="referral-copy-btn" onclick="navigator.clipboard.writeText(\'' + Utils.esc(code) + '\');UI.showToast(\'' + (L === 'ar' ? 'تم النسخ!' : 'Copied!') + '\',\'success\');"><i class="fas fa-copy"></i></button></div><div class="referral-link-box"><input type="text" class="form-input" value="' + Utils.esc(link) + '" readonly><button class="btn btn-sm btn-primary" onclick="navigator.clipboard.writeText(\'' + Utils.esc(link) + '\');UI.showToast(\'' + (L === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!') + '\',\'success\');"><i class="fas fa-link"></i></button></div><div class="referral-stats" id="referral-stats"></div></div></section>';
        ReferralSystem.getReferralCount(code).then(count => { const el = document.getElementById('referral-stats'); if (el) el.innerHTML = '<div class="referral-stat"><div class="referral-stat-value">' + count + '</div><div class="referral-stat-label">' + (L === 'ar' ? 'إحالات' : 'Referrals') + '</div></div><div class="referral-stat"><div class="referral-stat-value">' + (count * CONFIG.points.referralBonus) + '</div><div class="referral-stat-label">' + (L === 'ar' ? 'نقاط مكتسبة' : 'Points Earned') + '</div></div>'; });
        Effects.reveal();
    },
    achievements(c) {
        const L = I18n.lang;
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-trophy"></i> ' + (L === 'ar' ? 'الإنجازات' : 'Achievements') + '</h1></div><div class="achievements-grid">' + DEFAULT_ACHIEVEMENTS.map(a => { const prog = Achievements.getProgress(a.id), pct = Math.min(100, (prog.progress / a.max) * 100); return '<div class="achievement-card ' + (prog.unlocked ? 'unlocked' : 'locked') + ' reveal"><div class="achievement-icon"><i class="fas ' + a.icon + '"></i></div><div class="achievement-name">' + Utils.esc(Utils.t(a.name)) + '</div><div class="achievement-desc">' + Utils.esc(Utils.t(a.desc)) + '</div><div class="achievement-reward"><i class="fas fa-coins"></i> +' + a.reward + '</div><div class="achievement-progress"><div class="achievement-progress-bar" style="width:' + pct + '%;"></div></div></div>'; }).join('') + '</div></section>';
        Effects.reveal();
    },
    support(c) {
        const L = I18n.lang;
        c.innerHTML = '<section class="reveal active"><div class="section-header"><h1 class="section-title"><i class="fas fa-headset"></i> ' + (L === 'ar' ? 'الدعم الفني' : 'Support') + '</h1></div><div style="display:flex;gap:var(--space-md);margin-bottom:var(--space-2xl);flex-wrap:wrap;"><a href="https://t.me/rewords" target="_blank" class="btn btn-primary"><i class="fab fa-telegram"></i> ' + (L === 'ar' ? 'تيليجرام' : 'Telegram') + '</a><a href="https://discord.gg/rewords" target="_blank" class="btn btn-secondary"><i class="fab fa-discord"></i> ' + (L === 'ar' ? 'ديسكورد' : 'Discord') + '</a><button class="btn btn-outline" id="open-ticket-btn"><i class="fas fa-ticket"></i> ' + (L === 'ar' ? 'فتح تذكرة' : 'Open Ticket') + '</button></div><div id="my-tickets-area"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i></div></div></section>';
        document.getElementById('open-ticket-btn')?.addEventListener('click', () => { if (!FB.user) { UI.showToast(L === 'ar' ? 'سجّل الدخول أولاً' : 'Login first', 'warning'); return; } UI.openModal('ticket-modal'); });
        document.getElementById('ticket-form')?.addEventListener('submit', async (e) => { e.preventDefault(); const sub = document.getElementById('ticket-subject').value.trim(), msg = document.getElementById('ticket-message').value.trim(); if (!sub || !msg) return; const ok = await Tickets.submit(sub, msg); if (ok) { UI.closeModal('ticket-modal'); UI.showToast(L === 'ar' ? 'تم إرسال التذكرة!' : 'Ticket submitted!', 'success'); document.getElementById('ticket-subject').value = ''; document.getElementById('ticket-message').value = ''; this.loadMyTickets(); } else { UI.showToast(L === 'ar' ? 'فشل' : 'Failed', 'error'); } });
        this.loadMyTickets(); Effects.reveal();
    },
    async loadMyTickets() { const L = I18n.lang, area = document.getElementById('my-tickets-area'); if (!area) return; const tickets = await Tickets.getMyTickets(); if (tickets.length === 0) { area.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:var(--space-xl);">' + (L === 'ar' ? 'لا توجد تذاكر' : 'No tickets yet') + '</p>'; return; } area.innerHTML = '<div class="tickets-list">' + tickets.map(t => '<div class="ticket-item"><div class="ticket-item-header"><span class="ticket-item-subject">' + Utils.esc(t.subject) + '</span><span class="ticket-status ' + t.status + '">' + t.status + '</span></div><div class="ticket-item-preview">' + Utils.esc(t.message) + '</div>' + (t.replies?.length > 0 ? t.replies.map(r => '<div class="ticket-reply"><div class="ticket-reply-label">' + (r.by === 'admin' ? 'Admin' : 'You') + '</div><div class="ticket-reply-text">' + Utils.esc(r.text) + '</div></div>').join('') : '') + '</div>').join('') + '</div>'; },
    privacy(c) {
        const L = I18n.lang;
        const ar = L === 'ar';
        c.innerHTML = '<section class="reveal active" style="max-width:800px;margin:0 auto;"><h1 style="margin-bottom:var(--space-xl);">' + (ar ? 'سياسة الخصوصية' : 'Privacy Policy') + '</h1><div style="line-height:1.9;font-size:0.95rem;color:var(--text-secondary);">' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">1. ' + (ar ? 'المعلومات التي نجمعها' : 'Information We Collect') + '</h3><p>' + (ar ? 'نجمع البريد الإلكتروني واسم المستخدم عند التسجيل فقط. لا نجمع معلومات الدفع.' : 'We collect your email and username when you register. We do not collect payment information.') + '</p>' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">2. ' + (ar ? 'كيف نستخدم المعلومات' : 'How We Use Information') + '</h3><p>' + (ar ? 'نستخدم بياناتك لإدارة حسابك وتتبع الطلبات فقط. لا نبيع معلوماتك لأي طرف.' : 'We use your data only to manage your account and track orders. We do not sell your data.') + '</p>' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">3. ' + (ar ? 'الإعلانات' : 'Advertising') + '</h3><p>' + (ar ? 'نستخدم خدمات إعلانية من Adsterra و Monetag. قد تستخدم ملفات تعريف ارتباط لتخصيص الإعلانات.' : 'We use advertising services from Adsterra and Monetag. They may use cookies to customize ads.') + '</p>' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">4. ' + (ar ? 'حقوقك (GDPR)' : 'Your Rights (GDPR)') + '</h3><p>' + (ar ? 'لديك الحق في الوصول لبياناتك وحذف حسابك. للتواصل: support@rewords.com' : 'You have the right to access and delete your data. Contact: support@rewords.com') + '</p>' +
        '<p style="margin-top:var(--space-xl);font-size:0.85rem;color:var(--text-muted);">' + (ar ? 'آخر تحديث: أغسطس 2026' : 'Last updated: August 2026') + '</p></div></section>';
        Effects.reveal();
    },
    terms(c) {
        const L = I18n.lang, ar = L === 'ar';
        c.innerHTML = '<section class="reveal active" style="max-width:800px;margin:0 auto;"><h1 style="margin-bottom:var(--space-xl);">' + (ar ? 'شروط الخدمة' : 'Terms of Service') + '</h1><div style="line-height:1.9;font-size:0.95rem;color:var(--text-secondary);">' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">1. ' + (ar ? 'القبول' : 'Acceptance') + '</h3><p>' + (ar ? 'باستخدامك للموقع، أنت توافق على هذه الشروط.' : 'By using this site, you agree to these terms.') + '</p>' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">2. ' + (ar ? 'الخدمة' : 'Service') + '</h3><p>' + (ar ? 'ReWords يتيح كسب نقاط مقابل مشاهدة الإعلانات واستخدامها لشحن ألعاب. الشحن يدوي خلال 1-24 ساعة.' : 'ReWords lets you earn points by watching ads to top up games. Top-ups are manual within 1-24 hours.') + '</p>' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">3. ' + (ar ? 'الحسابات' : 'Accounts') + '</h3><p>' + (ar ? 'حساب واحد لكل مستخدم. يُحظر إنشاء حسابات متعددة.' : 'One account per user. Creating multiple accounts is prohibited.') + '</p>' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">4. ' + (ar ? 'السلوك المحظور' : 'Prohibited Behavior') + '</h3><p>' + (ar ? 'يُحظر استخدام برامج الأتمتة والتلاعب بالنظام.' : 'Using automation and manipulating the system is prohibited.') + '</p>' +
        '<h3 style="color:var(--neon);margin:var(--space-xl) 0 var(--space-md);">5. ' + (ar ? 'الإعلانات' : 'Ads') + '</h3><p>' + (ar ? 'مشاهدة الإعلانات جزء أساسي من الخدمة. يُحظر مانع الإعلانات.' : 'Watching ads is core to the service. Ad blockers are prohibited.') + '</p>' +
        '<p style="margin-top:var(--space-xl);font-size:0.85rem;color:var(--text-muted);">' + (ar ? 'آخر تحديث: أغسطس 2026' : 'Last updated: August 2026') + '</p></div></section>';
        Effects.reveal();
    },
    notFound(c) { c.innerHTML = '<section style="text-align:center;padding:var(--space-3xl);"><h1 style="font-family:var(--font-mono);font-size:4rem;color:var(--neon);">404</h1><p>Page not found</p><a href="#home" class="btn btn-primary">Go Home</a></section>'; }
};
const TopUp = {
    selectedGame: null, selectedPackage: null,
    selectPackage(gameId, packageId) {
        const game = GamesManager.getGame(gameId); if (!game) return;
        const pkg = game.packages.find(p => p.id === packageId); if (!pkg) return;
        if (UserState.points < pkg.points) {
            UI.showToast(I18n.lang === 'ar' ? 'ØªØ­ØªØ§Ø¬ ' + (pkg.points - UserState.points) + ' Ù†Ù‚Ø·Ø© Ø¥Ø¶Ø§ÙÙŠØ©!' : 'You need ' + (pkg.points - UserState.points) + ' more points!', 'warning');
            location.hash = 'earn'; return;
        }
        this.selectedGame = game; this.selectedPackage = pkg;
        const L = I18n.lang, currency = Utils.t(game.currency);
        document.getElementById('order-summary').innerHTML =
            '<div class="order-summary-item"><span class="order-summary-label">' + (L === 'ar' ? 'Ø§Ù„Ù„Ø¹Ø¨Ø©' : 'Game') + '</span><span class="order-summary-value">' + Utils.esc(Utils.t(game.name)) + '</span></div>' +
            '<div class="order-summary-item"><span class="order-summary-label">' + (L === 'ar' ? 'Ø§Ù„Ø¨Ø§Ù‚Ø©' : 'Package') + '</span><span class="order-summary-value">' + Utils.esc(pkg.amount) + '</span></div>' +
            '<div class="order-summary-item"><span class="order-summary-label">' + (L === 'ar' ? 'Ø§Ù„Ø¹Ù…Ù„Ø©' : 'Currency') + '</span><span class="order-summary-value">' + Utils.esc(currency) + '</span></div>' +
            '<div class="order-summary-item"><span class="order-summary-label">' + (L === 'ar' ? 'Ø§Ù„Ù†Ù‚Ø§Ø·' : 'Points') + '</span><span class="order-summary-value" style="color:var(--gold);"><i class="fas fa-coins"></i> ' + pkg.points + '</span></div>';
        UI.openModal('order-modal');
    },
    initOrderForm() {
        document.getElementById('order-form')?.addEventListener('submit', e => { e.preventDefault(); this.submitOrder(); });
    },
    submitOrder() {
        const gameId = document.getElementById('order-game-id').value.trim();
        const extra = document.getElementById('order-extra')?.value?.trim() || '';
        if (!Utils.isValidPlayerId(gameId)) {
            UI.showToast(I18n.lang === 'ar' ? 'Ù…Ø¹Ø±Ù ØºÙŠØ± ØµØ§Ù„Ø­! (4-30 Ø­Ø±Ù)' : 'Invalid Player ID! (4-30 chars)', 'error'); return;
        }
        if (!this.selectedGame || !this.selectedPackage) return;
        if (!Utils.rateLimit('order', 5000)) { UI.showToast(I18n.lang === 'ar' ? 'Ø§Ù†ØªØ¸Ø± Ù‚Ù„ÙŠÙ„Ø§Ù‹' : 'Please wait', 'warning'); return; }
        if (!UserState.spendPoints(this.selectedPackage.points)) {
            UI.showToast(I18n.lang === 'ar' ? 'Ù†Ù‚Ø§Ø· ØºÙŠØ± ÙƒØ§ÙÙŠØ©!' : 'Not enough points!', 'error'); return;
        }
        const order = {
            id: Utils.genId(), gameId: this.selectedGame.id,
            gameName: Utils.t(this.selectedGame.name),
            gameIcon: this.selectedGame.icon, gameColor: this.selectedGame.color,
            packageId: this.selectedPackage.id, packageAmount: this.selectedPackage.amount,
            points: this.selectedPackage.points, playerId: gameId, extra,
            status: 'pending', createdAt: Date.now()
        };
        UserState.orders.push(order); UserState.save();
        if (FB.ok && FB.user) {
            FB.db.collection(CONFIG.col.orders).doc(order.id).set({ ...order, userId: FB.user.uid, userEmail: FB.user.email }).catch(() => {});
            FB.db.collection(CONFIG.col.users).doc(FB.user.uid).update({ points: UserState.points }).catch(() => {});
        }
        Achievements.check(); UI.closeModal('order-modal');
        UI.showToast(I18n.lang === 'ar' ? 'ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨! ðŸŽ‰' : 'Order submitted! ðŸŽ‰', 'success');
        location.hash = 'orders';
    },
    dailyGift() {
        if (!Utils.rateLimit('daily', 1000)) return;
        const today = Utils.todayStr();
        if (UserState.lastDaily === today) {
            UI.showToast(I18n.lang === 'ar' ? 'ØªÙ… Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„ÙŠÙˆÙ…!' : 'Already claimed today!', 'warning'); return;
        }
        UserState.lastDaily = today;
        UserState.dailyGiftCount = (UserState.dailyGiftCount || 0) + 1;
        UserState.addPoints(CONFIG.points.dailyGift);
        UI.showToast('+' + CONFIG.points.dailyGift + ' ' + (I18n.lang === 'ar' ? 'Ù†Ù‚Ø·Ø©! ðŸŽ' : 'points! ðŸŽ'), 'success');
        if (FB.ok && FB.user) {
            FB.db.collection(CONFIG.col.users).doc(FB.user.uid).update({
                points: UserState.points, lastDaily: UserState.lastDaily, dailyGiftCount: UserState.dailyGiftCount
            }).catch(() => {});
        }
        Achievements.check();
    },
    watchAd() {
        if (!Utils.rateLimit('ad', 3000)) return;
        UI.showToast(I18n.lang === 'ar' ? 'Ø¬Ø§Ø±ÙŠ ÙØªØ­ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†...' : 'Opening ad...', 'info');
        window.open(CONFIG.ads.smartlink, '_blank');
        setTimeout(() => {
            UserState.addPoints(CONFIG.points.adWatch);
            UI.showToast('+' + CONFIG.points.adWatch + ' ' + (I18n.lang === 'ar' ? 'Ù†Ù‚Ø·Ø©! ðŸŽ‰' : 'points! ðŸŽ‰'), 'success');
            if (FB.ok && FB.user) {
                FB.db.collection(CONFIG.col.users).doc(FB.user.uid).update({ points: UserState.points }).catch(() => {});
            }
        }, 2000);
    },
    visitTask() {
        if (!Utils.rateLimit('task', 3000)) return;
        UI.showToast(I18n.lang === 'ar' ? 'Ø¬Ø§Ø±ÙŠ ÙØªØ­ Ø§Ù„Ø±Ø§Ø¨Ø·...' : 'Opening link...', 'info');
        window.open(CONFIG.ads.freecash, '_blank');
        setTimeout(() => {
            UserState.addPoints(CONFIG.points.taskVisit);
            UI.showToast('+' + CONFIG.points.taskVisit + ' ' + (I18n.lang === 'ar' ? 'Ù†Ù‚Ø·Ø©! âœ¨' : 'points! âœ¨'), 'success');
            if (FB.ok && FB.user) {
                FB.db.collection(CONFIG.col.users).doc(FB.user.uid).update({ points: UserState.points }).catch(() => {});
            }
        }, 1500);
    }
};
const AdminPanel = {
    isAdmin: false, currentTab: 'dashboard', sessionTimeout: 1800000,
    ordersCache: [], usersCache: [], ticketsCache: [],
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
                const doc = await FB.db.collection(CONFIG.col.users).doc(cred.user.uid).get();
                isAdmin = doc.exists && doc.data().role === 'admin';
            } catch (e) {}
            if (!isAdmin) { await FB.auth.signOut(); return { success: false, error: 'Not authorized' }; }
            localStorage.setItem(CONFIG.keys.adminSession, JSON.stringify({ uid: cred.user.uid, email, time: Date.now() }));
            return { success: true };
        } catch (e) { return { success: false, error: 'Invalid credentials' }; }
    },
    logout() {
        localStorage.removeItem(CONFIG.keys.adminSession);
        if (FB.ok) FB.auth.signOut();
        this.isAdmin = false; location.hash = 'home'; location.reload();
    },
    render(container) {
        this.checkSession() ? this.renderDashboard(container) : this.renderLogin(container);
    },
    renderLogin(container) {
        container.innerHTML = '<div class="admin-screen"><div class="admin-login"><div class="admin-login-card"><div class="admin-login-logo"><i class="fas fa-shield-halved"></i><div class="admin-login-title">ADMIN PANEL</div></div><form id="admin-login-form"><div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="admin-email" required></div><div class="form-group"><label class="form-label">Password</label><input type="password" class="form-input" id="admin-password" required></div><button type="submit" class="btn btn-primary" style="width:100%;">Login</button><div class="auth-error" id="admin-login-error"></div></form><div style="text-align:center;margin-top:var(--space-lg);"><a href="#home" class="btn btn-sm btn-secondary"><i class="fas fa-arrow-left"></i> Back to Site</a></div></div></div></div>';
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
            if (r.success) { this.renderDashboard(container); UI.showToast('Welcome, Admin!', 'success'); }
            else { err.textContent = r.error; err.style.display = 'block'; }
        });
    },
    renderDashboard(container) {
        const tabs = [
            { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
            { id: 'orders', icon: 'fa-shopping-cart', label: 'Orders' },
            { id: 'users', icon: 'fa-users', label: 'Users' },
            { id: 'games', icon: 'fa-gamepad', label: 'Games' },
            { id: 'announcements', icon: 'fa-bullhorn', label: 'Updates' },
            { id: 'tickets', icon: 'fa-headset', label: 'Tickets' },
            { id: 'codes', icon: 'fa-key', label: 'Promo Codes' },
            { id: 'settings', icon: 'fa-cog', label: 'Settings' }
        ];
        container.innerHTML = '<div class="admin-screen"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"><div class="admin-sidebar-header"><i class="fas fa-shield-halved"></i><span class="admin-sidebar-title">ADMIN</span></div>' + tabs.map(t => '<div class="admin-nav-item ' + (t.id === 'dashboard' ? 'active' : '') + '" data-tab="' + t.id + '"><i class="fas ' + t.icon + '"></i> ' + t.label + '<span class="admin-tab-badge" id="badge-' + t.id + '" style="display:none;"></span></div>').join('') + '<div style="margin-top:auto;padding-top:var(--space-lg);border-top:1px solid var(--glass-border);"><div class="admin-nav-item" id="admin-view-site"><i class="fas fa-globe"></i> View Site</div><div class="admin-nav-item" id="admin-logout" style="color:var(--neon-pink);"><i class="fas fa-sign-out-alt"></i> Logout</div></div></aside><div class="admin-content" id="admin-content-area"></div></div></div>';
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
        this.loadBadges();
    },
    async loadBadges() {
        if (!FB.ok) return;
        try {
            const ps = await FB.db.collection(CONFIG.col.orders).where('status', '==', 'pending').get();
            const ts = await FB.db.collection(CONFIG.col.tickets).where('status', '==', 'open').get();
            const pb = document.getElementById('badge-orders');
            if (pb && ps.size > 0) { pb.style.display = 'inline-flex'; pb.textContent = ps.size; }
            const tb = document.getElementById('badge-tickets');
            if (tb && ts.size > 0) { tb.style.display = 'inline-flex'; tb.textContent = ts.size; }
        } catch (e) {}
    },
    renderTab(tab) {
        const area = document.getElementById('admin-content-area');
        if (!area) return;
        switch (tab) {
            case 'dashboard': this.renderDashboardTab(area); break;
            case 'orders': this.renderOrdersTab(area); break;
            case 'users': this.renderUsersTab(area); break;
            case 'games': this.renderGamesTab(area); break;
            case 'announcements': this.renderAnnouncementsTab(area); break;
            case 'tickets': this.renderTicketsTab(area); break;
            case 'codes': this.renderCodesTab(area); break;
            case 'settings': this.renderSettingsTab(area); break;
        }
    },
    async renderDashboardTab(area) {
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-chart-line"></i> Dashboard</h1><span style="color:var(--text-muted);font-size:0.85rem;">' + new Date().toLocaleDateString() + '</span></div><div class="admin-revenue-card"><h3 style="margin-bottom:var(--space-lg);"><i class="fas fa-dollar-sign"></i> Financial Overview</h3><div class="admin-profit-grid"><div class="admin-profit-item"><div class="admin-profit-label">Est. Revenue</div><div class="admin-profit-value green" id="est-revenue">$0.00</div></div><div class="admin-profit-item"><div class="admin-profit-label">Top-Up Costs</div><div class="admin-profit-value pink" id="topup-costs">$0.00</div></div><div class="admin-profit-item"><div class="admin-profit-label">Net Profit</div><div class="admin-profit-value gold" id="net-profit">$0.00</div></div></div></div><div class="admin-stats"><div class="admin-stat"><i class="fas fa-shopping-cart admin-stat-icon"></i><div class="admin-stat-label">Total Orders</div><div class="admin-stat-value" id="stat-total-orders">0</div></div><div class="admin-stat gold"><i class="fas fa-clock admin-stat-icon"></i><div class="admin-stat-label">Pending</div><div class="admin-stat-value" id="stat-pending">0</div></div><div class="admin-stat green"><i class="fas fa-check admin-stat-icon"></i><div class="admin-stat-label">Shipped</div><div class="admin-stat-value" id="stat-shipped">0</div></div><div class="admin-stat pink"><i class="fas fa-users admin-stat-icon"></i><div class="admin-stat-label">Total Users</div><div class="admin-stat-value" id="stat-users">0</div></div></div><div class="admin-card"><div class="admin-card-title"><i class="fas fa-fire"></i> Recent Orders</div><div id="recent-orders-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div></div>';
        await this.loadDashboardData();
    },
    async loadDashboardData() {
        let orders = [], users = [];
        if (FB.ok) {
            try { const s = await FB.db.collection(CONFIG.col.orders).orderBy('createdAt', 'desc').limit(100).get(); orders = s.docs.map(d => ({ id: d.id, ...d.data() })); } catch (e) {}
            try { const s = await FB.db.collection(CONFIG.col.users).get(); users = s.docs.map(d => d.data()); } catch (e) {}
        }
        if (orders.length === 0) orders = UserState.orders;
        const pending = orders.filter(o => o.status === 'pending').length;
        const shipped = orders.filter(o => o.status === 'shipped').length;
        const estRevenue = orders.reduce((s, o) => s + (o.points || 0) * 0.001 * CONFIG.points.profitMargin, 0);
        const costs = shipped * 2;
        const profit = estRevenue - costs;
        document.getElementById('stat-total-orders').textContent = orders.length;
        document.getElementById('stat-pending').textContent = pending;
        document.getElementById('stat-shipped').textContent = shipped;
        document.getElementById('stat-users').textContent = users.length || 'N/A';
        document.getElementById('est-revenue').textContent = '$' + estRevenue.toFixed(2);
        document.getElementById('topup-costs').textContent = '$' + costs.toFixed(2);
        document.getElementById('net-profit').textContent = '$' + profit.toFixed(2);
        const recent = orders.slice(0, 10);
        document.getElementById('recent-orders-list').innerHTML = recent.length === 0
            ? '<div class="admin-empty"><i class="fas fa-inbox"></i> No orders yet</div>'
            : '<table class="admin-table"><thead><tr><th>Game</th><th>Package</th><th>Player ID</th><th>Status</th><th>Date</th></tr></thead><tbody>' + recent.map(o => '<tr><td><i class="fas ' + (o.gameIcon || 'fa-gamepad') + '" style="color:' + (o.gameColor || 'var(--neon)') + '"></i> ' + Utils.esc(o.gameName || '') + '</td><td>' + Utils.esc(o.packageAmount || '') + '</td><td><code>' + Utils.esc(o.playerId || '') + '</code></td><td><span class="order-status ' + (o.status || 'pending') + '">' + (o.status || 'pending') + '</span></td><td>' + Utils.formatDate(o.createdAt || 0) + '</td></tr>').join('') + '</tbody></table>';
    }
};

Object.assign(AdminPanel, {
    renderOrdersTab(area) {
        var self = this;
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-shopping-cart"></i> Orders Management</h1></div><div class="admin-filter-bar"><button class="admin-filter-btn active" data-filter="all">All</button><button class="admin-filter-btn" data-filter="pending">Pending</button><button class="admin-filter-btn" data-filter="approved">Approved</button><button class="admin-filter-btn" data-filter="shipped">Shipped</button><button class="admin-filter-btn" data-filter="rejected">Rejected</button></div><div class="admin-card"><div id="orders-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div></div>';
        var orders = [];
        if (FB.ok) {
            FB.db.collection(CONFIG.col.orders).orderBy('createdAt', 'desc').limit(200).get().then(function(s) {
                orders = s.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
                if (orders.length === 0) orders = UserState.orders;
                self.ordersCache = orders;
                self._renderOrdersList(orders);
                area.querySelectorAll('.admin-filter-btn').forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        area.querySelectorAll('.admin-filter-btn').forEach(function(b) { b.classList.remove('active'); });
                        btn.classList.add('active');
                        var f = btn.dataset.filter;
                        self._renderOrdersList(f === 'all' ? orders : orders.filter(function(o) { return o.status === f; }));
                    });
                });
            }).catch(function() {
                self._renderOrdersList(UserState.orders);
            });
        } else {
            self._renderOrdersList(UserState.orders);
        }
    },
    _renderOrdersList(orders) {
        document.getElementById('orders-list').innerHTML = orders.length === 0
            ? '<div class="admin-empty"><i class="fas fa-inbox"></i> No orders</div>'
            : '<table class="admin-table"><thead><tr><th>ID</th><th>Game</th><th>Package</th><th>Player ID</th><th>Points</th><th>Status</th><th>Actions</th></tr></thead><tbody>' + orders.map(function(o) {
                return '<tr><td><code style="font-size:0.75rem;">' + Utils.esc(o.id || '') + '</code></td><td><i class="fas ' + (o.gameIcon || 'fa-gamepad') + '" style="color:' + (o.gameColor || 'var(--neon)') + '"></i> ' + Utils.esc(o.gameName || '') + '</td><td>' + Utils.esc(o.packageAmount || '') + '</td><td><code>' + Utils.esc(o.playerId || '') + '</code></td><td><i class="fas fa-coins" style="color:var(--gold);"></i> ' + (o.points || 0) + '</td><td><span class="order-status ' + (o.status || 'pending') + '">' + (o.status || 'pending') + '</span></td><td><button class="admin-action-btn approve" onclick="AdminPanel.updateOrder(\'' + o.id + '\',\'approved\')" title="Approve"><i class="fas fa-check"></i></button><button class="admin-action-btn ship" onclick="AdminPanel.updateOrder(\'' + o.id + '\',\'shipped\')" title="Ship"><i class="fas fa-truck"></i></button><button class="admin-action-btn reject" onclick="AdminPanel.updateOrder(\'' + o.id + '\',\'rejected\')" title="Reject"><i class="fas fa-times"></i></button></td></tr>';
            }).join('') + '</tbody></table>';
    },
    updateOrder(orderId, status) {
        if (FB.ok) {
            FB.db.collection(CONFIG.col.orders).doc(orderId).update({ status: status, updatedAt: Date.now() }).then(function() {
                UI.showToast('Order updated', 'success');
                AdminPanel.renderTab('orders');
            }).catch(function() { UI.showToast('Failed', 'error'); });
        }
    },
    renderUsersTab(area) {
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-users"></i> Users</h1></div><div class="admin-card"><div id="users-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div></div>';
        if (FB.ok) {
            FB.db.collection(CONFIG.col.users).get().then(function(s) {
                var users = s.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
                AdminPanel.usersCache = users;
                AdminPanel._renderUsersList(users);
            }).catch(function() { document.getElementById('users-list').innerHTML = '<div class="admin-empty">Failed to load</div>'; });
        } else { document.getElementById('users-list').innerHTML = '<div class="admin-empty">Firestore not available</div>'; }
    },
    _renderUsersList(users) {
        document.getElementById('users-list').innerHTML = users.length === 0
            ? '<div class="admin-empty"><i class="fas fa-users"></i> No users</div>'
            : '<table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Points</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead><tbody>' + users.map(function(u) {
                return '<tr><td>' + Utils.esc(u.name || '-') + '</td><td>' + Utils.esc(u.email || '-') + '</td><td><i class="fas fa-coins" style="color:var(--gold);"></i> ' + (u.points || 0) + '</td><td><span class="order-status ' + (u.role === 'admin' ? 'shipped' : 'approved') + '">' + (u.role || 'user') + '</span></td><td>' + Utils.formatDate(u.createdAt || 0) + '</td><td><button class="admin-action-btn" onclick="AdminPanel.adjustUserPoints(\'' + u.id + '\')" title="Adjust Points"><i class="fas fa-edit"></i></button></td></tr>';
            }).join('') + '</tbody></table>';
    },
    adjustUserPoints(userId) {
        var amount = prompt('Enter points to add (negative to subtract):');
        if (!amount || isNaN(amount)) return;
        var pts = parseInt(amount);
        if (!FB.ok) return;
        FB.db.collection(CONFIG.col.users).doc(userId).get().then(function(doc) {
            if (!doc.exists) return;
            return FB.db.collection(CONFIG.col.users).doc(userId).update({ points: (doc.data().points || 0) + pts });
        }).then(function() { UI.showToast('Points adjusted', 'success'); AdminPanel.renderTab('users'); }).catch(function() { UI.showToast('Failed', 'error'); });
    }
});

Object.assign(AdminPanel, {
    renderGamesTab(area) {
        var self = this;
        var gamesList = GAMES_DATA.map(function(g) {
            return '<div class="admin-game-card"><div class="admin-game-card-header"><div class="admin-game-card-icon" style="background:' + g.color + '20;color:' + g.color + ';"><i class="fas ' + g.icon + '"></i></div><div><div class="admin-game-card-name">' + Utils.esc(Utils.t(g.name)) + '</div><div class="admin-game-card-currency">' + Utils.esc(Utils.t(g.currency)) + ' &bull; ' + g.packages.length + ' packages</div></div></div><div class="admin-game-card-actions"><button class="btn btn-sm btn-secondary" data-action="edit-game" data-game-id="' + g.id + '"><i class="fas fa-edit"></i> Edit</button><button class="btn btn-sm btn-danger" data-action="delete-game" data-game-id="' + g.id + '"><i class="fas fa-trash"></i> Delete</button></div></div>';
        }).join('');
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-gamepad"></i> Games Management</h1><button class="btn btn-sm btn-primary" id="add-game-btn"><i class="fas fa-plus"></i> Add Game</button></div><div class="admin-games-grid">' + gamesList + '</div>';
        document.getElementById('add-game-btn')?.addEventListener('click', function() { self.showGameForm(); });
        area.querySelectorAll('[data-action="edit-game"]').forEach(function(btn) {
            btn.addEventListener('click', function() { self.showGameForm(GAMES_DATA.find(function(g) { return g.id === btn.dataset.gameId; })); });
        });
        area.querySelectorAll('[data-action="delete-game"]').forEach(function(btn) {
            btn.addEventListener('click', function() { self.deleteGame(btn.dataset.gameId); });
        });
    },
    showGameForm(game) {
        var self = this;
        var isEdit = !!game;
        var g = game || { id: '', name: { en: '', ar: '' }, icon: 'fa-gamepad', color: '#5B9FFF', currency: { en: '', ar: '' }, image: '', packages: [] };
        UI.openModal('order-modal');
        document.getElementById('order-summary').innerHTML = '<div class="form-group"><label class="form-label">Game ID</label><input type="text" class="form-input" id="gf-id" value="' + Utils.esc(g.id) + '" ' + (isEdit ? 'readonly' : '') + ' maxlength="20"></div><div class="form-group"><label class="form-label">Name (EN)</label><input type="text" class="form-input" id="gf-name-en" value="' + Utils.esc(Utils.t(g.name)) + '" maxlength="50"></div><div class="form-group"><label class="form-label">Name (AR)</label><input type="text" class="form-input" id="gf-name-ar" value="' + Utils.esc(g.name && g.name.ar ? g.name.ar : '') + '" maxlength="50" dir="rtl"></div><div class="form-group"><label class="form-label">Currency (EN)</label><input type="text" class="form-input" id="gf-curr-en" value="' + Utils.esc(Utils.t(g.currency)) + '" maxlength="20"></div><div class="form-group"><label class="form-label">Icon (FA class)</label><input type="text" class="form-input" id="gf-icon" value="' + Utils.esc(g.icon) + '"></div><div class="form-group"><label class="form-label">Color</label><input type="color" class="form-input" id="gf-color" value="' + (g.color || '#5B9FFF') + '" style="height:40px;padding:4px;"></div><div class="form-group"><label class="form-label">Image URL</label><input type="text" class="form-input" id="gf-image" value="' + Utils.esc(g.image || '') + '"></div><button class="btn btn-primary" id="gf-save" style="width:100%;">' + (isEdit ? 'Update' : 'Add') + ' Game</button>';
        document.getElementById('gf-save')?.addEventListener('click', function() {
            var id = document.getElementById('gf-id').value.trim().toLowerCase();
            var nameEn = document.getElementById('gf-name-en').value.trim();
            if (!id || !nameEn) { UI.showToast('ID and Name required', 'error'); return; }
            var existingGame = GAMES_DATA.find(function(gg) { return gg.id === id; });
            var gameData = {
                id: id, name: { en: nameEn, ar: document.getElementById('gf-name-ar').value.trim() || nameEn },
                icon: document.getElementById('gf-icon').value.trim() || 'fa-gamepad',
                color: document.getElementById('gf-color').value || '#5B9FFF',
                currency: { en: document.getElementById('gf-curr-en').value.trim() || 'Credits' },
                image: document.getElementById('gf-image').value.trim() || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
                active: true, order: existingGame ? existingGame.order : GAMES_DATA.length + 1,
                packages: isEdit ? (existingGame ? existingGame.packages : []) : [{ id: id + '1', amount: '100', price: 0.99, points: 130 }, { id: id + '2', amount: '500', price: 4.99, points: 650, popular: true }]
            };
            GamesManager.saveGame(gameData).then(function(ok) {
                if (ok) { UI.closeModal('order-modal'); UI.showToast('Game saved!', 'success'); self.renderTab('games'); }
                else { UI.showToast('Failed', 'error'); }
            });
        });
    },
    deleteGame(id) {
        var self = this;
        if (!confirm('Delete this game?')) return;
        GamesManager.deleteGame(id).then(function(ok) {
            if (ok) { UI.showToast('Deleted', 'success'); self.renderTab('games'); } else UI.showToast('Failed', 'error');
        });
    },
    renderAnnouncementsTab(area) {
        var self = this;
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-bullhorn"></i> Announcements</h1></div><div class="admin-card"><div class="admin-card-title"><i class="fas fa-plus"></i> Create Update</div><div class="form-group"><label class="form-label">Title (EN)</label><input type="text" class="form-input" id="ann-title-en" maxlength="100"></div><div class="form-group"><label class="form-label">Title (AR)</label><input type="text" class="form-input" id="ann-title-ar" maxlength="100" dir="rtl"></div><div class="form-group"><label class="form-label">Content (EN)</label><textarea class="form-input" id="ann-content-en" rows="3" maxlength="500"></textarea></div><div class="form-group"><label class="form-label">Content (AR)</label><textarea class="form-input" id="ann-content-ar" rows="3" maxlength="500" dir="rtl"></textarea></div><div class="admin-form-grid"><div class="form-group"><label class="form-label">Type</label><select class="form-input" id="ann-type"><option value="info">Info</option><option value="update">Update</option><option value="warning">Warning</option></select></div><div class="form-group"><label class="form-label">Expires After (days)</label><input type="number" class="form-input" id="ann-expires" value="7" min="1" max="30"></div></div><button class="btn btn-primary" id="ann-create-btn"><i class="fas fa-paper-plane"></i> Publish</button></div><div class="admin-card"><div class="admin-card-title"><i class="fas fa-list"></i> Published</div><div id="ann-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i></div></div></div>';
        document.getElementById('ann-create-btn')?.addEventListener('click', function() {
            var tEn = document.getElementById('ann-title-en').value.trim();
            var cEn = document.getElementById('ann-content-en').value.trim();
            if (!tEn || !cEn) { UI.showToast('Title and content required', 'error'); return; }
            var days = parseInt(document.getElementById('ann-expires').value) || 7;
            var ann = {
                title: { en: tEn, ar: document.getElementById('ann-title-ar').value.trim() || tEn },
                content: { en: cEn, ar: document.getElementById('ann-content-ar').value.trim() || cEn },
                type: document.getElementById('ann-type').value, active: true,
                createdAt: Date.now(), expiresAt: Date.now() + (days * 86400000)
            };
            if (FB.ok) {
                FB.db.collection(CONFIG.col.announcements).add(ann).then(function() {
                    UI.showToast('Published!', 'success');
                    ['ann-title-en', 'ann-title-ar', 'ann-content-en', 'ann-content-ar'].forEach(function(id) { document.getElementById(id).value = ''; });
                    self._loadAnnouncementsList();
                    Announcements.load();
                }).catch(function() { UI.showToast('Failed', 'error'); });
            }
        });
        self._loadAnnouncementsList();
    },
    _loadAnnouncementsList() {
        var area = document.getElementById('ann-list');
        if (!area) return;
        if (!FB.ok) { area.innerHTML = '<div class="admin-empty">Firestore not available</div>'; return; }
        FB.db.collection(CONFIG.col.announcements).orderBy('createdAt', 'desc').get().then(function(snap) {
            if (snap.empty) { area.innerHTML = '<div class="admin-empty">No announcements</div>'; return; }
            area.innerHTML = snap.docs.map(function(d) {
                var a = Object.assign({ id: d.id }, d.data());
                return '<div class="admin-announce-card"><div class="admin-announce-header"><span class="update-card-type ' + (a.type || 'info') + '">' + (a.type || 'info').toUpperCase() + '</span><span style="font-size:0.75rem;color:var(--text-muted);">' + Utils.formatDate(a.createdAt) + '</span></div><div style="font-weight:600;margin-bottom:var(--space-xs);">' + Utils.esc(Utils.t(a.title)) + '</div><div style="font-size:0.85rem;color:var(--text-secondary);">' + Utils.esc(Utils.t(a.content)) + '</div><button class="btn btn-sm btn-danger" style="margin-top:var(--space-sm);" data-action="delete-ann" data-ann-id="' + a.id + '"><i class="fas fa-trash"></i></button></div>';
            }).join('');
            area.querySelectorAll('[data-action="delete-ann"]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    if (!confirm('Delete?')) return;
                    FB.db.collection(CONFIG.col.announcements).doc(btn.dataset.annId).delete().then(function() {
                        UI.showToast('Deleted', 'success');
                        area._loadAnnouncementsList ? area._loadAnnouncementsList() : AdminPanel._loadAnnouncementsList();
                    });
                });
            });
        }).catch(function() { area.innerHTML = '<div class="admin-empty">Failed</div>'; });
    },
    renderTicketsTab(area) {
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-headset"></i> Support Tickets</h1></div><div class="admin-card"><div id="tickets-list"><div class="admin-empty"><i class="fas fa-spinner fa-spin"></i></div></div></div>';
        Tickets.getAllTickets().then(function(tickets) {
            var list = document.getElementById('tickets-list');
            if (tickets.length === 0) { list.innerHTML = '<div class="admin-empty">No tickets</div>'; return; }
            list.innerHTML = tickets.map(function(t) {
                var repliesHtml = '';
                if (t.replies && t.replies.length > 0) {
                    repliesHtml = t.replies.map(function(r) { return '<div class="ticket-reply"><div class="ticket-reply-label">' + (r.by === 'admin' ? 'Admin' : 'User') + '</div><div class="ticket-reply-text">' + Utils.esc(r.text) + '</div></div>'; }).join('');
                }
                return '<div class="admin-announce-card"><div class="admin-announce-header"><span class="ticket-status ' + t.status + '">' + t.status + '</span><span style="font-size:0.75rem;color:var(--text-muted);">' + Utils.formatDate(t.createdAt) + '</span></div><div style="font-weight:600;">' + Utils.esc(t.subject) + '</div><div style="font-size:0.85rem;color:var(--text-secondary);margin:var(--space-xs) 0;">' + Utils.esc(t.message) + '</div><div style="font-size:0.75rem;color:var(--text-muted);">From: ' + Utils.esc(t.userEmail || '') + '</div>' + repliesHtml + '<div style="display:flex;gap:var(--space-sm);margin-top:var(--space-md);"><input type="text" class="form-input" placeholder="Reply..." id="reply-' + t.id + '" style="flex:1;"><button class="btn btn-sm btn-primary" data-action="reply-ticket" data-ticket-id="' + t.id + '"><i class="fas fa-reply"></i></button><button class="btn btn-sm btn-secondary" data-action="close-ticket" data-ticket-id="' + t.id + '"><i class="fas fa-times"></i></button></div></div>';
            }).join('');
            list.querySelectorAll('[data-action="reply-ticket"]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var input = document.getElementById('reply-' + btn.dataset.ticketId);
                    var text = input ? input.value.trim() : '';
                    if (!text) return;
                    Tickets.reply(btn.dataset.ticketId, text).then(function(ok) {
                        if (ok) { UI.showToast('Reply sent', 'success'); AdminPanel.renderTab('tickets'); }
                    });
                });
            });
            list.querySelectorAll('[data-action="close-ticket"]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    Tickets.closeTicket(btn.dataset.ticketId).then(function(ok) {
                        if (ok) { UI.showToast('Closed', 'success'); AdminPanel.renderTab('tickets'); }
                    });
                });
            });
        });
    },
    renderCodesTab(area) {
        var self = this;
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-key"></i> Promo Codes</h1></div><div class="admin-card"><div class="admin-card-title"><i class="fas fa-plus"></i> Create Code</div><div class="admin-form-grid"><div class="form-group"><label class="form-label">Code (optional)</label><input type="text" class="form-input" id="new-code-text" placeholder="AUTO" maxlength="20"></div><div class="form-group"><label class="form-label">Points</label><input type="number" class="form-input" id="new-code-amount" value="100" min="1"></div><div class="form-group"><label class="form-label">Max Uses (0=unlimited)</label><input type="number" class="form-input" id="new-code-max" value="0" min="0"></div></div><button class="btn btn-primary" id="gen-code-btn"><i class="fas fa-key"></i> Create Code</button></div><div class="admin-card"><div class="admin-card-title"><i class="fas fa-list"></i> Active Codes</div><div id="codes-list"><div class="admin-empty">Built-in: ADTOPUP2026 (+500 pts)</div></div></div>';
        document.getElementById('gen-code-btn')?.addEventListener('click', function() {
            var text = (document.getElementById('new-code-text').value || '').trim().toUpperCase() || 'CODE-' + Utils.genId().toUpperCase();
            var amount = parseInt(document.getElementById('new-code-amount').value) || 100;
            var maxUses = parseInt(document.getElementById('new-code-max').value) || 0;
            if (FB.ok) {
                FB.db.collection(CONFIG.col.coinCodes).doc(text).set({
                    code: text, amount: amount, maxUses: maxUses, active: true, usedCount: 0, createdAt: Date.now()
                }).then(function() {
                    UI.showToast('Code: ' + text, 'success');
                    self._loadCodesList();
                }).catch(function() { UI.showToast('Failed', 'error'); });
            }
        });
        self._loadCodesList();
    },
    _loadCodesList() {
        var area = document.getElementById('codes-list');
        if (!area || !FB.ok) return;
        FB.db.collection(CONFIG.col.coinCodes).orderBy('createdAt', 'desc').get().then(function(snap) {
            if (snap.empty) { area.innerHTML = '<div class="admin-empty">No custom codes</div>'; return; }
            area.innerHTML = '<table class="admin-table"><thead><tr><th>Code</th><th>Points</th><th>Used</th><th>Max</th><th>Status</th></tr></thead><tbody>' + snap.docs.map(function(d) {
                var c = d.data();
                return '<tr><td><code>' + Utils.esc(c.code) + '</code></td><td><i class="fas fa-coins" style="color:var(--gold);"></i> ' + c.amount + '</td><td>' + (c.usedCount || 0) + '</td><td>' + (c.maxUses || '\u221E') + '</td><td><span class="order-status ' + (c.active ? 'shipped' : 'rejected') + '">' + (c.active ? 'Active' : 'Disabled') + '</span></td></tr>';
            }).join('') + '</tbody></table>';
        }).catch(function() {});
    },
    renderSettingsTab(area) {
        area.innerHTML = '<div class="admin-header"><h1 class="admin-title"><i class="fas fa-cog"></i> Settings</h1></div><div class="admin-card"><div class="admin-card-title"><i class="fas fa-coins"></i> Points Settings</div><div class="admin-form-grid"><div class="form-group"><label class="form-label">Daily Gift</label><input type="number" class="form-input" id="set-daily" value="' + CONFIG.points.dailyGift + '"></div><div class="form-group"><label class="form-label">Ad Watch Reward</label><input type="number" class="form-input" id="set-ad" value="' + CONFIG.points.adWatch + '"></div><div class="form-group"><label class="form-label">Visit Task Reward</label><input type="number" class="form-input" id="set-task" value="' + CONFIG.points.taskVisit + '"></div><div class="form-group"><label class="form-label">Referral Bonus</label><input type="number" class="form-input" id="set-ref" value="' + CONFIG.points.referralBonus + '"></div><div class="form-group"><label class="form-label">Profit Margin</label><input type="number" step="0.1" class="form-input" id="set-profit" value="' + CONFIG.points.profitMargin + '"></div></div><button class="btn btn-primary" id="save-settings-btn"><i class="fas fa-save"></i> Save Settings</button></div><div class="admin-card"><div class="admin-card-title"><i class="fas fa-exclamation-triangle" style="color:var(--neon-pink);"></i> Danger Zone</div><p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:var(--space-md);">Reset local data and reload.</p><button class="btn btn-danger" id="reset-btn"><i class="fas fa-trash"></i> Reset Local Data</button></div>';
        document.getElementById('save-settings-btn')?.addEventListener('click', function() {
            CONFIG.points.dailyGift = parseInt(document.getElementById('set-daily').value) || 50;
            CONFIG.points.adWatch = parseInt(document.getElementById('set-ad').value) || 100;
            CONFIG.points.taskVisit = parseInt(document.getElementById('set-task').value) || 75;
            CONFIG.points.referralBonus = parseInt(document.getElementById('set-ref').value) || 100;
            CONFIG.points.profitMargin = parseFloat(document.getElementById('set-profit').value) || 1.5;
            if (FB.ok) {
                FB.db.collection(CONFIG.col.settings).doc('site').set({ points: CONFIG.points }, { merge: true }).then(function() {
                    UI.showToast('Settings saved!', 'success');
                }).catch(function() { UI.showToast('Failed', 'error'); });
            }
        });
        document.getElementById('reset-btn')?.addEventListener('click', function() {
            if (confirm('Reset all local data?')) { localStorage.clear(); location.reload(); }
        });
    }
});

const Router = {
    routes: {}, currentRoute: null,
    register(name, handler) { this.routes[name] = handler; },
    renderCurrent() { this.resolve(); },
    init() {
        var self = this;
        window.addEventListener('hashchange', function() { self.resolve(); });
        self.resolve();
    },
    resolve() {
        var hash = location.hash.slice(1) || 'home';
        var parts = hash.split('/');
        var route = parts[0];
        var param = parts[1] || null;
        this.currentRoute = route;
        var content = document.getElementById('app-container');
        if (!content) return;
        if (this.routes[route]) {
            UI.closeAllModals();
            content.innerHTML = '';
            this.routes[route](content, param);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            Navbar.updateActive(route);
            FooterGames.render();
            document.title = route.charAt(0).toUpperCase() + route.slice(1) + ' | ReWords';
        } else {
            if (this.routes['notFound']) {
                content.innerHTML = '';
                this.routes['notFound'](content);
            }
        }
    }
};
const Navbar = {
    render() {
        this.updateActive(Router.currentRoute || 'home');
        this.updateAuthBtn();
    },
    updateActive(route) {
        document.querySelectorAll('.nav-link').forEach(function(a) {
            var r = a.getAttribute('href');
            a.classList.toggle('active', r === '#' + route);
        });
        document.querySelectorAll('.mobile-nav-link').forEach(function(a) {
            var r = a.getAttribute('href');
            a.classList.toggle('active', r === '#' + route);
        });
        var pts = document.getElementById('nav-points');
        if (pts) pts.textContent = UserState.points;
    },
    updateAuthBtn() {
        var btn = document.getElementById('auth-btn');
        if (btn) {
            var L = I18n.lang;
            if (FB.user) {
                btn.innerHTML = '<i class="fas fa-right-from-bracket"></i>';
                btn.title = L === 'ar' ? 'خروج' : 'Logout';
            } else {
                btn.innerHTML = '<i class="fas fa-user"></i>';
                btn.title = L === 'ar' ? 'دخول' : 'Login';
            }
        }
    },
    updatePoints(pts) {
        var el = document.getElementById('nav-points');
        if (el) el.textContent = pts;
    }
};
const FooterGames = {
    render() {
        var el = document.getElementById('footer-games');
        if (!el) return;
        var games = GAMES_DATA.slice(0, 6);
        el.innerHTML = games.map(function(g) {
            return '<li><a href="#game/' + g.id + '"><i class="fas ' + g.icon + '" style="color:' + g.color + ';"></i> ' + Utils.esc(Utils.t(g.name)) + '</a></li>';
        }).join('');
    }
};

const CookieConsent = {
    KEY: 'cookie_consent',
    init() {
        if (!localStorage.getItem(this.KEY)) {
            var L = I18n.lang;
            var banner = document.createElement('div');
            banner.id = 'cookie-consent';
            banner.className = 'cookie-consent';
            banner.innerHTML = '<div class="cookie-consent-inner"><p>' + (L === 'ar' ? 'Ù†Ø³ØªØ®Ø¯Ù… Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ù„ØªØ­Ø³ÙŠÙ† ØªØ¬Ø±Ø¨ØªÙƒ ÙˆØ§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ù…Ù† Adsterra Ùˆ Monetag.' : 'We use cookies to improve your experience and for advertising from Adsterra and Monetag.') + '</p><div class="cookie-consent-actions"><button class="btn btn-sm btn-primary" id="cookie-accept">' + (L === 'ar' ? 'Ø£ÙˆØ§ÙÙ‚' : 'Accept') + '</button><button class="btn btn-sm btn-secondary" id="cookie-learn-more"><a href="#privacy" style="color:inherit;text-decoration:none;">' + (L === 'ar' ? 'äº†è§£æ›´å¤š' : 'Learn More') + '</a></button></div></div>';
            document.body.appendChild(banner);
            document.getElementById('cookie-accept')?.addEventListener('click', function() {
                localStorage.setItem(CookieConsent.KEY, 'accepted');
                banner.remove();
            });
        }
    }
};
const PointsModal = {
    open() {
        var el = document.getElementById('modal-points-value');
        if (el) el.textContent = UserState.points;
        UI.openModal('points-modal');
    }
};
const App = {
    async init() {
        console.log('ReWords v2.0 initializing...');
        I18n.init();
        Theme.init();
        FB.init();
        var cachedUser = UserState.load();
        if (FB.ok) {
            FB.auth.onAuthStateChanged(async function(user) {
                if (user) {
                    FB.user = user;
                    var doc = await FB.db.collection(CONFIG.col.users).doc(user.uid).get().catch(function() { return null; });
                    if (doc && doc.exists) {
                        var data = doc.data();
                        if (data.points !== undefined) UserState.points = data.points;
                        if (data.lastDaily !== undefined) UserState.lastDaily = data.lastDaily;
                        if (data.lastSpin !== undefined) UserState.lastSpin = data.lastSpin;
                        if (data.spinHistory) UserState.spinHistory = data.spinHistory;
                        if (data.totalEarned !== undefined) UserState.totalEarned = data.totalEarned;
                        if (data.totalSpent !== undefined) UserState.totalSpent = data.totalSpent;
                        if (data.achievements) UserState.achievements = data.achievements;
                        if (data.dailyGiftCount !== undefined) UserState.dailyGiftCount = data.dailyGiftCount;
                        UserState.save();
                        UserState.updateUI();
                    } else {
                        try {
                            await FB.db.collection(CONFIG.col.users).doc(user.uid).set({
                                name: UserState.name || user.email.split('@')[0],
                                email: user.email, points: UserState.points,
                                referralCode: UserState.referralCode,
                                createdAt: Date.now(), role: 'user'
                            });
                        } catch (e) {}
                    }
                    Navbar.updatePoints(UserState.points);
                    Navbar.updateAuthBtn();
                } else {
                    FB.user = null;
                }
            });
        }
        GamesManager.load();
        Announcements.load();
        Router.register('home', function(c) { Pages.home(c); });
        Router.register('games', function(c) { Pages.games(c); });
        Router.register('game', function(c, id) { Pages.gameDetail(c, id); });
        Router.register('earn', function(c) { Pages.earn(c); });
        Router.register('spin', function(c) { Pages.spin(c); });
        Router.register('orders', function(c) { Pages.orders(c); });
        Router.register('how', function(c) { Pages.how(c); });
        Router.register('updates', function(c) { Pages.updates(c); });
        Router.register('referrals', function(c) { Pages.referrals(c); });
        Router.register('achievements', function(c) { Pages.achievements(c); });
        Router.register('support', function(c) { Pages.support(c); });
        Router.register('privacy', function(c) { Pages.privacy(c); });
        Router.register('terms', function(c) { Pages.terms(c); });
        Router.register('admin', function(c) { AdminPanel.render(c); });
        Router.register('login', function(c) {
            Auth.renderLogin(c);
        });
        Router.register('notFound', function(c) { Pages.notFound(c); });
        Navbar.render();
        Auth.init();
        TopUp.initOrderForm();
        this.bindGlobalEvents();
        Router.init();
        UI.hideLoader();
        Effects.reveal();
        console.log('ReWords initialized!');
    },
    bindGlobalEvents() {
        document.getElementById('auth-btn')?.addEventListener('click', function() {
            if (FB.user) { FB.auth.signOut(); UI.showToast(I18n.lang === 'ar' ? 'تم تسجيل الخروج' : 'Logged out', 'info'); Navbar.updateAuthBtn(); }
            else { UI.openModal('auth-modal'); }
        });
        document.getElementById('coins-btn')?.addEventListener('click', function() { PointsModal.open(); });
        document.getElementById('daily-gift-btn')?.addEventListener('click', function() { TopUp.dailyGift(); });
        document.getElementById('ad-watch-btn')?.addEventListener('click', function() { TopUp.watchAd(); });
        document.getElementById('tasks-btn')?.addEventListener('click', function() { TopUp.visitTask(); });
        document.getElementById('redeem-btn')?.addEventListener('click', async function() {
            var input = document.getElementById('redeem-code-input');
            var code = (input?.value || '').trim();
            if (!code) return;
            var result = await PromoCodes.redeem(code);
            if (result) { UserState.addPoints(result.amount); input.value = ''; UI.showToast('+' + result.amount + ' points!', 'success'); }
            else { UI.showToast(I18n.lang === 'ar' ? 'كود غير صالح!' : 'Invalid code!', 'error'); }
        });
        document.getElementById('lang-switcher')?.addEventListener('click', function() { I18n.toggle(); });
        document.getElementById('effects-toggle')?.addEventListener('click', function() { Effects.toggle(); });
        document.getElementById('mobile-menu-btn')?.addEventListener('click', function() {
            var menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.toggle('open');
        });
        document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                var menu = document.getElementById('mobile-menu');
                if (menu) menu.classList.remove('open');
            });
        });
        document.getElementById('cookie-accept')?.addEventListener('click', function() {
            var banner = document.getElementById('cookie-banner');
            if (banner) banner.style.display = 'none';
            localStorage.setItem(CONFIG.keys.cookie, 'accepted');
        });
        if (localStorage.getItem(CONFIG.keys.cookie) === 'accepted') {
            var cb = document.getElementById('cookie-banner');
            if (cb) cb.style.display = 'none';
        } else {
            var cb = document.getElementById('cookie-banner');
            if (cb) cb.style.display = 'block';
        }
    }
};
window.AdminPanel = AdminPanel;
window.TopUp = TopUp;
window.App = App;
document.addEventListener('DOMContentLoaded', function() { App.init(); });
