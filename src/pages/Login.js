export default function Login() {
  const loginContainer = document.createElement("div");
  loginContainer.className = "login-container";

  loginContainer.innerHTML = `
        <div class="login-left">
            <h1 class="main-title">Основы материально-технического обеспечения</h1>
            <p>Кафедра №23</p>
            <h1 class="afso-title">АФСО</h1>
        </div>
        <div class="login-right">
            <div class="login-form">
                <h2>Вход в систему</h2>
                <select id="userType" class="form-select">
                    <option value="" disabled selected>Выберите роль входа</option>
                    <option value="student">Ученик</option>
                    <option value="admin">Администратор</option>
                </select>
                
                <div id="studentFields" class="form-group hidden">
                    <select id="studentVariant" class="form-select">
                        <option value="" disabled selected>Выберите вариант (1-25)</option>
                        ${Array.from(
                          { length: 25 },
                          (_, i) =>
                            `<option value="${i + 1}">Вариант ${i + 1}</option>`
                        ).join("")}
                    </select>
                </div>
                
                <div id="adminFields" class="form-group hidden">
                    <input type="password" id="adminPassword" class="form-input" placeholder="Введите пароль">
                </div>
                
                <button id="loginBtn" class="btn btn-primary">Войти</button>
            </div>
        </div>
    `;
  const userTypeSelect = loginContainer.querySelector("#userType");
  const studentFields = loginContainer.querySelector("#studentFields");
  const adminFields = loginContainer.querySelector("#adminFields");
  const loginBtn = loginContainer.querySelector("#loginBtn");

  userTypeSelect.addEventListener("change", (e) => {
    studentFields.classList.add("hidden");
    adminFields.classList.add("hidden");

    if (e.target.value === "student") {
      studentFields.classList.remove("hidden");
    } else if (e.target.value === "admin") {
      adminFields.classList.remove("hidden");
    }
  });

  loginBtn.addEventListener("click", () => {
    const userType = userTypeSelect.value;
    if (!userType) {
      alert("Пожалуйста выберите роль входа");
      return;
    }

    if (userType === "student") {
      const variant = loginContainer.querySelector("#studentVariant").value;
      if (!variant) {
        alert("Пожалуйста выберите вариант");
        return;
      }
      window.location.href = "/test?user=student&variant=" + variant;
    } else if (userType === "admin") {
      const password = loginContainer.querySelector("#adminPassword").value;
      if (!password) {
        alert("Пожалуйста введите пароль");
        return;
      } else if (password === "prepod_23") {
        window.location.href = "/admin";
        return;
      }
      console.log(password);
      console.log(userType);
    }
  });

  return loginContainer;
}
