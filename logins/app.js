const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


      

const register = async (email, password) => {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
        email: email,
        password: password
      }
      )
    })

    if(response.status === 201){
      alert("created!")
    }
}


const login = async (email, password) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    if(response.status === 200){
      const data = await response.json()
      localStorage.setItem("user", data.jwt)
      alert("logged in as: " + data.user.email)
    }
}


document.getElementById("register-form").addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email-register').value
  const password = document.getElementById('password-register').value

 await register(email, password)
})


document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email-login').value
  const password = document.getElementById('password-login').value
  await login(email, password)
})