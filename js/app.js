// Basic interactivity for ScholarMatch
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profile-form');
  const results = document.getElementById('results');
  const saveBtn = document.getElementById('save-profile');

  function renderMatches(data) {
    // Very small mocked matching logic for demo
    const level = data.level;
    let html = '';
    if (level === 'university') {
      html += '<div class="card">\n  <h4>University Merit Scholarship</h4>\n  <p>Matches: merit-based awards at universities.</p>\n</div>';
    } else if (level === 'postsec') {
      html += '<div class="card">\n  <h4>Polytechnic Bursary</h4>\n  <p>Matches: need-based bursaries for polytechnic students.</p>\n</div>';
    } else {
      html += '<div class="card">\n  <h4>Local Study Award</h4>\n  <p>Matches: community and school-level awards.</p>\n</div>';
    }
    results.innerHTML = html;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      level: form.level.value,
      gpa: form.gpa.value,
      income: form.income.value
    };
    renderMatches(data);
  });

  saveBtn.addEventListener('click', () => {
    const profile = {
      level: form.level.value,
      gpa: form.gpa.value,
      income: form.income.value
    };
    try {
      localStorage.setItem('scholarmatch_profile', JSON.stringify(profile));
      saveBtn.textContent = 'Saved!';
      setTimeout(() => (saveBtn.textContent = 'Save profile'), 1500);
    } catch (err) {
      console.error('Failed to save profile', err);
    }
  });

  // Load saved profile if present
  try {
    const saved = localStorage.getItem('scholarmatch_profile');
    if (saved) {
      const p = JSON.parse(saved);
      if (p.level) form.level.value = p.level;
      if (p.gpa) form.gpa.value = p.gpa;
      if (p.income) form.income.value = p.income;
    }
  } catch (err) {
    // ignore
  }
});
