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
document.querySelectorAll(".cell").forEach(button => {
    button.addEventListener("click", function(){
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
            checkWinner();
            checkDraw();
            
            if(winner){
                if(winner == "X"){
                document.getElementById("myP").textContent = `Winner: player`;
                }
                else if(winner == "O"){
                    document.getElementById("myP").textContent = "Winner: computer";
                }
                document.getElementById("try").onclick = function(){location.reload()};
                document.getElementById("try").style.display = "flex";
                
                document.querySelectorAll(".cell").forEach(button => {
                    button.disabled = true;
                });
            }
        }
    });
});
function checkDraw(){
    let full = 0;
    cells.forEach(cell => {
        if(cell.textContent !== "") full++;
    });

    if(full === 9 && !winner){
        winner = "Draw";
        document.getElementById("myP").textContent = "Winner: Draw";
        document.getElementById("try").style.display = "flex";

        document.querySelectorAll(".cell").forEach(button => {
            button.disabled = true;
        });
}
}
    
function checkWinner(){
    for(let i = 0; i < wins.length; i++){
        let a = wins[i][0];
        let b = wins[i][1];
        let c = wins[i][2];
        if(cells[a].textContent !== "" && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent){
            winner = cells[a].textContent;
        }
    }
}
function compMove(){
    let valid = false;
    while(!valid){ 
        let rand = Math.floor(Math.random() * 9);
        if(cells[rand].textContent === ""){
            cells[rand].textContent = comp;
            current = "player";
            valid = true;
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