// js/data-fetch.js

// Load and render JSON content dynamically
export async function loadData() {
  try {
    const response = await fetch('./data/data.json');
    const data = await response.json();

    renderServices(data.services);
    renderTeam(data.team);
    renderBookings(data.bookings);
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}

// Render services dynamically
function renderServices(services) {
  const container = document.getElementById('services-container');
  if (!container) return;

  container.innerHTML = services.map(service => `
    <div class="service-card">
      <img src="${service.image}" alt="${service.title}">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <div class="service-details">
        <span class="price">R${service.price}</span>
        <span class="duration">${service.duration}</span>
      </div>
      <button class="book-btn">Book Now</button>
    </div>
  `).join('');
}

// Render team section dynamically
function renderTeam(team) {
  const container = document.getElementById('team-container');
  if (!container) return;

  container.innerHTML = team.map(member => `
    <div class="team-card">
      <img src="${member.image}" alt="${member.name}">
      <h4>${member.name}</h4>
      <p class="role">${member.role}</p>
      <p class="bio">${member.bio}</p>
    </div>
  `).join('');
}

// Render booking calendar preview
function renderBookings(bookings) {
  const container = document.getElementById('calendar-container');
  if (!container) return;

  container.innerHTML = `
    <h3>Upcoming Bookings</h3>
    <ul>
      ${bookings.map(b => `
        <li>
          <strong>${b.service}</strong> — ${b.date} at ${b.time} <br>
          <em>${b.customer}</em>
        </li>
      `).join('')}
    </ul>
  `;
}
