document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!username || !email || !password || !confirmPassword) {
      alert("All fields are required. Please try again.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match. Please try again.");
      return;
    }

    const existingUserResponse = await fetch(
      `http://localhost:5000/users?email=${email}`
    );
    const existingUsers = await existingUserResponse.json();

    if (existingUsers.length > 0) {
      alert("Email already exists. Please try again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        alert("User successfully registered. Please login.");
        window.location.href = "./index.html";
      } else {
        const errorData = await response.json();
        alert(`Terjadi kesalahan saat mendaftar: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mendaftar");
    }
  });
