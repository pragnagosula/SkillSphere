document.addEventListener("DOMContentLoaded", function () {
    let authLink = document.getElementById("auth-link");
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        authLink.innerText = "LOGOUT";
        authLink.href = "#";
        authLink.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            alert("Logged out successfully!");
            window.location.href = "login.html"; // Redirect to login page
        });
    }
});
