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
    site: { name: "ReWords", version: "3.0.0", url: "https://rewords.alouanepx.workers.dev" },
    keys: { lang: 'rw_lang', theme: 'rw_theme', effects: 'rw_effects', user: 'rw_user', cookie: 'rw_cookie', adminSession: 'rw_admin_session' },
    earnings: { adWatch: 0.005, dailyGift: 0.01, visitLink: 0.008, spinMin: 0.002, spinMax: 0.02, referralBonus: 0.05 },
    spinCooldown: 86400000,
    ads: {
        smartlink: 'https://www.effectivecpmnetwork.com/k92kfsc3?key=5558f1cfe654ce78931098e005c15fc7',
        freecash: 'https://freecash.com/r/34GRD6',
        freecashBanner: 'https://cdn.phototourl.com/free/2026-08-17-d1178f26-4ff4-4f4d-aad0-8b528e531e10.png',
        slots: [
            { id: 'popunder', name: 'Popunder', type: 'popunder', enabled: true },
            { id: 'social_bar', name: 'Social Bar', type: 'social_bar', enabled: true },
            { id: 'native_banner', name: 'Native Banner', type: 'native', enabled: true },
            { id: 'mid_banner', name: 'Mid Content Banner', type: 'banner', enabled: true },
            { id: 'monetag_multitag', name: 'Monetag Multi-Tag', type: 'multitag', enabled: true }
        ]
    },
    col: { users: 'users', orders: 'orders', coinCodes: 'coin_codes', settings: 'settings', games: 'games', announcements: 'announcements', tickets: 'tickets', referrals: 'referrals' }
};

const DEFAULT_ACHIEVEMENTS = [
    { id: 'first_order', name: { en: 'First Order', ar: '\u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0623\u0648\u0644' }, desc: { en: 'Place your first top-up order', ar: '\u0623\u0631\u0633\u0644 \u0623\u0648\u0644 \u0637\u0644\u0628 \u0634\u062D\u0646' }, icon: 'fa-shopping-cart', reward: 0.05, max: 1 },
    { id: 'orders_10', name: { en: 'Regular', ar: '\u0639\u0627\u062F\u064A' }, desc: { en: 'Place 10 orders', ar: '\u0623\u0631\u0633\u0644 10 \u0637\u0644\u0628\u0627\u062A' }, icon: 'fa-fire', reward: 0.20, max: 10 },
    { id: 'earn_10', name: { en: 'Earner', ar: '\u0645\u0627\u0631\u0628\u062D' }, desc: { en: 'Earn $10 total', ar: '\u0627\u0631\u0628\u062D $10 \u0625\u062C\u0645\u0627\u0644\u064A\u0627\u064B' }, icon: 'fa-coins', reward: 0.50, max: 10 },
    { id: 'spin_7', name: { en: 'Lucky Seven', ar: '\u0633\u0639\u0629 \u0645\u062D\u0638\u0648\u0638\u0629' }, desc: { en: 'Spin 7 times', ar: '\u062F\u0648\u0651\u0631 7 \u0645\u0631\u0627\u062A' }, icon: 'fa-dharmachakra', reward: 0.15, max: 7 },
    { id: 'referral_1', name: { en: 'Influencer', ar: '\u0645\u0624\u062B\u0631' }, desc: { en: 'Refer 1 friend', ar: '\u0627\u062F\u0639\u064F \u0635\u062F\u064A\u0642 \u0648\u0627\u062D\u062F' }, icon: 'fa-users', reward: 0.05, max: 1 },
    { id: 'daily_7', name: { en: 'Dedicated', ar: '\u0645\u062E\u0644\u0635' }, desc: { en: 'Claim daily gift 7 times', ar: '\u0627\u0633\u062A\u0644\u0645 \u0627\u0644\u0647\u062F\u064A\u0629 7 \u0645\u0631\u0627\u062A' }, icon: 'fa-calendar-check', reward: 0.10, max: 7 }
];

const SPIN_PRIZES = [0.002, 0.004, 0.006, 0.008, 0.01, 0.012, 0.015, 0.02];
const SPIN_COLORS = ['#FF6B35', '#5B9FFF', '#FF2E63', '#00FF9D', '#8B5CF6', '#FFE600', '#00BCD4', '#FF9800'];

const DEFAULT_GAMES_DATA = [
    { id: 'freefire', name: { en: 'Free Fire', ar: '\u0641\u0631\u064A \u0641\u0627\u064A\u0631' }, icon: 'fa-fire', color: '#FF6B35', currency: { en: 'Diamonds', ar: '\u062C\u0648\u0627\u0647\u0631' }, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop', active: true, order: 1, packages: [{ id: 'ff1', amount: '108 \uD83D\uDC8E', price: 0.99, points: 0.99 }, { id: 'ff2', amount: '310 \uD83D\uDC8E', price: 2.99, points: 2.99 }, { id: 'ff3', amount: '520 \uD83D\uDC8E', price: 4.99, points: 4.99 }, { id: 'ff4', amount: '1080 \uD83D\uDC8E', price: 9.99, points: 9.99, popular: true }, { id: 'ff5', amount: '2200 \uD83D\uDC8E', price: 19.99, points: 19.99 }, { id: 'ff6', amount: '5600 \uD83D\uDC8E', price: 49.99, points: 49.99 }] },
    { id: 'pubg', name: { en: 'PUBG Mobile', ar: '\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644' }, icon: 'fa-crosshairs', color: '#F2A900', currency: { en: 'UC', ar: '\u064A\u0648 \u0633\u064A' }, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop', active: true, order: 2, packages: [{ id: 'pb1', amount: '60 UC', price: 0.99, points: 0.99 }, { id: 'pb2', amount: '325 UC', price: 4.99, points: 4.99 }, { id: 'pb3', amount: '660 UC', price: 9.99, points: 9.99 }, { id: 'pb4', amount: '1800 UC', price: 24.99, points: 24.99 }, { id: 'pb5', amount: '3850 UC', price: 49.99, points: 49.99, popular: true }] },
    { id: 'ml', name: { en: 'Mobile Legends', ar: '\u0645\u0648\u0628\u0627\u064A\u0644 \u0644\u064A\u062C\u0646\u0630\u0632' }, icon: 'fa-shield-halved', color: '#4A90D9', currency: { en: 'Diamonds', ar: '\u062C\u0648\u0627\u0647\u0631' }, image: 'https://images.unsplash.com/photo-1511515800041-10d8c01d8b21?w=400&h=225&fit=crop', active: true, order: 3, packages: [{ id: 'ml1', amount: '86 \uD83D\uDC8E', price: 1.49, points: 1.49 }, { id: 'ml2', amount: '172 \uD83D\uDC8E', price: 2.99, points: 2.99 }, { id: 'ml3', amount: '257 \uD83D\uDC8E', price: 4.49, points: 4.49 }, { id: 'ml4', amount: '706 \uD83D\uDC8E', price: 11.99, points: 11.99 }, { id: 'ml5', amount: '2195 \uD83D\uDC8E', price: 36.99, points: 36.99, popular: true }] },
    { id: 'roblox', name: { en: 'Roblox', ar: '\u0631\u0648\u0628\u0644\u0648\u0643\u0633' }, icon: 'fa-cubes', color: '#E2231A', currency: { en: 'Robux', ar: '\u0631\u0648\u0628\u0648\u0643\u0633' }, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=225&fit=crop', active: true, order: 4, packages: [{ id: 'rb1', amount: '400 Robux', price: 4.99, points: 4.99 }, { id: 'rb2', amount: '800 Robux', price: 9.99, points: 9.99 }, { id: 'rb3', amount: '1700 Robux', price: 19.99, points: 19.99 }, { id: 'rb4', amount: '4500 Robux', price: 49.99, points: 49.99, popular: true }] },
    { id: 'cod', name: { en: 'COD Mobile', ar: '\u0643\u0648\u062F \u0645\u0648\u0628\u0627\u064A\u0644' }, icon: 'fa-gun', color: '#00E676', currency: { en: 'CP', ar: '\u0633\u064A \u0628\u064A' }, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop', active: true, order: 5, packages: [{ id: 'cd1', amount: '80 CP', price: 0.99, points: 0.99 }, { id: 'cd2', amount: '400 CP', price: 4.99, points: 4.99 }, { id: 'cd3', amount: '880 CP', price: 9.99, points: 9.99 }, { id: 'cd4', amount: '2400 CP', price: 24.99, points: 24.99 }, { id: 'cd5', amount: '5000 CP', price: 49.99, points: 49.99, popular: true }] },
    { id: 'genshin', name: { en: 'Genshin Impact', ar: '\u062C\u064A\u0646\u0634\u0646 \u0625\u0645\u0628\u0627\u0643\u062A' }, icon: 'fa-wand-sparkles', color: '#9B59B6', currency: { en: 'Crystals', ar: '\u0643\u0631\u064A\u0633\u062A\u0627\u0644\u0627\u062A' }, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop', active: true, order: 6, packages: [{ id: 'gs1', amount: '60 Crystals', price: 0.99, points: 0.99 }, { id: 'gs2', amount: '330 Crystals', price: 4.99, points: 4.99 }, { id: 'gs3', amount: '1090 Crystals', price: 14.99, points: 14.99 }, { id: 'gs4', amount: '3280 Crystals', price: 44.99, points: 44.99, popular: true }] },
    { id: 'clash', name: { en: 'Clash of Clans', ar: '\u0643\u0644\u0627\u0634 \u0623\u0648\u0641 \u0643\u0644\u0627\u0646\u0633' }, icon: 'fa-chess-rook', color: '#FF9800', currency: { en: 'Gems', ar: '\u062C\u0648\u0627\u0647\u0631' }, image: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=400&h=225&fit=crop', active: true, order: 7, packages: [{ id: 'cc1', amount: '500 Gems', price: 4.99, points: 4.99 }, { id: 'cc2', amount: '1200 Gems', price: 9.99, points: 9.99 }, { id: 'cc3', amount: '2500 Gems', price: 19.99, points: 19.99 }, { id: 'cc4', amount: '6500 Gems', price: 49.99, points: 49.99, popular: true }] },
    { id: 'fortnite', name: { en: 'Fortnite', ar: '\u0641\u0648\u0631\u062A\u0646\u0627\u064A\u062A' }, icon: 'fa-bolt', color: '#00BCD4', currency: { en: 'V-Bucks', ar: '\u0641\u064A-\u0628\u0643\u0633' }, image: 'https://images.unsplash.com/photo-1589241062272-c0a69e70cc2d?w=400&h=225&fit=crop', active: true, order: 8, packages: [{ id: 'fn1', amount: '1000 V-Bucks', price: 7.99, points: 7.99 }, { id: 'fn2', amount: '2800 V-Bucks', price: 19.99, points: 19.99 }, { id: 'fn3', amount: '5000 V-Bucks', price: 31.99, points: 31.99 }, { id: 'fn4', amount: '13500 V-Bucks', price: 79.99, points: 79.99, popular: true }] }
];

let GAMES_DATA = [...DEFAULT_GAMES_DATA];

const Utils = {
    esc(s) { if (typeof s !== 'string') return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; },
    debounce(fn, d) { d = d || 300; let t; return function() { const a = arguments; const ctx = this; clearTimeout(t); t = setTimeout(function() { fn.apply(ctx, a); }, d); }; },
    genId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 8); },
    genRefCode() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let r = ''; for (let i = 0; i < 6; i++) r += c[Math.floor(Math.random() * c.length)]; return r; },
    formatDate(ts) { try { return new Date(ts).toLocaleDateString(I18n.lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } },
    isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); },
    isValidPlayerId(id) { return /^[a-zA-Z0-9_]{4,30}$/.test(id); },
    todayStr() { return new Date().toDateString(); },
    t(obj) { if (!obj) return ''; if (typeof obj === 'string') return obj; return obj[I18n.lang] || obj.en || ''; },
    rateLimit(key, ms) { const last = LS.get('rw_rl_' + key, 0); if (Date.now() - last < ms) return false; LS.set('rw_rl_' + key, Date.now()); return true; },
    sanitize(str) { return str.replace(/[<>'"&]/g, function(c) { return { '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '&': '&amp;' }[c] || c; }); },
    formatUSD(n) { return '$' + (Number(n) || 0).toFixed(2); }
};

const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : (d === undefined ? null : d); } catch (e) { return d === undefined ? null : d; } },
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
                this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function() {});
                var self = this;
                this.userPromise = new Promise(function(resolve) { self.auth.onAuthStateChanged(function(user) { self.user = user; resolve(user); }); });
            }
        } catch (e) { this.ok = false; }
    },
    waitForAuth: async function() { if (!this.ok) return null; if (this.user !== null) return this.user; return this.userPromise; }
};

const I18n = {
    lang: 'en',
    init() { this.lang = LS.get(CONFIG.keys.lang) || (navigator.language.startsWith('ar') ? 'ar' : 'en'); this.apply(); },
    toggle() { this.lang = this.lang === 'en' ? 'ar' : 'en'; LS.set(CONFIG.keys.lang, this.lang); this.apply(); Router.renderCurrent(); },
    apply() { var rtl = this.lang === 'ar'; document.documentElement.lang = this.lang; document.documentElement.dir = rtl ? 'rtl' : 'ltr'; var lt = document.querySelector('#lang-switcher .lang-text'); if (lt) lt.textContent = this.lang === 'en' ? 'AR' : 'EN'; }
};

const Theme = {
    current: 'dark',
    init() { this.current = LS.get(CONFIG.keys.theme, 'dark'); this.apply(false); },
    apply(save) { document.body.classList.toggle('light-theme', this.current === 'light'); var i = document.querySelector('#theme-toggle i'); if (i) i.className = this.current === 'light' ? 'fas fa-moon' : 'fas fa-sun'; if (save !== false) LS.set(CONFIG.keys.theme, this.current); },
    toggle() { this.current = this.current === 'dark' ? 'light' : 'dark'; this.apply(); }
};

const UI = {
    hideLoader() { var l = document.getElementById('loader'); if (l) { l.classList.add('hidden'); setTimeout(function() { l.style.display = 'none'; }, 600); } },
    showToast: function(msg, type, dur) {
        type = type || 'info'; dur = dur || 3000;
        var c = document.getElementById('toast-container'); if (!c) return;
        var icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        var t = document.createElement('div'); t.className = 'toast ' + type;
        t.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + ' toast-icon"></i><span class="toast-message">' + Utils.esc(msg) + '</span>';
        c.appendChild(t); setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, dur);
    },
    openModal: function(id) { var m = document.getElementById(id); if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; } },
    closeModal: function(id) { var m = document.getElementById(id); if (m) { m.classList.remove('open'); document.body.style.overflow = ''; } },
    closeAllModals: function() { document.querySelectorAll('.modal.open').forEach(function(m) { m.classList.remove('open'); }); document.body.style.overflow = ''; }
};

const Effects = {
    enabled: true, raf: null, particles: [],
    init: function() { this.enabled = LS.get(CONFIG.keys.effects, true) !== false; this.apply(); this.initScroll(); },
    apply: function() { document.body.classList.toggle('effects-disabled', !this.enabled); if (this.enabled) { this.initParticles(); } else { this.stopParticles(); } },
    toggle: function() { this.enabled = !this.enabled; LS.set(CONFIG.keys.effects, this.enabled); this.apply(); },
    initParticles: function() {
        this.stopParticles();
        var c = document.getElementById('particles-canvas'); if (!c) return;
        var ctx = c.getContext('2d');
        var resize = function() { c.width = window.innerWidth; c.height = window.innerHeight; }; resize();
        window.addEventListener('resize', Utils.debounce(resize, 200));
        var n = Math.min(20, Math.floor(window.innerWidth / 50));
        this.particles = [];
        for (var i = 0; i < n; i++) { this.particles.push({ x: Math.random() * c.width, y: Math.random() * c.height, s: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, o: Math.random() * 0.2 + 0.05 }); }
        var self = this;
        var draw = function() {
            if (!self.enabled) return; ctx.clearRect(0, 0, c.width, c.height);
            var rgb = document.body.classList.contains('light-theme') ? '46,123,255' : '91,159,255';
            self.particles.forEach(function(p) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0; if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fillStyle = 'rgba(' + rgb + ',' + p.o + ')'; ctx.fill(); });
            self.raf = requestAnimationFrame(draw);
        }; draw();
    },
    stopParticles: function() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = null; } },
    initScroll: function() {
        var bar = document.querySelector('.scroll-progress-bar'), btn = document.getElementById('back-to-top');
        window.addEventListener('scroll', Utils.debounce(function() { if (bar) { var h = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%'; } if (btn) btn.classList.toggle('visible', window.scrollY > 300); }, 10));
        if (btn) btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    },
    reveal: function() { var obs = new IntersectionObserver(function(es) { es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('active'); }); }, { threshold: 0.08 }); document.querySelectorAll('.reveal:not(.active)').forEach(function(el) { obs.observe(el); }); }
};


// ==================== USER STATE ====================
const UserState = {
    profile: null, balance: 0, earned: 0, spent: 0,
    defaults: function() {
        return {
            displayName: '', email: '', photo: '', role: 'user',
            balance: 0, earned: 0, spent: 0,
            totalSpins: 0, lastSpin: 0,
            dailyGifts: 0, lastGift: 0,
            orders: 0, referrals: 0,
            achievements: {}, playerIds: {},
            createdAt: Date.now(), banned: false, banReason: ''
        };
    },
    load: function() {
        var cached = LS.get(CONFIG.keys.user);
        if (cached && cached.balance !== undefined) {
            this.profile = cached;
            this.balance = cached.balance || 0;
            this.earned = cached.earned || 0;
            this.spent = cached.spent || 0;
        }
        return this.profile;
    },
    merge: function(data) {
        if (!data) return;
        var def = this.defaults();
        for (var k in def) { if (!(k in data)) data[k] = def[k]; }
        this.profile = data;
        this.balance = data.balance || 0;
        this.earned = data.earned || 0;
        this.spent = data.spent || 0;
        LS.set(CONFIG.keys.user, data);
    },
    save: function() {
        if (this.profile) { LS.set(CONFIG.keys.user, this.profile); }
    },
    isLoggedIn: function() { return !!(FB.ok && FB.user) || !!(this.profile && this.profile.email); },
    isAdmin: function() { return this.profile && this.profile.role === 'admin'; },
    addBalance: function(amount, saveToFB) {
        amount = Number(amount) || 0;
        if (amount <= 0) return;
        this.balance = Math.round((this.balance + amount) * 1000) / 1000;
        this.earned = Math.round((this.earned + amount) * 1000) / 1000;
        if (this.profile) {
            this.profile.balance = this.balance;
            this.profile.earned = this.earned;
        }
        this.save();
        if (saveToFB !== false) this.syncFB();
        this.updateUI();
    },
    spendBalance: function(amount) {
        amount = Number(amount) || 0;
        if (amount <= 0 || amount > this.balance) return false;
        this.balance = Math.round((this.balance - amount) * 1000) / 1000;
        this.spent = Math.round((this.spent + amount) * 1000) / 1000;
        if (this.profile) {
            this.profile.balance = this.balance;
            this.profile.spent = this.spent;
        }
        this.save();
        this.syncFB();
        this.updateUI();
        return true;
    },
    syncFB: function() {
        if (!FB.ok || !FB.user || !this.profile) return;
        FB.db.collection(CONFIG.col.users).doc(FB.user.uid).set(this.profile, { merge: true }).catch(function() {});
    },
    updateUI: function() {
        var els = document.querySelectorAll('.points-display .points-value, [data-dynamic-points]');
        var txt = Utils.formatUSD(this.balance);
        els.forEach(function(el) { el.textContent = txt; });
        var pel = document.getElementById('header-points');
        if (pel) pel.textContent = txt;
    },
    canSpin: function() { return Date.now() - (this.profile ? this.profile.lastSpin : 0) >= CONFIG.spinCooldown; },
    canGift: function() {
        if (!this.profile) return false;
        return this.todayStr() !== (this.profile.lastGift ? new Date(this.profile.lastGift).toDateString() : '');
    },
    todayStr: function() { return new Date().toDateString(); }
};


// ==================== AUTH ====================
const Auth = {
    init: function() {
        if (FB.ok && FB.auth) {
            var self = this;
            FB.auth.onAuthStateChanged(function(user) {
                if (user) {
                    FB.user = user;
                    self.loadProfile(user.uid);
                } else {
                    FB.user = null;
                    UserState.profile = null;
                    UserState.balance = 0;
                    LS.remove(CONFIG.keys.user);
                    UserState.updateUI();
                }
            });
        }
        this.updateNav();
    },
    loadProfile: async function(uid) {
        if (!FB.ok || !uid) return;
        try {
            var doc = await FB.db.collection(CONFIG.col.users).doc(uid).get();
            if (doc.exists) {
                UserState.merge(doc.data());
                UserState.updateUI();
                if (UserState.isAdmin()) {
                    var al = document.getElementById('admin-nav-link');
                    if (al) al.style.display = '';
                }
            } else {
                var prof = UserState.defaults();
                prof.displayName = FB.user.displayName || FB.user.email.split('@')[0];
                prof.email = FB.user.email || '';
                prof.photo = FB.user.photoURL || '';
                await FB.db.collection(CONFIG.col.users).doc(uid).set(prof, { merge: true });
                UserState.merge(prof);
                UserState.syncFB();
            }
        } catch (e) { console.error('Profile load error:', e); }
    },
    handleLogin: async function(email, pass) {
        if (!FB.ok) { UI.showToast('Service unavailable', 'error'); return false; }
        if (!Utils.isValidEmail(email)) { UI.showToast('Invalid email', 'error'); return false; }
        if (!pass || pass.length < 6) { UI.showToast('Password too short', 'error'); return false; }
        try {
            await FB.auth.signInWithEmailAndPassword(email, pass);
            UI.closeAllModals();
            UI.showToast('Welcome back!', 'success');
            return true;
        } catch (e) {
            var msg = 'Login failed';
            if (e.code === 'auth/user-not-found') msg = 'No account with this email';
            else if (e.code === 'auth/wrong-password') msg = 'Wrong password';
            else if (e.code === 'auth/invalid-email') msg = 'Invalid email';
            else if (e.code === 'auth/too-many-requests') msg = 'Too many attempts. Try later';
            UI.showToast(msg, 'error');
            return false;
        }
    },
    handleRegister: async function(name, email, pass) {
        if (!FB.ok) { UI.showToast('Service unavailable', 'error'); return false; }
        if (!name || name.length < 2) { UI.showToast('Name too short', 'error'); return false; }
        if (!Utils.isValidEmail(email)) { UI.showToast('Invalid email', 'error'); return false; }
        if (!pass || pass.length < 6) { UI.showToast('Password 6+ chars', 'error'); return false; }
        try {
            var cred = await FB.auth.createUserWithEmailAndPassword(email, pass);
            await cred.user.updateProfile({ displayName: name });
            var prof = UserState.defaults();
            prof.displayName = name;
            prof.email = email;
            prof.balance = 0.05;
            prof.earned = 0.05;
            await FB.db.collection(CONFIG.col.users).doc(cred.user.uid).set(prof, { merge: true });
            UserState.merge(prof);
            UserState.syncFB();
            UI.closeAllModals();
            UI.showToast('Welcome! $0.05 bonus added', 'success');
            return true;
        } catch (e) {
            var msg = 'Registration failed';
            if (e.code === 'auth/email-already-in-use') msg = 'Email already registered';
            else if (e.code === 'auth/weak-password') msg = 'Password too weak';
            UI.showToast(msg, 'error');
            return false;
        }
    },
    handleLogout: async function() {
        if (FB.ok && FB.auth) { try { await FB.auth.signOut(); } catch (e) {} }
        LS.remove(CONFIG.keys.user);
        LS.remove(CONFIG.keys.adminSession);
        UserState.profile = null;
        UserState.balance = 0;
        UserState.updateUI();
        this.updateNav();
        UI.showToast('Logged out', 'info');
        Router.navigate('home');
    },
    renderLogin: function(c) {
        var ac = document.getElementById('app-container'); if (!ac) return;
        ac.innerHTML = '<div class="auth-page"><div class="auth-card glass reveal"><div class="auth-header"><i class="fas fa-user-circle auth-icon"></i><h2>' + Utils.esc(I18n.lang === 'ar' ? '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644' : 'Sign In') + '</h2></div>' +
            '<form id="loginForm" class="auth-form">' +
            '<div class="form-group"><label>' + Utils.esc(I18n.lang === 'ar' ? '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A' : 'Email') + '</label><input type="email" id="loginEmail" class="form-input" placeholder="you@email.com" required autocomplete="email"></div>' +
            '<div class="form-group"><label>' + Utils.esc(I18n.lang === 'ar' ? '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631' : 'Password') + '</label><input type="password" id="loginPass" class="form-input" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" required autocomplete="current-password"></div>' +
            '<button type="submit" class="btn btn-primary btn-full"><i class="fas fa-sign-in-alt"></i> ' + Utils.esc(I18n.lang === 'ar' ? '\u062F\u062E\u0648\u0644' : 'Sign In') + '</button>' +
            '</form><div class="auth-footer"><p>' + Utils.esc(I18n.lang === 'ar' ? '\u0644\u064A\u0633 \u0644\u0643 \u062D\u0633\u0627\u0628\u061F' : "Don't have an account?") + ' <a href="#/register">' + Utils.esc(I18n.lang === 'ar' ? '\u0633\u062C\u0651\u0644 \u0627\u0644\u062A\u0633\u062C\u064A\u0644' : 'Register') + '</a></p></div></div></div>';
        Effects.reveal();
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!Utils.rateLimit('login', 2000)) { UI.showToast('Wait a moment', 'warning'); return; }
            var btn = this.querySelector('button[type=submit]'); btn.disabled = true;
            var ok = await Auth.handleLogin(document.getElementById('loginEmail').value.trim(), document.getElementById('loginPass').value);
            btn.disabled = false;
            if (ok) Router.navigate('home');
        });
    },
    renderRegister: function(c) {
        var ar = I18n.lang === 'ar';
        var ac = document.getElementById('app-container'); if (!ac) return;
        ac.innerHTML = '<div class="auth-page"><div class="auth-card glass reveal"><div class="auth-header"><i class="fas fa-user-plus auth-icon"></i><h2>' + (ar ? '\u062A\u0633\u062C\u064A\u0644 \u062C\u062F\u064A\u062F' : 'Create Account') + '</h2></div>' +
            '<form id="registerForm" class="auth-form">' +
            '<div class="form-group"><label>' + (ar ? '\u0627\u0644\u0627\u0633\u0645' : 'Full Name') + '</label><input type="text" id="regName" class="form-input" placeholder="' + (ar ? '\u0627\u0633\u0645\u0643' : 'Your name') + '" required minlength="2"></div>' +
            '<div class="form-group"><label>' + (ar ? '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A' : 'Email') + '</label><input type="email" id="regEmail" class="form-input" placeholder="you@email.com" required autocomplete="email"></div>' +
            '<div class="form-group"><label>' + (ar ? '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631' : 'Password') + '</label><input type="password" id="regPass" class="form-input" placeholder="6+ chars" required autocomplete="new-password"></div>' +
            '<div class="form-group"><label>' + (ar ? '\u062F\u0639\u0648\u062A\u064A' : 'Referral Code') + '</label><input type="text" id="regRef" class="form-input" placeholder="' + (ar ? '\u0627\u062E\u062A\u064A\u0627\u0631\u064A' : 'Optional') + '" maxlength="6"></div>' +
            '<button type="submit" class="btn btn-primary btn-full"><i class="fas fa-user-plus"></i> ' + (ar ? '\u062A\u0633\u062C\u064A\u0644 \u062C\u062F\u064A\u062F' : 'Register') + '</button>' +
            '</form><div class="auth-footer"><p>' + (ar ? '\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061F' : 'Already have an account?') + ' <a href="#/login">' + (ar ? '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644' : 'Sign In') + '</a></p></div></div></div>';
        Effects.reveal();
        document.getElementById('registerForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!Utils.rateLimit('register', 3000)) { UI.showToast('Wait a moment', 'warning'); return; }
            var btn = this.querySelector('button[type=submit]'); btn.disabled = true;
            var ok = await Auth.handleRegister(
                document.getElementById('regName').value.trim(),
                document.getElementById('regEmail').value.trim(),
                document.getElementById('regPass').value
            );
            btn.disabled = false;
            if (ok) Router.navigate('home');
        });
    },
    updateNav: function() {
        var authBtn = document.getElementById('auth-btn');
        var logoutBtn = document.getElementById('logout-btn');
        var profilePic = document.getElementById('profile-pic');
        var adminLink = document.getElementById('admin-nav-link');
        if (UserState.isLoggedIn()) {
            if (authBtn) authBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = '';
            if (profilePic) { profilePic.style.display = ''; profilePic.src = UserState.profile.photo || ''; }
            if (adminLink) adminLink.style.display = UserState.isAdmin() ? '' : 'none';
        } else {
            if (authBtn) authBtn.style.display = '';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (profilePic) profilePic.style.display = 'none';
            if (adminLink) adminLink.style.display = 'none';
        }
    }
};


// ==================== GAMES MANAGER ====================
const GamesManager = {
    games: [], loaded: false,
    load: async function() {
        if (!FB.ok) { this.games = DEFAULT_GAMES_DATA.filter(function(g) { return g.active; }); this.loaded = true; return; }
        try {
            var snap = await FB.db.collection(CONFIG.col.games).orderBy('order').get();
            if (snap.empty) {
                var batch = FB.db.batch();
                DEFAULT_GAMES_DATA.forEach(function(g) { batch.set(FB.db.collection(CONFIG.col.games).doc(g.id), g); });
                await batch.commit();
                this.games = DEFAULT_GAMES_DATA.filter(function(g) { return g.active; });
            } else {
                this.games = []; var self = this;
                snap.forEach(function(doc) { var g = doc.data(); if (g.active !== false) self.games.push(g); });
                GAMES_DATA = snap.docs.map(function(d) { return d.data(); });
            }
            this.loaded = true;
        } catch (e) { this.games = DEFAULT_GAMES_DATA.filter(function(g) { return g.active; }); this.loaded = true; }
    },
    getAll: function() { return this.games; },
    getById: function(id) { var found = null; this.games.forEach(function(g) { if (g.id === id) found = g; }); return found; },
    getAllRaw: function() { return GAMES_DATA; }
};

// ==================== ANNOUNCEMENTS ====================
const Announcements = {
    list: [],
    load: async function() {
        if (!FB.ok) return;
        try {
            var snap = await FB.db.collection(CONFIG.col.announcements).orderBy('createdAt', 'desc').limit(5).get();
            this.list = []; var self = this;
            snap.forEach(function(doc) { var a = doc.data(); a.id = doc.id; if (a.active !== false) self.list.push(a); });
            this.showBanners();
        } catch (e) {}
    },
    showBanners: function() {
        var bc = document.getElementById('announcement-banners'); if (!bc) return;
        bc.innerHTML = '';
        var active = this.list.filter(function(a) { return a.active !== false; }).slice(0, 3);
        active.forEach(function(a) {
            var b = document.createElement('div');
            b.className = 'announcement-banner ' + (a.type || 'info') + ' glass';
            b.innerHTML = '<div class="announcement-content"><strong>' + Utils.esc(Utils.t(a.title)) + '</strong><span>' + Utils.esc(Utils.t(a.message)) + '</span></div>' +
                '<button class="announcement-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>';
            bc.appendChild(b);
        });
    }
};

// ==================== SPIN WHEEL ====================
const SpinWheel = {
    active: false, result: null,
    spin: async function() {
        if (this.active) return;
        if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
        if (!UserState.canSpin()) { UI.showToast('Come back tomorrow', 'warning'); return; }
        if (!Utils.rateLimit('spin', 5000)) { UI.showToast('Slow down', 'warning'); return; }
        this.active = true;
        var prizes = SPIN_PRIZES;
        var idx = Math.floor(Math.random() * prizes.length);
        var amount = prizes[idx];
        this.result = amount;
        this.animateSpin(idx, function() {
            UserState.addBalance(amount);
            if (UserState.profile) { UserState.profile.totalSpins = (UserState.profile.totalSpins || 0) + 1; UserState.profile.lastSpin = Date.now(); UserState.save(); UserState.syncFB(); }
            Achievements.check('spin');
            UI.showToast('You won ' + Utils.formatUSD(amount) + '!', 'success');
            SpinWheel.active = false;
        });
    },
    animateSpin: function(targetIdx, cb) {
        var overlay = document.getElementById('spin-wheel-overlay');
        var pointer = document.getElementById('spin-pointer');
        var wheel = document.getElementById('spin-wheel');
        if (!overlay || !wheel) { cb(); return; }
        overlay.classList.add('active');
        var seg = 360 / SPIN_COLORS.length;
        var targetAngle = 360 - (targetIdx * seg) - (seg / 2);
        var totalRot = 360 * 8 + targetAngle;
        wheel.style.transition = 'transform 4s cubic-bezier(0.17,0.67,0.12,0.99)';
        wheel.style.transform = 'rotate(' + totalRot + 'deg)';
        setTimeout(function() {
            if (overlay) overlay.classList.remove('active');
            if (wheel) { wheel.style.transition = 'none'; wheel.style.transform = 'rotate(0deg)'; }
            cb();
        }, 4500);
    }
};

// ==================== REFERRAL SYSTEM ====================
const ReferralSystem = {
    getLink: function() {
        if (!UserState.profile || !UserState.profile.refCode) return '';
        return CONFIG.site.url + '?ref=' + UserState.profile.refCode;
    },
    processReferral: async function(code) {
        if (!FB.ok || !FB.user || !code) return;
        try {
            var snap = await FB.db.collection(CONFIG.col.users).where('refCode', '==', code).limit(1).get();
            if (snap.empty) return;
            var refDoc = snap.docs[0];
            if (refDoc.id === FB.user.uid) return;
            if (UserState.profile.referredBy) return;
            UserState.profile.referredBy = refDoc.id;
            UserState.profile.refCode = UserState.genRefCode ? UserState.genRefCode() : Utils.genRefCode();
            UserState.save();
            UserState.syncFB();
            UserState.addBalance(CONFIG.earnings.referralBonus);
            UI.showToast('Referral bonus + ' + Utils.formatUSD(CONFIG.earnings.referralBonus), 'success');
            var refData = refDoc.data();
            var newRef = refData.referrals || 0;
            await FB.db.collection(CONFIG.col.users).doc(refDoc.id).update({ referrals: newRef + 1 });
        } catch (e) { console.error('Referral error:', e); }
    }
};

// ==================== ACHIEVEMENTS ====================
const Achievements = {
    check: function(type) {
        if (!UserState.isLoggedIn() || !UserState.profile) return;
        var p = UserState.profile;
        if (!p.achievements) p.achievements = {};
        DEFAULT_ACHIEVEMENTS.forEach(function(ach) {
            if (p.achievements[ach.id] && p.achievements[ach.id] >= ach.max) return;
            var progress = 0;
            switch (ach.id) {
                case 'first_order': case 'orders_10': progress = p.orders || 0; break;
                case 'earn_10': progress = Math.floor(p.earned || 0); break;
                case 'spin_7': progress = p.totalSpins || 0; break;
                case 'referral_1': progress = p.referrals || 0; break;
                case 'daily_7': progress = p.dailyGifts || 0; break;
            }
            if (progress >= ach.max && !p.achievements[ach.id]) {
                p.achievements[ach.id] = ach.max;
                UserState.addBalance(ach.reward);
                UI.showToast('Achievement: ' + Utils.t(ach.name) + ' + ' + Utils.formatUSD(ach.reward), 'success');
            } else if (!p.achievements[ach.id]) {
                p.achievements[ach.id] = progress;
            }
        });
        UserState.save();
    }
};

// ==================== TICKETS ====================
const Tickets = {
    submit: async function(subject, message) {
        if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
        if (!subject || subject.length < 3) { UI.showToast('Subject too short', 'error'); return; }
        if (!message || message.length < 10) { UI.showToast('Message too short', 'error'); return; }
        if (!Utils.rateLimit('ticket', 30000)) { UI.showToast('Wait before sending again', 'warning'); return; }
        try {
            var ticket = {
                id: Utils.genId(), uid: FB.user ? FB.user.uid : '',
                email: UserState.profile.email, displayName: UserState.profile.displayName,
                subject: Utils.sanitize(subject), message: Utils.sanitize(message),
                status: 'open', replies: [], createdAt: Date.now(), updatedAt: Date.now()
            };
            await FB.db.collection(CONFIG.col.tickets).doc(ticket.id).set(ticket);
            UI.showToast('Ticket submitted', 'success');
            return true;
        } catch (e) { UI.showToast('Error submitting ticket', 'error'); return false; }
    },
    getUserTickets: async function() {
        if (!FB.ok || !FB.user) return [];
        try {
            var snap = await FB.db.collection(CONFIG.col.tickets).where('uid', '==', FB.user.uid).orderBy('createdAt', 'desc').get();
            var tickets = []; snap.forEach(function(doc) { var t = doc.data(); tickets.push(t); });
            return tickets;
        } catch (e) { return []; }
    }
};

// ==================== PROMO CODES ====================
const PromoCodes = {
    validate: async function(code) {
        if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
        if (!code || code.length < 3) return;
        if (!Utils.rateLimit('promo', 5000)) { UI.showToast('Slow down', 'warning'); return; }
        var upper = code.toUpperCase().trim();
        if (upper === 'ADTOPUP2026') {
            if (UserState.profile.promoADTOPUP2026) { UI.showToast('Already redeemed', 'warning'); return; }
            UserState.profile.promoADTOPUP2026 = true;
            UserState.addBalance(0.50);
            UserState.syncFB();
            UI.showToast('+$0.50 promo bonus!', 'success');
            return;
        }
        if (FB.ok) {
            try {
                var doc = await FB.db.collection(CONFIG.col.coinCodes).doc(upper).get();
                if (doc.exists) {
                    var data = doc.data();
                    if (data.redeemed) { UI.showToast('Already used', 'warning'); return; }
                    await FB.db.collection(CONFIG.col.coinCodes).doc(upper).update({ redeemed: true, redeemedBy: FB.user.uid, redeemedAt: Date.now() });
                    UserState.addBalance(data.amount || 0.10);
                    UI.showToast('Code redeemed: +' + Utils.formatUSD(data.amount || 0.10), 'success');
                } else { UI.showToast('Invalid code', 'error'); }
            } catch (e) { UI.showToast('Error checking code', 'error'); }
        }
    }
};


// ==================== PAGES ====================
const Pages = {
    home: function() {
        var ar = I18n.lang === 'ar';
        var games = GamesManager.getAll();
        var gc = document.getElementById('app-container'); if (!gc) return;
        var balance = Utils.formatUSD(UserState.balance);
        var hdr = '<section class="hero-section"><div class="hero-bg"></div><div class="container"><div class="hero-content reveal"><h1 class="hero-title">' + (ar ? '\u0631\u0628\u062D \u0645\u0646 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Earn From Ads') + '</h1>' +
            '<p class="hero-subtitle">' + (ar ? '\u0634\u0627\u0647\u062F \u0623\u0646\u0634\u0637\u0629 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0631\u0635\u064A\u062F \u0641\u0648\u0642\u064A' : 'Watch ads and earn real money') + '</p>' +
            (UserState.isLoggedIn() ? '<div class="hero-balance"><span class="balance-label">' + (ar ? '\u0631\u0635\u064A\u062F\u0643' : 'Your Balance') + '</span><span class="balance-amount">' + balance + '</span></div>' +
                '<div class="hero-actions"><a href="#/earn" class="btn btn-primary btn-lg"><i class="fas fa-coins"></i> ' + (ar ? '\u0627\u0631\u0628\u062D' : 'Earn') + '</a><a href="#/topup" class="btn btn-gold btn-lg"><i class="fas fa-shopping-cart"></i> ' + (ar ? '\u0634\u062D\u0646' : 'Top Up') + '</a></div>' :
                '<div class="hero-actions"><a href="#/register" class="btn btn-primary btn-lg"><i class="fas fa-user-plus"></i> ' + (ar ? '\u0628\u062F\u0623 \u0627\u0644\u0622\u0646' : 'Start Now') + '</a><a href="#/login" class="btn btn-outline btn-lg"><i class="fas fa-sign-in-alt"></i> ' + (ar ? '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644' : 'Sign In') + '</a></div>') +
            '</div></div></section>';

        var feat = '<section class="features-section container"><div class="section-header reveal"><h2>' + (ar ? '\u0644\u0645\u0627\u0630\u0627 \u062A\u062E\u062A\u0627\u0631\u0646\u0627\u061F' : 'Why Choose Us?') + '</h2></div><div class="features-grid">';
        var features = [
            { icon: 'fa-ad', t: ar ? '\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u062D\u0642\u064A\u0642\u064A\u0629' : 'Real Ads', d: ar ? '\u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0645\u0646 \u0645\u0634\u0627\u0631\u064A\u0639\u064A\u0646 \u0645\u0648\u062B\u0648\u0642\u064A\u0646' : 'From verified advertisers' },
            { icon: 'fa-bolt', t: ar ? '\u0633\u0631\u064A\u0639 \u0627\u0644\u0634\u062D\u0646' : 'Instant Delivery', d: ar ? '\u062A\u0635\u0644 \u0631\u0635\u064A\u062F\u0643 \u0641\u0648\u0631\u0627\u064B' : 'Your balance sent immediately' },
            { icon: 'fa-shield-halved', t: ar ? '\u0623\u0645\u0627\u0646 \u0645\u0637\u0645\u0624\u0646' : 'Secure', d: ar ? '\u0646\u0638\u0627\u0645 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0627\u0644\u0645\u0637\u0645\u0624\u0646' : 'Protected payment system' },
            { icon: 'fa-headset', t: ar ? '\u062F\u0639\u0645 24/7' : '24/7 Support', d: ar ? '\u0641\u0631\u064A\u0642 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0645\u062A\u0648\u0627\u0635\u0644\u0629' : 'Always here to help' }
        ];
        features.forEach(function(f) { feat += '<div class="feature-card glass reveal"><div class="feature-icon"><i class="fas ' + f.icon + '"></i></div><h3>' + f.t + '</h3><p>' + f.d + '</p></div>'; });
        feat += '</div></section>';

        var gp = '<section class="container"><div class="section-header reveal"><h2>' + (ar ? '\u0627\u0644\u0623\u0634\u0639\u0629 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629' : 'Available Games') + '</h2><a href="#/games" class="view-all">' + (ar ? '\u0639\u0631\u0636 \u0627\u0644\u0643\u0644' : 'View All') + ' <i class="fas fa-arrow-right"></i></a></div><div class="games-grid reveal">';
        games.slice(0, 4).forEach(function(g) { gp += '<a href="#/order/' + Utils.esc(g.id) + '" class="game-card glass"><div class="game-icon-wrapper" style="--accent:' + Utils.esc(g.color || '#5B9FFF') + '"><i class="fas ' + Utils.esc(g.icon) + '"></i></div><div class="game-info"><h3>' + Utils.esc(Utils.t(g.name)) + '</h3></div></a>'; });
        gp += '</div></section>';

        var ref = '<section class="referral-preview glass container reveal"><div class="ref-icon"><i class="fas fa-users"></i></div><h2>' + (ar ? '\u0627\u062F\u0639\u064F \u0635\u062F\u064A\u0642\u064B\u0627 \u0648\u0627\u0631\u0628\u062D' : 'Refer Friends & Earn') + '</h2><p>' + (ar ? '\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 ' + Utils.formatUSD(CONFIG.earnings.referralBonus) + ' \u0644\u0643\u0644 \u0635\u062F\u064A\u0642 \u064A\u0633\u062C\u0644 \u062A\u0633\u062C\u064A\u0644' : 'Get ' + Utils.formatUSD(CONFIG.earnings.referralBonus) + ' for each friend who signs up') + '</p>' +
            (UserState.isLoggedIn() ? '<a href="#/referral" class="btn btn-gold btn-lg"><i class="fas fa-gift"></i> ' + (ar ? '\u0627\u0644\u0639\u0631\u0648\u0636' : 'Get Link') + '</a>' : '<a href="#/register" class="btn btn-gold btn-lg"><i class="fas fa-user-plus"></i> ' + (ar ? '\u0633\u062C\u0651\u0644 \u0627\u0644\u0622\u0646' : 'Register Now') + '</a>') + '</section>';

        gc.innerHTML = hdr + feat + gp + ref;
        Effects.reveal();
    },

    games: function() {
        var ar = I18n.lang === 'ar';
        var games = GamesManager.getAll();
        var ac = document.getElementById('app-container'); if (!ac) return;
        var h = '<section class="page-header"><div class="container"><h1>' + (ar ? '\u0627\u0644\u0623\u0634\u0639\u0629' : 'Games') + '</h1><p>' + (ar ? '\u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u062A\u0643' : 'Choose your game') + '</p></div></section>';
        h += '<section class="container"><div class="games-grid-full">';
        games.forEach(function(g) {
            h += '<a href="#/order/' + Utils.esc(g.id) + '" class="game-card-full glass reveal">';
            h += '<div class="game-card-img"><img src="' + Utils.esc(g.image) + '" alt="' + Utils.esc(Utils.t(g.name)) + '" loading="lazy"></div>';
            h += '<div class="game-card-body"><div class="game-card-icon" style="--accent:' + Utils.esc(g.color || '#5B9FFF') + '"><i class="fas ' + Utils.esc(g.icon) + '"></i></div>';
            h += '<h3>' + Utils.esc(Utils.t(g.name)) + '</h3><p class="game-prices">From ' + Utils.formatUSD(g.packages[0].price) + '</p></div></a>';
        });
        h += '</div></section>';
        ac.innerHTML = h;
        Effects.reveal();
    },

    order: function(params) {
        var ar = I18n.lang === 'ar';
        var game = GamesManager.getById(params.gameId);
        var ac = document.getElementById('app-container'); if (!ac) return;
        if (!game) { ac.innerHTML = '<div class="container page-404"><h1>' + (ar ? '\u0627\u0644\u0644\u0639\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629' : 'Game not found') + '</h1><a href="#/games" class="btn btn-primary">' + (ar ? '\u0639\u0648\u062F\u0629' : 'Back') + '</a></div>'; return; }
        var h = '<section class="page-header"><div class="container"><a href="#/games" class="back-link"><i class="fas fa-arrow-left"></i> ' + (ar ? '\u0627\u0644\u0623\u0634\u0639\u0629' : 'Games') + '</a><h1>' + Utils.esc(Utils.t(game.name)) + '</h1></div></section>';
        h += '<section class="container order-page"><div class="order-game-info glass"><img src="' + Utils.esc(game.image) + '" alt="' + Utils.esc(Utils.t(game.name)) + '" class="order-game-img" loading="lazy"><div class="order-game-meta"><div class="game-icon-wrapper lg" style="--accent:' + Utils.esc(game.color || '#5B9FFF') + '"><i class="fas ' + Utils.esc(game.icon) + '"></i></div><div><h2>' + Utils.esc(Utils.t(game.name)) + '</h2><p>' + (ar ? '\u0627\u0644\u0639\u0645\u0644\u0627\u0621' : 'Currency') + ': ' + Utils.esc(Utils.t(game.currency)) + '</p></div></div></div>';
        h += '<div class="order-section glass"><h3><i class="fas fa-hashtag"></i> ' + (ar ? '\u0631\u0642\u0645 \u0627\u0644\u062E\u0637' : 'Player ID') + '</h3><div class="form-group"><input type="text" id="player-id" class="form-input" placeholder="' + (ar ? '\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u062E\u0637' : 'Enter Player ID') + '" maxlength="30" required><small class="form-hint">' + (ar ? '\u0627\u0644\u0631\u0642\u0645 \u0635\u062D\u064A\u062D \u0645\u0646 \u0645\u062D\u062C\u0632 \u0627\u0644\u0627\u0639\u062A\u0628\u0627\u0631' : 'Find it in your game profile') + '</small></div></div>';
        h += '<div class="order-section glass"><h3><i class="fas fa-gift"></i> ' + (ar ? '\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0631\u0636' : 'Select Package') + '</h3><div class="packages-grid">';
        game.packages.forEach(function(pkg) {
            var pop = pkg.popular ? ' popular' : '';
            h += '<div class="package-card' + pop + '" data-price="' + pkg.price + '" data-id="' + Utils.esc(pkg.id) + '">';
            if (pkg.popular) h += '<div class="package-popular-badge">' + (ar ? '\u0627\u0644\u0623\u0634\u0639\u0631' : 'Popular') + '</div>';
            h += '<div class="package-amount">' + Utils.esc(pkg.amount) + '</div>';
            h += '<div class="package-price">' + Utils.formatUSD(pkg.price) + '</div>';
            h += '</div>';
        });
        h += '</div></div>';
        h += '<div class="order-section glass" id="order-summary" style="display:none"><h3><i class="fas fa-receipt"></i> ' + (ar ? '\u0645\u0644\u062E\u0635 \u0627\u0644\u0637\u0644\u0628' : 'Order Summary') + '</h3><div class="order-summary-content"><div class="summary-row"><span>' + (ar ? '\u0627\u0644\u0645\u0628\u0644\u063A' : 'Amount') + '</span><span id="sum-amount">-</span></div><div class="summary-row"><span>' + (ar ? '\u0627\u0644\u0633\u0639\u0631' : 'Price') + '</span><span id="sum-price">-</span></div><div class="summary-row"><span>' + (ar ? '\u0631\u0635\u064A\u062F\u0643' : 'Balance') + '</span><span id="sum-balance">-</span></div><div class="summary-row"><span>' + (ar ? '\u0645\u0637\u0644\u0648\u0628\u064A\u0646\u0627\u062A' : 'Remaining') + '</span><span id="sum-remain">-</span></div></div>';
        h += '<div class="order-actions"><button id="confirm-order-btn" class="btn btn-primary btn-lg btn-full" disabled><i class="fas fa-check"></i> ' + (ar ? '\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628' : 'Confirm Order') + '</button><p class="order-note">' + (ar ? '\u0633\u064A\u0624\u0621 \u0637\u0644\u0628\u0643 \u0641\u0648\u0631\u0627\u064B' : 'Your order will be delivered instantly') + '</p></div></div>';
        h += '</section>';
        ac.innerHTML = h;
        Effects.reveal();

        var selected = null;
        document.querySelectorAll('.package-card').forEach(function(card) {
            card.addEventListener('click', function() {
                document.querySelectorAll('.package-card').forEach(function(c) { c.classList.remove('selected'); });
                card.classList.add('selected');
                selected = { id: card.dataset.id, price: parseFloat(card.dataset.price) };
                var summary = document.getElementById('order-summary');
                if (summary) summary.style.display = '';
                document.getElementById('sum-amount').textContent = card.querySelector('.package-amount').textContent;
                document.getElementById('sum-price').textContent = Utils.formatUSD(selected.price);
                document.getElementById('sum-balance').textContent = Utils.formatUSD(UserState.balance);
                var remain = UserState.balance - selected.price;
                document.getElementById('sum-remain').textContent = Utils.formatUSD(remain);
                document.getElementById('sum-remain').style.color = remain >= 0 ? '#00E676' : '#FF2E63';
                var btn = document.getElementById('confirm-order-btn');
                btn.disabled = !UserState.isLoggedIn() || remain < 0;
                if (!UserState.isLoggedIn()) btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> ' + (ar ? '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644' : 'Sign In Required');
            });
        });

        var confirmBtn = document.getElementById('confirm-order-btn');
        if (confirmBtn) confirmBtn.addEventListener('click', function() { TopUp.placeOrder(game, selected); });
    },

    earn: function() {
        var ar = I18n.lang === 'ar';
        var ac = document.getElementById('app-container'); if (!ac) return;
        var balance = Utils.formatUSD(UserState.balance);
        var h = '<section class="page-header"><div class="container"><h1>' + (ar ? '\u0627\u0631\u0628\u062D' : 'Earn') + '</h1><p>' + (ar ? '\u0634\u0627\u0647\u062F \u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u062D\u0633\u0627\u0628\u0643' : 'Watch ads and earn to your balance') + '</p></div></section>';
        h += '<section class="container">';
        h += '<div class="earn-balance glass"><div class="earn-balance-icon"><i class="fas fa-wallet"></i></div><div class="earn-balance-info"><span class="earn-balance-label">' + (ar ? '\u0631\u0635\u064A\u062F\u0643' : 'Your Balance') + '</span><span class="earn-balance-amount" data-dynamic-points>' + balance + '</span></div></div>';

        h += '<div class="earn-grid">';
        h += '<div class="earn-card glass" id="earn-ad"><div class="earn-card-icon"><i class="fas fa-ad"></i></div><h3>' + (ar ? '\u0634\u0627\u0647\u062F \u0625\u0639\u0644\u0627\u0646' : 'Watch Ad') + '</h3><p class="earn-reward">+' + Utils.formatUSD(CONFIG.earnings.adWatch) + '</p><p class="earn-desc">' + (ar ? '\u062A\u0627\u0628\u0639 \u0625\u0639\u0644\u0627\u0646 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0631\u0635\u064A\u062F\u0643' : 'Watch an ad to earn') + '</p><button class="btn btn-primary btn-lg" onclick="Pages.watchAd()"><i class="fas fa-play"></i> ' + (ar ? '\u0634\u0627\u0647\u062F' : 'Watch') + '</button></div>';

        h += '<div class="earn-card glass" id="earn-gift"><div class="earn-card-icon"><i class="fas fa-gift"></i></div><h3>' + (ar ? '\u0647\u062F\u064A\u0629 \u064A\u0648\u0645\u064A\u0629' : 'Daily Gift') + '</h3><p class="earn-reward">+' + Utils.formatUSD(CONFIG.earnings.dailyGift) + '</p><p class="earn-desc">' + (ar ? '\u0627\u0633\u062A\u0644\u0645 \u0647\u062F\u064A\u062A\u0643 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0642\u0637' : 'Claim once per day') + '</p><button class="btn btn-gold btn-lg" id="claim-gift-btn" onclick="Pages.claimGift()"><i class="fas fa-gift"></i> ' + (ar ? '\u0627\u0633\u062A\u0644\u0645' : 'Claim') + '</button></div>';

        h += '<div class="earn-card glass" id="earn-spin"><div class="earn-card-icon"><i class="fas fa-dharmachakra"></i></div><h3>' + (ar ? '\u062F\u0648\u0651\u0631\u0629 \u0627\u0644\u062D\u0638\u0629' : 'Spin Wheel') + '</h3><p class="earn-reward">' + Utils.formatUSD(CONFIG.earnings.spinMin) + ' - ' + Utils.formatUSD(CONFIG.earnings.spinMax) + '</p><p class="earn-desc">' + (ar ? '\u062F\u0648\u0651\u0631 \u0645\u0631\u0629 \u0641\u064A \u0627\u0644\u064A\u0648\u0645' : 'Once per day') + '</p><button class="btn btn-primary btn-lg" onclick="Pages.spinWheel()"><i class="fas fa-sync-alt"></i> ' + (ar ? '\u062F\u0648\u0651\u0631' : 'Spin') + '</button></div>';

        h += '<div class="earn-card glass" id="earn-link"><div class="earn-card-icon"><i class="fas fa-link"></i></div><h3>' + (ar ? '\u0632\u064A\u0627\u0631\u0629 \u0631\u0628\u0637' : 'Visit Link') + '</h3><p class="earn-reward">+' + Utils.formatUSD(CONFIG.earnings.visitLink) + '</p><p class="earn-desc">' + (ar ? '\u0632\u064A\u0631 \u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u0645\u0642\u062A\u0631\u062D \u0644\u0644\u0643\u0633\u0628' : 'Visit a sponsored link') + '</p><button class="btn btn-primary btn-lg" onclick="Pages.visitLink()"><i class="fas fa-external-link-alt"></i> ' + (ar ? '\u0632\u064A\u0627\u0631\u0629' : 'Visit') + '</button></div>';
        h += '</div>';

        if (!UserState.isLoggedIn()) h += '<div class="earn-cta glass"><h3>' + (ar ? '\u0633\u062C\u0651\u0644 \u0644\u0644\u0628\u062F\u061F' : 'Sign in to start earning?') + '</h3><a href="#/register" class="btn btn-primary btn-lg">' + (ar ? '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u0633\u062C\u064A\u0644' : 'Register') + '</a></div>';
        h += '</section>';
        ac.innerHTML = h;
        if (UserState.canGift()) { var gb = document.getElementById('claim-gift-btn'); if (gb) gb.disabled = false; }
        Effects.reveal();
    },

    watchAd: async function() {
        if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
        if (!Utils.rateLimit('ad', 15000)) { UI.showToast('Wait between ads', 'warning'); return; }
        var adEl = document.getElementById('earn-ad'); if (adEl) adEl.classList.add('loading');
        window.open(CONFIG.ads.smartlink, '_blank', 'noopener,noreferrer');
        await new Promise(function(r) { setTimeout(r, 5000); });
        UserState.addBalance(CONFIG.earnings.adWatch);
        Achievements.check('ad');
        if (adEl) adEl.classList.remove('loading');
        UI.showToast('+' + Utils.formatUSD(CONFIG.earnings.adWatch) + ' earned!', 'success');
    },

    claimGift: function() {
        if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
        if (!UserState.canGift()) { UI.showToast('Come back tomorrow', 'warning'); return; }
        UserState.addBalance(CONFIG.earnings.dailyGift);
        if (UserState.profile) { UserState.profile.dailyGifts = (UserState.profile.dailyGifts || 0) + 1; UserState.profile.lastGift = Date.now(); UserState.save(); UserState.syncFB(); }
        Achievements.check('gift');
        UI.showToast('+' + Utils.formatUSD(CONFIG.earnings.dailyGift) + ' daily gift!', 'success');
        var gb = document.getElementById('claim-gift-btn');
        if (gb) { gb.disabled = true; gb.textContent = I18n.lang === 'ar' ? '\u062A\u0645' : 'Claimed'; }
    },

    spinWheel: function() { SpinWheel.spin(); },

    visitLink: function() {
        if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
        if (!Utils.rateLimit('link', 20000)) { UI.showToast('Wait before visiting again', 'warning'); return; }
        UserState.addBalance(CONFIG.earnings.visitLink);
        Achievements.check('visit');
        UI.showToast('+' + Utils.formatUSD(CONFIG.earnings.visitLink) + ' earned!', 'success');
        window.open(CONFIG.ads.freecash, '_blank', 'noopener,noreferrer');
    },

    referral: function() {
        var ar = I18n.lang === 'ar';
        var ac = document.getElementById('app-container'); if (!ac) return;
        if (!UserState.isLoggedIn()) { Router.navigate('login'); return; }
        if (!UserState.profile.refCode) { UserState.profile.refCode = Utils.genRefCode(); UserState.save(); UserState.syncFB(); }
        var link = ReferralSystem.getLink();
        var h = '<section class="page-header"><div class="container"><h1>' + (ar ? '\u0627\u0644\u062F\u0639\u0648\u0629' : 'Referral') + '</h1></div></section>';
        h += '<section class="container referral-page">';
        h += '<div class="referral-card glass"><div class="referral-icon"><i class="fas fa-users"></i></div><h2>' + (ar ? '\u0627\u062F\u0639\u064F \u0635\u062F\u064A\u0642\u064B\u0627' : 'Invite Friends') + '</h2><p>' + (ar ? '\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 ' + Utils.formatUSD(CONFIG.earnings.referralBonus) + ' \u0644\u0643\u0644 \u0635\u062F\u064A\u0642' : 'Earn ' + Utils.formatUSD(CONFIG.earnings.referralBonus) + ' per referral') + '</p>';
        h += '<div class="ref-link-box"><input type="text" class="form-input" id="ref-link" value="' + Utils.esc(link) + '" readonly><button class="btn btn-primary" onclick="Pages.copyRef()"><i class="fas fa-copy"></i> ' + (ar ? '\u0646\u0633\u062E' : 'Copy') + '</button></div>';
        h += '<p class="ref-code-text">' + (ar ? '\u0631\u0645\u0632 \u0627\u0644\u062F\u0639\u0648\u0629' : 'Your Code') + ': <strong>' + Utils.esc(UserState.profile.refCode) + '</strong></p>';
        h += '<p class="ref-stat">' + (ar ? '\u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0646' : 'Referrals') + ': <strong>' + (UserState.profile.referrals || 0) + '</strong></p>';
        h += '</div></section>';
        ac.innerHTML = h;
        Effects.reveal();
    },
    copyRef: function() {
        var el = document.getElementById('ref-link'); if (!el) return;
        el.select(); document.execCommand('copy');
        UI.showToast('Copied!', 'success');
    },

    profile: function() {
        var ar = I18n.lang === 'ar';
        var ac = document.getElementById('app-container'); if (!ac) return;
        if (!UserState.isLoggedIn()) { Router.navigate('login'); return; }
        var p = UserState.profile;
        var h = '<section class="page-header"><div class="container"><h1>' + (ar ? '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A' : 'Profile') + '</h1></div></section>';
        h += '<section class="container profile-page">';
        h += '<div class="profile-card glass"><div class="profile-avatar"><img src="' + Utils.esc(p.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(p.displayName || 'User') + '&background=5B9FFF&color=fff') + '" alt="avatar"><span class="profile-badge">' + (p.role === 'admin' ? '<i class="fas fa-crown"></i>' : '<i class="fas fa-user"></i>') + '</span></div>';
        h += '<div class="profile-info"><h2>' + Utils.esc(p.displayName || 'User') + '</h2><p>' + Utils.esc(p.email || '') + '</p><span class="profile-role">' + (p.role === 'admin' ? 'Admin' : (ar ? '\u0645\u0633\u062A\u062E\u062F\u0645' : 'User')) + '</span></div></div>';
        h += '<div class="profile-stats">';
        var stats = [{ icon: 'fa-wallet', label: ar ? '\u0627\u0644\u0631\u0635\u064A\u062F' : 'Balance', val: Utils.formatUSD(p.balance || 0) }, { icon: 'fa-chart-line', label: ar ? '\u0627\u0644\u0645\u0643\u0633\u0628' : 'Earned', val: Utils.formatUSD(p.earned || 0) }, { icon: 'fa-shopping-cart', label: ar ? '\u0627\u0644\u0637\u0644\u0628\u0627\u062A' : 'Orders', val: p.orders || 0 }, { icon: 'fa-dharmachakra', label: ar ? '\u0627\u0644\u062F\u0648\u0627\u0626\u0631' : 'Spins', val: p.totalSpins || 0 }];
        stats.forEach(function(s) { h += '<div class="stat-card glass"><i class="fas ' + s.icon + '"></i><span class="stat-val">' + s.val + '</span><span class="stat-lbl">' + s.label + '</span></div>'; });
        h += '</div>';
        h += '<div class="profile-actions">';
        h += '<a href="#/topup" class="btn btn-gold"><i class="fas fa-shopping-cart"></i> ' + (ar ? '\u0634\u062D\u0646 \u0639\u0642\u062F\u0627\u064B' : 'Top Up Now') + '</a>';
        h += '<button class="btn btn-outline" onclick="Auth.handleLogout()"><i class="fas fa-sign-out-alt"></i> ' + (ar ? '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C' : 'Logout') + '</button>';
        h += '</div></section>';
        ac.innerHTML = h;
        Effects.reveal();
    },

    topupPage: function() {
        var ar = I18n.lang === 'ar';
        var ac = document.getElementById('app-container'); if (!ac) return;
        var h = '<section class="page-header"><div class="container"><h1>' + (ar ? '\u0634\u062D\u0646 \u0639\u0642\u062F\u0627\u064B' : 'Top Up') + '</h1><p>' + (ar ? '\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0634\u062D\u0646' : 'Choose your top-up method') + '</p></div></section>';
        h += '<section class="container topup-page">';
        h += '<div class="balance-bar glass"><span>' + (ar ? '\u0631\u0635\u064A\u062F\u0643' : 'Your Balance') + ':</span><strong class="balance-amount" data-dynamic-points>' + Utils.formatUSD(UserState.balance) + '</strong></div>';
        h += '<div class="topup-methods">';
        h += '<a href="#/games" class="topup-method-card glass"><div class="method-icon"><i class="fas fa-gamepad"></i></div><h3>' + (ar ? '\u062A\u0634\u062D\u064A\u0646 \u0639\u0642\u062F \u0627\u0644\u062C\u0645\u0639' : 'Top Up Game') + '</h3><p>' + (ar ? '\u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u0629 \u0648\u0634\u062D\u0646 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0631\u0635\u064A\u062F\u0643' : 'Use your balance to top up games') + '</p></a>';
        h += '<div class="topup-method-card glass promo-card"><div class="method-icon"><i class="fas fa-tag"></i></div><h3>' + (ar ? '\u0631\u0645\u0632 \u062A\u062E\u0641\u064A\u0636' : 'Promo Code') + '</h3><div class="promo-form"><input type="text" id="promo-input" class="form-input" placeholder="' + (ar ? '\u0623\u062F\u062E\u0644 \u0627\u0644\u0631\u0645\u0632' : 'Enter code') + '" maxlength="20"><button class="btn btn-primary" id="redeem-promo-btn" onclick="Pages.redeemPromo()"><i class="fas fa-check"></i> ' + (ar ? '\u062A\u0641\u0639\u064A\u0644' : 'Redeem') + '</button></div></div>';
        h += '</div></section>';
        ac.innerHTML = h;
        Effects.reveal();
    },
    redeemPromo: function() { var v = document.getElementById('promo-input'); if (v) PromoCodes.validate(v.value); },

    support: function() {
        var ar = I18n.lang === 'ar';
        var ac = document.getElementById('app-container'); if (!ac) return;
        var h = '<section class="page-header"><div class="container"><h1>' + (ar ? '\u0627\u0644\u062F\u0639\u0645' : 'Support') + '</h1></div></section>';
        h += '<section class="container support-page">';
        h += '<div class="support-form glass"><h3>' + (ar ? '\u062A\u0642\u062F\u064A\u0645 \u062A\u0642\u0631\u064A\u0631' : 'Submit Ticket') + '</h3>';
        h += '<form id="ticketForm"><div class="form-group"><label>' + (ar ? '\u0627\u0644\u0639\u0646\u0648\u0627\u0646' : 'Subject') + '</label><input type="text" id="ticketSubject" class="form-input" required minlength="3"></div>';
        h += '<div class="form-group"><label>' + (ar ? '\u0627\u0644\u0631\u0633\u0627\u0644\u0629' : 'Message') + '</label><textarea id="ticketMessage" class="form-input" rows="5" required minlength="10"></textarea></div>';
        h += '<button type="submit" class="btn btn-primary btn-lg"><i class="fas fa-paper-plane"></i> ' + (ar ? '\u0625\u0631\u0633\u0627\u0644' : 'Send') + '</button></form></div>';
        h += '<div class="support-info glass"><h3>' + (ar ? '\u0637\u0631\u0642 \u0627\u0644\u062A\u0648\u0627\u0635\u0644' : 'Contact') + '</h3><p><i class="fab fa-discord"></i> Discord: <a href="https://discord.gg/hwMVSaj9" target="_blank" rel="noopener">discord.gg/hwMVSaj9</a></p>';
        h += '<p><i class="fas fa-envelope"></i> ' + (ar ? '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A' : 'Email') + ': support@rewords.com</p></div></section>';
        ac.innerHTML = h;
        Effects.reveal();
        document.getElementById('ticketForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
            var btn = this.querySelector('button[type=submit]'); btn.disabled = true;
            var ok = await Tickets.submit(document.getElementById('ticketSubject').value, document.getElementById('ticketMessage').value);
            btn.disabled = false;
            if (ok) { this.reset(); UI.showToast('Ticket sent!', 'success'); }
        });
    },

    privacy: function() { var ac = document.getElementById('app-container'); if (!ac) return; ac.innerHTML = '<section class="container legal-page"><h1>Privacy Policy</h1><div class="legal-content glass"><p>Last updated: 2026</p><p>ReWords collects minimal data to provide our game top-up services. We do not sell personal information. Ad partners may use cookies for personalized advertising.</p><p><strong>Data We Collect:</strong> Email, display name, and game IDs for order fulfillment.</p><p><strong>Usage:</strong> We use Firebase for authentication and data storage with industry-standard security.</p></div></section>'; Effects.reveal(); },
    terms: function() { var ac = document.getElementById('app-container'); if (!ac) return; ac.innerHTML = '<section class="container legal-page"><h1>Terms of Service</h1><div class="legal-content glass"><p>Last updated: 2026</p><p>By using ReWords, you agree to these terms. We reserve the right to modify services at any time.</p><p><strong>Service:</strong> Game top-up through advertising revenue sharing.</p><p><strong>Liability:</strong> We are not responsible for game account issues. Ensure correct player ID before ordering.</p></div></section>'; Effects.reveal(); },
    notFound: function() { var ac = document.getElementById('app-container'); if (!ac) return; ac.innerHTML = '<div class="container page-404"><div class="code-404">404</div><h1>Page Not Found</h1><p>The page you\'re looking for doesn\'t exist.</p><a href="#/home" class="btn btn-primary">Go Home</a></div>'; Effects.reveal(); }
};


// ==================== TOP UP ====================
const TopUp = {
    placeOrder: async function(game, pkg) {
        if (!UserState.isLoggedIn()) { UI.showToast('Sign in first', 'warning'); return; }
        if (!pkg || !pkg.price) { UI.showToast('Select a package', 'warning'); return; }
        var pid = document.getElementById('player-id');
        var playerId = pid ? pid.value.trim() : '';
        if (!playerId) { UI.showToast('Enter Player ID', 'error'); pid && pid.focus(); return; }
        if (!Utils.isValidPlayerId(playerId)) { UI.showToast('Invalid Player ID (4-30 chars)', 'error'); return; }
        if (UserState.balance < pkg.price) { UI.showToast('Insufficient balance', 'error'); return; }
        if (!Utils.rateLimit('order', 10000)) { UI.showToast('Wait before placing another order', 'warning'); return; }
        var btn = document.getElementById('confirm-order-btn');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'; }
        var ok = UserState.spendBalance(pkg.price);
        if (!ok) { UI.showToast('Payment failed', 'error'); if (btn) btn.disabled = false; return; }
        try {
            var order = {
                id: Utils.genId(),
                uid: FB.user ? FB.user.uid : '',
                email: UserState.profile.email || '',
                displayName: UserState.profile.displayName || '',
                game: game.id,
                gameName: game.name,
                packageId: pkg.id,
                amount: pkg.amount,
                playerId: Utils.sanitize(playerId),
                price: pkg.price,
                status: 'pending',
                createdAt: Date.now()
            };
            if (FB.ok) await FB.db.collection(CONFIG.col.orders).doc(order.id).set(order);
            if (UserState.profile) { UserState.profile.orders = (UserState.profile.orders || 0) + 1; UserState.save(); UserState.syncFB(); }
            Achievements.check('order');
            UI.showToast('Order placed! # ' + order.id.substr(-6), 'success');
            setTimeout(function() { Router.navigate('home'); }, 1500);
        } catch (e) {
            UserState.addBalance(pkg.price);
            UI.showToast('Order failed, balance refunded', 'error');
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check"></i> Confirm Order'; }
        }
    }
};

// ==================== ADMIN PANEL ====================
const AdminPanel = {
    render: function(c) {
        if (!UserState.isAdmin()) { UI.showToast('Admin access required', 'error'); Router.navigate('home'); return; }
        var ar = I18n.lang === 'ar';
        var ac = document.getElementById('app-container'); if (!ac) return;
        var tabs = [
            { id: 'dashboard', icon: 'fa-chart-pie', label: ar ? '\u0627\u0644\u0644\u0648\u062D\u0629' : 'Dashboard' },
            { id: 'orders', icon: 'fa-shopping-cart', label: ar ? '\u0627\u0644\u0637\u0644\u0628\u0627\u062A' : 'Orders' },
            { id: 'users', icon: 'fa-users', label: ar ? '\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646' : 'Users' },
            { id: 'games', icon: 'fa-gamepad', label: ar ? '\u0627\u0644\u0623\u0634\u0639\u0629' : 'Games' },
            { id: 'ads', icon: 'fa-ad', label: ar ? '\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Ads' },
            { id: 'announcements', icon: 'fa-bullhorn', label: ar ? '\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Announcements' },
            { id: 'tickets', icon: 'fa-headset', label: ar ? '\u0627\u0644\u062A\u0642\u0631\u064A\u0631\u0627\u062A' : 'Tickets' },
            { id: 'codes', icon: 'fa-tag', label: ar ? '\u0627\u0644\u0631\u0645\u0648\u0632' : 'Codes' },
            { id: 'settings', icon: 'fa-cog', label: ar ? '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A' : 'Settings' }
        ];
        var h = '<section class="admin-page"><div class="admin-header"><div class="container"><h1><i class="fas fa-shield-halved"></i> ' + (ar ? '\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645' : 'Admin Panel') + '</h1></div></div>';
        h += '<div class="container admin-layout">';
        h += '<nav class="admin-sidebar"><ul class="admin-tabs">';
        tabs.forEach(function(t) { h += '<li class="admin-tab' + (t.id === 'dashboard' ? ' active' : '') + '" data-tab="' + t.id + '"><i class="fas ' + t.icon + '"></i><span>' + t.label + '</span></li>'; });
        h += '</ul></nav>';
        h += '<div class="admin-content" id="admin-content"></div></div></section>';
        ac.innerHTML = h;
        document.querySelectorAll('.admin-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                AdminPanel.loadTab(tab.dataset.tab);
            });
        });
        this.loadTab('dashboard');
    },
    loadTab: function(tab) {
        var c = document.getElementById('admin-content'); if (!c) return;
        c.innerHTML = '<div class="admin-loading"><i class="fas fa-spinner fa-spin"></i></div>';
        switch (tab) {
            case 'dashboard': this.renderDashboard(c); break;
            case 'orders': this.renderOrders(c); break;
            case 'users': this.renderUsers(c); break;
            case 'games': this.renderGames(c); break;
            case 'ads': this.renderAds(c); break;
            case 'announcements': this.renderAnnouncements(c); break;
            case 'tickets': this.renderTickets(c); break;
            case 'codes': this.renderCodes(c); break;
            case 'settings': this.renderSettings(c); break;
        }
    },

    renderDashboard: function(c) {
        var ar = I18n.lang === 'ar';
        if (!FB.ok) { c.innerHTML = '<div class="admin-empty">Firebase not connected</div>'; return; }
        var stats = { users: 0, orders: 0, revenue: 0, pending: 0, tickets: 0 };
        var promises = [
            FB.db.collection(CONFIG.col.users).get().then(function(s) { stats.users = s.size; }),
            FB.db.collection(CONFIG.col.orders).get().then(function(s) {
                stats.orders = s.size;
                s.forEach(function(d) { var o = d.data(); stats.revenue += o.price || 0; if (o.status === 'pending') stats.pending++; });
            }),
            FB.db.collection(CONFIG.col.tickets).where('status', '==', 'open').get().then(function(s) { stats.tickets = s.size; })
        ];
        Promise.all(promises).then(function() {
            var cards = [
                { icon: 'fa-users', color: '#5B9FFF', val: stats.users, label: ar ? '\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646' : 'Users' },
                { icon: 'fa-shopping-cart', color: '#FF6B35', val: stats.orders, label: ar ? '\u0627\u0644\u0637\u0644\u0628\u0627\u062A' : 'Orders' },
                { icon: 'fa-dollar-sign', color: '#00E676', val: Utils.formatUSD(stats.revenue), label: ar ? '\u0627\u0644\u0625\u0631\u0628\u0627\u062D' : 'Revenue' },
                { icon: 'fa-clock', color: '#FFE600', val: stats.pending, label: ar ? '\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630' : 'Pending' },
                { icon: 'fa-headset', color: '#FF2E63', val: stats.tickets, label: ar ? '\u0627\u0644\u062A\u0642\u0631\u064A\u0631\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629' : 'Open Tickets' }
            ];
            var html = '<div class="admin-stats-grid">';
            cards.forEach(function(card) { html += '<div class="admin-stat-card glass"><div class="admin-stat-icon" style="background:' + card.color + '"><i class="fas ' + card.icon + '"></i></div><div class="admin-stat-val">' + card.val + '</div><div class="admin-stat-lbl">' + card.label + '</div></div>'; });
            html += '</div>';
            c.innerHTML = html;
        }).catch(function() { c.innerHTML = '<div class="admin-error">Error loading stats</div>'; });
    },

    renderOrders: function(c) {
        var ar = I18n.lang === 'ar';
        if (!FB.ok) { c.innerHTML = '<div class="admin-empty">Firebase not connected</div>'; return; }
        FB.db.collection(CONFIG.col.orders).orderBy('createdAt', 'desc').limit(50).get().then(function(snap) {
            if (snap.empty) { c.innerHTML = '<div class="admin-empty"><i class="fas fa-shopping-cart"></i><p>' + (ar ? '\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A' : 'No orders yet') + '</p></div>'; return; }
            var html = '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>' + (ar ? '\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645' : 'User') + '</th><th>' + (ar ? '\u0627\u0644\u0644\u0639\u0628\u0629' : 'Game') + '</th><th>' + (ar ? '\u0627\u0644\u0645\u0628\u0644\u063A' : 'Amount') + '</th><th>' + (ar ? '\u0627\u0644\u0633\u0639\u0631' : 'Price') + '</th><th>' + (ar ? '\u0627\u0644\u062D\u0627\u0644\u0629' : 'Status') + '</th><th>' + (ar ? '\u0627\u0644\u062A\u062E\u0637\u064A\u0637' : 'Actions') + '</th></tr></thead><tbody>';
            snap.forEach(function(doc) { var o = doc.data();
                html += '<tr><td class="order-id">' + Utils.esc(o.id.substr(-8)) + '</td><td>' + Utils.esc(o.displayName || o.email) + '</td><td>' + Utils.esc(typeof o.gameName === 'object' ? Utils.t(o.gameName) : o.gameName) + '</td><td>' + Utils.esc(o.amount) + '</td><td>' + Utils.formatUSD(o.price) + '</td><td><span class="status-badge status-' + Utils.esc(o.status) + '">' + Utils.esc(o.status) + '</span></td><td class="admin-actions">';
                if (o.status === 'pending') {
                    html += '<button class="btn-sm btn-success" onclick="AdminPanel.updateOrder(\'' + doc.id + '\',\'completed\')"><i class="fas fa-check"></i></button> ';
                    html += '<button class="btn-sm btn-danger" onclick="AdminPanel.updateOrder(\'' + doc.id + '\',\'rejected\')"><i class="fas fa-times"></i></button>';
                }
                html += '<button class="btn-sm btn-info" onclick="AdminPanel.deleteOrder(\'' + doc.id + '\')"><i class="fas fa-trash"></i></button>';
                html += '</td></tr>'; });
            html += '</tbody></table></div>';
            c.innerHTML = html;
        });
    },

    updateOrder: async function(id, status) {
        try { await FB.db.collection(CONFIG.col.orders).doc(id).update({ status: status, updatedAt: Date.now() }); UI.showToast('Updated', 'success'); this.renderOrders(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },
    deleteOrder: async function(id) {
        if (!confirm('Delete this order?')) return;
        try { await FB.db.collection(CONFIG.col.orders).doc(id).delete(); UI.showToast('Deleted', 'success'); this.renderOrders(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },

    renderUsers: function(c) {
        var ar = I18n.lang === 'ar';
        if (!FB.ok) { c.innerHTML = '<div class="admin-empty">Firebase not connected</div>'; return; }
        FB.db.collection(CONFIG.col.users).limit(100).get().then(function(snap) {
            if (snap.empty) { c.innerHTML = '<div class="admin-empty"><i class="fas fa-users"></i><p>' + (ar ? '\u0644\u0627 \u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646' : 'No users yet') + '</p></div>'; return; }
            var html = '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>' + (ar ? '\u0627\u0644\u0627\u0633\u0645' : 'Name') + '</th><th>' + (ar ? '\u0627\u0644\u0628\u0631\u064A\u062F' : 'Email') + '</th><th>' + (ar ? '\u0627\u0644\u0631\u0635\u064A\u062F' : 'Balance') + '</th><th>' + (ar ? '\u0627\u0644\u0645\u0643\u0633\u0628' : 'Earned') + '</th><th>' + (ar ? '\u0627\u0644\u0637\u0644\u0628\u0627\u062A' : 'Orders') + '</th><th>' + (ar ? '\u0627\u0644\u062F\u0648\u0631' : 'Role') + '</th><th>' + (ar ? '\u0627\u0644\u0623\u0641\u0639\u0627\u0644' : 'Actions') + '</th></tr></thead><tbody>';
            snap.forEach(function(doc) { var u = doc.data();
                html += '<tr><td>' + Utils.esc(u.displayName || 'User') + '</td><td>' + Utils.esc(u.email || '') + '</td><td>' + Utils.formatUSD(u.balance || 0) + '</td><td>' + Utils.formatUSD(u.earned || 0) + '</td><td>' + (u.orders || 0) + '</td><td>' + Utils.esc(u.role || 'user') + '</td><td class="admin-actions">';
                if (u.role !== 'admin') {
                    html += '<button class="btn-sm btn-warning" onclick="AdminPanel.setUserRole(\'' + doc.id + '\',\'admin\')" title="Make Admin"><i class="fas fa-crown"></i></button> ';
                    html += '<button class="btn-sm btn-danger" onclick="AdminPanel.banUser(\'' + doc.id + '\')" title="Ban"><i class="fas fa-ban"></i></button> ';
                }
                html += '<button class="btn-sm btn-info" onclick="AdminPanel.adjustBalance(\'' + doc.id + '\')" title="Adjust Balance"><i class="fas fa-dollar-sign"></i></button>';
                html += '</td></tr>'; });
            html += '</tbody></table></div>';
            c.innerHTML = html;
        });
    },

    setUserRole: async function(uid, role) {
        if (!confirm('Set user as ' + role + '?')) return;
        try { await FB.db.collection(CONFIG.col.users).doc(uid).update({ role: role }); UI.showToast('Updated', 'success'); this.renderUsers(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },
    banUser: async function(uid) {
        var reason = prompt('Ban reason:');
        if (reason === null) return;
        try { await FB.db.collection(CONFIG.col.users).doc(uid).update({ banned: true, banReason: reason }); UI.showToast('User banned', 'success'); this.renderUsers(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },
    adjustBalance: async function(uid) {
        var amt = prompt('Balance adjustment in USD (negative to deduct):');
        if (amt === null || isNaN(amt)) return;
        amt = parseFloat(amt);
        try {
            var doc = await FB.db.collection(CONFIG.col.users).doc(uid).get();
            var u = doc.data(); var newBal = Math.round(((u.balance || 0) + amt) * 1000) / 1000;
            if (newBal < 0) newBal = 0;
            await FB.db.collection(CONFIG.col.users).doc(uid).update({ balance: newBal });
            UI.showToast('Balance updated: ' + Utils.formatUSD(newBal), 'success');
            this.renderUsers(document.getElementById('admin-content'));
        } catch (e) { UI.showToast('Error', 'error'); }
    },

    renderGames: function(c) {
        var ar = I18n.lang === 'ar';
        var games = GamesManager.getAllRaw();
        var html = '<div class="admin-section-header"><h2>' + (ar ? '\u0627\u0644\u0623\u0634\u0639\u0629' : 'Games') + '</h2><button class="btn btn-primary" onclick="AdminPanel.addGame()"><i class="fas fa-plus"></i> ' + (ar ? '\u0625\u0636\u0627\u0641\u0629' : 'Add') + '</button></div>';
        html += '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>' + (ar ? '\u0627\u0644\u0627\u0633\u0645' : 'Name') + '</th><th>' + (ar ? '\u0627\u0644\u0623\u0646\u0648\u0627\u0637' : 'Packages') + '</th><th>' + (ar ? '\u0627\u0644\u062D\u0627\u0644\u0629' : 'Status') + '</th><th>' + (ar ? '\u0627\u0644\u062A\u062E\u0637\u064A\u0637' : 'Actions') + '</th></tr></thead><tbody>';
        games.forEach(function(g) {
            html += '<tr><td>' + Utils.esc(g.id) + '</td><td>' + Utils.esc(Utils.t(g.name)) + '</td><td>' + (g.packages ? g.packages.length : 0) + '</td><td>' + (g.active !== false ? '<span class="status-badge status-active">Active</span>' : '<span class="status-badge status-inactive">Inactive</span>') + '</td>';
            html += '<td class="admin-actions"><button class="btn-sm btn-info" onclick="AdminPanel.editGame(\'' + Utils.esc(g.id) + '\')"><i class="fas fa-edit"></i></button> <button class="btn-sm btn-danger" onclick="AdminPanel.deleteGame(\'' + Utils.esc(g.id) + '\')"><i class="fas fa-trash"></i></button></td></tr>';
        });
        html += '</tbody></table></div>';
        c.innerHTML = html;
    },

    addGame: function() {
        var id = prompt('Game ID (lowercase, no spaces):');
        if (!id) return;
        id = id.toLowerCase().replace(/[^a-z0-9]/g, '');
        var name = prompt('Game name (English):');
        if (!name) return;
        var game = { id: id, name: { en: name, ar: name }, icon: 'fa-gamepad', color: '#5B9FFF', currency: { en: 'Gems', ar: '\u062C\u0648\u0627\u0647\u0631' }, image: '', active: true, order: GAMES_DATA.length + 1, packages: [{ id: id + '1', amount: '100', price: 0.99, points: 0.99 }] };
        if (FB.ok) { FB.db.collection(CONFIG.col.games).doc(id).set(game).then(function() { UI.showToast('Game added', 'success'); GamesManager.load(); AdminPanel.renderGames(document.getElementById('admin-content')); }); }
        else { GAMES_DATA.push(game); UI.showToast('Game added (local)', 'success'); this.renderGames(document.getElementById('admin-content')); }
    },
    editGame: function(id) {
        var g = null; GAMES_DATA.forEach(function(gd) { if (gd.id === id) g = gd; });
        if (!g) return;
        var active = confirm('Game ' + (Utils.t(g.name)) + '\n\nOK = Active\nCancel = Inactive');
        if (FB.ok) { FB.db.collection(CONFIG.col.games).doc(id).update({ active: active }).then(function() { UI.showToast('Updated', 'success'); GamesManager.load(); AdminPanel.renderGames(document.getElementById('admin-content')); }); }
        else { g.active = active; this.renderGames(document.getElementById('admin-content')); }
    },
    deleteGame: async function(id) {
        if (!confirm('Delete game ' + id + '?')) return;
        try { await FB.db.collection(CONFIG.col.games).doc(id).delete(); UI.showToast('Deleted', 'success'); GAMES_DATA = GAMES_DATA.filter(function(g) { return g.id !== id; }); AdminPanel.renderGames(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },

    renderAds: function(c) {
        var ar = I18n.lang === 'ar';
        var ads = CONFIG.ads.slots;
        var html = '<div class="admin-section-header"><h2>' + (ar ? '\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Ad Placements') + '</h2></div>';
        html += '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>' + (ar ? '\u0627\u0644\u0627\u0633\u0645' : 'Name') + '</th><th>' + (ar ? '\u0627\u0644\u0646\u0648\u0639' : 'Type') + '</th><th>' + (ar ? '\u0627\u0644\u062D\u0627\u0644\u0629' : 'Status') + '</th><th>' + (ar ? '\u0627\u0644\u062A\u062E\u0637\u064A\u0637' : 'Actions') + '</th></tr></thead><tbody>';
        ads.forEach(function(ad, idx) {
            html += '<tr><td>' + Utils.esc(ad.name) + '</td><td>' + Utils.esc(ad.type) + '</td><td>' + (ad.enabled ? '<span class="status-badge status-active">' + (ar ? '\u0645\u0641\u0639\u0644' : 'Active') + '</span>' : '<span class="status-badge status-inactive">' + (ar ? '\u0645\u0639\u0637\u0644' : 'Disabled') + '</span>') + '</td>';
            html += '<td class="admin-actions"><button class="btn-sm ' + (ad.enabled ? 'btn-warning' : 'btn-success') + '" onclick="AdminPanel.toggleAd(' + idx + ')"><i class="fas fa-' + (ad.enabled ? 'pause' : 'play') + '"></i></button></td></tr>';
        });
        html += '</tbody></table></div>';
        html += '<div class="admin-ad-config glass"><h3>' + (ar ? '\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Ad URLs') + '</h3>';
        html += '<div class="form-group"><label>Smartlink URL</label><input type="url" class="form-input" id="ad-smartlink" value="' + Utils.esc(CONFIG.ads.smartlink) + '"></div>';
        html += '<div class="form-group"><label>Freecash URL</label><input type="url" class="form-input" id="ad-freecash" value="' + Utils.esc(CONFIG.ads.freecash) + '"></div>';
        html += '<button class="btn btn-primary" onclick="AdminPanel.saveAds()"><i class="fas fa-save"></i> ' + (ar ? '\u062D\u0641\u0638' : 'Save') + '</button></div>';
        c.innerHTML = html;
    },
    toggleAd: function(idx) {
        CONFIG.ads.slots[idx].enabled = !CONFIG.ads.slots[idx].enabled;
        this.renderAds(document.getElementById('admin-content'));
        UI.showToast('Ad ' + (CONFIG.ads.slots[idx].enabled ? 'enabled' : 'disabled'), 'success');
    },
    saveAds: function() {
        var sl = document.getElementById('ad-smartlink');
        var fc = document.getElementById('ad-freecash');
        if (sl) CONFIG.ads.smartlink = sl.value;
        if (fc) CONFIG.ads.freecash = fc.value;
        UI.showToast('Ad config saved', 'success');
    },

    renderAnnouncements: function(c) {
        var ar = I18n.lang === 'ar';
        var html = '<div class="admin-section-header"><h2>' + (ar ? '\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Announcements') + '</h2><button class="btn btn-primary" onclick="AdminPanel.addAnnouncement()"><i class="fas fa-plus"></i> ' + (ar ? '\u0625\u0636\u0627\u0641\u0629' : 'Add') + '</button></div>';
        if (!FB.ok) { c.innerHTML = html; return; }
        FB.db.collection(CONFIG.col.announcements).orderBy('createdAt', 'desc').get().then(function(snap) {
            html += '<div class="admin-list">';
            if (snap.empty) html += '<div class="admin-empty"><p>' + (ar ? '\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'No announcements') + '</p></div>';
            snap.forEach(function(doc) { var a = doc.data();
                html += '<div class="admin-list-item glass"><div class="admin-list-info"><strong>' + Utils.esc(Utils.t(a.title)) + '</strong><p>' + Utils.esc(Utils.t(a.message)) + '</p><small>' + Utils.formatDate(a.createdAt) + '</small></div>';
                html += '<div class="admin-actions"><button class="btn-sm btn-danger" onclick="AdminPanel.deleteAnnouncement(\'' + doc.id + '\')"><i class="fas fa-trash"></i></button></div></div>';
            });
            html += '</div>';
            c.innerHTML = html;
        });
    },
    addAnnouncement: function() {
        var title = prompt('Title (English):');
        if (!title) return;
        var msg = prompt('Message (English):');
        if (!msg) return;
        var type = prompt('Type (info/warning/success):', 'info') || 'info';
        var ann = { title: { en: title, ar: title }, message: { en: msg, ar: msg }, type: type, active: true, createdAt: Date.now() };
        FB.db.collection(CONFIG.col.announcements).add(ann).then(function() { UI.showToast('Added', 'success'); AdminPanel.renderAnnouncements(document.getElementById('admin-content')); });
    },
    deleteAnnouncement: async function(id) {
        if (!confirm('Delete?')) return;
        try { await FB.db.collection(CONFIG.col.announcements).doc(id).delete(); UI.showToast('Deleted', 'success'); AdminPanel.renderAnnouncements(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },

    renderTickets: function(c) {
        var ar = I18n.lang === 'ar';
        if (!FB.ok) { c.innerHTML = '<div class="admin-empty">Firebase not connected</div>'; return; }
        FB.db.collection(CONFIG.col.tickets).orderBy('createdAt', 'desc').limit(50).get().then(function(snap) {
            if (snap.empty) { c.innerHTML = '<div class="admin-empty"><p>' + (ar ? '\u0644\u0627 \u062A\u0642\u0631\u064A\u0631\u0627\u062A' : 'No tickets') + '</p></div>'; return; }
            var html = '<div class="admin-list">';
            snap.forEach(function(doc) { var t = doc.data();
                html += '<div class="admin-list-item glass"><div class="admin-list-info"><strong>' + Utils.esc(t.subject) + '</strong><p>' + Utils.esc(t.message) + '</p><small>' + Utils.esc(t.displayName || t.email) + ' | ' + Utils.formatDate(t.createdAt) + '</small></div>';
                html += '<div class="admin-actions"><button class="btn-sm btn-danger" onclick="AdminPanel.deleteTicket(\'' + doc.id + '\')"><i class="fas fa-trash"></i></button></div></div>';
            });
            html += '</div>';
            c.innerHTML = html;
        });
    },
    deleteTicket: async function(id) {
        if (!confirm('Delete ticket?')) return;
        try { await FB.db.collection(CONFIG.col.tickets).doc(id).delete(); UI.showToast('Deleted', 'success'); AdminPanel.renderTickets(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },

    renderCodes: function(c) {
        var ar = I18n.lang === 'ar';
        var html = '<div class="admin-section-header"><h2>' + (ar ? '\u0631\u0645\u0648\u0632 \u0627\u0644\u0641\u062E\u0631' : 'Promo Codes') + '</h2><button class="btn btn-primary" onclick="AdminPanel.addCode()"><i class="fas fa-plus"></i> ' + (ar ? '\u0625\u0636\u0627\u0641\u0629' : 'Add') + '</button></div>';
        html += '<div class="admin-codes-info glass"><p>' + (ar ? '\u0631\u0645\u0632 \u0627\u0644\u0641\u062E\u0631 \u0627\u0644\u0645\u0628\u0646\u064A: <strong>ADTOPUP2026</strong> (+$0.50)' : 'Built-in code: <strong>ADTOPUP2026</strong> (+$0.50)') + '</p></div>';
        if (FB.ok) {
            FB.db.collection(CONFIG.col.coinCodes).limit(50).get().then(function(snap) {
                html += '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>' + (ar ? '\u0627\u0644\u0631\u0645\u0632' : 'Code') + '</th><th>' + (ar ? '\u0627\u0644\u0645\u0628\u0644\u063A' : 'Amount') + '</th><th>' + (ar ? '\u0627\u0644\u062D\u0627\u0644\u0629' : 'Status') + '</th><th>' + (ar ? '\u0627\u0644\u062A\u062E\u0637\u064A\u0637' : 'Actions') + '</th></tr></thead><tbody>';
                if (snap.empty) html += '<tr><td colspan="4" class="admin-empty">' + (ar ? '\u0644\u0627 \u0631\u0645\u0648\u0632\u0627\u062A' : 'No codes') + '</td></tr>';
                snap.forEach(function(doc) { var cd = doc.data();
                    html += '<tr><td>' + Utils.esc(doc.id) + '</td><td>' + Utils.formatUSD(cd.amount || 0) + '</td><td>' + (cd.redeemed ? '<span class="status-badge status-completed">Used</span>' : '<span class="status-badge status-active">Active</span>') + '</td>';
                    html += '<td><button class="btn-sm btn-danger" onclick="AdminPanel.deleteCode(\'' + doc.id + '\')"><i class="fas fa-trash"></i></button></td></tr>';
                });
                html += '</tbody></table></div>';
                c.innerHTML = html;
            });
        } else { c.innerHTML = html; }
    },
    addCode: function() {
        var code = prompt('Promo code:');
        if (!code) return;
        var amt = prompt('Amount in USD:');
        if (!amt || isNaN(amt)) return;
        FB.db.collection(CONFIG.col.coinCodes).doc(code.toUpperCase()).set({ amount: parseFloat(amt), redeemed: false, createdAt: Date.now() }).then(function() { UI.showToast('Code created', 'success'); AdminPanel.renderCodes(document.getElementById('admin-content')); });
    },
    deleteCode: async function(code) {
        if (!confirm('Delete code ' + code + '?')) return;
        try { await FB.db.collection(CONFIG.col.coinCodes).doc(code).delete(); UI.showToast('Deleted', 'success'); AdminPanel.renderCodes(document.getElementById('admin-content')); } catch (e) { UI.showToast('Error', 'error'); }
    },

    renderSettings: function(c) {
        var ar = I18n.lang === 'ar';
        var html = '<div class="admin-section-header"><h2>' + (ar ? '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A' : 'Settings') + '</h2></div>';
        html += '<div class="admin-settings glass">';
        html += '<h3>' + (ar ? '\u0645\u0639\u0627\u0645\u0644 \u0627\u0644\u0623\u0631\u0628\u062D' : 'Earning Rates') + '</h3>';
        html += '<div class="settings-grid">';
        var rates = [
            { key: 'adWatch', label: ar ? '\u0634\u0627\u0647\u062F \u0625\u0639\u0644\u0627\u0646' : 'Ad Watch', val: CONFIG.earnings.adWatch },
            { key: 'dailyGift', label: ar ? '\u0647\u062F\u064A\u0629 \u064A\u0648\u0645\u064A\u0629' : 'Daily Gift', val: CONFIG.earnings.dailyGift },
            { key: 'visitLink', label: ar ? '\u0632\u064A\u0627\u0631\u0629 \u0631\u0628\u0637' : 'Visit Link', val: CONFIG.earnings.visitLink },
            { key: 'spinMin', label: ar ? '\u062D\u062F \u0627\u0644\u062F\u0648\u0651\u0631\u0629' : 'Spin Min', val: CONFIG.earnings.spinMin },
            { key: 'spinMax', label: ar ? '\u0623\u0642\u0635\u0649 \u0627\u0644\u062F\u0648\u0651\u0631\u0629' : 'Spin Max', val: CONFIG.earnings.spinMax },
            { key: 'referralBonus', label: ar ? '\u0645\u0639\u0645\u0648\u0644 \u0627\u0644\u0625\u062D\u0627\u0644\u0629' : 'Referral Bonus', val: CONFIG.earnings.referralBonus }
        ];
        rates.forEach(function(r) {
            html += '<div class="form-group"><label>' + r.label + ' (USD)</label><input type="number" class="form-input setting-input" data-key="' + r.key + '" value="' + r.val + '" step="0.001" min="0"></div>';
        });
        html += '</div>';
        html += '<button class="btn btn-primary btn-lg" onclick="AdminPanel.saveSettings()"><i class="fas fa-save"></i> ' + (ar ? '\u062D\u0641\u0638' : 'Save') + '</button>';
        html += '</div>';
        c.innerHTML = html;
    },
    saveSettings: function() {
        document.querySelectorAll('.setting-input').forEach(function(inp) {
            var key = inp.dataset.key;
            var val = parseFloat(inp.value);
            if (!isNaN(val) && val >= 0) CONFIG.earnings[key] = val;
        });
        UI.showToast('Settings saved', 'success');
    }
};


// ==================== ROUTER ====================
const Router = {
    routes: {}, current: null, currentParams: null,
    register: function(name, fn) { this.routes[name] = fn; },
    navigate: function(path) { window.location.hash = '#/' + path; },
    renderCurrent: function() { this.resolve(); },
    resolve: function() {
        var hash = window.location.hash.replace(/^#\/?/, '') || 'home';
        var parts = hash.split('/');
        var route = parts[0] || 'home';
        var params = {};
        if (route === 'order' && parts[1]) params.gameId = parts[1];
        this.current = route;
        this.currentParams = params;
        window.scrollTo(0, 0);
        var fn = this.routes[route] || this.routes['notFound'];
        if (fn) fn(params);
    },
    init: function() {
        var self = this;
        window.addEventListener('hashchange', function() { self.resolve(); });
        if (!window.location.hash) window.location.hash = '#/home';
        self.resolve();
    }
};

// ==================== NAVBAR ====================
const Navbar = {
    render: function() {
        var authBtn = document.getElementById('auth-btn');
        var logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.addEventListener('click', function() { Auth.handleLogout(); });
        Auth.updateNav();
    }
};

// ==================== FOOTER GAMES ====================
const FooterGames = {
    render: function() {
        var ft = document.getElementById('footer-games');
        if (!ft) return;
        var games = GamesManager.getAll();
        var list = document.createElement('ul');
        list.className = 'footer-games-list';
        games.slice(0, 8).forEach(function(g) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#/order/' + g.id;
            a.textContent = Utils.t(g.name);
            li.appendChild(a);
            list.appendChild(li);
        });
        ft.innerHTML = '';
        ft.appendChild(list);
    }
};

// ==================== COOKIE CONSENT ====================
const CookieConsent = {
    check: function() {
        var shown = LS.get(CONFIG.keys.cookie);
        if (shown) return;
        setTimeout(function() {
            var banner = document.getElementById('cookie-banner');
            if (banner) {
                banner.classList.add('show');
                var accept = document.getElementById('cookie-accept');
                if (accept) accept.addEventListener('click', function() {
                    LS.set(CONFIG.keys.cookie, true);
                    banner.classList.remove('show');
                });
            }
        }, 2000);
    }
};

// ==================== POINTS MODAL ====================
const PointsModal = {
    open: function() {
        UI.openModal('points-modal');
        var el = document.getElementById('pm-balance');
        if (el) el.textContent = Utils.formatUSD(UserState.balance);
        var el2 = document.getElementById('pm-earned');
        if (el2) el2.textContent = Utils.formatUSD(UserState.earned);
    }
};

// ==================== APP INIT ====================
const App = {
    init: function() {
        console.log('ReWords v3.0 initializing...');
        I18n.init();
        Theme.init();
        FB.init();
        var cachedUser = UserState.load();
        var refParam = new URLSearchParams(window.location.search).get('ref');

        Router.register('home', function(c) { Pages.home(); });
        Router.register('games', function(c) { Pages.games(); });
        Router.register('earn', function(c) { Pages.earn(); });
        Router.register('topup', function(c) { Pages.topupPage(); });
        Router.register('order', function(c) { Pages.order(c); });
        Router.register('referral', function(c) { Pages.referral(); });
        Router.register('profile', function(c) { Pages.profile(); });
        Router.register('support', function(c) { Pages.support(); });
        Router.register('privacy', function(c) { Pages.privacy(); });
        Router.register('terms', function(c) { Pages.terms(); });
        Router.register('admin', function(c) { AdminPanel.render(c); });
        Router.register('login', function(c) { Auth.renderLogin(c); });
        Router.register('register', function(c) { Pages.register ? Pages.register(c) : Auth.renderRegister(c); });
        Router.register('notFound', function(c) { Pages.notFound(c); });

        Navbar.render();
        Auth.init();
        Effects.init();

        GamesManager.load().then(function() {
            FooterGames.render();
            Announcements.load();
        });

        if (refParam && UserState.isLoggedIn()) { ReferralSystem.processReferral(refParam); }
        if (UserState.isLoggedIn()) { UserState.updateUI(); }

        setTimeout(function() {
            var spinWheel = document.getElementById('spin-wheel-overlay');
            if (spinWheel) {
                var closeBtn = document.getElementById('spin-close-overlay');
                if (closeBtn) closeBtn.addEventListener('click', function() {
                    spinWheel.classList.remove('active');
                });
            }
        }, 500);

        this.bindGlobalEvents();
        Router.init();
        UI.hideLoader();
        Effects.reveal();
        console.log('ReWords v3.0 initialized!');
    },
    bindGlobalEvents: function() {
        document.getElementById('lang-switcher')?.addEventListener('click', function() { I18n.toggle(); });
        document.getElementById('theme-toggle')?.addEventListener('click', function() { Theme.toggle(); });
        document.getElementById('effects-toggle')?.addEventListener('click', function() { Effects.toggle(); });
        document.getElementById('points-btn')?.addEventListener('click', function() { PointsModal.open(); });
        document.getElementById('auth-btn')?.addEventListener('click', function() { Router.navigate('login'); });
        document.getElementById('login-modal-btn')?.addEventListener('click', function() { Router.navigate('login'); });
        document.getElementById('register-modal-btn')?.addEventListener('click', function() { Router.navigate('register'); });
        var authModal = document.getElementById('auth-modal');
        if (authModal) {
            authModal.addEventListener('click', function(e) { if (e.target === authModal) authModal.classList.remove('open'); });
        }
    }
};

document.addEventListener('DOMContentLoaded', function() { App.init(); });


