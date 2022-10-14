const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const colorBckg = document.querySelector("body");
let timer = null;
 stopBtn.disabled = true; 

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    stopBtn.disabled = false; 
    timer = setInterval(() => {
        colorBckg.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    startBtn.disabled = false; 
    stopBtn.disabled = true; 
    clearInterval(timer);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};



















// getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }