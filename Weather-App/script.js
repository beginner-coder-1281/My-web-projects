// defining core variables
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "86ecb9900888bf4aacb57bf51d95e6b7";

weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();
    const city = cityInput.value;
    
    // if input is given, get weather data and display it
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData)
        }
        // if error, display a error to the user and console it
        catch(error){
            console.error(error);
            displayError(error)
        }
    }
    // if no input given, displaying a Error to the user
    else{
        displayError("Please enter a city");
    }
});

// function to get data from the api
async function getWeatherData(city){
    // url to get data from
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    const response = await fetch(apiURL);
    
    // error if reponse not ok
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json()
}

function displayWeatherData(data){
    
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    
    // displaying the card
    card.textContent = "";
    card.style.display = "flex";
    
    // creating the elements
    cityDisplay = document.createElement("h1");
    tempDisplay = document.createElement("p");
    humidityDisplay = document.createElement("p");
    descDisplay = document.createElement("p");
    emojiDisplay = document.createElement("p");
    
    // changing text content of the elements
    cityDisplay.textContent = city;
    tempDisplay.textContent = (Number(temp) - 273.15).toFixed(2) + "°C";
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);
    
    // adding a class to each element
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("emojiDisplay");
    
    // append each element to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

// getting weather emoji based on the weatherID
function getWeatherEmoji(id){
    switch (true) {
       case (id >= 200 && id < 300): 
           return "⛈️";
       case (id >= 300 && id < 400):
           return "🌦️";
       case (id >= 500 && id < 600):
           return "🌧️";
       case (id >= 600 && id < 700):
           return "❄️";
       case (id >= 700 && id < 800):
           return "🌫️";
       case (id === 800):
           return "☀️";
       case (id >= 801 && id < 810):
           return "☁️";
       default:
           return "❓";
    }
}

// function to display error
function displayError(message){
    // creating error element
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");
    
    // emptying card and appending error element
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}