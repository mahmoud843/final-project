function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    if (!username || !password) {
        document.getElementById('message').innerText = 'Error! Please enter username and password';
        return; 
    }
  
    if (users[username] && users[username].password === password) {
        document.getElementById('message2').innerText = "Please enter correct username and password.";
        
    } else {
        document.getElementById('message').innerText = "Account created successfully.";
        window.location.href = "index.html"; 
    }
  }
