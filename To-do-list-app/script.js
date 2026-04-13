const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");
feedback = document.getElementById("feedback");


function addTask(){
    if(inputBox.value.trim() === ""){
        feedback.textContent = "Please enter a task"
        feedback.style.color = "red";
        setTimeout(function(){
            feedback.textContent = "";
        }, 3000);
        return;
    }
    
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    taskList.appendChild(li);
    
    let span = document.createElement("span");
    span.textContent = "×"
    li.appendChild(span);
    inputBox.value = "";
    
    save();
}

function save(){
    localStorage.setItem("data", taskList.innerHTML)
}
function load(){
    taskList.innerHTML = localStorage.getItem("data");
}
taskList.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        save();
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.classList.add("fade");
        setTimeout(function(){
            e.target.parentElement.remove();
        }, 500);
        save();
    }
});


load();