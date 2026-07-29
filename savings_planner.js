document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Sidebar Tab Switching & Theme Toggle
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTab = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');
      
      btn.classList.add('active');
      document.getElementById(`tab-${activeTab}`).style.display = 'block';
    });
  });

  const uiThemeToggleBtn = document.getElementById('ui-theme-toggle');
  uiThemeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('ui-light-mode');
    if (isLight) {
      document.body.classList.remove('ui-light-mode');
      uiThemeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    } else {
      document.body.classList.add('ui-light-mode');
      uiThemeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    }
  });

  /* ==========================================================================
     2. Customizer Colors & Print Palettes
     ========================================================================== */
  const paletteBtns = document.querySelectorAll('.palette-btn');
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const palette = btn.getAttribute('data-palette');
      
      paletteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Remove previous palette classes from body
      document.body.classList.remove('palette-sage', 'palette-emerald', 'palette-espresso', 'palette-indigo');
      document.body.classList.add(`palette-${palette}`);
    });
  });

  /* ==========================================================================
     3. Dynamic Zoom and Grid/List view controls
     ========================================================================== */
  const zoomSlider = document.getElementById('zoom-slider');
  const zoomVal = document.getElementById('zoom-val');
  const scrollWrapper = document.querySelector('.previews-scroll-wrapper');
  
  function applyZoom(val) {
    zoomVal.textContent = `${val}%`;
    scrollWrapper.style.transform = `scale(${val / 100})`;
  }
  
  zoomSlider.addEventListener('input', (e) => {
    applyZoom(e.target.value);
  });
  
  const viewToggleBtn = document.getElementById('btn-view-toggle');
  viewToggleBtn.addEventListener('click', () => {
    const isGrid = scrollWrapper.classList.contains('view-grid');
    if (isGrid) {
      scrollWrapper.classList.remove('view-grid');
      viewToggleBtn.querySelector('span').textContent = 'Grid View';
    } else {
      scrollWrapper.classList.add('view-grid');
      viewToggleBtn.querySelector('span').textContent = 'Single Page';
    }
  });

  /* ==========================================================================
     4. Real-time Form Bindings (Sidebar -> Planner Pages)
     ========================================================================== */
  const ownerInput = document.getElementById('input-owner-name');
  const coverOwnerName = document.getElementById('bind-owner-name');
  
  ownerInput.addEventListener('input', (e) => {
    coverOwnerName.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
  });

  const monogramInput = document.getElementById('input-monogram');
  const coverMonogram = document.getElementById('bind-monogram');
  
  monogramInput.addEventListener('input', (e) => {
    coverMonogram.textContent = e.target.value.toUpperCase() || 'AV';
  });

  const yearlyTargetInput = document.getElementById('input-yearly-target');
  const roadMapTarget = document.getElementById('bind-roadmap-target');
  const weeklyGoalTarget = document.getElementById('weekly-goal-target');
  
  yearlyTargetInput.addEventListener('input', (e) => {
    const val = e.target.value || '$0';
    roadMapTarget.textContent = val;
    weeklyGoalTarget.textContent = val;
  });

  const motiveInput = document.getElementById('input-yearly-motive');
  const roadMapMotive = document.getElementById('bind-roadmap-motive');
  
  motiveInput.addEventListener('input', (e) => {
    roadMapMotive.textContent = e.target.value || 'My Motivation';
  });

  // Budget percentage sliders logic
  const fixedSlider = document.getElementById('range-fixed-pct');
  const saveSlider = document.getElementById('range-save-pct');
  const flexSlider = document.getElementById('range-flex-pct');
  
  const fixedValText = document.getElementById('val-fixed-pct');
  const saveValText = document.getElementById('val-save-pct');
  const flexValText = document.getElementById('val-flex-pct');
  
  const pageFixedPct = document.getElementById('bind-fixed-pct');
  const pageSavePct = document.getElementById('bind-save-pct');
  const pageFlexPct = document.getElementById('bind-flex-pct');
  
  const tableFixedPct = document.getElementById('bind-table-fixed-pct');
  const tableSavePct = document.getElementById('bind-table-save-pct');
  const tableFlexPct = document.getElementById('bind-table-flex-pct');
  
  const circleFixed = document.getElementById('circle-fixed');
  const circleSave = document.getElementById('circle-save');
  const circleFlex = document.getElementById('circle-flex');

  const monthlyIncomeInput = document.getElementById('input-monthly-income');
  const circumference = 2 * Math.PI * 42; // ~263.89

  function updateBudgetSplit() {
    const fixed = parseInt(fixedSlider.value);
    const save = parseInt(saveSlider.value);
    
    // Auto-calculate flex spend based on needs and savings
    let flex = 100 - (fixed + save);
    if (flex < 0) {
      flex = 0;
      // Adjust savings to balance it out
      saveSlider.value = 100 - fixed;
    }
    
    flexSlider.value = flex;

    // Update text labels
    fixedValText.textContent = `${fixed}%`;
    saveValText.textContent = `${saveSlider.value}%`;
    flexValText.textContent = `${flex}%`;

    pageFixedPct.textContent = `${fixed}%`;
    pageSavePct.textContent = `${saveSlider.value}%`;
    pageFlexPct.textContent = `${flex}%`;

    tableFixedPct.textContent = `${fixed}%`;
    tableSavePct.textContent = `${saveSlider.value}%`;
    tableFlexPct.textContent = `${flex}%`;

    // Calculate cash values if income is set
    if (monthlyIncomeInput) {
      const incomeStr = monthlyIncomeInput.value.replace(/[^0-9.]/g, '');
      const income = parseFloat(incomeStr) || 0;
      
      const cashFixed = (fixed / 100) * income;
      const cashSave = (parseInt(saveSlider.value) / 100) * income;
      const cashFlex = (flex / 100) * income;
      
      const formatCurrency = (val) => `$${val.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      
      document.getElementById('bind-cash-fixed').textContent = formatCurrency(cashFixed);
      document.getElementById('bind-cash-save').textContent = formatCurrency(cashSave);
      document.getElementById('bind-cash-flex').textContent = formatCurrency(cashFlex);
      document.getElementById('bind-cash-total').textContent = formatCurrency(income);
    }

    // Update SVG circle dash offsets
    circleFixed.style.strokeDashoffset = circumference * (1 - fixed / 100);
    circleSave.style.strokeDashoffset = circumference * (1 - saveSlider.value / 100);
    circleFlex.style.strokeDashoffset = circumference * (1 - flex / 100);
  }

  [fixedSlider, saveSlider].forEach(slider => {
    slider.addEventListener('input', updateBudgetSplit);
  });
  
  if (monthlyIncomeInput) {
    monthlyIncomeInput.addEventListener('input', updateBudgetSplit);
    monthlyIncomeInput.addEventListener('blur', () => {
      let val = monthlyIncomeInput.value.trim();
      if (val !== '' && !val.startsWith('$')) {
        monthlyIncomeInput.value = '$' + val;
      }
      updateBudgetSplit();
    });
  }
  
  updateBudgetSplit(); // Initial call

  /* ==========================================================================
     5. Sinking Funds & Jar Tracker Logic
     ========================================================================== */
  for (let i = 0; i < 6; i++) {
    const nameInput = document.getElementById(`fund-name-${i}`);
    const currentInput = document.getElementById(`fund-current-${i}`);
    const targetInput = document.getElementById(`fund-target-${i}`);
    
    const jarTitle = document.getElementById(`jar-title-${i}`);
    const jarMetrics = document.getElementById(`jar-metrics-${i}`);
    const jarFill = document.getElementById(`jar-fill-${i}`);
    
    function updateJar() {
      const name = nameInput.value || `Fund #${i+1}`;
      const current = parseFloat(currentInput.value) || 0;
      const target = parseFloat(targetInput.value) || 1;
      
      jarTitle.textContent = name;
      jarMetrics.textContent = `$${current.toLocaleString()} / $${target.toLocaleString()}`;
      
      let pct = (current / target) * 100;
      pct = Math.max(0, Math.min(100, pct)); // Clamp 0-100
      
      // liquid fill offset height
      jarFill.style.height = `${pct * 0.88 + 4}%`; // scale to jar vector boundary
    }
    
    [nameInput, currentInput, targetInput].forEach(inp => {
      inp.addEventListener('input', updateJar);
    });
    updateJar(); // Initial call
  }

  /* ==========================================================================
     6. Daily Micro-Savings & HP Grid Generator
     ========================================================================== */
  const dailyGrid = document.getElementById('daily-days-grid');
  const dailyHabitDescInput = document.getElementById('input-daily-habit-desc');
  const dailySaveValInput = document.getElementById('input-daily-save-val');
  const dailyDescBind = document.getElementById('bind-daily-desc');

  if (dailyHabitDescInput && dailyDescBind) {
    dailyHabitDescInput.addEventListener('input', (e) => {
      dailyDescBind.textContent = e.target.value;
    });
  }

  if (dailySaveValInput) {
    dailySaveValInput.addEventListener('input', (e) => {
      const val = e.target.value || '$0';
      const saveInputs = document.querySelectorAll('.daily-save-input');
      saveInputs.forEach(inp => {
        if (inp.value === '$0' || inp.value === '' || inp.value === '$5') {
          inp.value = val;
        }
      });
    });
  }

  function renderDailyGrid() {
    if (!dailyGrid) return;
    dailyGrid.innerHTML = '';
    
    const heartSvg = `
      <svg class="hp-heart-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;
    
    const defaultDailySave = dailySaveValInput ? dailySaveValInput.value : '$5';
    
    for (let i = 1; i <= 30; i++) {
      const tile = document.createElement('div');
      tile.className = 'daily-day-card';
      
      tile.innerHTML = `
        <div class="daily-day-card-header">
          <span class="day-label">Day ${i}</span>
          <div class="daily-hp-bar">
            <span class="hp-heart-btn active" data-idx="0">${heartSvg}</span>
            <span class="hp-heart-btn active" data-idx="1">${heartSvg}</span>
            <span class="hp-heart-btn active" data-idx="2">${heartSvg}</span>
            <span class="hp-heart-btn active" data-idx="3">${heartSvg}</span>
            <span class="hp-heart-btn active" data-idx="4">${heartSvg}</span>
          </div>
        </div>
        <div class="daily-actions">
          <div class="daily-action-row">
            <span class="daily-save-label">No-Spend</span>
            <span class="box-checkbox daily-nospend-check"></span>
          </div>
          <div class="daily-action-row">
            <span class="daily-save-label">Saved</span>
            <input type="text" class="daily-save-input" value="${defaultDailySave}">
          </div>
        </div>
      `;
      
      // Interactive Heart System
      const hearts = tile.querySelectorAll('.hp-heart-btn');
      hearts.forEach(heart => {
        heart.addEventListener('click', () => {
          heart.classList.toggle('active');
          if (!heart.classList.contains('active')) {
            heart.style.opacity = '0.15';
            heart.style.transform = 'scale(0.85)';
          } else {
            heart.style.opacity = '1';
            heart.style.transform = 'scale(1)';
          }
        });
      });
      
      // Interactive check for No-Spend
      const checkbox = tile.querySelector('.daily-nospend-check');
      checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('completed');
      });
      
      // Micro save text inputs
      const saveInput = tile.querySelector('.daily-save-input');
      saveInput.addEventListener('focus', () => {
        if (saveInput.value === '$0' || saveInput.value === '$5') saveInput.value = '';
      });
      saveInput.addEventListener('blur', () => {
        if (saveInput.value.trim() === '') {
          saveInput.value = dailySaveValInput ? dailySaveValInput.value : '$5';
        } else if (!saveInput.value.startsWith('$')) {
          saveInput.value = '$' + saveInput.value;
        }
      });
      
      dailyGrid.appendChild(tile);
    }
  }
  
  renderDailyGrid(); // Initial Daily Grid render

  /* ==========================================================================
     7. 52-Week Savings Challenge Logic (Dynamic Deposit Scheme)
     ========================================================================== */
  const weeklyGrid = document.getElementById('weekly-challenge-grid');
  const weeklyWeeksCountText = document.getElementById('weekly-weeks-count');
  const weeklyTotalSavedText = document.getElementById('weekly-total-saved');
  
  const weeklyGoalInput = document.getElementById('input-weekly-goal');
  const weeklyStyleSelect = document.getElementById('select-weekly-style');
  const weeklyCustomListInput = document.getElementById('input-weekly-custom-list');
  const groupCustomWeekly = document.getElementById('group-custom-weekly');

  let checkedWeeksCount = 0;
  let totalSavedWeekly = 0;
  
  function renderWeeklyChallengeGrid() {
    if (!weeklyGrid) return;
    weeklyGrid.innerHTML = '';
    checkedWeeksCount = 0;
    totalSavedWeekly = 0;
    if (weeklyWeeksCountText) weeklyWeeksCountText.textContent = `0 / 52`;
    if (weeklyTotalSavedText) weeklyTotalSavedText.textContent = `$0.00`;

    const scheme = weeklyStyleSelect ? weeklyStyleSelect.value : 'progressive';
    const targetVal = weeklyGoalInput ? parseFloat(weeklyGoalInput.value.replace(/[^0-9.]/g, '')) || 1378 : 1378;

    let amounts = [];
    if (scheme === 'progressive') {
      const scale = targetVal / 1378;
      for (let i = 1; i <= 52; i++) {
        amounts.push(Math.round(i * scale * 100) / 100);
      }
    } else if (scheme === 'fixed') {
      const fixedAmt = Math.round((targetVal / 52) * 100) / 100;
      for (let i = 1; i <= 52; i++) {
        amounts.push(fixedAmt);
      }
    } else if (scheme === 'double') {
      const scale = targetVal / 2756;
      for (let i = 1; i <= 52; i++) {
        amounts.push(Math.round(i * 2 * scale * 100) / 100);
      }
    } else if (scheme === 'custom') {
      const listStr = weeklyCustomListInput ? weeklyCustomListInput.value : '10,15,20,25,30';
      const parsedList = listStr.split(',').map(v => parseFloat(v.trim()) || 0);
      for (let i = 1; i <= 52; i++) {
        const val = parsedList[(i - 1) % parsedList.length] || 0;
        amounts.push(val);
      }
      
      const totalCustomSum = amounts.reduce((a, b) => a + b, 0);
      if (weeklyGoalInput && document.activeElement !== weeklyGoalInput) {
        weeklyGoalInput.value = `$${totalCustomSum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      }
      const weeklyGoalTarget = document.getElementById('weekly-goal-target');
      if (weeklyGoalTarget) {
        weeklyGoalTarget.textContent = `$${totalCustomSum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      }
    }
    
    for (let i = 1; i <= 52; i++) {
      const amount = amounts[i - 1];
      const box = document.createElement('div');
      box.className = 'week-box-item';
      box.setAttribute('data-week', i);
      box.setAttribute('data-amount', amount);
      
      box.innerHTML = `
        <div class="box-labels">
          <span class="box-week-num">Week ${i}</span>
          <span class="box-week-amount">$${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <span class="box-checkbox"></span>
      `;
      
      box.addEventListener('click', () => {
        box.classList.toggle('completed');
        const amt = parseFloat(box.getAttribute('data-amount')) || 0;
        
        if (box.classList.contains('completed')) {
          checkedWeeksCount++;
          totalSavedWeekly += amt;
        } else {
          checkedWeeksCount--;
          totalSavedWeekly -= amt;
        }
        
        weeklyWeeksCountText.textContent = `${checkedWeeksCount} / 52`;
        weeklyTotalSavedText.textContent = `$${totalSavedWeekly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      });
      
      weeklyGrid.appendChild(box);
    }
  }

  if (weeklyGoalInput) {
    weeklyGoalInput.addEventListener('input', () => {
      const val = weeklyGoalInput.value;
      const weeklyGoalTarget = document.getElementById('weekly-goal-target');
      if (weeklyGoalTarget) weeklyGoalTarget.textContent = val;
      renderWeeklyChallengeGrid();
    });
    weeklyGoalInput.addEventListener('blur', () => {
      let val = weeklyGoalInput.value.trim();
      if (val !== '' && !val.startsWith('$')) {
        weeklyGoalInput.value = '$' + val;
      }
    });
  }

  if (weeklyStyleSelect) {
    weeklyStyleSelect.addEventListener('change', () => {
      if (weeklyStyleSelect.value === 'custom') {
        if (groupCustomWeekly) groupCustomWeekly.style.display = 'block';
      } else {
        if (groupCustomWeekly) groupCustomWeekly.style.display = 'none';
      }
      renderWeeklyChallengeGrid();
    });
  }

  if (weeklyCustomListInput) {
    weeklyCustomListInput.addEventListener('input', renderWeeklyChallengeGrid);
  }

  renderWeeklyChallengeGrid(); // Initial rendering of the weekly challenge

  /* ==========================================================================
     8. 100-Envelope Vault Logic
     ========================================================================== */
  const envelopeBento = document.getElementById('envelope-bento-container');
  const envelopeCountText = document.getElementById('envelope-count');
  const envelopeSavingsText = document.getElementById('envelope-savings');
  const envelopeProgressBar = document.getElementById('envelope-progress-bar');
  
  let checkedEnvelopesCount = 0;
  let totalSavedEnvelopes = 0;
  
  if (envelopeBento) {
    envelopeBento.innerHTML = '';
    
    // Envelope SVG path
    const envSvg = `
      <svg viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    `;
    
    for (let i = 1; i <= 100; i++) {
      const tile = document.createElement('div');
      tile.className = 'envelope-tile';
      tile.setAttribute('data-num', i);
      
      tile.innerHTML = `
        ${envSvg}
        <span class="envelope-tile-num">${i}</span>
      `;
      
      tile.addEventListener('click', () => {
        tile.classList.toggle('completed');
        const num = parseInt(tile.getAttribute('data-num'));
        
        if (tile.classList.contains('completed')) {
          checkedEnvelopesCount++;
          totalSavedEnvelopes += num;
        } else {
          checkedEnvelopesCount--;
          totalSavedEnvelopes -= num;
        }
        
        envelopeCountText.textContent = `${checkedEnvelopesCount} / 100`;
        envelopeSavingsText.textContent = `$${totalSavedEnvelopes.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        const pct = (checkedEnvelopesCount / 100) * 100;
        envelopeProgressBar.style.width = `${pct}%`;
      });
      
      envelopeBento.appendChild(tile);
    }
  }

  /* ==========================================================================
     9. 12-Month Roadmap Details Manual Input Listeners
     ========================================================================== */
  for (let i = 0; i < 12; i++) {
    const roadmapInput = document.getElementById(`input-roadmap-${i}`);
    const roadmapDesc = document.getElementById(`roadmap-desc-${i}`);
    if (roadmapInput && roadmapDesc) {
      roadmapInput.addEventListener('input', (e) => {
        roadmapDesc.textContent = e.target.value;
      });
    }
  }

  /* ==========================================================================
     10. Direct Inline Editing Module (Bidirectional Sync)
     ========================================================================== */
  const btnEditModeToggle = document.getElementById('btn-edit-mode-toggle');
  let isEditModeActive = false;

  function toggleInlineEditMode() {
    isEditModeActive = !isEditModeActive;
    
    if (isEditModeActive) {
      btnEditModeToggle.classList.add('active');
      btnEditModeToggle.querySelector('span').textContent = 'Direct Edit Mode: On';
      document.body.classList.add('direct-edit-active');
      showToast("Direct Editing Active! Click any text in pages to modify.");
    } else {
      btnEditModeToggle.classList.remove('active');
      btnEditModeToggle.querySelector('span').textContent = 'Direct Edit Mode: Off';
      document.body.classList.remove('direct-edit-active');
      showToast("Direct Editing Locked!");
    }

    const editableSelectors = [
      '.planner-page p',
      '.planner-page h3',
      '.planner-page h4',
      '.planner-page h5',
      '.planner-page span:not(.hp-heart-btn):not(.box-checkbox):not(.circle-val)',
      '.planner-page td',
      '.planner-page th',
      '.planner-page strong',
      '.cover-title',
      '.cover-subtitle'
    ];

    const elements = document.querySelectorAll(editableSelectors.join(', '));
    elements.forEach(el => {
      if (el.closest('.daily-hp-bar') || el.closest('.daily-hp-hearts') || el.classList.contains('checkbox-spot')) return;
      
      el.contentEditable = isEditModeActive;
      
      if (isEditModeActive) {
        el.addEventListener('blur', syncInlineEditToSidebar);
      } else {
        el.removeEventListener('blur', syncInlineEditToSidebar);
      }
    });
  }

  if (btnEditModeToggle) {
    btnEditModeToggle.addEventListener('click', toggleInlineEditMode);
  }

  function syncInlineEditToSidebar(e) {
    const el = e.target;
    const val = el.textContent.trim();
    const id = el.id;

    if (!id) return;

    if (id.startsWith('roadmap-desc-')) {
      const idx = id.replace('roadmap-desc-', '');
      const input = document.getElementById(`input-roadmap-${idx}`);
      if (input) input.value = val;
    } else if (id === 'bind-owner-name') {
      const input = document.getElementById('input-owner-name');
      if (input) input.value = val.toUpperCase();
    } else if (id === 'bind-monogram') {
      const input = document.getElementById('input-monogram');
      if (input) input.value = val.toUpperCase();
    } else if (id === 'bind-roadmap-motive') {
      const input = document.getElementById('input-yearly-motive');
      if (input) input.value = val;
    } else if (id === 'bind-roadmap-target') {
      const input = document.getElementById('input-yearly-target');
      if (input) {
        input.value = val;
        const weeklyGoalTarget = document.getElementById('weekly-goal-target');
        if (weeklyGoalTarget) weeklyGoalTarget.textContent = val;
      }
    } else if (id === 'bind-daily-desc') {
      const input = document.getElementById('input-daily-habit-desc');
      if (input) input.value = val;
    } else if (id.startsWith('jar-title-')) {
      const idx = id.replace('jar-title-', '');
      const input = document.getElementById(`fund-name-${idx}`);
      if (input) input.value = val;
    }
  }

  /* ==========================================================================
     11. Simulated AI Advisor Logic
     ========================================================================== */
  const btnGenerateAiPlan = document.getElementById('btn-generate-ai-plan');
  const aiConsoleCard = document.getElementById('ai-console-card');
  const aiTerminalOutput = document.getElementById('ai-terminal-output');
  const btnApplyAiPlan = document.getElementById('btn-apply-ai-plan');

  let generatedPlanData = null;

  if (btnGenerateAiPlan) {
    btnGenerateAiPlan.addEventListener('click', () => {
      const income = parseFloat(document.getElementById('ai-monthly-income').value) || 4000;
      const yearlyGoal = parseFloat(document.getElementById('ai-savings-goal').value) || 12000;
      const persona = document.getElementById('ai-savings-persona').value || 'balanced';
      const instructions = document.getElementById('ai-custom-instructions').value.trim();

      aiConsoleCard.style.display = 'block';
      aiTerminalOutput.textContent = '';
      btnApplyAiPlan.style.display = 'none';

      let logs = [];
      logs.push(`[SYSTEM] Initializing Aura AI Planner Engine v2.0...`);
      logs.push(`[SYSTEM] User profile parsed: Income = $${income.toLocaleString()}/mo, Target = $${yearlyGoal.toLocaleString()}/yr, Persona = ${persona.toUpperCase()}`);
      
      const neededMonthly = yearlyGoal / 12;
      logs.push(`[ANALYSIS] Required savings rate: $${neededMonthly.toFixed(2)}/month (${((neededMonthly/income)*100).toFixed(1)}% of income).`);

      if (neededMonthly > income) {
        logs.push(`[WARNING] Target monthly savings exceeds total income baseline! Adjusting to maximum capacity (80%).`);
      }

      let fixedPct = 50;
      let savePct = 30;
      let flexPct = 20;

      if (persona === 'aggressive') {
        fixedPct = 30;
        savePct = 60;
        flexPct = 10;
      } else if (persona === 'relaxed') {
        fixedPct = 60;
        savePct = 15;
        flexPct = 25;
      } else if (persona === 'frugal') {
        fixedPct = 40;
        savePct = 50;
        flexPct = 10;
      }

      const emergencyTarget = Math.round(yearlyGoal * 0.40);
      const travelTarget = Math.round(yearlyGoal * 0.20);
      const investmentsTarget = Math.round(yearlyGoal * 0.25);
      const shoppingTarget = Math.round(yearlyGoal * 0.15);

      let focusKeyword = "general impulses";
      if (instructions !== '') {
        const words = instructions.toLowerCase().split(/\s+/);
        const keyWord = words.find(w => w.length > 4 && !['about', 'would', 'could', 'should', 'skip', 'save', 'plan', 'other'].includes(w));
        if (keyWord) focusKeyword = keyWord;
      }

      logs.push(`[BUDGET] Suggesting ${fixedPct}% Needs / ${savePct}% Savings / ${flexPct}% Wants split.`);
      logs.push(`[SINKING FUNDS] Setting up 4 core jars:`);
      logs.push(` - Emergency Fund Target: $${emergencyTarget.toLocaleString()}`);
      logs.push(` - Leisure & Travel Target: $${travelTarget.toLocaleString()}`);
      logs.push(` - Future Goal Target: $${investmentsTarget.toLocaleString()}`);
      logs.push(` - Reserve Fund Target: $${shoppingTarget.toLocaleString()}`);

      logs.push(`[HABITS] Recommended Daily Micro-Save: skip daily non-essential purchases related to "${focusKeyword}".`);
      
      const defaultDailySave = savePct >= 50 ? "$10" : "$5";
      logs.push(`[HABITS] Suggested Default Daily Saving Value: ${defaultDailySave}`);

      let milestones = [];
      const monthlySavings = (savePct / 100) * income;

      milestones.push(`Establish primary buffers and automate direct saving transfers of $${monthlySavings.toLocaleString()}.`);
      milestones.push(`Execute a 7-day no-spend sprint on "${focusKeyword}". Log items in Impulse Buster.`);
      milestones.push(`Audit subscription lists and re-allocate $50 of flex spend into sinking funds.`);
      milestones.push(`Spring reset of milestones. Check Sinking Fund emergency jar progress.`);
      milestones.push(`Prepare holiday/travel buffers. Maintain daily micro-saves target.`);
      milestones.push(`Mid-year ledger check: target $${Math.round(yearlyGoal/2).toLocaleString()} total savings achieved.`);
      milestones.push(`Temptation shield: practice 30-day cool down rule on all summer purchases.`);
      milestones.push(`Velocity boost: double check weekly velocity box targets.`);
      milestones.push(`Evaluate Q3 gains. Re-balance sinking funds priorities.`);
      milestones.push(`Accumulate holiday budget buffers inside shopping jar.`);
      milestones.push(`Perform final envelope sprints. Save at least $${monthlySavings.toLocaleString()}.`);
      milestones.push(`Celebrate final milestone of $${yearlyGoal.toLocaleString()} reached! Formulate next year targets.`);

      logs.push(`[ROADMAP] Crafted 12 customized monthly milestones synced to target.`);
      logs.push(`[SYSTEM] Compilation successful. Ready to write blueprint.`);

      generatedPlanData = {
        yearlyGoal: yearlyGoal,
        income: income,
        fixedPct: fixedPct,
        savePct: savePct,
        flexPct: flexPct,
        motive: instructions !== '' ? `Achieve goal focusing on cutting costs on ${focusKeyword}` : `Financial Resilience & Future Security`,
        jars: [
          { name: "Emergency Fund", current: Math.round(emergencyTarget*0.1), goal: emergencyTarget },
          { name: "Travel & Escape", current: 0, goal: travelTarget },
          { name: "Future Growth", current: 0, goal: investmentsTarget },
          { name: "Personal Rewards", current: 0, goal: shoppingTarget },
          { name: "Family Health", current: 0, goal: Math.round(yearlyGoal*0.05) },
          { name: "Special Events", current: 0, goal: Math.round(yearlyGoal*0.05) }
        ],
        milestones: milestones,
        dailyHabitDesc: `Gamified habit log. Focus: Avoid impulse spend on ${focusKeyword}. Daily health starts at 5 hearts. Deduct 1 heart for each non-essential purchase. Tick checkbox for No-Spend days. Default daily target: ${defaultDailySave} saved.`,
        dailySaveVal: defaultDailySave,
        weeklyGoal: `$${yearlyGoal.toLocaleString()}`,
        weeklyStyle: savePct >= 50 ? 'double' : 'progressive'
      };

      let currentLogIndex = 0;
      let charIndex = 0;
      let outputText = "";
      
      function typeLog() {
        if (currentLogIndex < logs.length) {
          const line = logs[currentLogIndex];
          if (charIndex < line.length) {
            outputText += line[charIndex];
            aiTerminalOutput.textContent = outputText;
            charIndex++;
            aiTerminalOutput.scrollTop = aiTerminalOutput.scrollHeight;
            setTimeout(typeLog, 4);
          } else {
            outputText += "\n";
            aiTerminalOutput.textContent = outputText;
            charIndex = 0;
            currentLogIndex++;
            setTimeout(typeLog, 50);
          }
        } else {
          btnApplyAiPlan.style.display = 'flex';
        }
      }

      typeLog();
    });
  }

  if (btnApplyAiPlan) {
    btnApplyAiPlan.addEventListener('click', () => {
      if (!generatedPlanData) return;

      const yearlyTargetInput = document.getElementById('input-yearly-target');
      if (yearlyTargetInput) {
        yearlyTargetInput.value = `$${generatedPlanData.yearlyGoal.toLocaleString()}`;
        yearlyTargetInput.dispatchEvent(new Event('input'));
      }

      const monthlyIncomeInput = document.getElementById('input-monthly-income');
      if (monthlyIncomeInput) {
        monthlyIncomeInput.value = `$${generatedPlanData.income.toLocaleString()}`;
        monthlyIncomeInput.dispatchEvent(new Event('input'));
      }

      const motiveInput = document.getElementById('input-yearly-motive');
      if (motiveInput) {
        motiveInput.value = generatedPlanData.motive;
        motiveInput.dispatchEvent(new Event('input'));
      }

      const fixedSlider = document.getElementById('range-fixed-pct');
      const saveSlider = document.getElementById('range-save-pct');
      if (fixedSlider && saveSlider) {
        fixedSlider.value = generatedPlanData.fixedPct;
        saveSlider.value = generatedPlanData.savePct;
        updateBudgetSplit();
      }

      for (let i = 0; i < 6; i++) {
        const jarData = generatedPlanData.jars[i];
        if (jarData) {
          const nameInput = document.getElementById(`fund-name-${i}`);
          const currentInput = document.getElementById(`fund-current-${i}`);
          const targetInput = document.getElementById(`fund-target-${i}`);
          if (nameInput) nameInput.value = jarData.name;
          if (currentInput) currentInput.value = jarData.current;
          if (targetInput) targetInput.value = jarData.goal;
          
          if (nameInput) nameInput.dispatchEvent(new Event('input'));
        }
      }

      for (let i = 0; i < 12; i++) {
        const milestoneVal = generatedPlanData.milestones[i];
        const mInput = document.getElementById(`input-roadmap-${i}`);
        if (mInput && milestoneVal) {
          mInput.value = milestoneVal;
          mInput.dispatchEvent(new Event('input'));
        }
      }

      const dailyHabitDescInput = document.getElementById('input-daily-habit-desc');
      const dailySaveValInput = document.getElementById('input-daily-save-val');
      if (dailyHabitDescInput) {
        dailyHabitDescInput.value = generatedPlanData.dailyHabitDesc;
        dailyHabitDescInput.dispatchEvent(new Event('input'));
      }
      if (dailySaveValInput) {
        dailySaveValInput.value = generatedPlanData.dailySaveVal;
        dailySaveValInput.dispatchEvent(new Event('input'));
      }

      const weeklyGoalInput = document.getElementById('input-weekly-goal');
      const weeklyStyleSelect = document.getElementById('select-weekly-style');
      if (weeklyGoalInput) {
        weeklyGoalInput.value = generatedPlanData.weeklyGoal;
        weeklyGoalInput.dispatchEvent(new Event('input'));
      }
      if (weeklyStyleSelect) {
        weeklyStyleSelect.value = generatedPlanData.weeklyStyle;
        weeklyStyleSelect.dispatchEvent(new Event('change'));
      }

      // Re-trigger rendering
      renderDailyGrid();
      renderWeeklyChallengeGrid();

      showToast("AI Planner Blueprint Applied Successfully!");

      const targetsTabBtn = document.querySelector('.tab-btn[data-tab="goals"]');
      if (targetsTabBtn) targetsTabBtn.click();
    });
  }

  function showToast(message) {
    let toast = document.getElementById('customizer-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'customizer-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.padding = '12px 24px';
      toast.style.background = 'linear-gradient(135deg, var(--print-primary) 0%, var(--print-gold) 100%)';
      toast.style.color = '#ffffff';
      toast.style.fontSize = '12px';
      toast.style.fontWeight = '700';
      toast.style.borderRadius = '30px';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      toast.style.zIndex = '99999';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3000);
  }

});
