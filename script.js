var hr = 0;
var min = 0;
var sec = 0;
var count = 0;
var timer = false; // Timer decide true :start ;  false:stop

function start() {
    timer = true;
    stopwatch();
}

function stop() {
    timer = false;
}

function reset() {
    timer = false;

    hr = 0;
    min = 0;
    sec = 0;
    count = 0;

    document.getElementById("hr").innerHTML = "00"; 
    document.getElementById("min").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("count").innerHTML = "00";
}

function stopwatch() {
    if (timer == true) {
        count = count + 1; //after 10 millisecond count value increases

        if (count == 100) {   // count = 100 then second is increases by 1
            sec = sec + 1;
            count = 0;
        }
        if (sec == 60) {     // second = 60 then min is incre by 1
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {    // min = 60 then hour is incre by 1
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        // store the value in string
        var hrString = hr;
        var minString = min;
        var secString = sec;
        var countString = count;

        if (hr < 10) {
            hrString = "0" + hrString
        }
        if (min < 10) {
            minString = "0" + minString
        }
        if (sec < 10) {
            secString = "0" + secString
        }
        if (count < 10) {
            countString = "0" + countString
        }

        document.getElementById("hr").innerHTML = hrString;
        document.getElementById("min").innerHTML = minString;
        document.getElementById("sec").innerHTML = secString;
        document.getElementById("count").innerHTML = countString;

        setTimeout("stopwatch()", 10); // setTimeout() method calls a function after a number of milliseconds.
    }
}