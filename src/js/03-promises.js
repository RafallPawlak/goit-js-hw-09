import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElement = document.querySelector('.form');
let delayInp = null;
let stepInp = null;
let amountInp = null;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const submitHandler = event => {
  event.preventDefault();
  if (!event.target.tagName === 'BUTTON') return;

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  delayInp = Number(delay.value);
  stepInp = Number(step.value);
  amountInp = Number(amount.value);

  for (let i = 1; i <= amountInp; i++) {
    createPromise(i, delayInp)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInp += stepInp;
  }

  event.currentTarget.reset();
};

formElement.addEventListener('submit', submitHandler);
