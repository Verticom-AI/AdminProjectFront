

        // گرفتن پنل‌ها و دکمه‌ها
        const cartBtn = document.getElementById('cart-btn');
        const profileBtn = document.getElementById('profile-btn');
        const profilePanel = new bootstrap.Offcanvas(document.getElementById('profile'));
        const cartPanel = new bootstrap.Offcanvas(document.getElementById('cart'));
        const menuBtn = document.getElementById('menu-btn');
        const navbarCollapse = document.getElementById('navbarNav');

        // متغیر برای مشخص کردن پنل باز شده
        let currentPanel = null;

        // برای باز کردن پنل‌ها با دکمه‌ها
        function openCartPanel() {
            if (currentPanel === 'cart') {
                cartPanel.hide();
                currentPanel = null;
            } else {
                profilePanel.hide();
                cartPanel.show();
                currentPanel = 'cart';
            }
        }

        function openProfilePanel() {
            if (currentPanel === 'profile') {
                profilePanel.hide();
                currentPanel = null;
            } else {
                cartPanel.hide();
                profilePanel.show();
                currentPanel = 'profile';
            }
        }

        // برای باز کردن منو در صفحه‌های کوچک
        function toggleMenu() {
            navbarCollapse.classList.toggle('show');
        }

        // باز کردن پنل‌ها با کلیک یا هاور
        cartBtn.addEventListener('mouseenter', openCartPanel);
        cartBtn.addEventListener('click', openCartPanel);

        profileBtn.addEventListener('mouseenter', openProfilePanel);
        profileBtn.addEventListener('click', openProfilePanel);

        menuBtn.addEventListener('mouseenter', toggleMenu);
        menuBtn.addEventListener('click', toggleMenu);

        // باز نگه داشتن پنل‌ها هنگام حرکت موس روی آن‌ها
        const panels = [profilePanel, cartPanel];
        panels.forEach(panel => {
            const offcanvasElement = panel._element;

            offcanvasElement.addEventListener('mouseenter', () => {
                clearTimeout(panel._timeout); // لغو تایمر بسته شدن
            });

            offcanvasElement.addEventListener('mouseleave', () => {
                panel._timeout = setTimeout(() => {
                    panel.hide(); // بسته شدن پنل بعد از تأخیر
                }, 400); // 400 میلی‌ثانیه تأخیر برای بسته شدن
            });
        });
        /*
// تغییر تم دارک و لایت
const themeToggle = document.getElementById('theme-toggle');

// بررسی وضعیت تم دارک
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

// تغییر تم
themeToggle.addEventListener('click', () => {
    // تعویض کلاس dark-mode
    document.body.classList.toggle('dark-mode');

    // ذخیره انتخاب در localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
*/