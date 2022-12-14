"use strict"

const calcBtn = document.getElementById('calc-btn');
const resetBtn = document.getElementById('reset-btn');
const timeTextBox = document.getElementById('time-input');
const resultLabel = document.getElementById('result');

calcBtn.addEventListener('click', () => processTime());
resetBtn.addEventListener('click', () => clearForm());

function processTime () {
    let input = timeTextBox.value;
    let time = parseTime(timeTextBox.value);

    if (Date.now() < time.getTime()) {
        alert('Current time can\'t be less than beginning of classes time!')

        return;
    }

    resultLabel.value = calculateMinutes(time);
}

function calculateMinutes (beginningTime) {
    let timeDiff = Date.now()- beginningTime.getTime();
    let minutesDiff = Math.ceil(timeDiff / (1000 * 60));

    return minutesDiff;
}

function parseTime (line) {
    const input = line.split(':');
    const currentTime = new Date();
    const time = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        new Number(input[0]),
        new Number(input[1])
    );

    return time;
}

function clearForm () {
    resultLabel.innerText = '0';
}
