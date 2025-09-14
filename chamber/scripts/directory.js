// =============================
// directory.js
// =============================

// DOM elements
const membersContainer = document.querySelector(".members");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

// -----------------------------
// Fetch members using async/await
// -----------------------------
async function fetchMembers() {
    try {
        const response = await fetch("data/members.json"); // path to your JSON file
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching members:", error);
        membersContainer.innerHTML = `<p>Unable to load member data.</p>`;
    }
}

// -----------------------------
// Display members dynamically
// -----------------------------
function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear previous content

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Image
        const img = document.createElement("img");
        img.src = member.image || "https://via.placeholder.com/100";
        img.alt = member.name;

        // Name
        const name = document.createElement("h3");
        name.textContent = member.name;

        // Tagline / Membership
        const tagline = document.createElement("p");
        tagline.classList.add("tagline");
        tagline.textContent = `Membership Level: ${member.membershiplevel}`;

        // Contact info
        const email = document.createElement("p");
        email.innerHTML = `<strong>Email:</strong> ${member.email || "N/A"}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phonenumber || "N/A"}`;

        const url = document.createElement("p");
        url.innerHTML = `<strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a>`;

        // Append to card
        card.append(img, name, tagline, email, phone, url);

        // Append card to container
        membersContainer.appendChild(card);
    });
}

// -----------------------------
// Grid/List toggle functionality
// -----------------------------
gridBtn.addEventListener("click", () => {
    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");
});

// -----------------------------
// Initialize
// -----------------------------
fetchMembers();

// Display last modified date in footer
const lastModified = document.getElementById("lastModified");
if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}
