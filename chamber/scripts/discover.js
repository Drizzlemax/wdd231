document.addEventListener("DOMContentLoaded", () => {
  loadAttractions();
});

async function loadAttractions() {
  const container = document.getElementById("attractions-container");

  try {
    const response = await fetch("data/attractions.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    container.innerHTML = data.attractions.map((item) => `
      <div class="attraction-card" style="grid-area: ${item.id};">
        <figure>
          <img src="${item.image}" alt="${item.name}">
        </figure>
        <h2>${item.name}</h2>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching attractions:", error);
    container.innerHTML = `<p class="error">⚠️ Failed to load attractions. Check console for details.</p>`;
  }
}
