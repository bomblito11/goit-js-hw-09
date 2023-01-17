const startChanging = document.querySelector('[data-start]');
const stopChanging = document.querySelector('[data-stop]');
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopChanging.disabled = true;

function changeColor() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    startChanging.disabled = true;
    stopChanging.disabled = false;
  }, 500);
}

function stopChangeColor() {
  clearInterval(intervalId);
  startChanging.disabled = false;
  stopChanging.disabled = true;
}

startChanging.addEventListener('click', changeColor);

stopChanging.addEventListener('click', stopChangeColor);
