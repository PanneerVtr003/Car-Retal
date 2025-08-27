// Global variables
const API_BASE_URL = 'http://localhost:3000/api';
let currentUser = null;
let cars = [];
let filteredCars = [];

// Sample car data (in a real app, this would come from the backend)
const sampleCars = [
    {
        id: 1,
        name: 'Toyota Camry',
        category: 'midsize',
        price: 45,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        features: ['Automatic', 'AC', 'GPS', '5 Seats'],
        specs: {
            'Engine': '2.5L 4-Cylinder',
            'Transmission': 'Automatic',
            'Fuel Type': 'Gasoline',
            'Seats': '5',
            'Doors': '4',
            'Air Conditioning': 'Yes',
            'GPS Navigation': 'Yes'
        },
        available: true
    },
    {
        id: 2,
        name: 'Honda Civic',
        category: 'compact',
        price: 35,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        features: ['Automatic', 'AC', 'GPS', '5 Seats'],
        specs: {
            'Engine': '2.0L 4-Cylinder',
            'Transmission': 'Automatic',
            'Fuel Type': 'Gasoline',
            'Seats': '5',
            'Doors': '4',
            'Air Conditioning': 'Yes',
            'GPS Navigation': 'Yes'
        },
        available: true
    },
    {
        id: 3,
        name: 'BMW X5',
        category: 'luxury',
        price: 120,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        features: ['Automatic', 'AC', 'GPS', '7 Seats', 'Leather'],
        specs: {
            'Engine': '3.0L 6-Cylinder Turbo',
            'Transmission': 'Automatic',
            'Fuel Type': 'Gasoline',
            'Seats': '7',
            'Doors': '5',
            'Air Conditioning': 'Yes',
            'GPS Navigation': 'Yes',
            'Leather Seats': 'Yes'
        },
        available: true
    },
    {
        id: 4,
        name: 'Ford Explorer',
        category: 'suv',
        price: 75,
        image: 'data:image/jpeg;base64,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',
        features: ['Automatic', 'AC', 'GPS', '7 Seats', '4WD'],
        specs: {
            'Engine': '3.5L V6',
            'Transmission': 'Automatic',
            'Fuel Type': 'Gasoline',
            'Seats': '7',
            'Doors': '5',
            'Air Conditioning': 'Yes',
            'GPS Navigation': 'Yes',
            '4WD': 'Yes'
        },
        available: true
    },
    {
        id: 5,
        name: 'Nissan Versa',
        category: 'economy',
        price: 30,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        features: ['Automatic', 'AC', '5 Seats'],
        specs: {
            'Engine': '1.6L 4-Cylinder',
            'Transmission': 'Automatic',
            'Fuel Type': 'Gasoline',
            'Seats': '5',
            'Doors': '4',
            'Air Conditioning': 'Yes'
        },
        available: true
    },
    {
        id: 6,
        name: 'Mercedes-Benz C-Class',
        category: 'luxury',
        price: 95,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        features: ['Automatic', 'AC', 'GPS', '5 Seats', 'Leather', 'Premium Audio'],
        specs: {
            'Engine': '2.0L 4-Cylinder Turbo',
            'Transmission': 'Automatic',
            'Fuel Type': 'Gasoline',
            'Seats': '5',
            'Doors': '4',
            'Air Conditioning': 'Yes',
            'GPS Navigation': 'Yes',
            'Leather Seats': 'Yes',
            'Premium Audio': 'Yes'
        },
        available: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load cars data
    cars = [...sampleCars];
    filteredCars = [...cars];
    
    // Check for existing user session
    checkUserSession();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    initializePage(currentPage);
});

// Get current page
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    if (!filename || filename === 'index.html') return 'home';
    if (filename === 'cars.html') return 'cars';
    if (filename === 'car.html') return 'car-details';
    if (filename === 'booking.html') return 'booking';
    if (filename === 'login.html') return 'login';
    if (filename === 'register.html') return 'register';
    
    return 'home';
}

// Initialize page-specific functionality
function initializePage(page) {
    switch (page) {
        case 'home':
            initializeHomePage();
            break;
        case 'cars':
            initializeCarsPage();
            break;
        case 'car-details':
            initializeCarDetailsPage();
            break;
        case 'booking':
            initializeBookingPage();
            break;
        case 'login':
            initializeLoginPage();
            break;
        case 'register':
            initializeRegisterPage();
            break;
    }
}

// Home page initialization
function initializeHomePage() {
    loadPopularCars();
}

function loadPopularCars() {
    const container = document.getElementById('popular-cars');
    if (!container) return;
    
    // Show first 3 cars as popular
    const popularCars = cars.slice(0, 3);
    
    container.innerHTML = popularCars.map(car => `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-category">${capitalizeFirst(car.category)}</div>
                <div class="car-features">
                    ${car.features.map(feature => `<span class="feature-badge">${feature}</span>`).join('')}
                </div>
                <div class="car-price">$${car.price}/day</div>
                <a href="car.html?id=${car.id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Cars page initialization
function initializeCarsPage() {
    setupFilters();
    displayCars(filteredCars);
    hideLoading();
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const resetButton = document.getElementById('reset-filters');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }

    if (priceFilter) {
        priceFilter.addEventListener('input', function() {
            priceValue.textContent = `${this.value}`;
            applyFilters();
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const maxPrice = priceFilter ? parseInt(priceFilter.value) : 200;
    
    filteredCars = cars.filter(car => {
        const categoryMatch = !selectedCategory || car.category === selectedCategory;
        const priceMatch = car.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    
    displayCars(filteredCars);
}

function resetFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    
    if (categoryFilter) categoryFilter.value = '';
    if (priceFilter) {
        priceFilter.value = 200;
        priceValue.textContent = '$200';
    }
    
    filteredCars = [...cars];
    displayCars(filteredCars);
}

function displayCars(carsToShow) {
    const container = document.getElementById('cars-grid');
    const noCarsMessage = document.getElementById('no-cars');
    
    if (!container) return;
    
    if (carsToShow.length === 0) {
        container.innerHTML = '';
        if (noCarsMessage) noCarsMessage.style.display = 'block';
        return;
    }
    
    if (noCarsMessage) noCarsMessage.style.display = 'none';
    
    container.innerHTML = carsToShow.map(car => `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-category">${capitalizeFirst(car.category)}</div>
                <div class="car-features">
                    ${car.features.map(feature => `<span class="feature-badge">${feature}</span>`).join('')}
                </div>
                <div class="car-price">${car.price}/day</div>
                <a href="car.html?id=${car.id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Car details page initialization
function initializeCarDetailsPage() {
    const carId = getUrlParameter('id');
    if (carId) {
        loadCarDetails(carId);
    } else {
        showCarNotFound();
    }
}

function loadCarDetails(carId) {
    const car = cars.find(c => c.id == carId);
    
    if (!car) {
        showCarNotFound();
        return;
    }
    
    const container = document.getElementById('car-details-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="car-hero">
            <div class="car-images">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-details-info">
                <h1>${car.name}</h1>
                <div class="car-category">${capitalizeFirst(car.category)}</div>
                <div class="car-features">
                    ${car.features.map(feature => `<span class="feature-badge">${feature}</span>`).join('')}
                </div>
                <div class="car-specs">
                    ${Object.entries(car.specs).map(([key, value]) => `
                        <div class="spec-item">
                            <span class="spec-label">${key}:</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="pricing-section">
            <div class="price-display">${car.price}/day</div>
            <div class="book-section">
                <div>
                    <p>Available for immediate booking</p>
                    <p>Free cancellation up to 24 hours before pickup</p>
                </div>
                <a href="booking.html?car=${car.id}" class="btn btn-success btn-primary">Book Now</a>
            </div>
        </div>
    `;
    
    hideLoading();
}

function showCarNotFound() {
    hideLoading();
    const notFoundElement = document.getElementById('car-not-found');
    if (notFoundElement) {
        notFoundElement.style.display = 'block';
    }
}

// Booking page initialization
function initializeBookingPage() {
    const carId = getUrlParameter('car');
    if (carId) {
        loadBookingPage(carId);
        setupBookingForm();
    } else {
        window.location.href = 'cars.html';
    }
}

function loadBookingPage(carId) {
    const car = cars.find(c => c.id == carId);
    if (!car) {
        window.location.href = 'cars.html';
        return;
    }
    
    // Load car summary
    const summaryContainer = document.getElementById('car-summary');
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <div class="car-category">${capitalizeFirst(car.category)}</div>
            <div class="car-features">
                ${car.features.map(feature => `<span class="feature-badge">${feature}</span>`).join('')}
            </div>
            <div class="price">${car.price}/day</div>
        `;
    }
    
    // Store car data for booking calculations
    window.selectedCar = car;
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    if (pickupDate) {
        pickupDate.min = today;
        pickupDate.addEventListener('change', updateBookingSummary);
    }
    if (returnDate) {
        returnDate.min = today;
        returnDate.addEventListener('change', updateBookingSummary);
    }
}

function setupBookingForm() {
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', handleBookingSubmit);
    }
}

function updateBookingSummary() {
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    if (!pickupDate || !returnDate || !window.selectedCar) return;
    
    const pickup = new Date(pickupDate.value);
    const returnD = new Date(returnDate.value);
    
    if (pickup && returnD && returnD > pickup) {
        const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
        const dailyRate = window.selectedCar.price;
        const subtotal = days * dailyRate;
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        document.getElementById('rental-days').textContent = days;
        document.getElementById('daily-rate').textContent = `${dailyRate}`;
        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `${total.toFixed(2)}`;
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        carId: window.selectedCar.id,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        pickupDate: formData.get('pickupDate'),
        returnDate: formData.get('returnDate'),
        pickupTime: formData.get('pickupTime'),
        returnTime: formData.get('returnTime'),
        licenseNumber: formData.get('licenseNumber'),
        age: formData.get('age'),
        specialRequests: formData.get('specialRequests')
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showSuccessMessage('Booking confirmed! Check your email for confirmation details.');
            // Redirect after success
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            throw new Error('Booking failed');
        }
    } catch (error) {
        console.error('Booking error:', error);
        showErrorMessage('Failed to complete booking. Please try again.');
    }
}

// Login page initialization
function initializeLoginPage() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        if (response.ok) {
            const result = await response.json();
            // Store user data
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', result.token);
            currentUser = result.user;
            
            showSuccessMessage('Login successful!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        showErrorMessage('Invalid email or password. Please try again.');
    }
}

// Register page initialization
function initializeRegisterPage() {
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', handleRegister);
    }
    
    // Password confirmation validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (this.value !== password.value) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Validate password match
    if (formData.get('password') !== formData.get('confirmPassword')) {
        showErrorMessage('Passwords do not match');
        return;
    }
    
    const registerData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        dateOfBirth: formData.get('dateOfBirth'),
        licenseNumber: formData.get('licenseNumber'),
        newsletter: formData.get('newsletter') === 'on'
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showSuccessMessage('Registration successful! Please log in to continue.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showErrorMessage(error.message || 'Registration failed. Please try again.');
    }
}

// Utility functions
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

function showSuccessMessage(message) {
    // Remove existing messages
    removeExistingMessages();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    
    // Insert at the top of the main content
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(messageDiv, main.firstChild);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function showErrorMessage(message) {
    // Remove existing messages
    removeExistingMessages();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-alert';
    messageDiv.textContent = message;
    
    // Insert at the top of the main content
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(messageDiv, main.firstChild);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.success-message, .error-alert');
    existingMessages.forEach(msg => msg.remove());
}

function checkUserSession() {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
        currentUser = JSON.parse(userData);
        // Update navigation if user is logged in
        updateNavigation();
    }
}

function updateNavigation() {
    if (currentUser) {
        // Update navigation to show user info and logout option
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const loginLink = navMenu.querySelector('a[href="login.html"]');
            const registerLink = navMenu.querySelector('a[href="register.html"]');
            
            if (loginLink && registerLink) {
                loginLink.textContent = `Hi, ${currentUser.firstName}`;
                loginLink.href = '#';
                registerLink.textContent = 'Logout';
                registerLink.href = '#';
                registerLink.addEventListener('click', logout);
            }
        }
    }
}

function logout(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    currentUser = null;
    window.location.href = 'index.html';
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation to buttons on click
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                this.textContent = 'Loading...';
                this.disabled = true;
            }
        });
    });
});