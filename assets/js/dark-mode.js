document.addEventListener('DOMContentLoaded', function () {
    const switchButton = document.getElementById('switch-theme');

    function applyTheme() {
        const selectedTheme = localStorage.getItem('theme');

        if (selectedTheme === 'dark') {
            document.body.classList.add('dark');
            switchButton.checked = true;
        } else {
            document.body.classList.remove('dark');
        }
    }

    applyTheme();

    switchButton.addEventListener('change', function (e) {
        const theme = e.target.checked ? 'dark' : 'light';

        localStorage.setItem('theme', theme);
        applyTheme();
    })
});