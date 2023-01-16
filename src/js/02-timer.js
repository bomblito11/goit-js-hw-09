import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hrs = document.querySelector('[data-hours]');
const mins = document.querySelector('[data-minutes]');
const secs = document.querySelector('[data-seconds]');

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else if (selectedDates[0].getTime() > Date.now()) {
      startBtn.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const countdownStart = () => {
  startBtn.disabled = true;
  const timer = setInterval(() => {
    const endTime = selectedDate - Date.now();
    if (endTime >= 0) {
      days.textContent = convertMs(endTime).days;
      hrs.textContent = convertMs(endTime).hours;
      mins.textContent = convertMs(endTime).minutes;
      secs.textContent = convertMs(endTime).seconds;
    } else {
      Notiflix.Notify.success('Time is up');
      clearInterval(timer);
    }
  }, 1000);
};

startBtn.addEventListener('click', countdownStart);
