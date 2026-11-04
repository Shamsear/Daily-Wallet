/**
 * Daily Wallet — Core Application Logic
 * No Emojis — Pure Monochrome Minimalist SVG Vectors & Swiss Typography
 * Offline-first, reactive state, rolling numbers, and PWA integration.
 */

// --- Category Vector SVGs (Monochrome, Swiss/Apple Style) ---
const CATEGORY_ICONS = {
  food: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  transport: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="8" rx="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M5 11l2-6h10l2 6"/></svg>`,
  shopping: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  bills: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2 3-2 3 2V8z"/><line x1="8" y1="8" x2="12" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  groceries: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  health: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  entertainment: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
  salary: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  freelance: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  allowance: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  gift: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  investment: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  other: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
  default_income: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 5 19 12"/></svg>`,
  default_expense: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`
};

function getCategorySvg(catId, type = 'expense') {
  if (catId && CATEGORY_ICONS[catId]) {
    return CATEGORY_ICONS[catId];
  }
  return type === 'income' ? CATEGORY_ICONS.default_income : CATEGORY_ICONS.default_expense;
}

// Categories list (pure clean text, no emojis)
const CATEGORIES = {
  expense: [
    { id: 'food', name: 'Food & Dining' },
    { id: 'transport', name: 'Transport & Fuel' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'bills', name: 'Bills & Utilities' },
    { id: 'groceries', name: 'Groceries' },
    { id: 'health', name: 'Health & Pharmacy' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'other', name: 'Other Expense' }
  ],
  income: [
    { id: 'salary', name: 'Monthly Salary' },
    { id: 'freelance', name: 'Freelance Work' },
    { id: 'allowance', name: 'Allowance / Transfer' },
    { id: 'gift', name: 'Gift / Bonus' },
    { id: 'investment', name: 'Investment Return' },
    { id: 'other', name: 'Other Income' }
  ]
};

// --- State Management ---
class WalletStore {
  constructor() {
    this.STORAGE_KEY = 'daily_wallet_transactions_v2';
    this.SETTINGS_KEY = 'daily_wallet_settings_v2';

    this.migrateOldData();

    this.transactions = this.loadTransactions();
    this.settings = this.loadSettings();

    this.activeView = 'tracker'; // 'tracker' | 'budget' | 'reports'
    this.activeScope = 'all'; // 'all' | 'today' | 'week'
    this.activeModalType = 'expense'; // 'income' | 'expense'
    this.currentBalanceNumber = this.getTotalBalance();
    this.hasInitiallyRendered = false;

    const now = new Date();
    this.reportYear = now.getFullYear();
    this.reportMonth = now.getMonth();
  }

  migrateOldData() {
    try {
      const v1 = localStorage.getItem('daily_wallet_transactions_v1');
      const v2 = localStorage.getItem(this.STORAGE_KEY);
      if (v1 && !v2) {
        localStorage.setItem(this.STORAGE_KEY, v1);
      }
    } catch (e) {}
  }

  loadTransactions() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse transactions', e);
      return [];
    }
  }

  saveTransactions() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.transactions));
    } catch (e) {
      console.error('Failed to save transactions', e);
    }
  }

  loadSettings() {
    try {
      const data = localStorage.getItem(this.SETTINGS_KEY);
      const defaults = {
        currency: 'QAR',
        currencyCode: 'QAR',
        budgetSource: 'balance',
        customMonthlyCap: 0
      };
      if (!data) return defaults;
      const parsed = JSON.parse(data);
      if (!parsed.currency || parsed.currency === '$') {
        parsed.currency = 'QAR';
        parsed.currencyCode = 'QAR';
      }
      return { ...defaults, ...parsed };
    } catch (e) {
      return { currency: 'QAR', currencyCode: 'QAR', budgetSource: 'balance', customMonthlyCap: 0 };
    }
  }

  saveSettings() {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }

  addTransaction(entry) {
    const newEntry = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      type: entry.type,
      amount: parseFloat(entry.amount),
      category: entry.category,
      categoryName: entry.categoryName,
      note: entry.note ? entry.note.trim() : '',
      date: entry.date || new Date().toISOString(),
      timestamp: entry.date ? new Date(entry.date).getTime() : Date.now()
    };

    this.transactions.unshift(newEntry);
    this.saveTransactions();
    return newEntry;
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveTransactions();
  }

  clearAllData() {
    this.transactions = [];
    this.saveTransactions();
  }

  getTotalBalance() {
    return this.transactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
  }

  getTodayStats() {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    let income = 0;
    let expense = 0;

    this.transactions.forEach(t => {
      const txDateStr = new Date(t.timestamp).toISOString().slice(0, 10);
      if (txDateStr === todayStr) {
        if (t.type === 'income') income += t.amount;
        if (t.type === 'expense') expense += t.amount;
      }
    });

    return {
      income,
      expense,
      net: income - expense
    };
  }

  getFilteredTransactions() {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const sorted = [...this.transactions].sort((a, b) => b.timestamp - a.timestamp);

    if (this.activeScope === 'today') {
      return sorted.filter(t => new Date(t.timestamp).toISOString().slice(0, 10) === todayStr);
    }

    if (this.activeScope === 'week') {
      const oneWeekAgo = now.getTime() - (7 * 24 * 60 * 60 * 1000);
      return sorted.filter(t => t.timestamp >= oneWeekAgo);
    }

    return sorted;
  }

  // --- Finish-The-Month Safe Daily Spend Engine ---
  getFinishMonthBudget() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysLeft = Math.max(1, totalDaysInMonth - currentDay + 1);

    let availableFunds = 0;
    if (this.settings.budgetSource === 'custom' && this.settings.customMonthlyCap > 0) {
      let monthExpenses = 0;
      this.transactions.forEach(t => {
        const d = new Date(t.timestamp);
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonth && t.type === 'expense') {
          monthExpenses += t.amount;
        }
      });
      availableFunds = Math.max(0, this.settings.customMonthlyCap - monthExpenses);
    } else {
      availableFunds = Math.max(0, this.getTotalBalance());
    }

    const dailyAllowance = daysLeft > 0 ? (availableFunds / daysLeft) : availableFunds;
    const todayStats = this.getTodayStats();
    const todaySpent = todayStats.expense;
    const remainingToday = dailyAllowance - todaySpent;
    const percentUsed = dailyAllowance > 0 ? Math.min(100, (todaySpent / dailyAllowance) * 100) : (todaySpent > 0 ? 100 : 0);

    const monthEndObj = new Date(currentYear, currentMonth + 1, 0);
    const monthEndStr = monthEndObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return {
      availableFunds,
      daysLeft,
      totalDaysInMonth,
      currentDay,
      dailyAllowance,
      todaySpent,
      remainingToday,
      percentUsed,
      monthEndStr
    };
  }

  // --- Monthly Report Analytics ---
  getMonthReport(year, month) {
    const monthTransactions = this.transactions.filter(t => {
      const d = new Date(t.timestamp);
      return d.getFullYear() === year && d.getMonth() === month;
    });

    let totalIn = 0;
    let totalOut = 0;
    const expenseCategories = {};
    const incomeCategories = {};

    monthTransactions.forEach(t => {
      const catId = t.category || 'other';
      const catName = t.categoryName || 'Other';

      if (t.type === 'income') {
        totalIn += t.amount;
        if (!incomeCategories[catId]) {
          incomeCategories[catId] = { id: catId, name: catName, amount: 0 };
        }
        incomeCategories[catId].amount += t.amount;
      } else {
        totalOut += t.amount;
        if (!expenseCategories[catId]) {
          expenseCategories[catId] = { id: catId, name: catName, amount: 0 };
        }
        expenseCategories[catId].amount += t.amount;
      }
    });

    const netSavings = totalIn - totalOut;
    const savingsRate = totalIn > 0 ? Math.round((netSavings / totalIn) * 100) : 0;

    const now = new Date();
    let daysPassed = new Date(year, month + 1, 0).getDate();
    if (year === now.getFullYear() && month === now.getMonth()) {
      daysPassed = Math.max(1, now.getDate());
    }
    const avgDailySpend = daysPassed > 0 ? (totalOut / daysPassed) : 0;

    const sortedExpenses = Object.values(expenseCategories).map(cat => ({
      id: cat.id,
      name: cat.name,
      amount: cat.amount,
      percent: totalOut > 0 ? Math.round((cat.amount / totalOut) * 100) : 0
    })).sort((a, b) => b.amount - a.amount);

    const sortedIncome = Object.values(incomeCategories).map(cat => ({
      id: cat.id,
      name: cat.name,
      amount: cat.amount,
      percent: totalIn > 0 ? Math.round((cat.amount / totalIn) * 100) : 0
    })).sort((a, b) => b.amount - a.amount);

    return {
      totalIn,
      totalOut,
      netSavings,
      savingsRate,
      avgDailySpend,
      txCount: monthTransactions.length,
      sortedExpenses,
      sortedIncome
    };
  }
}

// Instantiate Store
const store = new WalletStore();

// --- NumberFlow Inspired Smooth Rolling Counter ---
function animateNumber(element, start, end, duration = 400) {
  if (isNaN(start)) start = 0;
  if (isNaN(end)) end = 0;

  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = start + (end - start) * ease;

    element.textContent = formatCurrencyAmount(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = formatCurrencyAmount(end);
    }
  }

  requestAnimationFrame(update);
}

function formatCurrencyAmount(num) {
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// --- DOM Elements ---
// Views & Navigation
const viewTracker = document.getElementById('viewTracker');
const viewBudget = document.getElementById('viewBudget');
const viewReports = document.getElementById('viewReports');
const mainTabsNav = document.getElementById('mainTabsNav');
const tabIndicator = document.getElementById('tabIndicator');
const navTabs = document.querySelectorAll('.nav-tab');

// Tracker Elements
const heroBalance = document.getElementById('heroBalance');
const heroCurrencySymbol = document.getElementById('heroCurrencySymbol');
const currencyDisplayTag = document.getElementById('currencyDisplayTag');
const headerCurrencyPill = document.getElementById('headerCurrencyPill');
const heroDailySafeAmount = document.getElementById('heroDailySafeAmount');
const viewBudgetDetailLink = document.getElementById('viewBudgetDetailLink');
const todayInAmount = document.getElementById('todayInAmount');
const todayOutAmount = document.getElementById('todayOutAmount');
const todayNetBadge = document.getElementById('todayNetBadge');
const ledgerContainer = document.getElementById('ledgerContainer');
const emptyState = document.getElementById('emptyState');
const ledgerCountBadge = document.getElementById('ledgerCountBadge');

// Budget Elements ("Finish the Month")
const budgetCurrencySymbol = document.getElementById('budgetCurrencySymbol');
const budgetDailyAllowance = document.getElementById('budgetDailyAllowance');
const budgetDaysLeftBadge = document.getElementById('budgetDaysLeftBadge');
const gaugeNumbers = document.getElementById('gaugeNumbers');
const gaugeFill = document.getElementById('gaugeFill');
const gaugeStatusText = document.getElementById('gaugeStatusText');
const gaugeRemainingToday = document.getElementById('gaugeRemainingToday');
const calcTotalFunds = document.getElementById('calcTotalFunds');
const calcDaysLeft = document.getElementById('calcDaysLeft');
const calcMonthEnd = document.getElementById('calcMonthEnd');
const calcDailyResult = document.getElementById('calcDailyResult');
const smartAdviceText = document.getElementById('smartAdviceText');
const budgetSourceBalance = document.getElementById('budgetSourceBalance');
const budgetSourceCustom = document.getElementById('budgetSourceCustom');
const customBudgetInputGroup = document.getElementById('customBudgetInputGroup');
const customMonthlyCap = document.getElementById('customMonthlyCap');

// Reports Elements
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const reportCurrentMonthLabel = document.getElementById('reportCurrentMonthLabel');
const reportTotalIn = document.getElementById('reportTotalIn');
const reportTotalOut = document.getElementById('reportTotalOut');
const reportNetSavings = document.getElementById('reportNetSavings');
const reportSavingsRate = document.getElementById('reportSavingsRate');
const reportAvgDailySpend = document.getElementById('reportAvgDailySpend');
const reportTxCount = document.getElementById('reportTxCount');
const reportCategoryList = document.getElementById('reportCategoryList');
const reportIncomeCategoryList = document.getElementById('reportIncomeCategoryList');
const reportExpenseTotalBadge = document.getElementById('reportExpenseTotalBadge');
const reportIncomeTotalBadge = document.getElementById('reportIncomeTotalBadge');

// Modals & Forms
const entryModal = document.getElementById('entryModal');
const entryForm = document.getElementById('entryForm');
const modalTitle = document.getElementById('modalTitle');
const modalTypeBadge = document.getElementById('modalTypeBadge');
const modalCurrencySymbol = document.getElementById('modalCurrencySymbol');
const entryType = document.getElementById('entryType');
const entryAmount = document.getElementById('entryAmount');
const entryNote = document.getElementById('entryNote');
const entryDate = document.getElementById('entryDate');
const categoryGrid = document.getElementById('categoryGrid');
const selectedCategoryInput = document.getElementById('selectedCategory');
const saveEntryBtn = document.getElementById('saveEntryBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

const addIncomeBtn = document.getElementById('addIncomeBtn');
const addExpenseBtn = document.getElementById('addExpenseBtn');

const settingsDrawer = document.getElementById('settingsDrawer');
const openSettingsBtn = document.getElementById('openSettingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const currencySelect = document.getElementById('currencySelect');
const exportCsvBtn = document.getElementById('exportCsvBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const importJsonFile = document.getElementById('importJsonFile');
const clearDataBtn = document.getElementById('clearDataBtn');

const connectionStatus = document.getElementById('connectionStatus');
const toastContainer = document.getElementById('toastContainer');

// --- Toast System ---
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 200);
  }, duration);
}

// --- Apple Segmented Tab Indicator Controller ---
function updateTabIndicator(activeTabElement, animated = true) {
  if (!activeTabElement) {
    activeTabElement = document.querySelector('.nav-tab.active') || navTabs[0];
  }
  if (!activeTabElement || !tabIndicator || !mainTabsNav) return;

  if (!animated) {
    tabIndicator.classList.add('no-transition');
  }

  const navRect = mainTabsNav.getBoundingClientRect();
  const tabRect = activeTabElement.getBoundingClientRect();

  // If elements aren't yet laid out or in background, fallback to offsetLeft / offsetWidth
  const leftOffset = navRect.width > 0 
    ? (tabRect.left - navRect.left) 
    : activeTabElement.offsetLeft;
  const width = tabRect.width > 0 ? tabRect.width : activeTabElement.offsetWidth;

  tabIndicator.style.transform = `translate3d(${leftOffset}px, 0, 0)`;
  tabIndicator.style.width = `${width}px`;
  tabIndicator.classList.add('ready');

  if (!animated) {
    void tabIndicator.offsetWidth; // Force layout flush
    tabIndicator.classList.remove('no-transition');
  }
}

// Window resize listener to keep pill aligned
window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.nav-tab.active');
  if (activeTab) {
    updateTabIndicator(activeTab, false);
  }
});

// Tab view sequence order for directional physical sliding
const TAB_VIEW_ORDER = ['tracker', 'budget', 'reports'];

// --- Navigation / View Switching (Apple Spring Fluid Motion) ---
function switchView(viewName) {
  if (store.activeView === viewName) return;

  const prevIdx = TAB_VIEW_ORDER.indexOf(store.activeView);
  const nextIdx = TAB_VIEW_ORDER.indexOf(viewName);
  const directionClass = nextIdx >= prevIdx ? 'tab-enter-forward' : 'tab-enter-backward';

  store.activeView = viewName;

  let targetTab = null;
  navTabs.forEach(tab => {
    if (tab.dataset.view === viewName) {
      tab.classList.add('active');
      targetTab = tab;
    } else {
      tab.classList.remove('active');
    }
  });

  if (targetTab) {
    updateTabIndicator(targetTab, true);
  }

  const allViews = [
    { name: 'tracker', el: viewTracker, render: renderTracker },
    { name: 'budget', el: viewBudget, render: renderBudgetView },
    { name: 'reports', el: viewReports, render: renderReportsView }
  ];

  allViews.forEach(v => {
    v.el.classList.remove('active', 'tab-enter-forward', 'tab-enter-backward');
    if (v.name === viewName) {
      v.el.classList.add('active', directionClass);
      v.render();
      setTimeout(() => {
        v.el.classList.remove('tab-enter-forward', 'tab-enter-backward');
      }, 300);
    }
  });
}

navTabs.forEach(tab => {
  tab.addEventListener('click', () => switchView(tab.dataset.view));
});

viewBudgetDetailLink.addEventListener('click', () => switchView('budget'));

// --- VIEW 1: Render Tracker (Zero-Flicker & Instant Steady Display) ---
function renderTracker() {
  const sym = store.settings.currency;
  heroCurrencySymbol.textContent = sym;
  modalCurrencySymbol.textContent = sym;
  currencyDisplayTag.textContent = sym;
  headerCurrencyPill.textContent = `${store.settings.currencyCode} (${sym === 'QAR' ? 'ر.ق' : sym})`;

  const newBalance = store.getTotalBalance();
  // Only animate if balance has genuinely changed after initial render
  if (store.hasInitiallyRendered && Math.abs(newBalance - store.currentBalanceNumber) > 0.001) {
    animateNumber(heroBalance, store.currentBalanceNumber, newBalance, 250);
  } else {
    heroBalance.textContent = formatCurrencyAmount(newBalance);
  }
  store.currentBalanceNumber = newBalance;
  store.hasInitiallyRendered = true;

  const budgetInfo = store.getFinishMonthBudget();
  heroDailySafeAmount.textContent = `${sym} ${formatCurrencyAmount(budgetInfo.dailyAllowance)}`;

  const todayStats = store.getTodayStats();
  todayInAmount.textContent = `+${sym} ${formatCurrencyAmount(todayStats.income)}`;
  todayOutAmount.textContent = `-${sym} ${formatCurrencyAmount(todayStats.expense)}`;

  const netSign = todayStats.net > 0 ? '+' : todayStats.net < 0 ? '-' : '';
  todayNetBadge.textContent = `${netSign}${sym} ${formatCurrencyAmount(Math.abs(todayStats.net))}`;
  todayNetBadge.className = 'net-badge ' + (
    todayStats.net > 0 ? 'positive' : todayStats.net < 0 ? 'negative' : 'neutral'
  );

  renderLedger();
  renderDesktopIntelligence();
}

// --- Desktop Side Panel Intelligence ---
function renderDesktopIntelligence() {
  const sym = store.settings.currency;
  const info = store.getFinishMonthBudget();

  const dtCurrencySymbol = document.getElementById('dtCurrencySymbol');
  const dtDailyAllowance = document.getElementById('dtDailyAllowance');
  const dtDaysLeftBadge = document.getElementById('dtDaysLeftBadge');
  const dtGaugeNumbers = document.getElementById('dtGaugeNumbers');
  const dtGaugeFill = document.getElementById('dtGaugeFill');
  const dtGaugeStatusText = document.getElementById('dtGaugeStatusText');
  const dtGaugeRemainingToday = document.getElementById('dtGaugeRemainingToday');
  const dtMonthSpent = document.getElementById('dtMonthSpent');
  const dtMonthSavingsRate = document.getElementById('dtMonthSavingsRate');
  const dtTotalExpenseBadge = document.getElementById('dtTotalExpenseBadge');
  const dtCategoryList = document.getElementById('dtCategoryList');

  if (!dtDailyAllowance) return;

  dtCurrencySymbol.textContent = sym;
  dtDailyAllowance.textContent = formatCurrencyAmount(info.dailyAllowance);
  dtDaysLeftBadge.textContent = `${info.daysLeft} days left`;

  dtGaugeNumbers.textContent = `${sym} ${formatCurrencyAmount(info.todaySpent)} of ${sym} ${formatCurrencyAmount(info.dailyAllowance)}`;
  dtGaugeFill.style.width = `${info.percentUsed}%`;

  if (info.percentUsed > 100) {
    dtGaugeFill.className = 'progress-bar-fill danger';
  } else if (info.percentUsed > 80) {
    dtGaugeFill.className = 'progress-bar-fill warning';
  } else {
    dtGaugeFill.className = 'progress-bar-fill';
  }

  if (info.todaySpent === 0) {
    dtGaugeStatusText.textContent = 'No expenses logged today.';
    dtGaugeRemainingToday.textContent = `${sym} ${formatCurrencyAmount(info.dailyAllowance)} left today`;
    dtGaugeRemainingToday.style.color = 'var(--income-main)';
  } else if (info.remainingToday >= 0) {
    dtGaugeStatusText.textContent = 'Under daily allowance.';
    dtGaugeRemainingToday.textContent = `${sym} ${formatCurrencyAmount(info.remainingToday)} left today`;
    dtGaugeRemainingToday.style.color = 'var(--income-main)';
  } else {
    const overAmount = Math.abs(info.remainingToday);
    dtGaugeStatusText.textContent = 'Exceeded today\'s allowance.';
    dtGaugeRemainingToday.textContent = `Over by ${sym} ${formatCurrencyAmount(overAmount)}`;
    dtGaugeRemainingToday.style.color = 'var(--expense-main)';
  }

  const now = new Date();
  const report = store.getMonthReport(now.getFullYear(), now.getMonth());

  dtMonthSpent.textContent = `${sym} ${formatCurrencyAmount(report.totalOut)}`;
  dtMonthSavingsRate.textContent = `${report.savingsRate}%`;
  dtTotalExpenseBadge.textContent = `${sym} ${formatCurrencyAmount(report.totalOut)}`;

  if (report.sortedExpenses.length === 0) {
    dtCategoryList.innerHTML = `<p class="empty-desc" style="padding: 0.5rem 0; font-size: 0.8125rem;">No spending recorded this month.</p>`;
  } else {
    let html = '';
    report.sortedExpenses.slice(0, 4).forEach(cat => {
      const catSvg = getCategorySvg(cat.id, 'expense');
      html += `
        <div class="category-bar-item">
          <div class="cat-bar-header">
            <span class="cat-bar-name"><span class="cat-svg">${catSvg}</span> <span>${cat.name}</span></span>
            <span class="cat-bar-amount">${sym} ${formatCurrencyAmount(cat.amount)} <small style="color:var(--text-muted);">(${cat.percent}%)</small></span>
          </div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill" style="width: ${cat.percent}%;"></div>
          </div>
        </div>
      `;
    });
    dtCategoryList.innerHTML = html;
  }
}

// --- Render Ledger List ---
function renderLedger() {
  const transactions = store.getFilteredTransactions();
  const sym = store.settings.currency;

  ledgerCountBadge.textContent = `${transactions.length} ${transactions.length === 1 ? 'entry' : 'entries'}`;

  if (transactions.length === 0) {
    ledgerContainer.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  const groups = {};
  transactions.forEach(tx => {
    const d = new Date(tx.timestamp);
    const dateKey = d.toISOString().slice(0, 10);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(tx);
  });

  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const yesterdayKey = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);

  let html = '';

  Object.keys(groups).forEach(dateKey => {
    const dayTransactions = groups[dateKey];
    
    let dayTitle = '';
    if (dateKey === todayKey) {
      dayTitle = 'Today';
    } else if (dateKey === yesterdayKey) {
      dayTitle = 'Yesterday';
    } else {
      const parts = dateKey.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      dayTitle = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    let dayNet = 0;
    dayTransactions.forEach(t => {
      dayNet += (t.type === 'income' ? t.amount : -t.amount);
    });

    const netClass = dayNet > 0 ? 'positive' : dayNet < 0 ? 'negative' : 'neutral';
    const netSign = dayNet > 0 ? '+' : dayNet < 0 ? '-' : '';
    const dayNetDisplay = `${netSign}${sym} ${formatCurrencyAmount(Math.abs(dayNet))}`;

    html += `
      <div class="day-group">
        <div class="day-header">
          <span class="day-title">${dayTitle}</span>
          <span class="day-net ${netClass}">${dayNetDisplay}</span>
        </div>
    `;

    dayTransactions.forEach(tx => {
      const isIncome = tx.type === 'income';
      const sign = isIncome ? '+' : '-';
      const timeStr = new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const displayDesc = tx.note || tx.categoryName;
      const subInfo = tx.note ? `${tx.categoryName} • ${timeStr}` : timeStr;
      const iconSvg = getCategorySvg(tx.category, tx.type);

      html += `
        <div class="entry-card ${tx.type}" data-id="${tx.id}">
          <div class="entry-left">
            <div class="category-icon">${iconSvg}</div>
            <div class="entry-details">
              <span class="entry-category-name">${escapeHtml(displayDesc)}</span>
              <span class="entry-note">${escapeHtml(subInfo)}</span>
            </div>
          </div>
          <div class="entry-right">
            <span class="entry-amount-val">${sign}${sym} ${formatCurrencyAmount(tx.amount)}</span>
            <button class="delete-entry-btn" data-id="${tx.id}" title="Delete entry" aria-label="Delete entry">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  });

  ledgerContainer.innerHTML = html;

  ledgerContainer.querySelectorAll('.delete-entry-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (confirm('Delete this transaction?')) {
        store.deleteTransaction(id);
        renderTracker();
        showToast('Entry deleted');
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// --- VIEW 2: Render "Finish the Month" Safe Daily Spend ---
function renderBudgetView() {
  const sym = store.settings.currency;
  const info = store.getFinishMonthBudget();

  budgetCurrencySymbol.textContent = sym;
  budgetDailyAllowance.textContent = formatCurrencyAmount(info.dailyAllowance);
  budgetDaysLeftBadge.textContent = `${info.daysLeft} days left`;

  gaugeNumbers.textContent = `${sym} ${formatCurrencyAmount(info.todaySpent)} of ${sym} ${formatCurrencyAmount(info.dailyAllowance)}`;
  gaugeFill.style.width = `${info.percentUsed}%`;

  if (info.percentUsed > 100) {
    gaugeFill.className = 'progress-bar-fill danger';
  } else if (info.percentUsed > 80) {
    gaugeFill.className = 'progress-bar-fill warning';
  } else {
    gaugeFill.className = 'progress-bar-fill';
  }

  if (info.todaySpent === 0) {
    gaugeStatusText.textContent = 'No expenses logged today.';
    gaugeRemainingToday.textContent = `${sym} ${formatCurrencyAmount(info.dailyAllowance)} left today`;
    gaugeRemainingToday.style.color = 'var(--income-main)';
  } else if (info.remainingToday >= 0) {
    gaugeStatusText.textContent = 'Under daily allowance.';
    gaugeRemainingToday.textContent = `${sym} ${formatCurrencyAmount(info.remainingToday)} left today`;
    gaugeRemainingToday.style.color = 'var(--income-main)';
  } else {
    const overAmount = Math.abs(info.remainingToday);
    gaugeStatusText.textContent = 'Exceeded today\'s allowance.';
    gaugeRemainingToday.textContent = `Over by ${sym} ${formatCurrencyAmount(overAmount)}`;
    gaugeRemainingToday.style.color = 'var(--expense-main)';
  }

  calcTotalFunds.textContent = `${sym} ${formatCurrencyAmount(info.availableFunds)}`;
  calcDaysLeft.textContent = `${info.daysLeft} days`;
  calcMonthEnd.textContent = info.monthEndStr;
  calcDailyResult.textContent = `${sym} ${formatCurrencyAmount(info.dailyAllowance)} / day`;

  if (info.availableFunds <= 0) {
    smartAdviceText.textContent = `Your remaining funds are 0. Add incoming money to restore your daily spending allowance.`;
  } else if (info.remainingToday >= 0) {
    smartAdviceText.textContent = `You can spend up to ${sym} ${formatCurrencyAmount(info.remainingToday)} more today without hurting your budget. Any money you don't spend today rolls over to future days.`;
  } else {
    const nextDaysAllowance = info.daysLeft > 1 ? (Math.max(0, info.availableFunds - info.todaySpent) / (info.daysLeft - 1)) : 0;
    smartAdviceText.textContent = `You spent ${sym} ${formatCurrencyAmount(Math.abs(info.remainingToday))} over today. Your daily allowance for the rest of the month adjusts to approximately ${sym} ${formatCurrencyAmount(nextDaysAllowance)}/day so you still finish even.`;
  }

  if (store.settings.budgetSource === 'custom') {
    budgetSourceCustom.checked = true;
    customBudgetInputGroup.style.display = 'flex';
    customMonthlyCap.value = store.settings.customMonthlyCap || '';
  } else {
    budgetSourceBalance.checked = true;
    customBudgetInputGroup.style.display = 'none';
  }
}

budgetSourceBalance.addEventListener('change', () => {
  store.settings.budgetSource = 'balance';
  store.saveSettings();
  customBudgetInputGroup.style.display = 'none';
  renderBudgetView();
  showToast('Budget calculated from actual balance');
});

budgetSourceCustom.addEventListener('change', () => {
  store.settings.budgetSource = 'custom';
  store.saveSettings();
  customBudgetInputGroup.style.display = 'flex';
  renderBudgetView();
});

customMonthlyCap.addEventListener('change', (e) => {
  const val = parseFloat(e.target.value) || 0;
  store.settings.customMonthlyCap = val;
  store.saveSettings();
  renderBudgetView();
  showToast(`Monthly budget set to ${store.settings.currency} ${val}`);
});

// --- VIEW 3: Render Full Financial Report ---
function renderReportsView() {
  const sym = store.settings.currency;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  reportCurrentMonthLabel.textContent = `${monthNames[store.reportMonth]} ${store.reportYear}`;

  const report = store.getMonthReport(store.reportYear, store.reportMonth);

  reportTotalIn.textContent = `${sym} ${formatCurrencyAmount(report.totalIn)}`;
  reportTotalOut.textContent = `${sym} ${formatCurrencyAmount(report.totalOut)}`;
  
  const netSign = report.netSavings >= 0 ? '+' : '-';
  reportNetSavings.textContent = `${netSign}${sym} ${formatCurrencyAmount(Math.abs(report.netSavings))}`;
  reportSavingsRate.textContent = `${report.savingsRate}%`;

  reportAvgDailySpend.textContent = `${sym} ${formatCurrencyAmount(report.avgDailySpend)} / day`;
  reportTxCount.textContent = `${report.txCount} logged`;

  reportExpenseTotalBadge.textContent = `${sym} ${formatCurrencyAmount(report.totalOut)}`;
  reportIncomeTotalBadge.textContent = `${sym} ${formatCurrencyAmount(report.totalIn)}`;

  // Render Expense Categories
  if (report.sortedExpenses.length === 0) {
    reportCategoryList.innerHTML = `<p class="empty-desc" style="padding: 1rem 0;">No expenses recorded for this month.</p>`;
  } else {
    let expHtml = '';
    report.sortedExpenses.forEach(cat => {
      const catSvg = getCategorySvg(cat.id, 'expense');
      expHtml += `
        <div class="category-bar-item">
          <div class="cat-bar-header">
            <span class="cat-bar-name"><span class="cat-svg">${catSvg}</span> <span>${cat.name}</span></span>
            <span class="cat-bar-amount">${sym} ${formatCurrencyAmount(cat.amount)} <small style="color:var(--text-muted);">(${cat.percent}%)</small></span>
          </div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill" style="width: ${cat.percent}%;"></div>
          </div>
        </div>
      `;
    });
    reportCategoryList.innerHTML = expHtml;
  }

  // Render Income Sources
  if (report.sortedIncome.length === 0) {
    reportIncomeCategoryList.innerHTML = `<p class="empty-desc" style="padding: 1rem 0;">No income logged for this month.</p>`;
  } else {
    let incHtml = '';
    report.sortedIncome.forEach(cat => {
      const catSvg = getCategorySvg(cat.id, 'income');
      incHtml += `
        <div class="category-bar-item">
          <div class="cat-bar-header">
            <span class="cat-bar-name"><span class="cat-svg">${catSvg}</span> <span>${cat.name}</span></span>
            <span class="cat-bar-amount">${sym} ${formatCurrencyAmount(cat.amount)} <small style="color:var(--text-muted);">(${cat.percent}%)</small></span>
          </div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill income-bar" style="width: ${cat.percent}%;"></div>
          </div>
        </div>
      `;
    });
    reportIncomeCategoryList.innerHTML = incHtml;
  }
}

prevMonthBtn.addEventListener('click', () => {
  store.reportMonth--;
  if (store.reportMonth < 0) {
    store.reportMonth = 11;
    store.reportYear--;
  }
  renderReportsView();
});

nextMonthBtn.addEventListener('click', () => {
  store.reportMonth++;
  if (store.reportMonth > 11) {
    store.reportMonth = 0;
    store.reportYear++;
  }
  renderReportsView();
});

// --- Category Grid Rendering in Form ---
function renderCategorySelector(type) {
  const categories = CATEGORIES[type] || CATEGORIES.expense;
  categoryGrid.innerHTML = '';

  categories.forEach((cat, index) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `category-chip ${index === 0 ? 'selected' : ''}`;
    chip.dataset.id = cat.id;
    chip.dataset.name = cat.name;
    chip.innerHTML = `<span>${getCategorySvg(cat.id, type)}</span> <span>${cat.name}</span>`;

    chip.addEventListener('click', () => {
      categoryGrid.querySelectorAll('.category-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedCategoryInput.value = cat.id;
    });

    categoryGrid.appendChild(chip);
  });

  selectedCategoryInput.value = categories[0].id;
}

// --- Entry Modal Open/Close ---
function openEntryModal(type) {
  store.activeModalType = type;
  entryType.value = type;

  const isIncome = type === 'income';
  modalTitle.textContent = isIncome ? 'Record Income' : 'Record Expense';
  modalTypeBadge.textContent = isIncome ? 'Money In' : 'Money Out';
  modalTypeBadge.className = `modal-type-badge ${type}`;
  saveEntryBtn.className = `submit-btn ${type}`;

  entryForm.reset();
  entryAmount.value = '';
  
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
  entryDate.value = localISOTime;

  renderCategorySelector(type);

  entryModal.classList.add('active');
  entryModal.setAttribute('aria-hidden', 'false');

  setTimeout(() => entryAmount.focus(), 150);
}

function closeEntryModal() {
  entryModal.classList.remove('active');
  entryModal.setAttribute('aria-hidden', 'true');
}

addIncomeBtn.addEventListener('click', () => openEntryModal('income'));
addExpenseBtn.addEventListener('click', () => openEntryModal('expense'));
closeModalBtn.addEventListener('click', closeEntryModal);

entryModal.addEventListener('click', (e) => {
  if (e.target === entryModal) closeEntryModal();
});

// Form Submission
entryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const amountVal = parseFloat(entryAmount.value);
  if (!amountVal || amountVal <= 0) {
    entryAmount.focus();
    showToast('Please enter a valid amount');
    return;
  }

  const selectedChip = categoryGrid.querySelector('.category-chip.selected');
  const catName = selectedChip ? selectedChip.dataset.name : 'General';

  store.addTransaction({
    type: entryType.value,
    amount: amountVal,
    category: selectedCategoryInput.value,
    categoryName: catName,
    note: entryNote.value,
    date: entryDate.value ? new Date(entryDate.value).toISOString() : new Date().toISOString()
  });

  closeEntryModal();
  renderTracker();
  if (store.activeView === 'budget') renderBudgetView();
  if (store.activeView === 'reports') renderReportsView();

  showToast(entryType.value === 'income' ? 'Income added successfully' : 'Expense recorded');
});

// Scope Switcher
document.querySelectorAll('.scope-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.scope-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    store.activeScope = btn.dataset.scope;
    renderLedger();
  });
});

// Settings Drawer
openSettingsBtn.addEventListener('click', () => {
  settingsDrawer.classList.add('active');
  settingsDrawer.setAttribute('aria-hidden', 'false');
});

closeSettingsBtn.addEventListener('click', () => {
  settingsDrawer.classList.remove('active');
  settingsDrawer.setAttribute('aria-hidden', 'true');
});

settingsDrawer.addEventListener('click', (e) => {
  if (e.target === settingsDrawer) {
    settingsDrawer.classList.remove('active');
    settingsDrawer.setAttribute('aria-hidden', 'true');
  }
});

// Currency Selection
currencySelect.value = store.settings.currency;
currencySelect.addEventListener('change', (e) => {
  const selectedOpt = e.target.selectedOptions[0];
  store.settings.currency = e.target.value;
  store.settings.currencyCode = selectedOpt.dataset.code || e.target.value;
  store.saveSettings();

  renderTracker();
  if (store.activeView === 'budget') renderBudgetView();
  if (store.activeView === 'reports') renderReportsView();

  showToast(`Currency updated to ${store.settings.currencyCode}`);
});

// Export CSV
exportCsvBtn.addEventListener('click', () => {
  if (store.transactions.length === 0) {
    showToast('No transactions to export');
    return;
  }

  let csvContent = 'Date,Time,Type,Category,Amount,Currency,Note\n';
  store.transactions.forEach(t => {
    const d = new Date(t.timestamp);
    const dateStr = d.toISOString().slice(0, 10);
    const timeStr = d.toLocaleTimeString();
    const cleanNote = (t.note || '').replace(/"/g, '""');
    csvContent += `"${dateStr}","${timeStr}","${t.type}","${t.categoryName}",${t.amount},"${store.settings.currencyCode}","${cleanNote}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `daily_wallet_qar_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('CSV export downloaded');
});

// Export JSON Backup
exportJsonBtn.addEventListener('click', () => {
  const backupData = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    settings: store.settings,
    transactions: store.transactions
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `daily_wallet_qar_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('JSON backup downloaded');
});

// Import JSON Backup
importJsonFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.transactions)) {
        if (confirm(`Found ${data.transactions.length} records. Import and restore?`)) {
          store.transactions = data.transactions;
          if (data.settings) store.settings = data.settings;
          store.saveTransactions();
          store.saveSettings();

          currencySelect.value = store.settings.currency;
          renderTracker();
          showToast('Backup restored successfully');
          settingsDrawer.classList.remove('active');
        }
      } else {
        showToast('Invalid backup file format');
      }
    } catch (err) {
      showToast('Error reading backup file');
      console.error(err);
    }
    importJsonFile.value = '';
  };
  reader.readAsText(file);
});

// Clear Data
clearDataBtn.addEventListener('click', () => {
  if (confirm('Delete ALL logged transactions? This cannot be undone.')) {
    store.clearAllData();
    renderTracker();
    showToast('All transactions cleared');
    settingsDrawer.classList.remove('active');
  }
});

// Online / Offline Detection
function updateConnectivityUI() {
  const isOnline = navigator.onLine;
  if (isOnline) {
    connectionStatus.className = 'status-pill online';
    connectionStatus.querySelector('.status-text').textContent = 'Online';
    showToast('Connected online');
  } else {
    connectionStatus.className = 'status-pill offline';
    connectionStatus.querySelector('.status-text').textContent = 'Offline Mode';
    showToast('Offline mode — entries saved locally');
  }
}

window.addEventListener('online', updateConnectivityUI);
window.addEventListener('offline', updateConnectivityUI);

if (!navigator.onLine) {
  connectionStatus.className = 'status-pill offline';
  connectionStatus.querySelector('.status-text').textContent = 'Offline Mode';
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showToast('App updated in background');
            }
          });
        });
      })
      .catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
  });
}

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEntryModal();
    settingsDrawer.classList.remove('active');
  }
});

// Boot Application (Instant Zero-Flicker Init)
function initApp() {
  renderTracker();
  const activeTab = document.querySelector('.nav-tab.active');
  if (activeTab) {
    updateTabIndicator(activeTab, false);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
