let testQuestions = [];

export default function Test() {
  const testContainer = document.createElement("div");
  testContainer.className = "test-container";

  let currentQuestion = 0;
  let answers = [];
  let timerInterval = null;

  // Таймер
  const TOTAL_TIME = 10 * 60; // 10 минут в секундах
  let timeLeft = TOTAL_TIME;

  // Форматируем время как MM:SS
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  // Отображение таймера
  function renderTimer() {
    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.textContent = formatTime(timeLeft);
    timerElement.style.position = "absolute";
    timerElement.style.top = "20px";
    timerElement.style.right = "20px";
    timerElement.style.fontSize = "18px";
    timerElement.style.fontWeight = "bold";
    timerElement.style.color = "#d94f43";
    return timerElement;
  }

  async function loadQuestionsFromServer() {
    try {
      const response = await fetch("http://localhost:8000/api/questions/");

      if (!response.ok) {
        throw new Error("Ошибка при загрузке вопросов");
      }

      const result = await response.json();
      testQuestions = result.slice(0, 10);
      renderQuestion();
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("Не удалось загрузить вопросы с сервера");
    }
  }

  function startTimer() {
    const timerElement = renderTimer();
    testContainer.appendChild(timerElement);

    timerInterval = setInterval(() => {
      timeLeft--;

      timerElement.textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Время вышло!");
        // Завершаем тест
        currentQuestion = testQuestions.length;
        renderQuestion();
      }
    }, 1000);
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
      return;
    }

    if (currentQuestion === 0) {
      startTimer(); // Запускаем таймер только один раз — на первом вопросе
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

    const timerElement = renderTimer();
    testContainer.appendChild(timerElement);

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

        const urlParams = new URLSearchParams(window.location.search);
        const userId = parseInt(urlParams.get("variant"), 10);

        if (isNaN(userId)) {
          alert("Не удалось определить ID пользователя (variant).");
          return;
        }

        const sendData = {
          user_id: userId,
          correct: isCorrect,
        };

        fetch("http://localhost:8000/api/answer/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Ошибка сети при отправке ответа");
            }
            return response.json();
          })
          .then((responseData) => {
            console.log("Ответ от сервера:", responseData);

            currentQuestion++;
            renderQuestion();
          })
          .catch((error) => {
            console.error("Ошибка:", error);
            alert("Не удалось сохранить ответ. Попробуйте ещё раз.");
          });
      });
  }

  loadQuestionsFromServer();

  return testContainer;
}
