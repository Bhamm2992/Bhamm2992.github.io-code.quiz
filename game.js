const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const timerElement = document.getElementById("timerCount");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


var timerInterval;
var timerCount = 60;

let questions = [
    {
        question: "Where was the 2021 NBA All Star Game held",
        choice1: "Miami",
        choice2: "California",
        choice3: "Mexico",
        choice4: "Atlanta",
        answer: 4
    },
    {

        question: "What is the Tesla company Known for?",
        choice1: "Eletric Cars",
        choice2: "Solar Panels",
        choice3: "Tech Based",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Who won rookie of the year?",
        choice1: "Lamelo Ball",
        choice2: "James Wiseman",
        choice3: "Isaiah Stewart",
        choice4: "Cole Anthony",
        answer: 1
    },
    {
        question: "What position does Lebon James play?",
        choice1: "Point Guard",
        choice2: "Shooting Guard",
        choice3: "Small Foward",
        choice4: "Power Foward",
        answer: 3
    },
    {
        question: "Who created Tesla?",
        choice1: "Elon Musk",
        choice2: "Mark Zuckerberg",
        choice3: "Martin Eberhard",
        choice4: "Bill Gates",
        answer: 3
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    timerInterval = setInterval(timer, 1000);
    availableQuesions = [...questions];
    getNewQuestion();
};

timer = () => {
    timerCount--;
    if (timerCount === 0) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRecentScore", score);
        // takes you to the end of page
        return window.location.assign("complete.html");
    } else {
        timerElement.textContent = timerCount;
    }
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRecentScore", score);
        //takes you to the end of page
        return window.location.assign("complete.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Updates the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            timerCount = timerCount + 5;
            incrementScore(CORRECT_BONUS);

        } else {
            timerCount = timerCount - 10;

        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();