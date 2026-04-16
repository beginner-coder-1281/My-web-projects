// defining important variables

let max = 0;
let rand = 0;

// Event listener to comfirm game difficulty
document.getElementById("confirm-dif").addEventListener("click", function(){
   
   // Assigning a value to max based on the difficulty
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
   
   // generating random number between 1 and max
   rand = Math.floor(Math.random() * max) + 1;
   
   // removing the difficulty screen and displaying the main game
   document.getElementById("dif-menu").style.display = "none";
   document.getElementById("container").style.display = "flex";
   document.getElementById("label").textContent = `Enter your guess(1-${max})`
});




let feedback = document.getElementById("feedback");
let attempts = 0;

// Event listener to check the guess on clicking the submit button
document.getElementById("submit").addEventListener("click", function(){
   let input = document.getElementById("guess-input")
   
   // validating user input and providing feedback
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
   
   // Checking if number is lower, higher, or equal to the random button
   // and providing feedback, as well as tracking attempts
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
      
      // displaying try again button
      let tryAgain = document.getElementById("try");
      tryAgain.style.display = "flex";
      tryAgain.addEventListener("click", function(){
         location.reload();
      });
   } 
   
   // removing the feedback after 3 second if guess is not correct
   if(Number(input.value) != rand){
      setTimeout(function(){
      feedback.textContent = "";
   }, 3000);
   }
});