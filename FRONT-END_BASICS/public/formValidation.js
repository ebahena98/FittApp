const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const lastname_input = document.getElementById('lastname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_pwd_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

// Form Validation and Submission (async always returns a Promise)
form.addEventListener('submit', async (e) => {
    let errors = [];

    // Check if sign-up or login form
    if (firstname_input) {
        // Sign up form
        errors = getSignupFormErrors(
            firstname_input.value,
            lastname_input.value,
            email_input.value,
            password_input.value,
            repeat_pwd_input.value
        );

    } else {
        // Login form
        errors = getLoginFormErrors(
            email_input.value,
            password_input.value
        );
    }


    if (errors.length > 0) {
        // If we have any errors in the array
        e.preventDefault()
        error_message.innerText = errors.join("\n")
    } else {
        // No errors
        const userData = {
            user_firstName: firstname_input.value,
            user_lastName: lastname_input.value,
            user_email: email_input.value,
            user_password: password_input.value,
        };

        // Call function registerUser to submit the data to the backend (server)
        try {
            await registerUser(userData);
        } catch (error) {
            console.error('Error during form submission:', error);
            error_message.innerText = error.message || "Unknown Error Occured!";
        }
    }
});


// Signup Form Errors
function getSignupFormErrors(firstname, lastname, email, password, repeatPassword) {
    let errors = [];

    if (firstname === '' || firstname == null) {
        errors.push('Firstname is required')
        firstname_input.parentElement.classList.add('incorrect')
    }
    if (lastname === '' || lastname == null) {
        errors.push('Lastname is required')
        lastname_input.parentElement.classList.add('incorrect')
    }
    if (email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if (repeatPassword === '' || repeatPassword == null) {
        errors.push('Repeat Password is required')
        repeat_pwd_input.parentElement.classList.add('incorrect')
    }
    if (password.length < 8) {
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }
    if (password !== repeatPassword) {
        errors.push('Password does not match Repeated Password')
        password_input.parentElement.classList.add('incorrect')
        repeat_pwd_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

// Login Form Errors
function getLoginFormErrors(email, password) {
    let errors = []

    if (email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}


// Registering user data to the backend (server)
async function registerUser(userData) {
    try {
        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });


        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "ERROR, SOMETHING WENT WRONG!");
        }

        const newUser = await res.json();
        console.log("User added:", newUser);

    } catch (error) {
        throw new Error("ERROR REGISTERING USER: " + error.message);
    }
}





// Remove error state on different input
const allInputs = [
    firstname_input,
    lastname_input,
    email_input,
    password_input,
    repeat_pwd_input,
].filter(input => input !== null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        // Clearing error messages
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    });
});