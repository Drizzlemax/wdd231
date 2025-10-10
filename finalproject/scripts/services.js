// Services page functionality with JSON data fetching
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesPage();
});

// Initialize the services page
function initializeServicesPage() {
    // Load services data from JSON
    fetchServicesData()
        .then(servicesData => {
            populateServices(servicesData);
            populatePricingTable(servicesData);
            setupEventListeners();
        })
        .catch(error => {
            console.error('Error loading services data:', error);
            // Fallback to static data if fetch fails
            const fallbackData = getFallbackServicesData();
            populateServices(fallbackData);
            populatePricingTable(fallbackData);
            setupEventListeners();
        });
}

// Fetch services data from JSON file
async function fetchServicesData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.services || [];
    } catch (error) {
        console.error('Failed to fetch services data:', error);
        throw error;
    }
}

// Setup event listeners for the page
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Modal functionality
    const modal = document.getElementById('service-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Handle filter button clicks
function handleFilterClick(event) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    const filter = event.target.getAttribute('data-filter');
    filterServices(filter);
}

// Populate services in the container
function populateServices(services) {
    const servicesContainer = document.getElementById('services-container');
    if (!servicesContainer) return;

    servicesContainer.innerHTML = ''; // Clear existing content

    services.forEach(service => {
        const serviceElement = createServiceElement(service);
        servicesContainer.appendChild(serviceElement);
    });
}

// Create HTML element for a service
function createServiceElement(service) {
    const serviceDiv = document.createElement('div');
    serviceDiv.className = `service-card-detailed ${service.category || 'general'}`;
    serviceDiv.setAttribute('data-category', service.category || 'general');
    
    const formattedPrice = formatPrice(service.price);
    const imageUrl = service.image || 'images/service-placeholder.jpg';
    
    serviceDiv.innerHTML = `
        <div class="service-image">
            <img src="${imageUrl}" alt="${service.title}" onerror="this.src='images/service-placeholder.jpg'">
        </div>
        <div class="service-info">
            <h3>${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-details">
                <div class="service-price">${formattedPrice}</div>
                <div class="service-duration">${service.duration || 'Flexible'}</div>
            </div>
            <div class="service-actions">
                <button class="service-btn primary" onclick="bookService(${service.id})">Book Now</button>
                <button class="service-btn secondary" onclick="showServiceDetails(${service.id})">Details</button>
            </div>
        </div>
    `;
    
    return serviceDiv;
}

// Populate pricing comparison table
function populatePricingTable(services) {
    const tableBody = document.getElementById('pricing-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Clear existing content

    services.forEach(service => {
        const tableRow = document.createElement('tr');
        
        tableRow.innerHTML = `
            <td>${service.title}</td>
            <td>${formatPrice(service.price)}</td>
            <td>${service.duration || 'Flexible'}</td>
            <td>${service.bestFor || 'General Use'}</td>
            <td>${service.vehicleType || 'Standard'}</td>
        `;
        
        tableBody.appendChild(tableRow);
    });
}

// Filter services by category
function filterServices(category) {
    const serviceCards = document.querySelectorAll('.service-card-detailed');
    
    serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Show service details in modal
async function showServiceDetails(serviceId) {
    try {
        const servicesData = await fetchServicesData();
        const service = servicesData.find(s => s.id === serviceId);
        
        if (!service) {
            console.error('Service not found:', serviceId);
            return;
        }
        
        displayServiceModal(service);
    } catch (error) {
        console.error('Error fetching service details:', error);
        // Try fallback data
        const fallbackData = getFallbackServicesData();
        const service = fallbackData.find(s => s.id === serviceId);
        if (service) {
            displayServiceModal(service);
        }
    }
}

// Display service modal with service details
function displayServiceModal(service) {
    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) return;

    const inclusionsList = createInclusionsList(service.inclusions);
    
    modalContent.innerHTML = `
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <div class="modal-service-details">
            <div class="modal-detail-item">
                <span class="modal-detail-label">Price:</span>
                <span class="modal-detail-value">${formatPrice(service.price)}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">Duration:</span>
                <span class="modal-detail-value">${service.duration || 'Flexible'}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">Best For:</span>
                <span class="modal-detail-value">${service.bestFor || 'General Use'}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">Vehicle Type:</span>
                <span class="modal-detail-value">${service.vehicleType || 'Standard'}</span>
            </div>
        </div>
        <div class="modal-service-inclusions">
            <h4>Service Inclusions:</h4>
            <ul>
                ${inclusionsList}
            </ul>
        </div>
        <button class="service-btn primary" style="width: 100%; margin-top: 1.5rem;" onclick="bookService(${service.id})">Book This Service</button>
    `;
    
    modal.style.display = 'block';
}

// Create inclusions list HTML
function createInclusionsList(inclusions) {
    if (!inclusions || !Array.isArray(inclusions)) {
        return '<li>Standard service inclusions</li>';
    }
    
    return inclusions.map(item => `<li>${item}</li>`).join('');
}

// Format price with R symbol
function formatPrice(price) {
    if (typeof price !== 'number') {
        return 'Price on request';
    }
    return `R ${price}`;
}

// Book service function
function bookService(serviceId) {
    // Store the selected service ID for the booking page
    sessionStorage.setItem('selectedService', serviceId);
    
    // Redirect to booking page
    window.location.href = `index.html#bookings`;
}

// Fallback data in case JSON fetch fails
function getFallbackServicesData() {
    return [
        {
            "id": 1,
            "title": "Airport Transfers",
            "description": "Reliable, luxury airport pickup and drop-off services to and from Cape Town International Airport.",
            "price": 850,
            "duration": "30–45 min",
            "image": "images/airport-transfer.jpg",
            "category": "airport",
            "bestFor": "Travelers, Business People",
            "vehicleType": "Sedan / SUV",
            "inclusions": ["Meet & Greet", "Flight Tracking", "Luggage Assistance"]
        },
        {
            "id": 2,
            "title": "Private Tours",
            "description": "Personalized scenic tours across Cape Town — from Table Mountain to the Winelands.",
            "price": 1800,
            "duration": "4–6 hours",
            "image": "images/private-tours.jpg",
            "category": "tours",
            "bestFor": "Tourists, Families",
            "vehicleType": "SUV / Luxury Van",
            "inclusions": ["Custom Itinerary", "Bottled Water", "Photo Stops"]
        },
        {
            "id": 3,
            "title": "Corporate Shuttles",
            "description": "Executive-level transport for meetings, conferences, and events — punctual and professional.",
            "price": 1200,
            "duration": "Per Trip",
            "image": "images/amiroadluxurytransports-10102025-000104.webp",
            "category": "corporate",
            "bestFor": "Executives, Business Events",
            "vehicleType": "Executive Sedan / SUV",
            "inclusions": ["WiFi", "Newspapers", "Bottled Water"]
        },
        {
            "id": 4,
            "title": "Hotel Transfers",
            "description": "Luxury transfers between hotels, guest houses, and lodges across Cape Town.",
            "price": 700,
            "duration": "15–30 min",
            "image": "images/capegracehotel-10102025-000106.webp",
            "category": "airport",
            "bestFor": "Hotel Guests, Tourists",
            "vehicleType": "Sedan / SUV",
            "inclusions": ["Hotel Coordination", "Luggage Handling"]
        },
        {
            "id": 5,
            "title": "Event Transport",
            "description": "Book reliable shuttles for weddings, parties, and special events — comfort and class guaranteed.",
            "price": 950,
            "duration": "Per Event",
            "image": "images/exclusive.auto.group-10102025-000332.webp",
            "category": "events",
            "bestFor": "Weddings, Parties, Special Events",
            "vehicleType": "Luxury Sedan / SUV / Van",
            "inclusions": ["Decoration (on request)", "Red Carpet Service"]
        }
    ];
}