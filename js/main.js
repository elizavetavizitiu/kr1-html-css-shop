// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}
// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
if (orderForm && successMessage && orderDialog) {
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});
}
/* Фильтрация товаров */

const filterForm = document.getElementById(
  'catalog-filter-form'
);

if (filterForm) {
  const products = document.querySelectorAll(
    '.catalog-products .product-card'
  );

  const result = document.getElementById(
    'filter-result'
  );

  function applyFilters() {
    const category = filterForm.querySelector(
      'input[name="category"]:checked'
    ).value;

    const from = document.getElementById(
      'price-from'
    ).value;

    const to = document.getElementById(
      'price-to'
    ).value;

    let count = 0;

    products.forEach((product) => {
      const productCategory = product.dataset.category;
      const productPrice = product.dataset.price;

      const categoryMatches =
        category === 'all' ||
        category === productCategory;

      const priceMatches =
        (from === '' && to === '') ||
        (productPrice !== '' &&
          (from === '' || Number(productPrice) >= Number(from)) &&
          (to === '' || Number(productPrice) <= Number(to)));

      if (categoryMatches && priceMatches) {
        product.hidden = false;
        count++;
      } else {
        product.hidden = true;
      }
    });

    result.textContent = 'Найдено товаров: ' + count;
  }

  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters();
  });

  filterForm.addEventListener('reset', () => {
    requestAnimationFrame(applyFilters);
  });
}

/* Кнопка наверх */

const backToTop = document.getElementById(
  'back-to-top'
);

if (backToTop) {
  window.addEventListener('scroll', () => {

    if (window.scrollY > 250) {
      backToTop.classList.add(
        'back-to-top--visible'
      );
    } else {
      backToTop.classList.remove(
        'back-to-top--visible'
      );
    }

  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
