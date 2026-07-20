/* ==========================================================================
   Etsy Seller Stationer - Luxury Wedding Suite Customizer JS Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Input elements
  const inputBrideName = document.getElementById('input-bride-name');
  const inputGroomName = document.getElementById('input-groom-name');
  const inputWeddingDate = document.getElementById('input-wedding-date');
  const inputWeddingYearWords = document.getElementById('input-wedding-year-words');
  const inputWeddingTime = document.getElementById('input-wedding-time');
  const inputVenueName = document.getElementById('input-venue-name');
  const inputVenueAddress = document.getElementById('input-venue-address');
  const inputReceptionText = document.getElementById('input-reception-text');
  
  const inputStdDate = document.getElementById('input-std-date');

  
  const inputRsvpDeadline = document.getElementById('input-rsvp-deadline');
  const inputRsvpQrUrl = document.getElementById('input-rsvp-qr-url');
  
  const inputDetailsHotel = document.getElementById('input-details-hotel');
  const inputDetailsTravel = document.getElementById('input-details-travel');
  const inputDetailsDress = document.getElementById('input-details-dress');
  const inputDetailsWebsite = document.getElementById('input-details-website');
  
  const inputThanksMessage = document.getElementById('input-thanks-message');
  
  const inputMonogramFirst = document.getElementById('input-monogram-first');
  const inputMonogramSecond = document.getElementById('input-monogram-second');
  const inputYear = document.getElementById('input-year');

  // Theme buttons
  const themeBtns = document.querySelectorAll('.theme-btn');

  // QR Code Image Element
  const rsvpQrCodeImg = document.getElementById('rsvp-qr-code');

  /* --------------------------------------------------------------------------
     1. Monogram Crest Generator (Scalable Vectors)
     -------------------------------------------------------------------------- */
  function generateCrestSVG(initial1, initial2, isLarge = false) {
    const size = isLarge ? 160 : 70;
    const font1Size = isLarge ? 40 : 18;
    const font2Size = isLarge ? 30 : 13;
    const y1 = isLarge ? 72 : 33;
    const y2 = isLarge ? 104 : 48;
    const lineWidth = isLarge ? 1 : 0.5;
    const strokeWidth1 = isLarge ? 1.2 : 0.6;
    const strokeWidth2 = isLarge ? 3 : 1.5;

    return `
      <svg class="crest-svg" viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" stroke="currentColor">
        <!-- Outer double ring with dashed detailing -->
        <circle cx="50" cy="50" r="44" stroke-width="${strokeWidth1}" />
        <circle cx="50" cy="50" r="41" stroke-width="${strokeWidth2}" stroke-dasharray="2 1.5" />
        
        <!-- Intricate Laurel Leaves Branches Left -->
        <path d="M 23,50 C 23,34 33,21 47,19" stroke-width="${strokeWidth1}" />
        <path d="M 23,50 C 23,66 33,79 47,81" stroke-width="${strokeWidth1}" />
        
        <!-- Intricate Laurel Leaves Branches Right -->
        <path d="M 77,50 C 77,34 67,21 53,19" stroke-width="${strokeWidth1}" />
        <path d="M 77,50 C 77,66 67,79 53,81" stroke-width="${strokeWidth1}" />
        
        <!-- Laurel Leaf Accents Left -->
        <path d="M 24,44 C 21,42 19,44 21,47 Z" fill="currentColor" stroke="none" />
        <path d="M 27,33 C 24,31 22,34 24,37 Z" fill="currentColor" stroke="none" />
        <path d="M 33,24 C 30,22 29,25 31,28 Z" fill="currentColor" stroke="none" />
        <path d="M 42,18 C 40,16 38,19 40,22 Z" fill="currentColor" stroke="none" />
        
        <!-- Laurel Leaf Accents Right -->
        <path d="M 76,44 C 79,42 81,44 79,47 Z" fill="currentColor" stroke="none" />
        <path d="M 73,33 C 76,31 78,34 76,37 Z" fill="currentColor" stroke="none" />
        <path d="M 67,24 C 70,22 71,25 69,28 Z" fill="currentColor" stroke="none" />
        <path d="M 58,18 C 60,16 62,19 60,22 Z" fill="currentColor" stroke="none" />
        
        <!-- Bottom Classic Ornament Ribbon -->
        <path d="M 32,83 C 44,87 56,87 68,83" stroke-width="${strokeWidth1 * 1.5}" />
        <circle cx="50" cy="85" r="2.5" fill="currentColor" stroke="none" />

        <!-- Custom Monogram initials inside the Crest -->
        <text x="50" y="47" font-family="'Playfair Display', serif" font-size="24" font-style="italic" font-weight="400" text-anchor="middle" stroke="none" fill="currentColor">${initial1}</text>
        <text x="50" y="66" font-family="'Playfair Display', serif" font-size="16" font-weight="300" text-anchor="middle" stroke="none" fill="currentColor">${initial2}</text>
        <line x1="36" y1="52" x2="64" y2="52" stroke-width="${lineWidth}" />
      </svg>
    `;
  }

  // Inject Crests
  function updateCrests() {
    const init1 = inputMonogramFirst.value || ' ';
    const init2 = inputMonogramSecond.value || ' ';
    
    // Select all mini crest containers on cards
    const crestContainers = document.querySelectorAll('.crest-container');
    crestContainers.forEach(container => {
      container.innerHTML = generateCrestSVG(init1, init2, false);
    });

    // Select the large display container
    const largeCrestContainer = document.querySelector('.crest-large-display');
    if (largeCrestContainer) {
      largeCrestContainer.innerHTML = generateCrestSVG(init1, init2, true);
    }
  }

  /* --------------------------------------------------------------------------
     2. QR Code Generator Binding
     -------------------------------------------------------------------------- */
  function updateQRCode() {
    const url = encodeURIComponent(inputRsvpQrUrl.value || 'https://helene-and-william.wedding');
    const activeBtn = document.querySelector('.theme-btn.active');
    const activeTheme = activeBtn ? activeBtn.dataset.theme : 'cream';
    
    let color = '4a0e17';
    let bgcolor = 'fdfbf7';
    
    if (activeTheme === 'emerald') {
      color = 'd4af37';
      bgcolor = '0f2a1d';
    } else if (activeTheme === 'sage') {
      color = 'e5c483';
      bgcolor = '2a3a2c';
    } else if (activeTheme === 'plum') {
      color = 'e6c594';
      bgcolor = '2d1225';
    }
    
    rsvpQrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&color=${color}&bgcolor=${bgcolor}`;
  }
  /* --------------------------------------------------------------------------
     3. Bind Input Fields to Preview Elements
     -------------------------------------------------------------------------- */
  function getFirstName(fullName) {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    // Return first name and capitalize nicely
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  }

  function syncTextBindings() {
    // Standard elements
    document.querySelectorAll('.bind-bride-name').forEach(el => el.innerText = inputBrideName.value);
    document.querySelectorAll('.bind-groom-name').forEach(el => el.innerText = inputGroomName.value);
    document.querySelectorAll('.bind-wedding-date').forEach(el => el.innerText = inputWeddingDate.value);
    document.querySelectorAll('.bind-wedding-year-words').forEach(el => el.innerText = inputWeddingYearWords.value);
    document.querySelectorAll('.bind-wedding-time').forEach(el => el.innerText = inputWeddingTime.value);
    document.querySelectorAll('.bind-venue-name').forEach(el => el.innerText = inputVenueName.value);
    document.querySelectorAll('.bind-venue-address').forEach(el => el.innerText = inputVenueAddress.value);
    document.querySelectorAll('.bind-reception-text').forEach(el => el.innerText = inputReceptionText.value);

    // Save the Date specific
    document.querySelectorAll('.bind-std-date').forEach(el => el.innerText = inputStdDate.value);

    // RSVP specific
    document.querySelectorAll('.bind-rsvp-deadline').forEach(el => el.innerText = inputRsvpDeadline.value);
    document.querySelectorAll('.bind-rsvp-qr-url').forEach(el => el.innerText = inputRsvpQrUrl.value);

    // Details specific
    document.querySelectorAll('.bind-details-hotel').forEach(el => el.innerText = inputDetailsHotel.value);
    document.querySelectorAll('.bind-details-travel').forEach(el => el.innerText = inputDetailsTravel.value);
    document.querySelectorAll('.bind-details-dress').forEach(el => el.innerText = inputDetailsDress.value);
    document.querySelectorAll('.bind-details-website').forEach(el => el.innerText = inputDetailsWebsite.value);

    // Thank you specific
    document.querySelectorAll('.bind-thanks-message').forEach(el => el.innerText = inputThanksMessage.value);

    // Monogram settings
    document.querySelectorAll('.bind-year').forEach(el => el.innerText = inputYear.value);

    // First names for mobile / minimalist views
    const brideFirst = getFirstName(inputBrideName.value);
    const groomFirst = getFirstName(inputGroomName.value);
    document.querySelectorAll('.bind-bride-first').forEach(el => el.innerText = brideFirst.toUpperCase());
    document.querySelectorAll('.bind-groom-first').forEach(el => el.innerText = groomFirst.toUpperCase());
  }

  // Add listeners to all text inputs
  const inputs = document.querySelectorAll('.text-input, .text-area-input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      syncTextBindings();
      if (input.id === 'input-monogram-first' || input.id === 'input-monogram-second') {
        updateCrests();
      }
      if (input.id === 'input-rsvp-qr-url') {
        updateQRCode();
      }
    });
  });



  /* --------------------------------------------------------------------------
     4. Theme Selection Logic
     -------------------------------------------------------------------------- */
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      const cards = document.querySelectorAll('.stationery-card');
      cards.forEach(card => {
        card.setAttribute('data-theme', theme);
      });

      // Update QR Code color scheme to match card backgrounds
      updateQRCode();
    });
  });

  /* --------------------------------------------------------------------------
     5. Initialization
     -------------------------------------------------------------------------- */
  updateCrests();
  syncTextBindings();
  updateQRCode();
});

/* --------------------------------------------------------------------------
   6. Custom Print Functions
   -------------------------------------------------------------------------- */
// Print single selected card layout
window.printSingleCard = function(sectionId) {
  // Convert target ID to layout class suffix
  const layoutClass = `print-only-${sectionId.replace('print-', '')}`;
  
  // Add styling marker to body
  document.body.className = `customizer-app ${layoutClass}`;
  
  // Trigger system print window
  window.print();
  
  // Clean up class after printing
  document.body.className = 'customizer-app';
};
