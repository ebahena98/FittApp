function handleFormSubmit(event) {
    event.preventDefault();

    var firstname = document.getElementById('firstname-input').value;
    var lastname = document.getElementById('lastname-input').value;
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    var repeatPassword = document.getElementById('repeat-password-input').value;
    var error_message = document.getElementById('error-message')

    // const form = document.getElementById('form')

    var data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        repeatPassword: repeatPassword
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("INFO: ", data);

            alert('Your account has been created!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.onload = function () {
    var form = document.getElementById('form');
    form.addEventListener('submit', handleFormSubmit);
};