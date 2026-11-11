let categories = {};
let hints = {};

let word = "";
let display = [];
let guessed = [];

let lives = 0;
let hintLives = 0;

let totalScore = 0;
let wins = 0;
let losses = 0;
let highScore = 0;

const difficultySelect =
    document.getElementById("difficulty");

const topicSelect =
    document.getElementById("topic");

const startBtn =
    document.getElementById("startBtn");

const guessBtn =
    document.getElementById("guessBtn");

updateTopics();

difficultySelect.addEventListener(
    "change",
    updateTopics
);

function updateTopics() {

    topicSelect.innerHTML = "";

    let current;

    switch (difficultySelect.value) {

        case "easy":
            current = easyCategories;
            break;

        case "medium":
            current = mediumCategories;
            break;

        case "hard":
            current = hardCategories;
            break;

        case "extreme":
            current = extremeCategories;
            break;

        case "impossible":
            current = impossibleCategories;
            break;
    }

    Object.keys(current).forEach(topic => {

        const option =
            document.createElement("option");

        option.value = topic;
        option.textContent = topic;

        topicSelect.appendChild(option);
    });
}

startBtn.addEventListener(
    "click",
    startGame
);

function startGame() {

    document.getElementById(
        "message"
    ).textContent = "";

    document.getElementById(
        "hint"
    ).textContent = "";

    guessed = [];

    const difficulty =
        difficultySelect.value;

    switch (difficulty) {

        case "easy":
            categories = easyCategories;
            hints = easyHints;
            lives = 10;
            hintLives = 4;
            break;

        case "medium":
            categories = mediumCategories;
            hints = mediumHints;
            lives = 8;
            hintLives = 3;
            break;

        case "hard":
            categories = hardCategories;
            hints = hardHints;
            lives = 8;
            hintLives = 2;
            break;

        case "extreme":
            categories = extremeCategories;
            hints = {};
            lives = 7;
            hintLives = 0;
            break;

        case "impossible":
            categories = impossibleCategories;
            hints = {};
            lives = 6;
            hintLives = 0;
            break;
    }

    const topic =
        topicSelect.value;

    const words =
        categories[topic];

    word =
        words[
            Math.floor(
                Math.random() *
                words.length
            )
        ].toLowerCase();

    display = [];

    for (const char of word) {

        if (char === "-") {
            display.push("-");
        }
        else {
            display.push("_");
        }
    }

    document.getElementById(
        "topicName"
    ).textContent =
        topic;

    document.getElementById(
        "difficultyName"
    ).textContent =
        difficulty;

    render();
}

guessBtn.addEventListener(
    "click",
    guessLetter
);

function guessLetter() {

    const input =
        document.getElementById(
            "guessInput"
        );

    const guess =
        input.value
        .toLowerCase()
        .trim();

    input.value = "";

    if (guess.length !== 1) {
        return;
    }

    if (!/[a-z]/.test(guess)) {
        return;
    }

    if (guessed.includes(guess)) {
        return;
    }

    guessed.push(guess);

    if (word.includes(guess)) {

        for (
            let i = 0;
            i < word.length;
            i++
        ) {

            if (
                word[i] === guess
            ) {
                display[i] = guess;
            }
        }
    }
    else {

        lives--;
    }

    if (
        hintLives > 0 &&
        lives <= hintLives
    ) {

        if (
            hints[word]
        ) {

            document.getElementById(
                "hint"
            ).textContent =
                "Hint: " +
                hints[word];
        }
    }

    render();

    checkGameState();
}

function render() {

    document.getElementById(
        "word"
    ).textContent =
        display.join(" ");

    document.getElementById(
        "lives"
    ).textContent =
        "Lives: " + lives;

    document.getElementById(
        "guessed"
    ).textContent =
        "Guessed: " +
        guessed.join(", ");
}

function checkGameState() {

    if (
        !display.includes("_")
    ) {

        wins++;

        const earned =
            lives * 10;

        totalScore += earned;

        if (
            totalScore >
            highScore
        ) {
            highScore =
                totalScore;
        }

        document.getElementById(
            "message"
        ).textContent =
            "🎉 You Win! +" +
            earned +
            " points";

        updateStats();
    }

    if (
        lives <= 0
    ) {

        losses++;

        document.getElementById(
            "message"
        ).textContent =
            "💀 Game Over! Word: " +
            word;

        updateStats();
    }
}

function updateStats() {

    document.getElementById(
        "wins"
    ).textContent =
        "Wins: " + wins;

    document.getElementById(
        "losses"
    ).textContent =
        "Losses: " + losses;

    document.getElementById(
        "score"
    ).textContent =
        "Score: " +
        totalScore;

    document.getElementById(
        "highScore"
    ).textContent =
        "High Score: " +
        highScore;
}