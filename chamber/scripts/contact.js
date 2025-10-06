// contact.js

// Display current year and last modified date
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModified = document.getElementById("lastModified");

  yearSpan.textContent = new Date().getFullYear();
  lastModified.textContent = document.lastModified;

  // Handle form submission (simple client-side)
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you for contacting us! We'll respond soon.");
    form.reset();
  });
});

// Google Map initialization
function initMap() {
  const chamberLocation = { lat: -33.9249, lng: 18.4241 }; // Cape Town coordinates

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: chamberLocation,
  });

  new google.maps.Marker({
    position: chamberLocation,
    map: map,
    title: "Cape Town Chamber of Commerce",
  });
}

