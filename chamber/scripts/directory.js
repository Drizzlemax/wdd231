// =============================
// DIRECTORY.JS
// =============================

// Get references to DOM elements
const membersContainer = document.querySelector(".members");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

// Fetch member data from JSON file
async function fetchMembers() {
    try {
        const response = await fetch("data/members.json"); // Make sure the JSON path is correct
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching member data:", error);
        membersContainer.innerHTML = "<p>Unable to load member data.</p>";
    }
}

// Display members dynamically
function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear existing content

    members.forEach(member => {
        // Create member card
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Image
        const img = document.createElement("img");
        img.src = member.image || "https://via.placeholder.com/100";
        img.alt = member.name;

        // Name
        const name = document.createElement("h3");
        name.textContent = member.name;

        // Tagline / Membership level
        const tagline = document.createElement("p");
        tagline.classList.add("tagline");
        tagline.textContent = `Membership Level: ${member.membershiplevel}`;

        // Contact info
        const email = document.createElement("p");
        email.innerHTML = `<strong>Email:</strong> ${member.email || "info@example.com"}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phonenumber || "N/A"}`;

        const url = document.createElement("p");
        url.innerHTML = `<strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a>`;

        // Append elements to card
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(url);

        // Append card to container
        membersContainer.appendChild(card);
    });
}

// Toggle to grid view
gridBtn.addEventListener("click", () => {
    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");
});

// Toggle to list view
listBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");
});

// =============================
// INITIALIZE
// =============================
fetchMembers();

// Optional: Show last modified date in footer
const lastModified = document.getElementById("lastModified");
if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}
// =============================
// END OF DIRECTORY.JS
// =============================