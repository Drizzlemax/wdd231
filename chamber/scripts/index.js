// ================================
// WEATHER SECTION (GitHub Pages friendly)
// ================================
async function fetchWeather() {
  const apiKey = "d253a27be815c025821678be33b76786"; // Your OpenWeatherMap API key
  const city = "Cape Town,ZA";

  // Use a free CORS proxy to bypass CORS issues on GitHub Pages
  const proxy = "https://api.allorigins.win/raw?url=";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  const url = proxy + encodeURIComponent(apiUrl);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather data not found (status ${response.status})`);

    const data = await response.json();
    const weatherInfo = document.getElementById("weather-info");

    const current = data.list[0];
    const forecast = data.list.filter((item, index) => index % 8 === 0).slice(1, 4); // next 3 days

    weatherInfo.innerHTML = `
      <div class="weather-card">
        <p>🌡️ Current Temp: ${Math.round(current.main.temp)}°C</p>
        <p>☁️ Condition: ${current.weather[0].description}</p>
        <h3>3-Day Forecast</h3>
        <ul>
          ${forecast.map(item => `
            <li>${new Date(item.dt_txt).toLocaleDateString()}: ${Math.round(item.main.temp)}°C</li>
          `).join("")}
        </ul>
      </div>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("weather-info").innerHTML = `<p>Error loading weather: ${error.message}</p>`;
  }
}

// ================================
// SPOTLIGHT SECTION
// ================================
async function fetchSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`Members not found (status ${response.status})`);

    const data = await response.json();
    const members = data.members.filter(m => m.membershiplevel === 2 || m.membershiplevel === 3);

    const shuffled = members.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = selected.map(member => `
      <div class="spotlight-card">
        <img src="${member.image || 'images/default-member.png'}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>📞 ${member.phonenumber}</p>
        <p>📍 ${member.address}</p>
        <a href="${member.url}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        <p><strong>${member.membershiplevel === 3 ? "Gold" : "Silver"} Member</strong></p>
      </div>
    `).join("");
  } catch (error) {
    console.error(error);
    document.getElementById("spotlight-container").innerHTML = `<p>Error loading members: ${error.message}</p>`;
  }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
  fetchSpotlights();
});

