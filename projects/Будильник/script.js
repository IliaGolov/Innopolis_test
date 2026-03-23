(function() {
  // DOM элементы
  const form = document.getElementById('leadForm');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const feedbackDiv = document.getElementById('formFeedback');
  const heroCta = document.getElementById('heroCtaBtn');

  // Функция показа сообщения (успех/ошибка)
  function showMessage(text, type) {
    feedbackDiv.textContent = text;
    feedbackDiv.className = `form-message ${type}`;
    feedbackDiv.style.display = 'block';
    feedbackDiv.style.opacity = '1';
    
    // автоматически скрыть через 5 секунд
    setTimeout(() => {
      if (feedbackDiv.className.includes('form-message')) {
        feedbackDiv.style.opacity = '0';
        setTimeout(() => {
          if (feedbackDiv.className.includes('form-message')) {
            feedbackDiv.style.display = 'none';
            feedbackDiv.style.opacity = '';
          }
        }, 300);
      }
    }, 5000);
  }

  // Валидация email
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Обработка отправки формы
  function handleSubmit(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name) {
      showMessage('Пожалуйста, укажите ваше имя', 'error');
      nameInput.focus();
      return;
    }
    
    if (!email) {
      showMessage('Введите email для отправки доступа', 'error');
      emailInput.focus();
      return;
    }
    
    if (!isValidEmail(email)) {
      showMessage('Укажите корректный email (например, name@domain.ru)', 'error');
      emailInput.focus();
      return;
    }

    // Имитация запроса к серверу
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Отправка...';
    submitBtn.disabled = true;

    // Эмуляция отправки данных (здесь можно заменить на реальный fetch запрос)
    setTimeout(() => {
      console.log(`[lead] Имя: ${name}, Email: ${email}`);
      
      // Здесь можно добавить реальную отправку на сервер
      // fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email })
      // });
      
      showMessage(`✅ Спасибо, ${name}! Мы отправили приглашение на ${email}. Переходите в личный кабинет.`, 'success');
      
      // Очистка формы
      form.reset();
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;

      // Сохраняем в localStorage для демонстрации
      try {
        const leads = JSON.parse(localStorage.getItem('leads') || '[]');
        leads.push({ name, email, date: new Date().toISOString() });
        localStorage.setItem('leads', JSON.stringify(leads));
      } catch(e) {}
    }, 800);
  }

  // Добавляем обработчик формы
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Обработка клика по CTA кнопке — плавный скролл к форме
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      const formSection = document.getElementById('form-block');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // небольшой акцент на поле имени
        setTimeout(() => {
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  }

  // Проверка якоря в URL
  if (window.location.hash === '#form-block') {
    setTimeout(() => {
      const formSection = document.getElementById('form-block');
      if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
})();
