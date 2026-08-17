// ============================================================
// REWARDX - FULL APP LOGIC
// ============================================================

// ===== DATABASE =====
const DB = {
  prefix: 'rewardx_v2_',
  init() {
    if (!this.get('initialized')) {
      this.set('initialized', true);
      this.set('user', {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        username: 'Player' + Math.floor(Math.random() * 9999),
        email: '', phone: '', country: 'SA', avatar: '👤',
        level: 1, xp: 0, streak: 0, maxStreak: 0,
        lastDailyClaim: null, lastWheelSpin: null,
        joined: new Date().toISOString(),
        status: 'pending',
        referralCode: this.generateReferralCode(),
        referredBy: null, referralEarnings: 0, referralCount: 0,
        completedOffers: 0, completedSurveys: 0, completedGames: 0,
        totalWithdrawn: 0, verified: false, twoFA: false,
        devices: [this.fingerprint()]
      });
      this.set('ledger', []);
      this.set('orders', []);
      this.set('withdrawals', []);
      this.set('notifications', [
        { id: 'n1', type: 'welcome', title: 'مرحباً بك في RewardX!', message: 'ابدأ رحلتك الآن', time: Date.now(), read: false, icon: '🎉' }
      ]);
      this.set('completedOffers', []);
      this.set('tasksProgress', {});
      this.set('fraudEvents', []);
      this.set('adminLog', []);
      this.set('settings', {
        coinRate: 10000, minWithdraw: 50000, withdrawalFee: 0.02,
        referralBonus: 0.10,
        dailyRewards: [100, 200, 300, 500, 750, 1000, 2000],
        wheelPrizes: [50, 100, 200, 500, 1000, 2000, 5000, 100]
      });
      Ledger.add('welcome_bonus', 1000, 'مكافأة الترحيب', 'welcome', 'completed');
    }
  },
  generateReferralCode() { return 'RX' + Math.random().toString(36).substr(2, 8).toUpperCase(); },
  fingerprint() {
    return {
      ua: navigator.userAgent.substr(0, 100),
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: Date.now()
    };
  },
  get(key) { try { const v = localStorage.getItem(this.prefix + key); return v ? JSON.parse(v) : null; } catch { return null; } },
  set(key, value) { localStorage.setItem(this.prefix + key, JSON.stringify(value)); },
  push(key, item) { const arr = this.get(key) || []; arr.push(item); this.set(key, arr); }
};

// ===== LEDGER =====
const Ledger = {
  add(type, amount, description, reference = null, status = 'completed') {
    const tx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type, amount, description, reference, status,
      timestamp: Date.now(),
      balanceBefore: this.getBalance(),
      balanceAfter: this.getBalance() + amount
    };
    DB.push('ledger', tx);
    UI.updateBalance();
    return tx;
  },
  getBalance() {
    const ledger = DB.get('ledger') || [];
    return ledger.filter(tx => tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0);
  },
  getAvailable() { return this.getBalance(); },
  getPending() {
    const ledger = DB.get('ledger') || [];
    return ledger.filter(tx => tx.status === 'pending').reduce((sum, tx) => sum + tx.amount, 0);
  },
  getLocked() {
    const ledger = DB.get('ledger') || [];
    return ledger.filter(tx => tx.status === 'locked').reduce((sum, tx) => sum + tx.amount, 0);
  },
  getLifetimeEarned() {
    const ledger = DB.get('ledger') || [];
    return ledger.filter(tx => tx.amount > 0 && tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0);
  },
  getLifetimeSpent() {
    const ledger = DB.get('ledger') || [];
    return Math.abs(ledger.filter(tx => tx.amount < 0 && tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0));
  },
  getHistory() { return (DB.get('ledger') || []).slice().reverse(); }
};

// ===== FRAUD =====
const Fraud = {
  lastAction: null, actionCount: 0,
  check(type) {
    const now = Date.now();
    if (this.lastAction && now - this.lastAction < 1000) {
      this.actionCount++;
      if (this.actionCount > 10) {
        this.log('velocity_limit', { type, count: this.actionCount });
        return { blocked: true, reason: 'سرعة مفرطة في الإجراءات' };
      }
    } else { this.actionCount = 1; }
    this.lastAction = now;
    return { blocked: false };
  },
  log(event, data) {
    DB.push('fraudEvents', { id: 'fraud_' + Date.now(), event, data, timestamp: Date.now(), userId: DB.get('user').id });
  },
  getRiskScore() {
    const events = DB.get('fraudEvents') || [];
    const recent = events.filter(e => Date.now() - e.timestamp < 86400000);
    return Math.min(100, recent.length * 10);
  }
};

// ===== MOCK DATA =====
const MOCK = {
  offers: [
    { id: 'o1', name: 'تحميل Clash of Clans', provider: 'Lootably', icon: '🏰', reward: 5000, time: '15 min', difficulty: 'سهل', desc: 'ثبت اللعبة والعب حتى المستوى 5', featured: true, completions: 1247 },
    { id: 'o2', name: 'استبيان التسوق', provider: 'AdGate', icon: '📊', reward: 1500, time: '8 min', difficulty: 'سهل', desc: 'أكمل استبيان حول عادات التسوق', featured: false, completions: 856 },
    { id: 'o3', name: 'تثبيت Uber', provider: 'Offertoro', icon: '🚗', reward: 3000, time: '10 min', difficulty: 'متوسط', desc: 'ثبت التطبيق وأنشئ حساب جديد', featured: true, completions: 632 },
    { id: 'o4', name: 'تجربة Disney+', provider: 'Lootably', icon: '🎬', reward: 8000, time: '20 min', difficulty: 'صعب', desc: 'اشترك في تجربة مجانية', featured: false, completions: 341 },
    { id: 'o5', name: 'تحميل TikTok', provider: 'AdGate', icon: '📱', reward: 2000, time: '5 min', difficulty: 'سهل', desc: 'ثبت التطبيق وشاهد 3 فيديوهات', featured: true, completions: 2105 },
    { id: 'o6', name: 'استبيان الصحة', provider: 'Offertoro', icon: '🏥', reward: 2500, time: '12 min', difficulty: 'متوسط', desc: 'استبيان طبي عن نمط الحياة', featured: false, completions: 489 }
  ],
  games: [
    { id: 'g1', name: 'PUBG Mobile', icon: '🔫', platform: 'Mobile', totalReward: 10600, milestones: [{name: 'تثبيت', reward: 100}, {name: 'المستوى 5', reward: 500}, {name: 'المستوى 10', reward: 2000}, {name: 'المستوى 20', reward: 8000}], deadline: 30, players: 5234 },
    { id: 'g2', name: 'Free Fire', icon: '🔥', platform: 'Mobile', totalReward: 12500, milestones: [{name: 'تثبيت', reward: 150}, {name: 'المستوى 10', reward: 1000}, {name: 'المستوى 25', reward: 4000}, {name: 'المستوى 40', reward: 7350}], deadline: 30, players: 4821 },
    { id: 'g3', name: 'Roblox', icon: '🎲', platform: 'All', totalReward: 15000, milestones: [{name: 'تثبيت', reward: 200}, {name: '10 ساعات', reward: 2000}, {name: '30 ساعة', reward: 5000}, {name: '60 ساعة', reward: 7800}], deadline: 45, players: 8932 },
    { id: 'g4', name: 'Clash Royale', icon: '👑', platform: 'Mobile', totalReward: 8000, milestones: [{name: 'تثبيت', reward: 100}, {name: 'Arena 5', reward: 1000}, {name: 'Arena 10', reward: 3000}, {name: 'Arena 15', reward: 3900}], deadline: 30, players: 3421 },
    { id: 'g5', name: 'Mobile Legends', icon: '⚔️', platform: 'Mobile', totalReward: 9500, milestones: [{name: 'تثبيت', reward: 120}, {name: 'المستوى 10', reward: 800}, {name: 'Warrior', reward: 3000}, {name: 'Epic', reward: 5580}], deadline: 30, players: 2987 },
    { id: 'g6', name: 'FC Mobile', icon: '⚽', platform: 'Mobile', totalReward: 11000, milestones: [{name: 'تثبيت', reward: 150}, {name: 'OVR 80', reward: 1500}, {name: 'OVR 90', reward: 4000}, {name: 'OVR 100', reward: 5350}], deadline: 30, players: 4156 }
  ],
  surveys: [
    { id: 's1', name: 'استبيان العملاء', provider: 'Pollfish', icon: '📝', reward: 500, time: '5 min', completions: 2341 },
    { id: 's2', name: 'دراسة السوق', provider: 'AdGate', icon: '📈', reward: 1200, time: '10 min', completions: 1823 },
    { id: 's3', name: 'استبيان المنتجات', provider: 'Offertoro', icon: '🛍️', reward: 800, time: '7 min', completions: 1542 },
    { id: 's4', name: 'رأي المستخدمين', provider: 'Pollfish', icon: '💭', reward: 1500, time: '12 min', completions: 987 }
  ],
  tasks: [
    { id: 't1', name: 'تابعنا على Twitter', icon: '🐦', reward: 200 },
    { id: 't2', name: 'اشترك في Telegram', icon: '📨', reward: 300 },
    { id: 't3', name: 'انضم لـ Discord', icon: '💬', reward: 250 },
    { id: 't4', name: 'تابعنا على Instagram', icon: '📷', reward: 200 },
    { id: 't5', name: 'اكتب مراجعة 5 نجوم', icon: '⭐', reward: 500 },
    { id: 't6', name: 'شاهد فيديو تعريفي', icon: '🎬', reward: 150 }
  ],
  rewards: [
    { id: 'r1', name: 'Google Play $5', icon: '🎮', category: 'giftcard', coins: 50000, usd: 5, stock: 100, available: true },
    { id: 'r2', name: 'Google Play $10', icon: '🎮', category: 'giftcard', coins: 100000, usd: 10, stock: 80, available: true },
    { id: 'r3', name: 'Apple Gift $10', icon: '🍎', category: 'giftcard', coins: 100000, usd: 10, stock: 50, available: true },
    { id: 'r4', name: 'Steam $10', icon: '🎯', category: 'giftcard', coins: 100000, usd: 10, stock: 60, available: true },
    { id: 'r5', name: 'PlayStation $10', icon: '🎮', category: 'giftcard', coins: 100000, usd: 10, stock: 45, available: true },
    { id: 'r6', name: 'Xbox $10', icon: '🎮', category: 'giftcard', coins: 100000, usd: 10, stock: 55, available: true },
    { id: 'r7', name: 'Roblox 400 Robux', icon: '🎲', category: 'game', coins: 50000, usd: 5, stock: 200, available: true },
    { id: 'r8', name: 'PUBG 60 UC', icon: '🔫', category: 'game', coins: 10000, usd: 1, stock: 300, available: true },
    { id: 'r9', name: 'Free Fire 100 Diamonds', icon: '🔥', category: 'game', coins: 10000, usd: 1, stock: 350, available: true },
    { id: 'r10', name: 'PayPal $10', icon: '💳', category: 'cash', coins: 100000, usd: 10, stock: 30, available: true },
    { id: 'r11', name: 'PayPal $25', icon: '💳', category: 'cash', coins: 250000, usd: 25, stock: 15, available: true },
    { id: 'r12', name: 'USDT $10', icon: '₿', category: 'crypto', coins: 100000, usd: 10, stock: 100, available: true }
  ],
  topUpGames: [
    { id: 'tu1', name: 'PUBG Mobile', icon: '🔫', packages: [{name: '60 UC', coins: 10000, usd: 1}, {name: '325 UC', coins: 50000, usd: 5}, {name: '660 UC', coins: 100000, usd: 10}, {name: '1800 UC', coins: 250000, usd: 25}] },
    { id: 'tu2', name: 'Free Fire', icon: '🔥', packages: [{name: '100 Diamonds', coins: 10000, usd: 1}, {name: '520 Diamonds', coins: 50000, usd: 5}, {name: '1060 Diamonds', coins: 100000, usd: 10}] },
    { id: 'tu3', name: 'Mobile Legends', icon: '⚔️', packages: [{name: '86 Diamonds', coins: 20000, usd: 2}, {name: '172 Diamonds', coins: 40000, usd: 4}, {name: '429 Diamonds', coins: 100000, usd: 10}] },
    { id: 'tu4', name: 'Roblox', icon: '🎲', packages: [{name: '400 Robux', coins: 50000, usd: 5}, {name: '800 Robux', coins: 100000, usd: 10}, {name: '1700 Robux', coins: 200000, usd: 20}] },
    { id: 'tu5', name: 'Valorant', icon: '🎯', packages: [{name: '475 VP', coins: 50000, usd: 5}, {name: '1000 VP', coins: 100000, usd: 10}] }
  ],
  leaderboard: [
    { name: 'Ahmed_Pro', avatar: '🥇', country: 'SA', earned: 2450000, level: 87 },
    { name: 'GamerQueen', avatar: '👑', country: 'EG', earned: 1890000, level: 72 },
    { name: 'ProPlayer99', avatar: '🎮', country: 'AE', earned: 1560000, level: 68 },
    { name: 'StarGamer', avatar: '⭐', country: 'SA', earned: 1230000, level: 59 },
    { name: 'KingHunter', avatar: '👑', country: 'KW', earned: 980000, level: 51 },
    { name: 'FastEarner', avatar: '⚡', country: 'QA', earned: 875000, level: 47 },
    { name: 'DiamondUser', avatar: '💎', country: 'BH', earned: 720000, level: 42 },
    { name: 'ElitePlayer', avatar: '🏆', country: 'OM', earned: 654000, level: 39 },
    { name: 'GoldMember', avatar: '🥇', country: 'SA', earned: 521000, level: 34 },
    { name: 'SilverStar', avatar: '⭐', country: 'JO', earned: 432000, level: 29 }
  ],
  countries: {
    'SA': 'السعودية', 'AE': 'الإمارات', 'EG': 'مصر', 'KW': 'الكويت',
    'QA': 'قطر', 'BH': 'البحرين', 'OM': 'عُمان', 'JO': 'الأردن',
    'US': 'أمريكا', 'UK': 'بريطانيا', 'OTHER': 'أخرى'
  }
};

// ===== UI HELPERS =====
const UI = {
  toast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<div class="toast-icon">${icon}</div><div class="toast-content">${msg}</div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-100%)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  },
  modal(title, content, actions = []) {
    const modal = document.getElementById('modalContent');
    if (!modal) return;
    modal.innerHTML = `
      <div class="modal-title">${title}</div>
      <div class="modal-body">${content}</div>
      ${actions.length ? `<div class="modal-actions">${actions.map(a => `<button class="btn ${a.class || 'btn-primary'}" onclick="${a.onclick}">${a.text}</button>`).join('')}</div>` : ''}
    `;
    document.getElementById('modalOverlay').classList.add('active');
  },
  closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('active');
  },
  updateBalance() {
    const balance = Ledger.getBalance();
    const navBalance = document.getElementById('navBalance');
    if (navBalance) navBalance.textContent = balance.toLocaleString();
    const mainBalance = document.getElementById('mainBalance');
    if (mainBalance) mainBalance.textContent = balance.toLocaleString();
  },
  updateSidebarUser() {
    const user = DB.get('user');
    if (!user) return;
    const el = (id) => document.getElementById(id);
    if (el('sidebarUserName')) el('sidebarUserName').textContent = user.username;
    if (el('sidebarUserLevel')) el('sidebarUserLevel').textContent = user.level;
    if (el('sidebarUserXp')) el('sidebarUserXp').textContent = user.xp;
    const maxXp = user.level * 100;
    if (el('sidebarUserXpMax')) el('sidebarUserXpMax').textContent = maxXp;
    if (el('sidebarXpFill')) el('sidebarXpFill').style.width = `${(user.xp / maxXp) * 100}%`;
  },
  updateNotifications() {
    const notifs = DB.get('notifications') || [];
    const unread = notifs.filter(n => !n.read).length;
    const badge = document.getElementById('notifBadge');
    if (badge) {
      if (unread > 0) {
        badge.textContent = unread > 99 ? '99+' : unread;
        badge.style.display = 'flex';
      } else { badge.style.display = 'none'; }
    }
  },
  addNotification(title, message, icon = '🔔', type = 'info') {
    const notif = { id: 'n_' + Date.now(), type, title, message, icon, time: Date.now(), read: false };
    DB.push('notifications', notif);
    this.updateNotifications();
  },
  formatTime(ts) {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'الآن';
    if (diff < 3600000) return `منذ ${Math.floor(diff / 60000)} د`;
    if (diff < 86400000) return `منذ ${Math.floor(diff / 3600000)} س`;
    return new Date(ts).toLocaleDateString('ar-SA');
  }
};

function closeModal() { UI.closeModal(); }

// ===== ACTIONS =====
const Actions = {
  claimDaily() {
    const fraudCheck = Fraud.check('daily_claim');
    if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
    const user = DB.get('user');
    const today = new Date().toDateString();
    const lastClaim = user.lastDailyClaim ? new Date(user.lastDailyClaim).toDateString() : null;
    const settings = DB.get('settings');
    if (lastClaim === today) { UI.toast('لقد حصلت على المكافأة اليوم!', 'warning'); return; }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastClaim === yesterday.toDateString()) user.streak += 1;
    else user.streak = 1;
    user.maxStreak = Math.max(user.maxStreak, user.streak);
    const reward = settings.dailyRewards[Math.min(user.streak - 1, settings.dailyRewards.length - 1)];
    Ledger.add('daily_claim', reward, `المكافأة اليومية - اليوم ${user.streak}`, 'daily_' + Date.now());
    user.lastDailyClaim = new Date().toISOString();
    user.xp += 10;
    this.checkLevelUp(user);
    DB.set('user', user);
    UI.toast(`🎉 حصلت على ${reward} عملة! Streak: ${user.streak} أيام`);
    UI.addNotification('مكافأة يومية', `حصلت على ${reward} عملة`, '🎁', 'reward');
    UI.updateSidebarUser();
    Router.render();
  },
  
  startOffer(id) {
    const fraudCheck = Fraud.check('offer_start');
    if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
    const offer = MOCK.offers.find(o => o.id === id) || MOCK.games.find(g => g.id === id) || MOCK.surveys.find(s => s.id === id);
    if (!offer) return;
    const completed = DB.get('completedOffers') || [];
    if (completed.find(c => c.id === id)) { UI.toast('لقد أكملت هذا العرض من قبل', 'warning'); return; }
    UI.modal(
      `بدء: ${offer.name}`,
      `<div class="text-center mb-20">
        <div style="font-size:4rem; margin-bottom:12px;">${offer.icon}</div>
        <h3 style="margin-bottom:8px;">${offer.name}</h3>
        <p class="text-secondary">${offer.desc || 'أكمل المهمة لتحصل على المكافأة'}</p>
        <div class="flex gap-10" style="justify-content:center; margin:20px 0; flex-wrap:wrap;">
          <span class="badge-status badge-info">⏱️ ${offer.time || '10 min'}</span>
          <span class="badge-status badge-success">💰 ${offer.reward.toLocaleString()} عملة</span>
          ${offer.difficulty ? `<span class="badge-status badge-warning">📊 ${offer.difficulty}</span>` : ''}
        </div>
      </div>`,
      [
        { text: '❌ إلغاء', class: 'btn-ghost', onclick: 'closeModal()' },
        { text: '🚀 ابدأ العرض', class: 'btn-primary', onclick: `completeOfferSimulation('${id}')` }
      ]
    );
  },
  
  completeSpinWheel() {
    const fraudCheck = Fraud.check('wheel');
    if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
    const user = DB.get('user');
    const now = Date.now();
    if (user.lastWheelSpin && now - user.lastWheelSpin < 86400000) {
      const hours = Math.ceil((86400000 - (now - user.lastWheelSpin)) / 3600000);
      UI.toast(`يمكنك التدوير بعد ${hours} ساعات`, 'warning');
      return;
    }
    const prizes = DB.get('settings').wheelPrizes;
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    const rotation = 1800 + Math.random() * 360;
    const wheel = document.getElementById('spinWheel');
    if (wheel) wheel.style.transform = `rotate(${rotation}deg)`;
    setTimeout(() => {
      Ledger.add('wheel_prize', prize, 'جائزة عجلة الحظ', 'wheel_' + Date.now());
      user.lastWheelSpin = now;
      user.xp += 5;
      this.checkLevelUp(user);
      DB.set('user', user);
      UI.toast(`🎊 مبروك! ربحت ${prize} عملة!`);
      UI.addNotification('جائزة عجلة الحظ', `ربحت ${prize} عملة`, '🎡', 'reward');
      UI.updateSidebarUser();
      Router.render();
    }, 4200);
  },
  
  requestWithdrawal(amount, method) {
    const fraudCheck = Fraud.check('withdrawal');
    if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
    const settings = DB.get('settings');
    const balance = Ledger.getAvailable();
    if (amount < settings.minWithdraw) { UI.toast(`الحد الأدنى ${settings.minWithdraw.toLocaleString()} عملة`, 'error'); return; }
    if (amount > balance) { UI.toast('الرصيد غير كافٍ', 'error'); return; }
    const fee = Math.floor(amount * settings.withdrawalFee);
    const netAmount = amount - fee;
    const usdValue = (netAmount / settings.coinRate).toFixed(2);
    const withdrawal = {
      id: 'w_' + Date.now(), amount, fee, netAmount, usdValue, method,
      status: 'pending', timestamp: Date.now(), userId: DB.get('user').id
    };
    DB.push('withdrawals', withdrawal);
    Ledger.add('withdrawal_pending', -amount, `طلب سحب - ${method}`, withdrawal.id, 'pending');
    const user = DB.get('user');
    user.xp += 20;
    this.checkLevelUp(user);
    DB.set('user', user);
    UI.toast(`✅ تم إرسال طلب السحب ($${usdValue})`);
    UI.addNotification('طلب سحب', `طلب سحب $${usdValue}`, '💸', 'withdrawal');
    UI.closeModal();
    UI.updateSidebarUser();
    Router.render();
  },
  
  purchaseReward(id) {
    const reward = MOCK.rewards.find(r => r.id === id);
    if (!reward) return;
    const balance = Ledger.getAvailable();
    if (balance < reward.coins) { UI.toast('الرصيد غير كافٍ', 'error'); return; }
    UI.modal('تأكيد الشراء',
      `<div class="text-center">
        <div style="font-size:4rem;">${reward.icon}</div>
        <h3>${reward.name}</h3>
        <div style="padding:16px; background:var(--bg-elevated); border-radius:12px; margin:20px 0;">
          <div class="flex-between mb-10"><span class="text-secondary">التكلفة:</span><strong style="color:var(--primary);">${reward.coins.toLocaleString()} 💰</strong></div>
          <div class="flex-between mb-10"><span class="text-secondary">القيمة:</span><strong>$${reward.usd}</strong></div>
          <div class="flex-between"><span class="text-secondary">رصيدك بعدها:</span><strong>${(balance - reward.coins).toLocaleString()} 💰</strong></div>
        </div>
        <div class="form-group">
          <label class="form-label">البريد الإلكتروني للتسليم</label>
          <input type="email" class="form-input" id="deliveryEmail" placeholder="email@example.com" value="${DB.get('user').email || ''}">
        </div>
      </div>`,
      [
        { text: '❌ إلغاء', class: 'btn-ghost', onclick: 'closeModal()' },
        { text: '✅ تأكيد الشراء', class: 'btn-primary', onclick: `confirmRewardPurchase('${id}')` }
      ]
    );
  },
  
  topUpGame(gameId, packageIndex) {
    const game = MOCK.topUpGames.find(g => g.id === gameId);
    if (!game) return;
    const pkg = game.packages[packageIndex];
    const balance = Ledger.getAvailable();
    if (balance < pkg.coins) { UI.toast('الرصيد غير كافٍ', 'error'); return; }
    UI.modal(`شحن ${game.name} - ${pkg.name}`,
      `<div class="text-center mb-20">
        <div style="font-size:4rem;">${game.icon}</div>
        <h3>${game.name}</h3>
        <p class="text-secondary">${pkg.name} = $${pkg.usd}</p>
        <div style="color:var(--primary); font-size:1.8rem; font-weight:800; margin:16px 0;">${pkg.coins.toLocaleString()} 💰</div>
      </div>
      <div class="form-group">
        <label class="form-label">Player ID *</label>
        <input type="text" class="form-input" id="playerId" placeholder="أدخل Player ID">
      </div>
      <div class="form-group">
        <label class="form-label">الدولة</label>
        <select class="form-select" id="topUpCountry">
          ${Object.entries(MOCK.countries).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
        </select>
      </div>`,
      [
        { text: '❌ إلغاء', class: 'btn-ghost', onclick: 'closeModal()' },
        { text: '⚡ شحن الآن', class: 'btn-primary', onclick: `confirmTopUp('${gameId}', ${packageIndex})` }
      ]
    );
  },
  
  completeTask(id) {
    const fraudCheck = Fraud.check('task');
    if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
    const task = MOCK.tasks.find(t => t.id === id);
    const progress = DB.get('tasksProgress') || {};
    if (progress[id]) { UI.toast('لقد أكملت هذه المهمة من قبل', 'warning'); return; }
    progress[id] = { completed: true, time: Date.now() };
    DB.set('tasksProgress', progress);
    Ledger.add('task_reward', task.reward, `مهمة: ${task.name}`, 'task_' + id);
    const user = DB.get('user');
    user.xp += 5;
    this.checkLevelUp(user);
    DB.set('user', user);
    UI.toast(`✅ مهمة مكتملة! +${task.reward} عملة`);
    UI.addNotification('مهمة مكتملة', `أكملت "${task.name}"`, '✅', 'reward');
    UI.updateSidebarUser();
    Router.render();
  },
  
  checkLevelUp(user) {
    const xpNeeded = user.level * 100;
    while (user.xp >= xpNeeded) {
      user.xp -= xpNeeded;
      user.level += 1;
      const levelBonus = user.level * 500;
      Ledger.add('level_up', levelBonus, `ترقية للمستوى ${user.level}!`, 'level_' + user.level);
      UI.toast(`🎉 مبروك! وصلت للمستوى ${user.level}! +${levelBonus} عملة`);
    }
  },
  
  copyReferral() {
    const user = DB.get('user');
    const link = `${window.location.origin}${window.location.pathname}?ref=${user.referralCode}`;
    navigator.clipboard.writeText(link).then(() => UI.toast('✅ تم نسخ رابط الإحالة'))
      .catch(() => UI.toast('الرابط: ' + link, 'info'));
  },
  
  saveProfile() {
    const user = DB.get('user');
    user.username = document.getElementById('profileUsername').value || user.username;
    user.email = document.getElementById('profileEmail').value;
    user.phone = document.getElementById('profilePhone').value;
    user.country = document.getElementById('profileCountry').value;
    DB.set('user', user);
    UI.toast('✅ تم حفظ البيانات');
    UI.updateSidebarUser();
    Router.render();
  },
  
  verifyEmail() {
    const user = DB.get('user');
    if (!user.email) { UI.toast('الرجاء إدخال البريد أولاً', 'error'); return; }
    Ledger.add('verify_email', 500, 'مكافأة التحقق من البريد', 'verify_email');
    user.verified = true;
    user.status = 'verified';
    DB.set('user', user);
    UI.toast('✅ تم التحقق! +500 عملة');
    Router.render();
  },
  
  enable2FA() {
    const user = DB.get('user');
    user.twoFA = true;
    DB.set('user', user);
    Ledger.add('2fa_enable', 1000, 'تفعيل المصادقة الثنائية', '2fa');
    UI.toast('✅ تم تفعيل 2FA! +1000 عملة');
    Router.render();
  },
  
  submitTicket() {
    const subject = document.getElementById('ticketSubject').value;
    const message = document.getElementById('ticketMessage').value;
    if (!subject || !message) { UI.toast('الرجاء ملء جميع الحقول', 'error'); return; }
    UI.toast('✅ تم إرسال التذكرة');
    UI.addNotification('تذكرة دعم', `تم استلام تذكرتك "${subject}"`, '💬', 'support');
    document.getElementById('ticketSubject').value = '';
    document.getElementById('ticketMessage').value = '';
  },
  
  adminLogin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true');
      UI.toast('✅ مرحباً بك في لوحة الأدمن');
      Router.render();
    } else { UI.toast('❌ كلمة السر خاطئة', 'error'); }
  },
  
  adminLogout() {
    sessionStorage.removeItem('adminAuth');
    UI.toast('تم تسجيل الخروج');
    Router.render();
  },
  
  adminAdjustCoins(userId, amount, reason) {
    if (!amount || isNaN(amount)) { UI.toast('قيمة غير صالحة', 'error'); return; }
    Ledger.add('admin_adjustment', parseInt(amount), `أدمن: ${reason}`, 'admin_' + Date.now());
    DB.push('adminLog', { action: 'adjust_coins', userId, amount, reason, timestamp: Date.now() });
    UI.toast(`✅ تم تعديل الرصيد بمقدار ${amount} عملة`);
    Router.render();
  },
  
  adminApproveWithdrawal(id) {
    const withdrawals = DB.get('withdrawals') || [];
    const w = withdrawals.find(x => x.id === id);
    if (!w) return;
    w.status = 'completed';
    DB.set('withdrawals', withdrawals);
    const ledger = DB.get('ledger') || [];
    const tx = ledger.find(t => t.reference === id);
    if (tx) tx.status = 'completed';
    DB.set('ledger', ledger);
    const user = DB.get('user');
    user.totalWithdrawn += parseFloat(w.usdValue);
    DB.set('user', user);
    UI.toast('✅ تمت الموافقة');
    Router.render();
  },
  
  adminRejectWithdrawal(id) {
    const reason = prompt('سبب الرفض؟');
    if (!reason) return;
    const withdrawals = DB.get('withdrawals') || [];
    const w = withdrawals.find(x => x.id === id);
    if (!w) return;
    w.status = 'rejected';
    w.reason = reason;
    DB.set('withdrawals', withdrawals);
    Ledger.add('withdrawal_refund', w.amount, `رفض السحب - ${reason}`, id);
    UI.toast('تم رفض السحب وإرجاع المبلغ');
    Router.render();
  },
  
  markNotificationRead(id) {
    const notifs = DB.get('notifications') || [];
    const n = notifs.find(x => x.id === id);
    if (n) n.read = true;
    DB.set('notifications', notifs);
    UI.updateNotifications();
    Router.render();
  },
  
  markAllRead() {
    const notifs = DB.get('notifications') || [];
    notifs.forEach(n => n.read = true);
    DB.set('notifications', notifs);
    UI.updateNotifications();
    Router.render();
  },
  
  resetAccount() {
    if (!confirm('⚠️ هل أنت متأكد؟ سيتم حذف جميع البيانات!')) return;
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }
};

// ===== HELPER FUNCTIONS =====
function completeOfferSimulation(id) {
  UI.closeModal();
  UI.toast('⏳ جاري توجيهك للشريك...');
  setTimeout(() => {
    const offer = MOCK.offers.find(o => o.id === id) || MOCK.games.find(g => g.id === id) || MOCK.surveys.find(s => s.id === id);
    if (!offer) return;
    const completed = DB.get('completedOffers') || [];
    completed.push({ id, time: Date.now(), reward: offer.reward });
    DB.set('completedOffers', completed);
    Ledger.add('offer_reward', offer.reward, `عرض: ${offer.name}`, id);
    const user = DB.get('user');
    user.completedOffers += 1;
    user.xp += 25;
    Actions.checkLevelUp(user);
    DB.set('user', user);
    UI.toast(`🎉 عرض مكتمل! +${offer.reward.toLocaleString()} عملة`);
    UI.addNotification('عرض مكتمل', `أكملت "${offer.name}"`, '🎯', 'offer');
    UI.updateSidebarUser();
    Router.render();
  }, 2000);
}

function confirmRewardPurchase(id) {
  const email = document.getElementById('deliveryEmail').value;
  if (!email) { UI.toast('الرجاء إدخال البريد', 'error'); return; }
  const reward = MOCK.rewards.find(r => r.id === id);
  const user = DB.get('user');
  user.email = email;
  DB.set('user', user);
  const order = {
    id: 'ord_' + Date.now(), type: 'reward',
    rewardId: id, rewardName: reward.name,
    coins: reward.coins, usd: reward.usd, email,
    status: 'processing', timestamp: Date.now()
  };
  DB.push('orders', order);
  Ledger.add('reward_purchase', -reward.coins, `شراء: ${reward.name}`, order.id);
  UI.closeModal();
  UI.toast(`✅ تم الشراء!`);
  UI.addNotification('تم الشراء', `تم شراء ${reward.name}`, '🛒', 'order');
  Router.render();
}

function confirmTopUp(gameId, packageIndex) {
  const playerId = document.getElementById('playerId').value;
  if (!playerId) { UI.toast('الرجاء إدخال Player ID', 'error'); return; }
  const game = MOCK.topUpGames.find(g => g.id === gameId);
  const pkg = game.packages[packageIndex];
  const country = document.getElementById('topUpCountry').value;
  const order = {
    id: 'ord_' + Date.now(), type: 'topup',
    gameId, gameName: game.name,
    package: pkg.name, coins: pkg.coins, usd: pkg.usd,
    playerId, country, status: 'processing', timestamp: Date.now()
  };
  DB.push('orders', order);
  Ledger.add('topup_purchase', -pkg.coins, `شحن ${game.name} - ${pkg.name}`, order.id);
  UI.closeModal();
  UI.toast(`⚡ تم بدء الشحن!`);
  UI.addNotification('شحن جاري', `جاري شحن ${pkg.name}`, '⚡', 'order');
  Router.render();
}

function watchAd() {
  const fraudCheck = Fraud.check('ad');
  if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
  UI.toast('⏳ جاري تحميل الإعلان...');
  setTimeout(() => {
    Ledger.add('ad_reward', 50, 'مكافأة مشاهدة إعلان', 'ad_' + Date.now());
    UI.toast('✅ +50 عملة!');
    UI.addNotification('مكافأة إعلان', 'ربحت 50 عملة', '📺', 'reward');
  }, 3000);
}

function watchAdBonus() {
  UI.toast('⏳ جاري تشغيل 5 إعلانات...');
  let count = 0;
  const interval = setInterval(() => {
    count++;
    Ledger.add('ad_bonus', 100, `إعلان مكافأة #${count}`, 'ad_bonus_' + count);
    if (count >= 5) {
      clearInterval(interval);
      Ledger.add('ad_bonus_complete', 500, 'إكمال تحدي الإعلانات', 'ad_bonus_complete');
      UI.toast('🎉 +1,000 عملة!');
    }
  }, 2000);
}

function openTreasure() {
  const fraudCheck = Fraud.check('treasure');
  if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
  const prizes = [100, 200, 500, 1000, 2000, 5000, 10000];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  Ledger.add('treasure', prize, 'صندوق سري', 'treasure_' + Date.now());
  UI.toast(`🎁 ربحت ${prize} عملة!`);
}

function scratchCard() {
  const fraudCheck = Fraud.check('scratch');
  if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
  const prizes = [50, 100, 200, 500, 1000];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  Ledger.add('scratch', prize, 'بطاقة خدش', 'scratch_' + Date.now());
  UI.toast(`🎟️ ربحت ${prize} عملة!`);
}

function shareReferral() {
  const user = DB.get('user');
  const link = `${window.location.origin}${window.location.pathname}?ref=${user.referralCode}`;
  if (navigator.share) {
    navigator.share({ title: 'انضم إلى RewardX', text: 'اكسب عملات حقيقية!', url: link });
  } else {
    navigator.clipboard.writeText(link);
    UI.toast('📋 تم نسخ الرابط');
  }
}

function toggleFaq(i) {
  const content = document.getElementById(`faq_${i}`);
  const icon = document.getElementById(`faqIcon_${i}`);
  if (content && icon) {
    if (content.style.display === 'none') {
      content.style.display = 'block';
      icon.textContent = '−';
    } else {
      content.style.display = 'none';
      icon.textContent = '+';
    }
  }
}

function showWithdrawForm(method, min) {
  const balance = Ledger.getAvailable();
  UI.modal(`سحب عبر ${method}`,
    `<div class="form-group">
      <label class="form-label">المبلغ (عملات)</label>
      <input type="number" class="form-input" id="withdrawAmount" placeholder="الحد الأدنى: ${min.toLocaleString()}" min="${min}" max="${balance}">
    </div>
    <div class="form-group">
      <label class="form-label">${method === 'PayPal' ? 'بريد PayPal' : 'التفاصيل'}</label>
      <input type="text" class="form-input" id="withdrawAddress" placeholder="أدخل البيانات">
    </div>`,
    [
      { text: '❌ إلغاء', class: 'btn-ghost', onclick: 'closeModal()' },
      { text: '💸 تأكيد', class: 'btn-primary', onclick: `Actions.requestWithdrawal(parseInt(document.getElementById('withdrawAmount').value), '${method}')` }
    ]
  );
}

function exportData() {
  const data = {
    user: DB.get('user'), ledger: DB.get('ledger'),
    withdrawals: DB.get('withdrawals'), orders: DB.get('orders'),
    notifications: DB.get('notifications'), fraudEvents: DB.get('fraudEvents')
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'rewardx_data_' + Date.now() + '.json';
  a.click();
  UI.toast('✅ تم تصدير البيانات');
}

// ===== VIEWS =====
const Views = {
  home() {
    const user = DB.get('user');
    const balance = Ledger.getBalance();
    const lifetimeEarned = Ledger.getLifetimeEarned();
    const completedOffers = (DB.get('completedOffers') || []).length;
    const ledger = Ledger.getHistory().slice(0, 5);
    const settings = DB.get('settings');
    const usdBalance = (balance / settings.coinRate).toFixed(2);
    
    return `
      <div class="hero slide-up">
        <div class="hero-badge"><span class="hero-badge-dot"></span><span>منصة ربح احترافية</span></div>
        <h1>مرحباً <span class="gradient-text">${user.username}</span> 👋</h1>
        <p>ابدأ رحلتك في كسب العملات الحقيقية</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" onclick="navigate('earn')">🚀 ابدأ الكسب</button>
          <button class="btn btn-ghost btn-lg" onclick="navigate('daily')">🎁 المكافأة اليومية</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="hero-stat-value">${balance.toLocaleString()}</div><div class="hero-stat-label">💰 رصيدك</div></div>
          <div class="hero-stat"><div class="hero-stat-value">$${usdBalance}</div><div class="hero-stat-label">💵 بالدولار</div></div>
          <div class="hero-stat"><div class="hero-stat-value">${user.streak}🔥</div><div class="hero-stat-label">Streak</div></div>
          <div class="hero-stat"><div class="hero-stat-value">${completedOffers}</div><div class="hero-stat-label">🎯 عروض</div></div>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card gradient-primary">
          <div class="stat-icon">💰</div>
          <div class="stat-value" id="mainBalance">${balance.toLocaleString()}</div>
          <div class="stat-label">الرصيد المتاح</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-value">${lifetimeEarned.toLocaleString()}</div>
          <div class="stat-label">إجمالي الكسب</div>
        </div>
        <div class="stat-card gradient-accent">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">${user.streak} يوم</div>
          <div class="stat-label">Streak الحالي</div>
        </div>
        <div class="stat-card gradient-purple">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">Lv ${user.level}</div>
          <div class="stat-label">مستواك</div>
        </div>
      </div>
      
      <a href="https://freecash.com/r/34GRD6" target="_blank" class="affiliate-banner">
        <img src="https://cdn.phototourl.com/free/2026-08-17-d1178f26-4ff4-4f4d-aad0-8b528e531e10.png" alt="Freecash">
      </a>
      
      <div class="card-grid">
        <div class="card">
          <div class="card-title">🔥 العروض الأعلى ربحاً</div>
          ${MOCK.offers.slice(0, 3).map(o => `
            <div class="feature-card mb-10" style="padding:16px;" onclick="navigate('offers')">
              <div class="flex gap-10" style="align-items:center;">
                <div class="offer-icon" style="width:50px; height:50px; font-size:1.5rem;">${o.icon}</div>
                <div style="flex:1; min-width:0;">
                  <div style="font-weight:700;">${o.name}</div>
                  <div class="text-muted" style="font-size:0.8rem;">${o.provider}</div>
                </div>
                <div style="color:var(--primary); font-weight:800;">+${o.reward.toLocaleString()}</div>
              </div>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-block mt-10" onclick="navigate('offers')">عرض الكل ←</button>
        </div>
        
        <div class="card">
          <div class="card-title">🎮 الألعاب الأعلى ربحاً</div>
          ${MOCK.games.slice(0, 3).map(g => `
            <div class="feature-card mb-10" style="padding:16px;" onclick="navigate('games')">
              <div class="flex gap-10" style="align-items:center;">
                <div class="offer-icon" style="width:50px; height:50px; font-size:1.5rem; background:var(--gradient-purple);">${g.icon}</div>
                <div style="flex:1; min-width:0;">
                  <div style="font-weight:700;">${g.name}</div>
                  <div class="text-muted" style="font-size:0.8rem;">${g.platform}</div>
                </div>
                <div style="color:var(--secondary); font-weight:800;">حتى ${g.totalReward.toLocaleString()}</div>
              </div>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-block mt-10" onclick="navigate('games')">عرض الكل ←</button>
        </div>
      </div>
      
      <div class="card">
        <div class="card-title">🎁 المكافأة اليومية</div>
        <div class="streak-display">
          ${DB.get('settings').dailyRewards.map((reward, i) => {
            const day = i + 1;
            const claimed = user.streak >= day && user.lastDailyClaim && new Date(user.lastDailyClaim).toDateString() === new Date().toDateString();
            const isToday = user.streak === i && (!user.lastDailyClaim || new Date(user.lastDailyClaim).toDateString() !== new Date().toDateString());
            return `<div class="streak-day ${claimed ? 'claimed' : ''} ${isToday ? 'today' : ''}"><div class="day-num">D${day}</div><div class="reward">+${reward}</div></div>`;
          }).join('')}
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="Actions.claimDaily()" ${user.lastDailyClaim && new Date(user.lastDailyClaim).toDateString() === new Date().toDateString() ? 'disabled' : ''}>
          ${user.lastDailyClaim && new Date(user.lastDailyClaim).toDateString() === new Date().toDateString() ? '✅ تم اليوم' : '🎁 احصل على مكافأة اليوم'}
        </button>
      </div>
      
      <div class="card">
        <div class="card-title">📜 آخر العمليات</div>
        ${ledger.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📜</div><div class="empty-state-title">لا توجد عمليات</div></div>' : 
          ledger.map(tx => `
            <div style="padding:14px; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:600;">${tx.description}</div>
                <div class="text-muted" style="font-size:0.8rem;">${UI.formatTime(tx.timestamp)}</div>
              </div>
              <div style="font-weight:800; color:${tx.amount > 0 ? 'var(--primary)' : 'var(--danger)'};">
                ${tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString()} 💰
              </div>
            </div>
          `).join('')
        }
      </div>
      
      <div class="card">
        <div class="card-title">🏆 أفضل المستخدمين</div>
        ${MOCK.leaderboard.slice(0, 5).map((u, i) => `
          <div class="leaderboard-item">
            <div class="rank rank-${i+1}">${i+1}</div>
            <div class="avatar">${u.avatar}</div>
            <div class="leaderboard-info">
              <div class="leaderboard-name">${u.name}</div>
              <div class="leaderboard-stats">Lv ${u.level} · ${u.country}</div>
            </div>
            <div class="leaderboard-amount">${(u.earned/1000).toFixed(0)}K</div>
          </div>
        `).join('')}
        <button class="btn btn-secondary btn-block mt-10" onclick="navigate('leaderboard')">عرض الكل ←</button>
      </div>
      
      <div class="card" style="background:linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.05)); border-color:rgba(139,92,246,0.3);">
        <div class="card-title">🤝 برنامج الإحالة</div>
        <p class="text-secondary mb-20">ادعُ أصدقاءك واحصل على <strong style="color:var(--accent);">10%</strong> من أرباحهم!</p>
        <div style="background:var(--bg-elevated); padding:14px; border-radius:12px; font-family:monospace; word-break:break-all; margin-bottom:16px;">
          ${window.location.origin}${window.location.pathname}?ref=${user.referralCode}
        </div>
        <button class="btn btn-purple btn-block" onclick="Actions.copyReferral()">📋 نسخ رابط الإحالة</button>
      </div>
      
      <div class="ad-container">
        <script async="async" data-cfasync="false" src="https://pl30883341.effectivecpmnetwork.com/f4263ddbfe2b4cb1e4ebdad01fc57d37/invoke.js"></script>
        <div id="container-f4263ddbfe2b4cb1e4ebdad01fc57d37"></div>
      </div>
      
      <div class="card">
        <div class="card-title">🔐 حالة الحساب</div>
        <div class="flex gap-10" style="flex-wrap:wrap;">
          <span class="badge-status ${user.status === 'verified' ? 'badge-success' : user.status === 'restricted' ? 'badge-danger' : 'badge-warning'}">
            ${user.status === 'verified' ? '✅ موثق' : user.status === 'restricted' ? '⛔ مقيد' : '⏳ قيد الانتظار'}
          </span>
          <span class="badge-status ${user.verified ? 'badge-success' : 'badge-warning'}">
            ${user.verified ? '📧 بريد موثق' : '📧 غير موثق'}
          </span>
          <span class="badge-status ${user.twoFA ? 'badge-success' : 'badge-warning'}">
            ${user.twoFA ? '🔒 2FA مفعل' : '🔓 2FA معطل'}
          </span>
        </div>
      </div>
    `;
  },
  
  earn() {
    return `
      <h1 class="page-title">💰 اكسب العملات</h1>
      <p class="page-subtitle">اختر الطريقة المفضلة لديك</p>
      <div class="card-grid">
        ${[
          { route: 'offers', icon: '🎯', title: 'العروض', desc: 'أكمل عروض واربح حتى 10,000 عملة', count: MOCK.offers.length },
          { route: 'games', icon: '🎮', title: 'الألعاب', desc: 'ثبّت والعب واربح حتى 15,000 عملة', count: MOCK.games.length },
          { route: 'surveys', icon: '📊', title: 'الاستبيانات', desc: 'شارك رأيك واحصل على عملات', count: MOCK.surveys.length },
          { route: 'ads', icon: '📺', title: 'شاهد الإعلانات', desc: 'شاهد فيديوهات قصيرة', count: 10 },
          { route: 'tasks', icon: '✅', title: 'المهام', desc: 'أنجز مهام بسيطة', count: MOCK.tasks.length },
          { route: 'challenges', icon: '🏆', title: 'التحديات', desc: 'أكمل تحديات', count: 5 },
          { route: 'wheel', icon: '🎡', title: 'عجلة الحظ', desc: 'ادر يومياً واربح حتى 5,000', count: 1 },
          { route: 'referrals', icon: '🤝', title: 'الإحالة', desc: 'ادعُ أصدقاءك', count: DB.get('user').referralCount }
        ].map(item => `
          <div class="feature-card" onclick="navigate('${item.route}')">
            <div class="feature-icon">${item.icon}</div>
            <div class="feature-title">${item.title}</div>
            <div class="feature-desc">${item.desc}</div>
            <div class="feature-meta">
              <span class="badge-status badge-success">${item.count} متاح</span>
              <span style="color:var(--primary); font-weight:700;">← ابدأ</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  offers() {
    const completed = DB.get('completedOffers') || [];
    return `
      <h1 class="page-title">🎯 العروض المتاحة</h1>
      <p class="page-subtitle">أكمل هذه العروض واربح عملات</p>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-value">${MOCK.offers.length}</div><div class="stat-label">عرض متاح</div></div>
        <div class="stat-card gradient-primary"><div class="stat-icon">✅</div><div class="stat-value">${completed.length}</div><div class="stat-label">مكتمل</div></div>
        <div class="stat-card gradient-accent"><div class="stat-icon">💰</div><div class="stat-value">${completed.reduce((s, c) => s + c.reward, 0).toLocaleString()}</div><div class="stat-label">المكاسب</div></div>
      </div>
      <div class="ad-container">
        <script>atOptions = { 'key': 'c26b6f67e990df9cd2681f276abe3231', 'format': 'iframe', 'height': 60, 'width': 468, 'params': {} };</script>
        <script src="https://www.highperformanceformat.com/c26b6f67e990df9cd2681f276abe3231/invoke.js"></script>
      </div>
      <div class="card-grid">
        ${MOCK.offers.map(o => {
          const isCompleted = completed.find(c => c.id === o.id);
          return `
            <div class="offer-card">
              ${o.featured ? '<div class="offer-featured">⭐ مميز</div>' : ''}
              <div class="offer-header">
                <div class="offer-icon">${o.icon}</div>
                <div class="offer-meta">
                  <div class="offer-name">${o.name}</div>
                  <div class="offer-provider">${o.provider}</div>
                </div>
              </div>
              <div class="offer-desc">${o.desc}</div>
              <div class="offer-tags">
                <span class="offer-tag">⏱️ ${o.time}</span>
                <span class="offer-tag">📊 ${o.difficulty}</span>
                <span class="offer-tag">👥 ${o.completions.toLocaleString()}</span>
              </div>
              <div class="offer-reward">
                <span class="offer-reward-label">المكافأة:</span>
                <span class="offer-reward-value">+${o.reward.toLocaleString()}</span>
              </div>
              <button class="btn btn-primary btn-block" onclick="Actions.startOffer('${o.id}')" ${isCompleted ? 'disabled' : ''}>
                ${isCompleted ? '✅ مكتمل' : '🚀 ابدأ العرض'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
      <div class="card mt-30" style="background:linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1));">
        <h3>💎 عروض Freecash</h3>
        <p class="text-secondary">اكتشف آلاف العروض الإضافية</p>
        <a href="https://freecash.com/r/34GRD6" target="_blank" class="btn btn-purple mt-20">🚀 زيارة Freecash</a>
      </div>
    `;
  },
  
  games() {
    return `
      <h1 class="page-title">🎮 عروض الألعاب</h1>
      <p class="page-subtitle">ثبّت والعب واربح على كل milestone</p>
      <div class="card-grid">
        ${MOCK.games.map(g => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon" style="background:var(--gradient-purple);">${g.icon}</div>
              <div class="offer-meta">
                <div class="offer-name">${g.name}</div>
                <div class="offer-provider">${g.platform}</div>
              </div>
            </div>
            <div style="margin:12px 0; display:flex; justify-content:space-between; font-size:0.85rem;">
              <span class="text-muted">👥 ${g.players.toLocaleString()} لاعب</span>
              <span class="badge-status badge-warning">⏰ ${g.deadline} يوم</span>
            </div>
            <div style="margin:16px 0;">
              ${g.milestones.map(m => `
                <div style="display:flex; justify-content:space-between; padding:10px; background:var(--bg-surface); border-radius:10px; margin-bottom:6px; font-size:0.85rem;">
                  <span>🎯 ${m.name}</span>
                  <strong style="color:var(--primary);">+${m.reward.toLocaleString()}</strong>
                </div>
              `).join('')}
            </div>
            <div style="background:var(--bg-elevated); padding:14px; border-radius:12px; text-align:center; margin:16px 0;">
              <div class="text-muted" style="font-size:0.8rem;">الإجمالي</div>
              <div style="color:var(--primary); font-size:1.6rem; font-weight:800;">+${g.totalReward.toLocaleString()} 💰</div>
            </div>
            <button class="btn btn-purple btn-block" onclick="Actions.startOffer('${g.id}')">🎮 ابدأ اللعب</button>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  surveys() {
    return `
      <h1 class="page-title">📊 الاستبيانات</h1>
      <p class="page-subtitle">شارك رأيك واحصل على عملات</p>
      <div class="card-grid">
        ${MOCK.surveys.map(s => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon" style="background:var(--gradient-accent);">${s.icon}</div>
              <div class="offer-meta">
                <div class="offer-name">${s.name}</div>
                <div class="offer-provider">${s.provider}</div>
              </div>
            </div>
            <div class="offer-tags">
              <span class="offer-tag">⏱️ ${s.time}</span>
              <span class="offer-tag">👥 ${s.completions.toLocaleString()}</span>
            </div>
            <div class="offer-reward">
              <span class="offer-reward-label">المكافأة:</span>
              <span class="offer-reward-value">+${s.reward.toLocaleString()}</span>
            </div>
            <button class="btn btn-accent btn-block" onclick="Actions.startOffer('${s.id}')">📝 ابدأ</button>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  ads() {
    return `
      <h1 class="page-title">📺 شاهد الإعلانات</h1>
      <p class="page-subtitle">شاهد إعلانات قصيرة واربح عملات</p>
      <div class="card">
        <div class="card-title">🎬 إعلانات الفيديو</div>
        <div style="background:var(--bg-surface); padding:40px; border-radius:16px; text-align:center;">
          <div style="font-size:5rem;">📺</div>
          <h3 style="margin:16px 0;">إعلان فيديو (30 ثانية)</h3>
          <p class="text-secondary">شاهد الإعلان لتحصل على 50 عملة</p>
          <button class="btn btn-primary btn-lg mt-20" onclick="watchAd()">▶️ شاهد الآن</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🎁 تحدي الإعلانات</div>
        <p class="text-secondary">شاهد 5 إعلانات متتالية واحصل على 1000 عملة</p>
        <button class="btn btn-accent btn-block btn-lg mt-20" onclick="watchAdBonus()">🎁 ابدأ التحدي</button>
      </div>
    `;
  },
  
  daily() {
    const user = DB.get('user');
    const settings = DB.get('settings');
    const lastClaim = user.lastDailyClaim ? new Date(user.lastDailyClaim).toDateString() : null;
    const canClaimToday = lastClaim !== new Date().toDateString();
    return `
      <h1 class="page-title">🎁 المكافآت اليومية</h1>
      <p class="page-subtitle">سجل دخولك يومياً</p>
      <div class="card" style="text-align:center; background:var(--gradient-primary); border:none;">
        <h2 style="color:#001a0f;">🔥 Streak: ${user.streak} أيام</h2>
        <p style="color:rgba(0,26,15,0.7);">الأعلى: ${user.maxStreak} أيام</p>
      </div>
      <div class="card">
        <div class="card-title">📅 جدول المكافآت</div>
        <div class="streak-display">
          ${settings.dailyRewards.map((reward, i) => {
            const day = i + 1;
            const claimed = user.streak >= day && lastClaim === new Date().toDateString();
            const isToday = user.streak === i && canClaimToday;
            return `<div class="streak-day ${claimed ? 'claimed' : ''} ${isToday ? 'today' : ''}"><div class="day-num">D${day}</div><div class="reward">+${reward}</div></div>`;
          }).join('')}
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="Actions.claimDaily()" ${!canClaimToday ? 'disabled' : ''}>
          ${canClaimToday ? '🎁 احصل على مكافأة اليوم' : '✅ تم - عد غداً'}
        </button>
      </div>
      <div class="card-grid">
        <div class="card">
          <div class="card-title">💎 Daily Treasure</div>
          <p class="text-secondary">افتح الصندوق واربح حتى 10,000 عملة!</p>
          <button class="btn btn-accent btn-block mt-20" onclick="openTreasure()">🎁 افتح</button>
        </div>
        <div class="card">
          <div class="card-title">🎟️ Scratch Cards</div>
          <p class="text-secondary">بطاقة خدش مجانية</p>
          <button class="btn btn-purple btn-block mt-20" onclick="scratchCard()">🎟️ احصل</button>
        </div>
      </div>
    `;
  },
  
  tasks() {
    const progress = DB.get('tasksProgress') || {};
    return `
      <h1 class="page-title">✅ المهام اليومية</h1>
      <p class="page-subtitle">أكمل مهام بسيطة واربح عملات</p>
      <div class="card-grid">
        ${MOCK.tasks.map(t => {
          const done = progress[t.id];
          return `
            <div class="offer-card">
              <div class="offer-header">
                <div class="offer-icon">${t.icon}</div>
                <div class="offer-meta">
                  <div class="offer-name">${t.name}</div>
                  <div class="offer-provider">مهمة بسيطة</div>
                </div>
              </div>
              <div class="offer-reward">
                <span class="offer-reward-label">المكافأة:</span>
                <span class="offer-reward-value">+${t.reward.toLocaleString()}</span>
              </div>
              <button class="btn ${done ? 'btn-secondary' : 'btn-primary'} btn-block" onclick="Actions.completeTask('${t.id}')" ${done ? 'disabled' : ''}>
                ${done ? '✅ مكتمل' : '✨ أنجز المهمة'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },
  
  challenges() {
    const user = DB.get('user');
    const completedOffers = (DB.get('completedOffers') || []).length;
    return `
      <h1 class="page-title">🏆 التحديات</h1>
      <p class="page-subtitle">أكمل التحديات واربح جوائز</p>
      <div class="card">
        <div class="card-title">⚡ تحديات يومية</div>
        <div style="padding:18px; background:var(--bg-surface); border-radius:12px;">
          <div class="flex-between mb-10">
            <div>
              <strong>🎯 أكمل 3 عروض اليوم</strong>
              <div class="text-secondary" style="font-size:0.85rem;">الجائزة: 1,000 عملة</div>
            </div>
            <span class="badge-status badge-warning">${Math.min(completedOffers, 3)}/3</span>
          </div>
          <div class="progress"><div class="progress-bar" style="width:${Math.min(100, (completedOffers/3)*100)}%;"></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🔥 تحديات أسبوعية</div>
        <div style="padding:18px; background:var(--bg-surface); border-radius:12px; margin-bottom:12px;">
          <div class="flex-between mb-10">
            <div>
              <strong>🔥 Streak 7 أيام</strong>
              <div class="text-secondary" style="font-size:0.85rem;">الجائزة: 2,000 عملة</div>
            </div>
            <span class="badge-status badge-warning">${Math.min(user.streak, 7)}/7</span>
          </div>
          <div class="progress"><div class="progress-bar" style="width:${Math.min(100, (user.streak/7)*100)}%;"></div></div>
        </div>
      </div>
    `;
  },
  
  wheel() {
    const user = DB.get('user');
    const canSpin = !user.lastWheelSpin || (Date.now() - user.lastWheelSpin) > 86400000;
    const hoursLeft = user.lastWheelSpin ? Math.ceil((86400000 - (Date.now() - user.lastWheelSpin)) / 3600000) : 0;
    return `
      <h1 class="page-title">🎡 عجلة الحظ</h1>
      <p class="page-subtitle">ادر العجلة يومياً</p>
      <div class="card">
        <div class="wheel-container">
          <div class="wheel-wrapper">
            <div class="wheel-pointer"></div>
            <div class="wheel" id="spinWheel"></div>
          </div>
          <div style="margin-top:32px;">
            ${canSpin ? `<button class="btn btn-primary btn-lg" onclick="Actions.completeSpinWheel()">🎡 ادر العجلة</button>` 
                      : `<button class="btn btn-secondary btn-lg" disabled>⏰ عد بعد ${hoursLeft} ساعة</button>`}
          </div>
          <div class="mt-30">
            <h3 class="mb-20">🎁 الجوائز</h3>
            <div class="stats-grid">
              ${DB.get('settings').wheelPrizes.slice(0, 4).map(p => `
                <div class="stat-card"><div class="stat-value">${p.toLocaleString()}</div><div class="stat-label">عملة</div></div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  wallet() {
    const balance = Ledger.getBalance();
    const pending = Ledger.getPending();
    const locked = Ledger.getLocked();
    const earned = Ledger.getLifetimeEarned();
    const spent = Ledger.getLifetimeSpent();
    const user = DB.get('user');
    const settings = DB.get('settings');
    return `
      <h1 class="page-title">💼 المحفظة</h1>
      <p class="page-subtitle">إدارة عملاتك</p>
      <div class="stats-grid">
        <div class="stat-card gradient-primary">
          <div class="stat-icon">💰</div>
          <div class="stat-value" id="mainBalance">${balance.toLocaleString()}</div>
          <div class="stat-label">الرصيد المتاح</div>
          <div class="stat-trend up">$${(balance/settings.coinRate).toFixed(2)}</div>
        </div>
        <div class="stat-card"><div class="stat-icon">⏳</div><div class="stat-value">${pending.toLocaleString()}</div><div class="stat-label">قيد الانتظار</div></div>
        <div class="stat-card"><div class="stat-icon">🔒</div><div class="stat-value">${locked.toLocaleString()}</div><div class="stat-label">مقفل</div></div>
        <div class="stat-card gradient-accent"><div class="stat-icon">📈</div><div class="stat-value">${earned.toLocaleString()}</div><div class="stat-label">إجمالي المكتسب</div></div>
        <div class="stat-card"><div class="stat-icon">📉</div><div class="stat-value">${spent.toLocaleString()}</div><div class="stat-label">إجمالي المنفق</div></div>
        <div class="stat-card gradient-purple"><div class="stat-icon">💸</div><div class="stat-value">$${user.totalWithdrawn.toFixed(2)}</div><div class="stat-label">إجمالي المسحوب</div></div>
      </div>
      <div class="card-grid">
        <button class="btn btn-primary btn-block btn-lg" onclick="navigate('withdraw')">💸 سحب</button>
        <button class="btn btn-purple btn-block btn-lg" onclick="navigate('store')">🛒 المتجر</button>
        <button class="btn btn-accent btn-block btn-lg" onclick="navigate('topup')">⚡ شحن</button>
      </div>
      <div class="card">
        <div class="card-title">📊 التحويل</div>
        <div class="flex-between mb-10"><span class="text-secondary">1 USD =</span><strong style="color:var(--primary);">${settings.coinRate.toLocaleString()} عملة</strong></div>
        <div class="flex-between"><span class="text-secondary">رصيدك =</span><strong style="color:var(--accent);">$${(balance/settings.coinRate).toFixed(2)}</strong></div>
      </div>
    `;
  },
  
  transactions() {
    const ledger = Ledger.getHistory();
    return `
      <h1 class="page-title">📜 سجل العمليات</h1>
      <p class="page-subtitle">جميع معاملاتك</p>
      <div class="card">
        ${ledger.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📜</div><div class="empty-state-title">لا توجد عمليات</div></div>' : `
          <div class="table-container">
            <table>
              <thead><tr><th>التاريخ</th><th>النوع</th><th>الوصف</th><th>المبلغ</th><th>الحالة</th></tr></thead>
              <tbody>
                ${ledger.slice(0, 50).map(tx => `
                  <tr>
                    <td>${UI.formatTime(tx.timestamp)}</td>
                    <td><span class="badge-status badge-info">${tx.type}</span></td>
                    <td>${tx.description}</td>
                    <td style="color:${tx.amount > 0 ? 'var(--primary)' : 'var(--danger)'}; font-weight:700;">
                      ${tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString()} 💰
                    </td>
                    <td><span class="badge-status ${tx.status === 'completed' ? 'badge-success' : tx.status === 'pending' ? 'badge-warning' : 'badge-danger'}">${tx.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  },
  
  store() {
    return `
      <h1 class="page-title">🛒 متجر المكافآت</h1>
      <p class="page-subtitle">استبدل عملاتك بجوائز حقيقية</p>
      <div class="card-grid">
        ${MOCK.rewards.map(r => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon">${r.icon}</div>
              <div class="offer-meta">
                <div class="offer-name">${r.name}</div>
                <div class="offer-provider">${r.category} · ${r.stock} متاح</div>
              </div>
            </div>
            <div style="margin:16px 0; padding:16px; background:var(--bg-surface); border-radius:12px;">
              <div class="flex-between mb-10"><span class="text-secondary">التكلفة:</span><strong style="color:var(--primary);">${r.coins.toLocaleString()} 💰</strong></div>
              <div class="flex-between"><span class="text-secondary">القيمة:</span><strong style="color:var(--accent);">$${r.usd}</strong></div>
            </div>
            <button class="btn btn-primary btn-block" onclick="Actions.purchaseReward('${r.id}')" ${!r.available ? 'disabled' : ''}>
              ${r.available ? '🛒 اشترِ' : '❌ غير متاح'}
            </button>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  topup() {
    return `
      <h1 class="page-title">⚡ شحن الألعاب</h1>
      <p class="page-subtitle">اشحن ألعابك المفضلة</p>
      <div class="card-grid">
        ${MOCK.topUpGames.map(g => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon" style="background:var(--gradient-accent);">${g.icon}</div>
              <div class="offer-meta">
                <div class="offer-name">${g.name}</div>
                <div class="offer-provider">شحن فوري ⚡</div>
              </div>
            </div>
            <div style="margin-top:16px;">
              ${g.packages.map((p, i) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-surface); border-radius:10px; margin-bottom:8px;">
                  <div><strong>${p.name}</strong><div class="text-muted" style="font-size:0.8rem;">$${p.usd}</div></div>
                  <button class="btn btn-accent" style="padding:8px 16px;" onclick="Actions.topUpGame('${g.id}', ${i})">${p.coins.toLocaleString()} 💰</button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  withdraw() {
    const balance = Ledger.getAvailable();
    const settings = DB.get('settings');
    const withdrawals = (DB.get('withdrawals') || []).slice().reverse();
    return `
      <h1 class="page-title">💸 السحب</h1>
      <p class="page-subtitle">حوّل عملاتك إلى أموال حقيقية</p>
      <div class="card" style="background:var(--gradient-primary); border:none; text-align:center;">
        <h2 style="color:#001a0f;">رصيدك المتاح</h2>
        <div style="font-size:3rem; font-weight:900; margin:16px 0; color:#001a0f;">${balance.toLocaleString()} 💰</div>
        <p style="color:rgba(0,26,15,0.7); font-size:1.2rem; font-weight:600;">= $${(balance/settings.coinRate).toFixed(2)}</p>
      </div>
      <div class="card">
        <div class="card-title">💳 طرق السحب</div>
        <div class="card-grid">
          ${[
            { method: 'PayPal', icon: '💳', min: 50000, fee: '2%', time: '24h' },
            { method: 'Crypto (USDT)', icon: '₿', min: 100000, fee: '1%', time: '1-2h' },
            { method: 'Bank Transfer', icon: '🏦', min: 200000, fee: '3%', time: '3-5 days' },
            { method: 'Gift Card', icon: '🎁', min: 50000, fee: '0%', time: 'Instant' }
          ].map(m => `
            <div class="card" style="background:var(--bg-surface); margin:0;">
              <div style="font-size:3rem; text-align:center; margin-bottom:12px;">${m.icon}</div>
              <h3 style="text-align:center; margin-bottom:16px;">${m.method}</h3>
              <div style="font-size:0.9rem;">
                <div class="flex-between mb-10"><span class="text-secondary">الحد الأدنى:</span><strong>${m.min.toLocaleString()}</strong></div>
                <div class="flex-between mb-10"><span class="text-secondary">الرسوم:</span><strong>${m.fee}</strong></div>
                <div class="flex-between"><span class="text-secondary">الوقت:</span><strong>${m.time}</strong></div>
              </div>
              <button class="btn btn-primary btn-block mt-20" onclick="showWithdrawForm('${m.method}', ${m.min})" ${balance < m.min ? 'disabled' : ''}>
                ${balance >= m.min ? '💸 اسحب' : '⚠️ غير كافٍ'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-title">📜 سجل السحب</div>
        ${withdrawals.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">💸</div><div class="empty-state-title">لا توجد عمليات</div></div>' : `
          <div class="table-container">
            <table>
              <thead><tr><th>التاريخ</th><th>الطريقة</th><th>المبلغ</th><th>الحالة</th></tr></thead>
              <tbody>
                ${withdrawals.map(w => `
                  <tr>
                    <td>${UI.formatTime(w.timestamp)}</td>
                    <td>${w.method}</td>
                    <td style="font-weight:700;">$${w.usdValue}</td>
                    <td><span class="badge-status ${w.status === 'completed' ? 'badge-success' : w.status === 'pending' ? 'badge-warning' : 'badge-danger'}">${w.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  },
  
  referrals() {
    const user = DB.get('user');
    const link = `${window.location.origin}${window.location.pathname}?ref=${user.referralCode}`;
    return `
      <h1 class="page-title">🤝 برنامج الإحالة</h1>
      <p class="page-subtitle">ادعُ أصدقاءك واكسب 10%</p>
      <div class="card" style="background:linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1));">
        <h2>🎉 رابطك الخاص</h2>
        <p class="text-secondary mb-20">احصل على 10% من كل ما يكسبه أصدقاؤك!</p>
        <div style="background:var(--bg-elevated); padding:14px; border-radius:12px; font-family:monospace; word-break:break-all; margin-bottom:16px;">${link}</div>
        <div class="flex gap-10" style="flex-wrap:wrap;">
          <button class="btn btn-purple" onclick="Actions.copyReferral()">📋 نسخ</button>
          <button class="btn btn-secondary" onclick="shareReferral()">📤 مشاركة</button>
        </div>
      </div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">${user.referralCount}</div><div class="stat-label">الإحالات</div></div>
        <div class="stat-card gradient-primary"><div class="stat-icon">💰</div><div class="stat-value">${user.referralEarnings.toLocaleString()}</div><div class="stat-label">الأرباح</div></div>
        <div class="stat-card gradient-accent"><div class="stat-icon">🏷️</div><div class="stat-value" style="font-size:1.2rem;">${user.referralCode}</div><div class="stat-label">الكود</div></div>
      </div>
      <div class="card">
        <div class="card-title">🏆 Milestones</div>
        ${[
          { target: 1, reward: 500, icon: '🥉' },
          { target: 5, reward: 5000, icon: '🥈' },
          { target: 10, reward: 15000, icon: '🥇' },
          { target: 25, reward: 50000, icon: '💎' },
          { target: 50, reward: 150000, icon: '👑' }
        ].map(m => `
          <div style="padding:18px; background:var(--bg-surface); border-radius:12px; margin-bottom:12px;">
            <div class="flex-between mb-10">
              <div><strong>${m.icon} ${m.target} إحالة</strong><div class="text-secondary" style="font-size:0.85rem;">الجائزة: ${m.reward.toLocaleString()}</div></div>
              <span class="badge-status ${user.referralCount >= m.target ? 'badge-success' : 'badge-warning'}">${user.referralCount >= m.target ? '✅' : `${user.referralCount}/${m.target}`}</span>
            </div>
            <div class="progress"><div class="progress-bar" style="width:${Math.min(100, (user.referralCount/m.target)*100)}%;"></div></div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  leaderboard() {
    return `
      <h1 class="page-title">🏅 المتصدرون</h1>
      <p class="page-subtitle">أفضل الرابحين هذا الشهر</p>
      <div class="card">
        ${MOCK.leaderboard.map((u, i) => `
          <div class="leaderboard-item">
            <div class="rank rank-${i+1}">${i+1}</div>
            <div class="avatar">${u.avatar}</div>
            <div class="leaderboard-info">
              <div class="leaderboard-name">${u.name}</div>
              <div class="leaderboard-stats">المستوى ${u.level} · ${u.country}</div>
            </div>
            <div class="leaderboard-amount">${(u.earned/1000).toFixed(0)}K 💰</div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  notifications() {
    const notifs = (DB.get('notifications') || []).slice().reverse();
    return `
      <h1 class="page-title">🔔 الإشعارات</h1>
      ${notifs.length > 0 ? `<button class="btn btn-secondary mb-20" onclick="Actions.markAllRead()">✅ تعليم الكل كمقروء</button>` : ''}
      ${notifs.length === 0 ? '<div class="card empty-state"><div class="empty-state-icon">🔔</div><div class="empty-state-title">لا توجد إشعارات</div></div>' : 
        notifs.map(n => `
          <div class="notification-item ${n.read ? '' : 'unread'}" onclick="Actions.markNotificationRead('${n.id}')">
            <div class="notification-icon">${n.icon}</div>
            <div class="notification-content">
              <div class="notification-title">${n.title}</div>
              <div class="notification-message">${n.message}</div>
              <div class="notification-time">${UI.formatTime(n.time)}</div>
            </div>
          </div>
        `).join('')
      }
    `;
  },
  
  profile() {
    const user = DB.get('user');
    const balance = Ledger.getBalance();
    const earned = Ledger.getLifetimeEarned();
    return `
      <h1 class="page-title">👤 الملف الشخصي</h1>
      <div class="card" style="text-align:center;">
        <div style="font-size:5rem; margin-bottom:16px;">${user.avatar}</div>
        <h2>${user.username}</h2>
        <p class="text-secondary">Lv ${user.level} · ${user.xp}/${user.level * 100} XP</p>
        <div class="progress mt-20" style="max-width:300px; margin:20px auto;"><div class="progress-bar" style="width:${(user.xp / (user.level * 100)) * 100}%;"></div></div>
      </div>
      <div class="card">
        <div class="card-title">📝 البيانات الشخصية</div>
        <div class="form-group"><label class="form-label">اسم المستخدم</label><input type="text" class="form-input" id="profileUsername" value="${user.username}"></div>
        <div class="form-group"><label class="form-label">البريد الإلكتروني</label><input type="email" class="form-input" id="profileEmail" value="${user.email || ''}"></div>
        <div class="form-group"><label class="form-label">رقم الهاتف</label><input type="tel" class="form-input" id="profilePhone" value="${user.phone || ''}"></div>
        <div class="form-group"><label class="form-label">الدولة</label>
          <select class="form-select" id="profileCountry">
            ${Object.entries(MOCK.countries).map(([k, v]) => `<option value="${k}" ${user.country === k ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-primary btn-block" onclick="Actions.saveProfile()">💾 حفظ</button>
      </div>
      <div class="stats-grid">
        <div class="stat-card gradient-primary"><div class="stat-icon">💰</div><div class="stat-value">${balance.toLocaleString()}</div><div class="stat-label">الرصيد</div></div>
        <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-value">${earned.toLocaleString()}</div><div class="stat-label">إجمالي الكسب</div></div>
        <div class="stat-card gradient-accent"><div class="stat-icon">🎯</div><div class="stat-value">${user.completedOffers}</div><div class="stat-label">عروض مكتملة</div></div>
      </div>
    `;
  },
  
  security() {
    const user = DB.get('user');
    return `
      <h1 class="page-title">🔒 الأمان</h1>
      <p class="page-subtitle">إعدادات حماية حسابك</p>
      <div class="card">
        <div class="card-title">📧 التحقق من البريد</div>
        <p class="text-secondary mb-20">${user.verified ? '✅ بريدك موثق' : '⚠️ الرجاء التحقق'}</p>
        <span class="badge-status ${user.verified ? 'badge-success' : 'badge-warning'}">${user.email || 'غير محدد'}</span>
        ${!user.verified ? `<button class="btn btn-primary btn-block mt-20" onclick="Actions.verifyEmail()">✅ تحقق (+500 عملة)</button>` : ''}
      </div>
      <div class="card">
        <div class="card-title">🔐 المصادقة الثنائية</div>
        <p class="text-secondary mb-20">أضف طبقة حماية إضافية</p>
        <span class="badge-status ${user.twoFA ? 'badge-success' : 'badge-warning'}">${user.twoFA ? '✅ مفعلة' : '❌ معطلة'}</span>
        ${!user.twoFA ? `<button class="btn btn-purple btn-block mt-20" onclick="Actions.enable2FA()">🔒 تفعيل (+1000 عملة)</button>` : ''}
      </div>
      <div class="card" style="background:rgba(255,51,102,0.05); border-color:rgba(255,51,102,0.3);">
        <div class="card-title">⚠️ منطقة الخطر</div>
        <p class="text-secondary mb-20">احذر! هذه الإجراءات لا يمكن التراجع عنها</p>
        <button class="btn btn-danger btn-block" onclick="Actions.resetAccount()">🗑️ حذف جميع البيانات</button>
      </div>
    `;
  },
  
  support() {
    return `
      <h1 class="page-title">💬 الدعم الفني</h1>
      <p class="page-subtitle">نحن هنا لمساعدتك</p>
      <div class="card">
        <div class="card-title">📧 إرسال تذكرة</div>
        <div class="form-group"><label class="form-label">الموضوع</label><input type="text" class="form-input" id="ticketSubject"></div>
        <div class="form-group"><label class="form-label">الرسالة</label><textarea class="form-textarea" id="ticketMessage" rows="6"></textarea></div>
        <button class="btn btn-primary btn-block" onclick="Actions.submitTicket()">📨 إرسال</button>
      </div>
      <div class="card">
        <div class="card-title">📞 طرق التواصل</div>
        <div class="flex gap-10" style="flex-wrap:wrap;">
          <div style="padding:16px; background:var(--bg-surface); border-radius:12px; flex:1; min-width:200px;"><strong>📧 البريد</strong><br><span class="text-secondary">support@rewardx.com</span></div>
          <div style="padding:16px; background:var(--bg-surface); border-radius:12px; flex:1; min-width:200px;"><strong>💬 Telegram</strong><br><span class="text-secondary">@RewardXSupport</span></div>
          <div style="padding:16px; background:var(--bg-surface); border-radius:12px; flex:1; min-width:200px;"><strong>🐦 Twitter</strong><br><span class="text-secondary">@RewardXOfficial</span></div>
        </div>
      </div>
    `;
  },
  
  faq() {
    const faqs = [
      { q: '💰 كيف أحصل على العملات؟', a: 'من خلال إكمال العروض، لعب الألعاب، الاستبيانات، الإعلانات، المهام، ودعوة الأصدقاء.' },
      { q: '💸 ما هو الحد الأدنى للسحب؟', a: `${DB.get('settings').minWithdraw.toLocaleString()} عملة ($${(DB.get('settings').minWithdraw/DB.get('settings').coinRate).toFixed(2)}).` },
      { q: '⏱️ كم يستغرق وصول العملات؟', a: 'معظم العروض تحسب فوراً. بعضها قد يستغرق 24-72 ساعة.' },
      { q: '🔒 هل بياناتي آمنة؟', a: 'نعم، نستخدم تشفير متقدم.' },
      { q: '🎯 لماذا لم أحصل على مكافأة عرض؟', a: 'تأكد من إكمال الشروط. تواصل مع الدعم إذا استمرت المشكلة.' },
      { q: '🤝 كيف يعمل برنامج الإحالة؟', a: 'تحصل على 10% من كل ما يكسبه أصدقاؤك مدى الحياة!' }
    ];
    return `
      <h1 class="page-title">❓ الأسئلة الشائعة</h1>
      ${faqs.map((f, i) => `
        <div class="card" style="cursor:pointer;" onclick="toggleFaq(${i})">
          <div class="flex-between">
            <h3 style="font-size:1rem;">${f.q}</h3>
            <span id="faqIcon_${i}" style="font-size:1.5rem; color:var(--primary); font-weight:700;">+</span>
          </div>
          <p class="text-secondary mt-20" id="faq_${i}" style="display:none;">${f.a}</p>
        </div>
      `).join('')}
    `;
  },
  
  terms() {
    return `
      <h1 class="page-title">📄 الشروط والأحكام</h1>
      <div class="card">
        <h3>1. قبول الشروط</h3><p class="text-secondary mt-10 mb-20">باستخدامك للمنصة، فإنك توافق على جميع الشروط.</p>
        <h3>2. الحساب</h3><p class="text-secondary mt-10 mb-20">يجب أن يكون عمرك 18+ سنة. حساب واحد لكل شخص.</p>
        <h3>3. العملات</h3><p class="text-secondary mt-10 mb-20">العملات الداخلية ليس لها قيمة نقدية مباشرة.</p>
        <h3>4. السحب</h3><p class="text-secondary mt-10 mb-20">الحد الأدنى ${DB.get('settings').minWithdraw.toLocaleString()} عملة.</p>
        <h3>5. الاحتيال</h3><p class="text-secondary mt-10">يحظر استخدام VPN أو حسابات متعددة.</p>
      </div>
    `;
  },
  
  privacy() {
    return `
      <h1 class="page-title">🛡️ سياسة الخصوصية</h1>
      <div class="card">
        <h3>1. البيانات التي نجمعها</h3><p class="text-secondary mt-10 mb-20">البريد، اسم المستخدم، الدولة، بيانات الجهاز.</p>
        <h3>2. الاستخدام</h3><p class="text-secondary mt-10 mb-20">لتقديم الخدمة والحماية من الاحتيال.</p>
        <h3>3. المشاركة</h3><p class="text-secondary mt-10 mb-20">لا نبيع بياناتك.</p>
        <h3>4. الأمان</h3><p class="text-secondary mt-10">نستخدم تشفير SSL.</p>
      </div>
    `;
  },
  
  status() {
    const fraudScore = Fraud.getRiskScore();
    return `
      <h1 class="page-title">📊 حالة النظام</h1>
      <div class="card" style="background:linear-gradient(135deg, rgba(0,255,136,0.05), rgba(139,92,246,0.05));">
        <div class="card-title">🛡️ Anti-Fraud Status</div>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-value" style="color:${fraudScore < 30 ? 'var(--success)' : 'var(--warning)'};">${fraudScore}</div><div class="stat-label">Risk Score</div></div>
          <div class="stat-card gradient-primary"><div class="stat-icon">✅</div><div class="stat-value">نظيف</div><div class="stat-label">حالة الحساب</div></div>
          <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-value">0</div><div class="stat-label">انتهاكات</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🔍 فحوصات النظام</div>
        ${[
          { name: 'IP Address', icon: '🌐' }, { name: 'Device Fingerprint', icon: '📱' },
          { name: 'VPN Detection', icon: '🚫' }, { name: 'Emulator Detection', icon: '🖥️' },
          { name: 'Duplicate Accounts', icon: '👥' }, { name: 'Velocity Limits', icon: '⚡' }
        ].map(check => `
          <div style="padding:14px; background:var(--bg-surface); border-radius:12px; margin-bottom:8px;">
            <div class="flex-between"><div>${check.icon} <strong>${check.name}</strong></div><span class="badge-status badge-success">✅ طبيعي</span></div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  admin() {
    if (sessionStorage.getItem('adminAuth') !== 'true') {
      return `
        <h1 class="page-title">⚙️ لوحة الأدمن</h1>
        <div class="card" style="max-width:400px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:24px;"><div style="font-size:4rem;">🔐</div><h2>دخول الأدمن</h2></div>
          <div class="form-group"><label class="form-label">كلمة السر</label><input type="password" class="form-input" id="adminPassword"></div>
          <button class="btn btn-primary btn-block" onclick="Actions.adminLogin()">🔓 دخول</button>
          <p class="text-muted text-center mt-20" style="font-size:0.85rem;">admin123</p>
        </div>
      `;
    }
    const user = DB.get('user');
    const withdrawals = DB.get('withdrawals') || [];
    const orders = DB.get('orders') || [];
    const fraudEvents = DB.get('fraudEvents') || [];
    const adminLog = DB.get('adminLog') || [];
    return `
      <h1 class="page-title">⚙️ لوحة الأدمن</h1>
      <button class="btn btn-secondary mb-20" onclick="Actions.adminLogout()">🚪 تسجيل الخروج</button>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">1</div><div class="stat-label">المستخدمين</div></div>
        <div class="stat-card gradient-primary"><div class="stat-icon">💰</div><div class="stat-value">$${(Ledger.getLifetimeEarned() * 1.5 / DB.get('settings').coinRate).toFixed(2)}</div><div class="stat-label">الإيرادات</div></div>
        <div class="stat-card"><div class="stat-icon">💸</div><div class="stat-value">$${(Ledger.getLifetimeEarned() / DB.get('settings').coinRate).toFixed(2)}</div><div class="stat-label">التكاليف</div></div>
        <div class="stat-card gradient-accent"><div class="stat-icon">📈</div><div class="stat-value">$${(Ledger.getLifetimeEarned() * 0.5 / DB.get('settings').coinRate).toFixed(2)}</div><div class="stat-label">الربح</div></div>
      </div>
      <div class="card">
        <div class="card-title">💰 تعديل الرصيد</div>
        <div class="flex gap-10" style="flex-wrap:wrap;">
          <input type="number" class="form-input" id="adminCoinsAmount" placeholder="المبلغ" style="flex:1; min-width:150px;">
          <input type="text" class="form-input" id="adminCoinsReason" placeholder="السبب" style="flex:2; min-width:200px;">
          <button class="btn btn-primary" onclick="Actions.adminAdjustCoins('${user.id}', document.getElementById('adminCoinsAmount').value, document.getElementById('adminCoinsReason').value || 'admin')">تعديل</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">💸 طلبات السحب (${withdrawals.filter(w => w.status === 'pending').length} معلقة)</div>
        ${withdrawals.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">💸</div><div class="empty-state-title">لا توجد طلبات</div></div>' : `
          <div class="table-container">
            <table>
              <thead><tr><th>ID</th><th>المبلغ</th><th>الطريقة</th><th>الحالة</th><th>إجراء</th></tr></thead>
              <tbody>
                ${withdrawals.map(w => `
                  <tr>
                    <td>${w.id.substr(-8)}</td>
                    <td>$${w.usdValue}</td>
                    <td>${w.method}</td>
                    <td><span class="badge-status ${w.status === 'completed' ? 'badge-success' : w.status === 'pending' ? 'badge-warning' : 'badge-danger'}">${w.status}</span></td>
                    <td>
                      ${w.status === 'pending' ? `
                        <button class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="Actions.adminApproveWithdrawal('${w.id}')">✅</button>
                        <button class="btn btn-danger" style="padding:6px 12px; font-size:0.8rem;" onclick="Actions.adminRejectWithdrawal('${w.id}')">❌</button>
                      ` : '-'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
      <div class="card">
        <div class="card-title">📦 الطلبات (${orders.length})</div>
        ${orders.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📦</div><div class="empty-state-title">لا توجد طلبات</div></div>' : `
          <div class="table-container">
            <table>
              <thead><tr><th>ID</th><th>النوع</th><th>التفاصيل</th><th>المبلغ</th><th>الحالة</th></tr></thead>
              <tbody>
                ${orders.slice().reverse().slice(0, 10).map(o => `
                  <tr>
                    <td>${o.id.substr(-8)}</td>
                    <td>${o.type}</td>
                    <td>${o.type === 'reward' ? o.rewardName : `${o.gameName} - ${o.package}`}</td>
                    <td>$${o.usd}</td>
                    <td><span class="badge-status badge-info">${o.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
      <div class="card">
        <div class="card-title">🛡️ Fraud Events (${fraudEvents.length})</div>
        ${fraudEvents.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">🛡️</div><div class="empty-state-title">لا توجد أحداث</div></div>' : `
          <div class="table-container">
            <table>
              <thead><tr><th>الوقت</th><th>النوع</th></tr></thead>
              <tbody>
                ${fraudEvents.slice().reverse().slice(0, 10).map(e => `<tr><td>${UI.formatTime(e.timestamp)}</td><td>${e.event}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
      <div class="card">
        <div class="card-title">📜 Admin Log (${adminLog.length})</div>
        ${adminLog.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📜</div><div class="empty-state-title">لا توجد إجراءات</div></div>' : `
          <div class="table-container">
            <table>
              <thead><tr><th>الوقت</th><th>الإجراء</th></tr></thead>
              <tbody>
                ${adminLog.slice().reverse().slice(0, 10).map(l => `<tr><td>${UI.formatTime(l.timestamp)}</td><td>${l.action}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
      <div class="card" style="background:rgba(255,51,102,0.05); border-color:rgba(255,51,102,0.3);">
        <div class="card-title">⚠️ أدوات النظام</div>
        <div class="flex gap-10" style="flex-wrap:wrap;">
          <button class="btn btn-danger" onclick="if(confirm('حذف جميع البيانات؟'))Actions.resetAccount()">🗑️ Reset All</button>
          <button class="btn btn-accent" onclick="exportData()">📤 Export</button>
        </div>
      </div>
    `;
  }
};

// ===== ROUTER =====
const Router = {
  current: 'home',
  init() {
    window.addEventListener('hashchange', () => this.render());
    document.querySelectorAll('.menu-item').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(link.dataset.route);
      });
    });
    this.render();
  },
  render() {
    const hash = window.location.hash.slice(1) || 'home';
    this.current = hash;
    document.querySelectorAll('.menu-item').forEach(link => {
      link.classList.toggle('active', link.dataset.route === hash);
    });
    const main = document.getElementById('main');
    const view = Views[hash];
    if (main && view) {
      main.innerHTML = typeof view === 'function' ? view() : view;
    } else if (main) {
      main.innerHTML = Views.home();
    }
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    UI.updateSidebarUser();
  }
};

function navigate(route) { window.location.hash = route; }
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(particle);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  DB.init();
  initParticles();
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  if (ref) {
    const user = DB.get('user');
    if (!user.referredBy && ref !== user.referralCode) {
      user.referredBy = ref;
      DB.set('user', user);
      Ledger.add('referral_signup', 500, `انضم عبر الإحالة: ${ref}`, 'ref_' + ref);
      UI.toast('🎉 مرحباً! +500 عملة من الإحالة');
    }
  }
  UI.updateBalance();
  UI.updateNotifications();
  UI.updateSidebarUser();
  Router.init();
  setTimeout(() => UI.toast('👋 مرحباً بك في RewardX!'), 500);
});

document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.querySelector('.menu-toggle');
  if (window.innerWidth <= 768 && sidebar && menuToggle &&
      !sidebar.contains(e.target) && !menuToggle.contains(e.target) &&
      sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});
