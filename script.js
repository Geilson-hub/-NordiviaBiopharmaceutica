/**
 * =====================================================
 * NORDIVIA BIOPHARMACEUTICA
 * Main Script
 * =====================================================
 *
 * This file contains all the JavaScript functionalities
 * of the Nordivia Biopharmaceuticals landing page.
 *
 * FEATURES:
 * - Mobile menu (hamburger)
 * - Smooth scroll for anchors
 * - Header scroll effect
 * - Hidden admin panel access
 *
 * =====================================================
 */
document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       1. MOBILE MENU (HAMBURGER)
       ===================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // Toggle menu
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* =====================================================
       2. SMOOTH SCROLL
       ===================================================== */
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* =====================================================
        3. HEADER SCROLL EFFECT
       ===================================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.2)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.1)';
        }
    });

    /* =====================================================
        4. HIDDEN ADMIN ACCESS
       Click 5x on the footer logo or press Ctrl+Shift+A
       ===================================================== */
    let cliquesLogo = 0;
    let ultimoCliqueLogo = 0;

    document.addEventListener('click', function (e) {
        const logo = e.target.closest('.footer-logo');
        if (!logo) return;

        const agora = Date.now();
        if (agora - ultimoCliqueLogo > 3000) {
            cliquesLogo = 0;
        }
        ultimoCliqueLogo = agora;
        cliquesLogo++;

        if (cliquesLogo >= 5) {
            cliquesLogo = 0;
            window.location.href = 'admin.html';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
            window.location.href = 'admin.html';
        }
    });

});
