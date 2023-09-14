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
    answer: "Mars"
  }
];

let score = 0;

// Display the quiz questions
function displayQuiz() {

  const instructionsContainer = document.getElementById("instructions");
  instructionsContainer.style.display = "none";

  const startQuizBtn = document.getElementById("start-quiz-btn");
  startQuizBtn.style.display = "none";

  const quizContainer = document.getElementById("timer-container");
  quizContainer.style.display = "block";

  const timerContainer = document.getElementById("quiz-container");
  timerContainer.style.display = "block";
  // Show the submit button
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.classList.remove("hidden");

  const quizElement = document.getElementById("quiz");
  quizElement.innerHTML = "";

  // updating the timer
  const timerElement = document.getElementById("timer");
    let seconds = 3600; // 1 hour timer 

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
    const interval = setInterval(updateTimer, 1000); // 1000ms = 1 second interval 
    // calls the function update func at every interval

  for (let i = 0; i < quizQuestions.length; i++) {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

    const question = document.createElement("p");
    question.textContent = quizQuestions[i].question;
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
  console.log("Submit button clicked."); //
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

  return score;
}

// Display the quiz result
function showResult() {
  console.log("Showing result.");
  console.log(score)
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.style.display = "none";

  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";

  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score + " / " + quizQuestions.length;
  // Create an element for the end message
  const endMessage = document.createElement("p");
  endMessage.textContent = "Thanks for participating!";
  endMessage.id = "end-message"; // Add an ID for styling

  // Append the end message to the result container
  resultContainer.appendChild(endMessage);
}

// Add event listener to the start quiz button
document.getElementById("start-quiz-btn").addEventListener("click", displayQuiz);

document.getElementById("submit-btn").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent page reload
  submitQuiz();
});
