document.addEventListener("DOMContentLoaded", () => {
  const cursorGlow = document.getElementById("cursorGlow");
  const heroLight = document.getElementById("heroLight");
  const heroImage = document.querySelector(".hero-img");

  if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
      cursorGlow.style.opacity = "0.72";
    });
  }

  if (heroLight) {
    document.addEventListener("mousemove", (e) => {
      heroLight.style.left = `${e.clientX}px`;
      heroLight.style.top = `${e.clientY}px`;
    });
  }

  let ticking = false;

  function runScrollEffects() {
    const y = window.scrollY || window.pageYOffset;

    if (heroImage && window.innerWidth > 860) {
      const offset = Math.min(y * 0.05, 30);
      heroImage.style.transform = `scale(1.04) translateY(${offset}px)`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(runScrollEffects);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", runScrollEffects);
  runScrollEffects();
});
