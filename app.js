/**
 * Moolah Prototype - Core Application Logic
 * Separating this logic makes the codebase cleaner for your hackathon pitch.
 */

// --- Navigation Logic ---
// Handles switching between the different screens and updating the active tab styles
function switchView(viewId) {
    const screens = ['onboarding', 'dashboard', 'learn', 'simulate'];
    
    screens.forEach(screen => {
        // Hide all screens
        document.getElementById(`screen-${screen}`).classList.add('hidden');
        
        // Reset all bottom nav icons to gray
        const tab = document.getElementById(`tab-${screen}`);
        if (tab) {
            tab.classList.remove('text-[#5C6B46]');
            tab.classList.add('text-gray-400');
        }
    });

    // Show the selected screen
    document.getElementById(`screen-${viewId}`).classList.remove('hidden');
    
    // Highlight the active bottom nav icon in Moolah green
    const activeTab = document.getElementById(`tab-${viewId}`);
    if (activeTab) {
        activeTab.classList.remove('text-gray-400');
        activeTab.classList.add('text-[#5C6B46]');
    }
}

// --- Paycheck & Cash Flow Simulator ---
// Calculates CPF deductions and updates the dashboard instantly based on the selected income
function calculateCashFlow() {
    const selectEl = document.getElementById('income-select');
    if (!selectEl) return;
    
    let activeIncome = parseInt(selectEl.value);

    const gross = activeIncome;
    const cpf = gross * 0.20; // Standard 20% employee CPF contribution
    const takehome = gross - cpf;

    // Update Wizard Screen UI
    document.getElementById('calc-gross').innerText = `$${gross.toLocaleString()}`;
    document.getElementById('calc-cpf').innerText = `-$${cpf.toLocaleString()}`;
    document.getElementById('calc-takehome').innerText = `$${takehome.toLocaleString()}`;
    
    // Update Dashboard UI
    const dashCash = document.getElementById('dash-cash');
    const dashCpf = document.getElementById('dash-cpf-oa');
    
    if (dashCash) dashCash.innerText = `$${takehome.toLocaleString()}`;
    // Simulating CPF Ordinary Account allocation (~0.6 of total CPF contribution for youth)
    if (dashCpf) dashCpf.innerText = `$${(cpf * 0.6).toLocaleString()}`;
}

// --- Social Media Hype Detector ---
// A lightweight keyword scanner to simulate verifying financial advice
function runHypeDetector() {
    const inputEl = document.getElementById('hype-input');
    const resultBox = document.getElementById('hype-result');
    
    if (!inputEl || !resultBox) return;
    
    const input = inputEl.value.trim().toLowerCase();
    if (!input) return;
    
    resultBox.classList.remove('hidden');
    
    // Simple logic flag for typical "get rich quick" buzzwords
    if (input.includes('crypto') || input.includes('guaranteed') || input.includes('10x') || input.includes('all in')) {
        resultBox.className = "p-3 rounded-xl text-xs font-black border bg-red-50 text-red-500 border-red-100 mt-2";
        resultBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1"></i> Hype Detected: High Risk! Consult verified modules first.`;
    } else {
        resultBox.className = "p-3 rounded-xl text-xs font-black border bg-green-50 text-green-600 border-green-100 mt-2";
        resultBox.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Solid Guidance. Looks like sound financial fundamentals.`;
    }
}

// --- BBT/Kopi Expense Benchmarker ---
// Calculates the 1-year compound effect of daily discretionary spending
function updateBenchmarker() {
    const slider = document.getElementById('bbt-slider');
    if (!slider) return;

    const count = slider.value;
    const costPerWeek = count * 6.50; // Assuming $6.50 per cup
    const annualCost = costPerWeek * 52;
    // Simulate a basic 6% annual return if that money was invested instead
    const simulatedReturns = annualCost * 1.06;

    document.getElementById('bbt-count').innerText = `${count} Cup${count == 1 ? '' : 's'}`;
    document.getElementById('bbt-savings').innerText = `+$${simulatedReturns.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// --- App Initialization ---
// Runs automatically when the webpage loads
window.onload = function() {
    calculateCashFlow();
    updateBenchmarker();
    switchView('dashboard'); // Default to the home dashboard on load
};