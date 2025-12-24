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

  // Delay proactive chat popups to reduce interruption
  const PROACTIVE_DELAY = 12000;
  let proactiveTimeout;
  document.body.classList.add("suppress-proactive");

  const observer = new MutationObserver(() => {
    if (!document.body.classList.contains("suppress-proactive")) return;
    document
      .querySelectorAll('[class*="proactive" i], [data-proactive], [id*="proactive" i]')
      .forEach((el) => {
        el.style.display = "none";
      });
  });

  window.addEventListener("load", () => {
    observer.observe(document.body, { childList: true, subtree: true });
    proactiveTimeout = window.setTimeout(() => {
      document.body.classList.remove("suppress-proactive");
      observer.disconnect();
    }, PROACTIVE_DELAY);
  });

  window.addEventListener("beforeunload", () => {
    window.clearTimeout(proactiveTimeout);
    observer.disconnect();
  });
});
