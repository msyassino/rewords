// ============================================================
// REWARDX - PREMIUM APP LOGIC
// ============================================================

// ===== DATABASE SYSTEM =====
const DB = {
  prefix: 'rewardx_v2_',
  
  init() {
    if (!this.get('initialized')) {
      this.set('initialized', true);
      this.set('user', {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        username: 'Player' + Math.floor(Math.random() * 9999),
        email: '',
        phone: '',
        country: 'SA',
        avatar: '👤',
        level: 1,
        xp: 0,
        streak: 0,
        maxStreak: 0,
        lastDailyClaim: null,
        lastWheelSpin: null,
        joined: new Date().toISOString(),
        status: 'pending',
        referralCode: this.generateReferralCode(),
        referredBy: null,
        referralEarnings: 0,
        referralCount: 0,
        completedOffers: 0,
        completedSurveys: 0,
        completedGames: 0,
        totalWithdrawn: 0,
        devices: [this.fingerprint()],
        ips: [],
        verified: false,
        twoFA: false
      });
      this.set('ledger', []);
      this.set('orders', []);
      this.set('withdrawals', []);
      this.set('notifications', [
        { id: 'n1', type: 'welcome', title: 'مرحباً بك في RewardX!', message: 'ابدأ رحلتك في كسب العملات الآن واحصل على 1000 عملة مجانية', time: Date.now(), read: false, icon: '🎉' },
        { id: 'n2', type: 'bonus', title: 'مكافأة ترحيبية', message: 'احصل على 500 عملة إضافية عند إكمال أول عرض', time: Date.now() - 60000, read: false, icon: '🎁' }
      ]);
      this.set('completedOffers', []);
      this.set('tasksProgress', {});
      this.set('challengesProgress', {});
      this.set('fraudEvents', []);
      this.set('adminLog', []);
      this.set('settings', {
        coinRate: 10000,
        minWithdraw: 50000,
        withdrawalFee: 0.02,
        referralBonus: 0.10,
        dailyRewards: [100, 200, 300, 500, 750, 1000, 2000],
        wheelPrizes: [50, 100, 200, 500, 1000, 2000, 5000, 100]
      });
      
      Ledger.add('welcome_bonus', 1000, 'مكافأة الترحيب', 'welcome', 'completed');
    }
  },
  
  generateReferralCode() {
    return 'RX' + Math.random().toString(36).substr(2, 8).toUpperCase();
  },
  
  fingerprint() {
    const nav = navigator;
    const screen = window.screen;
    return {
      ua: nav.userAgent.substr(0, 100),
      lang: nav.language,
      platform: nav.platform,
      screenWidth: screen.width,
      screenHeight: screen.height,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: Date.now()
    };
  },
  
  get(key) {
    try {
      const v = localStorage.getItem(this.prefix + key);
      return v ? JSON.parse(v) : null;
    } catch { return null; }
  },
  
  set(key, value) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  },
  
  push(key, item) {
    const arr = this.get(key) || [];
    arr.push(item);
    this.set(key, arr);
  },
  
  update(key, updater) {
    const v = this.get(key);
    this.set(key, updater(v));
  }
};

// ===== LEDGER SYSTEM =====
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
  
  getHistory() {
    return (DB.get('ledger') || []).slice().reverse();
  }
};

// ===== ANTI-FRAUD =====
const Fraud = {
  lastAction: null,
  actionCount: 0,
  
  check(type) {
    const now = Date.now();
    if (this.lastAction && now - this.lastAction < 1000) {
      this.actionCount++;
      if (this.actionCount > 10) {
        this.log('velocity_limit', { type, count: this.actionCount });
        return { blocked: true, reason: 'سرعة مفرطة في الإجراءات' };
      }
    } else {
      this.actionCount = 1;
    }
    this.lastAction = now;
    return { blocked: false };
  },
  
  log(event, data) {
    DB.push('fraudEvents', {
      id: 'fraud_' + Date.now(),
      event, data,
      timestamp: Date.now(),
      userId: DB.get('user').id
    });
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
    { id: 'o1', name: 'تحميل Clash of Clans', provider: 'Lootably', icon: '🏰', category: 'game', reward: 5000, time: '15 min', difficulty: 'سهل', country: 'ALL', device: 'mobile', desc: 'ثبت اللعبة والعب حتى المستوى 5', revenue: 7.50, featured: true, completions: 1247 },
    { id: 'o2', name: 'استبيان التسوق', provider: 'AdGate', icon: '📊', category: 'survey', reward: 1500, time: '8 min', difficulty: 'سهل', country: 'SA', device: 'all', desc: 'أكمل استبيان حول عادات التسوق', revenue: 2.25, featured: false, completions: 856 },
    { id: 'o3', name: 'تثبيت Uber', provider: 'Offertoro', icon: '🚗', category: 'app', reward: 3000, time: '10 min', difficulty: 'متوسط', country: 'ALL', device: 'mobile', desc: 'ثبت التطبيق وأنشئ حساب جديد', revenue: 4.50, featured: true, completions: 632 },
    { id: 'o4', name: 'تجربة Disney+', provider: 'Lootably', icon: '🎬', category: 'trial', reward: 8000, time: '20 min', difficulty: 'صعب', country: 'US', device: 'all', desc: 'اشترك في تجربة مجانية لمدة 7 أيام', revenue: 12.00, featured: false, completions: 341 },
    { id: 'o5', name: 'تحميل TikTok', provider: 'AdGate', icon: '📱', category: 'app', reward: 2000, time: '5 min', difficulty: 'سهل', country: 'ALL', device: 'mobile', desc: 'ثبت التطبيق وشاهد 3 فيديوهات', revenue: 3.00, featured: true, completions: 2105 },
    { id: 'o6', name: 'استبيان الصحة', provider: 'Offertoro', icon: '🏥', category: 'survey', reward: 2500, time: '12 min', difficulty: 'متوسط', country: 'SA', device: 'all', desc: 'استبيان طبي عن نمط الحياة', revenue: 3.75, featured: false, completions: 489 }
  ],
  
  games: [
    { id: 'g1', name: 'PUBG Mobile', icon: '🔫', platform: 'Mobile', country: 'ALL', installReward: 100, totalReward: 10600, milestones: [{name: 'تثبيت', reward: 100}, {name: 'المستوى 5', reward: 500}, {name: 'المستوى 10', reward: 2000}, {name: 'المستوى 20', reward: 8000}], deadline: 30, players: 5234 },
    { id: 'g2', name: 'Free Fire', icon: '🔥', platform: 'Mobile', country: 'ALL', installReward: 150, totalReward: 12500, milestones: [{name: 'تثبيت', reward: 150}, {name: 'المستوى 10', reward: 1000}, {name: 'المستوى 25', reward: 4000}, {name: 'المستوى 40', reward: 7350}], deadline: 30, players: 4821 },
    { id: 'g3', name: 'Roblox', icon: '🎲', platform: 'All', country: 'ALL', installReward: 200, totalReward: 15000, milestones: [{name: 'تثبيت', reward: 200}, {name: '10 ساعات لعب', reward: 2000}, {name: '30 ساعة لعب', reward: 5000}, {name: '60 ساعة لعب', reward: 7800}], deadline: 45, players: 8932 },
    { id: 'g4', name: 'Clash Royale', icon: '👑', platform: 'Mobile', country: 'ALL', installReward: 100, totalReward: 8000, milestones: [{name: 'تثبيت', reward: 100}, {name: 'Arena 5', reward: 1000}, {name: 'Arena 10', reward: 3000}, {name: 'Arena 15', reward: 3900}], deadline: 30, players: 3421 },
    { id: 'g5', name: 'Mobile Legends', icon: '⚔️', platform: 'Mobile', country: 'ALL', installReward: 120, totalReward: 9500, milestones: [{name: 'تثبيت', reward: 120}, {name: 'المستوى 10', reward: 800}, {name: 'Rank Warrior', reward: 3000}, {name: 'Rank Epic', reward: 5580}], deadline: 30, players: 2987 },
    { id: 'g6', name: 'FC Mobile', icon: '⚽', platform: 'Mobile', country: 'ALL', installReward: 150, totalReward: 11000, milestones: [{name: 'تثبيت', reward: 150}, {name: 'OVR 80', reward: 1500}, {name: 'OVR 90', reward: 4000}, {name: 'OVR 100', reward: 5350}], deadline: 30, players: 4156 }
  ],
  
  surveys: [
    { id: 's1', name: 'استبيان العملاء', provider: 'Pollfish', icon: '📝', reward: 500, time: '5 min', completions: 2341 },
    { id: 's2', name: 'دراسة السوق', provider: 'AdGate', icon: '📈', reward: 1200, time: '10 min', completions: 1823 },
    { id: 's3', name: 'استبيان المنتجات', provider: 'Offertoro', icon: '🛍️', reward: 800, time: '7 min', completions: 1542 },
    { id: 's4', name: 'رأي المستخدمين', provider: 'Pollfish', icon: '💭', reward: 1500, time: '12 min', completions: 987 }
  ],
  
  tasks: [
    { id: 't1', name: 'تابعنا على Twitter', icon: '🐦', reward: 200, action: 'twitter', completed: false },
    { id: 't2', name: 'اشترك في Telegram', icon: '📨', reward: 300, action: 'telegram', completed: false },
    { id: 't3', name: 'انضم لمجموعة Discord', icon: '💬', reward: 250, action: 'discord', completed: false },
    { id: 't4', name: 'تابعنا على Instagram', icon: '📷', reward: 200, action: 'instagram', completed: false },
    { id: 't5', name: 'اكتب مراجعة 5 نجوم', icon: '⭐', reward: 500, action: 'review', completed: false },
    { id: 't6', name: 'شاهد فيديو تعريفي', icon: '🎬', reward: 150, action: 'video', completed: false }
  ],
  
  challenges: [
    { id: 'c1', name: 'أكمل 3 عروض اليوم', icon: '🎯', reward: 1000, progress: 0, target: 3, period: 'daily' },
    { id: 'c2', name: 'احصل على Streak 7 أيام', icon: '🔥', reward: 2000, progress: 0, target: 7, period: 'weekly' },
    { id: 'c3', name: 'أكمل 10 استبيانات', icon: '📊', reward: 3000, progress: 0, target: 10, period: 'monthly' },
    { id: 'c4', name: 'ادعُ 5 أصدقاء', icon: '👥', reward: 5000, progress: 0, target: 5, period: 'monthly' },
    { id: 'c5', name: 'اربح 50,000 عملة', icon: '💰', reward: 2500, progress: 0, target: 50000, period: 'weekly' }
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
    modal.innerHTML = `
      <div class="modal-title">${title}</div>
      <div class="modal-body">${content}</div>
      ${actions.length ? `<div class="modal-actions">${actions.map(a => `<button class="btn ${a.class || 'btn-primary'}" onclick="${a.onclick}">${a.text}</button>`).join('')}</div>` : ''}
    `;
    document.getElementById('modalOverlay').classList.add('active');
  },
  
  closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
  },
  
  updateBalance() {
    const balance = Ledger.getBalance();
    document.getElementById('navBalance').textContent = balance.toLocaleString();
    const mainBalance = document.getElementById('mainBalance');
    if (mainBalance) mainBalance.textContent = balance.toLocaleString();
  },
  
  updateSidebarUser() {
    const user = DB.get('user');
    if (!user) return;
    const sidebarName = document.getElementById('sidebarUserName');
    const sidebarLevel = document.getElementById('sidebarUserLevel');
    const sidebarXp = document.getElementById('sidebarUserXp');
    const sidebarXpMax = document.getElementById('sidebarUserXpMax');
    const sidebarXpFill = document.getElementById('sidebarXpFill');
    
    if (sidebarName) sidebarName.textContent = user.username;
    if (sidebarLevel) sidebarLevel.textContent = user.level;
    if (sidebarXp) sidebarXp.textContent = user.xp;
    const maxXp = user.level * 100;
    if (sidebarXpMax) sidebarXpMax.textContent = maxXp;
    if (sidebarXpFill) sidebarXpFill.style.width = `${(user.xp / maxXp) * 100}%`;
  },
  
  updateNotifications() {
    const notifs = DB.get('notifications') || [];
    const unread = notifs.filter(n => !n.read).length;
    const badge = document.getElementById('notifBadge');
    if (unread > 0) {
      badge.textContent = unread > 99 ? '99+' : unread;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  },
  
  addNotification(title, message, icon = '🔔', type = 'info') {
    const notif = {
      id: 'n_' + Date.now(),
      type, title, message, icon,
      time: Date.now(),
      read: false
    };
    DB.push('notifications', notif);
    this.updateNotifications();
  },
  
  formatTime(ts) {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'الآن';
    if (diff < 3600000) return `منذ ${Math.floor(diff / 60000)} د`;
    if (diff < 86400000) return `منذ ${Math.floor(diff / 3600000)} س`;
    return new Date(ts).toLocaleDateString('ar-SA');
  },
  
  animateCounter(element, target, duration = 1000) {
    if (!element) return;
    const start = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
    const range = target - start;
    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + range * eased);
      element.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    
    requestAnimationFrame(update);
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
    if (lastClaim === yesterday.toDateString()) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
    
    user.maxStreak = Math.max(user.maxStreak, user.streak);
    const reward = settings.dailyRewards[Math.min(user.streak - 1, settings.dailyRewards.length - 1)];
    
    Ledger.add('daily_claim', reward, `المكافأة اليومية - اليوم ${user.streak}`, 'daily_' + Date.now());
    
    user.lastDailyClaim = new Date().toISOString();
    user.xp += 10;
    this.checkLevelUp(user);
    DB.set('user', user);
    
    UI.toast(`🎉 حصلت على ${reward} عملة! Streak: ${user.streak} أيام`);
    UI.addNotification('مكافأة يومية', `حصلت على ${reward} عملة - Streak ${user.streak} أيام`, '🎁', 'reward');
    UI.updateSidebarUser();
    Router.render();
  },
  
  startOffer(id) {
    const fraudCheck = Fraud.check('offer_start');
    if (fraudCheck.blocked) { UI.toast(fraudCheck.reason, 'error'); return; }
    
    const offer = MOCK.offers.find(o => o.id === id) || MOCK.games.find(g => g.id === id) || MOCK.surveys.find(s => s.id === id);
    if (!offer) return;
    
    const completed = DB.get('completedOffers') || [];
    if (completed.find(c => c.id === id)) {
      UI.toast('لقد أكملت هذا العرض من قبل', 'warning');
      return;
    }
    
    UI.modal(
      `بدء: ${offer.name}`,
      `
        <div class="text-center mb-20">
          <div style="font-size: 4rem; margin-bottom:12px;">${offer.icon}</div>
          <h3 style="margin-bottom:8px;">${offer.name}</h3>
          <p class="text-secondary">${offer.desc || 'أكمل المهمة لتحصل على المكافأة'}</p>
          <div class="flex gap-10" style="justify-content:center; margin:20px 0; flex-wrap:wrap;">
            <span class="badge-status badge-info">⏱️ ${offer.time || '10 min'}</span>
            <span class="badge-status badge-success">💰 ${offer.reward.toLocaleString()} عملة</span>
            ${offer.difficulty ? `<span class="badge-status badge-warning">📊 ${offer.difficulty}</span>` : ''}
          </div>
          <div style="padding:16px; background:var(--bg-elevated); border-radius:12px; text-align:right;">
            <strong>📋 الشروط:</strong>
            <ul style="margin-top:8px; padding-right:20px; color:var(--text-secondary); font-size:0.9rem;">
              <li>سيتم توجيهك لموقع الشريك</li>
              <li>أكمل المهمة المطلوبة بالكامل</li>
              <li>المكافأة تصل خلال دقائق من التأكيد</li>
            </ul>
          </div>
        </div>
      `,
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
    const lastSpin = user.lastWheelSpin;
    
    if (lastSpin && now - lastSpin < 86400000) {
      const hours = Math.ceil((86400000 - (now - lastSpin)) / 3600000);
      UI.toast(`يمكنك التدوير بعد ${hours} ساعات`, 'warning');
      return;
    }
    
    const settings = DB.get('settings');
    const prizes = settings.wheelPrizes;
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    const rotation = 1800 + Math.random() * 360;
    
    const wheel = document.getElementById('spinWheel');
    if (wheel) wheel.style.transform = `rotate(${rotation}deg)`;
    
    setTimeout(() => {
      Ledger.add('wheel_prize', prize, `جائزة عجلة الحظ`, 'wheel_' + Date.now());
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
    
    if (amount < settings.minWithdraw) {
      UI.toast(`الحد الأدنى ${settings.minWithdraw.toLocaleString()} عملة`, 'error');
      return;
    }
    if (amount > balance) {
      UI.toast('الرصيد غير كافٍ', 'error');
      return;
    }
    
    const fee = Math.floor(amount * settings.withdrawalFee);
    const netAmount = amount - fee;
    const usdValue = (netAmount / settings.coinRate).toFixed(2);
    
    const withdrawal = {
      id: 'w_' + Date.now(),
      amount, fee, netAmount, usdValue, method,
      status: 'pending',
      timestamp: Date.now(),
      userId: DB.get('user').id
    };
    
    DB.push('withdrawals', withdrawal);
    Ledger.add('withdrawal_pending', -amount, `طلب سحب - ${method}`, withdrawal.id, 'pending');
    
    const user = DB.get('user');
    user.xp += 20;
    this.checkLevelUp(user);
    DB.set('user', user);
    
    UI.toast(`✅ تم إرسال طلب السحب ($${usdValue}) - قيد المراجعة`);
    UI.addNotification('طلب سحب', `طلب سحب $${usdValue} عبر ${method}`, '💸', 'withdrawal');
    UI.closeModal();
    UI.updateSidebarUser();
    Router.render();
  },
  
  purchaseReward(id) {
    const reward = MOCK.rewards.find(r => r.id === id);
    if (!reward) return;
    
    const balance = Ledger.getAvailable();
    if (balance < reward.coins) {
      UI.toast('الرصيد غير كافٍ', 'error');
      return;
    }
    
    UI.modal(
      'تأكيد الشراء',
      `
        <div class="text-center">
          <div style="font-size: 4rem; margin-bottom:12px;">${reward.icon}</div>
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
        </div>
      `,
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
    
    if (balance < pkg.coins) {
      UI.toast('الرصيد غير كافٍ', 'error');
      return;
    }
    
    UI.modal(
      `شحن ${game.name} - ${pkg.name}`,
      `
        <div class="text-center mb-20">
          <div style="font-size: 4rem;">${game.icon}</div>
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
        </div>
      `,
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
    UI.addNotification('مهمة مكتملة', `أكملت "${task.name}" وربحت ${task.reward} عملة`, '✅', 'reward');
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
      UI.addNotification('ترقية مستوى', `وصلت للمستوى ${user.level}`,