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

  
  const inputRsvpTitle = document.getElementById('input-rsvp-title');
  const inputRsvpDeadline = document.getElementById('input-rsvp-deadline');
  const inputRsvpMPrefix = document.getElementById('input-rsvp-m-prefix');
  const inputRsvpOption1 = document.getElementById('input-rsvp-option-1');
  const inputRsvpOption2 = document.getElementById('input-rsvp-option-2');
  const inputRsvpDietary = document.getElementById('input-rsvp-dietary');
  const inputRsvpScanPrompt = document.getElementById('input-rsvp-scan-prompt');
  const inputRsvpQrUrl = document.getElementById('input-rsvp-qr-url');
  
  // Custom Color Picker inputs
  const customColorsSection = document.getElementById('custom-colors-section');
  const inputColorBg = document.getElementById('input-color-bg');
  const inputColorPrimary = document.getElementById('input-color-primary');
  const inputColorSecondary = document.getElementById('input-color-secondary');
  const inputColorGold = document.getElementById('input-color-gold');
  const inputColorAccent = document.getElementById('input-color-accent');
  
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
        <!-- Outer delicate circular stems with floral buds -->
        <circle cx="50" cy="50" r="44" stroke-width="${strokeWidth1}" stroke-dasharray="1 3" />
        
        <!-- Left Stem branch -->
        <path d="M 50,88 C 25,88 14,70 14,50 C 14,30 25,12 50,12" stroke-width="${strokeWidth1}" />
        
        <!-- Right Stem branch -->
        <path d="M 50,88 C 75,88 86,70 86,50 C 86,30 75,12 50,12" stroke-width="${strokeWidth1}" />
        
        <!-- Floral elements & Leaves: Left -->
        <!-- Leaf 1 -->
        <path d="M 14,50 Q 8,46 11,42 Q 15,46 14,50" fill="currentColor" stroke="none" />
        <!-- Little Flower 1 -->
        <circle cx="16" cy="42" r="1.5" fill="currentColor" stroke="none" />
        <!-- Leaf 2 -->
        <path d="M 18,34 Q 12,31 14,27 Q 19,30 18,34" fill="currentColor" stroke="none" />
        <!-- Little Flower 2 -->
        <circle cx="21" cy="27" r="1.5" fill="currentColor" stroke="none" />
        <!-- Leaf 3 -->
        <path d="M 26,22 Q 21,17 23,13 Q 28,17 26,22" fill="currentColor" stroke="none" />
        <!-- Little Flower 3 -->
        <circle cx="30" cy="17" r="1.5" fill="currentColor" stroke="none" />
        <!-- Leaf 4 -->
        <path d="M 37,14 Q 34,8 37,4 Q 40,9 37,14" fill="currentColor" stroke="none" />
        
        <!-- Floral elements & Leaves: Right -->
        <!-- Leaf 1 -->
        <path d="M 86,50 Q 92,46 89,42 Q 85,46 86,50" fill="currentColor" stroke="none" />
        <!-- Little Flower 1 -->
        <circle cx="84" cy="42" r="1.5" fill="currentColor" stroke="none" />
        <!-- Leaf 2 -->
        <path d="M 82,34 Q 88,31 86,27 Q 81,30 82,34" fill="currentColor" stroke="none" />
        <!-- Little Flower 2 -->
        <circle cx="79" cy="27" r="1.5" fill="currentColor" stroke="none" />
        <!-- Leaf 3 -->
        <path d="M 74,22 Q 79,17 77,13 Q 72,17 74,22" fill="currentColor" stroke="none" />
        <!-- Little Flower 3 -->
        <circle cx="70" cy="17" r="1.5" fill="currentColor" stroke="none" />
        <!-- Leaf 4 -->
        <path d="M 63,14 Q 66,8 63,4 Q 60,9 63,14" fill="currentColor" stroke="none" />

        <!-- Bottom classic floral ribbon tie -->
        <path d="M 44,87 Q 50,91 56,87" stroke-width="${strokeWidth1}" />
        <circle cx="50" cy="88" r="2" fill="currentColor" stroke="none" />
        <path d="M 50,88 Q 45,95 40,94 M 50,88 Q 55,95 60,94" stroke-width="${strokeWidth1}" />

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
    } else if (activeTheme === 'custom') {
      color = inputColorPrimary.value.replace('#', '');
      bgcolor = inputColorBg.value.replace('#', '');
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
    document.querySelectorAll('.bind-rsvp-title').forEach(el => el.innerText = inputRsvpTitle.value);
    document.querySelectorAll('.bind-rsvp-deadline').forEach(el => el.innerText = inputRsvpDeadline.value);
    document.querySelectorAll('.bind-rsvp-m-prefix').forEach(el => el.innerText = inputRsvpMPrefix.value);
    document.querySelectorAll('.bind-rsvp-option-1').forEach(el => el.innerText = inputRsvpOption1.value);
    document.querySelectorAll('.bind-rsvp-option-2').forEach(el => el.innerText = inputRsvpOption2.value);
    document.querySelectorAll('.bind-rsvp-dietary').forEach(el => el.innerText = inputRsvpDietary.value);
    document.querySelectorAll('.bind-rsvp-scan-prompt').forEach(el => el.innerText = inputRsvpScanPrompt.value);
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
     4. Custom Color Palette Application
     -------------------------------------------------------------------------- */
  function applyCustomColors() {
    const cards = document.querySelectorAll('.stationery-card');
    cards.forEach(card => {
      card.style.setProperty('--card-bg', inputColorBg.value);
      card.style.setProperty('--card-primary', inputColorPrimary.value);
      card.style.setProperty('--card-secondary', inputColorSecondary.value);
      card.style.setProperty('--card-gold', inputColorGold.value);
      card.style.setProperty('--card-accent', inputColorAccent.value);
    });
  }

  function clearCustomColors() {
    const cards = document.querySelectorAll('.stationery-card');
    cards.forEach(card => {
      card.style.removeProperty('--card-bg');
      card.style.removeProperty('--card-primary');
      card.style.removeProperty('--card-secondary');
      card.style.removeProperty('--card-gold');
      card.style.removeProperty('--card-accent');
    });
  }

  // Add listeners to color pickers
  const colorPickers = [inputColorBg, inputColorPrimary, inputColorSecondary, inputColorGold, inputColorAccent];
  colorPickers.forEach(picker => {
    picker.addEventListener('input', () => {
      const activeBtn = document.querySelector('.theme-btn.active');
      if (activeBtn && activeBtn.dataset.theme === 'custom') {
        applyCustomColors();
        updateQRCode();
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Theme Selection & Border Style Logic
     -------------------------------------------------------------------------- */
  const selectBorderStyle = document.getElementById('select-border-style');

  function updateBorderStyle() {
    if (!selectBorderStyle) return;
    const style = selectBorderStyle.value;
    document.body.classList.remove('border-style-classic', 'border-style-flower', 'border-style-vintage', 'border-style-luxury');
    document.body.classList.add(`border-style-${style}`);
  }

  if (selectBorderStyle) {
    selectBorderStyle.addEventListener('change', updateBorderStyle);
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      const cards = document.querySelectorAll('.stationery-card');

      if (theme === 'custom') {
        customColorsSection.style.display = 'block';
        applyCustomColors();
      } else {
        customColorsSection.style.display = 'none';
        clearCustomColors();
      }

      // Auto-switch border outline preset based on chosen theme for premium defaults
      if (selectBorderStyle) {
        if (theme === 'cream') {
          selectBorderStyle.value = 'classic';
        } else if (theme === 'emerald') {
          selectBorderStyle.value = 'luxury';
        } else if (theme === 'sage') {
          selectBorderStyle.value = 'flower';
        } else if (theme === 'plum') {
          selectBorderStyle.value = 'vintage';
        }
        updateBorderStyle();
      }

      cards.forEach(card => {
        card.setAttribute('data-theme', theme);
      });

      // Update QR Code color scheme to match card backgrounds
      updateQRCode();
    });
  });

  /* --------------------------------------------------------------------------
     6. Initialization
     -------------------------------------------------------------------------- */
  updateCrests();
  syncTextBindings();
  updateQRCode();
  updateBorderStyle();
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
