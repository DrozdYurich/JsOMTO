export default function Admin() {
  const adminContainer = document.createElement("div");
  adminContainer.className = "admin-container";

  adminContainer.innerHTML = `
    <h1>Панель администратора</h1>
    <div class="admin-content">
      <table class="results-table">
        <thead>
          <tr>
            <th>ID пользователя</th>
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
      const response = await fetch("http://ваш_адрес_сервера/results"); // замените на реальный URL
      if (!response.ok) throw new Error("Ошибка сети");

      const data = await response.json();

      const tbody = adminContainer.querySelector("#results-body");
      tbody.innerHTML = data
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
