import throttle from 'lodash.throttle';

const formElements = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const currentInput = {
  email: '',
  message: '',
};

const feedbackFormState = 'feedback-form-state';

formElements.form.addEventListener('submit', onFormSubmit);
formElements.email.addEventListener('input', throttle(emailInput, 500));
formElements.textarea.addEventListener('input', throttle(textareaInput, 500));

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  /* console.log(currentInput); */
  console.log(localStorageDataToOBject());
  localStorage.removeItem(feedbackFormState);
}

function emailInput(event) {
  currentInput.email = event.target.value;
  localStorage.setItem(feedbackFormState, currentInputToJSON());
}

function textareaInput(event) {
  currentInput.message = event.target.value;
  localStorage.setItem(feedbackFormState, currentInputToJSON());
}

function currentInputToJSON() {
  return JSON.stringify(currentInput);
}

function localStorageDataToOBject() {
  return JSON.parse(localStorage.getItem(feedbackFormState));
}

populateStorageData();

function populateStorageData() {
  const storageData = localStorageDataToOBject();
  if (storageData) {
    const { email, message } = storageData;
    if (email) {
      formElements.email.value = email;
      currentInput.email = email;
    }
    if (message) {
      formElements.textarea.value = message;
      currentInput.message = message;
    }
  }
}
