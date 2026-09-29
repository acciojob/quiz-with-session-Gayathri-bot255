//your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// 1. Load progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress") || "{}");

// 2. Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // 3. Save progress on select
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// 4. Submit and calculate score
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

renderQuestions();