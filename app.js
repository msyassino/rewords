'use strict';
var CONFIG = {
  fb: { apiKey: "AIzaSyBPMbRdVEJ85Is7eg4UkAFs_UHq-BD_Fhg", authDomain: "rewords-45ccf.firebaseapp.com", projectId: "rewords-45ccf", storageBucket: "rewords-45ccf.firebasestorage.app", messagingSenderId: "324257034049", appId: "1:324257034049:web:2e75279382793007683bc0", measurementId: "G-5LNDESBVST" },
  site: { name: "ReWords", url: "https://rewords.alouanepx.workers.dev" },
  coinRate: 10000,
  ads: {
    smartlink: "https://www.effectivecpmnetwork.com/k92kfsc3?key=5558f1cfe654ce78931098e005c15fc7",
    freecash: "https://freecash.com/r/34GRD6",
    freecashBanner: "https://cdn.phototourl.com/free/2026-08-17-d1178f26-4ff4-4f4d-aad0-8b528e531e10.png"
  },
  earn: { adWatch: 50, dailyBase: 100, dailyStreakBonus: 50, dailyMax: 500, visitLink: 80, spinMin: 20, spinMax: 200, referralSignup: 500, referralFirstOffer: 1000, referralFirstWithdraw: 2000 },
  spinCooldown: 86400000,
  limits: { adCooldown: 15000, spinCooldown: 86400000, linkCooldown: 20000, ticketCooldown: 30000, orderCooldown: 10000, promoCooldown: 5000, registerCooldown: 3000 },
  col: { users: "users", wallets: "wallets", ledger: "ledger", games: "games", offers: "offers", conversions: "conversions", orders: "orders", withdrawals: "withdrawals", referrals: "referrals", dailyRewards: "dailyRewards", notifications: "notifications", tickets: "tickets", announcements: "announcements", promoCodes: "promoCodes", settings: "settings", fraudEvents: "fraudEvents", adminActions: "adminActions", postbacks: "postbacks", devices: "devices", campaigns: "campaigns" },
  defaultGames: [
    { id: "freefire", name: { en: "Free Fire", ar: "\u0641\u0631\u064A \u0641\u0627\u064A\u0631" }, icon: "fa-fire", color: "#FF6B35", currency: { en: "Diamonds", ar: "\u062C\u0648\u0627\u0647\u0631" }, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop", active: true, order: 1, packages: [{ id: "ff1", amount: "108 \uD83D\uDC8E", coins: 9900, price: 0.99 }, { id: "ff2", amount: "310 \uD83D\uDC8E", coins: 29900, price: 2.99 }, { id: "ff3", amount: "520 \uD83D\uDC8E", coins: 49900, price: 4.99, popular: true }, { id: "ff4", amount: "1080 \uD83D\uDC8E", coins: 99900, price: 9.99 }, { id: "ff5", amount: "2200 \uD83D\uDC8E", coins: 199900, price: 19.99 }, { id: "ff6", amount: "5600 \uD83D\uDC8E", coins: 499900, price: 49.99 }] },
    { id: "pubg", name: { en: "PUBG Mobile", ar: "\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644" }, icon: "fa-crosshairs", color: "#F2A900", currency: { en: "UC", ar: "\u064A\u0648 \u0633\u064A" }, image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop", active: true, order: 2, packages: [{ id: "pb1", amount: "60 UC", coins: 9900, price: 0.99 }, { id: "pb2", amount: "325 UC", coins: 49900, price: 4.99 }, { id: "pb3", amount: "660 UC", coins: 99900, price: 9.99, popular: true }, { id: "pb4", amount: "1800 UC", coins: 249900, price: 24.99 }, { id: "pb5", amount: "3850 UC", coins: 499900, price: 49.99 }] },
    { id: "ml", name: { en: "Mobile Legends", ar: "\u0645\u0648\u0628\u0627\u064A\u0644 \u0644\u064A\u062C\u0646\u0630\u0632" }, icon: "fa-shield-halved", color: "#4A90D9", currency: { en: "Diamonds", ar: "\u062C\u0648\u0627\u0647\u0631" }, image: "https://images.unsplash.com/photo-1511515800041-10d8c01d8b21?w=400&h=225&fit=crop", active: true, order: 3, packages: [{ id: "ml1", amount: "86 \uD83D\uDC8E", coins: 14900, price: 1.49 }, { id: "ml2", amount: "172 \uD83D\uDC8E", coins: 29900, price: 2.99 }, { id: "ml3", amount: "257 \uD83D\uDC8E", coins: 44900, price: 4.49 }, { id: "ml4", amount: "706 \uD83D\uDC8E", coins: 119900, price: 11.99, popular: true }] },
    { id: "roblox", name: { en: "Roblox", ar: "\u0631\u0648\u0628\u0644\u0648\u0643\u0633" }, icon: "fa-cubes", color: "#E2231A", currency: { en: "Robux", ar: "\u0631\u0648\u0628\u0648\u0643\u0633" }, image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=225&fit=crop", active: true, order: 4, packages: [{ id: "rb1", amount: "400 Robux", coins: 49900, price: 4.99 }, { id: "rb2", amount: "800 Robux", coins: 99900, price: 9.99 }, { id: "rb3", amount: "1700 Robux", coins: 199900, price: 19.99, popular: true }] },
    { id: "cod", name: { en: "COD Mobile", ar: "\u0643\u0648\u062F \u0645\u0648\u0628\u0627\u064A\u0644" }, icon: "fa-gun", color: "#00E676", currency: { en: "CP", ar: "\u0633\u064A \u0628\u064A" }, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop", active: true, order: 5, packages: [{ id: "cd1", amount: "80 CP", coins: 9900, price: 0.99 }, { id: "cd2", amount: "400 CP", coins: 49900, price: 4.99 }, { id: "cd3", amount: "880 CP", coins: 99900, price: 9.99, popular: true }] },
    { id: "genshin", name: { en: "Genshin Impact", ar: "\u062C\u064A\u0646\u0634\u0646 \u0625\u0645\u0628\u0627\u0643\u062A" }, icon: "fa-wand-sparkles", color: "#9B59B6", currency: { en: "Crystals", ar: "\u0643\u0631\u064A\u0633\u062A\u0627\u0644\u0627\u062A" }, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop", active: true, order: 6, packages: [{ id: "gs1", amount: "60 Crystals", coins: 9900, price: 0.99 }, { id: "gs2", amount: "330 Crystals", coins: 49900, price: 4.99 }, { id: "gs3", amount: "1090 Crystals", coins: 149900, price: 14.99, popular: true }] },
    { id: "clash", name: { en: "Clash of Clans", ar: "\u0643\u0644\u0627\u0634 \u0623\u0648\u0641 \u0643\u0644\u0627\u0646\u0633" }, icon: "fa-chess-rook", color: "#FF9800", currency: { en: "Gems", ar: "\u062C\u0648\u0627\u0647\u0631" }, image: "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=400&h=225&fit=crop", active: true, order: 7, packages: [{ id: "cc1", amount: "500 Gems", coins: 49900, price: 4.99 }, { id: "cc2", amount: "1200 Gems", coins: 99900, price: 9.99, popular: true }, { id: "cc3", amount: "2500 Gems", coins: 199900, price: 19.99 }] },
    { id: "fortnite", name: { en: "Fortnite", ar: "\u0641\u0648\u0631\u062A\u0646\u0627\u064A\u062A" }, icon: "fa-bolt", color: "#00BCD4", currency: { en: "V-Bucks", ar: "\u0641\u064A-\u0628\u0643\u0633" }, image: "https://images.unsplash.com/photo-1589241062272-c0a69e70cc2d?w=400&h=225&fit=crop", active: true, order: 8, packages: [{ id: "fn1", amount: "1000 V-Bucks", coins: 79900, price: 7.99 }, { id: "fn2", amount: "2800 V-Bucks", coins: 199900, price: 19.99, popular: true }] }
  ]
};

var U = {
  esc: function(s) { if (typeof s !== "string") return ""; var d = document.createElement("div"); d.textContent = s; return d.innerHTML; },
  t: function(o) { if (!o) return ""; return typeof o === "string" ? o : (o[I18n.lang] || o.en || ""); },
  id: function() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 8); },
  refCode: function() { var c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", r = ""; for (var i = 0; i < 6; i++) r += c[Math.floor(Math.random() * c.length)]; return r; },
  email: function(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); },
  playerId: function(s) { return /^[a-zA-Z0-9_]{4,30}$/.test(s); },
  today: function() { return new Date().toDateString(); },
  coins: function(n) { return Number(n || 0).toLocaleString() + " coins"; },
  usd: function(n) { return "$" + (Number(n || 0)).toFixed(2); },
  coinsToUsd: function(c) { return (Number(c || 0) / CONFIG.coinRate).toFixed(2); },
  usdToCoins: function(u) { return Math.round(Number(u || 0) * CONFIG.coinRate); },
  date: function(ts) { try { return new Date(ts).toLocaleDateString(I18n.lang === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } },
  sanitize: function(s) { return String(s || "").replace(/[<>"'&]/g, function(c) { return { "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;", "&": "&amp;" }[c] || c; }); },
  rateLimit: function(k, ms) { var last = LS.get("rl_" + k, 0); if (Date.now() - last < ms) return false; LS.set("rl_" + k, Date.now()); return true; },
  observe: function() { var obs = new IntersectionObserver(function(es) { es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add("visible"); }); }, { threshold: 0.1 }); document.querySelectorAll(".reveal:not(.visible)").forEach(function(el) { obs.observe(el); }); }
};

var LS = {
  get: function(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : (d === undefined ? null : d); } catch (e) { return d === undefined ? null : d; } },
  set: function(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  rm: function(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

var FB = {
  db: null, auth: null, ok: false, user: null, ready: null,
  init: function() {
    try {
      if (typeof firebase !== "undefined" && firebase.initializeApp) {
        firebase.initializeApp(CONFIG.fb);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.ok = true;
        this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function() {});
        var self = this;
        this.ready = new Promise(function(r) { self.auth.onAuthStateChanged(function(u) { self.user = u; r(u); }); });
      }
    } catch (e) { this.ok = false; }
  },
  waitFor: function() { return this.ready || Promise.resolve(null); }
};

var I18n = {
  lang: "en",
  init: function() { this.lang = LS.get("rw_lang") || (navigator.language.startsWith("ar") ? "ar" : "en"); this.apply(); },
  toggle: function() { this.lang = this.lang === "en" ? "ar" : "en"; LS.set("rw_lang", this.lang); this.apply(); Router.go(Router.current); },
  apply: function() { var rtl = this.lang === "ar"; document.documentElement.lang = this.lang; document.documentElement.dir = rtl ? "rtl" : "ltr"; var l = document.querySelector(".lang-label"); if (l) l.textContent = this.lang === "en" ? "AR" : "EN"; }
};

var Theme = {
  mode: "dark",
  init: function() { this.mode = LS.get("rw_theme", "dark"); this.apply(false); },
  apply: function(save) { document.body.classList.toggle("light", this.mode === "light"); var i = document.querySelector("#theme-btn i"); if (i) i.className = this.mode === "light" ? "fas fa-moon" : "fas fa-sun"; if (save !== false) LS.set("rw_theme", this.mode); },
  toggle: function() { this.mode = this.mode === "dark" ? "light" : "dark"; this.apply(); }
};

var UI = {
  hideLoader: function() { var l = document.getElementById("loader"); if (l) { l.classList.add("hidden"); setTimeout(function() { l.style.display = "none"; }, 600); } },
  toast: function(msg, type, dur) {
    type = type || "info"; dur = dur || 3500;
    var c = document.getElementById("toast-container"); if (!c) return;
    var icons = { success: "fa-check-circle", error: "fa-exclamation-circle", warning: "fa-exclamation-triangle", info: "fa-info-circle" };
    var t = document.createElement("div"); t.className = "toast " + type;
    t.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i><span>' + U.esc(msg) + '</span>';
    c.appendChild(t); setTimeout(function() { t.classList.add("hide"); setTimeout(function() { t.remove(); }, 300); }, dur);
  },
  openModal: function(id) { var m = document.getElementById(id); if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; } },
  closeModal: function(id) { var m = document.getElementById(id); if (m) { m.classList.remove("open"); document.body.style.overflow = ""; } },
  closeAll: function() { document.querySelectorAll(".modal.open").forEach(function(m) { m.classList.remove("open"); }); document.body.style.overflow = ""; }
};

var FX = {
  on: true, raf: null,
  init: function() { this.on = LS.get("rw_fx", true) !== false; document.body.classList.toggle("fx-off", !this.on); if (this.on) this.particles(); },
  toggle: function() { this.on = !this.on; LS.set("rw_fx", this.on); document.body.classList.toggle("fx-off", !this.on); if (this.on) this.particles(); else this.stop(); },
  particles: function() {
    this.stop(); var c = document.getElementById("particles-canvas"); if (!c) return;
    var ctx = c.getContext("2d"), w, h;
    var resize = function() { c.width = w = window.innerWidth; c.height = h = window.innerHeight; }; resize();
    window.addEventListener("resize", resize);
    var n = Math.min(15, Math.floor(w / 60));
    var pts = []; for (var i = 0; i < n; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + 0.5, dx: (Math.random() - 0.5) * 0.15, dy: (Math.random() - 0.5) * 0.15, o: Math.random() * 0.15 + 0.05 });
    var self = this;
    var draw = function() { if (!self.on) return; ctx.clearRect(0, 0, w, h); var rgb = document.body.classList.contains("light") ? "46,123,255" : "91,159,255"; pts.forEach(function(p) { p.x += p.dx; p.y += p.dy; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fillStyle = "rgba(" + rgb + "," + p.o + ")"; ctx.fill(); }); self.raf = requestAnimationFrame(draw); }; draw();
  },
  stop: function() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = null; } }
};


var Ledger = {
  add: async function(userId, type, amount, desc, refId, provider) {
    var wallet = await Wallet.get(userId);
    var before = wallet.available;
    var change = Number(amount);
    var after = before + change;
    if (after < 0) after = 0;
    var entry = { id: U.id(), userId: userId, type: type, amount: change, balanceBefore: before, balanceAfter: after, description: desc || "", refId: refId || "", provider: provider || "", timestamp: Date.now(), serverVerified: false };
    if (FB.ok) {
      try { await FB.db.collection(CONFIG.col.ledger).doc(entry.id).set(entry); } catch (e) {}
    }
    return entry;
  },
  getUserEntries: async function(userId, limit) {
    if (!FB.ok) return [];
    try {
      var snap = await FB.db.collection(CONFIG.col.ledger).where("userId", "==", userId).orderBy("timestamp", "desc").limit(limit || 50).get();
      var entries = []; snap.forEach(function(d) { entries.push(d.data()); }); return entries;
    } catch (e) { return []; }
  }
};

var Wallet = {
  cache: null,
  defaults: function() { return { available: 0, pending: 0, locked: 0, lifetimeEarned: 0, lifetimeSpent: 0, lifetimeWithdrawn: 0 }; },
  get: async function(userId) {
    if (this.cache && this.cache.userId === userId) return this.cache;
    if (FB.ok) {
      try {
        var doc = await FB.db.collection(CONFIG.col.wallets).doc(userId).get();
        if (doc.exists) { this.cache = doc.data(); this.cache.userId = userId; return this.cache; }
      } catch (e) {}
    }
    var w = this.defaults(); w.userId = userId; this.cache = w; return w;
  },
  save: async function(userId, wallet) {
    wallet.userId = userId; this.cache = wallet;
    if (FB.ok) {
      try { await FB.db.collection(CONFIG.col.wallets).doc(userId).set(wallet, { merge: true }); } catch (e) {}
    }
    LS.set("rw_wallet_" + userId, wallet);
  },
  earn: async function(userId, type, amount, desc, refId, provider) {
    amount = Number(amount); if (amount <= 0) return false;
    var w = await this.get(userId);
    w.available += amount;
    w.lifetimeEarned += amount;
    await this.save(userId, w);
    await Ledger.add(userId, type, amount, desc, refId, provider);
    this.updateUI(w);
    return true;
  },
  spend: async function(userId, type, amount, desc, refId) {
    amount = Number(amount); if (amount <= 0) return false;
    var w = await this.get(userId);
    if (w.available < amount) return false;
    w.available -= amount;
    w.lifetimeSpent += amount;
    await this.save(userId, w);
    await Ledger.add(userId, type, -amount, desc, refId);
    this.updateUI(w);
    return true;
  },
  updateUI: function(w) {
    if (!w) return;
    var el = document.getElementById("nav-coins");
    if (el) el.textContent = Number(w.available || 0).toLocaleString();
    document.querySelectorAll("[data-coins]").forEach(function(e) { e.textContent = Number(w.available || 0).toLocaleString(); });
  },
  toUsd: function(coins) { return (Number(coins || 0) / CONFIG.coinRate).toFixed(2); }
};

var Auth = {
  mode: "login",
  init: function() {
    if (!FB.ok) return;
    var self = this;
    FB.auth.onAuthStateChanged(function(user) {
      if (user) {
        FB.user = user;
        self.loadProfile(user.uid);
        LS.set("rw_uid", user.uid);
      } else {
        FB.user = null; UserState.profile = null; LS.rm("rw_uid"); self.updateNav();
      }
    });
  },
  initListener: function() { this.init(); },
  loadProfile: async function(uid) {
    if (!FB.ok || !uid) return;
    try {
      var doc = await FB.db.collection(CONFIG.col.users).doc(uid).get();
      if (doc.exists) {
        UserState.profile = doc.data(); UserState.profile.uid = uid;
        LS.set("rw_profile_" + uid, UserState.profile);
      } else {
        var p = UserState.defaults();
        p.displayName = (FB.user && FB.user.displayName) ? FB.user.displayName : (FB.user ? FB.user.email.split("@")[0] : "User");
        p.email = FB.user ? FB.user.email : "";
        p.refCode = U.refCode();
        p.country = "Global";
        p.verificationStatus = "pending";
        await FB.db.collection(CONFIG.col.users).doc(uid).set(p, { merge: true });
        UserState.profile = p; UserState.profile.uid = uid;
      }
      var w = await Wallet.get(uid);
      Wallet.updateUI(w);
      this.updateNav();
      if (UserState.profile && UserState.profile.role === "admin") {
        var al = document.getElementById("admin-link"); if (al) al.style.display = "";
      }
    } catch (e) { console.error("Profile error:", e); }
  },
  login: async function(email, pass) {
    if (!FB.ok) { UI.toast("Service unavailable", "error"); return false; }
    if (!U.email(email)) { UI.toast("Invalid email", "error"); return false; }
    if (!pass || pass.length < 6) { UI.toast("Password too short", "error"); return false; }
    try {
      var cred = await FB.auth.signInWithEmailAndPassword(email, pass);
      if (cred.user) {
        await AntiFraud.trackLogin(cred.user.uid);
        var doc = await FB.db.collection(CONFIG.col.users).doc(cred.user.uid).get();
        if (doc.exists && doc.data().banned) { UI.toast("Account suspended", "error"); await FB.auth.signOut(); return false; }
      }
      UI.closeAll(); UI.toast("Welcome back!", "success");
      return true;
    } catch (e) {
      var msg = "Login failed";
      if (e.code === "auth/user-not-found") msg = "No account found";
      else if (e.code === "auth/wrong-password") msg = "Wrong password";
      else if (e.code === "auth/too-many-requests") msg = "Too many attempts";
      UI.toast(msg, "error"); return false;
    }
  },
  register: async function(name, email, pass, ref) {
    if (!FB.ok) { UI.toast("Service unavailable", "error"); return false; }
    if (!name || name.length < 2) { UI.toast("Name too short", "error"); return false; }
    if (!U.email(email)) { UI.toast("Invalid email", "error"); return false; }
    if (!pass || pass.length < 6) { UI.toast("Password 6+ chars", "error"); return false; }
    try {
      var cred = await FB.auth.createUserWithEmailAndPassword(email, pass);
      await cred.user.updateProfile({ displayName: name });
      var p = UserState.defaults();
      p.displayName = name; p.email = email; p.refCode = U.refCode();
      p.country = "Global"; p.verificationStatus = "pending";
      await FB.db.collection(CONFIG.col.users).doc(cred.user.uid).set(p, { merge: true });
      var w = Wallet.defaults();
      await FB.db.collection(CONFIG.col.wallets).doc(cred.user.uid).set(w, { merge: true });
      UserState.profile = p; UserState.profile.uid = cred.user.uid;
      Wallet.updateUI(w);
      await Wallet.earn(cred.user.uid, "signup_bonus", 500, "Welcome bonus");
      await Notifications.add(cred.user.uid, "welcome", "Welcome to ReWords!", "You received 500 coins as a welcome bonus!");
      if (ref) ReferralSystem.processSignup(ref, cred.user.uid);
      UI.closeAll(); UI.toast("Welcome! 500 coins added!", "success");
      return true;
    } catch (e) {
      var msg = "Registration failed";
      if (e.code === "auth/email-already-in-use") msg = "Email already registered";
      UI.toast(msg, "error"); return false;
    }
  },
  logout: async function() {
    if (FB.ok && FB.auth) { try { await FB.auth.signOut(); } catch (e) {} }
    LS.rm("rw_profile_" + LS.get("rw_uid", "")); LS.rm("rw_wallet_" + LS.get("rw_uid", "")); LS.rm("rw_uid");
    UserState.profile = null; Wallet.cache = null;
    Wallet.updateUI({ available: 0 }); this.updateNav(); UI.toast("Logged out", "info"); Router.go("home");
  },
  updateNav: function() {
    var authBtn = document.getElementById("auth-btn");
    var logoutBtn = document.getElementById("logout-btn");
    var avatar = document.getElementById("nav-avatar");
    var notifBtn = document.getElementById("notif-btn");
    var adminLink = document.getElementById("admin-link");
    if (UserState.isLoggedIn()) {
      if (authBtn) authBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "";
      if (avatar) { avatar.style.display = ""; var img = document.getElementById("nav-avatar-img"); if (img) img.src = UserState.profile && UserState.profile.photo ? UserState.profile.photo : "https://ui-avatars.com/api/?name=" + encodeURIComponent(UserState.profile.displayName || "U") + "&background=5B9FFF&color=fff&size=36"; }
      if (notifBtn) notifBtn.style.display = "";
      if (adminLink && UserState.isAdmin()) adminLink.style.display = "";
    } else {
      if (authBtn) authBtn.style.display = "";
      if (logoutBtn) logoutBtn.style.display = "none";
      if (avatar) avatar.style.display = "none";
      if (notifBtn) notifBtn.style.display = "none";
      if (adminLink) adminLink.style.display = "none";
    }
  }
};

var UserState = {
  profile: null,
  defaults: function() {
    return { displayName: "", email: "", photo: "", role: "user", country: "Global", level: 1, xp: 0, refCode: "", referredBy: "", verificationStatus: "pending", riskScore: 0, banned: false, banReason: "", totalOffers: 0, totalWithdrawals: 0, streak: 0, lastLogin: 0, badges: [], devices: [], createdAt: Date.now() };
  },
  isLoggedIn: function() { return !!(FB.ok && FB.user); },
  isAdmin: function() { return this.profile && (this.profile.role === "admin" || this.profile.role === "super_admin"); },
  addXP: function(amount) {
    if (!this.profile) return;
    this.profile.xp = (this.profile.xp || 0) + amount;
    var xpNeeded = this.profile.level * 500;
    while (this.profile.xp >= xpNeeded) { this.profile.xp -= xpNeeded; this.profile.level++; xpNeeded = this.profile.level * 500; UI.toast("Level up! Level " + this.profile.level, "success"); }
    this.sync();
  },
  sync: function() {
    if (!FB.ok || !FB.user || !this.profile) return;
    FB.db.collection(CONFIG.col.users).doc(FB.user.uid).set(this.profile, { merge: true }).catch(function() {});
  }
};

var GamesManager = {
  games: [], loaded: false,
  load: async function() {
    if (!FB.ok) { this.games = CONFIG.defaultGames.filter(function(g) { return g.active; }); this.loaded = true; return; }
    try {
      var snap = await FB.db.collection(CONFIG.col.games).orderBy("order").get();
      if (snap.empty) {
        var batch = FB.db.batch();
        CONFIG.defaultGames.forEach(function(g) { batch.set(FB.db.collection(CONFIG.col.games).doc(g.id), g); });
        await batch.commit();
        this.games = CONFIG.defaultGames.filter(function(g) { return g.active; });
      } else {
        this.games = [];
        var self = this;
        snap.forEach(function(doc) { var g = doc.data(); if (g.active !== false) self.games.push(g); });
      }
      this.loaded = true;
    } catch (e) { this.games = CONFIG.defaultGames; this.loaded = true; }
  },
  getAll: function() { return this.games; },
  getById: function(id) { var f = null; this.games.forEach(function(g) { if (g.id === id) f = g; }); return f; },
  getAllRaw: async function() {
    if (!FB.ok) return CONFIG.defaultGames;
    try { var snap = await FB.db.collection(CONFIG.col.games).orderBy("order").get(); var games = []; snap.forEach(function(d) { games.push(d.data()); }); return games; } catch (e) { return CONFIG.defaultGames; }
  }
};

var DailyRewards = {
  getStreak: function() {
    if (!UserState.profile) return 0;
    var last = UserState.profile.lastDailyClaim || 0;
    var streak = UserState.profile.streak || 0;
    var now = Date.now();
    var dayMs = 86400000;
    if (now - last > dayMs * 2) { streak = 0; }
    return streak;
  },
  canClaim: function() {
    if (!UserState.profile) return false;
    var last = UserState.profile.lastDailyClaim || 0;
    return Date.now() - last >= 86400000;
  },
  claim: async function() {
    if (!UserState.isLoggedIn()) { UI.toast("Sign in first", "warning"); return; }
    if (!this.canClaim()) { UI.toast("Come back tomorrow!", "warning"); return; }
    if (!U.rateLimit("daily", 5000)) return;
    var streak = this.getStreak();
    var newStreak = streak + 1;
    var coins = CONFIG.earn.dailyBase + Math.min((newStreak - 1) * CONFIG.earn.dailyStreakBonus, CONFIG.earn.dailyMax - CONFIG.earn.dailyBase);
    if (newStreak >= 7) coins += 200;
    if (newStreak >= 30) coins += 1000;
    await Wallet.earn(FB.user.uid, "daily_reward", coins, "Daily reward - Streak " + newStreak);
    UserState.profile.streak = newStreak;
    UserState.profile.lastDailyClaim = Date.now();
    UserState.profile.dailyGifts = (UserState.profile.dailyGifts || 0) + 1;
    UserState.addXP(25);
    UserState.sync();
    await Notifications.add(FB.user.uid, "daily", "Daily Reward Claimed!", "You earned " + U.coins(coins) + " (Streak: " + newStreak + " days)");
    UI.toast("+" + U.coins(coins) + " (Streak: " + newStreak + ")", "success");
    Achievements.check();
    return coins;
  },
  getMultiplier: function() { var s = this.getStreak(); if (s >= 30) return 2.0; if (s >= 14) return 1.5; if (s >= 7) return 1.25; if (s >= 3) return 1.1; return 1.0; }
};

var SpinWheel = {
  prizes: [20, 40, 60, 80, 100, 120, 150, 200],
  colors: ["#FF6B35", "#5B9FFF", "#FF2E63", "#00FF9D", "#8B5CF6", "#FFE600", "#00BCD4", "#FF9800"],
  spinning: false,
  getPrizes: function() { return this.prizes; },
  canSpin: function() {
    if (!UserState.profile) return false;
    var last = UserState.profile.lastSpin || 0;
    return Date.now() - last >= CONFIG.spinCooldown;
  },
  spin: async function() {
    if (this.spinning) return;
    if (!UserState.isLoggedIn()) { UI.toast("Sign in first", "warning"); return; }
    if (!this.canSpin()) { UI.toast("Come back tomorrow!", "warning"); return; }
    if (!U.rateLimit("spin", 5000)) return;
    this.spinning = true;
    var idx = Math.floor(Math.random() * this.prizes.length);
    var coins = this.prizes[idx];
    await Wallet.earn(FB.user.uid, "spin", coins, "Spin wheel reward");
    UserState.profile.lastSpin = Date.now();
    UserState.profile.totalSpins = (UserState.profile.totalSpins || 0) + 1;
    UserState.addXP(15);
    UserState.sync();
    await Notifications.add(FB.user.uid, "spin", "Spin Wheel!", "You won " + U.coins(coins));
    UI.toast("+" + U.coins(coins) + " from spin!", "success");
    this.spinning = false;
    Achievements.check();
    return { idx: idx, coins: coins };
  }
};

var ReferralSystem = {
  processSignup: async function(code, newUid) {
    if (!FB.ok || !code || !newUid) return;
    try {
      var snap = await FB.db.collection(CONFIG.col.users).where("refCode", "==", code).limit(1).get();
      if (snap.empty) return;
      var refDoc = snap.docs[0];
      if (refDoc.id === newUid) return;
      var newProfile = await FB.db.collection(CONFIG.col.users).doc(newUid).get();
      if (newProfile.exists && newProfile.data().referredBy) return;
      await FB.db.collection(CONFIG.col.users).doc(newUid).update({ referredBy: refDoc.id });
      await Wallet.earn(refDoc.id, "referral_signup", CONFIG.earn.referralSignup, "Referral: new user signup");
      var refData = refDoc.data();
      await FB.db.collection(CONFIG.col.users).doc(refDoc.id).update({ referrals: (refData.referrals || 0) + 1 });
      await Notifications.add(refDoc.id, "referral", "New Referral!", "A friend signed up using your code! +" + U.coins(CONFIG.earn.referralSignup));
      UI.toast("Referral bonus credited!", "success");
    } catch (e) { console.error("Referral error:", e); }
  },
  processFirstOffer: async function(referrerId) {
    if (!referrerId) return;
    await Wallet.earn(referrerId, "referral_first_offer", CONFIG.earn.referralFirstOffer, "Referral: friend completed first offer");
    await Notifications.add(referrerId, "referral", "Referral Milestone!", "Your referral completed their first offer! +" + U.coins(CONFIG.earn.referralFirstOffer));
  },
  getLink: function() {
    if (!UserState.profile || !UserState.profile.refCode) return "";
    return CONFIG.site.url + "?ref=" + UserState.profile.refCode;
  }
};

var Achievements = {
  list: [
    { id: "first_offer", name: { en: "First Steps", ar: "\u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u0629" }, icon: "fa-star", desc: { en: "Complete your first offer", ar: "\u0623\u0646\u062C\u0632 \u0623\u0648\u0644 \u0639\u0631\u0636" }, reward: 100, check: function(p) { return (p.totalOffers || 0) >= 1; } },
    { id: "streak_7", name: { en: "Week Warrior", ar: "\u0645\u0646\u0627\u0635\u0631 \u0627\u0644\u0623\u0633\u0628\u0648\u0639" }, icon: "fa-fire", desc: { en: "7-day streak", ar: "\u0633\u0643\u0629 7 \u0623\u064A\u0627\u0645" }, reward: 500, check: function(p) { return (p.streak || 0) >= 7; } },
    { id: "streak_30", name: { en: "Monthly Master", ar: "\u0645\u0627\u0644\u0643 \u0627\u0644\u0634\u0647\u0631\u064A" }, icon: "fa-crown", desc: { en: "30-day streak", ar: "\u0633\u0643\u0629 30 \u064A\u0648\u0645" }, reward: 5000, check: function(p) { return (p.streak || 0) >= 30; } },
    { id: "offers_10", name: { en: "Offer Pro", ar: "\u0627\u0644\u0645\u062D\u062A\u0631\u0641" }, icon: "fa-trophy", desc: { en: "Complete 10 offers", ar: "\u0623\u0646\u062C\u0632 10 \u0639\u0631\u0648\u0636" }, reward: 1000, check: function(p) { return (p.totalOffers || 0) >= 10; } },
    { id: "level_5", name: { en: "Rising Star", ar: "\u0646\u062C\u0645\u064E \u0635\u0627\u0639\u0631" }, icon: "fa-arrow-up", desc: { en: "Reach Level 5", ar: "\u0627\u0628\u0644\u063A \u0627\u0644\u0645\u0633\u062A\u0648\u064A 5" }, reward: 200, check: function(p) { return (p.level || 1) >= 5; } },
    { id: "level_10", name: { en: "Veteran", ar: "\u0645\u062D\u062A\u0631\u0641" }, icon: "fa-medal", desc: { en: "Reach Level 10", ar: "\u0627\u0628\u0644\u063A \u0627\u0644\u0645\u0633\u062A\u0648\u064A 10" }, reward: 1000, check: function(p) { return (p.level || 1) >= 10; } }
  ],
  check: async function() {
    if (!UserState.isLoggedIn() || !UserState.profile) return;
    var p = UserState.profile;
    if (!p.badges) p.badges = [];
    var self = this;
    this.list.forEach(function(ach) {
      if (p.badges.indexOf(ach.id) === -1 && ach.check(p)) {
        p.badges.push(ach.id);
        Wallet.earn(p.uid, "achievement", ach.reward, "Achievement: " + U.t(ach.name));
        UI.toast("Achievement: " + U.t(ach.name) + "! +" + U.coins(ach.reward), "success");
      }
    });
    UserState.sync();
  }
};

var Notifications = {
  add: async function(userId, type, title, message) {
    var notif = { id: U.id(), userId: userId, type: type, title: title, message: message, read: false, createdAt: Date.now() };
    if (FB.ok) {
      try { await FB.db.collection(CONFIG.col.notifications).doc(notif.id).set(notif); } catch (e) {}
    }
    return notif;
  },
  get: async function(userId, limit) {
    if (!FB.ok) return [];
    try {
      var snap = await FB.db.collection(CONFIG.col.notifications).where("userId", "==", userId).orderBy("createdAt", "desc").limit(limit || 20).get();
      var list = []; snap.forEach(function(d) { list.push(d.data()); }); return list;
    } catch (e) { return []; }
  },
  getAll: function() {
    if (!FB.ok || !FB.user) return [];
    var cached = LS.get("rw_notifs_" + FB.user.uid);
    if (cached) return cached;
    this.get(FB.user.uid, 50).then(function(list) {
      if (FB.user) LS.set("rw_notifs_" + FB.user.uid, list);
    });
    return [];
  },
  getFaq: function(limit) {
    return [
      { q: { en: "How do I earn coins?", ar: "\u0643\u064a\u0641 \u0623\u0643\u0633\u0628 \u0639\u0646\u0627\u0626\u0631 \u0627\u0644\u0636\u0645\u0627\u0639\u0629\u061F" }, a: { en: "Complete offers, surveys, watch ads, spin the wheel, and claim daily rewards.", ar: "\u0623\u0646\u062C\u0632 \u0627\u0644\u0639\u0631\u0648\u0636\u060c \u0627\u0644\u0627\u0633\u062A\u062E\u0628\u0627\u0631\u0627\u062a\u060c \u0634\u0627\u0647\u062F \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a\u060c \u0627\u0644\u062F\u0648\u0631\u0627\u0646 \u0627\u0644\u064A\u0648\u0645\u064A\u060c \u0648\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0627\u0645\u064A\u0629." } },
      { q: { en: "What is the coin rate?", ar: "\u0645\u0627 \u0645\u0639\u062F\u0644 \u0633\u0639\u0631 \u0627\u0644\u0636\u0645\u0639\u0629\u061F" }, a: { en: "10,000 coins = $1.00 USD.", ar: "10,000 \u0636\u0645\u0639\u0629 = 1$ \u0623\u0645\u0631\u064A\u0643\u064A." } },
      { q: { en: "How do withdrawals work?", ar: "\u0643\u064a\u0641 \u062a\u0639\u0645\u0644 \u0627\u0644\u0633\u062D\u0628\u0627\u062A\u061F" }, a: { en: "Request a withdrawal from your wallet. It will be reviewed and processed within 24-48 hours.", ar: "\u0637\u0644\u0628 \u0633\u062D\u0628 \u0645\u0646 \u0645\u062D\u0641\u0638\u062A\u0643. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0648\u0645\u0639\u0627\u0644\u062C\u062A\u0647 \u062E\u0644\u0627\u0644 24-48 \u0633\u0627\u0639\u0629." } },
      { q: { en: "Can I have multiple accounts?", ar: "\u0647\u0644 \u064A\u0645\u0643\u0646\u0646\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062A\u0639\u062F\u062F\u0629\u061F" }, a: { en: "No. One account per person. Multiple accounts will be banned.", ar: "\u0644\u0627. \u062D\u0633\u0627\u0628 \u0648\u0627\u062D\u062F \u0644\u0643\u0644 \u0634\u062E\u0635. \u0633\u064A\u062A\u0645 \u062D\u0638\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u062F\u062F\u0629." } },
      { q: { en: "How do referrals work?", ar: "\u0643\u064a\u0641 \u062a\u0639\u0645\u0644 \u0627\u0644\u0625\u062D\u0627\u0644\u0629\u061F" }, a: { en: "Share your referral code. Earn 500 coins per signup, 1000 for first offer, 2000 for first withdrawal.", ar: "\u0634\u0627\u0631\u0643 \u0631\u0645\u0632 \u0627\u0644\u0625\u062D\u0627\u0644\u0629. \u0627\u0643\u0633\u0628 500 \u0636\u0645\u0639\u0629 \u0644\u0643\u0644 \u062A\u0633\u062C\u064A\u0644\u060c 1000 \u0644\u0623\u0648\u0644 \u0639\u0631\u0636\u060c 2000 \u0644\u0623\u0648\u0644 \u0633\u062D\u0628\u0629." } }
    ].slice(0, limit || 5);
  },
  getUnreadCount: async function(userId) {
    if (!FB.ok) return 0;
    try {
      var snap = await FB.db.collection(CONFIG.col.notifications).where("userId", "==", userId).where("read", "==", false).get();
      return snap.size;
    } catch (e) { return 0; }
  }
};

var Tickets = {
  submit: async function(subject, message) {
    if (!UserState.isLoggedIn()) { UI.toast("Sign in first", "warning"); return false; }
    if (!subject || subject.length < 3) { UI.toast("Subject too short", "error"); return false; }
    if (!message || message.length < 10) { UI.toast("Message too short", "error"); return false; }
    if (!U.rateLimit("ticket", CONFIG.limits.ticketCooldown)) { UI.toast("Wait before sending again", "warning"); return false; }
    var ticket = { id: U.id(), userId: FB.user.uid, email: UserState.profile.email, displayName: UserState.profile.displayName, subject: U.sanitize(subject), message: U.sanitize(message), status: "open", priority: "normal", replies: [], createdAt: Date.now(), updatedAt: Date.now() };
    try { await FB.db.collection(CONFIG.col.tickets).doc(ticket.id).set(ticket); UI.toast("Ticket submitted!", "success"); return true; } catch (e) { UI.toast("Error", "error"); return false; }
  }
};

var AntiFraud = {
  trackLogin: async function(uid) {
    if (!FB.ok) return;
    try {
      var deviceInfo = { uid: uid, userAgent: navigator.userAgent, timestamp: Date.now(), ip: "" };
      await FB.db.collection(CONFIG.col.devices).doc(U.id()).set(deviceInfo);
    } catch (e) {}
  },
  checkDuplicate: async function(uid) { return false; },
  getRiskScore: function(profile) {
    var score = 0;
    if (profile.banned) return 100;
    if (profile.riskFlags && profile.riskFlags.length > 0) score += profile.riskFlags.length * 15;
    if ((profile.totalOffers || 0) > 50 && (profile.totalWithdrawals || 0) === 0) score += 10;
    return Math.min(score, 100);
  }
};

var PromoCodes = {
  redeem: async function(code) {
    if (!UserState.isLoggedIn()) { UI.toast("Sign in first", "warning"); return; }
    if (!code || code.length < 3) return;
    if (!U.rateLimit("promo", CONFIG.limits.promoCooldown)) { UI.toast("Slow down", "warning"); return; }
    var upper = code.toUpperCase().trim();
    if (upper === "WELCOME2026") {
      if (UserState.profile.usedPromoWELCOME2026) { UI.toast("Already used", "warning"); return; }
      UserState.profile.usedPromoWELCOME2026 = true;
      await Wallet.earn(FB.user.uid, "promo", 200, "Promo code: WELCOME2026");
      UserState.sync();
      UI.toast("+200 coins!", "success");
      return;
    }
    if (FB.ok) {
      try {
        var doc = await FB.db.collection(CONFIG.col.promoCodes).doc(upper).get();
        if (doc.exists) {
          var data = doc.data();
          if (data.redeemed) { UI.toast("Already used", "warning"); return; }
          await FB.db.collection(CONFIG.col.promoCodes).doc(upper).update({ redeemed: true, redeemedBy: FB.user.uid, redeemedAt: Date.now() });
          await Wallet.earn(FB.user.uid, "promo", data.coins || 100, "Promo code: " + upper);
          UI.toast("Code redeemed! +" + U.coins(data.coins || 100), "success");
        } else { UI.toast("Invalid code", "error"); }
      } catch (e) { UI.toast("Error", "error"); }
    }
  }
};


/* ============================================================
   Pages Module – ReWords SPA
   ============================================================ */
var Pages = {

  /* ---- helpers reused across pages ---- */
  _header: function (title, subtitle) {
    var ar = I18n && I18n.lang === 'ar';
    return '<div class="page-header glass"><h1 class="page-title">' +
      U.esc(title) + '</h1>' +
      (subtitle ? '<p class="page-subtitle">' + U.esc(subtitle) + '</p>' : '') +
      '</div>';
  },
  _empty: function (msg) {
    return '<div class="empty-state glass"><i class="fas fa-inbox"></i><p>' + U.esc(msg) + '</p></div>';
  },
  _badge: function (text, cls) {
    return '<span class="badge ' + (cls || '') + '">' + U.esc(text) + '</span>';
  },
  _progressBar: function (pct, cls) {
    return '<div class="progress-bar"><div class="progress-fill ' + (cls || '') + '" style="width:' + Math.min(100, Math.max(0, pct)) + '%"></div></div>';
  },
  _sectionTitle: function (title, link) {
    var h = '<div class="section-header"><h2>' + U.esc(title) + '</h2>';
    if (link) h += '<a href="' + link + '" class="link-arrow">' + (I18n.lang === 'ar' ? '\u0627\u0644\u0643\u0644' : 'View All') + ' <i class="fas fa-chevron-right"></i></a>';
    h += '</div>';
    return h;
  },

  /* ==========================================================
     1. HOME
     ========================================================== */
  home: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var u = UserState.get();
    var bal = u ? u.coins || 0 : 0;
    var earned = u ? u.totalEarned || 0 : 0;
    var streak = u ? u.streak || 0 : 0;
    var lastRewards = Ledger.getRecent(5);
    var topUsers = UserState.getTopUsers(5);
    var topOffers = GamesManager.getTopOffers(4);
    var topGames = GamesManager.getTopGames(4);
    var faqItems = Notifications.getFaq(5);
    var dailyDone = DailyRewards.claimedToday();

    var h = '';

    /* hero */
    h += '<section class="hero glass">';
    h += '<div class="hero-balance">';
    h += '<p class="hero-label">' + (ar ? '\u0631\u0635\u064A\u062F\u0643' : 'Your Balance') + '</p>';
    h += '<h1 class="hero-coins"><i class="fas fa-coins"></i> ' + U.coins(bal) + '</h1>';
    h += '<p class="hero-usd">~ ' + U.coinsToUsd(bal) + '</p>';
    h += '</div>';
    h += '<div class="hero-stats">';
    h += '<div class="hero-stat"><span class="hero-stat-val">' + U.coins(earned) + '</span><span class="hero-stat-label">' + (ar ? '\u0625\u0631\u0628\u0627\u062D' : 'Total Earned') + '</span></div>';
    h += '<div class="hero-stat"><span class="hero-stat-val">' + streak + '</span><span class="hero-stat-label">' + (ar ? '\u0625\u0646\u0635\u0627\u0644\u0627\u062A \u0645\u062A\u0648\u0627\u0644\u064A\u0629' : 'Day Streak') + '</span></div>';
    h += '<div class="hero-stat"><span class="hero-stat-val">' + (u ? u.level || 1 : 1) + '</span><span class="hero-stat-label">' + (ar ? '\u0627\u0644\u0645\u0633\u062A\u0648\u0649' : 'Level') + '</span></div>';
    h += '</div>';
    h += '<a href="#/earn" class="btn btn-gold btn-lg btn-block"><i class="fas fa-bolt"></i> ' + (ar ? '\u0627\u0628\u062F\u0623 \u0627\u0644\u0627\u0631\u062A\u0628\u0627\u062D' : 'Start Earning') + '</a>';
    h += '</section>';

    /* daily reward widget */
    if (!dailyDone) {
      h += '<section class="card card-daily glass" onclick="location.hash=\'#/daily\'">';
      h += '<div class="card-daily-icon"><i class="fas fa-gift"></i></div>';
      h += '<div class="card-daily-info"><h3>' + (ar ? '\u0645\u0643\u0631\u0645 \u0627\u0644\u064A\u0648\u0645\u064A' : 'Daily Reward') + '</h3>';
      h += '<p>' + (ar ? '\u0627\u062F\u0639\u0648\u0641\u0643 \u0627\u0644\u064A\u0648\u0645' : 'Claim your daily reward') + '</p></div>';
      h += '<span class="badge badge-gold"><i class="fas fa-arrow-left"></i></span>';
      h += '</section>';
    }

    /* streak display */
    if (streak > 0) {
      h += '<section class="card glass streak-card">';
      h += '<div class="streak-flame"><i class="fas fa-fire"></i></div>';
      h += '<div class="streak-info"><h3>' + streak + ' ' + (ar ? '\u0625\u0646\u0635\u0627\u0644\u0627\u062A \u0645\u062A\u0648\u0627\u0644\u064A\u0629' : 'Day Streak') + '</h3>';
      h += '<p>' + (ar ? '\u0627\u0633\u062A\u0645\u0631 \u0644\u0644\u0642\u0627\u0633\u064A\u0629 \u0627\u0644\u0643\u0628\u0631\u064A' : 'Keep the streak alive for bonus rewards') + '</p></div>';
      h += Pages._progressBar(Math.min(streak / 30, 1) * 100, 'btn-gold');
      h += '</section>';
    }

    /* top offers */
    if (topOffers.length) {
      h += Pages._sectionTitle(ar ? '\u0623\u0641\u0636\u0644 \u0627\u0644\u0639\u0631\u0648\u0636' : 'Top Offers', '#/earn');
      h += '<div class="grid grid-offers">';
      topOffers.forEach(function (o) {
        h += '<div class="card card-offer glass" onclick="location.hash=\'#/order/' + U.esc(o.id) + '\'">';
        h += '<img class="card-offer-icon" src="' + U.esc(o.icon) + '" alt="" loading="lazy">';
        h += '<h4 class="card-offer-name">' + U.esc(o.name) + '</h4>';
        h += '<span class="badge badge-gold">' + U.coins(o.reward) + '</span>';
        h += '</div>';
      });
      h += '</div>';
    }

    /* top games */
    if (topGames.length) {
      h += Pages._sectionTitle(ar ? '\u0623\u0634\u0647\u0631 \u0627\u0644\u0623\u0644\u0639\u0627\u0628' : 'Top Games', '#/games');
      h += '<div class="grid grid-games">';
      topGames.forEach(function (g) {
        h += '<div class="card card-game glass" onclick="location.hash=\'#/order/' + U.esc(g.id) + '\'">';
        h += '<img class="card-game-img" src="' + U.esc(g.image) + '" alt="" loading="lazy">';
        h += '<div class="card-game-body"><h4>' + U.esc(g.name) + '</h4>';
        h += '<span class="badge">' + U.coins(g.startingFrom) + '</span></div></div>';
      });
      h += '</div>';
    }

    /* last rewards */
    if (lastRewards.length) {
      h += Pages._sectionTitle(ar ? '\u0622\u062E\u0631 \u0627\u0644\u0645\u0643\u0627\u0633\u0628\u0627\u062A' : 'Recent Rewards');
      h += '<div class="glass card" style="padding:0">';
      h += '<table class="table"><thead><tr><th>' + (ar ? '\u0627\u0644\u0628\u0639\u0636' : 'Description') + '</th><th>' + (ar ? '\u0627\u0644\u0631\u0635\u064A\u062F' : 'Amount') + '</th></tr></thead><tbody>';
      lastRewards.forEach(function (r) {
        var cls = r.amount > 0 ? 'text-success' : 'text-danger';
        h += '<tr><td>' + U.esc(r.description) + '</td><td class="' + cls + '">' + (r.amount > 0 ? '+' : '') + U.coins(r.amount) + '</td></tr>';
      });
      h += '</tbody></table></div>';
    }

    /* leaderboard preview */
    if (topUsers.length) {
      h += Pages._sectionTitle(ar ? '\u0645\u0642\u0627\u0628\u0644\u0648 \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u064A\u0646' : 'Top Earners', '#/leaderboard');
      h += '<div class="glass card leaderboard-mini">';
      topUsers.forEach(function (usr, i) {
        h += '<div class="leaderboard-row">';
        h += '<span class="lb-rank lb-rank-' + (i + 1) + '">' + (i + 1) + '</span>';
        h += '<span class="lb-avatar">' + U.esc((usr.name || '?')[0].toUpperCase()) + '</span>';
        h += '<span class="lb-name">' + U.esc(usr.name) + '</span>';
        h += '<span class="lb-coins">' + U.coins(usr.totalEarned) + '</span>';
        h += '</div>';
      });
      h += '</div>';
    }

    /* referral section */
    h += '<section class="card glass referral-hero">';
    h += '<i class="fas fa-user-plus referral-hero-icon"></i>';
    h += '<h3>' + (ar ? '\u062F\u0639\u0648\u062D \u0623\u0635\u062F\u0642\u0627\u0621 \u0648\u0627\u0643\u0633\u0628 \u0645\u0632\u064A\u062F\u0627\u064B' : 'Invite Friends & Earn More') + '</h3>';
    h += '<p>' + (ar ? '\u0627\u0643\u0633\u0628 \u0625\u0644\u0649 ' + U.coins(1000) + ' \u0639\u0646 \u0643\u0644 \u0635\u062F\u064A\u0642 \u0645\u062C\u0647\u0632' : 'Earn up to ' + U.coins(1000) + ' per referred friend') + '</p>';
    h += '<a href="#/referral" class="btn btn-primary">' + (ar ? '\u0627\u0644\u0627\u0637\u0644\u0627\u0639' : 'Learn More') + '</a></section>';

    /* FAQ */
    if (faqItems.length) {
      h += Pages._sectionTitle(ar ? '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0627\u0644\u0634\u0647\u064A\u0631\u0629' : 'Frequently Asked Questions', '#/faq');
      h += '<div class="faq-preview">';
      faqItems.forEach(function (f) {
        h += '<details class="glass faq-item"><summary>' + U.esc(f.q) + '</summary><p>' + U.esc(f.a) + '</p></details>';
      });
      h += '</div>';
    }

    /* withdrawal notice */
    h += '<section class="card glass notice-card">';
    h += '<i class="fas fa-info-circle"></i>';
    h += '<p>' + (ar ? '\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0633\u062D\u0628 \u0647\u0648 ' + U.coins(50000) + ' \u0639\u0645\u0644\u0629 (\u0627\u0644\u064A\u0648\u0645 \u064a\u0647\u0648 $' + U.usdToCoins(50000) + ')' : 'Minimum withdrawal is ' + U.coins(50000) + ' coins ($5.00)') + '</p>';
    h += '</section>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     2. EARN HUB
     ========================================================== */
  earn: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var categories = [
      { icon: 'fas fa-handshake', title: ar ? '\u0645\u0632\u0627\u0648\u064A\u062F \u0627\u0644\u0639\u0631\u0648\u0636' : 'Offerwalls', link: '#/earn/offerwalls', desc: ar ? '\u0627\u0643\u0645\u0644 \u0627\u0644\u0639\u0631\u0648\u0636 \u0645\u0646 \u0645\u0632\u0648\u064A\u062F\u064A\u0646' : 'All offers from providers', badge: '12+', cls: 'cat-offers' },
      { icon: 'fas fa-gamepad', title: ar ? '\u0639\u0631\u0648\u0636 \u0627\u0644\u0623\u0644\u0639\u0627\u0628' : 'Game Offers', link: '#/earn/games', desc: ar ? '\u0644\u0639\u0628 \u0648\u0627\u0643\u0633\u0628 \u0645\u0632\u064A\u062F\u0627\u064B' : 'Play & earn more', badge: '8', cls: 'cat-games' },
      { icon: 'fas fa-poll', title: ar ? '\u0627\u0644\u0627\u0633\u062A\u062E\u062A\u0627\u0631\u0627\u062A' : 'Surveys', link: '#/earn/surveys', desc: ar ? '\u0623\u062C\u0648\u0628 \u0645\u062E\u062A\u0644\u0641\u0629 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0644\u0627\u0631' : 'High-paying surveys', badge: '5', cls: 'cat-surveys' },
      { icon: 'fas fa-tv', title: ar ? '\u0645\u0634\u0627\u0647\u062F\u0629 \u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Watch Ads', link: '#/earn/ads', desc: ar ? '\u0634\u0627\u0647\u062F \u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0648\u0627\u0643\u0633\u0628' : 'Watch & earn', badge: null, cls: 'cat-ads' },
      { icon: 'fas fa-calendar-check', title: ar ? '\u0627\u0644\u0645\u0643\u0631\u0645 \u0627\u0644\u064A\u0648\u0645\u064A' : 'Daily Rewards', link: '#/daily', desc: ar ? '\u0627\u062F\u0639\u0648\u0641 \u0643\u0644 \u064A\u0648\u0645' : 'Claim every day', badge: null, cls: 'cat-daily' },
      { icon: 'fas fa-dharmachakra', title: ar ? '\u0639\u063a\u0644\u0629 \u0627\u0644\u062d\u0638\u0627\u0621' : 'Spin Wheel', link: '#/spin', desc: ar ? '\u062f\u0648\u0631\u0646 \u0644\u0644\u0631\u0632\u0642' : 'Spin for rewards', badge: null, cls: 'cat-spin' },
      { icon: 'fas fa-scraperbot', title: ar ? '\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062d\u0638\u0627\u0621' : 'Scratch Card', link: '#', desc: ar ? '\u0642\u0631\u0636 \u0642\u0631\u0634 \u0627\u0644\u062d\u0638\u0627\u0621' : 'Scratch & win', badge: ar ? '\u0642\u0631\u064a\u0628 \u0627\u0644\u0625\u0635\u062f\u0627\u0631' : 'Coming Soon', cls: 'cat-scratch soon' },
      { icon: 'fas fa-box-open', title: ar ? '\u0635\u0646\u0637\u0629 \u063a\u0631\u064a\u0628\u0629' : 'Mystery Box', link: '#', desc: ar ? '\u0641\u062a\u062d \u0635\u0646\u0637\u0629 \u063a\u0631\u064a\u0628\u0629 \u0645\u0639\u0643\u0648\u0633\u0629' : 'Open a mystery box', badge: ar ? '\u0642\u0631\u064a\u0628 \u0627\u0644\u0625\u0635\u062f\u0627\u0631' : 'Coming Soon', cls: 'cat-mystery soon' },
      { icon: 'fas fa-tasks', title: ar ? '\u0627\u0644\u0645\u0647\u0627\u0645' : 'Tasks', link: '#/earn/tasks', desc: ar ? '\u0623\u0646\u062c\u0627\u0632 \u0628\u0633\u064a\u0637\u0629' : 'Complete tasks', badge: null, cls: 'cat-tasks' },
      { icon: 'fas fa-trophy', title: ar ? '\u0627\u0644\u062a\u062d\u062f\u064a\u0627\u062a' : 'Challenges', link: '#/earn/challenges', desc: ar ? '\u062a\u062d\u062f\u064a\u0627\u062a \u0623\u0633\u0628\u0648\u0639\u064a\u0629' : 'Weekly challenges', badge: null, cls: 'cat-challenges' }
    ];

    var h = Pages._header(ar ? '\u0627\u0643\u0633\u0628' : 'Earn', ar ? '\u0627\u062e\u062a\u0631 \u0637\u0631\u064a\u0642\u062a\u0643 \u0644\u0644\u0643\u0633\u0628' : 'Choose your earning method');

    h += '<div class="grid grid-categories">';
    categories.forEach(function (c) {
      var disabled = c.soon ? ' style="opacity:.55;pointer-events:none"' : '';
      h += '<a href="' + c.link + '" class="card glass cat-card ' + c.cls + '"' + disabled + '>';
      h += '<div class="cat-icon"><i class="' + c.icon + '"></i></div>';
      h += '<h3 class="cat-title">' + c.title + '</h3>';
      h += '<p class="cat-desc">' + c.desc + '</p>';
      if (c.badge) h += Pages._badge(c.badge, 'badge-gold');
      h += '</a>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     3. EARN – OFFERWALLS
     ========================================================== */
  earnOfferwalls: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var providers = [
      { name: 'Freecash', icon: 'fas fa-coins', color: '#4CAF50', url: 'https://freecash.com/r/rewords', desc: ar ? '\u0623\u0639\u0636\u0649 \u0639\u0631\u0648\u0636 \u0645\u0646 Freecash' : 'Offers from Freecash' },
      { name: 'Lootably', icon: 'fas fa-gem', color: '#9C27B0', url: 'https://lootably.com/r/rewords', desc: ar ? '\u0623\u0639\u0636\u0649 \u0639\u0631\u0648\u0636 \u0645\u0646 Lootably' : 'Offers from Lootably' }
    ];

    var mockOffers = [
      { name: 'State of Survival', provider: 'Freecash', reward: 5000, time: '30 min', difficulty: ar ? '\u0633\u0647\u0644' : 'Easy', icon: '\uD83D\uDD25' },
      { name: 'Coin Master', provider: 'Freecash', reward: 3000, time: '20 min', difficulty: ar ? '\u0633\u0647\u0644' : 'Easy', icon: '\uD83C\uDFB0' },
      { name: 'Rise of Kingdoms', provider: 'Lootably', reward: 12000, time: '2 hours', difficulty: ar ? '\u0645\u062A\u0648\u0633\u0637' : 'Hard', icon: '\uD83C\uDFF0' },
      { name: 'Empires & Puzzles', provider: 'Freecash', reward: 7500, time: '1 hour', difficulty: ar ? '\u0645\u062A\u0648\u0633\u0637' : 'Medium', icon: '\uD83C\uDFC6' },
      { name: 'Board Kings', provider: 'Lootably', reward: 2000, time: '15 min', difficulty: ar ? '\u0633\u0647\u0644' : 'Easy', icon: '\uD83C\uDFAE' },
      { name: 'Family Island', provider: 'Freecash', reward: 9000, time: '1.5 hours', difficulty: ar ? '\u0645\u062A\u0648\u0633\u0637' : 'Medium', icon: '\uD83C\uDFDD\uFE0F' }
    ];

    var h = Pages._header(ar ? '\u0645\u0632\u0627\u0648\u064A\u062F \u0627\u0644\u0639\u0631\u0648\u0636' : 'Offerwalls');

    /* provider cards */
    h += '<div class="grid grid-2">';
    providers.forEach(function (p) {
      h += '<a href="' + U.esc(p.url) + '" target="_blank" rel="noopener" class="card glass provider-card">';
      h += '<div class="provider-icon" style="background:' + p.color + '"><i class="' + p.icon + '"></i></div>';
      h += '<h3>' + U.esc(p.name) + '</h3>';
      h += '<p>' + U.esc(p.desc) + '</p>';
      h += '<span class="btn btn-primary btn-sm">' + (ar ? '\u0627\u0644\u0645\u0632\u0648\u062F' : 'Visit') + ' <i class="fas fa-external-link-alt"></i></span>';
      h += '</a>';
    });
    h += '</div>';

    /* recommended offers */
    h += Pages._sectionTitle(ar ? '\u0639\u0631\u0648\u0636 \u0645\u0648\u0635\u0649 \u0628\u0647' : 'Recommended Offers');
    h += '<div class="grid grid-offers-full">';
    mockOffers.forEach(function (o) {
      h += '<div class="card glass offer-card">';
      h += '<div class="offer-header">';
      h += '<span class="offer-icon">' + o.icon + '</span>';
      h += '<span class="badge badge-sm">' + U.esc(o.provider) + '</span>';
      h += '</div>';
      h += '<h4 class="offer-name">' + U.esc(o.name) + '</h4>';
      h += '<div class="offer-meta">';
      h += '<span><i class="fas fa-coins"></i> ' + U.coins(o.reward) + '</span>';
      h += '<span><i class="fas fa-clock"></i> ' + U.esc(o.time) + '</span>';
      h += '<span><i class="fas fa-signal"></i> ' + U.esc(o.difficulty) + '</span>';
      h += '</div>';
      h += '<button class="btn btn-gold btn-block btn-sm" onclick="Toast.show(\'' + (ar ? '\u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0639\u0628\u0631 \u0627\u0644\u0645\u0632\u0648\u0639 \u0627\u0644\u0645\u0631\u062c\u0639' : 'Please visit the provider to complete') + '\')">' + (ar ? '\u0627\u0628\u062f\u0623' : 'Start') + '</button>';
      h += '</div>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     4. EARN – GAMES
     ========================================================== */
  earnGames: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var games = [
      { name: 'State of Survival', installReward: 2000, milestones: [{ level: 10, reward: 1500 }, { level: 20, reward: 3000 }, { level: 30, reward: 5000 }], icon: '\uD83D\uDD25' },
      { name: 'Coin Master', installReward: 1000, milestones: [{ level: 5, reward: 1000 }, { level: 15, reward: 2500 }], icon: '\uD83C\uDFB0' },
      { name: 'Rise of Kingdoms', installReward: 3000, milestones: [{ level: 10, reward: 4000 }, { level: 25, reward: 8000 }], icon: '\uD83C\uDFF0' }
    ];

    var h = Pages._header(ar ? '\u0639\u0631\u0648\u0636 \u0627\u0644\u0623\u0644\u0639\u0627\u0628' : 'Game Offers');

    games.forEach(function (g) {
      h += '<div class="card glass game-offer-card">';
      h += '<div class="game-offer-head"><span class="game-offer-icon">' + g.icon + '</span>';
      h += '<div><h3>' + U.esc(g.name) + '</h3>';
      h += '<span class="badge badge-gold">' + (ar ? '\u0645\u0643\u0631\u0645 \u0627\u0644\u062a\u062b\u0628\u064a\u062a' : 'Install Reward') + ': ' + U.coins(g.installReward) + '</span></div></div>';
      h += '<h4>' + (ar ? '\u0627\u0644\u0645\u0631\u0627\u062d\u0644 \u0627\u0644\u0628\u0646\u0633\u064a\u0629' : 'Level Milestones') + '</h4>';
      h += '<div class="milestones">';
      g.milestones.forEach(function (m) {
        h += '<div class="milestone-row glass">';
        h += '<span class="milestone-level">' + (ar ? '\u0645\u0633\u062a\u0648\u0649 ' : 'Level ') + m.level + '</span>';
        h += '<span class="milestone-reward">' + U.coins(m.reward) + '</span>';
        h += '</div>';
      });
      h += '</div>';
      h += '<button class="btn btn-primary btn-block" onclick="Toast.show(\'' + (ar ? '\u062a\u0633\u062c\u064a\u0644 \u0645\u0646 \u0627\u0644\u0645\u0632\u0648\u0639' : 'Install from store') + '\')">' + (ar ? '\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u062a\u0637\u0628\u064a\u0642' : 'Install App') + '</button>';
      h += '</div>';
    });

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     5. EARN – SURVEYS
     ========================================================== */
  earnSurveys: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var surveys = [
      { name: ar ? '\u0627\u0633\u062a\u062e\u062a\u0627\u0631 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a' : 'Consumer Survey', time: '10 min', reward: 1500, provider: 'CPX' },
      { name: ar ? '\u0627\u0633\u062a\u062e\u062a\u0627\u0631 \u0623\u0633\u0648\u0627\u0642' : 'Opinion Survey', time: '8 min', reward: 1200, provider: 'CPX' },
      { name: ar ? '\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0645\u0646\u062a\u062c' : 'Product Review', time: '12 min', reward: 2000, provider: 'Toluna' },
      { name: ar ? '\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u062e\u062f\u0645\u0629' : 'Service Review', time: '6 min', reward: 800, provider: 'Toluna' },
      { name: ar ? '\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a' : 'Market Research', time: '15 min', reward: 3000, provider: 'CPX' }
    ];

    var h = Pages._header(ar ? '\u0627\u0644\u0627\u0633\u062a\u062e\u062a\u0627\u0631\u0627\u062a' : 'Surveys');
    h += '<div class="grid grid-offers-full">';
    surveys.forEach(function (s) {
      h += '<div class="card glass offer-card">';
      h += '<div class="offer-header"><span class="offer-icon"><i class="fas fa-poll"></i></span>';
      h += '<span class="badge badge-sm">' + U.esc(s.provider) + '</span></div>';
      h += '<h4 class="offer-name">' + U.esc(s.name) + '</h4>';
      h += '<div class="offer-meta">';
      h += '<span><i class="fas fa-coins"></i> ' + U.coins(s.reward) + '</span>';
      h += '<span><i class="fas fa-clock"></i> ' + U.esc(s.time) + '</span>';
      h += '</div>';
      h += '<button class="btn btn-primary btn-block btn-sm">' + (ar ? '\u0628\u062f\u0621' : 'Start') + '</button>';
      h += '</div>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     6. EARN – ADS
     ========================================================== */
  earnAds: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var h = Pages._header(ar ? '\u0645\u0634\u0627\u0647\u062F\u0629 \u0625\u0639\u0644\u0627\u0646\u0627\u062A' : 'Watch Ads');

    h += '<div class="grid grid-2">';
    h += '<a href="#" class="card glass ad-provider-card">';
    h += '<i class="fas fa-play-circle ad-icon"></i>';
    h += '<h3>Smartlink</h3>';
    h += '<p>' + (ar ? '\u0634\u0627\u0647\u062F \u0625\u0639\u0644\u0627\u0646\u0627\u062A \u0648\u0627\u0643\u0633\u0628' : 'Watch ads & earn') + '</p>';
    h += '<span class="badge badge-gold">+' + U.coins(50) + ' / ' + (ar ? '\u0625\u0639\u0644\u0627\u0646' : 'ad') + '</span>';
    h += '<span class="btn btn-primary btn-sm">' + (ar ? '\u0627\u0644\u0645\u0632\u0648\u062F' : 'Visit') + '</span></a>';

    h += '<a href="https://freecash.com/r/rewords" target="_blank" rel="noopener" class="card glass ad-provider-card">';
    h += '<i class="fas fa-ad ad-icon"></i>';
    h += '<h3>Freecash</h3>';
    h += '<p>' + (ar ? '\u0625\u0639\u0644\u0627\u0646\u0627\u062a Freecash' : 'Freecash ads') + '</p>';
    h += '<span class="badge badge-gold">+' + U.coins(30) + ' / ' + (ar ? '\u0625\u0639\u0644\u0627\u0646' : 'ad') + '</span>';
    h += '<span class="btn btn-primary btn-sm">' + (ar ? '\u0627\u0644\u0645\u0632\u0648\u062F' : 'Visit') + '</span></a>';
    h += '</div>';

    h += '<section class="card glass notice-card"><i class="fas fa-info-circle"></i>';
    h += '<p>' + (ar ? '\u062a\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u062a\u0646\u0638\u0631\u0641 \u0648\u0642\u0648\u0644 \u0627\u0644\u0645\u0631\u0643\u0632' : 'Make sure to watch ads to the end to receive credit') + '</p></section>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     7. DAILY REWARDS
     ========================================================== */
  daily: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var streak = DailyRewards.getStreak();
    var claimed = DailyRewards.claimedToday();
    var bonuses = [
      { day: 3, reward: 500 }, { day: 7, reward: 1500 }, { day: 14, reward: 3000 },
      { day: 21, reward: 5000 }, { day: 30, reward: 10000 }
    ];
    var baseReward = 100 + streak * 50;

    var h = Pages._header(ar ? '\u0627\u0644\u0645\u0643\u0631\u0645 \u0627\u0644\u064a\u0648\u0645\u064A' : 'Daily Rewards');

    /* streak */
    h += '<section class="card glass daily-streak">';
    h += '<div class="streak-flame big"><i class="fas fa-fire"></i></div>';
    h += '<h2>' + (ar ? '\u0627\u0644\u0625\u0646\u0635\u0627\u0644\u0627\u062a \u0627\u0644\u0645\u062a\u0648\u0627\u0644\u064a\u0629' : 'Daily Streak') + ': ' + streak + ' ' + (ar ? '\u0625\u064a\u0627\u0645' : 'days') + '</h2>';
    h += Pages._progressBar((streak / 30) * 100, 'btn-gold');
    h += '</section>';

    /* claim button */
    h += '<section class="card glass daily-claim">';
    if (claimed) {
      h += '<i class="fas fa-check-circle claim-done"></i>';
      h += '<h3>' + (ar ? '\u062a\u0645 \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645 \u0628\u0646\u062c\u0627\u062d' : 'Already Claimed') + '</h3>';
      h += '<p>' + (ar ? '\u0639\u0648\u062f \u063a\u062f\u0627\u064B \u0644\u0644\u063a\u062f' : 'Come back tomorrow') + '</p>';
    } else {
      h += '<i class="fas fa-gift claim-gift"></i>';
      h += '<h3>' + U.coins(baseReward) + '</h3>';
      h += '<button class="btn btn-gold btn-lg" onclick="DailyRewards.claim()">' + (ar ? '\u0627\u0633\u062a\u0644\u0627\u0645' : 'Claim Now') + '</button>';
    }
    h += '</section>';

    /* calendar */
    h += Pages._sectionTitle(ar ? '\u062a\u0642\u0648\u064a\u0645 \u0627\u0644\u0623\u064a\u0627\u0645' : 'Streak Calendar');
    h += '<div class="grid grid-7">';
    for (var d = 1; d <= 30; d++) {
      var cls = d <= streak ? 'day-done' : (d === streak + 1 ? 'day-current' : '');
      var reward = d <= 1 ? 100 : 100 + (d - 1) * 50;
      h += '<div class="day-cell glass ' + cls + '">';
      h += '<span class="day-num">' + d + '</span>';
      h += '<span class="day-coins">' + U.coins(reward) + '</span>';
      h += '</div>';
    }
    h += '</div>';

    /* bonuses */
    h += Pages._sectionTitle(ar ? '\u0645\u0639\u0627\u0644\u064a\u062c \u0627\u0644\u0633\u0644\u0633\u0644\u064a\u0627\u062a' : 'Streak Bonuses');
    h += '<div class="grid grid-bonuses">';
    bonuses.forEach(function (b) {
      var reached = streak >= b.day;
      h += '<div class="card glass bonus-card ' + (reached ? 'bonus-reached' : '') + '">';
      h += '<i class="fas fa-' + (reached ? 'check-circle' : 'lock') + '"></i>';
      h += '<h4>' + b.day + ' ' + (ar ? '\u0623\u064a\u0627\u0645' : 'days') + '</h4>';
      h += '<span class="badge badge-gold">' + U.coins(b.reward) + '</span>';
      h += '</div>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     8. SPIN WHEEL
     ========================================================== */
  spin: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var canSpin = SpinWheel.canSpin();
    var cooldown = SpinWheel.getCooldownLeft();

    var h = Pages._header(ar ? '\u0639\u063a\u0644\u0629 \u0627\u0644\u062d\u0638\u0627\u0621' : 'Spin Wheel');

    h += '<section class="spin-section">';
    h += '<div class="spin-wheel-wrap">';
    h += '<canvas id="spinCanvas" width="340" height="340"></canvas>';
    h += '<div class="spin-pointer"><i class="fas fa-caret-down"></i></div>';
    h += '</div>';

    if (canSpin) {
      h += '<button id="spinBtn" class="btn btn-gold btn-lg btn-spin" onclick="SpinWheel.spin()">';
      h += '<i class="fas fa-dharmachakra"></i> ' + (ar ? '\u062f\u0648\u0631\u0646' : 'Spin') + '</button>';
    } else {
      h += '<button class="btn btn-disabled btn-lg" disabled><i class="fas fa-clock"></i> ' + (ar ? '\u0645\u0646\u062a\u0638\u0631 ' : 'Wait ') + U.formatTime(cooldown) + '</button>';
    }
    h += '</section>';

    /* prizes */
    h += Pages._sectionTitle(ar ? '\u0627\u0644\u062c\u0639\u0627\u0626\u0636' : 'Prizes');
    h += '<div class="grid grid-prizes">';
    var prizes = SpinWheel.getPrizes();
    prizes.forEach(function (p) {
      h += '<div class="card glass prize-card">';
      h += '<span class="prize-val">' + U.coins(p.value) + '</span>';
      h += '<span class="prize-label">' + U.esc(p.label) + '</span>';
      h += '</div>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
    SpinRenderer.drawWheel('spinCanvas');
  },

  /* ==========================================================
     9. GAMES CATALOG
     ========================================================== */
  games: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var gamesList = GamesManager.getAll();

    var h = Pages._header(ar ? '\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0623\u0644\u0639\u0627\u0628' : 'Game Catalog');

    h += '<div class="grid grid-games">';
    if (!gamesList.length) {
      h += Pages._empty(ar ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0644\u0639\u0627\u0628 \u0645\u0637\u064a\u0633\u0629' : 'No games available');
    }
    gamesList.forEach(function (g) {
      h += '<a href="#/order/' + U.esc(g.id) + '" class="card card-game glass">';
      h += '<img class="card-game-img" src="' + U.esc(g.image) + '" alt="' + U.esc(g.name) + '" loading="lazy">';
      h += '<div class="card-game-body">';
      h += '<h4>' + U.esc(g.name) + '</h4>';
      h += '<p class="text-muted">' + U.esc(g.category || '') + '</p>';
      h += '<span class="badge badge-gold">' + (ar ? '\u0645\u0646 ' : 'From ') + U.coins(g.startingFrom) + '</span>';
      h += '</div></a>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     10. ORDER
     ========================================================== */
  order: function (params) {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var gameId = params && params.id;
    var game = GamesManager.getById(gameId);

    if (!game) {
      Pages.notFound(); return;
    }

    var u = UserState.get();
    var bal = u ? u.coins || 0 : 0;

    var h = Pages._header(U.esc(game.name));

    /* game info */
    h += '<section class="card glass game-info">';
    h += '<img class="game-info-img" src="' + U.esc(game.image) + '" alt="">';
    h += '<div class="game-info-body">';
    h += '<p>' + U.esc(game.description || '') + '</p>';
    h += '<p class="text-muted">' + (ar ? '\u0631\u0635\u064A\u062F\u0643: ' : 'Your balance: ') + '<strong>' + U.coins(bal) + '</strong></p>';
    h += '</div></section>';

    /* player ID */
    h += '<section class="card glass">';
    h += '<label class="form-label">' + (ar ? '\u0645\u0639\u0631\u0641 \u0627\u0644\u0644\u0639\u0628 \u0627\u0644\u0645\u0631\u0627\u0633\u0644' : 'Player ID') + '</label>';
    h += '<input id="playerId" type="text" class="form-input" placeholder="' + (ar ? '\u0623\u062f\u062e\u0644 \u0645\u0639\u0631\u0641\u0643' : 'Enter your ID') + '">';
    h += '</section>';

    /* packages */
    h += Pages._sectionTitle(ar ? '\u0627\u062e\u062a\u0631 \u0627\u0644\u0639\u0631\u0636' : 'Select Package');
    h += '<div class="grid grid-3">';
    (game.packages || []).forEach(function (pkg) {
      var canAfford = bal >= pkg.coins;
      h += '<div class="card glass pkg-card ' + (canAfford ? '' : 'pkg-unaffordable') + '" data-coins="' + pkg.coins + '" onclick="UI.selectPackage(this)">';
      h += '<h4>' + U.esc(pkg.name) + '</h4>';
      h += '<span class="pkg-price">' + U.coins(pkg.coins) + '</span>';
      h += '<span class="pkg-usd">~ ' + U.coinsToUsd(pkg.coins) + '</span>';
      if (!canAfford) h += '<span class="badge badge-danger">' + (ar ? '\u063a\u064A\u0631 \u0643\u0627\u0641\u064A' : 'Insufficient') + '</span>';
      h += '</div>';
    });
    h += '</div>';

    /* summary */
    h += '<section id="orderSummary" class="card glass order-summary" style="display:none">';
    h += '<h3>' + (ar ? '\u0645\u0644\u062e\u0635 \u0627\u0644\u0637\u0644\u0628' : 'Order Summary') + '</h3>';
    h += '<div id="orderSummaryContent"></div>';
    h += '<button class="btn btn-gold btn-lg btn-block" onclick="GamesManager.confirmOrder(\'' + U.esc(gameId) + '\')">';
    h += '<i class="fas fa-check"></i> ' + (ar ? '\u062a\u0623\u0643\u064A\u062F' : 'Confirm') + '</button>';
    h += '</section>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     11. REWARDS STORE
     ========================================================== */
  rewards: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var categories = [
      { name: ar ? '\u0634\u062d\u0646 \u0627\u0644\u0623\u0644\u0639\u0627\u0628' : 'Game Top-Up', icon: 'fas fa-gamepad' },
      { name: ar ? '\u0628\u0637\u0627\u0642\u0627\u062a \u0647\u062f\u064a\u0629' : 'Gift Cards', icon: 'fas fa-gift' },
      { name: 'PayPal', icon: 'fab fa-paypal' },
      { name: ar ? '\u0639\u0645\u0644\u0627\u062a \u0631\u0642\u0645\u064A\u0629' : 'Crypto', icon: 'fab fa-bitcoin' }
    ];

    var rewardsList = [
      { name: 'Google Play $5', coins: 50000, cat: ar ? '\u0628\u0637\u0627\u0642\u0627\u062a \u0647\u062f\u064a\u0629' : 'Gift Cards', icon: 'fab fa-google-play' },
      { name: 'Steam $10', coins: 100000, cat: ar ? '\u0628\u0637\u0627\u0642\u0627\u062a \u0647\u062f\u064a\u0629' : 'Gift Cards', icon: 'fab fa-steam' },
      { name: 'Amazon $5', coins: 52000, cat: ar ? '\u0628\u0637\u0627\u0642\u0627\u062a \u0647\u062f\u064a\u0629' : 'Gift Cards', icon: 'fab fa-amazon' },
      { name: 'PayPal $5', coins: 53000, cat: 'PayPal', icon: 'fab fa-paypal' },
      { name: 'PayPal $10', coins: 103000, cat: 'PayPal', icon: 'fab fa-paypal' },
      { name: 'PUBG 60 UC', coins: 15000, cat: ar ? '\u0634\u062d\u0646 \u0627\u0644\u0623\u0644\u0639\u0627\u0628' : 'Game Top-Up', icon: 'fas fa-crosshairs' },
      { name: 'Free Fire 100 Diamond', coins: 12000, cat: ar ? '\u0634\u062d\u0646 \u0627\u0644\u0623\u0644\u0639\u0627\u0628' : 'Game Top-Up', icon: 'fas fa-fire' },
      { name: 'BTC 0.0001', coins: 110000, cat: ar ? '\u0639\u0645\u0644\u0627\u062a \u0631\u0642\u0645\u064a\u0629' : 'Crypto', icon: 'fab fa-bitcoin' }
    ];

    var h = Pages._header(ar ? '\u0645\u062a\u062c\u0631 \u0627\u0644\u0645\u0643\u0627\u0641\u0623\u062a' : 'Rewards Store');

    /* category filter */
    h += '<div class="cat-filter">';
    h += '<button class="btn btn-sm btn-primary cat-filter-btn active" data-cat="all">' + (ar ? '\u0627\u0644\u0643\u0644' : 'All') + '</button>';
    categories.forEach(function (c) {
      h += '<button class="btn btn-sm cat-filter-btn" data-cat="' + U.esc(c.name) + '"><i class="' + c.icon + '"></i> ' + c.name + '</button>';
    });
    h += '</div>';

    /* rewards grid */
    h += '<div class="grid grid-rewards">';
    rewardsList.forEach(function (r) {
      h += '<div class="card glass reward-card" data-cat="' + U.esc(r.cat) + '">';
      h += '<i class="' + U.esc(r.icon) + ' reward-icon"></i>';
      h += '<h4>' + U.esc(r.name) + '</h4>';
      h += '<span class="badge badge-gold">' + U.coins(r.coins) + '</span>';
      h += '<button class="btn btn-gold btn-block btn-sm">' + (ar ? '\u0627\u0633\u062a\u0628\u062f\u0627\u0644' : 'Redeem') + '</button>';
      h += '</div>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     12. WALLET
     ========================================================== */
  wallet: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var u = UserState.get();
    var bal = u ? u.coins || 0 : 0;
    var pending = u ? u.pendingCoins || 0 : 0;
    var locked = u ? u.lockedCoins || 0 : 0;
    var recentTx = Ledger.getRecent(5);

    var h = Pages._header(ar ? '\u0627\u0644\u0645\u062d\u0641\u0638\u0629' : 'Wallet');

    /* balances */
    h += '<div class="grid grid-3">';
    h += '<div class="card glass wallet-card wallet-available">';
    h += '<i class="fas fa-wallet"></i>';
    h += '<p class="wallet-label">' + (ar ? '\u0645\u062a\u0627\u062D' : 'Available') + '</p>';
    h += '<h2 class="wallet-val">' + U.coins(bal) + '</h2>';
    h += '<span class="text-muted">~ ' + U.coinsToUsd(bal) + '</span></div>';

    h += '<div class="card glass wallet-card wallet-pending">';
    h += '<i class="fas fa-hourglass-half"></i>';
    h += '<p class="wallet-label">' + (ar ? '\u0642\u064A\u062f \u0627\u0644\u062a\u0623\u0643\u064A\u062f' : 'Pending') + '</p>';
    h += '<h2 class="wallet-val">' + U.coins(pending) + '</h2></div>';

    h += '<div class="card glass wallet-card wallet-locked">';
    h += '<i class="fas fa-lock"></i>';
    h += '<p class="wallet-label">' + (ar ? '\u0645\u0642\u0641\u0648\u0638' : 'Locked') + '</p>';
    h += '<h2 class="wallet-val">' + U.coins(locked) + '</h2></div>';
    h += '</div>';

    /* quick actions */
    h += '<div class="quick-actions">';
    h += '<a href="#/rewards" class="btn btn-primary"><i class="fas fa-gift"></i> ' + (ar ? '\u0627\u0633\u062a\u0628\u062f\u0627\u0644' : 'Redeem') + '</a>';
    h += '<a href="#/transactions" class="btn btn-gold"><i class="fas fa-history"></i> ' + (ar ? '\u0627\u0644\u0639\u0645\u0644\u0627\u062a' : 'History') + '</a>';
    h += '<button class="btn btn-outline" onclick="Toast.show(\'' + (ar ? '\u064a\u0631\u062c\u0649 \u0627\u0644\u0648\u0635\u0644 \u0628\u0627\u0644\u0628\u062a \u0627\u0644\u0627\u0644\u062a\u0648\u0627\u0635\u0644' : 'Minimum withdrawal required') + '\')"><i class="fas fa-money-bill-wave"></i> ' + (ar ? '\u0633\u062d\u0628' : 'Withdraw') + '</button>';
    h += '</div>';

    /* recent transactions */
    if (recentTx.length) {
      h += Pages._sectionTitle(ar ? '\u0622\u062e\u0631 \u0627\u0644\u0639\u0645\u0644\u0627\u062a' : 'Recent Transactions', '#/transactions');
      h += '<div class="glass card" style="padding:0">';
      h += '<table class="table"><thead><tr>';
      h += '<th>' + (ar ? '\u0627\u0644\u0639\u0646\u0648\u0627\u0631' : 'Type') + '</th>';
      h += '<th>' + (ar ? '\u0627\u0644\u0628\u0639\u0636' : 'Description') + '</th>';
      h += '<th>' + (ar ? '\u0627\u0644\u0645\u0628\u0644\u063a' : 'Balance') + '</th>';
      h += '</tr></thead><tbody>';
      recentTx.forEach(function (t) {
        var icon = t.amount > 0 ? 'fas fa-arrow-up text-success' : 'fas fa-arrow-down text-danger';
        h += '<tr><td><i class="' + icon + '"></i></td><td>' + U.esc(t.description) + '</td><td>' + U.coins(t.balanceAfter) + '</td></tr>';
      });
      h += '</tbody></table></div>';
    }

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     13. TRANSACTIONS
     ========================================================== */
  transactions: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var allTx = Ledger.getAll();

    var h = Pages._header(ar ? '\u0627\u0644\u0639\u0645\u0644\u0627\u062a' : 'Transactions');

    /* filter */
    h += '<div class="cat-filter">';
    var types = ['all', 'credit', 'debit', 'withdrawal', 'bonus'];
    var typeLabels = { all: ar ? '\u0627\u0644\u0643\u0644' : 'All', credit: ar ? '\u0625\u0636\u0627\u0641\u0629' : 'Credit', debit: ar ? '\u062e\u0635\u0645' : 'Debit', withdrawal: ar ? '\u0633\u062d\u0628' : 'Withdrawal', bonus: ar ? '\u0645\u0643\u0627\u0641\u0623\u0629' : 'Bonus' };
    types.forEach(function (t) {
      h += '<button class="btn btn-sm cat-filter-btn' + (t === 'all' ? ' active' : '') + '" data-filter="' + t + '">' + typeLabels[t] + '</button>';
    });
    h += '</div>';

    h += '<div id="txList" class="tx-list">';
    if (!allTx.length) {
      h += Pages._empty(ar ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0645\u0644\u0627\u062a' : 'No transactions yet');
    }
    allTx.forEach(function (t) {
      var iconCls = t.amount > 0 ? 'fas fa-arrow-up tx-credit' : 'fas fa-arrow-down tx-debit';
      var typeIcon = t.type === 'withdrawal' ? 'fas fa-money-bill tx-withdrawal' : iconCls;
      h += '<div class="card glass tx-card" data-type="' + U.esc(t.type) + '">';
      h += '<div class="tx-icon"><i class="' + typeIcon + '"></i></div>';
      h += '<div class="tx-info"><p class="tx-desc">' + U.esc(t.description) + '</p>';
      h += '<span class="tx-date">' + U.esc(t.date) + '</span></div>';
      h += '<div class="tx-amount ' + (t.amount > 0 ? 'text-success' : 'text-danger') + '">' + (t.amount > 0 ? '+' : '') + U.coins(t.amount) + '</div>';
      h += '</div>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     14. PROFILE
     ========================================================== */
  profile: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var u = UserState.get();

    if (!u) { Pages.notFound(); return; }

    var xpPct = u.xp ? (u.xp / (u.xpNeeded || 1000)) * 100 : 0;

    var h = Pages._header(ar ? '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064A' : 'My Profile');

    /* avatar & basic */
    h += '<section class="card glass profile-card">';
    h += '<div class="profile-avatar">' + U.esc((u.name || '?')[0].toUpperCase()) + '</div>';
    h += '<h2>' + U.esc(u.name) + '</h2>';
    h += '<p class="text-muted">' + U.esc(u.email) + '</p>';
    h += '<div class="profile-badges">';
    h += Pages._badge(u.country || 'WW', 'badge-sm');
    h += Pages._badge((ar ? '\u0627\u0644\u0645\u0633\u062a\u0648\u0649 ' : 'Level ') + (u.level || 1), 'badge-gold');
    if (u.verified) h += Pages._badge(ar ? '\u0645\u0648\u062b\u0642' : 'Verified', 'badge-success');
    h += '</div></section>';

    /* XP */
    h += '<section class="card glass">';
    h += '<h3>' + (ar ? '\u062a\u0642\u0631\u064a\u0631 \u0627\u0644\u062a\u0637\u0648\u064a\u0631' : 'Experience') + '</h3>';
    h += '<p>' + (u.xp || 0) + ' / ' + (u.xpNeeded || 1000) + ' XP</p>';
    h += Pages._progressBar(xpPct, 'btn-primary');
    h += '</section>';

    /* badges */
    var badges = Achievements.getUnlocked();
    if (badges.length) {
      h += Pages._sectionTitle(ar ? '\u0627\u0644\u0634\u0639\u0627\u0631\u0627\u062a' : 'Badges');
      h += '<div class="grid grid-badges">';
      badges.forEach(function (b) {
        h += '<div class="card glass badge-card">';
        h += '<i class="' + U.esc(b.icon) + ' badge-icon-lg"></i>';
        h += '<p>' + U.esc(b.name) + '</p></div>';
      });
      h += '</div>';
    }

    /* stats */
    h += Pages._sectionTitle(ar ? '\u0627\u0644\u0625\u062d\u0635\u0627\u0626\u064A\u0627\u062a' : 'Statistics');
    h += '<div class="grid grid-2">';
    var stats = [
      { label: ar ? '\u0625\u0631\u0628\u0627\u062d' : 'Total Earned', val: U.coins(u.totalEarned || 0), icon: 'fas fa-coins' },
      { label: ar ? '\u0627\u0644\u0645\u0646\u0641\u0642' : 'Total Spent', val: U.coins(u.totalSpent || 0), icon: 'fas fa-shopping-cart' },
      { label: ar ? '\u0627\u0644\u0639\u0631\u0648\u0636 \u0627\u0644\u0645\u0643\u062a\u0645\u0644\u0629' : 'Offers Completed', val: u.offersCompleted || 0, icon: 'fas fa-check-double' },
      { label: ar ? '\u0627\u0644\u0633\u062d\u0628\u0627\u062a' : 'Withdrawals', val: u.withdrawals || 0, icon: 'fas fa-money-bill-wave' }
    ];
    stats.forEach(function (s) {
      h += '<div class="card glass stat-card"><i class="' + s.icon + '"></i>';
      h += '<p class="stat-val">' + s.val + '</p>';
      h += '<p class="stat-label">' + s.label + '</p></div>';
    });
    h += '</div>';

    /* referral code */
    h += '<section class="card glass">';
    h += '<h3>' + (ar ? '\u0631\u0645\u0632 \u0627\u0644\u0625\u0637\u0644\u0627\u0639' : 'Referral Code') + '</h3>';
    h += '<div class="referral-code-box"><code id="refCode">' + U.esc(u.referralCode || '') + '</code>';
    h += '<button class="btn btn-sm btn-primary" onclick="U.copyText(\'' + U.esc(u.referralCode || '') + '\')"><i class="fas fa-copy"></i></button></div>';
    h += '<a href="#/referral" class="link-arrow">' + (ar ? '\u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0625\u0637\u0644\u0627\u0639' : 'Referral Details') + ' <i class="fas fa-chevron-right"></i></a>';
    h += '</section>';

    /* verification */
    h += '<section class="card glass">';
    h += '<h3>' + (ar ? '\u062d\u0627\u0644\u0629 \u0627\u0644\u062a\u062d\u0642\u0642' : 'Verification Status') + '</h3>';
    h += '<p>' + (u.verified ? (ar ? '\u062d\u0633\u0627\u0628\u0643 \u0645\u0648\u062b\u0642' : 'Account Verified') : (ar ? '\u062d\u0633\u0627\u0628\u0643 \u063a\u064a\u0631 \u0645\u0648\u062b\u0642' : 'Not Verified')) + '</p>';
    if (!u.verified) {
      h += '<button class="btn btn-primary" onclick="Auth.verifyRequest()">' + (ar ? '\u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0622\u0646' : 'Verify Now') + '</button>';
    }
    h += '</section>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     15. REFERRAL
     ========================================================== */
  referral: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var u = UserState.get();
    var stats = ReferralSystem.getStats();
    var milestones = ReferralSystem.getMilestones();
    var referred = ReferralSystem.getReferred();

    var h = Pages._header(ar ? '\u0628\u0631\u0646\u0627\u0645\u062c \u0627\u0644\u0625\u0637\u0644\u0627\u0639' : 'Referral Program');

    /* link & code */
    h += '<section class="card glass referral-link-card">';
    h += '<i class="fas fa-link"></i>';
    h += '<h3>' + (ar ? '\u0631\u0627\u0628\u0637 \u0627\u0644\u0625\u0637\u0644\u0627\u0639 \u0627\u0644\u062e\u0627\u0635 \u0628\u0643' : 'Your Referral Link') + '</h3>';
    h += '<div class="referral-code-box">';
    h += '<input type="text" class="form-input" readonly value="' + U.esc((u && u.referralLink) || '') + '">';
    h += '<button class="btn btn-primary" onclick="U.copyText(\'' + U.esc((u && u.referralLink) || '') + '\')"><i class="fas fa-copy"></i></button>';
    h += '</div>';
    h += '<div class="referral-code-box"><span>' + (ar ? '\u0631\u0645\u0632:' : 'Code:') + ' </span>';
    h += '<code>' + U.esc((u && u.referralCode) || '') + '</code>';
    h += '<button class="btn btn-sm btn-gold" onclick="U.copyText(\'' + U.esc((u && u.referralCode) || '') + '\')"><i class="fas fa-copy"></i></button>';
    h += '</div></section>';

    /* stats */
    h += '<div class="grid grid-3">';
    h += '<div class="card glass stat-card"><i class="fas fa-users"></i><p class="stat-val">' + (stats.total || 0) + '</p><p class="stat-label">' + (ar ? '\u0627\u0644\u0645\u062f\u0639\u0648\u0646\u064A\u0646' : 'Referrals') + '</p></div>';
    h += '<div class="card glass stat-card"><i class="fas fa-coins"></i><p class="stat-val">' + U.coins(stats.earned || 0) + '</p><p class="stat-label">' + (ar ? '\u0627\u0644\u0623\u0631\u0628\u0627\u062d' : 'Earned') + '</p></div>';
    h += '<div class="card glass stat-card"><i class="fas fa-check-circle"></i><p class="stat-val">' + (stats.qualified || 0) + '</p><p class="stat-label">' + (ar ? '\u0645\u0624\u0647\u0644\u0648\u0646' : 'Qualified') + '</p></div>';
    h += '</div>';

    /* milestones */
    h += Pages._sectionTitle(ar ? '\u0627\u0644\u0645\u0631\u0627\u062d\u0644' : 'Milestones');
    h += '<div class="grid grid-milestones">';
    milestones.forEach(function (m) {
      var done = stats.total >= m.required;
      h += '<div class="card glass milestone-card ' + (done ? 'milestone-done' : '') + '">';
      h += '<i class="fas fa-' + (done ? 'check-circle text-success' : 'circle') + '"></i>';
      h += '<p>' + U.esc(m.label) + '</p>';
      h += '<span class="badge badge-gold">' + U.coins(m.reward) + '</span>';
      h += '</div>';
    });
    h += '</div>';

    /* referred users */
    if (referred.length) {
      h += Pages._sectionTitle(ar ? '\u0627\u0644\u0645\u062f\u0639\u0648\u0646\u064A\u0646' : 'Referred Users');
      h += '<div class="glass card" style="padding:0"><table class="table"><thead><tr>';
      h += '<th>' + (ar ? '\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645' : 'User') + '</th>';
      h += '<th>' + (ar ? '\u0627\u0644\u062d\u0627\u0644\u0629' : 'Status') + '</th>';
      h += '<th>' + (ar ? '\u0627\u0644\u0623\u0631\u0628\u0627\u062d' : 'Reward') + '</th>';
      h += '</tr></thead><tbody>';
      referred.forEach(function (r) {
        var stCls = r.qualified ? 'badge-success' : 'badge-muted';
        var stLabel = r.qualified ? (ar ? '\u0645\u0624\u0647\u0644' : 'Qualified') : (ar ? '\u0645\u0639\u0646\u064A' : 'Pending');
        h += '<tr><td>' + U.esc(r.name) + '</td><td><span class="badge ' + stCls + '">' + stLabel + '</span></td>';
        h += '<td>' + U.coins(r.reward) + '</td></tr>';
      });
      h += '</tbody></table></div>';
    }

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     16. LEADERBOARD
     ========================================================== */
  leaderboard: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var topUsers = UserState.getTopUsers(50);

    var h = Pages._header(ar ? '\u0644\u0648\u062d\u0629 \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u064A\u0646' : 'Leaderboard');

    h += '<div class="glass card leaderboard-table" style="padding:0">';
    h += '<table class="table"><thead><tr>';
    h += '<th>#</th>';
    h += '<th>' + (ar ? '\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645' : 'User') + '</th>';
    h += '<th>' + (ar ? '\u0627\u0644\u0645\u0633\u062a\u0648\u0649' : 'Level') + '</th>';
    h += '<th>' + (ar ? '\u0625\u0631\u0628\u0627\u062d' : 'Earned') + '</th>';
    h += '</tr></thead><tbody>';

    if (!topUsers.length) {
      h += '<tr><td colspan="4" class="text-center">' + (ar ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0628\u064a\u0627\u0646\u0627\u062a' : 'No data yet') + '</td></tr>';
    }

    topUsers.forEach(function (usr, i) {
      var medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
      h += '<tr class="' + (i < 3 ? 'top-three' : '') + '">';
      h += '<td class="lb-rank">' + medal + ' ' + (i + 1) + '</td>';
      h += '<td class="lb-user"><span class="lb-avatar-sm">' + U.esc((usr.name || '?')[0].toUpperCase()) + '</span> ' + U.esc(usr.name) + '</td>';
      h += '<td>' + (usr.level || 1) + '</td>';
      h += '<td class="text-gold">' + U.coins(usr.totalEarned) + '</td>';
      h += '</tr>';
    });
    h += '</tbody></table></div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     17. NOTIFICATIONS
     ========================================================== */
  notifications: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var list = Notifications.getAll();

    var h = Pages._header(ar ? '\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a' : 'Notifications');

    if (!list.length) {
      h += Pages._empty(ar ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0625\u0634\u0639\u0627\u0631\u0627\u062a' : 'No notifications');
    } else {
      h += '<div class="notif-list">';
      list.forEach(function (n) {
        var readCls = n.read ? 'notif-read' : 'notif-unread';
        var iconMap = { reward: 'fas fa-coins', bonus: 'fas fa-gift', alert: 'fas fa-exclamation-triangle', info: 'fas fa-info-circle' };
        h += '<div class="card glass notif-card ' + readCls + '" onclick="Notifications.markRead(\'' + U.esc(n.id) + '\')">';
        h += '<div class="notif-icon"><i class="' + (iconMap[n.type] || 'fas fa-bell') + '"></i></div>';
        h += '<div class="notif-body">';
        h += '<h4>' + U.esc(n.title) + '</h4>';
        h += '<p>' + U.esc(n.message) + '</p>';
        h += '<span class="notif-date">' + U.esc(n.date) + '</span>';
        h += '</div>';
        if (!n.read) h += '<span class="notif-dot"></span>';
        h += '</div>';
      });
      h += '</div>';
    }

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     18. SUPPORT
     ========================================================== */
  support: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var faqItems = Notifications.getFaq(20);

    var h = Pages._header(ar ? '\u0627\u0644\u062f\u0639\u0645' : 'Support');

    /* FAQ */
    h += Pages._sectionTitle(ar ? '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629' : 'FAQ');
    h += '<div class="faq-list">';
    faqItems.forEach(function (f) {
      h += '<details class="glass faq-item"><summary>' + U.esc(f.q) + '</summary><p>' + U.esc(f.a) + '</p></details>';
    });
    h += '</div>';

    /* contact form */
    h += Pages._sectionTitle(ar ? '\u062a\u0648\u0635\u0644 \u0628\u0646\u0627' : 'Contact Us');
    h += '<div class="card glass">';
    h += '<form id="supportForm" onsubmit="Tickets.submit(event);return false;">';
    h += '<label class="form-label">' + (ar ? '\u0627\u0644\u0645\u0648\u0636\u0648\u0639' : 'Subject') + '</label>';
    h += '<input name="subject" class="form-input" required>';
    h += '<label class="form-label">' + (ar ? '\u0627\u0644\u0631\u0633\u0627\u0644\u0629' : 'Message') + '</label>';
    h += '<textarea name="message" class="form-input" rows="4" required></textarea>';
    h += '<button type="submit" class="btn btn-primary btn-block">' + (ar ? '\u0625\u0631\u0633\u0627\u0644' : 'Send') + '</button>';
    h += '</form></div>';

    /* discord */
    h += '<a href="https://discord.gg/rewords" target="_blank" rel="noopener" class="card glass discord-card">';
    h += '<i class="fab fa-discord"></i>';
    h += '<h3>' + (ar ? '\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 Discord' : 'Join our Discord') + '</h3></a>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     19. FAQ
     ========================================================== */
  faq: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var faqItems = Notifications.getFaq(50);

    var h = Pages._header(ar ? '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629' : 'FAQ');
    h += '<div class="faq-list">';
    if (!faqItems.length) {
      h += Pages._empty(ar ? '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0633\u0626\u0644\u0629' : 'No FAQ available');
    }
    faqItems.forEach(function (f) {
      h += '<details class="glass faq-item"><summary>' + U.esc(f.q) + '</summary><p>' + U.esc(f.a) + '</p></details>';
    });
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     20. TERMS
     ========================================================== */
  terms: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var h = Pages._header(ar ? '\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645' : 'Terms of Service');
    h += '<div class="card glass legal-content">';
    if (ar) {
      h += '<h3>\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645</h3>';
      h += '<p>\u0628\u0645\u0646 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0643 \u0644\u0645\u0648\u0642\u0639 ReWords \u0623\u0646\u062a \u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637\u060C \u0648\u062a\u0628\u0646\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0645\u0624\u062d\u0644\u0629.</p>';
      h += '<ul><li>\u064a\u062c\u0628 \u0623\u0644\u0627 \u064a\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0645\u0648\u0642\u0639 \u0645\u0646 \u0642\u0628\u0644 13 \u0639\u0627\u0645</li>';
      h += '<li>\u0645\u0646\u0639 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0648\u0627\u062d\u062f \u062d\u0633\u0627\u0628 \u0648\u0627\u062d\u062f</li>';
      h += '<li>\u0645\u0646\u0639 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0647\u062f\u0627\u0641 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u064a\u0629 \u0645\u0645\u0646\u0639</li>';
      h += '<li>\u064a\u062d\u0638\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0644\u0644\u0645\u0648\u0627\u0642\u0639\u064a\u0646</li>';
      h += '<li>\u0646\u062d\u0646 \u0646\u062d\u0641\u0638 \u0639\u0644\u0649 \u062d\u0633\u0627\u0628\u0627\u062a \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u064a\u0646 \u0628\u062f\u0648\u0646 \u0625\u062e\u0637\u0627\u0621</li></ul>';
    } else {
      h += '<h3>Terms of Service</h3>';
      h += '<p>By using ReWords you agree to these terms and all applicable laws.</p>';
      h += '<ul><li>Must be 13+ to use the platform</li>';
      h += '<li>One account per user only</li>';
      h += '<li>Use of bots or automation is prohibited</li>';
      h += '<li>Fair use of rewards is required</li>';
      h += '<li>We reserve the right to ban accounts for fraud</li></ul>';
    }
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     21. PRIVACY
     ========================================================== */
  privacy: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var h = Pages._header(ar ? '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629' : 'Privacy Policy');
    h += '<div class="card glass legal-content">';
    if (ar) {
      h += '<h3>\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629</h3>';
      h += '<p>\u0646\u062d\u0646\u0646 \u062e\u0635\u0648\u0635\u064a\u062a\u0643 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629.</p>';
      h += '<ul><li>\u0646\u062c\u0645\u0639 \u0628\u0639\u0636 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0644\u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u062e\u062f\u0645\u0629</li>';
      h += '<li>\u0646\u0633\u062a\u062e\u062f\u0645 \u062e\u0637\u0648\u0627\u062a \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0644\u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u062e\u062f\u0645\u0629</li>';
      h += '<li>\u0646\u062d\u0627\u0641\u0638 \u0639\u0644\u0649 \u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0648\u0646\u0624\u0645\u0636\u0629 \u0639\u0646 \u0628\u0639\u0636\u0647\u0627</li>';
      h += '<li>\u0644\u0646 \u0646\u0634\u062a\u0631\u0643 \u0628\u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0645\u0639 \u0623\u062e\u0631\u0649 \u0623\u0646\u0648\u0627\u0639</li>';
      h += '<li>\u0644\u0643 \u0627\u0644\u062d\u0642 \u0641\u064a \u0645\u0631\u0627\u062c\u0639\u0629 \u0628\u064a\u0627\u0646\u0627\u062a\u0643</li></ul>';
      h += '<p><strong>\u0627\u0644\u062d\u0642\u0648\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629 (GDPR):</strong> \u0644\u0643 \u0627\u0644\u062d\u0642 \u0641\u064a \u0627\u0644\u0648\u0635\u0644 \u0628\u0628\u064a\u0627\u0646\u0627\u062a\u0643\u060C \u062a\u062d\u0630\u0641\u0647\u0627\u060C \u062a\u0639\u062f\u064a\u0644\u0647\u0627\u060C \u0623\u0648 \u062d\u0630\u0641 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0645\u0637\u0644\u0648\u0628\u064B.</p>';
    } else {
      h += '<h3>Privacy Policy</h3>';
      h += '<p>We value your privacy. This policy explains how we handle your data.</p>';
      h += '<ul><li>We collect minimal personal information to provide service</li>';
      h += '<li>We use data only to improve your experience</li>';
      h += '<li>We never sell your personal information to third parties</li>';
      h += '<li>We do not track children under 13</li>';
      h += '<li>You have the right to access your data</li></ul>';
      h += '<p><strong>GDPR Rights:</strong> You can access, delete, or correct your personal data at any time by contacting support.</p>';
    }
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     22. ANTI-FRAUD
     ========================================================== */
  antiFraud: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';
    var status = AntiFraud.getStatus();

    var h = Pages._header(ar ? '\u0633\u064a\u0627\u0633\u0629 \u0645\u0646\u0627\u0639\u0631\u0636\u0629 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0644' : 'Anti-Fraud Policy');

    h += '<section class="card glass">';
    h += '<h3>' + (ar ? '\u062d\u0627\u0644\u0629 \u0627\u0644\u062d\u0633\u0627\u0628\u0643' : 'Your Account Status') + '</h3>';
    var statusCls = status.clean ? 'badge-success' : 'badge-danger';
    var statusLabel = status.clean ? (ar ? '\u0646\u0638\u064a\u0641' : 'Clean') : (ar ? '\u0645\u0631\u0635\u0648\u062f' : 'Flagged');
    h += '<p>' + (ar ? '\u0627\u0644\u062d\u0627\u0644\u0629: ' : 'Status: ') + '<span class="badge ' + statusCls + '">' + statusLabel + '</span></p>';
    h += '</section>';

    h += '<div class="card glass legal-content">';
    if (ar) {
      h += '<ul>';
      h += '<li>\u0645\u0646\u0639 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0628\u0631\u0646\u0627\u0645\u062c\u0627\u062a \u0627\u0644\u0625\u0637\u0644\u0627\u0639 \u0645\u0646\u0639\u064B</li>';
      h += '<li>\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0623\u0642\u0644\u0645\u0629 \u062c\u0648\u0632\u0641 \u0627\u0644\u0647\u0648\u064a\u0627\u062a \u0627\u0644\u0627\u0648\u0636\u064a\u0629 \u0627\u0644\u0635\u0646\u0639\u0627\u0626\u064a\u0629</li>';
      h += '<li>\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0645\u0639\u0631\u0641\u0627\u062a \u0632\u064a\u0641\u0629</li>';
      h += '<li>\u062a\u0639\u0627\u0648\u0646 \u0645\u0639 \u0623\u062d\u0633\u0627\u0628 \u0645\u0636\u0644\u062d\u0629</li>';
      h += '<li>\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0635\u0646\u0639\u0627\u0626\u064a\u0629</li>';
      h += '<li>\u062c\u0647\u0648\u0632 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062c\u0647\u0627\u0632\u0627\u062a \u0627\u0644\u0645\u0632\u064a\u0641\u0629</li>';
      h += '</ul>';
    } else {
      h += '<ul>';
      h += '<li>Using referral farming bots is prohibited</li>';
      h += '<li>Using emulators or virtual devices is prohibited</li>';
      h += '<li>Using fake identities</li>';
      h += '<li>Colluding with multiple accounts</li>';
      h += '<li>Using cheats or exploits</li>';
      h += '<li>Manipulating reward amounts</li>';
      h += '</ul>';
    }
    h += '</div>';

    if (!status.clean) {
      h += '<section class="card glass"><p class="text-danger">' + (ar ? '\u064a\u064f\u0646\u062a\u0638\u0631 \u062d\u0633\u0627\u0628\u0643 \u0628\u0639\u0636 \u0627\u0644\u062a\u0646\u0638\u064a\u0641. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645' : 'Your account is under review. Please contact support') + '</p></section>';
    }

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     23. NOT FOUND 404
     ========================================================== */
  notFound: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var h = '<div class="not-found">';
    h += '<h1 class="not-found-code">404</h1>';
    h += '<p class="not-found-msg">' + (ar ? '\u0627\u0644\u0635\u0641\u062d\u0629 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f\u0629' : 'Page Not Found') + '</p>';
    h += '<a href="#/home" class="btn btn-primary btn-lg"><i class="fas fa-home"></i> ' + (ar ? '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629' : 'Home') + '</a>';
    h += '</div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  },

  /* ==========================================================
     24. REGISTER
     ========================================================== */
  register: function () {
    var ac = document.getElementById("app"); if (!ac) return;
    var ar = I18n.lang === 'ar';

    var h = '<div class="auth-page">';
    h += '<div class="auth-card glass">';
    h += '<div class="auth-logo"><i class="fas fa-coins"></i></div>';
    h += '<h2>' + (ar ? '\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628 \u062c\u062f\u064A\u062f' : 'Create Account') + '</h2>';

    h += '<form id="registerForm" onsubmit="Auth.register(event);return false;">';
    h += '<div class="form-group">';
    h += '<label class="form-label">' + (ar ? '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644' : 'Full Name') + '</label>';
    h += '<input name="name" type="text" class="form-input" required placeholder="' + (ar ? '\u0623\u062f\u062e\u0644 \u0627\u0633\u0645\u0643' : 'Enter your name') + '">';
    h += '</div>';

    h += '<div class="form-group">';
    h += '<label class="form-label">' + (ar ? '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064A' : 'Email') + '</label>';
    h += '<input name="email" type="email" class="form-input" required placeholder="' + (ar ? '\u0623\u062f\u062e\u0644 \u0628\u0631\u064a\u062f\u0643' : 'Enter your email') + '">';
    h += '</div>';

    h += '<div class="form-group">';
    h += '<label class="form-label">' + (ar ? '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631' : 'Password') + '</label>';
    h += '<input name="password" type="password" class="form-input" required minlength="6" placeholder="' + (ar ? '6 \u0623\u062d\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644' : 'Minimum 6 characters') + '">';
    h += '</div>';

    h += '<div class="form-group">';
    h += '<label class="form-label">' + (ar ? '\u0631\u0645\u0632 \u0627\u0644\u0625\u0637\u0644\u0627\u0639 (اختياري)' : 'Referral Code (optional)') + '</label>';
    h += '<input name="referral" type="text" class="form-input" placeholder="' + (ar ? '\u0623\u062f\u062e\u0644 \u0631\u0645\u0632 \u0627\u0644\u0625\u0637\u0644\u0627\u0639' : 'Enter referral code') + '">';
    h += '</div>';

    h += '<button type="submit" class="btn btn-gold btn-lg btn-block">' + (ar ? '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062a\u0633\u062c\u064A\u0644' : 'Register') + '</button>';
    h += '</form>';

    h += '<p class="auth-switch">' + (ar ? '\u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061F ' : 'Already have an account? ') + '<a href="#/login">' + (ar ? '\u062a\u0633\u062c\u064A\u0644 \u0627\u0644\u062f\u062e\u0648\u0644' : 'Sign In') + '</a></p>';
    h += '</div></div>';

    ac.innerHTML = h;
    Effects.reveal(); U.observe();
  }
};

/* ============================================================
   SpinRenderer – draws the spin wheel on a <canvas>
   ============================================================ */
var SpinRenderer = {

  drawWheel: function (canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;
    var cx = W / 2;
    var cy = H / 2;
    var R = Math.min(cx, cy) - 12;

    var prizes = SpinWheel.getPrizes();
    var count = prizes.length;
    var arc = (2 * Math.PI) / count;

    var colors = [
      '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
      '#9B59B6', '#FF8C00', '#1ABC9C', '#E74C3C'
    ];

    ctx.clearRect(0, 0, W, H);

    /* draw segments */
    for (var i = 0; i < count; i++) {
      var startAngle = i * arc - Math.PI / 2;
      var endAngle = startAngle + arc;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      /* label */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + arc / 2);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var label = prizes[i] ? prizes[i].label : '';
      var shortLabel = label.length > 8 ? label.substring(0, 7) + '..' : label;
      ctx.fillText(shortLabel, R * 0.62, 0);
      ctx.restore();
    }

    /* center circle */
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.18, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = '#FFD93D';
    ctx.lineWidth = 3;
    ctx.stroke();

    /* center icon */
    ctx.fillStyle = '#FFD93D';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u2726', cx, cy);
  }
};


/* ============================================================
   ReWords SPA — Part 4: AdminPanel, Router, App
   ============================================================ */

// ─── AdminPanel ──────────────────────────────────────────────
var AdminPanel = {
  render: function () {
    var me = this;
    var tabs = [
      { id: "dashboard",  icon: "\u25a6", label: "\u0627\u0644\u0644\u0648\u062d\u0629 \u0627\u0644\u0639\u0627\u0645\u0629" },
      { id: "users",      icon: "\u263a", label: "\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646" },
      { id: "games",      icon: "\u25cf", label: "\u0627\u0644\u0623\u0644\u0639\u0627\u0628" },
      { id: "offers",     icon: "\u2605", label: "\u0627\u0644\u0639\u0631\u0648\u0636\u0627\u062a" },
      { id: "providers",  icon: "\u25b2", label: "\u0645\u0632\u0648\u062f\u064a \u0627\u0644\u0639\u0631\u0648\u0636\u0627\u062a" },
      { id: "orders",     icon: "\u25a1", label: "\u0627\u0644\u0637\u0644\u0628\u0627\u062a" },
      { id: "withdrawals",icon: "\u2195", label: "\u0627\u0644\u0633\u062d\u0628\u0627\u062a" },
      { id: "fraud",      icon: "\u26a0", label: "\u0645\u0631\u0643\u0632 \u0627\u0644\u062a\u062d\u0631\u064a\u0635" },
      { id: "finance",    icon: "\u00a4", label: "\u0627\u0644\u0645\u0627\u0644\u064a\u0627\u062a" },
      { id: "analytics",  icon: "\u2261", label: "\u0627\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a" },
      { id: "ads",        icon: "\u25c6", label: "\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a" },
      { id: "campaigns",  icon: "\u2191", label: "\u0627\u0644\u0628\u0639\u062b\u0627\u062a" },
      { id: "referral",   icon: "\u2194", label: "\u0627\u0644\u0625\u062d\u0627\u0644\u0629" },
      { id: "content",    icon: "\u270e", label: "\u0627\u0644\u0645\u062d\u062a\u0648\u0627\u0628" },
      { id: "support",    icon: "\u2709", label: "\u0627\u0644\u062f\u0639\u0645" },
      { id: "settings",   icon: "\u2699", label: "\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a" },
      { id: "security",   icon: "\u26e8", label: "\u0627\u0644\u0623\u0645\u0627\u0646" }
    ];

    var active = (Pages._adminTab || "dashboard");
    var sidebar = tabs.map(function (t) {
      var cls = t.id === active ? " active" : "";
      return "<button class=\"admin-tab" + cls + "\" data-tab=\"" + t.id + "\">" +
        "<span class=\"tab-icon\">" + t.icon + "</span>" +
        "<span class=\"tab-label\">" + t.label + "</span></button>";
    }).join("");

    var html =
      "<div class=\"admin-layout\">" +
        "<aside class=\"admin-sidebar\">" +
          "<div class=\"admin-brand\">\u2699 " + U.t("admin_panel") + "</div>" +
          "<nav class=\"admin-nav\">" + sidebar + "</nav>" +
        "</aside>" +
        "<main class=\"admin-content\" id=\"adminContent\"></main>" +
      "</div>";

    U.id("app").innerHTML = html;

    document.querySelectorAll(".admin-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = btn.getAttribute("data-tab");
        Router.go("admin/" + tab);
      });
    });

    me.loadTab(active);
  },

  loadTab: function (tab) {
    Pages._adminTab = tab;
    var c = document.getElementById("adminContent");
    if (!c) return;
    var renderers = {
      dashboard:  me.renderDashboard,
      users:      me.renderUsers,
      games:      me.renderGames,
      offers:     me.renderOffers,
      providers:  me.renderProviders,
      orders:     me.renderOrders,
      withdrawals:me.renderWithdrawals,
      fraud:      me.renderFraud,
      finance:    me.renderFinance,
      analytics:  me.renderAnalytics,
      ads:        me.renderAds,
      campaigns:  me.renderCampaigns,
      referral:   me.renderReferralSettings,
      content:    me.renderContent,
      support:    me.renderSupport,
      settings:   me.renderSettings,
      security:   me.renderSecurity
    };
    if (renderers[tab]) renderers[tab].call(me, c);
    else c.innerHTML = "<p class=\"empty-state\">\u0639\u0646\u0635\u0631 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641</p>";

    document.querySelectorAll(".admin-tab").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === tab);
    });
  },

  /* ── Dashboard ───────────────────────────────────────────── */
  renderDashboard: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0644\u0648\u062d\u0629 \u0627\u0644\u0639\u0627\u0645\u0629</h2></div>" +
      "<div class=\"stats-grid\" id=\"dashStats\"><div class=\"loading-spinner\"></div></div>" +
      "<div class=\"charts-row\" id=\"dashCharts\"></div>";

    (async function () {
      try {
        var usersSnap = await FB.db.collection("users").get();
        var totalUsers = usersSnap.size;
        var oneDayAgo = Date.now() - 86400000;
        var activeUsers = 0;
        var totalRevenue = 0;
        var pendingWithdrawals = 0;
        var pendingOrders = 0;
        var fraudAlerts = 0;

        usersSnap.forEach(function (doc) {
          var d = doc.data();
          if (d.lastSeen && d.lastSeen > oneDayAgo) activeUsers++;
          totalRevenue += d.totalRevenue || 0;
        });

        var wSnap = await FB.db.collection("withdrawals").where("status", "==", "pending").get();
        pendingWithdrawals = wSnap.size;

        var oSnap = await FB.db.collection("orders").where("status", "==", "pending").get();
        pendingOrders = oSnap.size;

        var fSnap = await FB.db.collection("fraud_alerts").where("status", "==", "open").get();
        fraudAlerts = fSnap.size;

        var convRate = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : "0.0";
        var arpu = totalUsers > 0 ? (totalRevenue / totalUsers).toFixed(2) : "0.00";

        var cards = [
          { icon: "\u263a", label: "\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646", value: U.coins(totalUsers), color: "#4f46e5" },
          { icon: "\u25b6", label: "\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646 \u0627\u0644\u0646\u0634\u0637\u064a\u0646", value: U.coins(activeUsers), color: "#22c55e" },
          { icon: "\u00a4", label: "\u0627\u0644\u0625\u062f\u062e\u0644\u064a\u0627\u062a", value: U.usd(totalRevenue), color: "#f59e0b" },
          { icon: "\u2193", label: "\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0633\u062d\u0628 \u0627\u0644\u0645\u0639\u062a\u0645\u0631\u062f\u0629", value: U.coins(pendingWithdrawals), color: "#ef4444" },
          { icon: "\u25a1", label: "\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0639\u062a\u0645\u0631\u062f\u0629", value: U.coins(pendingOrders), color: "#8b5cf6" },
          { icon: "\u26a0", label: "\u062a\u0646\u0628\u064a\u0647\u0627\u062a \u0627\u0644\u062a\u062d\u0631\u064a\u0635", value: U.coins(fraudAlerts), color: "#dc2626" },
          { icon: "\u2261", label: "\u0645\u0639\u062f\u0644 \u0627\u0644\u062a\u062d\u0648\u064a\u0644", value: convRate + "%", color: "#06b6d4" },
          { icon: "\u25cf", label: "\u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0625\u062f\u062e\u0627\u0644 \u0644\u0644\u0645\u0633\u062a\u062e\u062f\u0645", value: "$" + arpu, color: "#14b8a6" }
        ];

        var html = cards.map(function (cd) {
          return "<div class=\"stat-card\" style=\"border-top:3px solid " + cd.color + "\">" +
            "<div class=\"stat-icon\" style=\"color:" + cd.color + "\">" + cd.icon + "</div>" +
            "<div class=\"stat-value\">" + cd.value + "</div>" +
            "<div class=\"stat-label\">" + cd.label + "</div></div>";
        }).join("");

        U.id("dashStats").innerHTML = html;
        U.id("dashCharts").innerHTML =
          "<div class=\"chart-placeholder\">\u0625\u062e\u0635\u0627\u0621\u064a\u0627\u062a \u0645\u0628\u0646\u064a\u0629 \u0639\u0645\u0631\u0627\u064b \u0645\u0645\u0643\u0646</div>";
      } catch (e) {
        U.id("dashStats").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Users ───────────────────────────────────────────────── */
  renderUsers: function (c) {
    var me = this;
    c.innerHTML =
      "<div class=\"admin-header\">" +
        "<h2>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646</h2>" +
        "<div class=\"header-actions\">" +
          "<input type=\"text\" id=\"userSearch\" class=\"admin-search\" placeholder=\"\u0628\u062d\u062b \u0639\u0646 \u0627\u0633\u0645 \u0623\u0648 \u0628\u0631\u064a\u062f\u064a\u062f...\">" +
          "<select id=\"userRoleFilter\" class=\"admin-select\">" +
            "<option value=\"all\">\u0627\u0644\u0643\u0644</option>" +
            "<option value=\"user\">\u0645\u0633\u062a\u062e\u062f\u0645</option>" +
            "<option value=\"admin\">\u0645\u0633\u0626\u0648\u0644</option>" +
          "</select>" +
        "</div>" +
      "</div>" +
      "<div id=\"usersList\"><div class=\"loading-spinner\"></div></div>";

    var render = async function (search) {
      try {
        var snap = await FB.db.collection("users").get();
        var rows = [];
        snap.forEach(function (doc) {
          var d = doc.data();
          d.id = doc.id;
          if (search && d.email && d.email.toLowerCase().indexOf(search.toLowerCase()) === -1 &&
              d.name && d.name.toLowerCase().indexOf(search.toLowerCase()) === -1) return;
          rows.push(d);
        });

        if (rows.length === 0) {
          U.id("usersList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\">" +
          "<thead><tr>" +
            "<th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0628\u0631\u064a\u062f</th>" +
            "<th>\u0627\u0644\u062f\u0648\u0644\u0629</th><th>\u0627\u0644\u062f\u0648\u0631</th>" +
            "<th>\u0646\u0642\u0637\u0629 \u0627\u0644\u062e\u0637\u0631</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th>" +
          "</tr></thead><tbody>";

        rows.forEach(function (u) {
          var riskCls = (u.riskScore || 0) > 70 ? "risk-high" : (u.riskScore || 0) > 40 ? "risk-medium" : "risk-low";
          html += "<tr>" +
            "<td>" + U.sanitize(u.name || "\u063a\u064a\u0631 \u0645\u0648\u0636\u062d") + "</td>" +
            "<td>" + U.sanitize(u.email || "") + "</td>" +
            "<td>" + U.coins(u.coins || 0) + "</td>" +
            "<td><span class=\"role-badge role-" + (u.role || "user") + "\">" + (u.role || "user") + "</span></td>" +
            "<td><span class=\"risk-badge " + riskCls + "\">" + (u.riskScore || 0) + "</span></td>" +
            "<td class=\"actions-cell\">" +
              "<button class=\"btn-sm btn-info\" onclick=\"AdminPanel.viewUser('" + u.id + "')\">\u062a\u0641\u0635\u064a\u0644</button>" +
              (u.role !== "admin" ? "<button class=\"btn-sm btn-warn\" onclick=\"AdminPanel.makeAdmin('" + u.id + "')\">\u062c\u0639\u0644\u0647 \u0645\u0633\u0626\u0648\u0644</button>" : "") +
              "<button class=\"btn-sm btn-primary\" onclick=\"AdminPanel.adjustBalance('" + u.id + "')\">\u062a\u0639\u062f\u064a\u0644 \u0631\u0635\u064a\u062f</button>" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.banUser('" + u.id + "')\">\u062d\u0638\u0631</button>" +
            "</td></tr>";
        });

        html += "</tbody></table></div>";
        U.id("usersList").innerHTML = html;
      } catch (e) {
        U.id("usersList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    };

    document.getElementById("userSearch").addEventListener("input", function () {
      render(this.value);
    });
    document.getElementById("userRoleFilter").addEventListener("change", function () {
      render(document.getElementById("userSearch").value);
    });
    render("");
  },

  /* ── Games ───────────────────────────────────────────────── */
  renderGames: function (c) {
    var me = this;
    c.innerHTML =
      "<div class=\"admin-header\">" +
        "<h2>\u0627\u0644\u0623\u0644\u0639\u0627\u0628</h2>" +
        "<div class=\"header-actions\">" +
          "<button class=\"btn-primary\" id=\"addGameBtn\">+ \u0625\u0636\u0627\u0641\u0629 \u0644\u0639\u0628\u0629</button>" +
        "</div>" +
      "</div>" +
      "<div id=\"gamesList\"><div class=\"loading-spinner\"></div></div>";

    var render = async function () {
      try {
        var snap = await FB.db.collection("games").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("gamesList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0644\u0639\u0627\u0628 \u0645\u0633\u062c\u0644\u0629</p>";
          return;
        }

        var html = "<div class=\"admin-grid\">";
        items.forEach(function (g) {
          html += "<div class=\"admin-card\">" +
            "<div class=\"card-header\">" +
              "<h3>" + U.sanitize(g.name || "") + "</h3>" +
              "<span class=\"badge badge-" + (g.active ? "success" : "muted") + "\">" + (g.active ? "\u0646\u0634\u0637" : "\u063a\u064a\u0631 \u0646\u0634\u0637") + "</span>" +
            "</div>" +
            "<p>\u0627\u0644\u0645\u062c\u0644\u062f: " + U.coins(g.reward || 0) + " \u0645\u0633\u0648\u0629</p>" +
            "<p>\u0627\u0644\u0641\u0626\u0629: " + U.sanitize(g.category || "-") + "</p>" +
            "<div class=\"card-actions\">" +
              "<button class=\"btn-sm btn-primary\" onclick=\"AdminPanel.editGame('" + g.id + "')\">\u062a\u0639\u062f\u064a\u0644</button>" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.deleteGame('" + g.id + "')\">\u062d\u0630\u0641</button>" +
            "</div>" +
          "</div>";
        });
        html += "</div>";
        U.id("gamesList").innerHTML = html;
      } catch (e) {
        U.id("gamesList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    };

    document.getElementById("addGameBtn").addEventListener("click", function () {
      UI.openModal(
        "\u0625\u0636\u0627\u0641\u0629 \u0644\u0639\u0628\u0629 \u062c\u062f\u064a\u062f\u0629",
        "<div class=\"form-group\"><label>\u0627\u0633\u0645 \u0627\u0644\u0644\u0639\u0628\u0629</label><input id=\"newGameName\" type=\"text\" class=\"form-input\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u0645\u062c\u0644\u062f (\u0645\u0633\u0648\u0629)</label><input id=\"newGameReward\" type=\"number\" class=\"form-input\" value=\"100\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u0641\u0626\u0629</label><input id=\"newGameCategory\" type=\"text\" class=\"form-input\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u0631\u0628\u0637 \u0627\u0644\u062e\u0627\u0635</label><input id=\"newGameLink\" type=\"url\" class=\"form-input\"></div>" +
        "<button class=\"btn-primary\" id=\"saveGameBtn\">\u062d\u0641\u0638</button>"
      );
      document.getElementById("saveGameBtn").addEventListener("click", async function () {
        var name = document.getElementById("newGameName").value.trim();
        var reward = parseInt(document.getElementById("newGameReward").value) || 0;
        var category = document.getElementById("newGameCategory").value.trim();
        var link = document.getElementById("newGameLink").value.trim();
        if (!name) { UI.toast("\u0623\u062f\u062e\u0644 \u0627\u0633\u0645 \u0627\u0644\u0644\u0639\u0628\u0629", "error"); return; }
        try {
          await FB.db.collection("games").add({ name: name, reward: reward, category: category, link: link, active: true, createdAt: Date.now() });
          UI.closeModal(); UI.toast("\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0644\u0639\u0628\u0629", "success");
          render();
        } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
      });
    });

    render();
  },

  /* ── Offers ──────────────────────────────────────────────── */
  renderOffers: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0639\u0631\u0648\u0636\u0627\u062a</h2>" +
        "<div class=\"header-actions\"><button class=\"btn-primary\" id=\"addOfferBtn\">+ \u0625\u0636\u0627\u0641\u0629 \u0639\u0631\u0636</button></div></div>" +
      "<div id=\"offersList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("offers").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("offersList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0631\u0648\u0636\u0627\u062a \u0645\u0633\u062c\u0644\u0629</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\"><thead><tr>" +
          "<th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0645\u0632\u0648\u062f</th>" +
          "<th>\u0627\u0644\u0645\u062c\u0632\u0627\u0621</th><th>\u0627\u0644\u062d\u0627\u0644\u0629</th>" +
          "<th>\u0645\u0645\u064a\u0632</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>";

        items.forEach(function (o) {
          html += "<tr>" +
            "<td>" + U.sanitize(o.name || "") + "</td>" +
            "<td>" + U.sanitize(o.provider || "-") + "</td>" +
            "<td>" + U.coins(o.reward || 0) + "</td>" +
            "<td><span class=\"badge badge-" + (o.active ? "success" : "muted") + "\">" + (o.active ? "\u0646\u0634\u0637" : "\u0645\u062a\u0648\u0642\u0641") + "</span></td>" +
            "<td>" + (o.featured ? "\u2605" : "-") + "</td>" +
            "<td class=\"actions-cell\">" +
              "<button class=\"btn-sm btn-primary\" onclick=\"AdminPanel.editOffer('" + o.id + "')\">\u062a\u0639\u062f\u064a\u0644</button>" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.deleteOffer('" + o.id + "')\">\u062d\u0630\u0641</button>" +
            "</td></tr>";
        });
        html += "</tbody></table></div>";
        U.id("offersList").innerHTML = html;
      } catch (e) {
        U.id("offersList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Providers ───────────────────────────────────────────── */
  renderProviders: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0645\u0632\u0648\u062f\u064a \u0627\u0644\u0639\u0631\u0648\u0636\u0627\u062a</h2>" +
        "<div class=\"header-actions\"><button class=\"btn-primary\" id=\"addProviderBtn\">+ \u0625\u0636\u0627\u0641\u0629 \u0645\u0632\u0648\u062f</button></div></div>" +
      "<div id=\"providersList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("providers").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("providersList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0632\u0627\u0648\u062f \u0645\u0633\u062c\u0644\u0629</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\"><thead><tr>" +
          "<th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0645\u0641\u062a\u0627\u062d API</th>" +
          "<th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>Postback URL</th>" +
          "<th>\u0627\u0644\u0625\u062f\u062e\u0644\u064a\u0627\u062a</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>";

        items.forEach(function (p) {
          html += "<tr>" +
            "<td>" + U.sanitize(p.name || "") + "</td>" +
            "<td><code>" + U.sanitize(p.apiKey || "") + "</code></td>" +
            "<td><span class=\"badge badge-" + (p.status === "active" ? "success" : "muted") + "\">" + (p.status || "inactive") + "</span></td>" +
            "<td><code>" + U.sanitize(p.postbackUrl || "-") + "</code></td>" +
            "<td>" + U.usd(p.revenue || 0) + "</td>" +
            "<td class=\"actions-cell\">" +
              "<button class=\"btn-sm btn-primary\" onclick=\"AdminPanel.editProvider('" + p.id + "')\">\u062a\u0639\u062f\u064a\u0644</button>" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.deleteProvider('" + p.id + "')\">\u062d\u0630\u0641</button>" +
            "</td></tr>";
        });
        html += "</tbody></table></div>";
        U.id("providersList").innerHTML = html;
      } catch (e) {
        U.id("providersList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Orders ──────────────────────────────────────────────── */
  renderOrders: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0637\u0644\u0628\u0627\u062a</h2>" +
        "<div class=\"header-actions\">" +
          "<select id=\"orderStatusFilter\" class=\"admin-select\">" +
            "<option value=\"all\">\u0627\u0644\u0643\u0644</option>" +
            "<option value=\"pending\">\u0645\u0639\u062a\u0645\u062f</option>" +
            "<option value=\"completed\">\u0645\u0643\u062a\u0645\u0644</option>" +
            "<option value=\"cancelled\">\u0645\u0644\u063a\u0627\u062a</option>" +
          "</select>" +
        "</div></div>" +
      "<div id=\"ordersList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("orders").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("ordersList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\"><thead><tr>" +
          "<th>#</th><th>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th>" +
          "<th>\u0627\u0644\u0644\u0639\u0628\u0629</th><th>\u0627\u0644\u0645\u0633\u0648\u0629</th>" +
          "<th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>\u0627\u0644\u062a\u0627\u0631\u064a\u062e</th>" +
          "<th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>";

        items.forEach(function (o) {
          var stCls = o.status === "completed" ? "success" : o.status === "cancelled" ? "danger" : "warn";
          html += "<tr>" +
            "<td>" + U.sanitize(o.id.slice(0, 8)) + "</td>" +
            "<td>" + U.sanitize(o.userId || "") + "</td>" +
            "<td>" + U.sanitize(o.gameName || "") + "</td>" +
            "<td>" + U.coins(o.coins || 0) + "</td>" +
            "<td><span class=\"badge badge-" + stCls + "\">" + U.sanitize(o.status || "pending") + "</span></td>" +
            "<td>" + U.date(o.createdAt) + "</td>" +
            "<td class=\"actions-cell\">" +
              "<button class=\"btn-sm btn-success\" onclick=\"AdminPanel.updateOrder('" + o.id + "','completed')\">\u062a\u0645</button>" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.updateOrder('" + o.id + "','cancelled')\">\u0645\u0644\u063a</button>" +
            "</td></tr>";
        });
        html += "</tbody></table></div>";
        U.id("ordersList").innerHTML = html;
      } catch (e) {
        U.id("ordersList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Withdrawals ─────────────────────────────────────────── */
  renderWithdrawals: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0633\u062d\u0628</h2></div>" +
      "<div id=\"withdrawalsList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("withdrawals").orderBy("createdAt", "desc").limit(100).get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("withdrawalsList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a \u0633\u062d\u0628</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\"><thead><tr>" +
          "<th>#</th><th>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th>" +
          "<th>\u0627\u0644\u0645\u0628\u0644\u063a</th><th>\u0627\u0644\u0637\u0631\u064a\u0642</th>" +
          "<th>\u0646\u0642\u0637\u0629 \u0627\u0644\u062e\u0637\u0631</th><th>\u0627\u0644\u062d\u0627\u0644\u0629</th>" +
          "<th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>";

        items.forEach(function (w) {
          var riskCls = (w.riskScore || 0) > 70 ? "risk-high" : "risk-low";
          var stCls = w.status === "approved" ? "success" : w.status === "rejected" ? "danger" : "warn";
          html += "<tr>" +
            "<td>" + U.sanitize(w.id.slice(0, 8)) + "</td>" +
            "<td>" + U.sanitize(w.userId || "") + "</td>" +
            "<td>" + U.usd(w.amount || 0) + "</td>" +
            "<td>" + U.sanitize(w.method || "") + "</td>" +
            "<td><span class=\"risk-badge " + riskCls + "\">" + (w.riskScore || 0) + "</span></td>" +
            "<td><span class=\"badge badge-" + stCls + "\">" + U.sanitize(w.status || "pending") + "</span></td>" +
            "<td class=\"actions-cell\">" +
              (w.status === "pending" ?
                "<button class=\"btn-sm btn-success\" onclick=\"AdminPanel.approveWithdrawal('" + w.id + "')\">\u062a\u0648\u0642\u064a\u0639</button>" +
                "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.rejectWithdrawal('" + w.id + "')\">\u0631\u0641\u0636</button>" : "") +
            "</td></tr>";
        });
        html += "</tbody></table></div>";
        U.id("withdrawalsList").innerHTML = html;
      } catch (e) {
        U.id("withdrawalsList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Fraud Center ────────────────────────────────────────── */
  renderFraud: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0645\u0631\u0643\u0632 \u0627\u0644\u062a\u062d\u0631\u064a\u0635</h2></div>" +
      "<div class=\"fraud-sections\">" +
        "<div id=\"fraudHighRisk\"></div>" +
        "<div id=\"fraudSharedDevices\"></div>" +
        "<div id=\"fraudVPN\"></div>" +
        "<div id=\"fraudChargebacks\"></div>" +
        "<div id=\"fraudBlocklist\"></div>" +
      "</div>";

    (async function () {
      try {
        var highRisk = await FB.db.collection("users").where("riskScore", ">", 70).limit(50).get();
        var hrHtml = "<h3>\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646 \u0639\u0627\u0644\u064a\u0648 \u0627\u0644\u062e\u0637\u0631</h3>";
        if (highRisk.empty) {
          hrHtml += "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646 \u0639\u0627\u0644\u064a\u064a\u0646 \u0645\u0646 \u0627\u0644\u062e\u0637\u0631</p>";
        } else {
          hrHtml += "<table class=\"admin-table\"><thead><tr><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0628\u0631\u064a\u062f</th><th>\u0627\u0644\u062f\u0648\u0631</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621</th></tr></thead><tbody>";
          highRisk.forEach(function (doc) {
            var d = doc.data();
            hrHtml += "<tr><td>" + U.sanitize(d.name || "") + "</td><td>" + U.sanitize(d.email || "") + "</td>" +
              "<td><span class=\"risk-badge risk-high\">" + (d.riskScore || 0) + "</span></td>" +
              "<td><button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.banUser('" + doc.id + "')\">\u062d\u0638\u0631</button></td></tr>";
          });
          hrHtml += "</tbody></table>";
        }
        U.id("fraudHighRisk").innerHTML = hrHtml;

        var sharedDev = await FB.db.collection("fraud_alerts").where("type", "==", "shared_device").where("status", "==", "open").get();
        var sdHtml = "<h3>\u0623\u062c\u0647\u0632\u0629 \u0645\u0634\u062a\u0631\u0643\u0629</h3>";
        if (sharedDev.empty) {
          sdHtml += "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u062c\u0647\u0632\u0629 \u0645\u0634\u062a\u0631\u0643\u0629 \u0645\u0641\u062a\u0648\u062d\u0629</p>";
        } else {
          sdHtml += "<ul class=\"fraud-list\">";
          sharedDev.forEach(function (doc) {
            var d = doc.data();
            sdHtml += "<li>" + U.sanitize(d.deviceId || "") + " \u2014 " + U.sanitize((d.users || []).length + " \u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646") + "</li>";
          });
          sdHtml += "</ul>";
        }
        U.id("fraudSharedDevices").innerHTML = sdHtml;

        var vpnSnap = await FB.db.collection("users").where("vpn", "==", true).limit(30).get();
        var vpnHtml = "<h3>\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0648\u0646 VPN</h3>";
        if (vpnSnap.empty) {
          vpnHtml += "<p class=\"empty-state\">\u0644\u0627 \u064a\u0648\u062c\u062f \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u064a\u0646 VPN</p>";
        } else {
          vpnHtml += "<table class=\"admin-table\"><thead><tr><th>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th><th>\u0627\u0644\u0628\u0631\u064a\u062f</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621</th></tr></thead><tbody>";
          vpnSnap.forEach(function (doc) {
            var d = doc.data();
            vpnHtml += "<tr><td>" + U.sanitize(d.name || "") + "</td><td>" + U.sanitize(d.email || "") + "</td>" +
              "<td><button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.banUser('" + doc.id + "')\">\u062d\u0638\u0631</button></td></tr>";
          });
          vpnHtml += "</tbody></table>";
        }
        U.id("fraudVPN").innerHTML = vpnHtml;

        var cbSnap = await FB.db.collection("fraud_alerts").where("type", "==", "chargeback").where("status", "==", "open").get();
        var cbHtml = "<h3>\u0627\u0633\u062a\u0631\u062f\u0627\u0639\u0627\u062a \u0627\u0644\u0633\u062d\u0628</h3>";
        if (cbSnap.empty) {
          cbHtml += "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0627\u0633\u062a\u0631\u062f\u0627\u0639\u0627\u062a \u0633\u062d\u0628</p>";
        } else {
          cbHtml += "<ul class=\"fraud-list\">";
          cbSnap.forEach(function (doc) {
            var d = doc.data();
            cbHtml += "<li>" + U.sanitize(d.userId || "") + " \u2014 " + U.usd(d.amount || 0) + "</li>";
          });
          cbHtml += "</ul>";
        }
        U.id("fraudChargebacks").innerHTML = cbHtml;

        var blSnap = await FB.db.collection("blocklist").get();
        var blHtml = "<h3>\u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0633\u0648\u062f\u0627\u0621</h3>";
        if (blSnap.empty) {
          blHtml += "<p class=\"empty-state\">\u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0641\u0627\u0631\u063a\u0629</p>";
        } else {
          blHtml += "<ul class=\"fraud-list\">";
          blSnap.forEach(function (doc) {
            var d = doc.data();
            blHtml += "<li>" + U.sanitize(d.value || "") + " (" + U.sanitize(d.type || "") + ") " +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.removeFromBlocklist('" + doc.id + "')\">\u062d\u0630\u0641</button></li>";
          });
          blHtml += "</ul>";
        }
        U.id("fraudBlocklist").innerHTML = blHtml;
      } catch (e) {
        c.innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Finance ─────────────────────────────────────────────── */
  renderFinance: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0645\u063a\u0631\u064a\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629</h2></div>" +
      "<div class=\"stats-grid\" id=\"financeStats\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var ordersSnap = await FB.db.collection("orders").where("status", "==", "completed").get();
        var totalRevenue = 0;
        ordersSnap.forEach(function (doc) { totalRevenue += (doc.data().usdValue || 0); });

        var withdrawalsSnap = await FB.db.collection("withdrawals").where("status", "==", "approved").get();
        var totalRewards = 0;
        withdrawalsSnap.forEach(function (doc) { totalRewards += (doc.data().amount || 0); });

        var paymentFees = totalRewards * 0.029;
        var fraudLosses = 0;
        var fraudSnap = await FB.db.collection("fraud_alerts").where("status", "==", "confirmed").get();
        fraudSnap.forEach(function (doc) { fraudLosses += (doc.data().amount || 0); });

        var netProfit = totalRevenue - totalRewards - paymentFees - fraudLosses;

        var items = [
          { label: "\u0627\u0644\u0625\u062f\u062e\u0644\u064a\u0627\u062a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a\u0629", value: U.usd(totalRevenue), color: "#22c55e" },
          { label: "\u0645\u0643\u0627\u0641\u0626\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646", value: U.usd(totalRewards), color: "#f59e0b" },
          { label: "\u0645\u0639\u0627\u0645\u0644 \u0627\u0644\u062f\u0641\u0639", value: U.usd(paymentFees), color: "#ef4444" },
          { label: "\u062e\u0633\u0627\u0626\u0631 \u0627\u0644\u062a\u062d\u0631\u064a\u0635", value: U.usd(fraudLosses), color: "#dc2626" },
          { label: "\u0627\u0644\u0631\u0628\u062d \u0627\u0644\u0635\u0627\u0641\u064a", value: U.usd(netProfit), color: netProfit >= 0 ? "#22c55e" : "#dc2626" }
        ];

        var html = items.map(function (it) {
          return "<div class=\"stat-card\" style=\"border-top:3px solid " + it.color + "\">" +
            "<div class=\"stat-value\" style=\"color:" + it.color + "\">" + it.value + "</div>" +
            "<div class=\"stat-label\">" + it.label + "</div></div>";
        }).join("");

        U.id("financeStats").innerHTML = html;
      } catch (e) {
        U.id("financeStats").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Analytics ───────────────────────────────────────────── */
  renderAnalytics: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a</h2></div>" +
      "<div class=\"stats-grid\" id=\"analyticsStats\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var now = Date.now();
        var d1 = now - 86400000;
        var w1 = now - 604800000;
        var m1 = now - 2592000000;

        var usersSnap = await FB.db.collection("users").get();
        var dau = 0, wau = 0, mau = 0, newUsers = 0, converted = 0;
        var total = 0;

        usersSnap.forEach(function (doc) {
          var d = doc.data();
          total++;
          var ls = d.lastSeen || 0;
          var cr = d.createdAt || 0;
          if (ls > d1) dau++;
          if (ls > w1) wau++;
          if (ls > m1) mau++;
          if (cr > d1) newUsers++;
          if (d.hasCompletedOffer) converted++;
        });

        var convRate = total > 0 ? ((converted / total) * 100).toFixed(1) : "0.0";
        var retention = total > 0 ? ((wau / total) * 100).toFixed(1) : "0.0";

        var items = [
          { label: "DAU", value: U.coins(dau) },
          { label: "WAU", value: U.coins(wau) },
          { label: "MAU", value: U.coins(mau) },
          { label: "\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646 \u062c\u062f\u064a\u062f\u064a\u0646", value: U.coins(newUsers) },
          { label: "\u0645\u0639\u062f\u0644 \u0627\u0644\u062a\u062d\u0648\u064a\u0644", value: convRate + "%" },
          { label: "\u0645\u0639\u062f\u0644 \u0627\u0644\u0627\u0644\u062a\u0632\u0627\u0645", value: retention + "%" }
        ];

        var html = items.map(function (it) {
          return "<div class=\"stat-card\"><div class=\"stat-value\">" + it.value + "</div><div class=\"stat-label\">" + it.label + "</div></div>";
        }).join("");

        U.id("analyticsStats").innerHTML = html;
      } catch (e) {
        U.id("analyticsStats").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Ads ─────────────────────────────────────────────────── */
  renderAds: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a</h2>" +
        "<div class=\"header-actions\"><button class=\"btn-primary\" id=\"addAdBtn\">+ \u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u0631\u0636</button></div></div>" +
      "<div id=\"adsList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("ad_placements").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("adsList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0639\u0627\u0631\u0636 \u0645\u0633\u062c\u0644\u0629</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\"><thead><tr>" +
          "<th>\u0627\u0644\u0627\u0633\u0645</th><th>eCPM</th>" +
          "<th>\u0627\u0644\u0625\u062f\u062e\u0644\u064a\u0627\u062a</th><th>\u0627\u0644\u062d\u0627\u0628\u0629</th>" +
          "<th>\u0627\u0644\u062d\u062f \u0644\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th>" +
          "<th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>";

        items.forEach(function (a) {
          html += "<tr>" +
            "<td>" + U.sanitize(a.name || "") + "</td>" +
            "<td>$" + (a.ecpm || 0).toFixed(2) + "</td>" +
            "<td>" + U.coins(a.impressions || 0) + "</td>" +
            "<td>" + U.usd(a.revenue || 0) + "</td>" +
            "<td>" + (a.perUserCap || "\u063a\u064a\u0631 \u0645\u062d\u062f\u062f") + "</td>" +
            "<td class=\"actions-cell\">" +
              "<label class=\"toggle\">" +
                "<input type=\"checkbox\" " + (a.active ? "checked" : "") + " onchange=\"AdminPanel.toggleAd('" + a.id + "',this.checked)\">" +
                "<span class=\"toggle-slider\"></span></label>" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.deleteAd('" + a.id + "')\">\u062d\u0630\u0641</button>" +
            "</td></tr>";
        });
        html += "</tbody></table></div>";
        U.id("adsList").innerHTML = html;
      } catch (e) {
        U.id("adsList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Campaigns ───────────────────────────────────────────── */
  renderCampaigns: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0628\u0639\u062b\u0627\u062a</h2>" +
        "<div class=\"header-actions\"><button class=\"btn-primary\" id=\"addCampaignBtn\">+ \u0625\u0646\u0634\u0627\u0621 \u0628\u0639\u062b</button></div></div>" +
      "<div id=\"campaignsList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("campaigns").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("campaignsList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0628\u0639\u062b\u0627\u062a \u0645\u0633\u062c\u0644\u0629</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\"><thead><tr>" +
          "<th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0645\u0636\u0631\u0648\u0639 \u0627\u0644\u0645\u0643\u0627\u0641\u0624</th>" +
          "<th>\u0627\u0644\u0639\u0631\u0648\u0636</th><th>\u0627\u0644\u0645\u0632\u0646\u0648\u0639</th>" +
          "<th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>";

        items.forEach(function (cp) {
          var stCls = cp.status === "active" ? "success" : "muted";
          html += "<tr>" +
            "<td>" + U.sanitize(cp.name || "") + "</td>" +
            "<td>" + (cp.bonusMultiplier || 1) + "x</td>" +
            "<td>" + U.coins((cp.offers || []).length) + " \u0639\u0631\u0636</td>" +
            "<td>" + U.usd(cp.budget || 0) + "</td>" +
            "<td><span class=\"badge badge-" + stCls + "\">" + U.sanitize(cp.status || "draft") + "</span></td>" +
            "<td class=\"actions-cell\">" +
              "<button class=\"btn-sm btn-primary\" onclick=\"AdminPanel.editCampaign('" + cp.id + "')\">\u062a\u0639\u062f\u064a\u0644</button>" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.deleteCampaign('" + cp.id + "')\">\u062d\u0630\u0641</button>" +
            "</td></tr>";
        });
        html += "</tbody></table></div>";
        U.id("campaignsList").innerHTML = html;
      } catch (e) {
        U.id("campaignsList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Referral Settings ───────────────────────────────────── */
  renderReferralSettings: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0625\u062d\u0627\u0644\u0629</h2></div>" +
      "<div class=\"settings-form\" id=\"referralSettings\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var doc = await FB.db.collection("settings").doc("referral").get();
        var d = doc.exists ? doc.data() : {};
        var html =
          "<div class=\"form-group\"><label>\u0645\u0628\u0644\u063a \u0627\u0644\u062a\u0633\u062c\u064a\u0644 (\u0645\u0633\u0648\u0629)</label>" +
            "<input id=\"refSignupBonus\" type=\"number\" class=\"form-input\" value=\"" + (d.signupBonus || 500) + "\"></div>" +
          "<div class=\"form-group\"><label>\u0645\u0628\u0644\u063a \u0623\u0648\u0644 \u0639\u0631\u0636 (\u0645\u0633\u0648\u0629)</label>" +
            "<input id=\"refFirstOfferBonus\" type=\"number\" class=\"form-input\" value=\"" + (d.firstOfferBonus || 1000) + "\"></div>" +
          "<div class=\"form-group\"><label>\u062d\u062f \u0627\u0644\u0625\u062d\u0627\u0644\u0629 \u0644\u0644\u0645\u0633\u062a\u062e\u062f\u0645</label>" +
            "<input id=\"refMaxReferrals\" type=\"number\" class=\"form-input\" value=\"" + (d.maxReferrals || 50) + "\"></div>" +
          "<div class=\"form-group\"><label>% \u0627\u0644\u0639\u0648\u064a\u062f \u0645\u0646 \u0627\u0644\u0639\u0645\u0644\u0627\u0621</label>" +
            "<input id=\"refRevenueShare\" type=\"number\" class=\"form-input\" value=\"" + (d.revenueShare || 10) + "\"></div>" +
          "<button class=\"btn-primary\" id=\"saveReferralBtn\">\u062d\u0641\u0638</button>";

        U.id("referralSettings").innerHTML = html;
        document.getElementById("saveReferralBtn").addEventListener("click", async function () {
          try {
            await FB.db.collection("settings").doc("referral").set({
              signupBonus: parseInt(document.getElementById("refSignupBonus").value) || 500,
              firstOfferBonus: parseInt(document.getElementById("refFirstOfferBonus").value) || 1000,
              maxReferrals: parseInt(document.getElementById("refMaxReferrals").value) || 50,
              revenueShare: parseInt(document.getElementById("refRevenueShare").value) || 10,
              updatedAt: Date.now()
            });
            UI.toast("\u062a\u0645 \u062d\u0641\u0638 \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0625\u062d\u0627\u0644\u0629", "success");
          } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
        });
      } catch (e) {
        U.id("referralSettings").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Content ─────────────────────────────────────────────── */
  renderContent: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0645\u062d\u062a\u0648\u0627\u0628</h2>" +
        "<div class=\"header-actions\"><button class=\"btn-primary\" id=\"addAnnouncementBtn\">+ \u0625\u0636\u0627\u0641\u0629 \u0625\u0639\u0644\u0627\u0646</button></div></div>" +
      "<div id=\"announcementsList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("announcements").orderBy("createdAt", "desc").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("announcementsList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0625\u0639\u0644\u0627\u0646\u0627\u062a</p>";
          return;
        }

        var html = "<div class=\"announcements-cards\">";
        items.forEach(function (a) {
          html += "<div class=\"admin-card\">" +
            "<div class=\"card-header\"><h3>" + U.sanitize(a.title || "") + "</h3></div>" +
            "<p>" + U.sanitize(a.body || "") + "</p>" +
            "<small>" + U.date(a.createdAt) + "</small>" +
            "<div class=\"card-actions\">" +
              "<button class=\"btn-sm btn-danger\" onclick=\"AdminPanel.deleteAnnouncement('" + a.id + "')\">\u062d\u0630\u0641</button>" +
            "</div></div>";
        });
        html += "</div>";
        U.id("announcementsList").innerHTML = html;
      } catch (e) {
        U.id("announcementsList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Support ─────────────────────────────────────────────── */
  renderSupport: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u062f\u0639\u0645</h2>" +
        "<div class=\"header-actions\">" +
          "<select id=\"ticketStatusFilter\" class=\"admin-select\">" +
            "<option value=\"all\">\u0627\u0644\u0643\u0644</option>" +
            "<option value=\"open\">\u0645\u0641\u062a\u0648\u062d</option>" +
            "<option value=\"replied\">\u062a\u0645 \u0627\u0644\u0631\u062f</option>" +
            "<option value=\"closed\">\u0645\u063a\u0644\u0642</option>" +
          "</select>" +
        "</div></div>" +
      "<div id=\"ticketsList\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var snap = await FB.db.collection("tickets").orderBy("createdAt", "desc").get();
        var items = [];
        snap.forEach(function (doc) { var d = doc.data(); d.id = doc.id; items.push(d); });

        if (items.length === 0) {
          U.id("ticketsList").innerHTML = "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u062a\u0642\u0636\u064a\u0627\u062a</p>";
          return;
        }

        var html = "<div class=\"admin-table-wrap\"><table class=\"admin-table\"><thead><tr>" +
          "<th>#</th><th>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th>" +
          "<th>\u0627\u0644\u0645\u0648\u0636\u0648\u0639</th><th>\u0627\u0644\u0631\u0633\u0627\u0644\u0629</th>" +
          "<th>\u0627\u0644\u062d\u0627\u0644\u0629</th><th>\u0627\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a</th></tr></thead><tbody>";

        items.forEach(function (t) {
          var stCls = t.status === "open" ? "warn" : t.status === "closed" ? "muted" : "success";
          html += "<tr>" +
            "<td>" + U.sanitize(t.id.slice(0, 8)) + "</td>" +
            "<td>" + U.sanitize(t.userId || "") + "</td>" +
            "<td>" + U.sanitize(t.subject || "") + "</td>" +
            "<td>" + U.sanitize((t.replies || []).length) + "</td>" +
            "<td><span class=\"badge badge-" + stCls + "\">" + U.sanitize(t.status || "open") + "</span></td>" +
            "<td class=\"actions-cell\">" +
              "<button class=\"btn-sm btn-primary\" onclick=\"AdminPanel.viewTicket('" + t.id + "')\">\u0639\u0631\u0636</button>" +
            "</td></tr>";
        });
        html += "</tbody></table></div>";
        U.id("ticketsList").innerHTML = html;
      } catch (e) {
        U.id("ticketsList").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Settings ────────────────────────────────────────────── */
  renderSettings: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a</h2></div>" +
      "<div class=\"settings-form\" id=\"systemSettings\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var doc = await FB.db.collection("settings").doc("system").get();
        var d = doc.exists ? doc.data() : {};
        var html =
          "<div class=\"form-section\"><h3>\u0627\u0644\u0645\u0639\u0627\u0645\u0644</h3>" +
            "<div class=\"form-group\"><label>\u0645\u0639\u062f\u0644 \u0627\u0644\u0633\u0639\u0631 (\u0645\u0633\u0648\u0629/\u062f\u0648\u0644\u0627\u0631)</label>" +
              "<input id=\"setCoinRate\" type=\"number\" class=\"form-input\" step=\"0.001\" value=\"" + (d.coinRate || 0.01) + "\"></div>" +
            "<div class=\"form-group\"><label>\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 \u0644\u0644\u0633\u062d\u0628 (\u062f\u0648\u0644\u0627\u0631)</label>" +
              "<input id=\"setMinWithdrawal\" type=\"number\" class=\"form-input\" value=\"" + (d.minWithdrawal || 5) + "\"></div>" +
            "<div class=\"form-group\"><label>\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 \u0644\u0644\u062a\u0634\u062d\u064a\u0644 (\u062f\u0648\u0644\u0627\u0631)</label>" +
              "<input id=\"setMinTopup\" type=\"number\" class=\"form-input\" value=\"" + (d.minTopup || 1) + "\"></div>" +
            "<div class=\"form-group\"><label>% \u0645\u062c\u0632\u0627\u0621 \u0627\u0644\u0645\u0644\u0627\u0626\u0645</label>" +
              "<input id=\"setRewardsPercent\" type=\"number\" class=\"form-input\" value=\"" + (d.rewardsPercent || 70) + "\"></div></div>" +
          "<div class=\"form-section\"><h3>\u0627\u0644\u062a\u062d\u0631\u064a\u0635</h3>" +
            "<div class=\"form-group\"><label>\u0639\u0634\u0631 \u0627\u0644\u062e\u0637\u0631 \u0644\u0644\u062d\u0638\u0631</label>" +
              "<input id=\"setBanThreshold\" type=\"number\" class=\"form-input\" value=\"" + (d.banThreshold || 80) + "\"></div>" +
            "<div class=\"form-group\"><label>\u062d\u062f \u0627\u0644\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0623\u0648\u062a\u0648\u0645\u0627\u062a\u064a\u06a9</label>" +
              "<input id=\"setAutoApprove\" type=\"number\" class=\"form-input\" value=\"" + (d.autoApproveThreshold || 10) + "\"></div>" +
            "<div class=\"form-group\"><label>\u0641\u062a\u0631\u0629 VPN</label>" +
              "<select id=\"setVpnAction\" class=\"form-select\">" +
                "<option value=\"flag\"" + (d.vpnAction === "flag" ? " selected" : "") + ">\u0639\u0644\u0627\u0645\u0629 \u0641\u0642\u0637</option>" +
                "<option value=\"ban\"" + (d.vpnAction === "ban" ? " selected" : "") + ">\u062d\u0638\u0631 \u0641\u0648\u0631\u064a</option>" +
              "</select></div></div>" +
          "<button class=\"btn-primary\" id=\"saveSettingsBtn\">\u062d\u0641\u0638</button>";

        U.id("systemSettings").innerHTML = html;
        document.getElementById("saveSettingsBtn").addEventListener("click", async function () {
          try {
            await FB.db.collection("settings").doc("system").set({
              coinRate: parseFloat(document.getElementById("setCoinRate").value) || 0.01,
              minWithdrawal: parseFloat(document.getElementById("setMinWithdrawal").value) || 5,
              minTopup: parseFloat(document.getElementById("setMinTopup").value) || 1,
              rewardsPercent: parseInt(document.getElementById("setRewardsPercent").value) || 70,
              banThreshold: parseInt(document.getElementById("setBanThreshold").value) || 80,
              autoApproveThreshold: parseFloat(document.getElementById("setAutoApprove").value) || 10,
              vpnAction: document.getElementById("setVpnAction").value,
              updatedAt: Date.now()
            });
            UI.toast("\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a", "success");
          } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
        });
      } catch (e) {
        U.id("systemSettings").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Security ────────────────────────────────────────────── */
  renderSecurity: function (c) {
    c.innerHTML =
      "<div class=\"admin-header\"><h2>\u0627\u0644\u0623\u0645\u0627\u0646</h2></div>" +
      "<div id=\"securityContent\"><div class=\"loading-spinner\"></div></div>";

    (async function () {
      try {
        var adminsSnap = await FB.db.collection("users").where("role", "==", "admin").get();
        var adminsHtml = "<h3>\u0645\u0633\u0626\u0648\u0644\u0648 \u0627\u0644\u0646\u0638\u0627\u0645</h3>";
        if (adminsSnap.empty) {
          adminsHtml += "<p class=\"empty-state\">\u0644\u0627 \u064a\u0648\u062c\u062f \u0645\u0633\u0626\u0648\u0644\u064a\u0646</p>";
        } else {
          adminsHtml += "<table class=\"admin-table\"><thead><tr><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0628\u0631\u064a\u062f</th><th>\u0622\u062e\u0631 \u0646\u0634\u0637</th></tr></thead><tbody>";
          adminsSnap.forEach(function (doc) {
            var d = doc.data();
            adminsHtml += "<tr><td>" + U.sanitize(d.name || "") + "</td><td>" + U.sanitize(d.email || "") + "</td>" +
              "<td>" + U.date(d.lastSeen) + "</td></tr>";
          });
          adminsHtml += "</tbody></table>";
        }

        var auditSnap = await FB.db.collection("audit_log").orderBy("timestamp", "desc").limit(50).get();
        var auditHtml = "<h3>\u0627\u0644\u0633\u062c\u0644 \u0627\u0644\u062a\u0623\u0645\u064a\u0646\u064a</h3>";
        if (auditSnap.empty) {
          auditHtml += "<p class=\"empty-state\">\u0644\u0627 \u062a\u0648\u062c\u062f \u0633\u062c\u0644\u0627\u062a</p>";
        } else {
          auditHtml += "<table class=\"admin-table\"><thead><tr><th>\u0627\u0644\u0645\u0639\u062a\u0645\u0644</th><th>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645</th><th>\u0627\u0644\u062a\u0641\u0635\u064a\u0644</th><th>\u0627\u0644\u0648\u0642\u062a</th></tr></thead><tbody>";
          auditSnap.forEach(function (doc) {
            var d = doc.data();
            auditHtml += "<tr><td>" + U.sanitize(d.action || "") + "</td><td>" + U.sanitize(d.adminId || "") + "</td>" +
              "<td>" + U.sanitize(d.target || "") + "</td><td>" + U.date(d.timestamp) + "</td></tr>";
          });
          auditHtml += "</tbody></table>";
        }

        U.id("securityContent").innerHTML = adminsHtml + auditHtml;
      } catch (e) {
        U.id("securityContent").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
      }
    })();
  },

  /* ── Helper Methods ──────────────────────────────────────── */
  updateUser: async function (uid, data) {
    try {
      await FB.db.collection("users").doc(uid).update(data);
      UI.toast("\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", "success");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  deleteUser: async function (uid) {
    if (!confirm("\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u061f")) return;
    try {
      await FB.db.collection("users").doc(uid).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", "success");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  adjustBalance: async function (uid) {
    var amount = prompt("\u0627\u0644\u0645\u0628\u0644\u063a (\u0645\u0633\u0628\u0642\u0627\u062a \u0644\u0644\u062e\u0635\u0645 \u0633\u0644\u0628):");
    if (amount === null) return;
    var val = parseInt(amount);
    if (isNaN(val)) { UI.toast("\u0645\u0639\u0637\u0645\u0644 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d", "error"); return; }
    try {
      var userDoc = await FB.db.collection("users").doc(uid).get();
      var current = userDoc.exists ? (userDoc.data().coins || 0) : 0;
      await FB.db.collection("users").doc(uid).update({ coins: current + val, lastModified: Date.now() });
      UI.toast("\u062a\u0645 \u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0631\u0635\u064a\u062f \u0628\u0646\u062c\u0627\u062d", "success");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  makeAdmin: async function (uid) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062c\u0639\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0645\u0633\u0626\u0648\u0644 \u0646\u0638\u0627\u0645\u061f")) return;
    try {
      await FB.db.collection("users").doc(uid).update({ role: "admin", lastModified: Date.now() });
      UI.toast("\u062a\u0645 \u062c\u0639\u0644\u0647 \u0645\u0633\u0626\u0648\u0644 \u0646\u0638\u0627\u0645", "success");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  banUser: async function (uid) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0638\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u061f")) return;
    try {
      await FB.db.collection("users").doc(uid).update({ banned: true, lastModified: Date.now() });
      UI.toast("\u062a\u0645 \u062d\u0638\u0631 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", "success");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  deleteGame: async function (id) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0644\u0639\u0628\u0629\u061f")) return;
    try {
      await FB.db.collection("games").doc(id).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0644\u0639\u0628\u0629", "success");
      Router.go("admin/games");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  updateOrder: async function (id, status) {
    try {
      await FB.db.collection("orders").doc(id).update({ status: status, updatedAt: Date.now() });
      UI.toast("\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0637\u0644\u0628", "success");
      Router.go("admin/orders");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  approveWithdrawal: async function (id) {
    try {
      await FB.db.collection("withdrawals").doc(id).update({ status: "approved", approvedAt: Date.now() });
      UI.toast("\u062a\u0645 \u062a\u0648\u0642\u064a\u0639 \u0637\u0644\u0628 \u0627\u0644\u0633\u062d\u0628", "success");
      Router.go("admin/withdrawals");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  rejectWithdrawal: async function (id) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0633\u062d\u0628\u061f")) return;
    try {
      await FB.db.collection("withdrawals").doc(id).update({ status: "rejected", rejectedAt: Date.now() });
      UI.toast("\u062a\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0633\u062d\u0628", "success");
      Router.go("admin/withdrawals");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  addAnnouncement: async function () {
    UI.openModal(
      "\u0625\u0636\u0627\u0641\u0629 \u0625\u0639\u0644\u0627\u0646",
      "<div class=\"form-group\"><label>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label><input id=\"annTitle\" type=\"text\" class=\"form-input\"></div>" +
      "<div class=\"form-group\"><label>\u0627\u0644\u0646\u0635</label><textarea id=\"annBody\" class=\"form-textarea\" rows=\"4\"></textarea></div>" +
      "<button class=\"btn-primary\" id=\"saveAnnBtn\">\u0646\u0634\u0631</button>"
    );
    document.getElementById("saveAnnBtn").addEventListener("click", async function () {
      var title = document.getElementById("annTitle").value.trim();
      var body = document.getElementById("annBody").value.trim();
      if (!title || !body) { UI.toast("\u0627\u0644\u062a\u0639\u0628\u064a\u0631 \u0645\u0637\u0644\u0648\u0628", "error"); return; }
      try {
        await FB.db.collection("announcements").add({ title: title, body: body, createdAt: Date.now() });
        UI.closeModal(); UI.toast("\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u0639\u0644\u0627\u0646", "success");
        Router.go("admin/content");
      } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
    });
  },

  deleteAnnouncement: async function (id) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u061f")) return;
    try {
      await FB.db.collection("announcements").doc(id).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0625\u0639\u0644\u0627\u0646", "success");
      Router.go("admin/content");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  replyTicket: async function (id, reply) {
    if (!reply || !reply.trim()) { UI.toast("\u0627\u0643\u062a\u0628 \u0627\u0644\u0631\u062f", "error"); return; }
    try {
      var doc = await FB.db.collection("tickets").doc(id).get();
      var existing = doc.exists ? (doc.data().replies || []) : [];
      existing.push({ text: reply.trim(), by: "admin", uid: FB.user ? FB.user.uid : "", timestamp: Date.now() });
      await FB.db.collection("tickets").doc(id).update({ replies: existing, status: "replied", lastReplyAt: Date.now() });
      UI.toast("\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u062f", "success");
      Router.go("admin/support");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  viewUser: function (uid) {
    UI.openModal("\u062a\u0641\u0635\u064a\u0644 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", "<div class=\"loading-spinner\"></div>");
    FB.db.collection("users").doc(uid).get().then(function (doc) {
      if (!doc.exists) { UI.closeModal(); return; }
      var d = doc.data();
      document.getElementById("modalBody").innerHTML =
        "<div class=\"user-detail\"><p><strong>\u0627\u0644\u0627\u0633\u0645:</strong> " + U.sanitize(d.name || "") + "</p>" +
        "<p><strong>\u0627\u0644\u0628\u0631\u064a\u062f:</strong> " + U.sanitize(d.email || "") + "</p>" +
        "<p><strong>\u0627\u0644\u062f\u0648\u0644\u0629:</strong> " + U.coins(d.coins || 0) + "</p>" +
        "<p><strong>\u0627\u0644\u062f\u0648\u0631:</strong> " + U.sanitize(d.role || "user") + "</p>" +
        "<p><strong>\u0646\u0642\u0637\u0629 \u0627\u0644\u062e\u0637\u0631:</strong> " + (d.riskScore || 0) + "</p>" +
        "<p><strong>\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0648\u0646 VPN:</strong> " + (d.vpn ? "\u0646\u0639\u0645" : "\u0644\u0627") + "</p>" +
        "<p><strong>\u0645\u062d\u0638\u0648\u0631:</strong> " + (d.banned ? "\u0646\u0639\u0645" : "\u0644\u0627") + "</p>" +
        "<p><strong>\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u062a\u0633\u062c\u064a\u0644:</strong> " + U.date(d.createdAt) + "</p>" +
        "<p><strong>\u0622\u062e\u0631 \u0646\u0634\u0637:</strong> " + U.date(d.lastSeen) + "</p></div>";
    }).catch(function (e) {
      document.getElementById("modalBody").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
    });
  },

  viewTicket: function (id) {
    UI.openModal("\u0627\u0644\u062a\u0642\u0636\u064a\u0629", "<div class=\"loading-spinner\"></div>");
    FB.db.collection("tickets").doc(id).get().then(function (doc) {
      if (!doc.exists) { UI.closeModal(); return; }
      var d = doc.data();
      var repliesHtml = (d.replies || []).map(function (r) {
        return "<div class=\"reply " + r.by + "\">" +
          "<strong>" + U.sanitize(r.by === "admin" ? "\u0627\u0644\u0645\u0633\u0626\u0648\u0644" : "\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645") + "</strong> " +
          "<small>" + U.date(r.timestamp) + "</small>" +
          "<p>" + U.sanitize(r.text) + "</p></div>";
      }).join("");

      document.getElementById("modalBody").innerHTML =
        "<div class=\"ticket-detail\">" +
          "<p><strong>\u0627\u0644\u0645\u0648\u0636\u0648\u0639:</strong> " + U.sanitize(d.subject || "") + "</p>" +
          "<p><strong>\u0627\u0644\u0631\u0633\u0627\u0644\u0629:</strong></p>" +
          "<div class=\"ticket-messages\">" + repliesHtml + "</div>" +
          "<div class=\"ticket-reply-form\">" +
            "<textarea id=\"ticketReply\" class=\"form-textarea\" rows=\"3\" placeholder=\"\u0627\u0643\u062a\u0628 \u0631\u062f\u0643 \u0647\u0646\u0627...\"></textarea>" +
            "<button class=\"btn-primary\" onclick=\"AdminPanel.replyTicket('" + id + "',document.getElementById('ticketReply').value)\">\u0625\u0631\u0633\u0627\u0644</button>" +
          "</div></div>";
    }).catch(function (e) {
      document.getElementById("modalBody").innerHTML = "<p class=\"error-msg\">" + U.sanitize(e.message) + "</p>";
    });
  },

  editGame: function (id) {
    UI.openModal("\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0644\u0639\u0628\u0629", "<div class=\"loading-spinner\"></div>");
    FB.db.collection("games").doc(id).get().then(function (doc) {
      if (!doc.exists) { UI.closeModal(); return; }
      var d = doc.data();
      document.getElementById("modalBody").innerHTML =
        "<div class=\"form-group\"><label>\u0627\u0644\u0627\u0633\u0645</label><input id=\"editGameName\" class=\"form-input\" value=\"" + U.sanitize(d.name || "") + "\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u0645\u062c\u0644\u062f</label><input id=\"editGameReward\" type=\"number\" class=\"form-input\" value=\"" + (d.reward || 0) + "\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u0641\u0626\u0629</label><input id=\"editGameCategory\" class=\"form-input\" value=\"" + U.sanitize(d.category || "") + "\"></div>" +
        "<div class=\"form-group\"><label>\u0646\u0634\u0637</label>" +
          "<label class=\"toggle\"><input type=\"checkbox\" id=\"editGameActive\" " + (d.active ? "checked" : "") + "><span class=\"toggle-slider\"></span></label></div>" +
        "<button class=\"btn-primary\" id=\"updateGameBtn\">\u062a\u062d\u062f\u064a\u062b</button>";
      document.getElementById("updateGameBtn").addEventListener("click", async function () {
        try {
          await FB.db.collection("games").doc(id).update({
            name: document.getElementById("editGameName").value.trim(),
            reward: parseInt(document.getElementById("editGameReward").value) || 0,
            category: document.getElementById("editGameCategory").value.trim(),
            active: document.getElementById("editGameActive").checked,
            updatedAt: Date.now()
          });
          UI.closeModal(); UI.toast("\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0644\u0639\u0628\u0629", "success");
          Router.go("admin/games");
        } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
      });
    });
  },

  editOffer: function (id) {
    UI.openModal("\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0639\u0631\u0636", "<div class=\"loading-spinner\"></div>");
    FB.db.collection("offers").doc(id).get().then(function (doc) {
      if (!doc.exists) { UI.closeModal(); return; }
      var d = doc.data();
      document.getElementById("modalBody").innerHTML =
        "<div class=\"form-group\"><label>\u0627\u0644\u0627\u0633\u0645</label><input id=\"editOfferName\" class=\"form-input\" value=\"" + U.sanitize(d.name || "") + "\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u0645\u062c\u0632\u0627\u0621</label><input id=\"editOfferReward\" type=\"number\" class=\"form-input\" value=\"" + (d.reward || 0) + "\"></div>" +
        "<div class=\"form-group\"><label>\u0646\u0634\u0637</label>" +
          "<label class=\"toggle\"><input type=\"checkbox\" id=\"editOfferActive\" " + (d.active ? "checked" : "") + "><span class=\"toggle-slider\"></span></label></div>" +
        "<button class=\"btn-primary\" id=\"updateOfferBtn\">\u062a\u062d\u062f\u064a\u062b</button>";
      document.getElementById("updateOfferBtn").addEventListener("click", async function () {
        try {
          await FB.db.collection("offers").doc(id).update({
            name: document.getElementById("editOfferName").value.trim(),
            reward: parseInt(document.getElementById("editOfferReward").value) || 0,
            active: document.getElementById("editOfferActive").checked,
            updatedAt: Date.now()
          });
          UI.closeModal(); UI.toast("\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0639\u0631\u0636", "success");
          Router.go("admin/offers");
        } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
      });
    });
  },

  deleteOffer: async function (id) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636\u061f")) return;
    try {
      await FB.db.collection("offers").doc(id).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0639\u0631\u0636", "success");
      Router.go("admin/offers");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  editProvider: function (id) {
    UI.openModal("\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0645\u0632\u0648\u062f", "<div class=\"loading-spinner\"></div>");
    FB.db.collection("providers").doc(id).get().then(function (doc) {
      if (!doc.exists) { UI.closeModal(); return; }
      var d = doc.data();
      document.getElementById("modalBody").innerHTML =
        "<div class=\"form-group\"><label>\u0627\u0644\u0627\u0633\u0645</label><input id=\"editProvName\" class=\"form-input\" value=\"" + U.sanitize(d.name || "") + "\"></div>" +
        "<div class=\"form-group\"><label>\u0645\u0641\u062a\u0627\u062d API</label><input id=\"editProvKey\" class=\"form-input\" value=\"" + U.sanitize(d.apiKey || "") + "\"></div>" +
        "<div class=\"form-group\"><label>Postback URL</label><input id=\"editProvUrl\" class=\"form-input\" value=\"" + U.sanitize(d.postbackUrl || "") + "\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u062d\u0627\u0644\u0629</label>" +
          "<select id=\"editProvStatus\" class=\"form-select\"><option value=\"active\"" + (d.status === "active" ? " selected" : "") + ">\u0646\u0634\u0637</option>" +
          "<option value=\"inactive\"" + (d.status !== "active" ? " selected" : "") + ">\u063a\u064a\u0631 \u0646\u0634\u0637</option></select></div>" +
        "<button class=\"btn-primary\" id=\"updateProvBtn\">\u062a\u062d\u062f\u064a\u062b</button>";
      document.getElementById("updateProvBtn").addEventListener("click", async function () {
        try {
          await FB.db.collection("providers").doc(id).update({
            name: document.getElementById("editProvName").value.trim(),
            apiKey: document.getElementById("editProvKey").value.trim(),
            postbackUrl: document.getElementById("editProvUrl").value.trim(),
            status: document.getElementById("editProvStatus").value,
            updatedAt: Date.now()
          });
          UI.closeModal(); UI.toast("\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0645\u0632\u0648\u062f", "success");
          Router.go("admin/providers");
        } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
      });
    });
  },

  deleteProvider: async function (id) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0632\u0648\u062f\u061f")) return;
    try {
      await FB.db.collection("providers").doc(id).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0645\u0632\u0648\u062f", "success");
      Router.go("admin/providers");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  editCampaign: function (id) {
    UI.openModal("\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0628\u0639\u062b", "<div class=\"loading-spinner\"></div>");
    FB.db.collection("campaigns").doc(id).get().then(function (doc) {
      if (!doc.exists) { UI.closeModal(); return; }
      var d = doc.data();
      document.getElementById("modalBody").innerHTML =
        "<div class=\"form-group\"><label>\u0627\u0644\u0627\u0633\u0645</label><input id=\"editCpName\" class=\"form-input\" value=\"" + U.sanitize(d.name || "") + "\"></div>" +
        "<div class=\"form-group\"><label>\u0645\u0636\u0631\u0648\u0639 \u0627\u0644\u0645\u0643\u0627\u0641\u0626</label><input id=\"editCpMult\" type=\"number\" class=\"form-input\" value=\"" + (d.bonusMultiplier || 1) + "\"></div>" +
        "<div class=\"form-group\"><label>\u0627\u0644\u0645\u0632\u0646\u0648\u0639 ($)</label><input id=\"editCpBudget\" type=\"number\" class=\"form-input\" value=\"" + (d.budget || 0) + "\"></div>" +
        "<button class=\"btn-primary\" id=\"updateCpBtn\">\u062a\u062d\u062f\u064a\u062b</button>";
      document.getElementById("updateCpBtn").addEventListener("click", async function () {
        try {
          await FB.db.collection("campaigns").doc(id).update({
            name: document.getElementById("editCpName").value.trim(),
            bonusMultiplier: parseFloat(document.getElementById("editCpMult").value) || 1,
            budget: parseFloat(document.getElementById("editCpBudget").value) || 0,
            updatedAt: Date.now()
          });
          UI.closeModal(); UI.toast("\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0628\u0639\u062b", "success");
          Router.go("admin/campaigns");
        } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
      });
    });
  },

  deleteCampaign: async function (id) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0628\u0639\u062b\u061f")) return;
    try {
      await FB.db.collection("campaigns").doc(id).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0628\u0639\u062b", "success");
      Router.go("admin/campaigns");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  toggleAd: async function (id, active) {
    try {
      await FB.db.collection("ad_placements").doc(id).update({ active: active });
      UI.toast(active ? "\u062a\u0645 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0645\u0639\u0631\u0636" : "\u062a\u0645 \u0625\u0639\u0637\u0627\u0644 \u0627\u0644\u0645\u0639\u0631\u0636", "success");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  deleteAd: async function (id) {
    if (!confirm("\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0639\u0631\u0636\u061f")) return;
    try {
      await FB.db.collection("ad_placements").doc(id).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0645\u0639\u0631\u0636", "success");
      Router.go("admin/ads");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  },

  removeFromBlocklist: async function (id) {
    try {
      await FB.db.collection("blocklist").doc(id).delete();
      UI.toast("\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0642\u0627\u0626\u0645\u0629", "success");
      Router.go("admin/fraud");
    } catch (e) { UI.toast(U.sanitize(e.message), "error"); }
  }
};


// ─── Router ──────────────────────────────────────────────────
var Router = {
  routes: {},
  current: "",

  register: function (name, fn) {
    this.routes[name] = fn;
  },

  go: function (path) {
    window.location.hash = "#/" + path;
  },

  resolve: function () {
    var hash = window.location.hash.replace(/^#\/?/, "") || "home";
    var parts = hash.split("/");

    if (parts[0] === "admin" && parts.length > 1) {
      var tab = parts.slice(1).join("/");
      Pages._adminTab = tab;
      if (!UserState.isAdmin()) {
        UI.toast("\u063a\u064a\u0631 \u0645\u0635\u0631\u062d \u0644\u0643", "error");
        Router.go("home");
        return;
      }
      AdminPanel.render();
      AdminPanel.loadTab(tab);
      return;
    }

    if (parts[0] === "order" && parts.length > 1) {
      var gameId = parts[1];
      if (this.routes["order"]) {
        this.routes["order"](gameId);
      }
      return;
    }

    var routeName = parts[0] || "home";
    if (this.routes[routeName]) {
      this.routes[routeName]();
    } else {
      this.routes["home"]();
    }

    this.current = routeName;
    window.scrollTo(0, 0);
  },

  init: function () {
    var self = this;
    window.addEventListener("hashchange", function () { self.resolve(); });
    self.resolve();
  }
};


var Effects = {
  reveal: function() {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal:not(.visible), .card:not(.visible), .game-card:not(.visible), .offer-card:not(.visible)").forEach(function(el) { obs.observe(el); });
  }
};

var SpinRenderer = SpinRenderer || {
  drawWheel: function(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;
    var prizes = SpinWheel.prizes || [20,40,60,80,100,120,150,200];
    var colors = SpinWheel.colors || ['#FF6B35','#5B9FFF','#FF2E63','#00FF9D','#8B5CF6','#FFE600','#00BCD4','#FF9800'];
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height, cx = W/2, cy = H/2, R = Math.min(cx,cy)-12;
    var count = prizes.length, arc = (2*Math.PI)/count;
    ctx.clearRect(0,0,W,H);
    for (var i = 0; i < count; i++) {
      var startAngle = i*arc - Math.PI/2;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,R,startAngle,startAngle+arc);
      ctx.closePath(); ctx.fillStyle = colors[i % colors.length]; ctx.fill();
      ctx.strokeStyle = "#0a0a0f"; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(startAngle + arc/2);
      ctx.fillStyle = "#fff"; ctx.font = "bold 14px Inter"; ctx.textAlign = "center";
      ctx.fillText(prizes[i], R*0.6, 5); ctx.restore();
    }
    ctx.beginPath(); ctx.arc(cx,cy,18,0,2*Math.PI); ctx.fillStyle = "#0a0a0f"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,14,0,2*Math.PI); ctx.fillStyle = "#5B9FFF"; ctx.fill();
  }
};

var U = U || {};
U.id = U.id || function(x) { return document.getElementById(x); };

var App = {
  init: function () {
    try { FB.init(); } catch (e) { console.warn("FB init:", e); }
    if (typeof I18n.lang === "function") {
      var langVal = LS.get("lang") || "en";
      I18n.lang(langVal);
    }
    try { Theme.init(); } catch (e) {}

    Router.register("home", function () { Pages.home(); });
    Router.register("earn", function () { Pages.earn(); });
    Router.register("earn/offerwalls", function () { Pages.earnOfferwalls(); });
    Router.register("earn/games", function () { Pages.earnGames(); });
    Router.register("earn/surveys", function () { Pages.earnSurveys(); });
    Router.register("earn/ads", function () { Pages.earnAds(); });
    Router.register("daily", function () { Pages.daily(); });
    Router.register("spin", function () { Pages.spin(); });
    Router.register("games", function () { Pages.games(); });
    Router.register("order", function (gameId) { Pages.order(gameId); });
    Router.register("rewards", function () { Pages.rewards(); });
    Router.register("rewards/topup", function () { Pages.rewards(); });
    Router.register("rewards/gift-cards", function () { Pages.rewards(); });
    Router.register("wallet", function () { Pages.wallet(); });
    Router.register("transactions", function () { Pages.transactions(); });
    Router.register("profile", function () { Pages.profile(); });
    Router.register("referral", function () { Pages.referral(); });
    Router.register("leaderboard", function () { Pages.leaderboard(); });
    Router.register("notifications", function () { Pages.notifications(); });
    Router.register("support", function () { Pages.support(); });
    Router.register("faq", function () { Pages.faq(); });
    Router.register("terms", function () { Pages.terms(); });
    Router.register("privacy", function () { Pages.privacy(); });
    Router.register("anti-fraud", function () { Pages.antiFraud(); });
    Router.register("register", function () { Pages.register(); });
    Router.register("admin", function () {
      if (!UserState.isAdmin()) { Router.go("home"); return; }
      AdminPanel.render();
    });
    Router.register("admin/:tab", function (params) {
      if (!UserState.isAdmin()) { Router.go("home"); return; }
      AdminPanel.render(params.tab);
    });
    Router.register("login", function () {
      var ac = document.getElementById("app"); if (!ac) return;
      var ar = I18n.lang === "ar";
      var h = '<div class="auth-container"><div class="auth-card glass">';
      h += '<h2 class="text-center mb-lg">' + (ar ? "\u062a\u0633\u062c\u064A\u0644 \u0627\u0644\u062f\u062e\u0648\u0644" : "Sign In") + '</h2>';
      h += '<form id="login-form">';
      h += '<div class="fg"><label>' + (ar ? "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" : "Email") + '</label><input type="email" id="login-email" class="fi" required></div>';
      h += '<div class="fg"><label>' + (ar ? "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" : "Password") + '</label><input type="password" id="login-pass" class="fi" required minlength="6"></div>';
      h += '<button type="submit" class="btn btn-primary btn-block">' + (ar ? "\u062a\u0633\u062c\u064A\u0644 \u0627\u0644\u062f\u062e\u0648\u0644" : "Sign In") + '</button>';
      h += '</form>';
      h += '<p class="text-center mt-md" style="color:var(--text2)">' + (ar ? "\u0644\u064A\u0633 \u0644\u062f\u064A\u0643 \u062d\u0633\u0627\u0628\u061F " : "No account? ") + '<a href="#/register">' + (ar ? "\u0633\u062c\u064A\u0644 \u062d\u0633\u0627\u0628" : "Register") + '</a></p>';
      h += '</div></div>';
      ac.innerHTML = h;
      var form = document.getElementById("login-form");
      if (form) form.addEventListener("submit", function(e) { e.preventDefault(); Auth.login(document.getElementById("login-email").value, document.getElementById("login-pass").value); });
    });

    Auth.init();
    FX.init();
    GamesManager.load();

    if (!LS.get("cookieConsent")) {
      var bar = document.getElementById("cookie-bar");
      if (bar) bar.classList.add("show");
    }

    App.bindEvents();

    var params = new URLSearchParams(window.location.search);
    var ref = params.get("ref");
    if (ref) LS.set("referralCode", ref);

    Router.init();
    UI.hideLoader();
    U.observe();
  },

  bindEvents: function () {
    var langBtn = document.getElementById("lang-btn");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        var newLang = I18n.lang === "ar" ? "en" : "ar";
        I18n.lang(newLang);
        LS.set("lang", newLang);
        var label = langBtn.querySelector(".lang-label");
        if (label) label.textContent = newLang.toUpperCase();
        var ac = document.getElementById("app");
        if (ac && Router.current && Router.routes[Router.current]) {
          try { Router.routes[Router.current](Router.params); } catch(e) {}
        }
      });
    }

    var themeBtn = document.getElementById("theme-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () { Theme.toggle(); });
    }

    var authBtn = document.getElementById("auth-btn");
    if (authBtn) {
      authBtn.addEventListener("click", function () {
        if (UserState.isLoggedIn()) {
          Router.go("profile");
        } else {
          Router.go("login");
        }
      });
    }

    var logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () { Auth.logout(); });
    }

    var mobileToggle = document.getElementById("mobile-toggle");
    var mobileMenu = document.getElementById("mobile-menu");
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("open");
      });
    }

    var cookieOk = document.getElementById("cookie-ok");
    if (cookieOk) {
      cookieOk.addEventListener("click", function () {
        LS.set("cookieConsent", "1");
        var bar = document.getElementById("cookie-bar");
        if (bar) bar.classList.remove("show");
      });
    }

    var navBalanceBtn = document.getElementById("nav-balance-btn");
    if (navBalanceBtn) {
      navBalanceBtn.addEventListener("click", function () { Router.go("wallet"); });
    }

    var notifBtn = document.getElementById("notif-btn");
    if (notifBtn) {
      notifBtn.addEventListener("click", function () {
        if (UserState.isLoggedIn()) { Router.go("notifications"); } else { UI.openModal("auth-modal"); }
      });
    }

    var authForm = document.getElementById("auth-form");
    if (authForm) {
      authForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var mode = Auth.mode;
        var email = document.getElementById("af-email").value;
        var pass = document.getElementById("af-pass").value;
        if (mode === "login") {
          Auth.login(email, pass);
        } else {
          var name = document.getElementById("af-name").value;
          var ref = document.getElementById("af-ref").value;
          Auth.register(name, email, pass, ref);
        }
      });
    }

    document.querySelectorAll(".auth-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".auth-tab").forEach(function(t) { t.classList.remove("active"); });
        tab.classList.add("active");
        Auth.mode = tab.getAttribute("data-tab");
        var nameField = document.getElementById("fg-name");
        var refField = document.getElementById("fg-ref");
        var title = document.getElementById("auth-modal-title");
        var submit = document.getElementById("auth-submit");
        if (Auth.mode === "register") {
          if (nameField) nameField.style.display = "";
          if (refField) refField.style.display = "";
          if (title) title.innerHTML = '<i class="fas fa-user-plus"></i> Register';
          if (submit) submit.textContent = "Register";
        } else {
          if (nameField) nameField.style.display = "none";
          if (refField) refField.style.display = "none";
          if (title) title.innerHTML = '<i class="fas fa-user"></i> Sign In';
          if (submit) submit.textContent = "Sign In";
        }
      });
    });

    var ticketForm = document.getElementById("ticket-form");
    if (ticketForm) {
      ticketForm.addEventListener("submit", function (e) {
        e.preventDefault();
        Tickets.submit(document.getElementById("tk-subject").value, document.getElementById("tk-message").value);
        UI.closeModal("ticket-modal");
      });
    }

    document.querySelectorAll(".mobile-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (mobileMenu) mobileMenu.classList.remove("open");
      });
    });

    var backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 400) { backToTop.classList.add("show"); } else { backToTop.classList.remove("show"); }
      });
      backToTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }
  }
};

document.addEventListener("DOMContentLoaded", function () { App.init(); });
