const quiz = [
  {
    question: "Which month comes after June?",
    options: ["June", "July", "Sept", "Augus"],
    answer: 1,
  },
  {
    question: "What is the color of Banana?",
    options: ["yellow", "orange", "red", "blue"],
    answer: 0,
  },
  {
    question: "What is the addition of 2+5?",
    options: ["2", "4", "7", "8"],
    answer: 2,
  },
];

let availableQuestions = [];
let questionCount = 0;
const start_btn = document.querySelector(".start_btn");
const currentQuestion = document.querySelector(".question");
const nextQuestion = document.getElementById("next");
const question_no = document.querySelector(".question_no");
const optionsBtn = document.querySelector(".options");
const total = document.querySelector(".totalScore");
const notAttempt = document.querySelector(".questNtAttempted");
const wrongQuestCount = document.querySelector(".wrongQuest");
const try_again = document.querySelector(".try_again");
const contain = document.querySelector(".question_contain");
const opt = document.querySelectorAll(".opt");
const result_pg = document.querySelector(".result_pg");
const main_contain = document.querySelector(".main_contain");
let availableOptions = [];
let currentQuest;
let score = 0;
let totalScore = quiz.length * 5;
let isOptionSelected = false;
let wrongCount = 0;
let optionNotSelected = 0;
let previousScore;
let previousWrongCount;

function setQuestions() {
  for (let index = 0; index < quiz.length; index++) {
    availableQuestions.push(quiz[index]);
  }
  wrongCount = 0;
  optionNotSelected = 0;
  score = 0;
  questionCount = 0;
  isOptionSelected = false;
  setEachQuestion();
}

function setOptions() {
  for (let index = 0; index < currentQuest.options.length; index++) {
    availableOptions.push(currentQuest.options[index]);
  }
}
function setAllOptions() {
  document.getElementById("opt1").innerHTML = availableOptions[0];
  document.getElementById("opt2").innerHTML = availableOptions[1];
  document.getElementById("opt3").innerHTML = availableOptions[2];
  document.getElementById("opt4").innerHTML = availableOptions[3];
  availableOptions = [];
}
function removeCurrentQuestion(index) {
  availableQuestions.splice(index, 1);
}

function setEachQuestion() {
  isOptionSelected = false;
  previousScore=0;
  previousWrongCount=0;
  const index = Math.floor(Math.random() * availableQuestions.length);
  currentQuest = availableQuestions[index];
  currentQuestion.innerHTML = currentQuest.question;
  questionCount++;
  question_no.innerHTML = `Question ${questionCount} of ${quiz.length}`;
  setOptions();
  setAllOptions();
  removeCurrentQuestion(index);
}


function checkAnswer(e) {
  const element = e.target;
  console.log(currentQuest);
  const selectedValue = e.target.innerText;
  if(isOptionSelected){
    score= score-previousScore
    wrongCount=wrongCount-previousWrongCount
    removeWrongClass()
  }else {
    isOptionSelected = true;
  }
  if (isOptionSelected) {
    if (selectedValue == currentQuest.options[currentQuest.answer]) {
     
      score += 5;
      previousScore=5;
      // element.classList.add("correct");
    } else {
     
      wrongCount += 1;
      previousWrongCount=1;
      // element.classList.add("wrong");
    }
  }
  element.classList.add("selected");
  }
  
  


function removeWrongClass() {
  for (let index = 0; index < opt.length; index++) {
    const element = opt[index];
    const name = element.classList;
    // element.className.remove("selected");
    if (name[1] == "correct") {
      element.classList.remove("correct");
    } else if (name[1] == "wrong") {
      element.classList.remove("wrong");
    }else if (name[1] == "selected") {
      element.classList.remove("selected");
    }

  }
}

function setNextQuestion() {
 
  removeWrongClass();
  if (!isOptionSelected) {
    optionNotSelected += 1;
  }
  if (availableQuestions.length > 0) {
    setEachQuestion();
  } else {
    total.innerText = `Your Score ${score}`;
    wrongQuestCount.innerText = `Wrong Answers Count ${wrongCount}`;
    notAttempt.innerText = `Not Attempted ${optionNotSelected}`;
    contain.classList.add("hide");
    result_pg.classList.remove("hide");
  }
}
nextQuestion.addEventListener("click", setNextQuestion);
optionsBtn.addEventListener("click", checkAnswer);
try_again.addEventListener("click", startQuiz);
start_btn.addEventListener("click", startFunction);


function startFunction() {
  contain.classList.remove("hide");
  main_contain.classList.add("hide");
}

function startQuiz(e) {
  contain.classList.remove("hide");
  result_pg.classList.add("hide");
  setQuestions();
}

window.onload = function () {
  setQuestions();
  // setEachQuestion();
};
