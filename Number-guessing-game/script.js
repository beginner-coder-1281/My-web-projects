let max = 0;
let rand = 0;
document.getElementById("confirm-dif").addEventListener("click", function(){
   if(document.getElementById("dif-easy").checked){
      max = 100;
   }
   else if(document.getElementById("dif-medium").checked){
      max = 1000;
   }
   else if(document.getElementById("dif-hard").checked){
      max = 10000;
   }
   else{
      return
   }
   rand = Math.floor(Math.random() * max) + 1;
   document.getElementById("dif-menu").style.display = "none";
   document.getElementById("container").style.display = "flex";
   document.getElementById("label").textContent = `Enter your guess(1-${max})`
});




let feedback = document.getElementById("feedback");
let attempts = 0;

document.getElementById("submit").addEventListener("click", function(){
   let input = document.getElementById("guess-input")
   if(input.value.includes(".")){
      feedback.textContent = "Guess cannot contain decimals";
      feedback.style.color = "red";
   }
   else if(input.value.includes("-")){
      feedback.textContent = "Guess must be a positive integer";
      feedback.style.color = "red";
   }
   else if(input.value == ""){
      feedback.textContent = "Guess cannot be empty";
      feedback.style.color = "red";
   }
   else if(Number(input.value) > max || Number(input.value) < 1){
      feedback.textContent = `Guess must be between 1 and ${max}`;
      feedback.style.color = "red";
   }
   else if(Number(input.value) > rand){
      attempts++;
      feedback.textContent = "Your guess is too high!";
      feedback.style.color = "red";
      document.getElementById("a-label").textContent = `Attempts taken: ${attempts}`;
   }
   else if(Number(input.value) < rand){
      attempts++;
      feedback.textContent = "Your guess is too low!";
      feedback.style.color = "red";
      document.getElementById("a-label").textContent = `Attempts taken: ${attempts}`;
   }
   else if(Number(input.value) == rand){
      attempts++;
      feedback.textContent = "You guessed the number in " + attempts + " attempts!";
      feedback.style.color = "green";
      document.getElementById("a-label").textContent = `Attempts taken: ${attempts}`;
      let tryAgain = document.getElementById("try");
      tryAgain.style.display = "flex";
      tryAgain.addEventListener("click", function(){
         location.reload();
      });
   } 
   if(Number(input.value) != rand){
      setTimeout(function(){
      feedback.textContent = "";
   }, 3000);
   }
});