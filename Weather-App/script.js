const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = //Your Api Key here

weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();
    const city = cityInput.value;
    
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData)
        }
        catch(error){
            console.error(error);
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    const response = await fetch(apiURL);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json()
}

function displayWeatherData(data){
    
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    
    
    card.textContent = "";
    card.style.display = "flex";
    
    cityDisplay = document.createElement("h1");
    tempDisplay = document.createElement("p");
    humidityDisplay = document.createElement("p");
    descDisplay = document.createElement("p");
    emojiDisplay = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = (Number(temp) - 273.15).toFixed(2) + "°C";
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);
    
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("emojiDisplay");
    
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

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

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");
    
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
