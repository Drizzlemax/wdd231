// discover.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".discover-grid");

  // Async function to fetch attractions from JSON
  async function loadAttractions() {
    try {
      const response = await fetch("data/attractions.json"); // JSON file path
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      displayAttractions(data.attractions);
      addScrollAnimations();
    } catch (error) {
      console.error("Error fetching attractions:", error);
      container.innerHTML = `<p class="error">⚠️ Unable to load attractions. Please try again later.</p>`;
    }
  }

  // Display attractions as cards
  function displayAttractions(attractions) {
    container.innerHTML = ""; // Clear any existing content

    attractions.forEach(attraction => {
      const card = document.createElement("div");
      card.classList.add("attraction-card", "fade-in");

      card.innerHTML = `
        <h2>${attraction.name}</h2>
        <figure>
          <img src="${attraction.image}" alt="${attraction.name}">
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <a href="${attraction.website}" target="_blank" rel="noopener noreferrer" class="learn-more">
          Visit Website
        </a>
      `;

      container.appendChild(card);
    });
  }

  // Add scroll animations for a nice visual effect
  function addScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".fade-in").forEach(card => {
      observer.observe(card);
    });
  }

  // Load the data when the page is ready
  loadAttractions();
});


// Visitor Message using localStorage
document.addEventListener("DOMContentLoaded", () => {
  const messageContainer = document.getElementById("visitor-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const currentTime = Date.now();

  if (!lastVisit) {
    // First-time visitor
    messageContainer.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = currentTime - parseInt(lastVisit);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      messageContainer.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      messageContainer.textContent = "You last visited 1 day ago.";
    } else {
      messageContainer.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }

  // Store the current visit time
  localStorage.setItem("lastVisit", currentTime);
});


// Display the "Last Modified" date in the footer
document.addEventListener("DOMContentLoaded", () => {
  const lastModifiedElement = document.getElementById("lastModified");

  if (lastModifiedElement) {
    const modifiedDate = new Date(document.lastModified);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    lastModifiedElement.textContent = `Last Updated: ${modifiedDate.toLocaleDateString(
      "en-GB",
      options
    )}`;
  }
});
