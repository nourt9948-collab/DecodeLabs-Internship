
const themeToggleBtn = document.querySelector('.js-theme-toggle');
const incrementBtn = document.querySelector('.js-increment-btn');
const scoreDisplay = document.querySelector('.js-score-display');
const menuToggleBtn = document.querySelector('.js-menu-toggle');
const dropdownMenu = document.querySelector('.js-dropdown-menu');

let currentScore = 0;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}


function handleThemeToggle() {
   
    const isDark = document.body.classList.toggle('dark-mode');
    
    if (isDark) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// (Counter / Safe Mutation)
function handleIncrement() {
    currentScore++;
    
    scoreDisplay.textContent = currentScore;
}

function handleMenuToggle() {
    dropdownMenu.classList.toggle('is-open');
}

themeToggleBtn.addEventListener('click', handleThemeToggle);
incrementBtn.addEventListener('click', handleIncrement);
menuToggleBtn.addEventListener('click', handleMenuToggle);