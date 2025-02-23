const minuteDisplay = document.getElementById('minutes');
const secondDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start-btn');
const nextModeButton = document.getElementById('nextMode-btn');
const resetButton = document.getElementById('reset-btn');
const buttonCurrentMode = document.getElementById('currentMode');
const imgStartButton = document.getElementById('start-btn-img');

let currentMode = 0; // 0 = focusMode, 1 = break
let state = false; // false = stopped, true = running
let timerInterval;
let remainingSeconds;

const lightModeColors = {
    bgFocusMode : '#F2FFF5',
    primaryFocusMode : '#14401D',
    secundaryFocusMode : '#8CE8A1',
    thirdFocusMode : '#DAFAE0',
    timerColorFocusMode : '#14401D',
    fontColorFocusMode : '#14401D',
    mainFocusButtonColor : '#296635',
    secondaryFocusButtonColor : '#289c3f',

    bgBreakMode : '#FFF2F2',
    primaryBreakMode : '#471515',
    secundaryBreakMode : '#ff7373',
    thirdBreakMode : '#fab4b4',
    timerColorBreakMode : '#471515',
    fontColorBreakMode : '#fff',
    mainBreakButtonColor : '#782424',
    secondaryBreakButtonColor : '#b84f4f',
}

function startTimer() {

    if (currentMode === 0) {
        if (state) {
            state = false;
            clearInterval(timerInterval);
            
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
        document.body.style.backgroundColor = lightModeColors.bgFocusMode;
        minuteDisplay.style.color = lightModeColors.timerColorFocusMode;
        secondDisplay.style.color = lightModeColors.timerColorFocusMode;
        startButton.style.backgroundColor = lightModeColors.mainFocusButtonColor;
        startButton.style.color = lightModeColors.fontColorFocusMode;
        nextModeButton.style.backgroundColor = lightModeColors.secondaryFocusButtonColor;
        nextModeButton.style.color = lightModeColors.fontColorFocusMode;
        resetButton.style.backgroundColor = lightModeColors.secondaryFocusButtonColor;
        resetButton.style.color = lightModeColors.fontColorFocusMode;
        buttonCurrentMode.style.backgroundColor = lightModeColors.thirdFocusMode;
        buttonCurrentMode.style.color = lightModeColors.fontColorFocusMode;
        
    }else{
        document.body.style.backgroundColor = lightModeColors.bgBreakMode;
        minuteDisplay.style.color = lightModeColors.timerColorBreakMode;
        secondDisplay.style.color = lightModeColors.timerColorBreakMode;
        startButton.style.backgroundColor = lightModeColors.mainBreakButtonColor;
        startButton.style.color = lightModeColors.fontColorBreakMode;
        nextModeButton.style.backgroundColor = lightModeColors.secondaryBreakButtonColor;
        nextModeButton.style.color = lightModeColors.fontColorBreakMode;
        resetButton.style.backgroundColor = lightModeColors.secondaryBreakButtonColor;
        resetButton.style.color = lightModeColors.fontColorBreakMode;
        buttonCurrentMode.style.backgroundColor = lightModeColors.thirdBreakMode;
        buttonCurrentMode.style.color = lightModeColors.fontColorBreakMode;
    }
}

