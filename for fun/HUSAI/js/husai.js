document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        themeSwitch.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
    }

    themeSwitch.addEventListener('click', () => {
        // Add animation class
        themeSwitch.classList.add('switching');
        
        // Toggle dark class
        themeSwitch.classList.toggle('dark');
        
        // Update theme
        const isDark = themeSwitch.classList.contains('dark');
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            themeSwitch.classList.remove('switching');
        }, 300);
    });
});