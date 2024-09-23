function SignupUser(event) {
    event.preventDefault(); 

    var username = document.getElementById("regUsername").value;
    var email = document.getElementById("regEmail").value;
    var password = document.getElementById("regPassword").value;
    var confirmPassword = document.getElementById("regConfirmPassword").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var programming = document.querySelector('input[name="programming"]:checked');

    if (username === "" || email === "" || password === "" || confirmPassword === "" || !gender || !programming) {
        alert("Please fill in all fields and make sure to select your gender and programming knowledge level.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    if (username && email && password && confirmPassword && gender && programming) {
        if (password === confirmPassword) {          
            document.getElementById('message').innerText = "Account created successfully.";
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1); 
        }
    }
}