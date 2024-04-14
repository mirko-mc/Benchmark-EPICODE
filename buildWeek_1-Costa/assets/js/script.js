const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//funzione per abilitare il bottone (PROCEDE).
function clickable() {
  let checkBox = document.getElementById("promise");
  if (checkBox.checked == true) {
    document.getElementById("bottoneDisable").disabled = false
  }
  //qua ci assicuriamo che se per sbaglio il check si disabilita l'utente non puo continuare. 
  else if (checkBox.checked == false) {
    document.getElementById("bottoneDisable").disabled = true;
  }
}

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')

//prendo tutte gli input/label

const a_txt = document.getElementById('a_txt');
const b_txt = document.getElementById('b_txt');
const c_txt = document.getElementById('c_txt');
const d_txt = document.getElementById('d_txt');

const submitBtn = document.getElementById('BtnSubmit');

// inizializzo due variabili globale da utilizare nelle funzioni

let currentQuiz = 0;
let score = 0;

loadQuestions()
function loadQuestions(){

  deselectAnswer()

const currentQuizData=questions[currentQuiz];

//prendo la domanda 
questionEl.innerText = currentQuizData.question

//prendo le risposte 

a_txt.innerText = currentQuizData.correct_answer

b_txt.innerText = currentQuizData.incorrect_answers[0]
c_txt.innerText = currentQuizData.incorrect_answers[1]
d_txt.innerText = currentQuizData.incorrect_answers[2]



}
// puoi scegliere un altra rispiosta
function deselectAnswer(){
  answerEls.forEach(answerEl => answerEl.checked = false)
}
// selezioniamo la risposta corretta
function getSelected(){
  let answer;
  answerEls.forEach(answerEl => {
    if(answerEl.checked){
      answer  = answerEl.id
    }
  })
  return answer
}
// mandiamo avanti on click
submitBtn.addEventListener('click',() => {
  const answer = getSelected()
  if(answer){
    if(answer === questions[currentQuiz].correct_answer){
      score++
    }
    currentQuiz++
    if(currentQuiz < questions.length){
      loadQuestions()
    }else {
      quiz.innerHTML=`<p> hai risposto a ${score}/${questions.length}`
    }
  }
})