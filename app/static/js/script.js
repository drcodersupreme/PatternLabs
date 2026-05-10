function setTheorem(formula) {
    document.getElementById('theorem-input').value = formula;
}

document.getElementById('run-test-btn').addEventListener('click', startTest);
document.getElementById('theorem-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startTest();
});

let testInterval;
let theoremValue = "";

function startTest() {
    theoremValue = document.getElementById('theorem-input').value.trim();
    if (!theoremValue) return;

    // Switch view
    document.getElementById('view-landing').classList.remove('active');
    setTimeout(() => {
        document.getElementById('view-landing').style.display = 'none';
        
        const loadingView = document.getElementById('view-loading');
        loadingView.classList.add('flex-active');
        
        initParticles();
        initWaveform();
        runSimulation();
    }, 500);
}

function initParticles() {
    const container = document.getElementById('particles');
    container.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(p);
    }
}

function initWaveform() {
    const container = document.getElementById('waveform');
    container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        container.appendChild(bar);
        animateWaveBar(bar, i * 0.05);
    }
}

function animateWaveBar(bar, delay) {
    setTimeout(() => {
        setInterval(() => {
            bar.style.height = `${Math.random() * 60 + 20}%`;
        }, 1000);
    }, delay * 1000);
}

function runSimulation() {
    let progress = 0;
    const maxProgress = 10000;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const currentNumber = document.getElementById('current-number');
    const trueCases = document.getElementById('true-cases');
    const falseCases = document.getElementById('false-cases');
    const currentNumberStat = document.getElementById('current-number-stat');

    const totalDash = 691.15; // 2 * pi * 110

    testInterval = setInterval(() => {
        progress += 150;
        if (progress >= maxProgress) {
            progress = maxProgress;
            clearInterval(testInterval);
            fetchResults();
        }

        const pct = progress / maxProgress;
        progressBar.style.strokeDashoffset = totalDash * (1 - pct);
        progressText.textContent = `${Math.round(pct * 100)}%`;
        currentNumber.textContent = progress.toLocaleString();
        
        trueCases.textContent = Math.floor(progress * 0.75).toLocaleString();
        falseCases.textContent = Math.floor(progress * 0.25).toLocaleString();
        currentNumberStat.textContent = progress.toLocaleString();

    }, 50);
}

async function fetchResults() {
    const formData = new FormData();
    formData.append("theorem", theoremValue);

    try {
        const response = await fetch('/simulate', {
            method: 'POST',
            body: formData
        });
        const htmlFragment = await response.text();

        // Switch view
        document.getElementById('view-loading').classList.remove('flex-active');
        setTimeout(() => {
            document.getElementById('view-loading').style.display = 'none';
            
            const resultsView = document.getElementById('view-results');
            resultsView.innerHTML = htmlFragment;
            resultsView.classList.add('active');
        }, 500);

    } catch (error) {
        console.error("Failed to fetch results:", error);
    }
}

function resetTest() {
    document.getElementById('view-results').classList.remove('active');
    setTimeout(() => {
        document.getElementById('view-results').innerHTML = '';
        document.getElementById('theorem-input').value = '';
        
        // Reset loading state
        document.getElementById('progress-bar').style.strokeDashoffset = 691.15;
        document.getElementById('progress-text').textContent = '0%';
        document.getElementById('current-number').textContent = '0';
        document.getElementById('true-cases').textContent = '0';
        document.getElementById('false-cases').textContent = '0';
        document.getElementById('current-number-stat').textContent = '0';

        const landingView = document.getElementById('view-landing');
        landingView.style.display = 'block';
        setTimeout(() => {
            landingView.classList.add('active');
        }, 50);
    }, 500);
}
