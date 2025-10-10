// Responsive Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// js/index.js
import { loadData } from './data-fetch.js';

// Initialize page after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadData();
});


// Fetch API Data Example
const serviceGrid = document.getElementById('service-grid');
async function loadServices() {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) throw new Error('Network error');
    const services = await response.json();

    services.slice(0, 15).forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <p><strong>Price:</strong> ${service.price}</p>
        <p><strong>Duration:</strong> ${service.duration}</p>
      `;
      serviceGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching services:', error);
  }
}
loadServices();

// Modal Handling
const form = document.getElementById('booking-form');
const modal = document.getElementById('confirmation-modal');
const closeModal = document.getElementById('close-modal');

form.addEventListener('submit', e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  localStorage.setItem('lastBooking', new Date().toISOString());
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});
