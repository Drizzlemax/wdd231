// Team page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Team page loaded'); // Debug log
    
    // Load team data from JSON file
    fetchTeamData();
    
    // Tab filtering functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterTeamMembers(category);
        });
    });
    
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// Fetch team data from JSON file
function fetchTeamData() {
    // Try multiple possible paths for the JSON file
    const possiblePaths = [
        'data/services.json',
        '../data/services.json',
        './data/services.json',
        'services.json'
    ];
    
    let fetchAttempts = 0;
    
    function tryFetch(pathIndex) {
        if (pathIndex >= possiblePaths.length) {
            console.error('All fetch attempts failed');
            loadFallbackTeamData();
            return;
        }
        
        const path = possiblePaths[pathIndex];
        console.log(`Trying to fetch from: ${path}`);
        
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Team data loaded successfully from:', path);
                console.log('Team data:', data.team);
                populateTeamMembers(data.team);
            })
            .catch(error => {
                console.error(`Error fetching from ${path}:`, error);
                fetchAttempts++;
                tryFetch(fetchAttempts);
            });
    }
    
    tryFetch(0);
}

// Fallback team data if JSON fetch fails
function loadFallbackTeamData() {
    console.log('Loading fallback team data');
    
    const fallbackTeamData = [
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
        },
        {
            "id": 4,
            "name": "James Wilson",
            "role": "CEO & Founder",
            "bio": "James founded LinkCar Shuttles with a vision to redefine luxury transport in Cape Town. His extensive experience in the hospitality industry ensures we maintain the highest standards of service.",
            "image": "images/team/ceo.jpg",
            "category": "management",
            "experience": "15+ years in luxury transport",
            "details": {
                "certifications": "Tourism Grading Council, PRDP",
                "languages": "English, Afrikaans",
                "specialties": "Business Strategy, Hospitality Standards"
            }
        },
        {
            "id": 5,
            "name": "Sarah Johnson",
            "role": "Operations Manager",
            "bio": "Sarah ensures every journey runs smoothly, coordinating our fleet and managing schedules with precision. Her background in logistics guarantees efficient and reliable service.",
            "image": "images/team/operations.jpg",
            "category": "management",
            "experience": "10+ years in transport logistics",
            "details": {
                "certifications": "Advanced Transport Management",
                "languages": "English",
                "specialties": "Fleet Management, Route Planning"
            }
        }
    ];

    populateTeamMembers(fallbackTeamData);
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