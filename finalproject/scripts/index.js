// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

function initializeGallery() {
    const galleryData = getGalleryData();
    populateGallery(galleryData);
    setupGalleryFilters();
    setupLoadMore();
}

function getGalleryData() {
    return [
        {
            id: 1,
            image: "images/mec.mercedesbenz-14102025-0001076.webp",
            title: "Mercedes S-Class",
            description: "Executive luxury sedan for business travel",
            category: "vehicles"
        },
        {
            id: 2,
            image: "images/srs_swissrichstreets-14102025-0001054.webp",
            title: "BMW 7 Series",
            description: "Premium comfort for long journeys",
            category: "vehicles"
        },
        {
            id: 3,
            image: "images/hike_table_mountain-05102025-00018.webp",
            title: "Table Mountain Tour",
            description: "Guided tours to iconic Table Mountain",
            category: "tours"
        },
        {
            id: 4,
            image: "images/delairegraff-14102025-000103.webp",
            title: "Cape Winelands",
            description: "Luxury wine tasting experiences",
            category: "tours"
        },
        {
            id: 5,
            image: "images/kelsonik-14102025-0001065.webp",
            title: "Wedding Transport",
            description: "Making special days unforgettable",
            category: "events"
        },
        {
            id: 6,
            image: "images/fttransfer_-14102025-000111.webp",
            title: "Corporate Events",
            description: "Professional transport for business",
            category: "events"
        },
        {
            id: 7,
            image: "images/signaturefbo-14102025-0001087.webp",
            title: "Airport Arrival",
            description: "Meet and greet service",
            category: "airport"
        },
        {
            id: 8,
            image: "images/elite_transp0rtation-12102025-00011.webp",
            title: "Airport Departure",
            description: "Timely departures guaranteed",
            category: "airport"
        },
        {
            id: 9,
            image: "images/exclusive.auto.group-10102025-000134.webp",
            title: "Luxury Van",
            description: "Group travel in comfort",
            category: "vehicles"
        },
        {
            id: 10,
            image: "images/gabrielahereandthere-14102025-000108.webp",
            title: "Cape Peninsula",
            description: "Scenic coastal drives",
            category: "tours"
        }
    ];
}

function populateGallery(galleryItems) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = '';

    galleryItems.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });
}

function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = `gallery-item ${item.category}`;
    galleryItem.setAttribute('data-category', item.category);

    galleryItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" onerror="this.src='images/gallery/placeholder.jpg'">
        <div class="gallery-overlay">
            <span class="gallery-category">${getCategoryLabel(item.category)}</span>
            <h4 class="gallery-title">${item.title}</h4>
            <p class="gallery-description">${item.description}</p>
        </div>
    `;

    return galleryItem;
}

function getCategoryLabel(category) {
    const labels = {
        'vehicles': 'Our Fleet',
        'tours': 'Tours',
        'events': 'Events',
        'airport': 'Airport'
    };
    return labels[category] || 'Gallery';
}

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterGalleryItems(filter);
        });
    });
}

function filterGalleryItems(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;

    let currentItems = 8; // Show first 8 items initially
    
    loadMoreBtn.addEventListener('click', function() {
        const allItems = document.querySelectorAll('.gallery-item');
        const itemsToShow = Math.min(currentItems + 4, allItems.length);
        
        for (let i = currentItems; i < itemsToShow; i++) {
            if (allItems[i]) {
                allItems[i].style.display = 'block';
            }
        }
        
        currentItems = itemsToShow;
        
        // Hide load more button if all items are shown
        if (currentItems >= allItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}