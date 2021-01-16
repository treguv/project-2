
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    if (username && email && password) {
        console.log(username, password)
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.querySelector('#username-signup').value = "";
            document.querySelector('#email-signup').value = "";
            document.querySelector('#password-signup').value = "";
            document.location.replace('/');
        } else {
            const errMsg = await response.json()
            document.getElementById("user-error").innerHTML = errMsg.message
            console.log(errMsg.message)
            if (password.length < 4) {
                document.getElementById('password-error').innerHTML = "Password should be more than 4 characters"
            }

        }



    }

};




document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);