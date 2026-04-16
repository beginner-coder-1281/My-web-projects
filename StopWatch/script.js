// defining core variables
let startTime = 0;
let elasped = 0;
let timer = null;

// function to update the stopwatch
function update(){
    // defining current time
    let total = Date.now() - startTime + elasped;
    
    // defining current second, minute and hour
    let second = Math.floor(total / 1000) % 60;
    let minute = Math.floor(total / (1000 * 60)) % 60;
    let hour = Math.floor(total / (1000 * 60 * 60));
    
    // formatting second minute and hours to have padding at the start
    let s = String(second).padStart(2, "0");
    let m = String(minute).padStart(2, "0");
    let h = String(hour).padStart(2, "0");
    
    // updating clock
    document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

// starting the timer
document.getElementById("start").onclick = function(){
    if(timer !== null) return;
    
    startTime = Date.now();
    timer = setInterval(update, 1000);
} 

// stoping the timer
document.getElementById("stop").onclick = function(){
    clearInterval(timer);
    timer = null;
    elasped += Date.now() - startTime;
}

// reseting the timer
document.getElementById("reset").onclick = function () {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elasped = 0;
    document.getElementById("clock").textContent = "00:00:00";
};