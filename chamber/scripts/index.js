// WEATHER SECTION
async function fetchWeather() {
  const apiKey = "d253a27be815c025821678be33b76786";
  const city = "Cape Town,ZA";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found");

    const data = await response.json();
    const weatherInfo = document.getElementById("weather-info");

    const current = data.list[0];
    const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 4); // 3 days + today

    weatherInfo.innerHTML = `
      <p>🌡️ Current Temp: ${current.main.temp}°C</p>
      <p>☁️ Condition: ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${forecast.map(item => `
          <li>${new Date(item.dt_txt).toLocaleDateString()}: ${item.main.temp}°C</li>
        `).join("")}
      </ul>
    `;
  } catch (error) {
    document.getElementById("weather-info").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// SPOTLIGHT SECTION
async function fetchSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Members not found");

    const data = await response.json();
    const members = data.members.filter(m => m.membershiplevel === 2 || m.membershiplevel === 3);

    // Pick 2-3 random members
    const shuffled = members.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = selected.map(member => `
      <div class="spotlight-card">
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>📞 ${member.phonenumber}</p>
        <p>📍 ${member.address}</p>
        <a href="${member.url}" target="_blank">Visit Website</a>
        <p><strong>${member.membershiplevel === 3 ? "Gold" : "Silver"} Member</strong></p>
      </div>
    `).join("");
  } catch (error) {
    document.getElementById("spotlight-container").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// INIT
fetchWeather();
fetchSpotlights();
