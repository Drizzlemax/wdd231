// ============================
// index.js
// Handles navigation, interactivity, and data rendering
// ============================

document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // NAVBAR TOGGLE
  // ============================
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ============================
  // FETCH JSON DATA
  // ============================
  const servicesContainer = document.getElementById("services-container");
  const teamContainer = document.getElementById("team-container");
  const calendarContainer = document.getElementById("calendar-container");

  fetch("data/data.json") // ✅ correct relative path from index.html
    .then(response => {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (servicesContainer) renderServices(data.services);
      if (teamContainer) renderTeam(data.team);
      if (calendarContainer) renderBookings(data.bookings);
    })
    .catch(error => console.error("❌ Error loading data.json:", error));

  // ============================
  // RENDER FUNCTIONS
  // ============================

  function renderServices(services) {
    servicesContainer.innerHTML = "";
    services.forEach(service => {
      const card = document.createElement("div");
      card.className = "card service-card";
      card.innerHTML = `
        <img src="${service.image}" alt="${service.title}">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <p class="price">From R${service.price}</p>
        <p class="duration">${service.duration}</p>
      `;
      servicesContainer.appendChild(card);
    });
  }

  function renderTeam(team) {
    teamContainer.innerHTML = "";
    team.forEach(member => {
      const card = document.createElement("div");
      card.className = "card team-card";
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p class="role">${member.role}</p>
        <p>${member.bio}</p>
      `;
      teamContainer.appendChild(card);
    });
  }

  function renderBookings(bookings) {
    calendarContainer.innerHTML = "";
    bookings.forEach(booking => {
      const item = document.createElement("div");
      item.className = "booking-item";
      item.innerHTML = `
        <strong>${booking.service}</strong><br>
        ${booking.date} @ ${booking.time}<br>
        <em>${booking.customer}</em>
      `;
      calendarContainer.appendChild(item);
    });
  }

  // ============================
  // BOOKING FORM
  // ============================
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;

      if (!name || !service || !date || !time) {
        alert("Please fill out all booking details.");
        return;
      }

      alert(`✅ Booking Confirmed!\n\nName: ${name}\nService: ${service}\nDate: ${date}\nTime: ${time}`);
      bookingForm.reset();
    });
  }
});
