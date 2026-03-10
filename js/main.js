/* ============================================
   Downhill MTB Europe — Main JavaScript
   ============================================ */

(function () {
  "use strict";

  // --- Scroll Animations (Intersection Observer) ---
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    scrollObserver.observe(el);
  });

  // --- Nav Scroll Effect ---
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.classList.toggle("nav-scrolled", window.scrollY > 50);
      },
      { passive: true }
    );
  }

  // --- Active Nav Link ---
  const currentPath = window.location.pathname;
  document.querySelectorAll("nav a[href]").forEach((link) => {
    const resolved = new URL(link.getAttribute("href"), window.location.href).pathname;
    if (
      resolved === currentPath ||
      (resolved !== "/" && currentPath.startsWith(resolved))
    ) {
      link.classList.add("text-accent");
    }
  });

  // --- Mobile Hamburger ---
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", mobileNav.classList.contains("open"));
    });
  }

  // --- Parallax Scroll ---
  const parallaxElements = document.querySelectorAll(".parallax-hero");
  if (parallaxElements.length > 0) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY;
        parallaxElements.forEach((el) => {
          el.style.backgroundPositionY = scrolled * 0.5 + "px";
        });
      },
      { passive: true }
    );
  }

  // --- Stat Counter Animation ---
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const duration = 2000;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function formatNumber(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(easedProgress * target);
      el.textContent = prefix + formatNumber(current) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-number[data-target]").forEach((el) => {
    statObserver.observe(el);
  });

  // --- Location Filtering ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const locationCards = document.querySelectorAll("[data-country][data-difficulty]");

  if (filterBtns.length > 0 && locationCards.length > 0) {
    const activeFilters = { country: "all", difficulty: "all" };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.closest(".filter-group");
        const filterType = group ? group.dataset.type : null;
        const filterValue = btn.dataset.filter;

        if (filterType) {
          group.querySelectorAll(".filter-btn").forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
          btn.classList.add("active");
          btn.setAttribute("aria-pressed", "true");
          activeFilters[filterType] = filterValue;
        }

        locationCards.forEach((card) => {
          const matchCountry =
            activeFilters.country === "all" ||
            card.dataset.country === activeFilters.country;
          const matchDifficulty =
            activeFilters.difficulty === "all" ||
            card.dataset.difficulty === activeFilters.difficulty;

          if (matchCountry && matchDifficulty) {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            card.style.display = "";
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
              });
            });
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // --- Accordion Toggles ---
  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      const group = trigger.closest(".accordion-group");

      // Close others in same group
      if (group) {
        group.querySelectorAll(".accordion-trigger").forEach((otherTrigger) => {
          if (otherTrigger !== trigger) {
            otherTrigger.classList.remove("open");
            otherTrigger.setAttribute("aria-expanded", "false");
            otherTrigger.nextElementSibling?.classList.remove("open");
          }
        });
      }

      trigger.classList.toggle("open");
      content?.classList.toggle("open");
      trigger.setAttribute("aria-expanded", trigger.classList.contains("open"));
    });
  });

  // --- Page Transitions ---
  const transitionOverlay = document.querySelector(".page-transition");
  if (transitionOverlay) {
    // Fade in on load
    document.addEventListener("DOMContentLoaded", () => {
      transitionOverlay.classList.remove("active");
    });
    // Remove active immediately if already loaded
    transitionOverlay.classList.remove("active");

    let isNavigating = false;
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("http") &&
        !href.startsWith("mailto")
      ) {
        link.addEventListener("click", (e) => {
          if (isNavigating) return;
          e.preventDefault();
          isNavigating = true;
          transitionOverlay.classList.add("active");
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        });
      }
    });
  }

  // --- Scroll Progress Bar ---
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + "%";
      },
      { passive: true }
    );
  }

  // --- Hero Cursor Glow ---
  document.querySelectorAll(".parallax-hero").forEach((hero) => {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mouse-x", x + "%");
      hero.style.setProperty("--mouse-y", y + "%");
    });
  });

  // --- Image Error Fallback ---
  document.querySelectorAll(".card-image, img").forEach((el) => {
    const handleError = () => {
      el.classList.add("img-fallback");
      if (el.tagName === "IMG") {
        el.style.display = "none";
        const fallback = document.createElement("div");
        fallback.className = "img-fallback absolute inset-0";
        el.parentElement?.appendChild(fallback);
      } else {
        el.style.backgroundImage = "none";
      }
    };

    if (el.tagName === "IMG") {
      el.addEventListener("error", handleError);
    } else {
      // For background-image divs, try loading the image
      const bg = getComputedStyle(el).backgroundImage;
      const urlMatch = bg.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = new Image();
        img.onerror = handleError;
        img.src = urlMatch[1];
      }
    }
  });
})();
