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
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
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


let timer; // Variabile per il timer
const QUESTION_TIMEOUT = 30000; // Tempo in millisecondi (30 secondi)

//funzione per abilitare il bottone (PROCEDE).
function clickable() {
    let checkBox = document.getElementById("agree");
    if (checkBox.checked == true) {
        document.getElementById("bottoneDisable").disabled = false
    }
    //qua ci assicuriamo che se per sbaglio il check si disabilita l'utente non puo continuare. 
    else if (checkBox.checked == false) {
        document.getElementById("bottoneDisable").disabled = true;
    }
}

// Elemento div che contiene il quiz
const quizContainer = document.getElementById('question');
// Elemento div per il timer
const timerContainer = document.getElementById('time');
// Elemento div per le statistiche 
const quizSummaryContainer = document.getElementById('quiz-summary');

// Variabili per le statistiche 
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let unansweredQuestionsCount = 0;

// Indice della domanda
let currentQuestionIndex = 0;

// Funzione per visualizzare una domanda
function displayQuestion() {
    if (currentQuestionIndex > 0) document.querySelector("main").remove();
    const MAIN = document.createElement("main");
    MAIN.className = "quiz";
    document.querySelector("body").appendChild(MAIN);
    // Ottiene la domanda
    const question = questions[currentQuestionIndex];
    const H1MAIN = document.createElement("h1");
    H1MAIN.textContent = question.question;
    H1MAIN.id = "question";
    H1MAIN.className = "question";
    MAIN.appendChild(H1MAIN);
    const DIVANSWERS = document.createElement("div");
    DIVANSWERS.className = ("answers");
    MAIN.appendChild(DIVANSWERS);
    let counter = 1;
    for (const ELEMENT of question.incorrect_answers) {
        const ANSWERBUTTON = document.createElement("button");
        ANSWERBUTTON.type = "button";
        console.log(counter);
        ANSWERBUTTON.id = ++counter;
        ANSWERBUTTON.addEventListener("click", () => { checkAnswer(false) });
        ANSWERBUTTON.textContent = ELEMENT;
        DIVANSWERS.appendChild(ANSWERBUTTON);
    }
    const ANSWERBUTTON = document.createElement("button");
    ANSWERBUTTON.type = "button";
    ANSWERBUTTON.id = counter;
    ANSWERBUTTON.addEventListener("click", () => { checkAnswer(true) });
    ANSWERBUTTON.textContent = question.correct_answer;
    DIVANSWERS.appendChild(ANSWERBUTTON);
    const FOOTER = document.createElement("footer");
    MAIN.appendChild(FOOTER);
    const PFOOTER = document.createElement("p");
    PFOOTER.id = "remainingQuestions";
    PFOOTER.class = "remainingQuestions";
    PFOOTER.textContent = `QUESTION `, currentQuestionIndex + 1, " ";
    FOOTER.appendChild(PFOOTER);
    const SPAN = document.createElement("span");
    SPAN.textContent = ` / ${questions.length}`;
    FOOTER.appendChild(SPAN);
    // Elemento div per l'indice della domanda
    const questionIndexContainer = document.getElementById('remainingQuestions');
    // Visualizza l'indice
    questionIndexContainer.innerText = `${questionIndexContainer.textContent} ${currentQuestionIndex + 1}`;
    // Avvia il timer per la domanda 
    startTimer();
}

// Funzione per avviare il timer
function startTimer() {
    clearInterval(timer); // Resetta il timer se era già in esecuzione

    // Mostra il timer nel timerContainer
    let timeLeft = QUESTION_TIMEOUT / 1000; // Converti il tempo in secondi
    let gradient = 0;
    timer = setInterval(() => {
        timeLeft--;
        const ANELLO = document.getElementById('anello');
        if (timeLeft >= 0) {
            // Aggiorna il testo del timer
            timerContainer.innerText = timeLeft;
            ANELLO.style.background = `conic-gradient(#ffffff2b ${gradient += 3.3}%, #00ffff 0%) border-box`;
        } else {
            // Passa alla prossima domanda quando il timer è scaduto
            clearInterval(timer);
            unansweredQuestionsCount++; // Incrementa il numero di domande non risposte
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showQuizSummary(); // Mostra le statistiche del quiz alla fine
            }
        }
    }, 1000); // Aggiorna ogni secondo
}

// Funzione per controllare la risposta
function checkAnswer(isCorrect) {
    // Incrementa il contatore di risposte corrette o errate
    if (isCorrect) {
        correctAnswersCount++;
    } else {
        wrongAnswersCount++;
    }

    // Passa alla prossima domanda se presente, altrimenti mostra le statistiche del quiz 
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showQuizSummary();
    }
}

// Funzione per mostrare le statistiche
function showQuizSummary() {
    // Calcola la percentuale di risposte corrette
    const totalQuestions = questions.length;
    const correctPercentage = (correctAnswersCount / totalQuestions) * 100;
    window.location.href = "resultQuiz.html";

    const CORRECT = document.getElementById("correct");
    console.log(CORRECT);
    const H2CORRECT = document.createElement("h2");
    const PCORRECT=document.createElement("p");
    H2CORRECT.textContent = correctPercentage;
    CORRECT.appendChild(H2CORRECT);
    CORRECT.appendChild(PCORRECT);
    const WRONG = document.getElementById("wrong");
    const H2WRONG = document.createElement("h2");
    H2WRONG.textContent = correctPercentage;
    WRONG.appendChild(H2WRONG);




    // Genera HTML per mostrare le statistiche. il metodo toFixed limita il numero della percentuale
    const summaryHtml = `
      <h2>Risultati del Quiz</h2>
      <p>Percentuale di risposte corrette: ${correctPercentage.toFixed(2)}%</p> 
      <p>Domande corrette: ${correctAnswersCount}</p>
      <p>Domande errate: ${wrongAnswersCount}</p>
      <p>Domande totali: ${totalQuestions}</p>
      <p>Domande non risposte: ${unansweredQuestionsCount}</p>
    `;
    // Inserisce l'HTML nel container delle statistiche del quiz
    quizSummaryContainer.innerHTML = summaryHtml;
    quizSummaryContainer.style.display = 'block'; // Mostra il container delle statistiche del quiz

    showAnswers()
}

// Funzione per mostrare tutte le domande con le risposte
function showAnswers() {
    let answersHtml = '<h2>Risposte alle Domande</h2>';
    for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
        answersHtml += `<p><strong>Domanda ${index + 1}:</strong> ${question.question}</p>`;
        if (index === currentQuestionIndex && wrongAnswersCount > 0) {
            // Mostra solo la risposta sbagliata dell'utente se disponibile
            answersHtml += `<p><strong>Risposta sbagliata:</strong> ${questions[currentQuestionIndex].incorrect_answers.join(', ')}</p>`;
        } else {
            // Mostra la risposta corretta per le altre domande
            answersHtml += `<p><strong>Risposta corretta:</strong> ${question.correct_answer}</p>`;
        }
    }
    quizSummaryContainer.innerHTML += answersHtml;
}