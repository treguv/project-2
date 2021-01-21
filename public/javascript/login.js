async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();
  console.log(email, password);

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
      //what does header do?
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      document.getElementById("error_msg").innerHTML = "Email or Password is incorrect";
    }
  }
}


document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
