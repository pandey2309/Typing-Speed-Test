let selectedTime = 30;
let timeLeft = 30;
let timer;
let started = false;

let correctChars = 0;
let totalChars = 0;

const textDiv = document.getElementById("text");
const input = document.getElementById("input");
const timerDiv = document.getElementById("timer");

function loadText() {
    textDiv.innerHTML = "";
    getWords().split("").forEach(char => {
        let span = document.createElement("span");
        span.innerText = char;
        textDiv.appendChild(span);
    });
}

loadText();

function setTime(t) {
    selectedTime = t;
    restartTest();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            input.disabled = true;
            showResult();
        }
    }, 1000);
}

input.addEventListener("input", () => {
    if (!started) {
        started = true;
        startTimer();
    }

    const spans = textDiv.querySelectorAll("span");
    const typed = input.value.split("");

    correctChars = 0;
    totalChars = typed.length;

    spans.forEach((span, i) => {
        if (!typed[i]) {
            span.classList.remove("correct", "incorrect");
        } else if (typed[i] === span.innerText) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
            correctChars++;
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });

    if (typed.length > spans.length - 5) {
        loadText();
        input.value = "";
    }
});

function showResult() {
    let minutes = selectedTime / 60;
    let wpm = Math.round((totalChars / 5) / minutes);
    let accuracy = Math.round((correctChars / totalChars) * 100 || 0);

    document.getElementById("wpm").innerText = wpm;
    document.getElementById("accuracy").innerText = accuracy;

    fetch("/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ wpm, accuracy })
    });
}

function restartTest() {
    clearInterval(timer);
    timeLeft = selectedTime;
    timerDiv.innerText = timeLeft;

    started = false;
    correctChars = 0;
    totalChars = 0;

    input.value = "";
    input.disabled = false;

    document.getElementById("wpm").innerText = 0;
    document.getElementById("accuracy").innerText = 0;

    loadText();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}
