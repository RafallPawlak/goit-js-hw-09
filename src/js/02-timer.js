import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("button[data-start]");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");
const inputDate = document.querySelector("#datetime-picker");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let actualDate = new Date();
        if (selectedDates[0] < actualDate) {
            window.alert("Please choose a date in the future");
        } else {
            startBtn.disabled = false;

            startBtn.addEventListener("click", () => {
                const timer = setInterval(() => {
                    const ms = selectedDates[0] - actualDate;
                        //convertMs(ms);
                        //console.log(convertMs(ms).days);
                    dataDays.textContent = convertMs(ms).days;
                    dataHours.textContent = convertMs(ms).hours;
                    dataMinutes.textContent = convertMs(ms).minutes;
                    dataSeconds.textContent = convertMs(ms).seconds;
                    console.log(actualDate);
                  //  console.log(convertMs(ms));
                }, 1000);
              //  console.log(selectedDates[0]);
              //  console.log(actualDate);
            });
        }
    }
};

startBtn.disabled = true;

flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

