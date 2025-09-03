const API_KEY = "2db07033ed5fb799189d8a0c4e0294b9"; // Replace with your OpenWeatherMap API key
let map;

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod !== 200) {
                document.getElementById("weatherResult").innerHTML = "City not found!";
                return;
            }

            const { name, main, weather, coord } = data;
            const icon = weather[0].icon;
            const description = weather[0].description;
            const temp = main.temp;

            document.getElementById("weatherResult").innerHTML = `
        <h2>${name}</h2>
        <p><strong>${temp}°C</strong>, ${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
      `;

            showMap(coord.lat, coord.lon);
        })
        .catch((err) => {
            console.log(err);
            document.getElementById("weatherResult").innerHTML = "Error fetching data.";
        });
}

function showMap(lat, lon) {
    if (map) {
        map.setView([lat, lon], 10);
        return;
    }

    map = L.map("map").setView([lat, lon], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([lat, lon]).addTo(map);
}
