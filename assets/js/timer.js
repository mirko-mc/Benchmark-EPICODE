const anello = document.querySelector('.anello');
let counter = 0;
const anelloInterval = setInterval(() => {
  anello.style.background = `conic-gradient(grey ${counter}%, aqua 0%) border-box`;
  counter += 3.3;
  if (counter < 0) {
    clearInterval(anelloInterval);
  }
}, 1000);