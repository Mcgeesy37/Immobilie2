document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const servicesGrid = document.getElementById("servicesGrid");
  const propertyGrid = document.getElementById("propertyGrid");
  const testimonialGrid = document.getElementById("testimonialGrid");

  const fadeSeqItems = document.querySelectorAll(".fade-seq");
  const baseRevealItems = document.querySelectorAll(".reveal");

  const filterButtons = document.querySelectorAll(".property-filter");

  function setHeaderState() {
    if (!header) return;
    if (window.scrollY > 18) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function setupMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  }

  function runHeroSequence() {
    fadeSeqItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("is-visible");
      }, index * 170 + 120);
    });
  }

  function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const headerOffset = 76;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    });
  }

  function createServiceCard(item, index) {
    const article = document.createElement("article");
    article.className = "service-card reveal";
    article.innerHTML = `
      <span class="service-number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    `;
    return article;
  }

  function createPropertyCard(item, index) {
    const article = document.createElement("article");
    article.className = `property-card reveal ${index === 0 ? "property-large" : ""}`;
    article.dataset.category = item.category;
    article.innerHTML = `
      <img src="${item.image}" alt="${item.alt}">
      <div class="property-overlay">
        <span>${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `;
    return article;
  }

  function createTestimonialCard(item) {
    const article = document.createElement("article");
    article.className = "testimonial-card reveal";
    article.innerHTML = `<p>„${item.text}“</p>`;
    return article;
  }

  function renderContent() {
    const data = window.SITE_DATA;
    if (!data) return;

    if (servicesGrid && Array.isArray(data.services)) {
      servicesGrid.innerHTML = "";
      data.services.forEach((item, index) => {
        servicesGrid.appendChild(createServiceCard(item, index));
      });
    }

    if (propertyGrid && Array.isArray(data.properties)) {
      propertyGrid.innerHTML = "";
      data.properties.forEach((item, index) => {
        propertyGrid.appendChild(createPropertyCard(item, index));
      });
    }

    if (testimonialGrid && Array.isArray(data.testimonials)) {
      testimonialGrid.innerHTML = "";
      data.testimonials.forEach((item) => {
        testimonialGrid.appendChild(createTestimonialCard(item));
      });
    }
  }

  function setupPropertyFilters() {
    if (!propertyGrid || !filterButtons.length) return;

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("is-active"));
        button.classList.add("is-active");

        propertyGrid.querySelectorAll(".property-card").forEach(card => {
          const category = card.dataset.category;
          const shouldShow = filter === "all" || category === filter;

          card.style.display = shouldShow ? "" : "none";
        });
      });
    });
  }

  function setupRevealObserver() {
    const allRevealItems = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      allRevealItems.forEach(el => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    });

    allRevealItems.forEach(el => observer.observe(el));
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  setupMenu();
  setupSmoothAnchors();
  renderContent();
  setupPropertyFilters();
  setupRevealObserver();
  runHeroSequence();

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Diese Premium-Demo enthält noch keine echte Formular-Anbindung.");
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
