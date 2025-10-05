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
