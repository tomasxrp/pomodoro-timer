let timer;
let focusTime = 25;
let focusTimeToSeconds;
var timerState = new Boolean(false);
const timerDisplay = document.querySelector('.timer h1');
const startButton = document.getElementById('btn-start');
const resetButton = document.getElementById('btn-reset');

const sound = new Audio('./resource/alarma.mp3'); 


function startTimer() {
    if (timerState == false) {
        timer = setInterval(updateTimer, 1000);
        timerState = true;
        startButton.textContent = 'Pausar';
    } else {
        clearInterval(timer);
        timerState = false;
        startButton.textContent = 'Comenzar';
    }
}

function resetTimer() {
    clearInterval(timer);
    timerState = false;
    startButton.textContent = 'Comenzar';
    focusTimeToSeconds = minuteToSeconds(focusTime);
    displayTime(focusTimeToSeconds);
}



function updateTimer() {
    if (focusTimeToSeconds > 0) {
        focusTimeToSeconds--;
        displayTime(focusTimeToSeconds);
    }
    else{
        clearInterval(timer);
        playSound();
    }
    
}

function playSound() {
    sound.play();
}


function minuteToSeconds(minutes) {
    return minutes * 60;
}

function startFocus(){
    focusTime = 25;
    focusTimeToSeconds = minuteToSeconds(focusTime);

    displayTime(focusTimeToSeconds);
}

function startShortBreak(){
    focusTime = 5;
    focusTimeToSeconds = 2;

    displayTime(focusTimeToSeconds);
}

function startLongBreak(){
    focusTime = 15;
    focusTimeToSeconds = minuteToSeconds(focusTime);

    displayTime(focusTimeToSeconds);
}


function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}