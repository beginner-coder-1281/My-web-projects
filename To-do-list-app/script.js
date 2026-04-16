const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

// function to add a task
function addTask(){
    // checking for empty tasks and giving a pop-up
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
    
    // checking for long tasks and giving a pop-up
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
    
    // converting user input into a safe value to avoid injecting scripts
    let safeValue = inputBox.value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // formatting the safeValue to allow for bold, italic, strikethrough, underline, emphasize and highlight
    li.innerHTML = formatText(safeValue)
    
    // replacing my special syntax with a clickabl link
    li.innerHTML = li.innerHTML
    .replace(/~link address="([^"]+)"~ ([^~]+) ~\/link~/gi, '<a href="https://$1" target="_blank">$2</a>');
    
    taskList.appendChild(li);
    
    // creating delete button
    let span = document.createElement("span");
    span.textContent = "×";
    span.id = "del"
    li.appendChild(span);
    inputBox.value = "";
    
    // saving everything
    save();
    
    // pop-up to let the user know the task has been added
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

// function to allow my special syntax and replace it with text formatting
function formatText(text) {
    return text.replace(
        /~([biushe+]+)~ ([\s\S]+?) ~\/text-style~/gi,
        (match, styleStr, content) => {

            const styles = styleStr.split("+");
            
            // defining an open tag
            let open = "";
            let close = "";

            for (let s of styles) {
                if (s === "b") { open += "<b>"; close = "</b>" + close; }
                if (s === "i") { open += "<i>"; close = "</i>" + close; }
                if (s === "u") { open += "<u>"; close = "</u>" + close; }
                if (s === "s") { open += "<s>"; close = "</s>" + close; }
                if (s === "h") { open += "<mark>"; close = "</mark>" + close; }
                if (s === "e") { open += "<em>"; close = "</em>" + close; }
            }
            /*  When a style is detected, it is replaced by its html tag and the closing and opening part is updated
             
            
            if close = null
            then a tag is detected, so for example close = "</b>" + close, or "</b>" + null
            
            then another tag is detecting, then close = "</i>" + close, or "</i>" + "</b>", and so on, maintaining the order of tags
            
            
            and for opening we just add the opening tag
            
             */

            return open + content + close;
        }
    );
}

// functions to save and load data
function save(){
    localStorage.setItem("data", taskList.innerHTML)
}
function load(){
    taskList.innerHTML = localStorage.getItem("data") || "";
}

// function ti toggle the checked class if user clicks on a LI, if they click on a SPAN, asks for comfirmation before deleting task
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
                    save();
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
            }
        });
    }
});

load();