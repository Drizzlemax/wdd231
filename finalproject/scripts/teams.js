// ===============================
//  TEAM PAGE FUNCTIONALITY
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Team page loaded');

  // Load team data
  fetchTeamData();

  // Setup category filter tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.getAttribute('data-category');
      filterTeamMembers(category);
    });
  });

  // Setup mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// ===============================
//  FETCH TEAM DATA FROM JSON
// ===============================
function fetchTeamData() {
  // Adjust the path depending on where your team.html is located
  fetch('./data/services.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load team data');
      return response.json();
    })
    .then(data => {
      console.log('✅ Team data loaded successfully:', data.team);
      populateTeamMembers(data.team);
    })
    .catch(error => {
      console.error('❌ Error fetching team data:', error);
      loadFallbackTeamData();
    });
}

// ===============================
//  FALLBACK DATA IF FETCH FAILS
// ===============================
function loadFallbackTeamData() {
  const fallbackTeamData = [
    {
      id: 1,
      name: "Tendai Moyo",
      role: "Lead Chauffeur",
      bio: "Over 10 years of professional driving experience, specializing in VIP and executive transport.",
      image: "images/aishaife2.webp",
      category: "drivers",
      experience: "8+ years professional driving",
      details: {
        certifications: "Defensive Driving, First Aid",
        languages: "English, Shona",
        specialties: "VIP Transport, Executive Travel"
      }
    },
    {
      id: 2,
      name: "Lisa Dlamini",
      role: "Bookings Manager",
      bio: "Coordinates all client reservations and ensures every trip runs smoothly.",
      image: "images/aishaife.webp",
      category: "support",
      experience: "5+ years in customer service",
      details: {
        certifications: "Customer Service Excellence",
        languages: "English, Zulu",
        specialties: "Reservation Management, Client Relations"
      }
    },
    {
      id: 3,
      name: "Brian Ncube",
      role: "Tour Guide",
      bio: "A Cape Town native with deep local knowledge — your perfect guide for scenic adventures.",
      image: "images/aishaife3.webp",
      category: "drivers",
      experience: "8+ years in tourism",
      details: {
        certifications: "Tour Guide, Hospitality",
        languages: "English, Xhosa",
        specialties: "Scenic Tours, Historical Sites"
      }
    }
  ];

  console.log('⚠️ Using fallback team data');
  populateTeamMembers(fallbackTeamData);
}

// ===============================
//  POPULATE TEAM MEMBERS
// ===============================
function populateTeamMembers(teamMembers) {
  const teamContainer = document.getElementById('team-container');
  if (!teamContainer) {
    console.error('❌ Team container not found!');
    return;
  }

  teamContainer.innerHTML = ''; // Clear previous content

  teamMembers.forEach(member => {
    const memberElement = createTeamMemberElement(member);
    teamContainer.appendChild(memberElement);
  });
}

// ===============================
//  CREATE TEAM MEMBER CARD
// ===============================
function createTeamMemberElement(member) {
  const memberDiv = document.createElement('div');
  memberDiv.className = `team-member ${member.category}`;
  memberDiv.setAttribute('data-category', member.category);

  const certifications = member.details?.certifications || 'N/A';
  const languages = member.details?.languages || 'N/A';
  const specialties = member.details?.specialties || 'N/A';

  memberDiv.innerHTML = `
    <div class="member-image">
      <img src="${member.image}" alt="${member.name}" onerror="this.src='images/placeholder-team.jpg'">
      <div class="member-overlay">
        <div class="social-links">
          <a href="#"><img src="images/linkedin.svg" alt="LinkedIn"></a>
          <a href="#"><img src="images/email.svg" alt="Email"></a>
        </div>
      </div>
    </div>
    <div class="member-info">
      <h3>${member.name}</h3>
      <p class="role">${member.role}</p>
      <p class="experience">${member.experience}</p>
      <p class="bio">${member.bio}</p>

      <div class="member-details">
        <div class="detail-item">
          <span class="detail-label">Certifications:</span>
          <span class="detail-value">${certifications}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Languages:</span>
          <span class="detail-value">${languages}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Specialties:</span>
          <span class="detail-value">${specialties}</span>
        </div>
      </div>
    </div>
  `;

  return memberDiv;
}

// ===============================
//  FILTER TEAM MEMBERS
// ===============================
function filterTeamMembers(category) {
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    if (category === 'all' || member.dataset.category === category) {
      member.style.display = 'flex';
    } else {
      member.style.display = 'none';
    }
  });
}
