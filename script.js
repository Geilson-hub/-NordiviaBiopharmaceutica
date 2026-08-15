/**
 * =====================================================
 * NORDIVIA BIOPHARMACEUTICA
 * Script Principal
 * =====================================================
 *
 * Este arquivo contém todas as funcionalidades JavaScript
 * da landing page da Nordivia Biopharmaceutica.
 *
 * FUNCIONALIDADES:
 * - Menu mobile (hambúrguer)
 * - Scroll suave para âncoras
 * - Efeito de scroll no header
 * - Integração com WhatsApp
 *
 * ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       1. MENU MOBILE (HAMBÚRGUER)
       ===================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // Toggle do menu
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha menu ao clicar em link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* =====================================================
       2. SCROLL SUAVE
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
        4. LINK WHATSAPP COM MENSAGEM PADRÃO
       EDITÁVEL: Altere a mensagem abaixo
       ===================================================== */
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const defaultMessage = encodeURIComponent(
        'Gostaria de saber mais sobre os produtos, por favor.'
    );

    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        if (!currentHref.includes('text=')) {
            link.setAttribute('href', `${currentHref}?text=${defaultMessage}`);
        }
    });

});
