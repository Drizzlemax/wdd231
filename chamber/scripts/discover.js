// discover.js

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#attractionsContainer");

  try {
    const response = await fetch("data/attractions.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const attractions = data.attractions;

    attractions.forEach(attraction => {
      const card = document.createElement("section");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${attraction.name}</h2>
        <figure>
          <img src="${attraction.image}" alt="${attraction.name}">
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching attractions:", error);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "⚠️ Failed to load attractions. Please try again later.";
    container.appendChild(errorMsg);
  }
});
