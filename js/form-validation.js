/**
 * CEYLON ESCAPES — Form Validation & Customer Enquiry Engine
 * Rigorous client-side validation, accessible feedback, URL pre-fill, and modal confirmation
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initNewsletterForms();
  handleUrlPreFill();
});

/**
 * Handle Contact & Journey Enquiry Form
 */
function initContactForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateField = (input, isValid, errorMsg) => {
    let errorEl = input.parentElement.querySelector('.form-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error-msg';
      input.parentElement.appendChild(errorEl);
    }

    if (!isValid) {
      input.classList.add('invalid');
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = errorMsg;
      errorEl.style.display = 'block';
      return false;
    } else {
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
      errorEl.style.display = 'none';
      return true;
    }
  };

  // Real-time blur validation
  const nameInput = form.querySelector('[name="fullname"]');
  const emailInput = form.querySelector('[name="email"]');
  const arrivalInput = form.querySelector('[name="arrival_date"]');
  const departureInput = form.querySelector('[name="departure_date"]');
  const travellersInput = form.querySelector('[name="travellers"]');
  const messageInput = form.querySelector('[name="message"]');

  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, nameInput.value.trim().length >= 2, 'Please enter your full name.');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'Please enter a valid email address.');
    });
  }

  if (arrivalInput) {
    arrivalInput.addEventListener('change', () => {
      validateField(arrivalInput, arrivalInput.value !== '', 'Please select an estimated arrival date.');
    });
  }

  if (departureInput) {
    departureInput.addEventListener('change', () => {
      validateField(departureInput, departureInput.value !== '', 'Please select an estimated departure date.');
    });
  }

  if (travellersInput) {
    travellersInput.addEventListener('input', () => {
      const val = parseInt(travellersInput.value, 10);
      validateField(travellersInput, !isNaN(val) && val >= 1, 'Please enter at least 1 traveller.');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10, 'Please share a brief message (minimum 10 characters).');
    });
  }

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = nameInput ? validateField(nameInput, nameInput.value.trim().length >= 2, 'Please enter your full name.') : true;
    const isEmailValid = emailInput ? validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'Please enter a valid email address.') : true;
    const isArrivalValid = arrivalInput ? validateField(arrivalInput, arrivalInput.value !== '', 'Please select an arrival date.') : true;
    const isDepartureValid = departureInput ? validateField(departureInput, departureInput.value !== '', 'Please select a departure date.') : true;
    const isTravellersValid = travellersInput ? validateField(travellersInput, parseInt(travellersInput.value, 10) >= 1, 'Please enter travellers count.') : true;
    const isMessageValid = messageInput ? validateField(messageInput, messageInput.value.trim().length >= 10, 'Please provide details in your message.') : true;

    if (isNameValid && isEmailValid && isArrivalValid && isDepartureValid && isTravellersValid && isMessageValid) {
      // Show professional confirmation modal
      if (window.openGenericModal) {
        window.openGenericModal({
          title: 'Enquiry Received',
          tag: 'Ceylon Escapes Travel Desk',
          content: `
            <div style="text-align: center; padding: 1rem 0;">
              <div style="width: 60px; height: 60px; background: rgba(40, 114, 77, 0.12); color: var(--color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.2rem auto;">✓</div>
              <h3 style="margin-bottom: 0.8rem; color: var(--color-primary);">Thank you for your enquiry.</h3>
              <p class="lead" style="margin-bottom: 1.2rem;">We will get back to you with more information.</p>
              <p style="font-size: 0.9rem; color: var(--color-gray-dark); line-height: 1.6;">Our destination specialists will review your proposed dates (<strong>${arrivalInput.value}</strong> to <strong>${departureInput.value}</strong>) and travel style to prepare a tailored, sustainable island itinerary.</p>
              <div style="margin-top: 1.8rem;">
                <button class="btn btn-primary close-modal-trigger">Return to Website</button>
              </div>
            </div>
          `
        });
      } else {
        alert('Thank you for your enquiry. We will get back to you with more information.');
      }

      form.reset();
    } else {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });
}

/**
 * Handle Newsletter Forms
 */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(input.value.trim())) {
        if (window.showToast) {
          window.showToast('Thank you for subscribing to Ceylon Escapes travel inspirations!', 'success');
        } else {
          alert('Thank you for subscribing to Ceylon Escapes!');
        }
        input.value = '';
      } else {
        if (window.showToast) {
          window.showToast('Please enter a valid email address.', 'error');
        }
      }
    });
  });
}

/**
 * Pre-populate form based on URL parameters (e.g., ?tour=Classic%20Sri%20Lanka)
 */
function handleUrlPreFill() {
  const urlParams = new URLSearchParams(window.location.search);
  const tourParam = urlParams.get('tour');
  const destParam = urlParams.get('dest');

  const messageBox = document.querySelector('[name="message"]');
  const destSelect = document.querySelector('[name="preferred_destination"]');

  if (tourParam && messageBox) {
    messageBox.value = `Hello Ceylon Escapes team, I would like to enquire regarding the "${tourParam}" tour package. Please share current rates and customized options.`;
  }

  if (destParam && destSelect) {
    destSelect.value = destParam;
  }
}
