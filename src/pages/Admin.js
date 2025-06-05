export default function Admin() {
  const adminContainer = document.createElement("div");
  adminContainer.className = "admin-container";

  // Пример данных (в реальном приложении они будут приходить с сервера)
  const testResults = [
    { id: 1, correct: 8, incorrect: 2, total: 10, variant: 5 },
    { id: 2, correct: 6, incorrect: 4, total: 10, variant: 12 },
    { id: 3, correct: 9, incorrect: 1, total: 10, variant: 3 },
    { id: 4, correct: 5, incorrect: 5, total: 10, variant: 7 },
    { id: 5, correct: 7, incorrect: 3, total: 10, variant: 15 },
  ];

  adminContainer.innerHTML = `
    <h1>Панель администратора</h1>
    <div class="admin-content">
      <table class="results-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Вариант</th>
            <th>Правильно</th>
            <th>Неправильно</th>
            <th>Всего вопросов</th>
            <th>Процент</th>
          </tr>
        </thead>
        <tbody>
          ${testResults
            .map(
              (result) => `
            <tr>
              <td>${result.id}</td>
              <td>${result.variant}</td>
              <td>${result.correct}</td>
              <td>${result.incorrect}</td>
              <td>${result.total}</td>
              <td>${Math.round((result.correct / result.total) * 100)}%</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <button id="logoutBtn" class="btn btn-secondary">Выйти</button>
    </div>
  `;

  // Обработчик выхода
  adminContainer.querySelector("#logoutBtn").addEventListener("click", () => {
    window.location.href = "/";
  });

  return adminContainer;
}
