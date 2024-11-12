// Simulated data
const weatherData = {
    location: "New York, USA",
    current: {
        temperature: "22°C",
        description: "Sunny",
        humidity: "60%",
        wind: "15 km/h",
        iconClass: "sunny"
    },
    forecast: [
        { day: "Mon", temperature: "25°C", iconClass: "sunny" },
        { day: "Tue", temperature: "20°C", iconClass: "cloudy" },
        { day: "Wed", temperature: "18°C", iconClass: "rainy" }
    ]
};

// Populate the UI with the simulated data
function displayWeather(data) {
    document.getElementById("location").innerText = data.location;
    document.getElementById("temperature").innerText = data.current.temperature;
    document.getElementById("description").innerText = data.current.description;
    document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}`;
    document.getElementById("wind").innerText = `Wind: ${data.current.wind}`;
    
    // Set the current weather icon
    const iconElement = document.getElementById("icon");
    iconElement.classList.add(data.current.iconClass);

    // Set the forecast
    const forecastContainer = document.querySelector(".forecast-cards");
    forecastContainer.innerHTML = ""; // Clear existing forecast

    data.forecast.forEach((forecast) => {
        const forecastCard = document.createElement("div");
        forecastCard.className = "forecast-card";
        
        forecastCard.innerHTML = `
            <p>${forecast.day}</p>
            <div class="weather-icon ${forecast.iconClass}"></div>
            <p>${forecast.temperature}</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Initialize display
displayWeather(weatherData);