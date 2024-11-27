// تغییر تم دارک/لایت
document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');  // تغییر وضعیت تم
    const icon = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';  // تغییر آیکن
    document.getElementById('toggle-theme').textContent = icon;

    // تغییر تم برای اسلاید بارها و دکمه‌ها
    const cartPanel = document.getElementById('cart');
    const profilePanel = document.getElementById('profile');
    if (document.body.classList.contains('dark-mode')) {
        cartPanel.classList.add('dark-mode');
        profilePanel.classList.add('dark-mode');
        navbarCollapse.classList.add('dark-mod')
    } else {
        cartPanel.classList.remove('dark-mode');
        profilePanel.classList.remove('dark-mode');
        navbarCollapse.classList.remove('dark-mode');
    }
});
    

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
                }, 800); // 800 میلی‌ثانیه تأخیر برای بسته شدن
            });
        });
