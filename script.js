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
let milliseconds = 0;

let displayMillisec = milliseconds;
let displaySec = seconds;
let displayMins = minutes;
let displayHours = hours;

let interval = null;

let status = "stopped";

let previousLapTime = null;
let lapCount = 0;

function start() {
  milliseconds++;
// two digit number
  if (milliseconds < 10) displayMillisec = "0" + milliseconds.toString();
  else displayMillisec = milliseconds;

  if (seconds < 10) displaySec = "0" + seconds.toString();
  else displaySec = seconds;

  if (minutes < 10) displayMins = "0" + minutes.toString();
  else displayMins = minutes;

  if (hours < 10) displayHours = "0" + hours.toString();
  else displayHours = hours;
// mili-sec, sec-min, min-hour
  if (milliseconds / 100 === 1) {
    seconds++;
    milliseconds = 0;

    if (seconds / 60 === 1) {
      minutes++;
      seconds = 0;
      milliseconds = 0;

      if (minutes / 60 === 1) {
        hours++;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
      }
    }
  }

  timerMilliSec.innerHTML = displayMillisec;
  timerSec.innerHTML = displaySec;
  timerMins.innerHTML = displayMins;
  timerHrs.innerHTML = displayHours;
}

function startStop() {
  if (status === "stopped") {
    interval = setInterval(start, 10);
    startBtn.innerHTML = "Stop";
    resetBtn.innerHTML = "Lap";
    status = "started";
  } else {
    clearInterval(interval);
    startBtn.innerHTML = "Start";
    resetBtn.innerHTML = "Reset";
    status = "stopped";
  }
}

function reset() {
  clearInterval(interval);
  milliseconds = 0;
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
  previousLapTime = null;
  lapCount = 0;
}

function lap() {
  if (status === "started") {
    const currentLapTime = `${displayHours}:${displayMins}:${displaySec}:${displayMillisec}`;

    if (previousLapTime) {
      const previousLapTimeArray = previousLapTime.split(':');
      const currentLapTimeArray = currentLapTime.split(':');
// parseInt function is used to convert the time components from strings to integers before subtracting them.
      let diffHours = parseInt(currentLapTimeArray[0], 10) - parseInt(previousLapTimeArray[0], 10);
      let diffMinutes = parseInt(currentLapTimeArray[1], 10) - parseInt(previousLapTimeArray[1], 10);
      let diffSeconds = parseInt(currentLapTimeArray[2], 10) - parseInt(previousLapTimeArray[2], 10);
      let diffMilliseconds = parseInt(currentLapTimeArray[3], 10) - parseInt(previousLapTimeArray[3], 10);

      if (diffMilliseconds < 0) {
        diffSeconds--;
        diffMilliseconds += 100;
      }

      if (diffSeconds < 0) {
        diffMinutes--;
        diffSeconds += 60;
      }

      if (diffMinutes < 0) {
        diffHours--;
        diffMinutes += 60;
      }

      const paddedDiffHours = diffHours.toString().padStart(2, '0');
      const paddedDiffMinutes = diffMinutes.toString().padStart(2, '0');
      const paddedDiffSeconds = diffSeconds.toString().padStart(2, '0');
      const paddedDiffMilliseconds = diffMilliseconds.toString().padStart(2, '0');

      const lapDifference = `<div class="lap">lap${lapCount}: ${paddedDiffHours}:${paddedDiffMinutes}:${paddedDiffSeconds}:${paddedDiffMilliseconds}</div>`;
      lapRecord.innerHTML += lapDifference;
    } else {
      const firstLap = `<div class="lap">lap${lapCount}: ${currentLapTime}</div>`;
      lapRecord.innerHTML += firstLap;
    }
// previousLapTime variable with the current lap time, and the lapCount variable is incremented to keep track of the lap number.
    previousLapTime = currentLapTime;
    lapCount++;
  }
}

startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', function() {
  if (status === "started") {
    lap();
  } else {
    reset();
  }
});
