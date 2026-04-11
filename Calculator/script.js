function append(char){
    let display = document.getElementById("display");
    const operators = ["+", "-", "/", "*"]
    let value = display.value;
    let last = value.slice(-1);
    let lastTwo = value.slice(-2)
    let numbers = display.value.split(/[+\-\*\/]/)
    let currentNum = numbers[numbers.length - 1]
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
    if(char == "."){
        if(currentNum.includes(".")){
            return;
        }
    }
    if(display.value == "Infinity" || display.value == "-Infinity" || display.value == "NaN" || display.value == "undefined"){
        display.value = "";
        if(operator.includes(char) && char != "-") return;
    }
    display.value += char;
    display.scrollLeft = display.scrollWidth;
}
function calculate(){
    let display = document.getElementById("display");
    
    if(display.value == "") return;
    display.value = math.evaluate(display.value)
}
function backSpace(){
    let display = document.getElementById("display");
    if(display.value == "Infinity" || display.value == "-Infinity" || display.value == "NaN" || display.value == "undefined"){
        display.value = "";
    }
    display.value = display.value.slice(0, -1);
    
}
function clearDisplay(){
    let display = document.getElementById("display");
    display.value = "";
}
function square(){
    if(document.getElementById("display").value){
        let display = document.getElementById("display")
        calculate();
    
        display.value = Math.pow(display.value, 2);
    }
}

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