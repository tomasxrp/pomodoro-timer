let timer;
let focusTime = 25;
let focusTimeToSeconds;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function minuteToSeconds(minutes) {
    return minutes * 60;
}

function startFocus(){
    focusTime = 25;
    focusTimeToSeconds = minuteToSeconds(focusTime);
    startTimer();
}