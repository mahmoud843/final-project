var dark = document.getElementById("clicked");
var white = document.getElementById("white-color");
var lol = document.getElementById("white-2color");
dark.onclick = function (){
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        white.style.filter = "brightness(5)";
        lol.style.filter = "brightness(5)";
    }
    else{
        white.style.filter = "none";
        lol.style.filter = "none";
    }
}
//  list 
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// "Add" button list
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
/*snake game*/
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board-1');
    const scoreBox = document.getElementById('scoreBox');
    const highScoreBox = document.getElementById('hiscoreBox');

    const snakeBoardSize = 18;
    const speed = 100;
    let score = 0;
    let highScore = 0;
    let snake = [{ x: 9, y: 9 }];
    let food = { x: 5, y: 5 };
    let dx = 0;
    let dy = 0;
    let changingDirection = false;

    function main() {
        if (hasGameEnded()) return;

        changingDirection = false;
        setTimeout(function onTick() {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            main();
        }, speed);
    }

    function clearBoard() {
        board.innerHTML = '';
    }

    function drawFood() {
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        const hasEatenFood = snake[0].x === food.x && snake[0].y === food.y;
        if (hasEatenFood) {
            score += 10;
            if (score > highScore) {
                highScore = score;
                highScoreBox.textContent = 'HighScore: ' + highScore;
            }
            scoreBox.textContent = 'Score: ' + score;
            generateFood();
        } else {
            snake.pop();
        }
    }
    function hasGameEnded() {
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
        }
        
        if (snake[0].x < 1 || snake[0].x > snakeBoardSize || snake[0].y < 1 || snake[0].y > snakeBoardSize) {
            return true;
        }
        
        if (snake[0].x === food.x && snake[0].y === food.y) {
            return false; 
        }
    
        return false; 
    }
   

    function generateFood() {
        food.x = Math.floor(Math.random() * snakeBoardSize) + 1;
        food.y = Math.floor(Math.random() * snakeBoardSize) + 1;
        snake.forEach(segment => {
            if (segment.x === food.x && segment.y === food.y) {
                generateFood();
            }
        });
    }

    function drawSnake() {
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.classList.add('snake');
            board.appendChild(snakeElement);
        });
    }

    document.addEventListener('keydown', changeDirection);

    function changeDirection(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        if (changingDirection) return;
        changingDirection = true;

        const keyPressed = event.keyCode;

        const goingUp = dy === -1;
        const goingDown = dy === 1;
        const goingRight = dx === 1;
        const goingLeft = dx === -1;

        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -1;
            dy = 0;
        }

        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -1;
        }

        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 1;
            dy = 0;
        }

        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 1;
        }
    }

    main();
});
  /*rock paper sesore*/
  function playAgainstComputer(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById('computer-choice').innerText = `Computer chose: ${computerChoice}`;

    if (playerChoice === computerChoice) {
        document.getElementById('result').innerText = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        document.getElementById('result').innerText = "You win!";
    } else {
        document.getElementById('result').innerText = "Computer wins!";
    }
}

function playWithFriend(playerChoice, player) {
    if (player === 'player1') {
        document.getElementById('player1-choice').innerText = `Player 1 has made his choice`;
        sessionStorage.setItem('player1Choice', playerChoice);
    } else if (player === 'player2') {
        document.getElementById('player2-choice').innerText = `Player 2 chose: ${playerChoice}`;
        sessionStorage.setItem('player2Choice', playerChoice);

      
        const player1Choice = sessionStorage.getItem('player1Choice');
        const player2Choice = playerChoice;

        if (player1Choice && player2Choice) {
            if (player1Choice === player2Choice) {
                document.getElementById('result2').innerText = "It's a tie!";
            } else if (
                (player1Choice === 'rock' && player2Choice === 'scissors') ||
                (player1Choice === 'paper' && player2Choice === 'rock') ||
                (player1Choice === 'scissors' && player2Choice === 'paper')
            ) {
                document.getElementById('result2').innerText = "Player 1 wins!";
            } else {
                document.getElementById('result2').innerText = "Player 2 wins!";
            }
        }
    }
}

/*x,o*/
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleMove(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.style.pointerEvents = 'none'; 

        if (checkWinner()) {
            document.getElementById('result').innerText = `Player ${currentPlayer} wins!`;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('result').innerText = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    return winningCombos.some(combo => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            highlightWinnerCells(combo);
            return true;
        }
        return false;
    });
}

function highlightWinnerCells(combo) {
    combo.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).style.backgroundColor = 'lightgreen';
    });
}

function handleRestartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.style.pointerEvents = 'auto';
        cell.style.backgroundColor = '#f0f0f0';
        cell.classList.remove('x', 'o'); 
    });
    document.getElementById('result').innerText = '';
}

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
const followButtons = document.querySelectorAll('.follow-btn');

followButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Follow') {
            button.textContent = 'Followed';
            button.classList.add('followed');
        } else {
            button.textContent = 'Follow';
            button.classList.remove('followed');
        }
    });
});
const express = require('express');
const app = express();
app.use(express.json());

let comments = [];

app.post('/api/comments', (req, res) => {
    const newComment = req.body.comment;
    comments.unshift(newComment); // Add the new comment to the beginning of the array
    res.status(201).json({ message: 'Comment added successfully' });
});

app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value;

    if (commentText) {
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: commentText }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to add comment');
        })
        .then(data => {
            console.log('Comment added:', data);
            renderComments();
            commentInput.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
var darkButton = document.getElementById("clicked");
var elementsToChangeColor = document.querySelectorAll(".changeable-color");

darkButton.onclick = function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        elementsToChangeColor.forEach(element => {
            element.style.color = "var(--font-color)";
            element.style.backgroundColor = "var(--background-color)";
        });
    } else {
        elementsToChangeColor.forEach(element => {
            element.style.color = "var(--secod-font-color)";
            element.style.backgroundColor = "var(--background-on-hover)";
        });
    }
};
