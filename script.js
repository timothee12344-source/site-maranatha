/**
 * CENTRE D’ÉVANGÉLISATION MARANATHA (C.E.M)
 * Script d'interactivité officiel - Pointe-Noire
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation de l'année dans le footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Gestion du menu Mobile Hamburger
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            
            // Animation des barres de l'icône hamburger
            const bars = navToggle.querySelectorAll('.hamburger-bar');
            if (isOpen) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Fermeture automatique lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    const bars = navToggle.querySelectorAll('.hamburger-bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    // 3. Ombre dynamique de la barre de navigation au défilement
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // 4. Système de filtrage des Prédications (Audio, Vidéo, Études)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sermonCards = document.querySelectorAll('.sermon-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            sermonCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Gestion du formulaire "Besoin de Prière" avec retour utilisateur
    const prayerForm = document.getElementById('prayerForm');
    const prayerFeedback = document.getElementById('prayerFeedback');

    if (prayerForm) {
        prayerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('prayerName').value.trim();
            const phone = document.getElementById('prayerPhone').value.trim();
            const subject = document.getElementById('prayerSubject').value;
            const message = document.getElementById('prayerMessage').value.trim();

            if (!phone || !subject || !message) {
                showToast("Veuillez renseigner les champs obligatoires afin de prier pour vous.");
                return;
            }

            // Simulation d'un envoi sécurisé et confidentiel
            const submitBtn = prayerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmission fraternelle...';
            submitBtn.disabled = true;

            setTimeout(() => {
                prayerForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                prayerFeedback.classList.remove('hidden');
                prayerFeedback.className = 'form-feedback success';
                prayerFeedback.innerHTML = `
                    <strong>Votre requête a été reçue dans la paix.</strong><br>
                    Le Pasteur Nahim POUNDY et l'équipe d'intercession prient pour votre situation. Que la paix et la grâce de notre Seigneur Jésus-Christ vous accompagnent !
                `;

                showToast("Votre requête a été transmise confidentiellement.");
            }, 1200);
        });
    }

    // 6. Gestion du formulaire de contact rapide
    const generalContactForm = document.getElementById('generalContactForm');
    if (generalContactForm) {
        generalContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            generalContactForm.reset();
            showToast("Votre message a été transmis à l'administration de Maranatha.");
        });
    }

    // 7. Fonction Utilitaire : Toast Notification
    function showToast(message) {
        const toast = document.getElementById('toastMessage');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4500);
    }
});