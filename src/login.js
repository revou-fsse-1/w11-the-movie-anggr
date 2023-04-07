document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      `http://localhost:5000/users?username=${username}`
    );
    const users = await response.json();

    if (users.length === 0) {
      alert("Invalid username or password. Please try again.");
    } else {
      const user = users[0];

      if (user.password === password) {
        window.location.href = "./moviescreen.html";
        alert("Login successful! Redirecting to Movie screen...");
      } else {
        alert("Invalid username or password. Please try again.");
      }
    }
  } catch (error) {
    alert("Error occurred during login. Please try again.");
  }
});
