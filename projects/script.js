// Аккордеон для FAQ
document.querySelectorAll('.faq-item__question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Закрываем все остальные (опционально)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Переключаем текущий
        if (!isActive) {
            faqItem.classList.add('active');
        } else {
            faqItem.classList.remove('active');
        }
    });
});

// Открытие модального окна
const modal = document.getElementById('modal');
const openFormBtn = document.getElementById('openFormBtn');
const closeModalBtn = document.querySelector('.modal__close');

if (openFormBtn) {
    openFormBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Вспомогательная функция показа сообщения
function showMessage(element, text, isSuccess = true) {
    element.textContent = text;
    element.classList.add('show');
    element.style.backgroundColor = isSuccess ? '#eef3ec' : '#ffe6e5';
    element.style.color = isSuccess ? '#2c5e2e' : '#b13e3e';
    
    setTimeout(() => {
        element.classList.remove('show');
    }, 4000);
}

// Обработка основной формы
const mainForm = document.getElementById('signupForm');
const mainMessage = document.getElementById('formMessage');

if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        
        if (!name || !email) {
            showMessage(mainMessage, 'Пожалуйста, заполните имя и email', false);
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showMessage(mainMessage, 'Введите корректный email', false);
            return;
        }
        
        // Имитация отправки данных
        console.log('Форма отправлена:', { name, email, comment: document.getElementById('comment')?.value });
        
        showMessage(mainMessage, 'Спасибо! Мы свяжемся с вами.');
        mainForm.reset();
    });
}

// Обработка модальной формы
const modalForm = document.getElementById('modalForm');
const modalMessage = document.getElementById('modalMessage');

if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('modalName')?.value.trim() || '';
        const email = document.getElementById('modalEmail')?.value.trim() || '';
        
        if (!name || !email) {
            showMessage(modalMessage, 'Пожалуйста, заполните имя и email', false);
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showMessage(modalMessage, 'Введите корректный email', false);
            return;
        }
        
        console.log('Модальная форма:', { name, email });
        
        showMessage(modalMessage, 'Спасибо! Мы свяжемся с вами.');
        modalForm.reset();
        
        // Закрываем модальное окно через 1.5 секунды
        setTimeout(() => {
            closeModal();
        }, 1500);
    });
}

// Плавный скролл для навигации (опционально)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Открытие формы по якорю, если есть GET-параметр (для демо)
if (window.location.hash === '#form') {
    const formSection = document.getElementById('form-section');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
}
