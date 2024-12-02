function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Get the values of Age, Weight, Height, and Activity
    var gender = document.getElementById('gender').value;
    var age = document.getElementById('age').value;
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;
    var activity = document.getElementById('activity').value;

    // Prepare the data to send to the Next.js API route
    var data = {
        gender: gender,
        age: age,
        weight: weight,
        height: height,
        activity: activity
    };

    // Send data to the Next.js API route using fetch
    fetch('/tdeeVal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the Next.js API
            console.log('TDEE Calculation Result:', data);

            // Display the result (TDEE) on the page
            alert('Your TDEE is: ' + data.tdee);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Attach the handleFormSubmit function to the form on page load
window.onload = function () {
    var form = document.getElementById('form');
    form.addEventListener('submit', handleFormSubmit);
};