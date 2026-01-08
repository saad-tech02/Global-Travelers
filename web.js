//take up button for home only
document.addEventListener('DOMContentLoaded', function() {

    
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    var revealElements = document.getElementsByClassName('scroll-reveal');

    function checkScrollReveal() {
        var viewportHeight = window.innerHeight;

        for (var i = 0; i < revealElements.length; i++) {
            var element = revealElements[i];
            var elementTop = element.getBoundingClientRect().top;
      
            if (elementTop < viewportHeight - 100) {
                element.classList.add('visible');
            }
        }
    }
    
    window.onscroll = function() {
        
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
        checkScrollReveal();
    };
    scrollToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };
    
    checkScrollReveal();

});
//contac us
function validateForm() {
 const name = document.getElementById("name").value.trim();
 const email = document.getElementById("email").value.trim();
 const subject = document.getElementById("subject").value.trim();
 const message = document.getElementById("message").value.trim();

 if (!name || !email || !subject || !message) {
 alert("All fields must be filled out.");
return false;
 }

if (!email.includes("@")) {
     alert("Email must contain '@'.");
 return false;
 }
 if (message.length < 20) {
 alert("Message must be at least 20 characters.");
 return false;
 }
 alert("Message sent successfully!");
 return true; 
}
// booking page
// --- 1. TOUR & HOTEL DATA ---
const travelData = {
    "China": { fee: 80, hotels: [{ name: "Beijing Grand Hotel", price: 180 }, { name: "Hilton Garden Inn", price: 150 }, { name: "Sunworld Dynasty Hotel", price: 210 }] },
    "Turkey": { fee: 45, hotels: [{ name: "Grand Istanbul Hotel", price: 160 }, { name: "Cappadocia Cave Suites", price: 230 }, { name: "Antalya Beach Resort", price: 190 }] },
    "United Kingdom": { fee: 65, hotels: [{ name: "Leonardo Hotel", price: 250 }, { name: "Fabulous Hotel", price: 280 }, { name: "The Ritz London", price: 450 }] },
    "France": { fee: 75, hotels: [{ name: "Tom's Top Ten Hotel", price: 190 }, { name: "Prince de Galles", price: 320 }, { name: "Hotel de Paris", price: 260 }] },
    "Italy": { fee: 55, hotels: [{ name: "Hotel Daniell", price: 270 }, { name: "Hasseler Roma", price: 300 }, { name: "Armani Hotel Milano", price: 380 }] },
    "Thailand": { fee: 40, hotels: [{ name: "Mandarin Oriental Bangkok", price: 220 }, { name: "The Siam Hotel (Bangkok)", price: 290 }, { name: "Amanpuri Resort (Phuket)", price: 400 }] },
    "Dubai": { fee: 90, hotels: [{ name: "Burj Al Arab Jumeirah", price: 600 }, { name: "The Oberoi Dubai", price: 350 }, { name: "Fairmont Dubai", price: 300 }] },
    "Austria": { fee: 50, hotels: [{ name: "Park Hyatt Vienna", price: 280 }, { name: "Hotel Sacher Wien", price: 310 }, { name: "Palais Coburg Hotel Residenz", price: 360 }] }
};

// Popular Destinations tour prices (default rate per night per traveler)
const tourPrices = {
    "China": 600,
    "Turkey": 800,
    "United Kingdom": 1200,
    "France": 850,
    "Italy": 1000,
    "Thailand": 900,
    "Dubai": 1100,
    "Austria": 700
};

// --- 2. DOM REFERENCES ---
const countrySelect = document.getElementById('country');
const travelersInput = document.getElementById('travelers');
const nightsInput = document.getElementById('nights');
const priceDisplay = document.getElementById('price-display');
const feeDisplay = document.getElementById('fee-display');
const hotelBlocksContainer = document.getElementById('hotel-blocks-container');
const descriptionText = document.getElementById('country-description-text');
const selectedPriceInput = document.getElementById('selected-hotel-price');
const reportDetails = document.getElementById('booking-report-details');
const reportSection = document.getElementById('final-report-section');
const formSection = document.getElementById('form-section');
const hotelsPriceSection = document.getElementById('hotels-and-price-section');
const paymentAmountDisplay = document.getElementById('payment-amount-display');
const paymentStatus = document.getElementById('payment-status');
const paymentForm = document.getElementById('payment-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// --- 3. TRACK CURRENT SELECTION ---
let currentCountryFee = 0;
let currentHotelPrice = 0; // Price per night per traveler
let selectedHotelName = "";
let grandTotalAmount = 0;

// --- 4. POPULATE COUNTRIES ---
function populateCountries() {
    Object.keys(travelData).forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// --- 5. DISPLAY COUNTRY DETAILS & HOTELS ---
function displayCountryDetails(selectedCountry) {
    if (!selectedCountry || !travelData[selectedCountry]) {
        hotelBlocksContainer.innerHTML = '<p style="text-align:center;color:#666;width:100%;">Select a country to view available hotels.</p>';
        descriptionText.textContent = '';
        currentCountryFee = 0;
        currentHotelPrice = 0;
        selectedHotelName = '';
        selectedPriceInput.value = 0;
        calculatePrice();
        return;
    }

    const data = travelData[selectedCountry];
    currentCountryFee = data.fee;
    descriptionText.textContent = `Country Info: Mandatory Fee per traveler $${data.fee.toFixed(2)}`;
    renderHotelBlocks(selectedCountry);
    calculatePrice();
}

// --- 6. RENDER HOTEL BLOCKS ---
function renderHotelBlocks(selectedCountry) {

    hotelBlocksContainer.innerHTML = ""; // 🟢 Purane hotels clear ho jayenge

    travelData[selectedCountry].hotels.forEach(hotel => {
        const block = document.createElement('div');
        block.className = 'hotel-block';
        block.innerHTML = `
            <h3>${hotel.name}</h3>
            <p><strong>$${hotel.price.toFixed(2)}</strong> / night / traveler</p>
            <button class="select-btn">Select Hotel</button>
            <button class="remove-hotel-selection-btn" style="margin-top:5px;display:none;">Remove Selection</button>
        `;

        const selectBtn = block.querySelector('.select-btn');
        const deselectBtn = block.querySelector('.remove-hotel-selection-btn'); 

        selectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.hotel-block').forEach(b => {
                b.classList.remove('selected');
                b.querySelector('.remove-hotel-selection-btn').style.display = 'none';
            });
            block.classList.add('selected');
            deselectBtn.style.display = 'block';
            currentHotelPrice = hotel.price;
            selectedHotelName = hotel.name;
            selectedPriceInput.value = hotel.price;
            calculatePrice();
        });

        deselectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            block.classList.remove('selected');
            deselectBtn.style.display = 'none';
            currentHotelPrice = 0;
            selectedHotelName = '';
            selectedPriceInput.value = 0;
            calculatePrice();
        });

        hotelBlocksContainer.appendChild(block);
    });
}


// --- 7. CALCULATE PRICE
function calculatePrice() {
    const numTravelers = parseInt(travelersInput.value) || 1;
    const numNights = parseInt(nightsInput.value) || 1;
    const selectedCountry = countrySelect.value;
    
    // 1. Calculate Hotel Cost: Only if a specific hotel is selected
    // currentHotelPrice is the price per night per traveler.
    let totalHotelCost = 0;
    if (currentHotelPrice > 0) {
        totalHotelCost = currentHotelPrice * numTravelers * numNights;
    } 
    
    // 2. Calculate Default Tour Cost: This is a ONE-TIME FIXED COST per traveler.
    let defaultTourCost = 0;
    if (currentHotelPrice === 0) {
        // If NO specific hotel is selected, the tour price acts as the default package price.
        defaultTourCost = (tourPrices[selectedCountry] || 0) * numTravelers;
    }
    
    // 3. Calculate Total Country Fee: Mandatory Fee per traveler * Travelers (always applied)
    const totalCountryFee = currentCountryFee * numTravelers;
    
    // Grand Total is the sum of all components
    grandTotalAmount = totalHotelCost + defaultTourCost + totalCountryFee;

    // --- Update DOM ---
    
    // Update the main price display
    priceDisplay.innerHTML = `
        Total Estimated Price: <br>
        <strong>$${grandTotalAmount.toFixed(2)}</strong>
    `;
    
    // Update the mandatory fee display
    feeDisplay.innerHTML = `
        Mandatory Fee: <br>
        <strong>$${totalCountryFee.toFixed(2)}</strong>
    `;
    
    paymentAmountDisplay.textContent = `$${grandTotalAmount.toFixed(2)}`;
}
// --- 8. GO TO PAYMENT (FIXED: Improved report clarity) ---
function goToPayment() {
    const selectedCountry = countrySelect.value;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const date = document.getElementById('travel-date').value;
    const travelers = parseInt(travelersInput.value) || 1;
    const nights = parseInt(nightsInput.value) || 1;

    if (!name || !email || !selectedCountry || !date || travelers < 1 || nights < 1) {
        alert('❌ Please complete all mandatory fields (Name, Email, Country, Date, Travelers, Nights).');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('❌ Please enter a valid email address.');
        return;
    }

    calculatePrice(); // Final calculation refresh

    // Determine values for the final report
    const rateUsed = currentHotelPrice || tourPrices[selectedCountry] || 0;
    const hotelTourCost = rateUsed * travelers * nights;
    const totalCountryFee = currentCountryFee * travelers;
    
    let accommodationName = selectedHotelName;
    if (!accommodationName) {
         accommodationName = `${selectedCountry} (Default Tour Rate)`;
    }

    reportDetails.innerHTML = `
        <h3>Booking Summary</h3>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Destination:</strong> ${selectedCountry}</p>
        <p><strong>Travel Date:</strong> ${date}</p>
        <p><strong>Nights:</strong> ${nights}</p>
        <p><strong>Travelers:</strong> ${travelers}</p>
        <hr>
        <p><strong>Selected Accommodation/Tour:</strong> ${accommodationName}</p>
        <p><strong>Rate Used:</strong> $${rateUsed.toFixed(2)} / night / traveler</p>
        <p><strong>Total Accommodation/Tour Cost:</strong> $${hotelTourCost.toFixed(2)}</p>
        <p><strong>Total Mandatory Fee:</strong> $${totalCountryFee.toFixed(2)}</p>
        <hr>
        <p style="font-size: 1.2em;"><strong>Total Payable:</strong> <span style="color:green;">$${grandTotalAmount.toFixed(2)}</span></p>
    `;

    paymentAmountDisplay.textContent = `$${grandTotalAmount.toFixed(2)}`;
    formSection.style.display = 'none';
    hotelsPriceSection.style.display = 'none';
    reportSection.style.display = 'block';
}

// --- 9. PROCESS PAYMENT ---
function processPayment(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber.length !== 16 || expiryDate.length !== 5 || cvv.length !== 3) {
        paymentStatus.style.backgroundColor = '#ffe0e0';
        paymentStatus.style.color = '#cc0000';
        paymentStatus.textContent = '❌ Payment Failed: Please check card number (16 digits), expiry (MM/YY), and CVV (3 digits).';
        paymentStatus.style.display = 'block';
        return;
    }

    // Simulate successful payment
    paymentStatus.style.backgroundColor = '#e0ffe0';
    paymentStatus.style.color = '#008000';
    paymentStatus.textContent = `✅ Payment of $${grandTotalAmount.toFixed(2)} Successful! Booking confirmed.`;
    paymentStatus.style.display = 'block';
    paymentForm.querySelector('.booktrip-btn').disabled = true;
    
    // Disable inputs after successful payment
    Array.from(paymentForm.elements).forEach(element => {
        if (element.type !== 'button') {
            element.disabled = true;
        }
    });
}

// --- 10. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    populateCountries();
    // Attach event listeners to update price dynamically
    countrySelect.addEventListener('change', () => displayCountryDetails(countrySelect.value));
    nightsInput.addEventListener('input', calculatePrice); // Use 'input' for better responsiveness
    travelersInput.addEventListener('input', calculatePrice); // Use 'input' for better responsiveness
    
    // Set default calculation on load
    calculatePrice(); 
});