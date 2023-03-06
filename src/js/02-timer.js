// Importar librerías
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// Obtener elementos del DOM
const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

// Variables
let startDate;
let timerId = null;
startBtn.disabled = true;

// Funciones de utilidad
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    let text = value.toString();
    return text.padStart(2, "0");
}

// Función para habilitar/deshabilitar botón de inicio
function updateStartButton(today, selectedDate) {
    if (today >= selectedDate) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
}

// Función para actualizar temporizador
function updateTimer() {
    const today = new Date();
    const ms = startDate - today;
    const dateDiference = convertMs(ms);

    daysEl.textContent = addLeadingZero(dateDiference.days);
    hoursEl.textContent = addLeadingZero(dateDiference.hours);
    minutesEl.textContent = addLeadingZero(dateDiference.minutes);
    secondsEl.textContent = addLeadingZero(dateDiference.seconds);

    if (ms <= 0) {
        clearInterval(timerId);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
    }
}

// Evento al seleccionar fecha/hora
const onClose = (selectedDates) => {
    const today = new Date();
    const selectedDate = selectedDates[0];

    updateStartButton(today, selectedDate);
    startDate = selectedDate;
};

// Evento al hacer clic en el botón de inicio
const onClick = () => {
    startBtn.disabled = true;
    timerId = setInterval(updateTimer, 1000);
};

// Configuración de flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
};

flatpickr(input, options);

// Asignar eventos a botones
startBtn.addEventListener("click", onClick);