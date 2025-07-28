let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

let timerInterval;
let timeLeftPerQuestion = 60; // 60 seconds per question
let totalTimeLeft; // total time for all questions

function showTeacherPage() {
  document.getElementById('home-container').style.display = 'none';
  document.getElementById('teacher-container').style.display = 'block';
}

function showStudentPage() {
  if (questions.length === 0) {
    alert("No questions available. Ask teacher to add questions.");
    return;
  }
  document.getElementById('home-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  
  totalTimeLeft = questions.length * timeLeftPerQuestion;
  startTimer();
  showQuestion();
}

function goHome() {
  document.getElementById('teacher-container').style.display = 'none';
  document.getElementById('home-container').style.display = 'block';
}

function addQuestion() {
  const questionText = document.getElementById('new-question').value;
  const options = [
    document.getElementById('option1').value,
    document.getElementById('option2').value,
    document.getElementById('option3').value,
    document.getElementById('option4').value
  ];
  const correctIndex = parseInt(document.getElementById('correct').value) - 1;

  if (questionText && options.every(opt => opt) && correctIndex >= 0 && correctIndex < 4) {
    questions.push({ question: questionText, options, answer: correctIndex });
    alert("Question added!");
    document.getElementById('new-question').value = '';
    options.forEach((_, i) => document.getElementById(`option${i+1}`).value = '');
    document.getElementById('correct').value = '';
  } else {
    alert("Please fill all fields correctly.");
  }
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById('question').textContent = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    if (userAnswers[currentQuestionIndex] === i) {
      btn.style.backgroundColor = '#ccc';
    }
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(index) {
  userAnswers[currentQuestionIndex] = index;
  showQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

function submitQuiz() {
  clearInterval(timerInterval); // stop the timer
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });
  document.getElementById('result').textContent = `Your Score: ${score}/${questions.length}`;
  document.getElementById('submit-btn').disabled = true;
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    totalTimeLeft--;
    updateTimerDisplay();

    if (totalTimeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
      alert("Time's up! Quiz submitted.");
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById('timer').textContent = `Time Left: ${totalTimeLeft}s`;
}
