// ============================================================
// FIREBASE INITIALIZATION
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyBPMbRdVEJ85Is7eg4UkAFs_UHq-BD_Fhg",
  authDomain: "rewords-45ccf.firebaseapp.com",
  projectId: "rewords-45ccf",
  storageBucket: "rewords-45ccf.firebasestorage.app",
  messagingSenderId: "324257034049",
  appId: "1:324257034049:web:2e75279382793007683bc0",
  measurementId: "G-5LNDESBVST"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true }).catch(err => {
  console.warn('Persistence failed:', err.code);
});

// ============================================================
// GLOBAL STATE
// ============================================================
let currentUser = null;
let userData = null;
let siteSettings = {
  maintenanceMode: false,
  maintenanceMessage: 'الموقع تحت الصيانة',
  maintenanceEndTime: null,
  coinRate: 10000,
  minWithdraw: 50000,
  withdrawalFee: 0.02,
  referralBonus: 0.10,
  dailyRewards: [100, 200, 300, 500, 750, 1000, 2000],
  wheelPrizes: [50, 100, 200, 500, 1000, 2000, 5000, 100]
};
let isAdmin = false;
const ADMIN_EMAILS = ['kenven@admin.com']; // ⚠️ غيّر هذا لبريدك الحقيقي

const SMARTLINK = 'https://www.effectivecpmnetwork.com/db1td3bh3?key=b70551631cd4adc5ea612c47d2673a8c';

// ============================================================
// MOCK DATA
// ============================================================
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
    { id: 'g4', name: 'Clash Royale', icon: '👑', platform: 'Mobile', totalReward: 8000, milestones: [{name: 'تثبيت', reward: 100}, {name: 'Arena 5', reward: 1000}, {name: 'Arena 10', reward: 3000}, {name: 'Arena 15', reward: 3900}], deadline: 30, players: 3421 }
  ],
  surveys: [
    { id: 's1', name: 'استبيان العملاء', provider: 'Pollfish', icon: '📝', reward: 500, time: '5 min', completions: 2341 },
    { id: 's2', name: 'دراسة السوق', provider: 'AdGate', icon: '📈', reward: 1200, time: '10 min', completions: 1823 },
    { id: 's3', name: 'استبيان المنتجات', provider: 'Offertoro', icon: '🛍️', reward: 800, time: '7 min', completions: 1542 }
  ],
  tasks: [
    { id: 't1', name: 'تابعنا على Twitter', icon: '🐦', reward: 200 },
    { id: 't2', name: 'اشترك في Telegram', icon: '📨', reward: 300 },
    { id: 't3', name: 'انضم لـ Discord', icon: '💬', reward: 250 },
    { id: 't4', name: 'تابعنا على Instagram', icon: '📷', reward: 200 },
    { id: 't5', name: 'اكتب مراجعة 5 نجوم', icon: '⭐', reward: 500 }
  ],
  rewards: [
    { id: 'r1', name: 'Google Play $5', icon: '🎮', category: 'giftcard', coins: 50000, usd: 5, stock: 100, available: true },
    { id: 'r2', name: 'Google Play $10', icon: '🎮', category: 'giftcard', coins: 100000, usd: 10, stock: 80, available: true },
    { id: 'r3', name: 'Apple Gift $10', icon: '🍎', category: 'giftcard', coins: 100000, usd: 10, stock: 50, available: true },
    { id: 'r4', name: 'Steam $10', icon: '🎯', category: 'giftcard', coins: 100000, usd: 10, stock: 60, available: true },
    { id: 'r5', name: 'PlayStation $10', icon: '🎮', category: 'giftcard', coins: 100000, usd: 10, stock: 45, available: true },
    { id: 'r6', name: 'PUBG 60 UC', icon: '🔫', category: 'game', coins: 10000, usd: 1, stock: 300, available: true },
    { id: 'r7', name: 'Free Fire 100 Diamonds', icon: '🔥', category: 'game', coins: 10000, usd: 1, stock: 350, available: true },
    { id: 'r8', name: 'PayPal $10', icon: '💳', category: 'cash', coins: 100000, usd: 10, stock: 30, available: true },
    { id: 'r9', name: 'USDT $10', icon: '₿', category: 'crypto', coins: 100000, usd: 10, stock: 100, available: true }
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
    { name: 'KingHunter', avatar: '👑', country: 'KW', earned: 980000, level: 51 }
  ],
  countries: {
    'SA': 'السعودية', 'AE': 'الإمارات', 'EG': 'مصر', 'KW': 'الكويت',
    'QA': 'قطر', 'BH': 'البحرين', 'OM': 'عُمان', 'JO': 'الأردن',
    'US': 'أمريكا', 'UK': 'بريطانيا', 'OTHER': 'أخرى'
  }
};

// ============================================================
// AUTH HANDLERS
// ============================================================
function switchLoginTab(tab) {
  document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const referralCode = document.getElementById('regReferral').value;
  
  try {
    UI.toast('⏳ جاري إنشاء الحساب...');
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    
    const newUserData = {
      uid: cred.user.uid,
      username,
      email,
      country: 'SA',
      avatar: '👤',
      level: 1, xp: 0,
      streak: 0, maxStreak: 0,
      lastDailyClaim: null, lastWheelSpin: null,
      joined: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      referralCode: 'RX' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      referredBy: referralCode || null,
      referralEarnings: 0, referralCount: 0,
      completedOffers: 0,
      totalWithdrawn: 0,
      verified: false, twoFA: false,
      isAdmin: ADMIN_EMAILS.includes(email),
      riskScore: 0,
      balance: 1000, pendingCoins: 0, lockedCoins: 0,
      lifetimeEarned: 1000, lifetimeSpent: 0
    };
    
    await db.collection('users').doc(cred.user.uid).set(newUserData);
    await addLedgerEntry(cred.user.uid, 'welcome_bonus', 1000, 'مكافأة الترحيب');
    
    if (referralCode) await processReferral(cred.user.uid, referralCode);
    
    UI.toast('✅ تم إنشاء الحساب! +1000 عملة');
  } catch (err) {
    UI.toast('❌ ' + getAuthError(err.code), 'error');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    UI.toast('⏳ جاري تسجيل الدخول...');
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    UI.toast('❌ ' + getAuthError(err.code), 'error');
  }
}

function getAuthError(code) {
  const errors = {
    'auth/user-not-found': 'البريد غير مسجل',
    'auth/wrong-password': 'كلمة المرور خاطئة',
    'auth/email-already-in-use': 'البريد مستخدم بالفعل',
    'auth/weak-password': 'كلمة المرور ضعيفة (6 أحرف على الأقل)',
    'auth/invalid-email': 'بريد إلكتروني غير صالح',
    'auth/too-many-requests': 'محاولات كثيرة، حاول لاحقاً'
  };
  return errors[code] || 'خطأ في المصادقة';
}

function logout() {
  auth.signOut();
  location.reload();
}

// ============================================================
// MAINTENANCE MODE
// ============================================================
function checkMaintenanceMode() {
  db.collection('settings').doc('site').onSnapshot(doc => {
    if (doc.exists) {
      const data = doc.data();
      siteSettings = { ...siteSettings, ...data };
      
      if (data.maintenanceMode && !isAdmin) {
        showMaintenancePage(data);
      } else {
        document.getElementById('maintenanceOverlay').style.display = 'none';
      }
    }
  });
}

function showMaintenancePage(data) {
  document.getElementById('maintenanceOverlay').style.display = 'flex';
  if (data.maintenanceEndTime) updateMaintenanceTimer(data.maintenanceEndTime.toDate());
}

function updateMaintenanceTimer(endTime) {
  const timer = document.getElementById('maintenanceTimer');
  const bar = document.getElementById('maintenanceBar');
  
  const interval = setInterval(() => {
    const now = new Date();
    const diff = endTime - now;
    if (diff <= 0) { clearInterval(interval); location.reload(); return; }
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (timer) timer.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    if (bar) bar.style.width = '50%';
  }, 1000);
}

// ============================================================
// FIRESTORE OPERATIONS
// ============================================================
async function loadUserData() {
  if (!currentUser) return;
  const doc = await db.collection('users').doc(currentUser.uid).get();
  if (doc.exists) {
    userData = doc.data();
    isAdmin = userData.isAdmin || ADMIN_EMAILS.includes(userData.email);
    UI.updateBalance();
    UI.updateSidebarUser();
  }
}

function subscribeToUserData() {
  if (!currentUser) return;
  db.collection('users').doc(currentUser.uid).onSnapshot(doc => {
    if (doc.exists) {
      userData = doc.data();
      UI.updateBalance();
      UI.updateSidebarUser();
    }
  });
}

async function addLedgerEntry(userId, type, amount, description, reference = null, status = 'completed') {
  const tx = {
    userId, type, amount, description, reference, status,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    balanceBefore: userData?.balance || 0,
    balanceAfter: (userData?.balance || 0) + amount
  };
  
  await db.collection('ledger').add(tx);
  
  const updates = { balance: firebase.firestore.FieldValue.increment(amount) };
  if (amount > 0) updates.lifetimeEarned = firebase.firestore.FieldValue.increment(amount);
  else updates.lifetimeSpent = firebase.firestore.FieldValue.increment(Math.abs(amount));
  
  await db.collection('users').doc(userId).update(updates);
  return tx;
}

async function getLedgerHistory(limit = 50) {
  const snapshot = await db.collection('ledger')
    .where('userId', '==', currentUser.uid)
    .orderBy('timestamp', 'desc')
    .limit(limit).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function processReferral(newUserId, referralCode) {
  const referrers = await db.collection('users').where('referralCode', '==', referralCode).limit(1).get();
  if (!referrers.empty) {
    const referrer = referrers.docs[0];
    await addLedgerEntry(referrer.id, 'referral_bonus', 500, 'إحالة جديدة');
    await db.collection('users').doc(referrer.id).update({
      referralCount: firebase.firestore.FieldValue.increment(1),
      referralEarnings: firebase.firestore.FieldValue.increment(500)
    });
  }
}

// ============================================================
// UI HELPERS
// ============================================================
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
    const balance = userData?.balance || 0;
    const navBalance = document.getElementById('navBalance');
    if (navBalance) navBalance.textContent = balance.toLocaleString();
    const mainBalance = document.getElementById('mainBalance');
    if (mainBalance) mainBalance.textContent = balance.toLocaleString();
  },
  
  updateSidebarUser() {
    if (!userData) return;
    const el = (id) => document.getElementById(id);
    if (el('sidebarUserName')) el('sidebarUserName').textContent = userData.username;
    if (el('sidebarUserLevel')) el('sidebarUserLevel').textContent = userData.level;
    if (el('sidebarUserXp')) el('sidebarUserXp').textContent = userData.xp;
    const maxXp = userData.level * 100;
    if (el('sidebarUserXpMax')) el('sidebarUserXpMax').textContent = maxXp;
    if (el('sidebarXpFill')) el('sidebarXpFill').style.width = `${(userData.xp / maxXp) * 100}%`;
  },
  
  updateNotifications() {
    // Future implementation
  },
  
  addNotification(title, message, icon = '🔔') {
    UI.toast(`🔔 ${title}`);
  },
  
  formatTime(ts) {
    if (!ts) return 'الآن';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'الآن';
    if (diff < 3600000) return `منذ ${Math.floor(diff / 60000)} د`;
    if (diff < 86400000) return `منذ ${Math.floor(diff / 3600000)} س`;
    return date.toLocaleDateString('ar-SA');
  }
};

function closeModal() { UI.closeModal(); }

// ============================================================
// ACTIONS
// ============================================================
const Actions = {
  async claimDaily() {
    if (!userData) return;
    const today = new Date().toDateString();
    const lastClaim = userData.lastDailyClaim ? userData.lastDailyClaim.toDate().toDateString() : null;
    if (lastClaim === today) { UI.toast('لقد حصلت على المكافأة اليوم!', 'warning'); return; }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const newStreak = lastClaim === yesterday.toDateString() ? userData.streak + 1 : 1;
    const reward = siteSettings.dailyRewards[Math.min(newStreak - 1, siteSettings.dailyRewards.length - 1)];
    
    await addLedgerEntry(currentUser.uid, 'daily_claim', reward, `المكافأة اليومية - اليوم ${newStreak}`);
    await db.collection('users').doc(currentUser.uid).update({
      streak: newStreak,
      maxStreak: Math.max(userData.maxStreak, newStreak),
      lastDailyClaim: firebase.firestore.FieldValue.serverTimestamp(),
      xp: firebase.firestore.FieldValue.increment(10)
    });
    
    UI.toast(`🎉 حصلت على ${reward} عملة! Streak: ${newStreak}`);
    Router.render();
  },
  
  startOffer(id) {
    const offer = MOCK.offers.find(o => o.id === id) || MOCK.games.find(g => g.id === id) || MOCK.surveys.find(s => s.id === id);
    if (!offer) return;
    
    UI.modal(`بدء: ${offer.name}`,
      `<div class="text-center mb-20">
        <div style="font-size:4rem;">${offer.icon}</div>
        <h3>${offer.name}</h3>
        <p class="text-secondary">${offer.desc || 'أكمل المهمة لتحصل على المكافأة'}</p>
        <div class="flex gap-10" style="justify-content:center; margin:20px 0; flex-wrap:wrap;">
          <span class="badge-status badge-info">⏱️ ${offer.time || '10 min'}</span>
          <span class="badge-status badge-success">💰 ${offer.reward.toLocaleString()}</span>
        </div>
      </div>`,
      [
        { text: '❌ إلغاء', class: 'btn-ghost', onclick: 'closeModal()' },
        { text: '🚀 ابدأ العرض', class: 'btn-primary', onclick: `completeOfferSimulation('${id}')` }
      ]
    );
  },
  
  async completeSpinWheel() {
    if (!userData) return;
    const now = Date.now();
    if (userData.lastWheelSpin && now - userData.lastWheelSpin.toDate().getTime() < 86400000) {
      UI.toast('يمكنك التدوير مرة واحدة يومياً', 'warning');
      return;
    }
    
    const prizes = siteSettings.wheelPrizes;
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    const rotation = 1800 + Math.random() * 360;
    const wheel = document.getElementById('spinWheel');
    if (wheel) wheel.style.transform = `rotate(${rotation}deg)`;
    
    setTimeout(async () => {
      await addLedgerEntry(currentUser.uid, 'wheel_prize', prize, 'جائزة عجلة الحظ');
      await db.collection('users').doc(currentUser.uid).update({
        lastWheelSpin: firebase.firestore.FieldValue.serverTimestamp(),
        xp: firebase.firestore.FieldValue.increment(5)
      });
      UI.toast(`🎊 مبروك! ربحت ${prize} عملة!`);
      Router.render();
    }, 4200);
  },
  
  async requestWithdrawal(amount, method) {
    const balance = userData?.balance || 0;
    if (amount < siteSettings.minWithdraw) { UI.toast(`الحد الأدنى ${siteSettings.minWithdraw.toLocaleString()}`, 'error'); return; }
    if (amount > balance) { UI.toast('الرصيد غير كافٍ', 'error'); return; }
    
    const fee = Math.floor(amount * siteSettings.withdrawalFee);
    const netAmount = amount - fee;
    const usdValue = (netAmount / siteSettings.coinRate).toFixed(2);
    
    await db.collection('withdrawals').add({
      userId: currentUser.uid,
      amount, fee, netAmount, usdValue, method,
      status: 'pending',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    await addLedgerEntry(currentUser.uid, 'withdrawal_pending', -amount, `طلب سحب - ${method}`, null, 'pending');
    UI.toast(`✅ تم إرسال طلب السحب ($${usdValue})`);
    UI.closeModal();
    Router.render();
  },
  
  purchaseReward(id) {
    const reward = MOCK.rewards.find(r => r.id === id);
    if (!reward) return;
    const balance = userData?.balance || 0;
    if (balance < reward.coins) { UI.toast('الرصيد غير كافٍ', 'error'); return; }
    
    UI.modal('تأكيد الشراء',
      `<div class="text-center">
        <div style="font-size:4rem;">${reward.icon}</div>
        <h3>${reward.name}</h3>
        <div style="padding:16px; background:var(--bg-elevated); border-radius:12px; margin:20px 0;">
          <div class="flex-between mb-10"><span>التكلفة:</span><strong style="color:var(--primary);">${reward.coins.toLocaleString()} 💰</strong></div>
          <div class="flex-between"><span>رصيدك بعدها:</span><strong>${(balance - reward.coins).toLocaleString()}</strong></div>
        </div>
        <div class="form-group">
          <label class="form-label">البريد الإلكتروني للتسليم</label>
          <input type="email" class="form-input" id="deliveryEmail" value="${userData.email || ''}">
        </div>
      </div>`,
      [
        { text: '❌ إلغاء', class: 'btn-ghost', onclick: 'closeModal()' },
        { text: '✅ تأكيد', class: 'btn-primary', onclick: `confirmRewardPurchase('${id}')` }
      ]
    );
  },
  
  topUpGame(gameId, packageIndex) {
    const game = MOCK.topUpGames.find(g => g.id === gameId);
    if (!game) return;
    const pkg = game.packages[packageIndex];
    
    UI.modal(`شحن ${game.name}`,
      `<div class="text-center mb-20">
        <div style="font-size:4rem;">${game.icon}</div>
        <h3>${game.name} - ${pkg.name}</h3>
        <p class="text-secondary">$${pkg.usd} = ${pkg.coins.toLocaleString()} 💰</p>
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
  
  async completeTask(id) {
    const task = MOCK.tasks.find(t => t.id === id);
    await addLedgerEntry(currentUser.uid, 'task_reward', task.reward, `مهمة: ${task.name}`);
    UI.toast(`✅ مهمة مكتملة! +${task.reward}`);
    Router.render();
  },
  
  copyReferral() {
    const link = `${window.location.origin}${window.location.pathname}?ref=${userData.referralCode}`;
    navigator.clipboard.writeText(link).then(() => UI.toast('✅ تم نسخ الرابط'));
  },
  
  async saveProfile() {
    const username = document.getElementById('profileUsername').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const country = document.getElementById('profileCountry').value;
    
    await db.collection('users').doc(currentUser.uid).update({ username, email, phone, country });
    UI.toast('✅ تم حفظ البيانات');
    Router.render();
  },
  
  async verifyEmail() {
    await db.collection('users').doc(currentUser.uid).update({ status: 'verified', verified: true });
    await addLedgerEntry(currentUser.uid, 'verify_email', 500, 'مكافأة التحقق');
    UI.toast('✅ تم التحقق! +500 عملة');
    Router.render();
  },
  
  async enable2FA() {
    await db.collection('users').doc(currentUser.uid).update({ twoFA: true });
    await addLedgerEntry(currentUser.uid, '2fa_enable', 1000, 'تفعيل 2FA');
    UI.toast('✅ تم تفعيل 2FA! +1000 عملة');
    Router.render();
  },
  
  async submitTicket() {
    const subject = document.getElementById('ticketSubject').value;
    const message = document.getElementById('ticketMessage').value;
    if (!subject || !message) { UI.toast('املأ جميع الحقول', 'error'); return; }
    
    await db.collection('tickets').add({
      userId: currentUser.uid,
      subject, message,
      status: 'open',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    UI.toast('✅ تم إرسال التذكرة');
    document.getElementById('ticketSubject').value = '';
    document.getElementById('ticketMessage').value = '';
  },
  
  resetAccount() {
    if (!confirm('⚠️ سيتم حذف بياناتك محلياً فقط. للتأكيد تواصل مع الدعم.')) return;
    location.reload();
  }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================
async function completeOfferSimulation(id) {
  UI.closeModal();
  UI.toast('⏳ جاري توجيهك...');
  
  setTimeout(async () => {
    const offer = MOCK.offers.find(o => o.id === id) || MOCK.games.find(g => g.id === id) || MOCK.surveys.find(s => s.id === id);
    if (!offer) return;
    
    await addLedgerEntry(currentUser.uid, 'offer_reward', offer.reward, `عرض: ${offer.name}`);
    await db.collection('users').doc(currentUser.uid).update({
      completedOffers: firebase.firestore.FieldValue.increment(1),
      xp: firebase.firestore.FieldValue.increment(25)
    });
    
    UI.toast(`🎉 عرض مكتمل! +${offer.reward.toLocaleString()}`);
    Router.render();
  }, 2000);
}

async function confirmRewardPurchase(id) {
  const email = document.getElementById('deliveryEmail').value;
  if (!email) { UI.toast('البريد مطلوب', 'error'); return; }
  
  const reward = MOCK.rewards.find(r => r.id === id);
  await db.collection('orders').add({
    userId: currentUser.uid,
    type: 'reward',
    rewardId: id, rewardName: reward.name,
    coins: reward.coins, usd: reward.usd, email,
    status: 'processing',
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  
  await addLedgerEntry(currentUser.uid, 'reward_purchase', -reward.coins, `شراء: ${reward.name}`);
  UI.closeModal();
  UI.toast('✅ تم الشراء!');
  Router.render();
}

async function confirmTopUp(gameId, packageIndex) {
  const playerId = document.getElementById('playerId').value;
  if (!playerId) { UI.toast('Player ID مطلوب', 'error'); return; }
  
  const game = MOCK.topUpGames.find(g => g.id === gameId);
  const pkg = game.packages[packageIndex];
  const country = document.getElementById('topUpCountry').value;
  
  await db.collection('orders').add({
    userId: currentUser.uid,
    type: 'topup',
    gameId, gameName: game.name,
    package: pkg.name,
    coins: pkg.coins, usd: pkg.usd,
    playerId, country,
    status: 'processing',
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  
  await addLedgerEntry(currentUser.uid, 'topup_purchase', -pkg.coins, `شحن ${game.name}`);
  UI.closeModal();
  UI.toast('⚡ تم بدء الشحن!');
  Router.render();
}

async function watchAd() {
  UI.toast('⏳ جاري تحميل الإعلان...');
  setTimeout(async () => {
    await addLedgerEntry(currentUser.uid, 'ad_reward', 50, 'مشاهدة إعلان');
    UI.toast('✅ +50 عملة!');
  }, 3000);
}

function watchAdBonus() {
  UI.toast('⏳ جاري تشغيل 5 إعلانات...');
  let count = 0;
  const interval = setInterval(async () => {
    count++;
    await addLedgerEntry(currentUser.uid, 'ad_bonus', 100, `إعلان #${count}`);
    if (count >= 5) {
      clearInterval(interval);
      await addLedgerEntry(currentUser.uid, 'ad_bonus_complete', 500, 'إكمال التحدي');
      UI.toast('🎉 +1,000 عملة!');
    }
  }, 2000);
}

async function openTreasure() {
  const prizes = [100, 200, 500, 1000, 2000, 5000];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  await addLedgerEntry(currentUser.uid, 'treasure', prize, 'صندوق سري');
  UI.toast(`🎁 ربحت ${prize} عملة!`);
}

async function scratchCard() {
  const prizes = [50, 100, 200, 500, 1000];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  await addLedgerEntry(currentUser.uid, 'scratch', prize, 'بطاقة خدش');
  UI.toast(`🎟️ ربحت ${prize} عملة!`);
}

function shareReferral() {
  Actions.copyReferral();
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
  const balance = userData?.balance || 0;
  UI.modal(`سحب عبر ${method}`,
    `<div class="form-group">
      <label class="form-label">المبلغ (عملات)</label>
      <input type="number" class="form-input" id="withdrawAmount" placeholder="${min.toLocaleString()}" min="${min}" max="${balance}">
    </div>
    <div class="form-group">
      <label class="form-label">${method === 'PayPal' ? 'بريد PayPal' : 'التفاصيل'}</label>
      <input type="text" class="form-input" id="withdrawAddress">
    </div>`,
    [
      { text: '❌ إلغاء', class: 'btn-ghost', onclick: 'closeModal()' },
      { text: '💸 تأكيد', class: 'btn-primary', onclick: `Actions.requestWithdrawal(parseInt(document.getElementById('withdrawAmount').value), '${method}')` }
    ]
  );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
const Admin = {
  currentTab: 'overview',
  stats: null,
  users: [],
  withdrawals: [],
  
  async loadStats() {
    const usersSnap = await db.collection('users').get();
    const withdrawalsSnap = await db.collection('withdrawals').get();
    
    const users = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const withdrawals = withdrawalsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    this.stats = {
      totalUsers: users.length,
      newUsersToday: users.filter(u => u.joined && u.joined.toDate && u.joined.toDate() > today).length,
      pendingWithdrawals: withdrawals.filter(w => w.status === 'pending').length,
      highRiskUsers: users.filter(u => (u.riskScore || 0) > 50).length,
      totalRevenue: (users.reduce((sum, u) => sum + (u.lifetimeEarned || 0), 0) * 1.5) / siteSettings.coinRate,
      totalCosts: (users.reduce((sum, u) => sum + (u.lifetimeEarned || 0), 0)) / siteSettings.coinRate
    };
    
    this.users = users;
    this.withdrawals = withdrawals;
  },
  
  async toggleMaintenance() {
    const newState = !siteSettings.maintenanceMode;
    await db.collection('settings').doc('site').set({
      maintenanceMode: newState,
      maintenanceEndTime: newState ? firebase.firestore.Timestamp.fromDate(new Date(Date.now() + 3600000)) : null
    }, { merge: true });
    siteSettings.maintenanceMode = newState;
    UI.toast(newState ? '🔧 تم تفعيل الصيانة' : '✅ تم إلغاء الصيانة');
    Router.render();
  },
  
  async banUser(userId, reason) {
    if (!confirm(`حظر المستخدم؟\nالسبب: ${reason}`)) return;
    await db.collection('users').doc(userId).update({ status: 'banned', banReason: reason });
    UI.toast('✅ تم الحظر');
    Router.render();
  },
  
  async approveWithdrawal(wId) {
    await db.collection('withdrawals').doc(wId).update({ status: 'approved' });
    UI.toast('✅ تمت الموافقة');
    Router.render();
  },
  
  async rejectWithdrawal(wId) {
    const reason = prompt('سبب الرفض:');
    if (!reason) return;
    const w = this.withdrawals.find(x => x.id === wId);
    await db.collection('withdrawals').doc(wId).update({ status: 'rejected', reason });
    await addLedgerEntry(w.userId, 'refund', w.amount, `رفض سحب: ${reason}`);
    UI.toast('✅ تم الرفض');
    Router.render();
  },
  
  async adjustBalance(userId, amount, reason) {
    if (!amount || isNaN(amount)) { UI.toast('قيمة غير صالحة', 'error'); return; }
    await addLedgerEntry(userId, 'admin_adjust', parseInt(amount), `أدمن: ${reason}`);
    UI.toast(`✅ تم التعديل ${amount}`);
    Router.render();
  },
  
  async verifyUser(userId) {
    await db.collection('users').doc(userId).update({ status: 'verified', verified: true });
    UI.toast('✅ تم التحقق');
    Router.render();
  },
  
  async deleteAccount(userId) {
    if (!confirm('⚠️ حذف الحساب؟')) return;
    await db.collection('users').doc(userId).delete();
    UI.toast('✅ تم الحذف');
    Router.render();
  },
  
  render() {
    return `
      <div class="admin-hero">
        <div class="admin-hero-title">⚙️ لوحة التحكم الرئيسية</div>
        <p class="text-secondary">مرحباً بك، أنت تتحكم بكل شيء</p>
        <div class="admin-live-indicator"><span class="admin-live-dot"></span><span>النظام نشط</span></div>
      </div>
      
      <div class="admin-tabs">
        <button class="admin-tab ${this.currentTab === 'overview' ? 'active' : ''}" onclick="Admin.switchTab('overview')">📊 نظرة عامة</button>
        <button class="admin-tab ${this.currentTab === 'users' ? 'active' : ''}" onclick="Admin.switchTab('users')">👥 المستخدمون</button>
        <button class="admin-tab ${this.currentTab === 'withdrawals' ? 'active' : ''}" onclick="Admin.switchTab('withdrawals')">💸 السحب</button>
        <button class="admin-tab ${this.currentTab === 'maintenance' ? 'active' : ''}" onclick="Admin.switchTab('maintenance')">🔧 الصيانة</button>
        <button class="admin-tab ${this.currentTab === 'settings' ? 'active' : ''}" onclick="Admin.switchTab('settings')">⚙️ الإعدادات</button>
      </div>
      
      ${this.renderTab()}
    `;
  },
  
  switchTab(tab) { this.currentTab = tab; Router.render(); },
  
  renderTab() {
    if (!this.stats) return '<div class="loader active"><div class="loader-spinner"></div></div>';
    switch(this.currentTab) {
      case 'overview': return this.renderOverview();
      case 'users': return this.renderUsers();
      case 'withdrawals': return this.renderWithdrawals();
      case 'maintenance': return this.renderMaintenance();
      case 'settings': return this.renderSettings();
      default: return this.renderOverview();
    }
  },
  
  renderOverview() {
    const s = this.stats;
    const profit = s.totalRevenue - s.totalCosts;
    return `
      <div class="stats-grid">
        <div class="stat-card gradient-primary">
          <div class="stat-icon">👥</div>
          <div class="stat-value">${s.totalUsers}</div>
          <div class="stat-label">إجمالي المستخدمين</div>
          <div class="stat-trend up">+${s.newUsersToday} اليوم</div>
        </div>
        <div class="stat-card gradient-accent">
          <div class="stat-icon">💰</div>
          <div class="stat-value">$${s.totalRevenue.toFixed(2)}</div>
          <div class="stat-label">الإيرادات</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💸</div>
          <div class="stat-value">$${s.totalCosts.toFixed(2)}</div>
          <div class="stat-label">التكاليف</div>
        </div>
        <div class="stat-card gradient-purple">
          <div class="stat-icon">📈</div>
          <div class="stat-value">$${profit.toFixed(2)}</div>
          <div class="stat-label">صافي الربح</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💸</div>
          <div class="stat-value">${s.pendingWithdrawals}</div>
          <div class="stat-label">سحب معلق</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚠️</div>
          <div class="stat-value" style="color:var(--danger);">${s.highRiskUsers}</div>
          <div class="stat-label">حسابات مشبوهة</div>
        </div>
      </div>
      
      <div class="admin-section">
        <div class="admin-section-title"><h3>🔥 آخر طلبات السحب</h3></div>
        ${this.withdrawals.slice(0, 5).map(w => `
          <div class="user-risk-card">
            <div class="user-risk-header">
              <div>
                <strong>${w.method}</strong>
                <div class="text-muted" style="font-size:0.8rem;">$${w.usdValue}</div>
              </div>
              <span class="badge-status ${w.status === 'approved' ? 'badge-success' : w.status === 'pending' ? 'badge-warning' : 'badge-danger'}">${w.status}</span>
            </div>
            ${w.status === 'pending' ? `
              <div class="flex gap-10">
                <button class="admin-action-btn" onclick="Admin.approveWithdrawal('${w.id}')">✅ موافقة</button>
                <button class="admin-action-btn danger" onclick="Admin.rejectWithdrawal('${w.id}')">❌ رفض</button>
              </div>
            ` : ''}
          </div>
        `).join('') || '<p class="text-muted text-center">لا توجد طلبات</p>'}
      </div>
    `;
  },
  
  renderUsers() {
    return `
      <div class="admin-section">
        <div class="admin-section-title"><h3>👥 إدارة المستخدمين (${this.users.length})</h3></div>
        ${this.users.map(u => `
          <div class="user-risk-card ${(u.riskScore || 0) > 50 ? 'high-risk' : ''}">
            <div class="user-risk-header">
              <div>
                <strong>${u.username}</strong> <span class="text-muted" style="font-size:0.8rem;">(${u.email})</span>
                <div class="text-muted" style="font-size:0.8rem; margin-top:4px;">
                  Lv ${u.level} · ${u.balance?.toLocaleString() || 0} 💰 · ${(u.riskScore || 0) > 50 ? '⚠️ مشبوه' : '✅ آمن'}
                </div>
              </div>
              <span class="badge-status ${u.status === 'verified' ? 'badge-success' : u.status === 'banned' ? 'badge-danger' : 'badge-warning'}">${u.status || 'pending'}</span>
            </div>
            <div class="flex gap-10 mt-20" style="flex-wrap:wrap;">
              <button class="admin-action-btn" onclick="Admin.verifyUser('${u.id}')">✅ تحقق</button>
              <button class="admin-action-btn" onclick="Admin.adjustBalance('${u.id}', prompt('المبلغ:'), prompt('السبب:'))">💰 تعديل رصيد</button>
              <button class="admin-action-btn danger" onclick="Admin.banUser('${u.id}', prompt('السبب:'))">🚫 حظر</button>
              <button class="admin-action-btn danger" onclick="Admin.deleteAccount('${u.id}')">🗑️ حذف</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  renderWithdrawals() {
    return `
      <div class="admin-section">
        <div class="admin-section-title"><h3>💸 طلبات السحب (${this.withdrawals.length})</h3></div>
        ${this.withdrawals.map(w => `
          <div class="user-risk-card">
            <div class="user-risk-header">
              <div>
                <strong>${w.method}</strong>
                <div class="text-muted" style="font-size:0.8rem;">$${w.usdValue} · ${w.amount?.toLocaleString()} عملة</div>
              </div>
              <span class="badge-status ${w.status === 'approved' ? 'badge-success' : w.status === 'pending' ? 'badge-warning' : 'badge-danger'}">${w.status}</span>
            </div>
            ${w.status === 'pending' ? `
              <div class="flex gap-10">
                <button class="admin-action-btn" onclick="Admin.approveWithdrawal('${w.id}')">✅ موافقة</button>
                <button class="admin-action-btn danger" onclick="Admin.rejectWithdrawal('${w.id}')">❌ رفض</button>
              </div>
            ` : ''}
          </div>
        `).join('') || '<p class="text-muted text-center">لا توجد طلبات</p>'}
      </div>
    `;
  },
  
  renderMaintenance() {
    return `
      <div class="admin-section">
        <div class="admin-section-title">
          <h3>🔧 وضع الصيانة</h3>
          <div class="maintenance-toggle">
            <span class="text-secondary">${siteSettings.maintenanceMode ? 'مفعّل' : 'معطّل'}</span>
            <div class="maintenance-switch ${siteSettings.maintenanceMode ? 'active' : ''}" onclick="Admin.toggleMaintenance()"></div>
          </div>
        </div>
        ${siteSettings.maintenanceMode ? `
          <div style="padding:20px; background:rgba(255,51,102,0.1); border:1px solid rgba(255,51,102,0.3); border-radius:12px; margin-top:20px;">
            <h4>⚠️ الموقع معطل حالياً</h4>
            <p class="text-secondary" style="margin-top:8px;">جميع المستخدمين يرون صفحة الصيانة</p>
            <button class="btn btn-primary mt-20" onclick="Admin.toggleMaintenance()">✅ إلغاء الصيانة</button>
          </div>
        ` : `
          <div style="padding:20px; background:rgba(0,255,136,0.05); border:1px solid rgba(0,255,136,0.2); border-radius:12px;">
            <h4>✅ الموقع يعمل بشكل طبيعي</h4>
            <p class="text-secondary" style="margin-top:8px;">انقر على الزر أعلاه لتفعيل الصيانة</p>
          </div>
        `}
      </div>
    `;
  },
  
  renderSettings() {
    return `
      <div class="admin-section">
        <div class="admin-section-title"><h3>⚙️ إعدادات النظام</h3></div>
        <div class="card-grid">
          <div class="card">
            <div class="card-title">💰 تحويل العملات</div>
            <div class="form-group"><label class="form-label">كم عملة = $1</label><input type="number" class="form-input" value="${siteSettings.coinRate}" id="settingCoinRate"></div>
            <div class="form-group"><label class="form-label">الحد الأدنى للسحب</label><input type="number" class="form-input" value="${siteSettings.minWithdraw}" id="settingMinWithdraw"></div>
            <button class="btn btn-primary btn-block" onclick="Admin.saveSettings()">💾 حفظ</button>
          </div>
          <div class="card">
            <div class="card-title">💸 رسوم السحب</div>
            <div class="form-group"><label class="form-label">النسبة %</label><input type="number" class="form-input" value="${siteSettings.withdrawalFee * 100}" id="settingFee" step="0.5"></div>
          </div>
        </div>
      </div>
    `;
  },
  
  async saveSettings() {
    await db.collection('settings').doc('site').set({
      coinRate: parseInt(document.getElementById('settingCoinRate').value),
      minWithdraw: parseInt(document.getElementById('settingMinWithdraw').value),
      withdrawalFee: parseFloat(document.getElementById('settingFee').value) / 100
    }, { merge: true });
    UI.toast('✅ تم الحفظ');
  }
};

// ============================================================
// VIEWS
// ============================================================
const Views = {
  home() {
    const balance = userData?.balance || 0;
    const lifetimeEarned = userData?.lifetimeEarned || 0;
    const completedOffers = userData?.completedOffers || 0;
    const usdBalance = (balance / siteSettings.coinRate).toFixed(2);
    
    return `
      <div class="hero slide-up">
        <div class="hero-badge"><span class="hero-badge-dot"></span><span>منصة ربح احترافية</span></div>
        <h1>مرحباً <span class="gradient-text">${userData?.username || 'Player'}</span> 👋</h1>
        <p>ابدأ رحلتك في كسب العملات الحقيقية</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" onclick="navigate('earn')">🚀 ابدأ الكسب</button>
          <button class="btn btn-ghost btn-lg" onclick="navigate('daily')">🎁 المكافأة اليومية</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="hero-stat-value">${balance.toLocaleString()}</div><div class="hero-stat-label">💰 رصيدك</div></div>
          <div class="hero-stat"><div class="hero-stat-value">$${usdBalance}</div><div class="hero-stat-label">💵 بالدولار</div></div>
          <div class="hero-stat"><div class="hero-stat-value">${userData?.streak || 0}🔥</div><div class="hero-stat-label">Streak</div></div>
          <div class="hero-stat"><div class="hero-stat-value">${completedOffers}</div><div class="hero-stat-label">🎯 عروض</div></div>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card gradient-primary"><div class="stat-icon">💰</div><div class="stat-value" id="mainBalance">${balance.toLocaleString()}</div><div class="stat-label">الرصيد</div></div>
        <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-value">${lifetimeEarned.toLocaleString()}</div><div class="stat-label">إجمالي الكسب</div></div>
        <div class="stat-card gradient-accent"><div class="stat-icon">🔥</div><div class="stat-value">${userData?.streak || 0} يوم</div><div class="stat-label">Streak</div></div>
        <div class="stat-card gradient-purple"><div class="stat-icon">⭐</div><div class="stat-value">Lv ${userData?.level || 1}</div><div class="stat-label">مستواك</div></div>
      </div>
      
      <a href="https://freecash.com/r/34GRD6" target="_blank" class="affiliate-banner">
        <img src="https://cdn.phototourl.com/free/2026-08-17-d1178f26-4ff4-4f4d-aad0-8b528e531e10.png" alt="Freecash">
      </a>
      
      <a href="${SMARTLINK}" target="_blank" class="card" style="background:linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,184,255,0.05)); border-color:rgba(0,255,136,0.3); text-decoration:none; color:inherit;">
        <div class="flex gap-10" style="align-items:center;">
          <div style="font-size:3rem;">🎁</div>
          <div style="flex:1;">
            <h3 style="margin-bottom:4px;">🔥 عرض خاص!</h3>
            <p class="text-secondary">اضغط هنا للحصول على مكافأة حصرية</p>
          </div>
          <span class="btn btn-primary">← افتح</span>
        </div>
      </a>
      
      <div class="card-grid">
        <div class="card">
          <div class="card-title">🔥 العروض الأعلى ربحاً</div>
          ${MOCK.offers.slice(0, 3).map(o => `
            <div class="feature-card mb-10" style="padding:16px;" onclick="navigate('offers')">
              <div class="flex gap-10" style="align-items:center;">
                <div class="offer-icon" style="width:50px; height:50px; font-size:1.5rem;">${o.icon}</div>
                <div style="flex:1;"><div style="font-weight:700;">${o.name}</div><div class="text-muted" style="font-size:0.8rem;">${o.provider}</div></div>
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
                <div style="flex:1;"><div style="font-weight:700;">${g.name}</div><div class="text-muted" style="font-size:0.8rem;">${g.platform}</div></div>
                <div style="color:var(--secondary); font-weight:800;">${g.totalReward.toLocaleString()}</div>
              </div>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-block mt-10" onclick="navigate('games')">عرض الكل ←</button>
        </div>
      </div>
      
      <div class="card">
        <div class="card-title">🎁 المكافأة اليومية</div>
        <div class="streak-display">
          ${siteSettings.dailyRewards.map((reward, i) => {
            const day = i + 1;
            const claimed = (userData?.streak || 0) >= day && userData?.lastDailyClaim && userData.lastDailyClaim.toDate().toDateString() === new Date().toDateString();
            return `<div class="streak-day ${claimed ? 'claimed' : ''}"><div class="day-num">D${day}</div><div class="reward">+${reward}</div></div>`;
          }).join('')}
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="Actions.claimDaily()">🎁 احصل على مكافأة اليوم</button>
      </div>
      
      <div class="card" style="background:linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.05)); border-color:rgba(139,92,246,0.3);">
        <div class="card-title">🤝 برنامج الإحالة</div>
        <p class="text-secondary mb-20">ادعُ أصدقاءك واحصل على <strong style="color:var(--accent);">10%</strong> من أرباحهم!</p>
        <div style="background:var(--bg-elevated); padding:14px; border-radius:12px; font-family:monospace; word-break:break-all; margin-bottom:16px;">
          ${window.location.origin}${window.location.pathname}?ref=${userData?.referralCode || ''}
        </div>
        <button class="btn btn-purple btn-block" onclick="Actions.copyReferral()">📋 نسخ رابط الإحالة</button>
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
          { route: 'games', icon: '🎮', title: 'الألعاب', desc: 'ثبّت والعب واربح حتى 15,000', count: MOCK.games.length },
          { route: 'surveys', icon: '📊', title: 'الاستبيانات', desc: 'شارك رأيك', count: MOCK.surveys.length },
          { route: 'tasks', icon: '✅', title: 'المهام', desc: 'أنجز مهام بسيطة', count: MOCK.tasks.length },
          { route: 'wheel', icon: '🎡', title: 'عجلة الحظ', desc: 'ادر يومياً', count: 1 },
          { route: 'referrals', icon: '🤝', title: 'الإحالة', desc: 'ادعُ أصدقاءك', count: userData?.referralCount || 0 }
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
    return `
      <h1 class="page-title">🎯 العروض المتاحة</h1>
      <div class="card-grid">
        ${MOCK.offers.map(o => `
          <div class="offer-card">
            ${o.featured ? '<div class="offer-featured">⭐ مميز</div>' : ''}
            <div class="offer-header">
              <div class="offer-icon">${o.icon}</div>
              <div class="offer-meta"><div class="offer-name">${o.name}</div><div class="offer-provider">${o.provider}</div></div>
            </div>
            <div class="offer-desc">${o.desc}</div>
            <div class="offer-tags">
              <span class="offer-tag">⏱️ ${o.time}</span>
              <span class="offer-tag">📊 ${o.difficulty}</span>
              <span class="offer-tag">👥 ${o.completions}</span>
            </div>
            <div class="offer-reward"><span class="offer-reward-label">المكافأة:</span><span class="offer-reward-value">+${o.reward.toLocaleString()}</span></div>
            <button class="btn btn-primary btn-block" onclick="Actions.startOffer('${o.id}')">🚀 ابدأ العرض</button>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  games() {
    return `
      <h1 class="page-title">🎮 عروض الألعاب</h1>
      <div class="card-grid">
        ${MOCK.games.map(g => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon" style="background:var(--gradient-purple);">${g.icon}</div>
              <div class="offer-meta"><div class="offer-name">${g.name}</div><div class="offer-provider">${g.platform}</div></div>
            </div>
            <div style="margin:16px 0;">
              ${g.milestones.map(m => `
                <div style="display:flex; justify-content:space-between; padding:10px; background:var(--bg-surface); border-radius:10px; margin-bottom:6px;">
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
      <div class="card-grid">
        ${MOCK.surveys.map(s => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon" style="background:var(--gradient-accent);">${s.icon}</div>
              <div class="offer-meta"><div class="offer-name">${s.name}</div><div class="offer-provider">${s.provider}</div></div>
            </div>
            <div class="offer-tags"><span class="offer-tag">⏱️ ${s.time}</span><span class="offer-tag">👥 ${s.completions}</span></div>
            <div class="offer-reward"><span class="offer-reward-label">المكافأة:</span><span class="offer-reward-value">+${s.reward.toLocaleString()}</span></div>
            <button class="btn btn-accent btn-block" onclick="Actions.startOffer('${s.id}')">📝 ابدأ</button>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  tasks() {
    return `
      <h1 class="page-title">✅ المهام اليومية</h1>
      <div class="card-grid">
        ${MOCK.tasks.map(t => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon">${t.icon}</div>
              <div class="offer-meta"><div class="offer-name">${t.name}</div><div class="offer-provider">مهمة بسيطة</div></div>
            </div>
            <div class="offer-reward"><span class="offer-reward-label">المكافأة:</span><span class="offer-reward-value">+${t.reward.toLocaleString()}</span></div>
            <button class="btn btn-primary btn-block" onclick="Actions.completeTask('${t.id}')">✨ أنجز المهمة</button>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  wheel() {
    return `
      <h1 class="page-title">🎡 عجلة الحظ</h1>
      <div class="card">
        <div class="wheel-container">
          <div class="wheel-wrapper">
            <div class="wheel-pointer"></div>
            <div class="wheel" id="spinWheel"></div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.completeSpinWheel()">🎡 ادر العجلة</button>
        </div>
      </div>
    `;
  },
  
  wallet() {
    const balance = userData?.balance || 0;
    const earned = userData?.lifetimeEarned || 0;
    const spent = userData?.lifetimeSpent || 0;
    return `
      <h1 class="page-title">💼 المحفظة</h1>
      <div class="stats-grid">
        <div class="stat-card gradient-primary"><div class="stat-icon">💰</div><div class="stat-value" id="mainBalance">${balance.toLocaleString()}</div><div class="stat-label">الرصيد</div></div>
        <div class="stat-card gradient-accent"><div class="stat-icon">📈</div><div class="stat-value">${earned.toLocaleString()}</div><div class="stat-label">المكتسب</div></div>
        <div class="stat-card"><div class="stat-icon">📉</div><div class="stat-value">${spent.toLocaleString()}</div><div class="stat-label">المنفق</div></div>
        <div class="stat-card gradient-purple"><div class="stat-icon">💸</div><div class="stat-value">$${(userData?.totalWithdrawn || 0).toFixed(2)}</div><div class="stat-label">المسحوب</div></div>
      </div>
      <div class="card-grid">
        <button class="btn btn-primary btn-block btn-lg" onclick="navigate('withdraw')">💸 سحب</button>
        <button class="btn btn-purple btn-block btn-lg" onclick="navigate('store')">🛒 المتجر</button>
        <button class="btn btn-accent btn-block btn-lg" onclick="navigate('topup')">⚡ شحن</button>
      </div>
    `;
  },
  
  async transactions() {
    const ledger = await getLedgerHistory();
    return `
      <h1 class="page-title">📜 سجل العمليات</h1>
      <div class="card">
        ${ledger.length === 0 ? '<div class="empty-state"><div class="empty-state-icon">📜</div><div class="empty-state-title">لا توجد عمليات</div></div>' : `
          <div class="table-container">
            <table>
              <thead><tr><th>التاريخ</th><th>النوع</th><th>الوصف</th><th>المبلغ</th></tr></thead>
              <tbody>
                ${ledger.map(tx => `
                  <tr>
                    <td>${UI.formatTime(tx.timestamp)}</td>
                    <td><span class="badge-status badge-info">${tx.type}</span></td>
                    <td>${tx.description}</td>
                    <td style="color:${tx.amount > 0 ? 'var(--primary)' : 'var(--danger)'}; font-weight:700;">
                      ${tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString()} 💰
                    </td>
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
      <div class="card-grid">
        ${MOCK.rewards.map(r => `
          <div class="offer-card">
            <div class="offer-header">
              <div class="offer-icon">${r.icon}</div>
              <div class="offer-meta"><div class="offer-name">${r.name}</div><div class="offer-provider">${r.stock} متاح</div></div>
            </div>
            <div style="margin:16px 0; padding:16px; background:var(--bg-surface); border-radius:12px;">
              <div class="flex-between mb-10"><span>التكلفة:</span><strong style="color:var(--primary);">${r.coins.toLocaleString()} 💰</strong></div>
              <div class="flex-between"><span>القيمة:</span><strong style="color:var(--accent);">$${r.usd}</strong></div>
            </div>
            <button class="btn btn-primary btn-block" onclick="Actions.purchaseReward('${r.id}')">🛒 اشترِ</button>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  topup() {
    return `
      <h1 class="page-title">⚡ شحن الألعاب</h1>
      <div class="topup-hero">
        <div class="topup-hero-icon">🎮</div>
        <h2>شحن فوري · آمن · مضمون</h2>
        <p class="text-secondary">ادفع بالعملات واحصل على الشحن خلال دقائق</p>
      </div>
      
      <div class="topup-steps">
        <div class="topup-step"><div class="topup-step-num">1</div><div class="topup-step-title">اختر اللعبة</div></div>
        <div class="topup-step"><div class="topup-step-num">2</div><div class="topup-step-title">الباقة</div></div>
        <div class="topup-step"><div class="topup-step-num">3</div><div class="topup-step-title">Player ID</div></div>
        <div class="topup-step"><div class="topup-step-num">4</div><div class="topup-step-title">استلم</div></div>
      </div>
      
      <div class="card-grid">
        ${MOCK.topUpGames.map(g => `
          <div class="topup-game-card">
            <div class="topup-game-header">
              <div class="topup-game-icon">${g.icon}</div>
              <div><h3>${g.name}</h3><div class="text-muted" style="font-size:0.85rem;">⚡ شحن فوري</div></div>
            </div>
            <div class="topup-packages">
              ${g.packages.map((p, i) => `
                <div class="topup-package ${i === 1 ? 'popular' : ''}" onclick="Actions.topUpGame('${g.id}', ${i})">
                  <div class="topup-package-name">${p.name}</div>
                  <div class="topup-package-usd">$${p.usd}</div>
                  <div class="topup-package-coins">${p.coins.toLocaleString()} 💰</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  withdraw() {
    const balance = userData?.balance || 0;
    return `
      <h1 class="page-title">💸 السحب</h1>
      <div class="card" style="background:var(--gradient-primary); border:none; text-align:center;">
        <h2 style="color:#001a0f;">رصيدك المتاح</h2>
        <div style="font-size:3rem; font-weight:900; margin:16px 0; color:#001a0f;">${balance.toLocaleString()} 💰</div>
        <p style="color:rgba(0,26,15,0.7); font-size:1.2rem; font-weight:600;">= $${(balance/siteSettings.coinRate).toFixed(2)}</p>
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
                <div class="flex-between mb-10"><span>الحد الأدنى:</span><strong>${m.min.toLocaleString()}</strong></div>
                <div class="flex-between mb-10"><span>الرسوم:</span><strong>${m.fee}</strong></div>
                <div class="flex-between"><span>الوقت:</span><strong>${m.time}</strong></div>
              </div>
              <button class="btn btn-primary btn-block mt-20" onclick="showWithdrawForm('${m.method}', ${m.min})" ${balance < m.min ? 'disabled' : ''}>
                ${balance >= m.min ? '💸 اسحب' : '⚠️ غير كافٍ'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
  
  referrals() {
    const link = `${window.location.origin}${window.location.pathname}?ref=${userData?.referralCode || ''}`;
    return `
      <h1 class="page-title">🤝 برنامج الإحالة</h1>
      <div class="card" style="background:linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1));">
        <h2>🎉 رابطك الخاص</h2>
        <p class="text-secondary mb-20">احصل على 10% من كل ما يكسبه أصدقاؤك!</p>
        <div style="background:var(--bg-elevated); padding:14px; border-radius:12px; font-family:monospace; word-break:break-all; margin-bottom:16px;">${link}</div>
        <div class="flex gap-10"><button class="btn btn-purple" onclick="Actions.copyReferral()">📋 نسخ</button><button class="btn btn-secondary" onclick="shareReferral()">📤 مشاركة</button></div>
      </div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">${userData?.referralCount || 0}</div><div class="stat-label">الإحالات</div></div>
        <div class="stat-card gradient-primary"><div class="stat-icon">💰</div><div class="stat-value">${(userData?.referralEarnings || 0).toLocaleString()}</div><div class="stat-label">الأرباح</div></div>
      </div>
    `;
  },
  
  leaderboard() {
    return `
      <h1 class="page-title">🏅 المتصدرون</h1>
      <div class="card">
        ${MOCK.leaderboard.map((u, i) => `
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
      </div>
    `;
  },
  
  daily() {
    return `
      <h1 class="page-title">🎁 المكافآت اليومية</h1>
      <div class="card" style="text-align:center; background:var(--gradient-primary); border:none;">
        <h2 style="color:#001a0f;">🔥 Streak: ${userData?.streak || 0} أيام</h2>
      </div>
      <div class="card">
        <div class="streak-display">
          ${siteSettings.dailyRewards.map((reward, i) => `<div class="streak-day"><div class="day-num">D${i+1}</div><div class="reward">+${reward}</div></div>`).join('')}
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="Actions.claimDaily()">🎁 احصل على مكافأة اليوم</button>
      </div>
      <div class="card-grid">
        <div class="card"><div class="card-title">💎 Daily Treasure</div><button class="btn btn-accent btn-block mt-20" onclick="openTreasure()">🎁 افتح</button></div>
        <div class="card"><div class="card-title">🎟️ Scratch Cards</div><button class="btn btn-purple btn-block mt-20" onclick="scratchCard()">🎟️ احصل</button></div>
      </div>
    `;
  },
  
  notifications() {
    return `
      <h1 class="page-title">🔔 الإشعارات</h1>
      <div class="card empty-state"><div class="empty-state-icon">🔔</div><div class="empty-state-title">لا توجد إشعارات جديدة</div></div>
    `;
  },
  
  profile() {
    return `
      <h1 class="page-title">👤 الملف الشخصي</h1>
      <div class="card" style="text-align:center;">
        <div style="font-size:5rem; margin-bottom:16px;">${userData?.avatar || '👤'}</div>
        <h2>${userData?.username || ''}</h2>
        <p class="text-secondary">Lv ${userData?.level || 1} · ${userData?.xp || 0}/${(userData?.level || 1) * 100} XP</p>
        <button class="btn btn-danger mt-20" onclick="logout()">🚪 تسجيل الخروج</button>
      </div>
      <div class="card">
        <div class="card-title">📝 البيانات</div>
        <div class="form-group"><label class="form-label">الاسم</label><input type="text" class="form-input" id="profileUsername" value="${userData?.username || ''}"></div>
        <div class="form-group"><label class="form-label">البريد</label><input type="email" class="form-input" id="profileEmail" value="${userData?.email || ''}"></div>
        <div class="form-group"><label class="form-label">الهاتف</label><input type="tel" class="form-input" id="profilePhone" value="${userData?.phone || ''}"></div>
        <div class="form-group"><label class="form-label">الدولة</label>
          <select class="form-select" id="profileCountry">
            ${Object.entries(MOCK.countries).map(([k, v]) => `<option value="${k}" ${userData?.country === k ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-primary btn-block" onclick="Actions.saveProfile()">💾 حفظ</button>
      </div>
    `;
  },
  
  security() {
    return `
      <h1 class="page-title">🔒 الأمان</h1>
      <div class="card">
        <div class="card-title">📧 التحقق من البريد</div>
        <p class="text-secondary mb-20">${userData?.verified ? '✅ موثق' : '⚠️ غير موثق'}</p>
        ${!userData?.verified ? `<button class="btn btn-primary btn-block" onclick="Actions.verifyEmail()">✅ تحقق (+500)</button>` : ''}
      </div>
      <div class="card">
        <div class="card-title">🔐 المصادقة الثنائية</div>
        <p class="text-secondary mb-20">${userData?.twoFA ? '✅ مفعلة' : '❌ معطلة'}</p>
        ${!userData?.twoFA ? `<button class="btn btn-purple btn-block" onclick="Actions.enable2FA()">🔒 تفعيل (+1000)</button>` : ''}
      </div>
    `;
  },
  
  support() {
    return `
      <h1 class="page-title">💬 الدعم الفني</h1>
      <div class="card">
        <div class="card-title">📧 إرسال تذكرة</div>
        <div class="form-group"><label class="form-label">الموضوع</label><input type="text" class="form-input" id="ticketSubject"></div>
        <div class="form-group"><label class="form-label">الرسالة</label><textarea class="form-textarea" id="ticketMessage" rows="6"></textarea></div>
        <button class="btn btn-primary btn-block" onclick="Actions.submitTicket()">📨 إرسال</button>
      </div>
      <div class="card">
        <div class="card-title">📞 التواصل</div>
        <div class="flex gap-10" style="flex-wrap:wrap;">
          <div style="padding:16px; background:var(--bg-surface); border-radius:12px; flex:1; min-width:200px;"><strong>📧 البريد</strong><br><span class="text-secondary">support@rewardx.com</span></div>
          <div style="padding:16px; background:var(--bg-surface); border-radius:12px; flex:1; min-width:200px;"><strong>💬 Telegram</strong><br><span class="text-secondary">@RewardXSupport</span></div>
        </div>
      </div>
    `;
  },
  
  faq() {
    const faqs = [
      { q: '💰 كيف أحصل على العملات؟', a: 'من خلال العروض، الألعاب، الاستبيانات، والمهام.' },
      { q: '💸 ما هو الحد الأدنى للسحب؟', a: `${siteSettings.minWithdraw.toLocaleString()} عملة.` },
      { q: '⏱️ كم يستغرق وصول العملات؟', a: 'معظم العروض فورية.' },
      { q: '🤝 كيف يعمل برنامج الإحالة؟', a: 'تحصل على 10% من أرباح أصدقائك.' }
    ];
    return `
      <h1 class="page-title">❓ الأسئلة الشائعة</h1>
      ${faqs.map((f, i) => `
        <div class="card" style="cursor:pointer;" onclick="toggleFaq(${i})">
          <div class="flex-between">
            <h3 style="font-size:1rem;">${f.q}</h3>
            <span id="faqIcon_${i}" style="font-size:1.5rem; color:var(--primary);">+</span>
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
        <h3>1. قبول الشروط</h3><p class="text-secondary mt-10 mb-20">باستخدامك للمنصة، فإنك توافق على الشروط.</p>
        <h3>2. الحساب</h3><p class="text-secondary mt-10 mb-20">يجب أن يكون عمرك 18+ سنة.</p>
        <h3>3. العملات</h3><p class="text-secondary mt-10 mb-20">العملات الداخلية ليس لها قيمة نقدية مباشرة.</p>
        <h3>4. السحب</h3><p class="text-secondary mt-10 mb-20">الحد الأدنى ${siteSettings.minWithdraw.toLocaleString()} عملة.</p>
        <h3>5. الاحتيال</h3><p class="text-secondary mt-10">يحظر استخدام VPN أو حسابات متعددة.</p>
      </div>
    `;
  },
  
  privacy() {
    return `
      <h1 class="page-title">🛡️ سياسة الخصوصية</h1>
      <div class="card">
        <h3>1. البيانات</h3><p class="text-secondary mt-10 mb-20">نجمع البيانات الضرورية فقط.</p>
        <h3>2. الاستخدام</h3><p class="text-secondary mt-10 mb-20">لتقديم الخدمة والحماية من الاحتيال.</p>
        <h3>3. المشاركة</h3><p class="text-secondary mt-10 mb-20">لا نبيع بياناتك.</p>
        <h3>4. الأمان</h3><p class="text-secondary mt-10">نستخدم تشفير SSL.</p>
      </div>
    `;
  },
  
  status() {
    return `
      <h1 class="page-title">📊 حالة النظام</h1>
      <div class="card" style="background:linear-gradient(135deg, rgba(0,255,136,0.05), rgba(139,92,246,0.05));">
        <div class="card-title">🛡️ Anti-Fraud Status</div>
        <div class="stats-grid">
          <div class="stat-card gradient-primary"><div class="stat-icon">✅</div><div class="stat-value">نظيف</div><div class="stat-label">حالة الحساب</div></div>
          <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-value">${userData?.riskScore || 0}</div><div class="stat-label">Risk Score</div></div>
          <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-value">0</div><div class="stat-label">انتهاكات</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🔍 فحوصات النظام</div>
        ${['IP Address', 'Device Fingerprint', 'VPN Detection', 'Emulator Detection'].map(name => `
          <div style="padding:14px; background:var(--bg-surface); border-radius:12px; margin-bottom:8px;">
            <div class="flex-between"><div>✅ <strong>${name}</strong></div><span class="badge-status badge-success">طبيعي</span></div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  async admin() {
    if (!isAdmin) {
      return `
        <div class="card" style="max-width:500px; margin:60px auto; text-align:center;">
          <div style="font-size:4rem;">🔐</div>
          <h2>الوصول للأدمن فقط</h2>
          <p class="text-secondary">ليس لديك صلاحية</p>
          <button class="btn btn-primary mt-20" onclick="navigate('home')">العودة</button>
        </div>
      `;
    }
    await Admin.loadStats();
    return Admin.render();
  }
};

// ============================================================
// ROUTER
// ============================================================
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
    if (!currentUser) return;
    const hash = window.location.hash.slice(1) || 'home';
    this.current = hash;
    document.querySelectorAll('.menu-item').forEach(link => {
      link.classList.toggle('active', link.dataset.route === hash);
    });
    const main = document.getElementById('main');
    const view = Views[hash];
    if (main && view) {
      const result = typeof view === 'function' ? view() : view;
      if (result instanceof Promise) {
        main.innerHTML = '<div class="loader active"><div class="loader-spinner"></div></div>';
        result.then(html => main.innerHTML = html);
      } else {
        main.innerHTML = result;
      }
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

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}

// ============================================================
// INITIALIZATION
// ============================================================
auth.onAuthStateChanged(async user => {
  if (user) {
    currentUser = user;
    document.getElementById('loginOverlay').style.display = 'none';
    await loadUserData();
    subscribeToUserData();
    checkMaintenanceMode();
    UI.updateBalance();
    UI.updateSidebarUser();
    Router.init();
    
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref && userData && !userData.referredBy && ref !== userData.referralCode) {
      await db.collection('users').doc(user.uid).update({ referredBy: ref });
      await processReferral(user.uid, ref);
      UI.toast('🎉 +500 عملة من الإحالة!');
    }
  } else {
    document.getElementById('loginOverlay').style.display = 'flex';
  }
});

document.addEventListener('DOMContentLoaded', initParticles);

document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.querySelector('.menu-toggle');
  if (window.innerWidth <= 768 && sidebar && menuToggle &&
      !sidebar.contains(e.target) && !menuToggle.contains(e.target) &&
      sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});
