let player;
let comp;
let winner;

document.getElementById("rock").addEventListener("click", function(){
    player = "rock";
    disableBtns();
    updateValues();
});
document.getElementById("paper").addEventListener("click", function(){
    player = "paper";
    disableBtns();
    updateValues();
});
document.getElementById("scissors").addEventListener("click", function(){
    player = "scissors";
    disableBtns();
    updateValues();
});

function disableBtns(){
    document.querySelectorAll(".btn").forEach(button => {
        button.disabled = true;
    });
}

function compChoice(){
    const random = Math.floor(Math.random() * 3) + 1;
    
    if(random == 1) comp = "rock";
    else if(random == 2) comp = "paper";
    else if(random == 3) comp = "scissors";
}
function checkWinner(){
    switch(true){
        case (player == "rock" && comp == "paper"):
            winner = "comp";
            break;
        case (player == "rock" && comp == "scissors"):
            winner = "player";
            break;
        case (player == "paper" && comp == "rock"):
            winner = "player";
            break;
        case (player == "paper" && comp == "scissors"):
            winner = "comp";
            break;
        case (player == "scissors" && comp == "paper"):
            winner = "player";
            break;
        case (player == "scissors" && comp == "rock"):
            winner = "comp";
            break;
        default:
            winner = "draw"
            break;
    }
    tryAgain = document.getElementById("try")
    tryAgain.style.display = "block";
    tryAgain.onclick = function(){location.reload()};
}
function updateValues(){
    
    compChoice();
    checkWinner();
    
    const win = document.getElementById("winner");
    
    document.getElementById("p-choice").textContent = "Player choice: " + player;
    document.getElementById("c-choice").textContent = "Computer choice: " + comp;
    
    if(winner == "player"){
        win.textContent = "Winner: player";
    }
    else if(winner == "comp"){
        win.textContent = "Winner: computer";
    }
    else{
        win.textContent = "Winner: Draw"
    }
}