const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

       const loginForm = document.querySelector('.sign-in-form');

      loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Neļauj formu nosūtīt

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Šeit vari ievietot reālu login pārbaudi
        if (username === "admin" && password === "1234") {
          window.location.href = "index.html"; // Novirza uz mājaslapu
        } else {
          alert("Nepareizs lietotājvārds vai parole!");
        }
      });