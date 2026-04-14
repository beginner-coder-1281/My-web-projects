const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

function addTask(){
    if(inputBox.value.trim() === ""){
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Give your task some words',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        });
        return;
    }
    
    if(inputBox.value.trim().length > 200){
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Task cannot be longer than 200 characters',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        });
        inputBox.value = "";
        return;
    }
    let li = document.createElement("li");
    li.textContent = inputBox.value.trim();
    taskList.appendChild(li);
    
    let span = document.createElement("span");
    span.textContent = "×";
    li.appendChild(span);
    inputBox.value = "";
    
    save();
    
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Task added',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });
}

function save(){
    localStorage.setItem("data", taskList.innerHTML)
}
function load(){
    taskList.innerHTML = localStorage.getItem("data") || "";
}
taskList.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        save();
    }
    else if(e.target.tagName == "SPAN"){
        Swal.fire({
            title: 'Delete this task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                e.target.parentElement.classList.add("fade");
                setTimeout(function(){
                    e.target.parentElement.remove();
                }, 500);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task deleted',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true
                });
                save();
            }
        });
    }
});

load();
