document.addEventListener("DOMContentLoaded", function () {
  // Get necessary elements
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");

  if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener("click", () => {
          container.classList.add("active");
          container.classList.add("right-panel-active");
      });

      loginBtn.addEventListener("click", () => {
          container.classList.remove("active");
          container.classList.remove("right-panel-active");
      });
  } else {
      console.error("One or more elements are missing from the DOM.");
  }

  // Sign-Up Form Submission
  document.querySelector(".sign-up form").addEventListener("submit", function (event) {
      event.preventDefault();

      let rollNo = this.rollno.value.trim();
      let email = this.email.value.trim();
      let password = this.password.value.trim();

      if (!rollNo || !email || !password) {
          alert("All fields are required!");
          return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || {};

      if (users[rollNo]) {
          alert("This Roll Number is already registered!");
          return;
      }

      // Store user details
      users[rollNo] = { email, password };
      localStorage.setItem("users", JSON.stringify(users));

      // Store current user session
      let user = { rollno: rollNo, email, password };
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Sign-up successful! Now Sign In.");
      container.classList.remove("right-panel-active"); // Switch to Sign-In view
  });

  // Sign-In Form Submission
  document.querySelector(".sign-in form").addEventListener("submit", function (event) {
      event.preventDefault();

      let rollNo = this.rollno.value.trim();
      let password = this.password.value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || {};

      if (users[rollNo] && users[rollNo].password === password) {
          // Store current session
          localStorage.setItem("currentUser", JSON.stringify(users[rollNo]));
          alert("Login Successful!");
          window.location.href = "groups.html"; // Redirect to Groups Page
      } else {
          alert("Invalid Roll Number or Password!");
      }
  });
});
