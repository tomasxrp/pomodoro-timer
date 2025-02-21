const minuteDisplay = document.getElementById('minutes');
const secondDisplay = document.getElementById('seconds');
const startButton = document.querySelector('start');
const buttonCurrentMode = document.getElementById('currentMode');

let currentMode = 0; // 0 = focusMode, 1 = break
let state = false; // false = stopped, true = running
let timerInterval;
let remainingSeconds;

function startTimer() {

    if (currentMode === 0) {
        if (state) {
            clearInterval(timerInterval);
            state = false;
        } else {
            state = true;
            if (!remainingSeconds) {
                remainingSeconds = minuteToSeconds(25); // Inicializa con 25 minutos si no hay tiempo restante
            }
            startFocusMode(remainingSeconds);
        }
    }
    else if (currentMode === 1) {
        if (state) {
            clearInterval(timerInterval);
            state = false;
        } else {
            console.log("state false")
            state = true;
            if (!remainingSeconds) {
                remainingSeconds = minuteToSeconds(5); // Inicializa con 25 minutos si no hay tiempo restante
            }
            startFocusMode(remainingSeconds);
        }
    }
}

function startFocusMode(seconds) {
    updateClock(seconds);

    timerInterval = setInterval(() => {
        seconds--;
        remainingSeconds = seconds; // Actualiza el tiempo restante
        if (seconds < 0) {
            clearInterval(timerInterval);
            console.log("Termina acaaaaaa")
            state = false;
            nextMode();
            startTimer();
            // Aquí puedes agregar lógica para cambiar de modo o notificar al usuario
        } else {
            updateClock(seconds);
        }
    }, 1000);
}

function nextMode(){
    if (currentMode === 0) {
        currentMode = 1;
        remainingSeconds = minuteToSeconds(5);
        updateClock(remainingSeconds);
        buttonCurrentMode.textContent = 'Break';
        changeColor();
    } else {
        currentMode = 0;
        remainingSeconds = minuteToSeconds(25);
        updateClock(remainingSeconds);
        buttonCurrentMode.textContent = 'Focus';
        changeColor();
    }
}

function updateClock(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    minuteDisplay.textContent = minutes.toString().padStart(2, '0');
    secondDisplay.textContent = remainingSeconds.toString().padStart(2, '0');
}

function minuteToSeconds(minutes) {
    return minutes * 60;
}

function changeColor(){
    if(currentMode === 0){
        document.body.style.backgroundColor = "#F2FFF5";
        minuteDisplay.style.color = "#14401D";
        secondDisplay.style.color = "#14401D";
    }else{
        document.body.style.backgroundColor = "#FFF2F2";
        minuteDisplay.style.color = "#471515";
        secondDisplay.style.color = "#471515";
    }
}