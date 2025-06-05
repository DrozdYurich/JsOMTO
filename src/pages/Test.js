let testQuestions = []; // Массив будет заполнен после загрузки с сервера

export default function Test() {
  const testContainer = document.createElement("div");
  testContainer.className = "test-container";

  let currentQuestion = 0;
  let answers = [];

  // 🔁 Функция для загрузки вопросов с сервера
  async function loadQuestionsFromServer() {
    try {
      const response = await fetch(
        "https://your-api-url.com/api/test/questions"
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке вопросов");
      }

      const result = await response.json(); // Ожидаем массив из API
      testQuestions = result.slice(0, 10); // Берём до 10 вопросов
      renderQuestion(); // После загрузки — начинаем тест
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("Не удалось загрузить вопросы с сервера");
    }
  }

  function renderQuestion() {
    if (currentQuestion >= testQuestions.length) {
      testContainer.innerHTML = `
        <div class="test-complete">
          <h2>Тест завершён!</h2>
          <p>Вы ответили правильно на ${
            answers.filter((a) => a.isCorrect).length
          } из ${testQuestions.length} вопросов.</p>
          
        </div>
      `;

      testContainer.querySelector("#restartBtn");

      return;
    }

    const question = testQuestions[currentQuestion];

    testContainer.innerHTML = `
      <div class="question-container">
        <div class="progress">Вопрос ${currentQuestion + 1} из ${
      testQuestions.length
    }</div>
        <h2 class="question-text">${question.text}</h2>

        <div class="options">
          ${question.answers
            .map(
              (answer, i) => `
                <div class="option">
                  <input type="radio" id="option-${i}" name="answer" value="${answer.text}">
                  <label for="option-${i}">${answer.text}</label>
                </div>
              `
            )
            .join("")}
        </div>

        <button id="submitAnswer" class="btn btn-primary">Ответить</button>
      </div>
    `;

    testContainer
      .querySelector("#submitAnswer")
      .addEventListener("click", () => {
        const selectedOption = testContainer.querySelector(
          'input[name="answer"]:checked'
        );
        if (!selectedOption) {
          alert("Пожалуйста, выберите вариант ответа");
          return;
        }

        const answerText = selectedOption.value;
        const correctAnswer =
          question.answers.find((a) => a.is_correct)?.text || null;

        const isCorrect = answerText === correctAnswer;

        answers.push({
          questionId: question.id,
          answer: answerText,
          isCorrect: isCorrect,
        });

        currentQuestion++;
        renderQuestion();
      });
  }

  // 💡 Загружаем вопросы при запуске теста
  loadQuestionsFromServer();

  return testContainer;
}
