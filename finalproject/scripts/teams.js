// ================= TEAM PAGE SCRIPT =================
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ Team page loaded');

  // Load team data from JSON file
  fetchTeamData();

  // Tab filtering functionality
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const category = this.getAttribute('data-category');
      filterTeamMembers(category);
    });
  });

  // Mobile menu functionality
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// ================= FETCH TEAM DATA =================
function fetchTeamData() {
  fetch('./data/services.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (!data.team || data.team.length === 0) {
        throw new Error('No team data found in JSON');
      }

      console.log('✅ Team data loaded:', data.team);
      populateTeamMembers(data.team);
    })
    .catch(error => {
      console.error('❌ Error fetching team data:', error);
      loadFallbackTeamData();
    });
}

// ================= FALLBACK DATA =================
function loadFallbackTeamData() {
  console.warn('⚠️ Using fallback team data');
  const fallbackTeamData = {
    team: [
      {
        id: 1,
        name: 'Tendai Moyo',
        role: 'Lead Chauffeur',
        bio: 'Over 10 years of professional driving experience, specializing in VIP and executive transport.',
        image: 'images/aishaife2.webp',
        category: 'drivers',
        experience: '8+ years professional driving',
        details: {
          certifications: 'Defensive Driving, First Aid',
          languages: 'English, Shona',
          specialties: 'VIP Transport, Executive Travel'
        }
      }
    ]
  };
  populateTeamMembers(fallbackTeamData.team);
}

// ================= POPULATE TEAM MEMBERS =================
function populateTeamMembers(teamMembers) {
  const teamContainer = document.getElementById('team-container');
  if (!teamContainer) {
    console.error('❌ team-container element not found');
    return;
  }

  teamContainer.innerHTML = ''; // clear container first

  teamMembers.forEach(member => {
    const memberDiv = createTeamMemberElement(member);
    teamContainer.appendChild(memberDiv);
  });
}

// ================= CREATE MEMBER CARD =================
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
        <div class="detail-item"><span>Certifications:</span> ${certifications}</div>
        <div class="detail-item"><span>Languages:</span> ${languages}</div>
        <div class="detail-item"><span>Specialties:</span> ${specialties}</div>
      </div>
    </div>
  `;
  return memberDiv;
}

// ================= FILTER TEAM MEMBERS =================
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
