document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Core Application State
     ========================================================================== */
  let state = {
    ownerName: "ALEXANDRIA VANE",
    monthlyIncome: 4000,
    yearlyTarget: 12000,
    motivation: "Financial Freedom & Peace of Mind",
    fixedPct: 50,
    savePct: 30,
    flexPct: 20,
    jars: [
      { name: "Emergency Fund", current: 1000, goal: 5000 },
      { name: "Travel & Escape", current: 300, goal: 3000 },
      { name: "Home Upgrade", current: 0, goal: 2000 },
      { name: "Vehicle Fund", current: 0, goal: 1000 },
      { name: "Health Wellness", current: 0, goal: 500 },
      { name: "Special Events", current: 0, goal: 500 }
    ],
    roadmap: [
      "Establish emergency buffers and set monthly direct transfers.",
      "Identify secondary spending filters and run impulse-budget trials.",
      "Review Q1 momentum and adjust flexible envelopes.",
      "Spring reset of sinking fund milestones.",
      "Pre-travel allocations and focus on micro-saves.",
      "Mid-year reflection & Q2 progress review.",
      "Maintain no-spend schedules during summer weeks.",
      "Automate minor weekly challenge checks.",
      "Q3 health check: evaluate current net allocations.",
      "Accumulate buffers for holiday expenses inside sinking funds.",
      "Gamified envelope sprint towards final goals.",
      "Final road check: celebrate wins and sketch next targets."
    ],
    dailyHabitDesc: "A gamified calendar designed to anchor savings habits. Log micro-saves and avoid impulse spendings!",
    dailySaveVal: "$5",
    weeklyStyle: "progressive",
    weeklyCustomList: "10,20,30,40,50",
    checkedDays: Array(30).fill(false),
    daySavings: Array(30).fill("$5"),
    checkedWeeks: Array(52).fill(false)
  };

  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  /* ==========================================================================
     2. Sidebar Tabs & Theme Toggle Control
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.sidebar-panel .tab-btn');
  const tabContents = document.querySelectorAll('.sidebar-panel .tab-content');

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
    const isDark = document.body.classList.contains('ui-dark-mode');
    if (isDark) {
      document.body.classList.remove('ui-dark-mode');
      document.body.classList.add('ui-light-mode');
      uiThemeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    } else {
      document.body.classList.remove('ui-light-mode');
      document.body.classList.add('ui-dark-mode');
      uiThemeToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  });

  /* ==========================================================================
     3. Workspace Dashboard Tab Switching
     ========================================================================== */
  const dashTabBtns = document.querySelectorAll('.dash-tab-btn');
  const dashViews = document.querySelectorAll('.dashboard-view');

  dashTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeDash = btn.getAttribute('data-dash');
      dashTabBtns.forEach(b => b.classList.remove('active'));
      dashViews.forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`dash-${activeDash}`).classList.add('active');
    });
  });

  /* ==========================================================================
     4. Dynamic Content Renderers (Jars, Roadmap, Daily, Weekly)
     ========================================================================== */
  
  // Render Sinking Funds in Sidebar list and Overview Dashboard
  const jarBuilderContainer = document.getElementById('funds-builder-container');
  const dashboardJarsGrid = document.getElementById('dashboard-jars-grid');

  function renderSinkingFunds() {
    if (jarBuilderContainer) {
      jarBuilderContainer.innerHTML = '';
      state.jars.forEach((jar, i) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = '6px';
        item.style.marginBottom = '8px';
        item.innerHTML = `
          <input type="text" id="fund-name-${i}" value="${jar.name}" class="text-input" style="flex:2;" placeholder="Jar Name">
          <input type="number" id="fund-current-${i}" value="${jar.current}" class="text-input" style="width:65px;" placeholder="Saved">
          <input type="number" id="fund-target-${i}" value="${jar.goal}" class="text-input" style="width:65px;" placeholder="Goal">
        `;
        
        // Listeners for updates
        const nameInput = item.querySelector(`#fund-name-${i}`);
        const currentInput = item.querySelector(`#fund-current-${i}`);
        const targetInput = item.querySelector(`#fund-target-${i}`);

        [nameInput, currentInput, targetInput].forEach(inp => {
          inp.addEventListener('input', () => {
            state.jars[i].name = nameInput.value;
            state.jars[i].current = parseFloat(currentInput.value) || 0;
            state.jars[i].goal = parseFloat(targetInput.value) || 1;
            drawJarsOnDashboard();
            autoSaveState();
          });
        });

        jarBuilderContainer.appendChild(item);
      });
    }
    drawJarsOnDashboard();
  }

  function drawJarsOnDashboard() {
    if (!dashboardJarsGrid) return;
    dashboardJarsGrid.innerHTML = '';
    
    state.jars.forEach((jar, i) => {
      const card = document.createElement('div');
      card.className = 'jar-item-card';
      
      let pct = (jar.current / jar.goal) * 100;
      pct = Math.max(0, Math.min(100, pct)); // clamp 0-100
      
      // Liquid scaling calculation to fit jar boundaries
      const fillHeight = pct * 0.82 + 5; 

      card.innerHTML = `
        <div class="jar-svg-container">
          <div class="jar-liquid-fill" id="jar-fill-${i}" style="height: ${fillHeight}%;"></div>
          <svg class="jar-vector" viewBox="0 0 100 140">
            <path d="M35 15 L65 15 M35 15 C35 15, 30 25, 25 35 C20 45, 20 120, 20 120 C20 128, 28 132, 50 132 C72 132, 80 128, 80 120 C80 120, 80 45, 75 35 C70 25, 65 15, 65 15 M23 118 L77 118" />
            <ellipse cx="50" cy="15" rx="15" ry="3" />
            <ellipse cx="50" cy="22" rx="18" ry="4" />
          </svg>
        </div>
        <div class="jar-labels">
          <span class="jar-label-title" id="jar-title-${i}" contenteditable="${isEditModeActive}">${jar.name}</span>
          <span class="jar-label-metrics" id="jar-metrics-${i}">$${jar.current.toLocaleString()} / $${jar.goal.toLocaleString()}</span>
        </div>
      `;
      dashboardJarsGrid.appendChild(card);
    });
  }

  // Render 12 Month Milestones in Sidebar and Yearly Dashboard
  const roadmapAccordionContainer = document.getElementById('roadmap-accordion-container');
  const dashboardRoadmapGrid = document.getElementById('dashboard-roadmap-grid');

  function renderRoadmap() {
    if (roadmapAccordionContainer) {
      roadmapAccordionContainer.innerHTML = '';
      state.roadmap.forEach((milestone, i) => {
        const group = document.createElement('div');
        group.className = 'form-group';
        group.style.marginBottom = '8px';
        group.innerHTML = `
          <label style="font-size:9px;">${monthsList[i]}</label>
          <input type="text" id="input-roadmap-${i}" value="${milestone}" class="text-input">
        `;
        
        const input = group.querySelector(`#input-roadmap-${i}`);
        input.addEventListener('input', () => {
          state.roadmap[i] = input.value;
          const label = document.getElementById(`roadmap-desc-${i}`);
          if (label) label.textContent = input.value;
          autoSaveState();
        });

        roadmapAccordionContainer.appendChild(group);
      });
    }

    if (dashboardRoadmapGrid) {
      dashboardRoadmapGrid.innerHTML = '';
      state.roadmap.forEach((milestone, i) => {
        const node = document.createElement('div');
        node.className = 'roadmap-node';
        node.innerHTML = `
          <div class="roadmap-node-dot"></div>
          <div class="roadmap-node-card">
            <h5>${monthsList[i]}</h5>
            <p id="roadmap-desc-${i}" contenteditable="${isEditModeActive}">${milestone}</p>
          </div>
        `;
        dashboardRoadmapGrid.appendChild(node);
      });
    }
  }

  // Render 30 Days Grid in Daily Dashboard
  const dashboardDailyGrid = document.getElementById('dashboard-daily-grid');
  const dailyCompletionRatio = document.getElementById('daily-completion-ratio');

  function renderDailyTracker() {
    if (!dashboardDailyGrid) return;
    dashboardDailyGrid.innerHTML = '';

    const heartSvg = `
      <svg class="hp-heart-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;

    for (let i = 1; i <= 30; i++) {
      const tile = document.createElement('div');
      tile.className = 'daily-day-card';
      const dayIndex = i - 1;
      const checked = state.checkedDays[dayIndex];
      const savedAmt = state.daySavings[dayIndex] || state.dailySaveVal;

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
            <span class="box-checkbox daily-nospend-check ${checked ? 'completed' : ''}"></span>
          </div>
          <div class="daily-action-row">
            <span class="daily-save-label">Saved</span>
            <input type="text" class="daily-save-input" value="${savedAmt}">
          </div>
        </div>
      `;

      // HP Hearts behavior
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

      // No Spend Checkbox behavior
      const checkbox = tile.querySelector('.daily-nospend-check');
      checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('completed');
        state.checkedDays[dayIndex] = checkbox.classList.contains('completed');
        updateDailyRatio();
        autoSaveState();
      });

      // Saved input behavior
      const saveInp = tile.querySelector('.daily-save-input');
      saveInp.addEventListener('blur', () => {
        let val = saveInp.value.trim();
        if (val === '') {
          saveInp.value = state.dailySaveVal;
        } else if (!val.startsWith('$')) {
          saveInp.value = '$' + val;
        }
        state.daySavings[dayIndex] = saveInp.value;
        autoSaveState();
      });

      dashboardDailyGrid.appendChild(tile);
    }
    updateDailyRatio();
  }

  function updateDailyRatio() {
    if (!dailyCompletionRatio) return;
    const completedCount = state.checkedDays.filter(Boolean).length;
    dailyCompletionRatio.textContent = `${completedCount} / 30`;
  }

  // Render 52 Weeks Grid in Weekly Dashboard
  const dashboardWeeklyGrid = document.getElementById('dashboard-weekly-grid');
  const weeklyWeeksCountText = document.getElementById('weekly-weeks-count');
  const weeklyTotalSavedText = document.getElementById('weekly-total-saved');
  const weeklyGoalTargetText = document.getElementById('weekly-goal-target');

  function renderWeeklyTracker() {
    if (!dashboardWeeklyGrid) return;
    dashboardWeeklyGrid.innerHTML = '';

    const scheme = state.weeklyStyle;
    const targetVal = state.yearlyTarget;

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
      const parsedList = state.weeklyCustomList.split(',').map(v => parseFloat(v.trim()) || 0);
      for (let i = 1; i <= 52; i++) {
        amounts.push(parsedList[(i - 1) % parsedList.length] || 0);
      }
    }

    const totalCalculatedTarget = amounts.reduce((a, b) => a + b, 0);
    if (weeklyGoalTargetText) {
      weeklyGoalTargetText.textContent = `$${totalCalculatedTarget.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    let checkedCount = 0;
    let totalSaved = 0;

    for (let i = 1; i <= 52; i++) {
      const amt = amounts[i - 1];
      const isChecked = state.checkedWeeks[i - 1];
      
      if (isChecked) {
        checkedCount++;
        totalSaved += amt;
      }

      const box = document.createElement('div');
      box.className = `week-box-item ${isChecked ? 'completed' : ''}`;
      box.setAttribute('data-idx', i - 1);
      box.setAttribute('data-amount', amt);

      box.innerHTML = `
        <div class="box-labels">
          <span class="box-week-num">Week ${i}</span>
          <span class="box-week-amount">$${amt.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <span class="box-checkbox ${isChecked ? 'completed' : ''}"></span>
      `;

      box.addEventListener('click', () => {
        box.classList.toggle('completed');
        const boxCheck = box.querySelector('.box-checkbox');
        boxCheck.classList.toggle('completed');
        
        const idx = parseInt(box.getAttribute('data-idx'));
        state.checkedWeeks[idx] = box.classList.contains('completed');
        
        recalculateWeeklySavings(amounts);
        autoSaveState();
      });

      dashboardWeeklyGrid.appendChild(box);
    }

    if (weeklyWeeksCountText) weeklyWeeksCountText.textContent = `${checkedCount} / 52`;
    if (weeklyTotalSavedText) weeklyTotalSavedText.textContent = `$${totalSaved.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }

  function recalculateWeeklySavings(amounts) {
    let checkedCount = 0;
    let totalSaved = 0;
    state.checkedWeeks.forEach((isChecked, i) => {
      if (isChecked) {
        checkedCount++;
        totalSaved += amounts[i];
      }
    });
    if (weeklyWeeksCountText) weeklyWeeksCountText.textContent = `${checkedCount} / 52`;
    if (weeklyTotalSavedText) weeklyTotalSavedText.textContent = `$${totalSaved.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }

  /* ==========================================================================
     5. Bidirectional Form Inputs Binding (Sidebar -> Preview Pages)
     ========================================================================== */
  
  // Basic Text Inputs
  const ownerInput = document.getElementById('input-owner-name');
  const headerSubtitle = document.getElementById('bind-header-subtitle');
  const largeMonogram = document.getElementById('bind-large-monogram');

  function syncOwnerDetails() {
    if (!ownerInput) return;
    const name = ownerInput.value || "YOUR NAME";
    state.ownerName = name;
    
    // Header text
    if (headerSubtitle) {
      headerSubtitle.textContent = `${name.toLowerCase()} • $${state.yearlyTarget.toLocaleString()} target`;
    }
    // Monogram extract (first letters of first/last word)
    const parts = name.trim().split(/\s+/);
    let mono = "AV";
    if (parts.length >= 2) {
      mono = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length >= 2) {
      mono = parts[0].substring(0, 2).toUpperCase();
    }
    if (largeMonogram) largeMonogram.textContent = mono;
  }

  if (ownerInput) {
    ownerInput.addEventListener('input', () => {
      syncOwnerDetails();
      autoSaveState();
    });
  }

  // Monthly Income
  const incomeInput = document.getElementById('input-monthly-income');
  if (incomeInput) {
    incomeInput.addEventListener('input', () => {
      const val = parseFloat(incomeInput.value.replace(/[^0-9.]/g, '')) || 0;
      state.monthlyIncome = val;
      updateBudgetSplits();
      autoSaveState();
    });
    incomeInput.addEventListener('blur', () => {
      let val = incomeInput.value.trim();
      if (val !== '' && !val.startsWith('$')) {
        incomeInput.value = '$' + parseFloat(val.replace(/[^0-9.]/g, '')).toLocaleString();
      }
    });
  }

  // Yearly Target Goal
  const yearlyTargetInput = document.getElementById('input-yearly-target');
  if (yearlyTargetInput) {
    yearlyTargetInput.addEventListener('input', () => {
      const val = parseFloat(yearlyTargetInput.value.replace(/[^0-9.]/g, '')) || 0;
      state.yearlyTarget = val;
      syncOwnerDetails();
      renderWeeklyTracker();
      autoSaveState();
    });
    yearlyTargetInput.addEventListener('blur', () => {
      let val = yearlyTargetInput.value.trim();
      if (val !== '' && !val.startsWith('$')) {
        yearlyTargetInput.value = '$' + parseFloat(val.replace(/[^0-9.]/g, '')).toLocaleString();
      }
    });
  }

  // Motivation Card
  const motivationInput = document.getElementById('input-yearly-motive');
  const cardMotiveBind = document.getElementById('bind-card-motive');
  if (motivationInput && cardMotiveBind) {
    motivationInput.addEventListener('input', () => {
      state.motivation = motivationInput.value;
      cardMotiveBind.textContent = motivationInput.value;
      autoSaveState();
    });
  }

  // Sliders percentage and circle calculations
  const fixedSlider = document.getElementById('range-fixed-pct');
  const saveSlider = document.getElementById('range-save-pct');
  const flexSlider = document.getElementById('range-flex-pct');

  const fixedText = document.getElementById('val-fixed-pct');
  const saveText = document.getElementById('val-save-pct');
  const flexText = document.getElementById('val-flex-pct');

  const bindFixedPct = document.getElementById('bind-fixed-pct');
  const bindSavePct = document.getElementById('bind-save-pct');
  const bindFlexPct = document.getElementById('bind-flex-pct');

  const cashFixed = document.getElementById('bind-cash-fixed');
  const cashSave = document.getElementById('bind-cash-save');
  const cashFlex = document.getElementById('bind-cash-flex');

  const circleFixed = document.getElementById('circle-fixed');
  const circleSave = document.getElementById('circle-save');
  const circleFlex = document.getElementById('circle-flex');

  const circleCircumference = 263.89; // 2 * pi * 42

  function updateBudgetSplits() {
    if (!fixedSlider || !saveSlider) return;
    const fixed = parseInt(fixedSlider.value);
    const save = parseInt(saveSlider.value);
    
    let flex = 100 - (fixed + save);
    if (flex < 0) {
      flex = 0;
      saveSlider.value = 100 - fixed;
    }
    
    if (flexSlider) flexSlider.value = flex;
    state.fixedPct = fixed;
    state.savePct = parseInt(saveSlider.value);
    state.flexPct = flex;

    // Update form labels
    if (fixedText) fixedText.textContent = `${fixed}%`;
    if (saveText) saveText.textContent = `${saveSlider.value}%`;
    if (flexText) flexText.textContent = `${flex}%`;

    // Update Overview circle labels
    if (bindFixedPct) bindFixedPct.textContent = `${fixed}%`;
    if (bindSavePct) bindSavePct.textContent = `${saveSlider.value}%`;
    if (bindFlexPct) bindFlexPct.textContent = `${flex}%`;

    // Cash amounts
    const fCash = (fixed / 100) * state.monthlyIncome;
    const sCash = (state.savePct / 100) * state.monthlyIncome;
    const flCash = (flex / 100) * state.monthlyIncome;

    const format = (v) => `$${v.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (cashFixed) cashFixed.textContent = format(fCash);
    if (cashSave) cashSave.textContent = format(sCash);
    if (cashFlex) cashFlex.textContent = format(flCash);

    // Circles progress
    if (circleFixed) circleFixed.style.strokeDashoffset = circleCircumference * (1 - fixed / 100);
    if (circleSave) circleSave.style.strokeDashoffset = circleCircumference * (1 - state.savePct / 100);
    if (circleFlex) circleFlex.style.strokeDashoffset = circleCircumference * (1 - flex / 100);
  }

  [fixedSlider, saveSlider].forEach(s => {
    if (s) {
      s.addEventListener('input', () => {
        updateBudgetSplits();
        autoSaveState();
      });
    }
  });

  // Daily/Weekly log customizer defaults
  const dailyHabitDescInp = document.getElementById('input-daily-habit-desc');
  const dailyDescText = document.getElementById('bind-daily-desc');
  if (dailyHabitDescInp && dailyDescText) {
    dailyHabitDescInp.addEventListener('input', () => {
      state.dailyHabitDesc = dailyHabitDescInp.value;
      dailyDescText.textContent = dailyHabitDescInp.value;
      autoSaveState();
    });
  }

  const dailySaveValInp = document.getElementById('input-daily-save-val');
  if (dailySaveValInp) {
    dailySaveValInp.addEventListener('input', () => {
      state.dailySaveVal = dailySaveValInp.value;
      renderDailyTracker();
      autoSaveState();
    });
    dailySaveValInp.addEventListener('blur', () => {
      let val = dailySaveValInp.value.trim();
      if (val !== '' && !val.startsWith('$')) {
        dailySaveValInp.value = '$' + val;
      }
    });
  }

  const weeklyStyleSel = document.getElementById('select-weekly-style');
  const weeklyCustomListInp = document.getElementById('input-weekly-custom-list');
  const groupCustomWeekly = document.getElementById('group-custom-weekly');

  if (weeklyStyleSel) {
    weeklyStyleSel.addEventListener('change', () => {
      state.weeklyStyle = weeklyStyleSel.value;
      if (weeklyStyleSel.value === 'custom') {
        if (groupCustomWeekly) groupCustomWeekly.style.display = 'block';
      } else {
        if (groupCustomWeekly) groupCustomWeekly.style.display = 'none';
      }
      renderWeeklyTracker();
      autoSaveState();
    });
  }

  if (weeklyCustomListInp) {
    weeklyCustomListInp.addEventListener('input', () => {
      state.weeklyCustomList = weeklyCustomListInp.value;
      renderWeeklyTracker();
      autoSaveState();
    });
  }

  /* ==========================================================================
     6. Direct Inline Editing (Bidirectional Sync back to state)
     ========================================================================== */
  const btnEditModeToggle = document.getElementById('btn-edit-mode-toggle');
  let isEditModeActive = false;

  function toggleInlineEditMode() {
    isEditModeActive = !isEditModeActive;
    
    if (isEditModeActive) {
      btnEditModeToggle.classList.add('active');
      btnEditModeToggle.querySelector('span').textContent = 'Direct Edit Mode: On';
      document.body.classList.add('direct-edit-active');
      showToast("Direct Editing Enabled! Double-click text in pages to change.");
    } else {
      btnEditModeToggle.classList.remove('active');
      btnEditModeToggle.querySelector('span').textContent = 'Direct Edit Mode: Off';
      document.body.classList.remove('direct-edit-active');
      showToast("Direct Editing Locked.");
    }

    const editables = document.querySelectorAll('[contenteditable]');
    editables.forEach(el => {
      el.contentEditable = isEditModeActive;
      if (isEditModeActive) {
        el.addEventListener('blur', syncInlineEditToState);
      } else {
        el.removeEventListener('blur', syncInlineEditToState);
      }
    });
  }

  if (btnEditModeToggle) {
    btnEditModeToggle.addEventListener('click', toggleInlineEditMode);
  }

  function syncInlineEditToState(e) {
    const el = e.target;
    const val = el.textContent.trim();
    const id = el.id;

    if (!id) return;

    if (id.startsWith('roadmap-desc-')) {
      const idx = parseInt(id.replace('roadmap-desc-', ''));
      state.roadmap[idx] = val;
      const input = document.getElementById(`input-roadmap-${idx}`);
      if (input) input.value = val;
    } else if (id === 'bind-card-motive') {
      state.motivation = val;
      if (motivationInput) motivationInput.value = val;
    } else if (id === 'bind-daily-desc') {
      state.dailyHabitDesc = val;
      if (dailyHabitDescInp) dailyHabitDescInp.value = val;
    } else if (id.startsWith('jar-title-')) {
      const idx = parseInt(id.replace('jar-title-', ''));
      state.jars[idx].name = val;
      const input = document.getElementById(`fund-name-${idx}`);
      if (input) input.value = val;
    }
    
    autoSaveState();
  }

  /* ==========================================================================
     7. AI Blueprint Advisor Logic
     ========================================================================== */
  const btnGenerateAiPlan = document.getElementById('btn-generate-ai-plan');
  const aiConsoleCard = document.getElementById('ai-console-card');
  const aiTerminalOutput = document.getElementById('ai-terminal-output');
  const btnApplyAiPlan = document.getElementById('btn-apply-ai-plan');

  let generatedBlueprint = null;

  if (btnGenerateAiPlan) {
    btnGenerateAiPlan.addEventListener('click', () => {
      const income = parseFloat(document.getElementById('ai-monthly-income').value) || 4000;
      const targetGoal = parseFloat(document.getElementById('ai-savings-goal').value) || 12000;
      const persona = document.getElementById('ai-savings-persona').value || 'balanced';
      const instructions = document.getElementById('ai-custom-needs').value.trim();

      aiConsoleCard.style.display = 'block';
      aiTerminalOutput.textContent = '';
      btnApplyAiPlan.style.display = 'none';

      // Blueprint computations
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
      } else if (persona === 'extreme') {
        fixedPct = 40;
        savePct = 50;
        flexPct = 10;
      }

      const emergencyJar = Math.round(targetGoal * 0.40);
      const travelJar = Math.round(targetGoal * 0.20);
      const investmentJar = Math.round(targetGoal * 0.25);
      const personalJar = Math.round(targetGoal * 0.15);

      let challengeTopic = "general spends";
      if (instructions !== "") {
        const list = instructions.toLowerCase().split(/\s+/);
        const match = list.find(w => w.length > 4 && !['about', 'should', 'could', 'would', 'travel', 'savings', 'laptop'].includes(w));
        if (match) challengeTopic = match;
      }

      const dailyMicro = savePct >= 50 ? "$10" : "$5";
      const saveMonthlyCash = (savePct / 100) * income;

      let logs = [];
      logs.push(`[SYSTEM] Initializing Aura AI Planner Engine...`);
      logs.push(`[SYSTEM] Parsing income baseline: $${income.toLocaleString()} | Target: $${targetGoal.toLocaleString()}`);
      logs.push(`[ANALYSIS] Required savings rate: $${(targetGoal/12).toFixed(2)}/mo (${((targetGoal/12/income)*100).toFixed(1)}%).`);
      logs.push(`[BUDGET] Allocated splits: Needs ${fixedPct}% | Savings ${savePct}% | Wants ${flexPct}%.`);
      logs.push(`[SINKING FUNDS] Partitioning target savings into 4 core jars:`);
      logs.push(`  - Emergency: $${emergencyJar.toLocaleString()}`);
      logs.push(`  - Travel & Escape: $${travelJar.toLocaleString()}`);
      logs.push(`  - Capital Growth: $${investmentJar.toLocaleString()}`);
      logs.push(`  - Personal Buffer: $${personalJar.toLocaleString()}`);
      logs.push(`[HABITS] Daily focus: Avoid impulse purchases on "${challengeTopic}".`);
      logs.push(`[HABITS] Default Daily Saving target: ${dailyMicro}`);
      logs.push(`[WEEKLY] Recommending ${savePct >= 50 ? 'Double Progressive' : 'Standard Progressive'} challenge style.`);

      let roadmap = [
        `Automate monthly transfers of $${saveMonthlyCash.toLocaleString()} directly to emergency reserves.`,
        `Run a 7-day impulse-budget quest on ${challengeTopic}. Log desire in busters list.`,
        `Re-prioritize subscription packages, saving $35/mo. Move to sinking funds.`,
        `Evaluate Q1 velocity. Check if overall stashed exceeds $${Math.round(targetGoal * 0.25).toLocaleString()}.`,
        `Pre-allocate summer travel resources into Sinking Funds travel jar.`,
        `Mid-year net check. Celebrate wins. Optimize fixed needs targets.`,
        `Sprint month: enforce No-Spend checkboxes on weekend triggers.`,
        `Maintain micro-savings of ${dailyMicro}/day by cooking home meals.`,
        `Audit sinking funds milestone levels. Re-allocate unused balances.`,
        `Log additional holiday budgets separately. Shield core emergency funds.`,
        `Final push! Secure remaining 15% goal velocity.`,
        `Celebrate! Target goal of $${targetGoal.toLocaleString()} achieved successfully.`
      ];
      logs.push(`[ROADMAP] Compiled 12 customized monthly milestones.`);
      logs.push(`[SYSTEM] Plan ready.`);

      generatedBlueprint = {
        income: income,
        yearlyTarget: targetGoal,
        fixedPct: fixedPct,
        savePct: savePct,
        flexPct: flexPct,
        motivation: instructions !== "" ? `Achieve goal while actively lowering ${challengeTopic} expenses` : `Financial Resilience & Future Security`,
        jars: [
          { name: "Emergency Fund", current: Math.round(emergencyJar * 0.1), goal: emergencyJar },
          { name: "Travel & Escape", current: 0, goal: travelJar },
          { name: "Capital Growth", current: 0, goal: investmentJar },
          { name: "Personal Buffer", current: 0, goal: personalJar },
          { name: "Special Rewards", current: 0, goal: Math.round(targetGoal * 0.05) },
          { name: "Reserves Fund", current: 0, goal: Math.round(targetGoal * 0.05) }
        ],
        roadmap: roadmap,
        dailyHabitDesc: `Avoid non-essential spends on ${challengeTopic}. Start with 5 HP. Deduct 1 HP for each trigger spend. Tick No-Spend when clean.`,
        dailySaveVal: dailyMicro,
        weeklyStyle: savePct >= 50 ? "double" : "progressive"
      };

      // Typewriter simulation
      let logIndex = 0;
      let charIndex = 0;
      let text = "";

      function type() {
        if (logIndex < logs.length) {
          const line = logs[logIndex];
          if (charIndex < line.length) {
            text += line[charIndex];
            aiTerminalOutput.textContent = text;
            charIndex++;
            aiTerminalOutput.scrollTop = aiTerminalOutput.scrollHeight;
            setTimeout(type, 3);
          } else {
            text += "\n";
            aiTerminalOutput.textContent = text;
            charIndex = 0;
            logIndex++;
            setTimeout(type, 40);
          }
        } else {
          btnApplyAiPlan.style.display = 'flex';
        }
      }
      type();
    });
  }

  if (btnApplyAiPlan) {
    btnApplyAiPlan.addEventListener('click', () => {
      if (!generatedBlueprint) return;

      // Apply values to inputs & state
      if (ownerInput) {
        ownerInput.value = state.ownerName; 
        syncOwnerDetails();
      }

      state.monthlyIncome = generatedBlueprint.income;
      if (incomeInput) incomeInput.value = `$${generatedBlueprint.income.toLocaleString()}`;

      state.yearlyTarget = generatedBlueprint.yearlyTarget;
      if (yearlyTargetInput) yearlyTargetInput.value = `$${generatedBlueprint.yearlyTarget.toLocaleString()}`;

      state.motivation = generatedBlueprint.motivation;
      if (motivationInput) motivationInput.value = generatedBlueprint.motivation;
      if (cardMotiveBind) cardMotiveBind.textContent = generatedBlueprint.motivation;

      state.fixedPct = generatedBlueprint.fixedPct;
      state.savePct = generatedBlueprint.savePct;
      state.flexPct = generatedBlueprint.flexPct;
      
      if (fixedSlider) fixedSlider.value = generatedBlueprint.fixedPct;
      if (saveSlider) saveSlider.value = generatedBlueprint.savePct;
      updateBudgetSplits();

      state.jars = generatedBlueprint.jars;
      renderSinkingFunds();

      state.roadmap = generatedBlueprint.roadmap;
      renderRoadmap();

      state.dailyHabitDesc = generatedBlueprint.dailyHabitDesc;
      if (dailyHabitDescInp) dailyHabitDescInp.value = generatedBlueprint.dailyHabitDesc;
      if (dailyDescText) dailyDescText.textContent = generatedBlueprint.dailyHabitDesc;

      state.dailySaveVal = generatedBlueprint.dailySaveVal;
      if (dailySaveValInp) dailySaveValInp.value = generatedBlueprint.dailySaveVal;

      state.weeklyStyle = generatedBlueprint.weeklyStyle;
      if (weeklyStyleSel) weeklyStyleSel.value = generatedBlueprint.weeklyStyle;
      
      renderDailyTracker();
      renderWeeklyTracker();

      showToast("AI Planner Blueprint Loaded!");
      autoSaveState();
      
      // Go to overview dashboard
      const overviewTab = document.querySelector('.dash-tab-btn[data-dash="overview"]');
      if (overviewTab) overviewTab.click();
    });
  }

  /* ==========================================================================
     8. Local Storage Save / Load Actions
     ========================================================================== */
  const btnSavePlanner = document.getElementById('btn-save-planner');
  const btnClearPlanner = document.getElementById('btn-clear-planner');
  const btnExportJson = document.getElementById('btn-export-json');
  const inputImportJson = document.getElementById('input-import-json');

  function autoSaveState() {
    localStorage.setItem('aura_savings_state', JSON.stringify(state));
  }

  if (btnSavePlanner) {
    btnSavePlanner.addEventListener('click', () => {
      autoSaveState();
      showToast("All settings saved successfully to browser cache!");
    });
  }

  if (btnClearPlanner) {
    btnClearPlanner.addEventListener('click', () => {
      if (confirm("Are you sure you want to reset all saving records and targets?")) {
        localStorage.removeItem('aura_savings_state');
        location.reload();
      }
    });
  }

  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `aura_savings_planner_${state.ownerName.toLowerCase().replace(/\s+/g, '_')}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Planner Configuration Exported!");
    });
  }

  if (inputImportJson) {
    inputImportJson.addEventListener('change', (e) => {
      const fileReader = new FileReader();
      fileReader.onload = function() {
        try {
          const parsed = JSON.parse(fileReader.result);
          if (parsed && parsed.ownerName) {
            state = parsed;
            autoSaveState();
            location.reload();
          } else {
            alert("Invalid backup JSON file.");
          }
        } catch (err) {
          alert("Error parsing files.");
        }
      };
      if (e.target.files[0]) {
        fileReader.readAsText(e.target.files[0]);
      }
    });
  }

  function loadSavedState() {
    const saved = localStorage.getItem('aura_savings_state');
    if (saved) {
      try {
        state = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage records, using default state.");
      }
    }

    // Populate DOM from state
    if (ownerInput) ownerInput.value = state.ownerName;
    if (incomeInput) incomeInput.value = `$${state.monthlyIncome.toLocaleString()}`;
    if (yearlyTargetInput) yearlyTargetInput.value = `$${state.yearlyTarget.toLocaleString()}`;
    if (motivationInput) motivationInput.value = state.motivation;
    if (cardMotiveBind) cardMotiveBind.textContent = state.motivation;

    if (fixedSlider) fixedSlider.value = state.fixedPct;
    if (saveSlider) saveSlider.value = state.savePct;
    if (flexSlider) flexSlider.value = state.flexPct;

    if (dailyHabitDescInp) dailyHabitDescInp.value = state.dailyHabitDesc;
    if (dailyDescText) dailyDescText.textContent = state.dailyHabitDesc;
    if (dailySaveValInp) dailySaveValInp.value = state.dailySaveVal;

    if (weeklyStyleSel) weeklyStyleSel.value = state.weeklyStyle;
    if (weeklyCustomListInp) weeklyCustomListInp.value = state.weeklyCustomList;

    syncOwnerDetails();
    updateBudgetSplits();
    renderSinkingFunds();
    renderRoadmap();
    renderDailyTracker();
    renderWeeklyTracker();
  }

  // Load state on startup
  loadSavedState();

  // Toast indicator helper
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
