import flatpickr from "flatpickr";
import { Report } from 'notiflix/build/notiflix-report-aio';
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";

Report.init({
  svgSize: '30px',
  messageFontSize: '15px',
  });

const startBtn = document.querySelector("button[data-start]");
startBtn.insertAdjacentHTML("afterend", '<button type="button" data-stop>Stop</button>');
const stopBtn = document.querySelector("button[data-stop]");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");
const inputDate = document.querySelector("#datetime-picker");
const timerDesign = document.querySelector(".timer");
const countDesign = [...document.querySelectorAll('.field')];
const numDesign = [...document.querySelectorAll('.value')];
const labelDesign = [...document.querySelectorAll('.label')];

const inputDesign = {
  marginLeft: "10px",
  width: "300px",
  height: "30px"
}
Object.assign(inputDate.style, inputDesign);

const startBtnDesign = {
  width: "75px",
  height: "30px"
}
Object.assign(startBtn.style, startBtnDesign);

const stopBtnDesign = {
  marginLeft: "10px",
  width: "75px",
  height: "30px"
}
Object.assign(stopBtn.style, stopBtnDesign);

timerDesign.style.display = "flex";

countDesign.forEach((element) => {
  const customValue = {
    display: "flex-box",
    marginLeft: "10px",
    marginRight: "10px",
    width: "80px",
    height: "80px",
  }
  Object.assign(element.style, customValue)
});

numDesign.forEach((element) => {
  const customValue = {
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "50px"
  }
  Object.assign(element.style, customValue)
});

labelDesign.forEach((element) => {
  const customValue = {
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Orbitron', sans-serif",
  }
  Object.assign(element.style, customValue)
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      
    if (selectedDates[0] < options.defaultDate) {
      Report.failure('Wrong date!', 'Please choose a date in the future', 'OK');
    }
    else {
      startBtn.disabled = false;

      startBtn.addEventListener("click", () => {
        startBtn.disabled = true;
        
        const timer = setInterval(() => {
          const actualDate = Date.now();
          const ms = selectedDates[0] - actualDate;
          dataDays.textContent = addLeadingZero(convertMs(ms).days);
          dataHours.textContent = addLeadingZero(convertMs(ms).hours);
          dataMinutes.textContent = addLeadingZero(convertMs(ms).minutes);
          dataSeconds.textContent = addLeadingZero(convertMs(ms).seconds); 
          
          if (
            dataDays.textContent === '00' &&
            dataHours.textContent === '00' &&
            dataMinutes.textContent === '00' &&
            dataSeconds.textContent === '00'
              ) {
                 clearInterval(timer);
          } else if (selectedDates[0] < actualDate) {
            dataDays.textContent = '00';
            dataHours.textContent = '00';
            dataMinutes.textContent = '00';
            dataSeconds.textContent = '00';
            clearInterval(timer);
              Report.failure('The countdown is over', 'Please select a different date', 'OK');
              }
          stopBtn.addEventListener("click", () => {
            clearInterval(timer);
            startBtn.disabled = false;
          });  

          function addLeadingZero(value) {
            if (value.toString().length < 2) {
              return value.toString().padStart(2, "0");
            }
              return value;
            };

          }, 1000);
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
