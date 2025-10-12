// =======================================
//  TEAM.JS - LinkCar Shuttles
//  Version: Local JSON Data + Lazy Loading
// =======================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Team.js loaded');
  populateTeamMembers(teamData);

  // Handle category filter
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.getAttribute('data-category');
      filterTeamMembers(category);
    });
  });

  // Handle mobile nav menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// =======================================
// TEAM DATA (Static JSON inside JS)
// =======================================
const teamData = [
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
  },
  {
    id: 4,
    name: "James Wilson",
    role: "CEO & Founder",
    bio: "James founded LinkCar Shuttles with a vision to redefine luxury transport in Cape Town. His extensive experience in the hospitality industry ensures we maintain the highest standards of service.",
    image: "images/team/ceo.jpg",
    category: "management",
    experience: "15+ years in luxury transport",
    details: {
      certifications: "Tourism Grading Council, PRDP",
      languages: "English, Afrikaans",
      specialties: "Business Strategy, Hospitality Standards"
    }
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Operations Manager",
    bio: "Sarah ensures every journey runs smoothly, coordinating our fleet and managing schedules with precision. Her background in logistics guarantees efficient and reliable service.",
    image: "images/team/operations.jpg",
    category: "management",
    experience: "10+ years in transport logistics",
    details: {
      certifications: "Advanced Transport Management",
      languages: "English",
      specialties: "Fleet Management, Route Planning"
    }
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Senior Chauffeur",
    bio: "Michael is one of our most experienced chauffeurs, known for his exceptional knowledge of Cape Town and his commitment to passenger comfort and safety.",
    image: "images/team/driver1.jpg",
    category: "drivers",
    experience: "8+ years professional driving",
    details: {
      certifications: "Defensive Driving, First Aid",
      languages: "English, Afrikaans",
      specialties: "Wine Tours, Airport Transfers"
    }
  },
  {
    id: 7,
    name: "David Williams",
    role: "Luxury Tour Specialist",
    bio: "David combines his passion for Cape Town's beauty with his expertise in luxury service to create unforgettable tour experiences for our clients.",
    image: "images/team/driver2.jpg",
    category: "drivers",
    experience: "12+ years in tourism",
    details: {
      certifications: "Tour Guide, Hospitality",
      languages: "English, French",
      specialties: "Peninsula Tours, Historical Sites"
    }
  },
  {
    id: 8,
    name: "Robert Green",
    role: "Corporate Transport Expert",
    bio: "Robert specializes in corporate travel, understanding the unique needs of business clients and ensuring punctuality and professionalism at all times.",
    image: "images/team/driver3.jpg",
    category: "drivers",
    experience: "6+ years corporate service",
    details: {
      certifications: "Business Etiquette, Advanced Driving",
      languages: "English",
      specialties: "Executive Transfers, Conference Transport"
    }
  },
  {
    id: 9,
    name: "Lisa Martinez",
    role: "Customer Service Manager",
    bio: "Lisa leads our customer service team, ensuring every client interaction is handled with care, professionalism, and attention to detail.",
    image: "images/team/support1.jpg",
    category: "support",
    experience: "7+ years in customer relations",
    details: {
      certifications: "Customer Service Excellence",
      languages: "English, Spanish, Afrikaans",
      specialties: "Client Relations, Service Quality"
    }
  },
  {
    id: 10,
    name: "Thomas Clark",
    role: "Booking Coordinator",
    bio: "Thomas manages our booking system, ensuring all reservations are accurately recorded and our clients receive timely confirmations and updates.",
    image: "images/team/support2.jpg",
    category: "support",
    experience: "5+ years in reservation systems",
    details: {
      certifications: "Hospitality Management",
      languages: "English",
      specialties: "Reservation Systems, Itinerary Planning"
    }
  }
];

// =======================================
//  POPULATE TEAM MEMBERS
// =======================================
function populateTeamMembers(teamMembers) {
  const container = document.getElementById('team-container');
  if (!container) return;

  container.innerHTML = ''; // clear content

  teamMembers.forEach(member => {
    const card = createTeamCard(member);
    container.appendChild(card);
  });

  initLazyLoading();
}

// =======================================
//  CREATE TEAM MEMBER CARD
// =======================================
function createTeamCard(member) {
  const div = document.createElement('div');
  div.className = `team-member ${member.category}`;
  div.dataset.category = member.category;

  div.innerHTML = `
    <div class="member-image">
      <img data-src="${member.image}" alt="${member.name}" class="lazy-image" onerror="this.src='images/placeholder-team.jpg'">
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
        <div><strong>Certifications:</strong> ${member.details.certifications}</div>
        <div><strong>Languages:</strong> ${member.details.languages}</div>
        <div><strong>Specialties:</strong> ${member.details.specialties}</div>
      </div>
    </div>
  `;

  return div;
}

// =======================================
//  FILTER TEAM MEMBERS BY CATEGORY
// =======================================
function filterTeamMembers(category) {
  const members = document.querySelectorAll('.team-member');
  members.forEach(member => {
    if (category === 'all' || member.dataset.category === category) {
      member.style.display = 'flex';
    } else {
      member.style.display = 'none';
    }
  });
}

// =======================================
//  LAZY LOAD IMAGES
// =======================================
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy-image');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('fade-in');
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback: load all immediately
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}
