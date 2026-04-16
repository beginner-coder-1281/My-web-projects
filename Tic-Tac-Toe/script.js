// defining core variables
let player = "X";
let comp = "O";
let current = "player";
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
let cells = document.querySelectorAll(".cell");
let winner = null;

// adding event listener to all the buttons
document.querySelectorAll(".cell").forEach(button => {
    button.addEventListener("click", function(){
        //Checking and changing textContent of the buttons
        if(button.textContent != ""){
            return;
        }
        else if(button.textContent == player || button.textContent == comp){
            return;
        }
        else{
            if(current == "player"){
                button.textContent = player;
                current = "comp"
            }
            // Checking for winner and for draw
            checkWinner();
            checkDraw();
            
            // display winner
            if(winner){
                if(winner == "X"){
                document.getElementById("myP").textContent = `Winner: player`;
                }
                else if(winner == "O"){
                    document.getElementById("myP").textContent = "Winner: computer";
                }
                // displaying try again button and making it reload the page
                document.getElementById("try").onclick = function(){location.reload()};
                document.getElementById("try").style.display = "flex";
                
                // disabling all buttons
                document.querySelectorAll(".cell").forEach(button => {
                    button.disabled = true;
                });
            }
        }
    });
});

// function to check for draw
function checkDraw(){
    // checking the number of full checks
    let full = 0;
    cells.forEach(cell => {
        if(cell.textContent !== "") full++;
    });
    
    // if all cells are full and there is not a winner, showing draw and disabling buttons
    if(full === 9 && !winner){
        winner = "Draw";
        document.getElementById("myP").textContent = "Winner: Draw";
        document.getElementById("try").style.display = "flex";

        document.querySelectorAll(".cell").forEach(button => {
            button.disabled = true;
        });
}
}

// function to check winner    
function checkWinner(){
    
    // checking the below code with all win combinations
    for(let i = 0; i < wins.length; i++){
        
        // defining the value of a, b and c 
        let a = wins[i][0];
        let b = wins[i][1];
        let c = wins[i][2];
        
        // if the first cell text content is the same as the second cell and the second cell text content is same as the third cell, there is a winner
        if(cells[a].textContent !== "" && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent){
            // storing winner using cells[a].textContent
            winner = cells[a].textContent;
        }
    }
}

// function to make random computer move
function compMove(){
    
    // while move is not valid, generate a random move
    let valid = false;
    while(!valid){ 
        let rand = Math.floor(Math.random() * 9); // generating number from 1 to 9
        // filling the random cell with the computers letter
        if(cells[rand].textContent === ""){
            cells[rand].textContent = comp;
            current = "player";
            valid = true; // breaking the loop
        }
    }
}

setInterval(function(){
    if(current != "player" && !winner){
        compMove();
        checkWinner();
        if(winner == "O"){
            document.getElementById("myP").textContent = "Winner: Computer";
            document.getElementById("try").style.display = "flex";
            document.getElementById("try").onclick = function(){location.reload()};

            document.querySelectorAll(".cell").forEach(button => {
            button.disabled = true;
        });
        }  
    }
    let full = 0;
    cells.forEach(button => {
        if(button.textContent == "X" || button.textContent == "O"){
            full += 1;
        }
    });
}, 250);