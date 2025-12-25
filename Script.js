document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-navigation");
  const header = document.querySelector(".top-header");
  const hero = document.querySelector(".hero");

  let lastScrollY = window.scrollY;
  let ticking = false;

  const syncNavState = () => {
    if (!navToggle || !nav) return;
    if (window.innerWidth <= 640) {
      nav.classList.add("is-collapsed");
      navToggle.setAttribute("aria-expanded", "false");
    } else {
      nav.classList.remove("is-collapsed");
      navToggle.setAttribute("aria-expanded", "true");
    }
    if (header) header.classList.remove("is-hidden");
  };

  const updateHeaderState = () => {
    if (!header) return;

    const currentY = window.scrollY;
    const headerHeight = header.offsetHeight || 0;
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    header.classList.add("is-overlay");
    header.classList.remove("is-solid");

    const isMobile = window.innerWidth <= 640;
    const navOpen = isMobile && nav && !nav.classList.contains("is-collapsed");
    const scrollingDown = currentY - lastScrollY > 6;
    const scrollingUp = lastScrollY - currentY > 6;

    if (scrollingDown && currentY > headerHeight * 1.2 && !navOpen) {
      header.classList.add("is-hidden");
    } else if (scrollingUp || currentY <= headerHeight) {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentY;
    ticking = false;
  };

  const requestHeaderUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-collapsed", expanded);
      if (header) header.classList.remove("is-hidden");
    });

    window.addEventListener("resize", syncNavState);
    syncNavState();
  }

  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  window.addEventListener("resize", requestHeaderUpdate);
  updateHeaderState();
});
