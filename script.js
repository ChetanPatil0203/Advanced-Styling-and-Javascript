const quiz = [
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Mark Language",
      "None"
    ],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Java", "Python"],
    answer: 1
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Spring"],
    answer: 2
  },
  {
    question: "JavaScript is a ____ language?",
    options: ["Compiled", "Interpreted", "Assembly", "Machine"],
    answer: 1
  }
];

let currentQ = 0;
let score = 0;
let answered = false;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreBox = document.getElementById("scoreBox");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");

loadQuestion();
startTimer();

function loadQuestion() {
  answered = false;
  timeLeft = 15;
  timerEl.innerText = `⏱ Time: ${timeLeft}`;
  progressEl.innerText = `Q ${currentQ + 1}/${quiz.length}`;
  nextBtn.style.display = "none";

  questionEl.innerText = quiz[currentQ].question;
  optionsEl.forEach((btn, i) => {
    btn.innerText = quiz[currentQ].options[i];
    btn.classList.remove("correct", "wrong");
  });
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱ Time: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}

function checkAnswer(index) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  if (index === quiz[currentQ].answer) {
    optionsEl[index].classList.add("correct");
    score++;
  } else {
    optionsEl[index].classList.add("wrong");
    optionsEl[quiz[currentQ].answer].classList.add("correct");
  }
  nextBtn.style.display = "block";
}

function autoNext() {
  optionsEl[quiz[currentQ].answer].classList.add("correct");
  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentQ++;
  if (currentQ < quiz.length) {
    loadQuestion();
    startTimer();
  } else {
    showScore();
  }
}

function showScore() {
  clearInterval(timer);
  questionEl.innerText = "Quiz Completed 🎉";
  document.querySelector(".options").style.display = "none";
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
  scoreBox.innerHTML = `<h3>Your Score: ${score}/${quiz.length}</h3>`;
}

function restartQuiz() {
  currentQ = 0;
  score = 0;
  document.querySelector(".options").style.display = "block";
  scoreBox.innerHTML = "";
  restartBtn.style.display = "none";
  loadQuestion();
  startTimer();
}
