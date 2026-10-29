/**
 * =========================================================================
 * BHANU SRI DAMISETTY - PORTFOLIO APPLICATION CORE (app.js)
 * =========================================================================
 * 
 * Handles dynamic rendering from data.js, theme toggling, project filtering,
 * interactive modals, live search, and smooth UX interactions.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('Portfolio data not loaded. Check js/data.js.');
    return;
  }

  // 1. Initialize Theme (Dark/Light)
  initTheme();

  // 2. Render Page Content from data.js
  renderHero(data.personal);
  renderAbout(data.about);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderCertificates(data.certificates);
  renderContact(data.contact, data.personal);

  // 3. Setup Interactive Components
  initTypewriter(data.personal.rotatingRoles);
  initProjectFilteringAndSearch(data.projects);
  initCertFiltering(data.certificates);
  initModals();
  initScrollFeatures();
  initMobileNav();
  initContactForm(data.personal.email);
});

/* --------------------------------------------------------------------------
   THEME TOGGLE & PERSISTENCE
   -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('bhanu_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme');
      const next = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('bhanu_portfolio_theme', next);
      updateThemeIcon(toggleBtn, next);
      showToast(`Switched to ${next} mode`);
    });
  }
}

function updateThemeIcon(btn, theme) {
  if (!btn) return;
  btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

/* --------------------------------------------------------------------------
   HERO SECTION RENDERER & TYPEWRITER
   -------------------------------------------------------------------------- */
function renderHero(personal) {
  if (!personal) return;

  const titleEl = document.getElementById('hero-title');
  if (titleEl) {
    titleEl.innerHTML = `Hi, I'm <br><span class="gradient-text">${personal.shortName || personal.name}.</span>`;
  }

  const bioEl = document.getElementById('hero-bio');
  if (bioEl) bioEl.textContent = personal.heroBio;

  const photoEl = document.getElementById('hero-photo');
  if (photoEl) {
    photoEl.src = personal.avatar || 'my-photo.jpg';
    photoEl.alt = personal.name;
    photoEl.onerror = function() {
      this.src = 'my-photo.jpg';
      this.onerror = function() {
        this.style.display = 'none';
        const fallback = document.getElementById('photo-fallback');
        if (fallback) fallback.style.display = 'flex';
      };
    };
  }

  // Social Links
  const socialsContainer = document.getElementById('hero-socials');
  if (socialsContainer && personal.socials) {
    socialsContainer.innerHTML = `
      <a href="${personal.socials.github}" target="_blank" rel="noopener noreferrer" class="social-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        GitHub ↗
      </a>
      <a href="${personal.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        LinkedIn ↗
      </a>
      <button class="social-link" id="copy-email-hero-btn" title="Click to copy email">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Copy Email 📋
      </button>
    `;

    const copyBtn = document.getElementById('copy-email-hero-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(personal.email).then(() => {
          showToast('Email copied to clipboard! 📋');
        }).catch(() => {
          window.location.href = `mailto:${personal.email}`;
        });
      });
    }
  }

  // Stats Banner
  const statsContainer = document.getElementById('stats-banner');
  if (statsContainer && personal.stats) {
    statsContainer.innerHTML = personal.stats.map(stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');
  }
}

function initTypewriter(roles) {
  const el = document.getElementById('typewriter');
  if (!el || !roles || !roles.length) return;

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseTime = 1800;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      charIdx--;
      el.textContent = current.substring(0, charIdx);
    } else {
      charIdx++;
      el.textContent = current.substring(0, charIdx);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 300;
    }

    setTimeout(type, delay);
  }

  type();
}

/* --------------------------------------------------------------------------
   ABOUT SECTION RENDERER
   -------------------------------------------------------------------------- */
function renderAbout(about) {
  if (!about) return;

  const storyContainer = document.getElementById('about-story');
  if (storyContainer && about.paragraphs) {
    storyContainer.innerHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');
  }

  const pillarsContainer = document.getElementById('about-pillars');
  if (pillarsContainer && about.keyPillars) {
    pillarsContainer.innerHTML = about.keyPillars.map(pillar => `
      <div class="pillar-item">
        <div class="pillar-icon">${pillar.icon}</div>
        <div class="pillar-content">
          <strong>${pillar.title}</strong>
          <p>${pillar.description}</p>
        </div>
      </div>
    `).join('');
  }

  const eduContainer = document.getElementById('about-education');
  if (eduContainer && about.education) {
    eduContainer.innerHTML = `
      <div class="education-box">
        <h3>Academic Background</h3>
        ${about.education.map(edu => `
          <div class="edu-item">
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-school">${edu.institution} · <span>${edu.period}</span></div>
            <div class="edu-desc">${edu.details}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

/* --------------------------------------------------------------------------
   SKILLS SECTION RENDERER
   -------------------------------------------------------------------------- */
function renderSkills(skillsData) {
  const container = document.getElementById('skills-grid');
  if (!container || !skillsData || !skillsData.categories) return;

  container.innerHTML = skillsData.categories.map(cat => `
    <article class="skill-category-card">
      <div class="category-header">
        <div class="category-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
      </div>
      <div class="skill-badges-container">
        ${cat.skills.map(s => `
          <span class="skill-pill" title="Proficiency: ${s.level}">
            <span class="skill-pill-icon">${s.icon}</span>
            <span>${s.name}</span>
          </span>
        `).join('')}
      </div>
    </article>
  `).join('');
}

/* --------------------------------------------------------------------------
   PROJECTS SECTION & SEARCH/FILTER
   -------------------------------------------------------------------------- */
let activeProjectCategory = 'all';
let projectSearchQuery = '';

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid || !projects) return;

  const filtered = projects.filter(p => {
    const matchesCat = activeProjectCategory === 'all' || p.category === activeProjectCategory;
    const q = projectSearchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
    return matchesCat && matchesQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>No projects match your search</h3>
        <p style="margin-top: 8px;">Try clearing your search query or selecting "All Categories".</p>
        <button class="btn btn-secondary btn-sm" id="reset-filter-btn" style="margin-top: 16px;">Reset Filter</button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeProjectCategory = 'all';
        projectSearchQuery = '';
        const searchInput = document.getElementById('project-search');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.category === 'all');
        });
        renderProjects(projects);
      });
    }
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="project-card" data-project-id="${p.id}">
      <div class="project-top">
        <div class="project-icon-wrapper">${p.icon || '💼'}</div>
        ${p.badge ? `<span class="badge">${p.badge}</span>` : `<span class="project-tag">${p.category.toUpperCase()}</span>`}
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-tagline">${p.tagline}</p>

      <div class="project-tags">
        ${p.tags.slice(0, 4).map(t => `<span class="project-tag">${t}</span>`).join('')}
        ${p.tags.length > 4 ? `<span class="project-tag">+${p.tags.length - 4}</span>` : ''}
      </div>

      ${p.highlights && p.highlights.length ? `
        <ul class="project-highlights-preview">
          ${p.highlights.slice(0, 2).map(h => `<li><span>✓</span> ${h}</li>`).join('')}
        </ul>
      ` : ''}

      <div class="project-footer">
        <button class="btn btn-secondary btn-sm view-project-details-btn" data-id="${p.id}">
          Details & Architecture ↗
        </button>
        <div class="project-links">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="action-link" title="Source Code">GitHub ↗</a>` : ''}
          ${p.demo && p.demo !== '#' ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="action-link" title="Live Preview">Demo ↗</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Attach modal trigger listeners
  grid.querySelectorAll('.view-project-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = projects.find(item => item.id === btn.dataset.id);
      if (proj) openProjectModal(proj);
    });
  });
}

function initProjectFilteringAndSearch(projects) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeProjectCategory = btn.dataset.category || 'all';
      renderProjects(projects);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      projectSearchQuery = e.target.value;
      renderProjects(projects);
    });
  }
}

/* --------------------------------------------------------------------------
   CERTIFICATES SECTION & FILTER
   -------------------------------------------------------------------------- */
let activeCertCategory = 'all';

function renderCertificates(certs) {
  const grid = document.getElementById('certificates-grid');
  if (!grid || !certs) return;

  const filtered = certs.filter(c => {
    return activeCertCategory === 'all' || c.category === activeCertCategory;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        <h3>No certificates found in this category</h3>
        <p style="margin-top: 8px;">Switch category to "All" to view all credentials.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(c => `
    <article class="cert-card">
      <div class="cert-header">
        <div class="cert-icon">${c.icon || '📜'}</div>
        <div class="cert-meta">
          <h3 class="cert-title">${c.title}</h3>
          <div class="cert-issuer">
            <span>${c.issuer}</span> · <span class="cert-date">${c.date}</span>
          </div>
        </div>
      </div>
      <p class="cert-desc">${c.description}</p>
      <div class="cert-footer">
        <div class="cert-skills">
          ${c.skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join('')}
        </div>
        ${c.credentialUrl ? `
          <a href="${c.credentialUrl}" target="_blank" rel="noopener noreferrer" class="action-link" style="white-space: nowrap;">
            Verify ↗
          </a>
        ` : ''}
      </div>
    </article>
  `).join('');
}

function initCertFiltering(certs) {
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCertCategory = btn.dataset.certCategory || 'all';
      renderCertificates(certs);
    });
  });
}

/* --------------------------------------------------------------------------
   MODALS (PROJECT DETAILS & RESUME PREVIEW)
   -------------------------------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Resume trigger buttons
  document.querySelectorAll('.resume-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });
}

function openProjectModal(p) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
      <div class="project-icon-wrapper" style="font-size: 1.8rem; width: 56px; height: 56px;">${p.icon || '🚀'}</div>
      <div>
        <h2 style="font-size: 1.5rem; margin: 0; letter-spacing: -0.02em;">${p.title}</h2>
        <span class="badge" style="margin-top: 6px;">${p.category.toUpperCase()}</span>
      </div>
    </div>

    <p style="font-size: 1.05rem; color: var(--text-primary); font-weight: 500; margin-bottom: 18px; line-height: 1.6;">
      ${p.tagline}
    </p>

    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 1.02rem; margin-bottom: 8px; color: var(--accent-primary);">Overview & Architecture</h3>
      <p style="color: var(--text-secondary); line-height: 1.65;">${p.description}</p>
    </div>

    ${p.highlights && p.highlights.length ? `
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.02rem; margin-bottom: 10px; color: var(--accent-primary);">Key Architectural Highlights</h3>
        <ul style="list-style: none; display: grid; gap: 8px; padding-left: 0;">
          ${p.highlights.map(h => `
            <li style="display: flex; gap: 10px; font-size: 0.92rem; color: var(--text-secondary);">
              <span style="color: var(--accent-primary); font-weight: bold;">✔</span> ${h}
            </li>
          `).join('')}
        </ul>
      </div>
    ` : ''}

    <div style="margin-bottom: 28px;">
      <h3 style="font-size: 1.02rem; margin-bottom: 10px; color: var(--accent-primary);">Technologies Applied</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${p.tags.map(t => `<span class="skill-pill" style="padding: 5px 12px; font-size: 0.82rem;">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 18px; border-top: 1px solid var(--surface-border);">
      ${p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          View Repository on GitHub ↗
        </a>
      ` : ''}
      ${p.demo && p.demo !== '#' ? `
        <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          Live Project Demo ↗
        </a>
      ` : ''}
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close</button>
    </div>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openResumeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  if (!modalOverlay || !modalBody) return;

  const data = window.PORTFOLIO_DATA;
  const p = data.personal;

  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px;">
      <div>
        <h2 style="font-size: 1.6rem; margin: 0;">${p.name}</h2>
        <p style="color: var(--accent-primary); font-weight: 600; margin-top: 4px;">${p.title}</p>
        <p style="color: var(--text-muted); font-size: 0.88rem;">${p.location} · ${p.email}</p>
      </div>
      <a href="${p.socials.resumePdf}" download class="btn btn-primary btn-sm" id="download-pdf-btn">
        Download PDF ⬇
      </a>
    </div>

    <div style="background: var(--surface-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--surface-border); margin-bottom: 20px; font-size: 0.85rem; color: var(--text-secondary);">
      💡 <strong>Pro Tip:</strong> To enable direct 1-click PDF download, place your compiled PDF as <code>resume.pdf</code> inside the portfolio root folder!
    </div>

    <div style="display: grid; gap: 20px;">
      <div>
        <h3 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-primary); border-bottom: 1px solid var(--surface-border); padding-bottom: 6px; margin-bottom: 10px;">Education</h3>
        ${data.about.education.map(e => `
          <div>
            <strong>${e.degree}</strong>
            <div style="font-size: 0.86rem; color: var(--text-muted);">${e.institution} (${e.period})</div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 4px;">${e.details}</p>
          </div>
        `).join('')}
      </div>

      <div>
        <h3 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-primary); border-bottom: 1px solid var(--surface-border); padding-bottom: 6px; margin-bottom: 10px;">Core Engineering Competencies</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
          <strong>Languages:</strong> Python, JavaScript (ES6+), Java, SQL, HTML5/CSS3<br>
          <strong>Frameworks & AI:</strong> FastAPI, Flask, Gemini Multimodal API, Prompt Engineering, REST APIs<br>
          <strong>Tools & Systems:</strong> Git, GitHub, VS Code, Postman, Linux/Powershell, PWA
        </p>
      </div>

      <div>
        <h3 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-primary); border-bottom: 1px solid var(--surface-border); padding-bottom: 6px; margin-bottom: 10px;">Featured Project Portfolio</h3>
        ${data.projects.slice(0, 3).map(proj => `
          <div style="margin-bottom: 12px;">
            <strong>${proj.title}</strong>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 2px 0;">${proj.tagline}</p>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Tech: ${proj.tags.join(', ')}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="margin-top: 24px; text-align: right;">
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">Close</button>
    </div>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Expose closeModal globally for inline onclick handlers
window.closeModal = closeModal;

/* --------------------------------------------------------------------------
   CONTACT SECTION & FORM HANDLING
   -------------------------------------------------------------------------- */
function renderContact(contactData, personal) {
  if (!contactData) return;

  const emailEl = document.getElementById('contact-email-text');
  if (emailEl) emailEl.textContent = contactData.directEmail || personal.email;

  const locEl = document.getElementById('contact-loc-text');
  if (locEl) locEl.textContent = contactData.location || personal.location;

  const copyBtn = document.getElementById('copy-email-contact-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = contactData.directEmail || personal.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard! 📋');
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }
}

function initContactForm(recipientEmail) {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Compose mailto URL
    const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const mailtoUrl = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Open default mail client
    window.location.href = mailtoUrl;
    showToast('Launching your email client...');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   SCROLL FEATURES: PROGRESS BAR, BACK-TO-TOP & ACTIVE NAV
   -------------------------------------------------------------------------- */
function initScrollFeatures() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Progress bar
    if (progressBar && scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Navigation Highlight
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    menuBtn.classList.toggle('open', !isOpen);
  });

  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
