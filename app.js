/**
 * Moolah Prototype - Core Application Logic
 */

// --- Global State ---
let currentTier = 2; 

// --- Content Database ---
const pageContent = {
    'cpf-basics': {
        meta: 'Finance Module · 3 Min Read',
        title: 'CPF Ordinary Account (OA) Basics',
        body: `<p><strong>What is the CPF OA?</strong></p><p>The Ordinary Account (OA) is primarily meant for your housing, insurance, investment, and education needs.</p><div class="bg-[#EEF5F3] p-4 rounded-2xl my-3 border border-[#569B91]/40"><p class="text-[#113A3E] font-bold text-xs"><i class="fa-solid fa-lightbulb mr-1"></i> Current Interest Rate: Up to 3.5% per annum.</p></div><p>When you start working, 20% of your paycheck goes into your CPF. Your employer also contributes an additional 17%. For those aged 35 and below, about 62% of that combined contribution flows into your Ordinary Account.</p><p><strong>Pro Tip:</strong> Many youths use their OA savings to pay for their first BTO downpayment!</p>`
    },
    'etf-basics': {
        meta: 'Investing Module · Infographic',
        title: 'What is an ETF?',
        body: `<p><strong>Exchange Traded Funds (ETFs)</strong></p><p>Imagine buying a basket of fruits instead of just one apple. An ETF is exactly that, but for stocks! It allows you to invest in a basket of different companies all at once.</p><ul class="list-disc pl-5 mt-4 space-y-3 text-gray-600"><li><strong>Instant Diversification:</strong> Spreads your risk across many companies instead of relying on one.</li><li><strong>Low Cost:</strong> Generally cheaper to manage than mutual funds.</li><li><strong>Beginner Friendly:</strong> Examples include the Straits Times Index (STI) ETF which tracks the top 30 companies in Singapore.</li></ul>`
    },
    'budget-rule': {
        meta: 'Budgeting Module · 2 Min Read',
        title: 'The 50/30/20 Rule',
        body: `<p><strong>How to split your take-home pay:</strong></p><ul class="list-disc pl-5 mt-4 space-y-3 text-gray-600"><li><strong>50% Needs:</strong> Rent, groceries, transport, utilities.</li><li><strong>30% Wants:</strong> Matcha, concerts, dining out.</li><li><strong>20% Savings & Investing:</strong> Emergency fund, ETFs, SSB.</li></ul><p class="mt-4">Automate the 20% the moment your paycheck hits your account so you don't accidentally spend it!</p>`
    },
    'invest-ssb': {
        meta: 'Investing Module · 4 Min Read',
        title: 'Singapore Savings Bonds (SSB)',
        body: `<p><strong>The Safe Haven for Cash</strong></p><p>Singapore Savings Bonds are low-risk bonds fully backed by the Singapore Government.</p><ul class="list-disc pl-5 mt-4 space-y-3 text-gray-600"><li><strong>Capital Guaranteed:</strong> You will always get your original investment amount back.</li><li><strong>Flexible:</strong> You can withdraw your money in any month without penalty.</li><li><strong>Low Barrier:</strong> You can start investing from as little as $500.</li></ul>`
    },
    'news-ssb': {
        meta: 'Straits Times · Tier 1 News',
        title: 'MAS Announces New SSB Rates',
        body: `<p>The Monetary Authority of Singapore (MAS) has released the latest interest rates for the upcoming Singapore Savings Bonds (SSB).</p><p class="mt-3"><strong>Why youths care:</strong> SSBs are one of the safest places to park your emergency funds. They are fully backed by the Singapore Government, and you can withdraw your money in any given month without penalty.</p>`
    },
    'news-genz': {
        meta: 'CNA · Tier 2 News',
        title: 'Why Gen Z is pivoting to High-Yield accounts',
        body: `<p>Gen Z and millennials in Singapore are actively shifting their funds to high-yield accounts.</p><p class="mt-3">Banks like DBS (Multiplier), UOB (One), and OCBC (360) are offering competitive tiered interest rates up to 7% for users who credit their salary and spend via credit cards.</p>`
    },
    'news-reits': {
        meta: 'Business Times · Tier 3 News',
        title: 'Advanced: Intro to Singapore REITs',
        body: `<p><strong>Real Estate Investment Trusts (REITs)</strong></p><p>REITs allow you to invest in large-scale income-producing real estate (like shopping malls or office buildings) without having to buy the whole property yourself.</p><p class="mt-3">Singapore is one of the largest REIT markets in Asia, offering attractive dividend yields for investors looking for steady passive income.</p>`
    }
};

// --- Interactive Tutorial Engine ---
const tutorialSteps = [
    {
        view: 'onboarding',
        target: 'tut-target-cpf',
        title: "1. Auto-CPF & Sidequests",
        text: "Plug in your pay or add your sidequest gig. We do the exact math for your take-home and CPF OA cut before payday hits."
    },
    {
        view: 'dashboard',
        target: 'tut-target-tier',
        title: "2. Smart Level-Ups",
        text: "Start with the basics. Take quick quizzes to prove your knowledge and unlock advanced investing modules when you're actually ready."
    },
    {
        view: 'dashboard',
        target: 'tut-target-streak',
        title: "3. Keep the Fire Alive",
        text: "Daily streaks hold you accountable. Check the community leaderboard to see how your money game stacks up against the squad."
    },
    {
        view: 'learn',
        target: 'tut-target-hype',
        title: "4. The B.S. Detector",
        text: "Saw some 'guaranteed 10x crypto' trend? Paste it in the Hype Scan. We'll tell you instantly if it's a scam or solid advice."
    },
    {
        view: 'learn',
        target: 'tut-target-local',
        title: "5. SG Context Only",
        text: "Skip the generic Wall Street noise. Get bite-sized guides on stuff that actually matters here—like BTOs, SSBs, and high-yield accounts."
    },
    {
        view: 'simulate',
        target: 'tut-target-habit',
        title: "6. The Reality Check",
        text: "What's the big plan? Select your guilty pleasure to see how cutting back accelerates your specific savings goals."
    }
];
let currentTutorialStep = 0;

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
    const screens = ['welcome', 'name', 'onboarding', 'dashboard', 'learn', 'simulate', 'content', 'quiz'];
    
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
    if(targetScreen) {
        targetScreen.classList.remove('hidden');
        if (viewId === 'welcome' || viewId === 'name') {
            targetScreen.classList.add('flex');
        }
    }
    
    const topNav = document.getElementById('top-nav');
    const bottomNav = document.getElementById('bottom-nav');
    
    if (viewId === 'welcome' || viewId === 'name') {
        if(topNav) topNav.classList.add('hidden');
        if(bottomNav) bottomNav.classList.add('hidden');
    } else {
        if(topNav) topNav.classList.remove('hidden');
        if(bottomNav) bottomNav.classList.remove('hidden');
    }
    
    let activeNavId = (viewId === 'content' || viewId === 'quiz') ? 'learn' : viewId;
    if(viewId === 'quiz') activeNavId = 'dashboard';
    
    const activeTab = document.getElementById(`tab-${activeNavId}`);
    if (activeTab) {
        activeTab.classList.remove('text-gray-400');
        activeTab.classList.add('text-[#569B91]');
    }
}

// --- Welcome & Tutorial Logic ---
function askName() {
    document.getElementById('screen-welcome').classList.add('hidden');
    document.getElementById('screen-welcome').classList.remove('flex');
    document.getElementById('screen-name').classList.remove('hidden');
    document.getElementById('screen-name').classList.add('flex');
}

function skipToApp() {
    document.getElementById('user-name-display').innerText = "let's start";
    document.getElementById('lb-user-name').innerText = "You";
    document.getElementById('nav-user-initial').innerText = "Y";
    switchView('onboarding');
}

function startTutorial() {
    const nameInput = document.getElementById('new-user-name').value.trim();
    const finalName = nameInput || "You";
    
    document.getElementById('user-name-display').innerText = `${finalName}, let's start`;
    document.getElementById('lb-user-name').innerText = `${finalName} (You)`;
    document.getElementById('nav-user-initial').innerText = finalName.charAt(0).toUpperCase();

    currentTutorialStep = 0;
    renderTutorialStep();
}

function renderTutorialStep() {
    if (currentTutorialStep >= tutorialSteps.length) {
        endTutorial();
        return;
    }
    
    const step = tutorialSteps[currentTutorialStep];
    const popover = document.getElementById('tutorial-popover');
    
    // Switch to page
    switchView(step.view); 
    
    // Update texts
    document.getElementById('tut-title').innerText = step.title;
    document.getElementById('tut-text').innerText = step.text;
    document.getElementById('tut-progress').innerText = `${currentTutorialStep + 1} / ${tutorialSteps.length}`;
    
    const btn = document.getElementById('tut-btn-text');
    if (currentTutorialStep === tutorialSteps.length - 1) {
        btn.innerHTML = 'Finish <i class="fa-solid fa-check ml-1"></i>';
    } else {
        btn.innerHTML = 'Next <i class="fa-solid fa-arrow-right ml-1"></i>';
    }

    // Inject popover right after the target in the DOM flow
    const targetEl = document.getElementById(step.target);
    if (targetEl) {
        targetEl.after(popover);
        popover.classList.remove('hidden');
        
        // Scroll to the target gently
        setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function nextTutorialStep() {
    currentTutorialStep++;
    renderTutorialStep();
}

function endTutorial() {
    const popover = document.getElementById('tutorial-popover');
    popover.classList.add('hidden');
    document.body.appendChild(popover); // Park it out of the way
    
    switchView('onboarding'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast("Tutorial complete! You're ready to go.");
}

// --- Content Algorithm & Tier / News Logic ---
function updateTierUI() {
    const titleEl = document.getElementById('tier-title');
    const progEl = document.getElementById('tier-progress');
    const subEl = document.getElementById('tier-subtitle');
    const iconEl = document.getElementById('tier-icon');
    const quizBtn = document.getElementById('quiz-btn');

    if(titleEl) {
        titleEl.innerText = "Tier 3: Investor";
        titleEl.nextElementSibling.innerHTML = '<i class="fa-solid fa-check-double mr-1"></i>Tier 2 Mastered';
        titleEl.nextElementSibling.classList.replace('text-[#FFB5A7]', 'text-green-300');
    }
    if(progEl) progEl.style.width = "100%";
    if(subEl) subEl.innerText = "Max Tier Reached!";
    if(iconEl) iconEl.innerText = "🌳";
    if(quizBtn) quizBtn.classList.add('hidden');
    
    const newsBadge = document.getElementById('news-tier-badge');
    if(newsBadge) {
        newsBadge.innerText = "Tier 3 News";
        newsBadge.classList.replace('bg-[#113A3E]', 'bg-[#569B91]');
        newsBadge.classList.replace('text-[#EEF5F3]', 'text-[#0A2528]');
    }
    
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const cardTier = parseInt(card.getAttribute('data-tier')) || 1;
        if (cardTier <= currentTier) {
            card.classList.remove('hidden');
            card.classList.add('flex');
        }
    });

    const activeBtn = document.querySelector('.cat-btn.bg-\\[\\#569B91\\]');
    if (activeBtn) {
        const categoryText = activeBtn.innerText.trim();
        filterCategory(categoryText === 'All Topics' ? 'All' : categoryText, activeBtn);
    }
}

function checkQuizAnswer(answer) {
    if(answer === 'correct') {
        showToast("Correct! Upgraded to Tier 3: Investor");
        currentTier = 3;
        updateTierUI();
        switchView('dashboard');
    } else {
        showToast("Oops! Review the modules and try again.");
    }
}

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
        // Exempt the "Read more" card from tier-hiding
        if (card.id === 'read-more-card') {
            card.style.display = (category === 'All') ? 'flex' : 'none';
            return;
        }

        const cardTier = parseInt(card.getAttribute('data-tier')) || 1;
        if (cardTier > currentTier) {
            card.style.display = 'none';
            return;
        }
        
        if (category === 'All') {
            card.style.display = (card.getAttribute('data-featured') === 'true') ? 'flex' : 'none';
        } else {
            card.style.display = (card.getAttribute('data-category') === category) ? 'flex' : 'none';
        }
    });
}

// --- Custom Job/Sidequest Addition ---
function toggleCustomJobForm() {
    const form = document.getElementById('custom-job-ui');
    if (form) {
        form.classList.toggle('hidden');
        form.classList.toggle('flex');
    }
}

function addCustomJob() {
    const nameInput = document.getElementById('custom-job-name');
    const salaryInput = document.getElementById('custom-job-salary');
    const selectEl = document.getElementById('income-select');
    
    if (!nameInput || !salaryInput || !selectEl) return;
    const name = nameInput.value.trim();
    const salary = parseInt(salaryInput.value);

    if (!name || isNaN(salary) || salary <= 0) {
        showToast("Please enter a valid sidequest and salary.");
        return;
    }

    const newOption = document.createElement('option');
    newOption.value = salary;
    newOption.innerText = `${name} ($${salary.toLocaleString()}/mo)`;
    
    selectEl.appendChild(newOption);
    selectEl.value = salary;

    nameInput.value = '';
    salaryInput.value = '';
    toggleCustomJobForm();
    showToast("Sidequest added!");
    calculateCashFlow();
}

// --- Custom Goal Addition ---
function toggleCustomGoalForm() {
    const form = document.getElementById('custom-goal-ui');
    if (form) {
        form.classList.toggle('hidden');
        form.classList.toggle('flex');
    }
}

function addCustomGoal() {
    const nameInput = document.getElementById('custom-goal-name');
    const targetInput = document.getElementById('custom-goal-target');
    const savedInput = document.getElementById('custom-goal-saved');
    const container = document.getElementById('savings-goals-container');
    
    if (!nameInput || !targetInput || !savedInput || !container) return;

    const name = nameInput.value.trim();
    const target = parseInt(targetInput.value);
    const saved = parseInt(savedInput.value) || 0;

    if (!name || isNaN(target) || target <= 0) {
        showToast("Enter a valid goal name and target amount.");
        return;
    }

    const percentage = Math.min(100, Math.max(0, (saved / target) * 100));

    const goalCard = document.createElement('div');
    goalCard.className = "bg-[#EEF5F3] p-5 rounded-3xl shadow-sm border border-[#184F55]/10 mt-3";
    goalCard.innerHTML = `
        <div class="flex items-center space-x-4 mb-3">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-inner">🎯</div>
            <div class="flex-1">
                <h5 class="text-sm font-black text-gray-800">${name}</h5>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Custom Goal</p>
            </div>
            <div class="text-right">
                <span class="block text-sm font-black text-[#569B91]">$${saved.toLocaleString()}</span>
            </div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-[#569B91] h-2 rounded-full" style="width: ${percentage}%"></div>
        </div>
    `;

    container.appendChild(goalCard);
    
    nameInput.value = '';
    targetInput.value = '';
    savedInput.value = '';
    toggleCustomGoalForm();
    showToast("Goal added to the big plan!");
}

// --- Custom Expense / Guilty Pleasure Addition ---
function toggleCustomExpenseForm() {
    const form = document.getElementById('custom-expense-ui');
    if (form) {
        form.classList.toggle('hidden');
        form.classList.toggle('flex');
    }
}

function addCustomExpense() {
    const nameInput = document.getElementById('custom-expense-name');
    const costInput = document.getElementById('custom-expense-cost');
    const selectEl = document.getElementById('expense-type');
    
    if (!nameInput || !costInput || !selectEl) return;

    const name = nameInput.value.trim();
    const cost = parseFloat(costInput.value);

    if (!name || isNaN(cost) || cost <= 0) {
        showToast("Enter a valid item and cost.");
        return;
    }

    const newOption = document.createElement('option');
    newOption.value = cost;
    newOption.setAttribute('data-name', name);
    newOption.setAttribute('data-icon', 'fa-receipt');
    newOption.innerText = `${name} ($${cost.toFixed(2)})`;
    
    selectEl.appendChild(newOption);
    selectEl.value = cost;

    nameInput.value = '';
    costInput.value = '';
    toggleCustomExpenseForm();
    showToast("Guilty pleasure added!");
    updateBenchmarker();
}


// --- Paycheck Simulator Math (2026 CPF Rules) ---
function calcEmployeeCpf(tw) {
    let cpf;
    if (tw <= 50) cpf = 0;
    else if (tw <= 500) cpf = 0;
    else if (tw <= 750) cpf = 0.6 * (tw - 500);
    else cpf = Math.min(0.20 * tw, 1600);
    return Math.floor(cpf);
}

function calcEmployerCpf(tw) {
    let cpf;
    if (tw <= 50) cpf = 0;
    else if (tw <= 500) cpf = 0;
    else if (tw <= 750) cpf = 0.51 * (tw - 500);
    else cpf = 0.17 * tw;
    return Math.floor(cpf);
}

function calcOaAllocation(tw) {
    const totalContribution = calcEmployeeCpf(tw) + calcEmployerCpf(tw);
    const oaRatio = 23 / 37; // Age <=35
    return Math.round(totalContribution * oaRatio);
}

function calculateCashFlow() {
    const selectEl = document.getElementById('income-select');
    if (!selectEl) return;
    
    let activeIncome = parseInt(selectEl.value);

    const gross = activeIncome;
    const cpf = calcEmployeeCpf(gross);
    const takehome = gross - cpf;
    const oaAllocation = calcOaAllocation(gross);

    document.getElementById('calc-gross').innerText = `$${gross.toLocaleString()}`;
    document.getElementById('calc-cpf').innerText = `-$${cpf.toLocaleString()}`;
    document.getElementById('calc-takehome').innerText = `$${takehome.toLocaleString()}`;
    
    const dashCash = document.getElementById('dash-cash');
    const dashCpf = document.getElementById('dash-cpf-oa');
    
    if (dashCash) dashCash.innerText = `$${takehome.toLocaleString()}`;
    if (dashCpf) dashCpf.innerText = `$${oaAllocation.toLocaleString()}`;
}

// --- Hype Detector (Expanded Search) ---
const hypeSuggestions = [
    "Crypto 10x guaranteed returns",
    "Are SSBs risk-free?",
    "Get rich dropshipping",
    "How to invest in ETFs",
    "Is CPF a scam?",
    "Guaranteed 20% return per month",
    "Should I put all my money in crypto?",
    "What is the 50/30/20 budget rule?",
    "Can I buy a BTO before 35?",
    "How do Singapore REITs work?"
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
        div.className = "px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0";
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

function runHypeDetector() {
    const inputEl = document.getElementById('hype-input');
    const resultBox = document.getElementById('hype-result');
    if (!inputEl || !resultBox) return;
    
    const input = inputEl.value.trim().toLowerCase();
    if (!input) return;
    
    document.getElementById('autocomplete-dropdown').classList.add('hidden');
    resultBox.classList.remove('hidden');
    
    if (input.includes('crypto') || input.includes('guaranteed') || input.includes('10x') || input.includes('scam') || input.includes('rich')) {
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

// --- App Initialization ---
window.onload = function() {
    calculateCashFlow();
    updateBenchmarker();
    
    const allTopicsBtn = document.querySelector('.cat-btn');
    if(allTopicsBtn) {
        filterCategory('All', allTopicsBtn);
    }
    
    switchView('welcome'); 
};