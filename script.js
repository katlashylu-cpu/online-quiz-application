const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: "William Shakespeare"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const timeEl = document.getElementById("time");
const counterEl = document.getElementById("question-counter");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  timer = setInterval(updateTimer, 1000);

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  counterEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(option, li);
    optionsEl.appendChild(li);
  });
}

function updateTimer() {
  timeLeft--;
  timeEl.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    feedbackEl.textContent = "Time's up!";
    disableOptions();
  }
}

function checkAnswer(selected, element) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    feedbackEl.textContent = "Correct!";
    element.style.backgroundColor = "#c8e6c9";
  } else {
    feedbackEl.textContent = `Wrong! Correct answer: ${correct}`;
    element.style.backgroundColor = "#ffcdd2";
  }
  disableOptions();
}

function disableOptions() {
  const options = document.querySelectorAll("#options li");
  options.forEach(opt => opt.onclick = null);
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} out of ${questions.length}`;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

loadQuestion();
