import Admin from "./pages/Admin.js";
import Login from "./pages/Login.js";
import Test from "./pages/Test";

export default function App() {
  const app = document.createElement("div");
  app.id = "app-container";

  // Simple router
  const path = window.location.pathname;
  if (path.includes("test")) {
    app.appendChild(Test());
  } else if (path.includes("admin")) {
    app.appendChild(Admin());
  } else {
    app.appendChild(Login());
  }

  return app;
}
