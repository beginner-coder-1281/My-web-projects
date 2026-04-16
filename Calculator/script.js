// function to update the display and validate input
function append(char){
    let display = document.getElementById("display");
    
    // defining important stats
    const operators = ["+", "-", "/", "*"]
    let value = display.value;
    let last = value.slice(-1);
    let lastTwo = value.slice(-2)
    let numbers = display.value.split(/[+\-\*\/]/)
    let currentNum = numbers[numbers.length - 1]
    
    // handling input of operators and prevent invalid input
    if(operators.includes(char)){
        if(operators.includes(last)){
            if(char != "-"){
                return;
            }
        }
        if(lastTwo == "+-" || lastTwo == "--" || lastTwo == "*-" || lastTwo == "/-"){
            return;
        } 
        if(display.value == "-" && char == "-") return;
        if(display.value == "") return;
    }
    
    // preventing 2 decimals in one number
    if(char == "."){
        if(currentNum.includes(".")){
            return;
        }
    }
    
    // clearing display on append if display.value is not a valid numerical number
    if(display.value == "Infinity" || display.value == "-Infinity" || display.value == "NaN" || display.value == "undefined"){
        display.value = "";
        if(operator.includes(char) && char != "-") return;
    }
    
    // adding character to the display and scrolling automatically
    display.value += char;
    display.scrollLeft = display.scrollWidth;
}


// function to calculate the result of the expression on the display
function calculate(){
    let display = document.getElementById("display");
    
    // using math.js to evaluate expressions safely
    if(display.value == "") return;
    display.value = math.evaluate(display.value);
}

// function to remove last character
function backSpace(){
    let display = document.getElementById("display");
    
    // clearing the display if display is not a valid numerical number
    if (display.value == "Infinity" || display.value == "-Infinity" || display.value == "NaN" || display.value == "undefined"){
        display.value = "";
    }
    
    // removing the last character
    display.value = display.value.slice(0, -1);
    
}

// function to clear display
function clearDisplay(){
    let display = document.getElementById("display");
    display.value = "";
}

// function to find square the result of the calculate function
function square(){
    if(document.getElementById("display").value){
        let display = document.getElementById("display")
        calculate();
    
        display.value = Math.pow(display.value, 2);
    }
}


// all the event listeners and functions to their designated buttons
document.getElementById("clear").addEventListener('click', clearDisplay);
document.getElementById("backspace").addEventListener('click', backSpace);
document.getElementById("square").addEventListener('click', square);
document.getElementById("divide").addEventListener('click', function(){append("/")});
document.getElementById("7").addEventListener('click', function(){append("7")});
document.getElementById("8").addEventListener('click', function(){append("8")});
document.getElementById("9").addEventListener('click', function(){append("9")});
document.getElementById("multiply").addEventListener('click', function(){append("*")});
document.getElementById("4").addEventListener('click', function(){append("4")});
document.getElementById("5").addEventListener('click', function(){append("5")});
document.getElementById("6").addEventListener('click', function(){append("6")});
document.getElementById("subtract").addEventListener('click', function(){append("-")});
document.getElementById("1").addEventListener('click', function(){append("1")});
document.getElementById("2").addEventListener('click', function(){append("2")});
document.getElementById("3").addEventListener('click', function(){append("3")});
document.getElementById("add").addEventListener('click', function(){append("+")});
document.getElementById("0").addEventListener('click', function(){append("0")});
document.getElementById("00").addEventListener('click', function(){append("00")});
document.getElementById(".").addEventListener('click', function(){append(".")});
document.getElementById("equal").addEventListener('click', calculate);