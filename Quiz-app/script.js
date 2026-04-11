const questions = [
{text: "What is the capital of france?", 
    options: ["A.London", "B.Paris", "C.Banana", "D.The moon"],
answer: "B"},

{text: "What is the capital of India?",
options: ["A.Mumbai", "B.Delhi", "C.Kolkata", "D.Chennai"],
answer: "B"},

{text: "Which planet is closest to the Sun?",
options: ["A.Venus", "B.Earth", "C.Mercury", "D.Mars"],
answer: "C"},

{text: "What is 9 x 6?",
options: ["A.54", "B.56", "C.52", "D.48"],
answer: "A"},

{text: "Who invented the telephone?",
options: ["A.Edison", "B.Bell", "C.Newton", "D.Tesla"],
answer: "B"},

{text: "Which is the largest continent?",
options: ["A.Africa", "B.Europe", "C.Asia", "D.Australia"],
answer: "C"},

{text: "What gas do humans breathe in?",
options: ["A.Carbon Dioxide", "B.Oxygen", "C.Nitrogen", "D.Hydrogen"],
answer: "B"},

{text: "What is the square root of 81?",
options: ["A.7", "B.8", "C.9", "D.10"],
answer: "C"},

{text: "Who painted the Mona Lisa?",
options: ["A.Van Gogh", "B.Picasso", "C.Leonardo da Vinci", "D.Michelangelo"],
answer: "C"},

{text: "Which is the smallest prime number?",
options: ["A.0", "B.1", "C.2", "D.3"],
answer: "C"},

{text: "Which country is known as the Land of the Rising Sun?",
options: ["A.China", "B.Japan", "C.Korea", "D.Thailand"],
answer: "B"},

{text: "What is H2O commonly known as?",
options: ["A.Salt", "B.Oxygen", "C.Water", "D.Hydrogen"],
answer: "C"},

{text: "How many sides does a triangle have?",
options: ["A.2", "B.3", "C.4", "D.5"],
answer: "B"},

{text: "Who is known as the father of computers?",
options: ["A.Newton", "B.Einstein", "C.Charles Babbage", "D.Turing"],
answer: "C"},

{text: "Which is the largest planet?",
options: ["A.Earth", "B.Mars", "C.Jupiter", "D.Saturn"],
answer: "C"},

{text: "What is 15 ÷ 3?",
options: ["A.3", "B.4", "C.5", "D.6"],
answer: "C"},
{
text: "Which language is used for web apps?",
options: ["A.Python", "B.Java", "C.JavaScript", "D.C++"],
answer: "C"},

{text: "Which organ pumps blood in the body?",
options: ["A.Lungs", "B.Brain", "C.Heart", "D.Liver"],
answer: "C"},

{text: "What is the boiling point of water?",
options: ["A.90°C", "B.100°C", "C.110°C", "D.120°C"],
answer: "B"},

{text: "Which is the fastest land animal?",
options: ["A.Lion", "B.Cheetah", "C.Tiger", "D.Leopard"],
answer: "B"},

{text: "What is 7 squared?",
options: ["A.42", "B.47", "C.49", "D.52"],
answer: "C"}

];

let selected = new Array(questions.length).fill(null)
let current = 0
let winner = false;
const container = document.getElementById("container");
const questionDiv = document.getElementById("question-div")
function next(q, index){
    
    questionDiv.innerHTML = "";
    document.getElementById("submit-div").innerHTML = "";
    questionDiv.innerHTML += `
    <div class="question-block">
        <h3>${index + 1}.${q.text}</h3>
        <label>
            <input type='radio' name="option" value="A"> ${q.options[0]}
        </label>
        <br>
        <label>
            <input type='radio' name="option" value="B"> ${q.options[1]}
        </label>
        <br>
        <label>
            <input type='radio' name="option" class="options" value="C"> ${q.options[2]}
        </label>
        <br>
        <label>
        <input type='radio' name="option" class="options" value="D">${q.options[3]}
        </label>
        <br>
    </div>
    `;
    
    if(selected[index]){
        let radio = document.querySelector(`input[value="${selected[index]}"]`)
        
        radio.checked = true;
    }
    if(winner){
       let input = document.querySelectorAll("input");
        input.forEach(input => {
            input.disabled = true;
            const line = input.parentElement; 
            line.style.display = "block"; 
            line.style.padding = "5px";
            line.style.borderRadius = "4px";

            if (input.value === q.answer) {
                line.style.backgroundColor = "#02a30a"; 
                line.style.color = "#FFFFFF";           
            } else if (input.checked && input.value !== q.answer) {
                line.style.backgroundColor = "#f72a2a"; 
                line.style.color = "#FFFFFF";           
            }
        });
    }
    
};
next(questions[current], current);
function checkScore(){
    let score = 0
    questions.forEach((q, index) => {
        if(selected[index] == q.answer){
            score += 1;
        }
        feedback = document.getElementById("score");
        feedback.textContent = `You scored ${score} out of ${questions.length}`;
        result = document.getElementById("result");
        if(score > questions.length / 2){
            result.textContent = "Pass";
            result.style.color = "green";
        }
        else{
            result.textContent = "Fail";
            result.style.color = "red";
        }
        let input = document.querySelectorAll("input");
        input.forEach(input => {
            input.disabled = true;
        });
        winner = true;
        next(questions[current], current)
    })};
function previous(){
    current --;
    next(questions[current], current);
}
let x = 20
document.getElementById("next").addEventListener("click", function(){
    if(current == questions.length - 1){
        return;
    }
    let select = document.querySelector('input[name="option"]:checked')
    if(select){
        selected[current] = select.value;
    }
    current ++;
    
    
    next(questions[current], current);
    
    if(current == x){
        document.getElementById("submit-div").innerHTML = `<button id="submit">Submit</button>`;
        document.getElementById("submit").addEventListener("click", checkScore);
        document.getElementById("submit").classList.add("btn");
    }
    if(winner){
        x = 5020499239;
        }
});

document.getElementById("previous").addEventListener("click", function(){
    if(current <= 0){
        return;
    }
    let select = document.querySelector('input[name="option"]:checked')
    if(select){
        selected[current] = select.value;
    }
    previous();
});
