// Team page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Team page loaded');
    initializeTeamPage();
});

// Initialize the team page
function initializeTeamPage() {
    console.log('Initializing team page...');
    
    // Load team data
    fetchTeamData()
        .then(teamData => {
            console.log('Team data received:', teamData);
            populateTeamMembers(teamData);
            setupEventListeners();
        })
        .catch(error => {
            console.error('Error loading team data:', error);
            // Use fallback data
            const fallbackData = getFallbackTeamData();
            console.log('Using fallback data:', fallbackData);
            populateTeamMembers(fallbackData);
            setupEventListeners();
        });
}

// Fetch team data from JSON file
async function fetchTeamData() {
    try {
        console.log('Fetching team data from: data/services.json');
        const response = await fetch('data/services.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw JSON data:', data);
        
        if (!data.team) {
            throw new Error('No team data found in JSON');
        }
        
        return data.team;
    } catch (error) {
        console.error('Failed to fetch team data:', error);
        throw error;
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.tab-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    console.log('Event listeners setup complete');
}

// Handle filter button clicks
function handleFilterClick(event) {
    const filterButtons = document.querySelectorAll('.tab-btn');
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    const category = event.target.getAttribute('data-category');
    filterTeamMembers(category);
}

// Populate team members in the container
function populateTeamMembers(teamMembers) {
    const teamContainer = document.getElementById('team-container');
    
    if (!teamContainer) {
        console.error('Team container not found!');
        return;
    }

    console.log('Populating team members:', teamMembers);
    teamContainer.innerHTML = ''; // Clear existing content

    if (!teamMembers || teamMembers.length === 0) {
        teamContainer.innerHTML = '<div class="error-message">No team members found.</div>';
        return;
    }

    teamMembers.forEach(member => {
        const memberElement = createTeamMemberElement(member);
        teamContainer.appendChild(memberElement);
    });
    
    console.log('Team members populated successfully');
}

// Create HTML element for a team member
function createTeamMemberElement(member) {
    const memberDiv = document.createElement('div');
    memberDiv.className = `team-member ${member.category}`;
    memberDiv.setAttribute('data-category', member.category);
    
    // Format details for display
    const certifications = member.details?.certifications || 'Not specified';
    const languages = member.details?.languages || 'Not specified';
    const specialties = member.details?.specialties || 'Not specified';
    
    memberDiv.innerHTML = `
        <div class="member-image">
            <img src="${member.image}" alt="${member.name} - ${member.role}" onerror="this.src='images/placeholder-team.jpg'">
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

// Filter team members by category
function filterTeamMembers(category) {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        if (category === 'all' || member.getAttribute('data-category') === category) {
            member.style.display = 'flex';
        } else {
            member.style.display = 'none';
        }
    });
}

// Fallback team data
function getFallbackTeamData() {
    return [
        {
            "id": 1,
            "name": "Tendai Moyo",
            "role": "Lead Chauffeur",
            "bio": "Over 10 years of professional driving experience, specializing in VIP and executive transport.",
            "image": "images/aishaife2.webp",
            "category": "drivers",
            "experience": "8+ years professional driving",
            "details": {
                "certifications": "Defensive Driving, First Aid",
                "languages": "English, Shona",
                "specialties": "VIP Transport, Executive Travel"
            }
        },
        {
            "id": 2,
            "name": "Lisa Dlamini",
            "role": "Bookings Manager",
            "bio": "Coordinates all client reservations and ensures every trip runs smoothly.",
            "image": "images/aishaife.webp",
            "category": "support",
            "experience": "5+ years in customer service",
            "details": {
                "certifications": "Customer Service Excellence",
                "languages": "English, Zulu",
                "specialties": "Reservation Management, Client Relations"
            }
        },
        {
            "id": 3,
            "name": "Brian Ncube",
            "role": "Tour Guide",
            "bio": "A Cape Town native with deep local knowledge — your perfect guide for scenic adventures.",
            "image": "images/aishaife3.webp",
            "category": "drivers",
            "experience": "8+ years in tourism",
            "details": {
                "certifications": "Tour Guide, Hospitality",
                "languages": "English, Xhosa",
                "specialties": "Scenic Tours, Historical Sites"
            }
        }
    ];
}