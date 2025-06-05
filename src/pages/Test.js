// Sample test questions
const testQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  // Add 8 more questions...
].slice(0, 10);

export default function Test() {
  const testContainer = document.createElement("div");
  testContainer.className = "test-container";

  let currentQuestion = 0;
  let answers = [];

  function renderQuestion() {
    if (currentQuestion >= testQuestions.length) {
      testContainer.innerHTML = `
                <div class="test-complete">
                    <h2>Test Completed!</h2>
                    <p>You answered ${
                      answers.filter((a) => a.isCorrect).length
                    } out of ${testQuestions.length} correctly.</p>
                </div>
            `;

      testContainer
        .querySelector("#restartBtn")
        .addEventListener("click", () => {
          currentQuestion = 0;
          answers = [];
          renderQuestion();
        });

      return;
    }

    const question = testQuestions[currentQuestion];

    testContainer.innerHTML = `
            <div class="question-container">
                <div class="progress">Question ${currentQuestion + 1} of ${
      testQuestions.length
    }</div>
                <h2 class="question-text">${question.question}</h2>
                
                <div class="options">
                    ${question.options
                      .map(
                        (option, i) => `
                        <div class="option">
                            <input type="radio" id="option-${i}" name="answer" value="${option}">
                            <label for="option-${i}">${option}</label>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                
                <button id="submitAnswer" class="btn btn-primary">Submit Answer</button>
            </div>
        `;

    testContainer
      .querySelector("#submitAnswer")
      .addEventListener("click", () => {
        const selectedOption = testContainer.querySelector(
          'input[name="answer"]:checked'
        );
        if (!selectedOption) {
          alert("Please select an answer");
          return;
        }

        const answer = selectedOption.value;
        const isCorrect = answer === question.correctAnswer;
        answers.push({
          questionId: question.id,
          answer,
          isCorrect,
        });

        currentQuestion++;
        renderQuestion();
      });
  }

  renderQuestion();
  return testContainer;
}
