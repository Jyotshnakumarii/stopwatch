const timerMilliSec = document.getElementById('timerMilliSec');
const timerSec = document.getElementById('timerSec');
const timerMins = document.getElementById('timerMins');
const timerHrs = document.getElementById('timerHrs');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapRecord = document.getElementById('lapRecord');

let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

let displayMilisec = miliseconds;
let displaySec = seconds;
let displayMins = minutes;
let displayHours = hours;

let interval = null;

let status = "stopped";

let lapNow = null;

function start() {
    miliseconds++;

    // two digit number
    if (miliseconds < 10) displayMilisec = "0" + miliseconds.toString();
    else displayMilisec = miliseconds;

    if (seconds < 10) displaySec = "0" + seconds.toString();
    else displaySec = seconds;

    if (minutes < 10) displayMins = "0" + minutes.toString();
    else displayMins = minutes;

    if (hours < 10) displayHours = "0" + hours.toString();
    else displayHours = hours;

    // mili-sec, sec-min, min-hour
    if (miliseconds / 100 === 1) {
        seconds++;
        miliseconds = 0;

        if (seconds / 60 === 1) {
            minutes++;
            seconds = 0;
            miliseconds = 0;

            if (minutes / 60 === 1) {
                hours++;
                minutes = 0;
                seconds = 0;
                miliseconds = 0;
            }
        }
    }

    timerMilliSec.innerHTML = displayMilisec;
    timerSec.innerHTML = displaySec;
    timerMins.innerHTML = displayMins;
    timerHrs.innerHTML = displayHours;
}

function startStop() {
    if (status === "stopped") {
        interval = setInterval(start, 10); // The setInterval() method continues calling the function until clearInterval() is called, or the window is closed.
        startBtn.innerHTML = "Stop";
        resetBtn.innerHTML = "Lap";
        status = "started";
    } else {
        clearInterval(interval); // The clearInterval() method clears a timer set with the setInterval() method.
        startBtn.innerHTML = "Start";
        resetBtn.innerHTML = "Reset";
        status = "stopped";
    }
}

function reset() {
    clearInterval(interval);
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerMilliSec.innerHTML = "00";
    timerSec.innerHTML = "00";
    timerMins.innerHTML = "00";
    timerHrs.innerHTML = "00";
    startBtn.innerHTML = "Start";
    lapRecord.innerHTML = '';
    status = "stopped";
}

function lap() {
    if (status === "started") {
        lapNow = `<div class="lap">${displayHours} : ${displayMins} : ${displaySec} : ${displayMilisec}</div>`;
        lapRecord.innerHTML += lapNow;
    }
}

startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', function () {
    if (status === "started") {
        lap();
    } else {
        reset();
    }
});