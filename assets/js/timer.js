const anello = document.querySelector('.anello');
let counter = 0;
let h1Element = document.querySelector('h1');
let h1Counter = 30;
const h1Interval = setInterval(() => {
  h1Element.textContent = h1Counter;
  h1Counter--;
  anello.style.background = `conic-gradient(grey ${counter}%, aqua 0%) border-box`;
  counter += 3.3;
  if (h1Counter < 0) {
    clearInterval(h1Interval);
  }
}, 1000);