/**
 * Moolah Prototype - Core Application Logic
 */

// --- Global State ---
let currentTier = 2; // Users start at Tier 2

// --- Content Database ---
const pageContent = {
    'cpf-basics': {
        meta: 'Finance Module · 3 Min Read',
        title: 'CPF Ordinary Account (OA) Basics',
        body: `
            <p><strong>What is the CPF OA?</strong></p>
            <p>The Ordinary Account (OA) is primarily meant for your housing, insurance, investment, and education needs.</p>
            <div class="bg-[#EEF5F3] p-4 rounded-2xl my-3 border border-[#569B91]/40">
                <p class="text-[#113A3E] font-bold text-xs"><i class="fa-solid fa-lightbulb mr-1"></i> Current Interest Rate: Up to 3.5% per annum.</p>
            </div>
            <p>When you start working, 20% of your paycheck goes into your CPF. Your employer also contributes an additional 17%.</p>
            <p><strong>Pro Tip:</strong> Many youths use their OA savings to pay for their first BTO downpayment!</p>
        `
    },
    'cpf-sa': {
        meta: 'Finance Module · 2 Min Read',
        title: 'CPF Special Account (SA)',
        body: `
            <p><strong>What is the CPF SA?</strong></p>
            <p>Your Special Account is strictly meant for your retirement needs.</p>
            <div class="bg-[#EEF5F3] p-4 rounded-2xl my-3 border border-[#569B91]/40">
                <p class="text-[#113A3E] font-bold text-xs"><i class="fa-solid fa-lightbulb mr-1"></i> Current Interest Rate: Up to 4.08% per annum.</p>
            </div>
            <p>Unlike the Ordinary Account (OA), you cannot use these funds for housing or education. Because it compounds at a higher interest rate, many young adults choose to do a voluntary transfer from their OA to their SA to supercharge their retirement savings.</p>
        `
    },
    'etf-basics': {
        meta: 'Investing Module · Infographic',
        title: 'What is an ETF?',
        body: `
            <p><strong>Exchange Traded Funds (ETFs)</strong></p>
            <p>Imagine buying a basket of fruits instead of just one apple. An ETF is exactly that, but for stocks! It allows you to invest in a basket of different companies all at once.</p>
            <ul class="list-disc pl-5 mt-4 space-y-3 text-gray-600">
                <li><strong>Instant Diversification:</strong> Spreads your risk across many companies instead of relying on one.</li>
                <li><strong>Low Cost:</strong> Generally cheaper to manage than mutual funds.</li>
                <li><strong>Beginner Friendly:</strong> Examples include the Straits Times Index (STI) ETF which tracks the top 30 companies in Singapore.</li>
            </ul>
        `
    },
    'invest-ssb': {
        meta: 'Investing Module · 4 Min Read',
        title: 'Singapore Savings Bonds (SSB)',
        body: `
            <p><strong>The Safe Haven for Cash</strong></p>
            <p>Singapore Savings Bonds are low-risk bonds fully backed by the Singapore Government.</p>
            <ul class="list-disc pl-5 mt-4 space-y-3 text-gray-600">
                <li><strong>Capital Guaranteed:</strong> You will always get your original investment amount back.</li>
                <li><strong>Flexible:</strong> You can withdraw your money in any month without penalty.</li>
                <li><strong>Low Barrier:</strong> You can start investing from as little as $500.</li>
            </ul>
        `
    },
    'budget-rule': {
        meta: 'Budgeting Module · 2 Min Read',
        title: 'The 50/30/20 Rule',
        body: `
            <p><strong>How to split your take-home pay:</strong></p>
            <ul class="list-disc pl-5 mt-4 space-y-3 text-gray-600">
                <li><strong>50% Needs:</strong> Rent, groceries, transport, utilities.</li>
                <li><strong>30% Wants:</strong> Matcha, concerts, dining out.</li>
                <li><strong>20% Savings & Investing:</strong> Emergency fund, ETFs, SSB.</li>
            </ul>
            <p class="mt-4">Automate the 20% the moment your paycheck hits your account so you don't accidentally spend it!</p>
        `
    },
    'budget-creep': {
        meta: 'Budgeting Module · 3 Min Read',
        title: 'Managing Lifestyle Creep',
        body: `
            <p><strong>What happens when you get a raise?</strong></p>
            <p>Lifestyle creep occurs when your discretionary consumption increases as your income increases. Suddenly, what used to be a luxury (like taking Grab every day or frequent fine dining) becomes a "necessity".</p>
            <p class="mt-4"><strong>How to beat it:</strong> Whenever your income increases, commit to allocating at least 50% of the *increase* directly into your savings or investments before upgrading your lifestyle.</p>
        `
    },
    'news-ssb': {
        meta: 'Straits Times · Tier 1 News',
        title: 'MAS Announces New SSB Rates',
        body: `
            <p>The Monetary Authority of Singapore (MAS) has released the latest interest rates for the upcoming Singapore Savings Bonds (SSB).</p>
            <p class="mt-3"><strong>Why youths care:</strong> SSBs are one of the safest places to park your emergency funds. They are fully backed by the Singapore Government, and you can withdraw your money in any given month without penalty.</p>
        `
    },
    'news-genz': {
        meta: 'CNA · Tier 2 News',
        title: 'Why Gen Z is pivoting to High-Yield accounts',
        body: `
            <p>Gen Z and millennials in Singapore are actively shifting their funds to high-yield accounts.</p>
            <p class="mt-3">Banks like DBS (Multiplier), UOB (One), and OCBC (360) are offering competitive tiered interest rates up to 7% for users who credit their salary and spend via credit cards.</p>
        `
    },
    'news-reits': {
        meta: 'Business Times · Tier 3 News',
        title: 'Advanced: Intro to Singapore REITs',
        body: `
            <p><strong>Real Estate Investment Trusts (REITs)</strong></p>
            <p>REITs allow you to invest in large-scale income-producing real estate (like shopping malls or office buildings) without having to buy the whole property yourself.</p>
            <p class="mt-3">Singapore is one of the largest REIT markets in Asia, offering attractive dividend yields for investors looking for steady passive income.</p>
        `
    }
};

// --- View Content & Notifications ---
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if(toast && toastMsg) {
        toastMsg.innerText = message;
        toast.classList.remove('opacity-0', '-translate-y-10', 'pointer-events-none');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', '-translate-y-10', 'pointer-events-none');
        }, 3000);
    }
}

function openContent(id) {
    const data = pageContent[id];
    if(!data) return;

    document.getElementById('content-meta').innerText = data.meta;
    document.getElementById('content-title').innerText = data.title;
    document.getElementById('content-body').innerHTML = data.body;

    switchView('content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchView(viewId) {
    const screens = ['onboarding', 'dashboard', 'learn', 'simulate', 'content', 'quiz'];
    
    screens.forEach(screen => {
        const screenEl = document.getElementById(`screen-${screen}`);
        if(screenEl) screenEl.classList.add('hidden');
        
        const tab = document.getElementById(`tab-${screen}`);
        if (tab) {
            tab.classList.remove('text-[#569B91]');
            tab.classList.add('text-gray-400');
        }
    });

    const targetScreen = document.getElementById(`screen-${viewId}`);
    if(targetScreen) targetScreen.classList.remove('hidden');
    
    let activeNavId = (viewId === 'content' || viewId === 'quiz') ? 'learn' : viewId;
    if(viewId === 'quiz') activeNavId = 'dashboard'; // Quiz is launched from dashboard
    
    const activeTab = document.getElementById(`tab-${activeNavId}`);
    if (activeTab) {
        activeTab.classList.remove('text-gray-400');
        activeTab.classList.add('text-[#569B91]');
    }
}

// --- Upskill Quiz Logic & Tier Algorithm ---
function checkQuizAnswer(answer) {
    if(answer === 'correct') {
        showToast("Correct! 🏆 Upgraded to Tier 3: Investor");
        currentTier = 3;
        updateTierUI();
        switchView('dashboard');
    } else {
        showToast("Oops! Review the Budgeting modules and try again.");
    }
}

function updateTierUI() {
    // 1. Update the Dashboard Visuals
    const titleEl = document.getElementById('tier-title');
    const progEl = document.getElementById('tier-progress');
    const subEl = document.getElementById('tier-subtitle');
    const iconEl = document.getElementById('tier-icon');
    const quizBtn = document.getElementById('quiz-btn');

    if(titleEl) titleEl.innerText = "Tier 3: Investor";
    if(progEl) progEl.style.width = "100%";
    if(subEl) subEl.innerText = "Max Tier Reached!";
    if(iconEl) iconEl.innerText = "🌳";
    if(quizBtn) quizBtn.classList.add('hidden');
    
    // 2. Update News Section in Learn Tab
    const newsBadge = document.getElementById('news-tier-badge');
    if(newsBadge) {
        newsBadge.innerText = "Tier 3 News";
        newsBadge.classList.replace('bg-[#113A3E]', 'bg-[#569B91]');
        newsBadge.classList.replace('text-[#EEF5F3]', 'text-[#0A2528]');
    }
    
    // 3. Unlock Advanced Content dynamically
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const cardTier = parseInt(card.getAttribute('data-tier')) || 1;
        if (cardTier <= currentTier) {
            card.classList.remove('hidden');
            card.classList.add('flex');
        }
    });

    // 4. Force a re-filter on the Learn Tab to apply the new Tier settings
    const activeBtn = document.querySelector('.cat-btn.bg-\\[\\#569B91\\]');
    if (activeBtn) {
        const categoryText = activeBtn.innerText.trim();
        filterCategory(categoryText === 'All Topics' ? 'All' : categoryText, activeBtn);
    }
}

// --- Paycheck Simulator ---
// Employee's share of CPF contribution, Age 55 & below (from 1 Jan 2026 CPF table):
//   TW <= $50            -> $0
//   $50 < TW <= $500     -> $0
//   $500 < TW <= $750    -> 0.6 x (TW - 500)
//   TW > $750            -> 20% of wages (Ordinary Wages, capped at $1,600/mo)
// Employee's share is rounded down to the nearest dollar per CPF Board rules.
function calcEmployeeCpf(tw) {
    let cpf;
    if (tw <= 50) {
        cpf = 0;
    } else if (tw <= 500) {
        cpf = 0;
    } else if (tw <= 750) {
        cpf = 0.6 * (tw - 500);
    } else {
        cpf = Math.min(0.20 * tw, 1600);
    }
    return Math.floor(cpf);
}

function calculateCashFlow() {
    const selectEl = document.getElementById('income-select');
    if (!selectEl) return;
    
    let activeIncome = parseInt(selectEl.value);

    const gross = activeIncome;
    const cpf = calcEmployeeCpf(gross);
    const takehome = gross - cpf;

    document.getElementById('calc-gross').innerText = `$${gross.toLocaleString()}`;
    document.getElementById('calc-cpf').innerText = `-$${cpf.toLocaleString()}`;
    document.getElementById('calc-takehome').innerText = `$${takehome.toLocaleString()}`;
    
    const dashCash = document.getElementById('dash-cash');
    const dashCpf = document.getElementById('dash-cpf-oa');
    
    if (dashCash) dashCash.innerText = `$${takehome.toLocaleString()}`;
    if (dashCpf) dashCpf.innerText = `$${Math.floor(cpf * 0.6).toLocaleString()}`;
}

// --- Hype Detector (Autocomplete) ---
const hypeSuggestions = [
    "Crypto 10x guaranteed returns",
    "Are SSBs risk-free?",
    "Get rich dropshipping",
    "How to invest in ETFs",
    "Is CPF a scam?",
    "Guaranteed 20% return per month",
    "Should I put all my money in crypto?",
    "What is the 50/30/20 budget rule?"
];

function showSuggestions() {
    const input = document.getElementById('hype-input').value.toLowerCase();
    const dropdown = document.getElementById('autocomplete-dropdown');
    
    dropdown.innerHTML = '';
    
    if (!input) {
        dropdown.classList.add('hidden');
        return;
    }

    const filtered = hypeSuggestions.filter(s => s.toLowerCase().includes(input));
    
    if (filtered.length === 0) {
        dropdown.classList.add('hidden');
        return;
    }

    dropdown.classList.remove('hidden');
    filtered.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = "px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center";
        div.innerHTML = `<i class="fa-solid fa-magnifying-glass text-gray-400 mr-3"></i> ${suggestion}`;
        div.onclick = () => setHypeSearch(suggestion);
        dropdown.appendChild(div);
    });
}

function setHypeSearch(text) {
    document.getElementById('hype-input').value = text;
    document.getElementById('autocomplete-dropdown').classList.add('hidden');
    runHypeDetector();
}

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('autocomplete-dropdown');
    const input = document.getElementById('hype-input');
    if (e.target !== input && e.target !== dropdown) {
        if(dropdown) dropdown.classList.add('hidden');
    }
});

function runHypeDetector() {
    const inputEl = document.getElementById('hype-input');
    const resultBox = document.getElementById('hype-result');
    if (!inputEl || !resultBox) return;
    
    const input = inputEl.value.trim().toLowerCase();
    if (!input) return;
    
    document.getElementById('autocomplete-dropdown').classList.add('hidden');
    resultBox.classList.remove('hidden');
    
    if (input.includes('crypto') || input.includes('guaranteed') || input.includes('10x') || input.includes('all in') || input.includes('rich') || input.includes('scam')) {
        resultBox.className = "p-4 rounded-2xl text-xs font-black border bg-red-50 text-red-500 border-red-100 mt-2";
        resultBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1"></i> Hype Detected: High Risk! Consult verified modules first.`;
    } else {
        resultBox.className = "p-4 rounded-2xl text-xs font-black border bg-green-50 text-green-600 border-green-100 mt-2";
        resultBox.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Solid Guidance. Looks like sound financial fundamentals.`;
    }
}

// --- Trending Expense Benchmarker ---
function updateBenchmarker() {
    const slider = document.getElementById('bbt-slider');
    const expenseSelect = document.getElementById('expense-type');
    const expenseIcon = document.getElementById('expense-icon');
    
    if (!slider || !expenseSelect) return;

    // DYNAMIC ICON LOGIC: Swaps the icon visually based on the dropdown selection
    if (expenseIcon) {
        const selectedOption = expenseSelect.options[expenseSelect.selectedIndex];
        const iconClass = selectedOption.getAttribute('data-icon');
        if (iconClass) {
            expenseIcon.className = `fa-solid ${iconClass} text-3xl text-[#569B91] mb-2 transition-all`;
        }
    }

    const count = slider.value;
    const costPerItem = parseFloat(expenseSelect.value); 
    const costPerWeek = count * costPerItem;
    const annualCost = costPerWeek * 52;
    const simulatedReturns = annualCost * 1.06;

    document.getElementById('bbt-count').innerText = `${count} Time${count == 1 ? '' : 's'}`;
    document.getElementById('bbt-savings').innerText = `+$${simulatedReturns.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// --- Content Algorithm & Category Filter Logic ---
function filterCategory(category, clickedElement) {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#569B91]', 'text-white', 'border-[#569B91]');
        btn.classList.add('bg-[#EEF5F3]', 'text-[#113A3E]', 'border-transparent');
    });
    
    clickedElement.classList.remove('bg-[#EEF5F3]', 'text-[#113A3E]', 'border-transparent');
    clickedElement.classList.add('bg-[#569B91]', 'text-white', 'border-[#569B91]');

    const cards = document.querySelectorAll('.learn-card');
    cards.forEach(card => {
        // TIER ALGORITHM: Hide cards that require a higher tier than the user has
        const cardTier = parseInt(card.getAttribute('data-tier')) || 1;
        if (cardTier > currentTier) {
            card.style.display = 'none';
            return;
        }

        if (card.id === 'view-more-card') {
            card.style.display = (category === 'All') ? 'flex' : 'none';
            return;
        }

        // Display logic for categories
        if (category === 'All') {
            card.style.display = (card.getAttribute('data-featured') === 'true') ? 'flex' : 'none';
        } else {
            card.style.display = (card.getAttribute('data-category') === category) ? 'flex' : 'none';
        }
    });
}

// --- App Initialization ---
window.onload = function() {
    calculateCashFlow();
    updateBenchmarker();
    
    const allTopicsBtn = document.querySelector('.cat-btn');
    if(allTopicsBtn) {
        filterCategory('All', allTopicsBtn);
    }
    
    switchView('dashboard'); 
};