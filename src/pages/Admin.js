export default function Admin() {
  const adminContainer = document.createElement("div");
  adminContainer.className = "admin-container";

  adminContainer.innerHTML = `
    <h1>Панель администратора</h1>
    <div class="admin-content">
      <table class="results-table">
        <thead>
          <tr>
            <th>Вариант</th>
            <th>Правильных ответов</th>
            <th>Всего ответов</th>
            <th>Оценка</th>
            <th>Процент</th>
          </tr>
        </thead>
        <tbody id="results-body">
          <!-- Данные будут подгружаться сюда -->
        </tbody>
      </table>
      <button id="logoutBtn" class="btn btn-secondary">Выйти</button>
    </div>
  `;

  // Функция для загрузки данных
  async function fetchResults() {
    try {
      //   const response = await fetch("http://localhost:8000/api/results/");
      //   if (!response.ok) throw new Error("Ошибка сети");

      //   const data = await response.json();
      const mockData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              user_id: Math.floor(Math.random() * 1000), // рандомный ID для наглядности
              correct_answers: Math.floor(Math.random() * 5),
              amount_answers: 5,
              mark: Math.floor(Math.random() * 5) + 2, // оценка от 2 до 5
            },
            {
              user_id: Math.floor(Math.random() * 1000),
              correct_answers: Math.floor(Math.random() * 5),
              amount_answers: 5,
              mark: Math.floor(Math.random() * 5) + 2,
            },
          ]);
        }, 300); // имитация задержки в 300 мс
      });
      const tbody = adminContainer.querySelector("#results-body");
      tbody.innerHTML = mockData
        .map((result) => {
          const percent =
            Math.round(
              (result.correct_answers / result.amount_answers) * 100
            ) || 0;
          return `
              <tr>
                <td>${result.user_id}</td>
                <td>${result.correct_answers}</td>
                <td>${result.amount_answers}</td>
                <td>${result.mark}</td>
                <td>${percent}%</td>
              </tr>
            `;
        })
        .join("");
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }

  // Первый вызов
  fetchResults();

  // Обновление каждую секунду
  setInterval(fetchResults, 1000);

  // Обработчик выхода
  adminContainer.querySelector("#logoutBtn").addEventListener("click", () => {
    window.location.href = "/";
  });

  return adminContainer;
}
