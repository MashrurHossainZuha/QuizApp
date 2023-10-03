// Define the quiz questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Jupiter"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Jupiter"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Jupiter"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Jupiter"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Jupiter"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Jupiter"
    }
];

// Global Variables
let score = 0; // for personal scores
let timer;
let seconds = 5; // 1 hour timer
let submitClicked = false;

// Display the quiz questions
function displayQuiz() {

    const instructionsContainer = document.getElementById("instructions");
    instructionsContainer.style.display = "none";

    const startQuizBtn = document.getElementById("start-quiz-btn");
    startQuizBtn.style.display = "none";

    document.getElementById('quiz-title').style.display = 'none';
    const quizContainer = document.getElementById("timer-container");
    quizContainer.style.display = "block";
    quizContainer.classList.remove('hidden');
    const timerContainer = document.getElementById("quiz-container");
    // Adding Style
    timerContainer.style.backgroundColor = '#294652';
    timerContainer.style.border = 'none';
    timerContainer.style.display = "block";

    // Show the submit button
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.classList.remove("hidden");

    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = "";

    // updating the timer
    const timerElement = document.getElementById("timer");


    function updateTimer() {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

        if (seconds <= 0) {
            clearInterval(interval); // stops calling the function
            timerElement.textContent = "Time up!";
        }

        seconds--;
    }

    updateTimer();
    // calls the function update func at every interval
    const interval = setInterval(updateTimer, 1000); // 1000ms = 1 second interval

    // Generating Each Questiosn
    for (let i = 0; i < quizQuestions.length; i++) {
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        const question = document.createElement("p");
        question.classList.add("question");
        question.textContent = (i+1) + '. ' + quizQuestions[i].question;
        questionContainer.appendChild(question);

        const options = quizQuestions[i].options;
        for (let j = 0; j < options.length; j++) {
            const option = document.createElement("input");
            option.setAttribute("type", "radio");
            option.setAttribute("name", "answer-" + i);
            option.setAttribute("value", options[j]);
            questionContainer.appendChild(option);

            const optionLabel = document.createElement("label");
            optionLabel.textContent = options[j];
            questionContainer.appendChild(optionLabel);

            questionContainer.appendChild(document.createElement("br"));
        }

        quizElement.appendChild(questionContainer);
    }
}

// Handle the submission of the quiz
function submitQuiz() {

    const questionContainers = document.getElementsByClassName("question-container");
    let userAnswers = [];

    for (let i = 0; i < questionContainers.length; i++) {
        const selectedOption = questionContainers[i].querySelector('input[name="answer-' + i + '"]:checked');
        if (selectedOption) {
            userAnswers.push(selectedOption.value);
        } else {
            userAnswers.push("");
        }
    }

    score = calculateScore(userAnswers);
    clearTimeout(timer);
    showResult();
}

// Calculate the score
function calculateScore(userAnswers) {
    let score = 0;

    for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i].answer) {
            score++;
        }
    }

    // storing in session storage for django to access it
    sessionStorage.setItem('quiz_score', score);
    return score;

}



// Display the quiz result

function showResult() {

    if(submitClicked === false){
        submitClicked = true;
        document.getElementById('submit-btn').click();
    };
    console.log(score);
    // Send the score to the server

}


var autoClickbtn = document.getElementById('start-quiz-btn');
document.addEventListener('DOMContentLoaded', function(){
//    console.log('hehe');
    autoClickbtn.click();
});

document.getElementById("start-quiz-btn").addEventListener("click", function () {
    displayQuiz();
//    console.log('inside start quiz button');

    timer = setTimeout(function () {
        showResult(); // Automatically submit the quiz when the timer ends
    }, seconds * 1000);
});


document.getElementById("submit-btn").addEventListener("click", function(event) {
    document.getElementById("submit-btn").disabled = true;
    event.preventDefault();
    submitClicked = true;// Prevent page reload
    submitQuiz();
});
