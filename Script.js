document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-navigation");

  const syncNavState = () => {
    if (!navToggle || !nav) return;
    if (window.innerWidth <= 640) {
      nav.classList.add("is-collapsed");
      navToggle.setAttribute("aria-expanded", "false");
    } else {
      nav.classList.remove("is-collapsed");
      navToggle.setAttribute("aria-expanded", "true");
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-collapsed", expanded);
    });

    window.addEventListener("resize", syncNavState);
    syncNavState();
  }
});
