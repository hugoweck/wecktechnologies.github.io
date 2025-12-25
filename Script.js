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

  const loadWidgetSafely = () => {
    const widgetUrl =
      "https://www.buildmyagent.io/widget/69459a678e2cd71269963057/widget-professional.js?widgetId=69459a678e2cd71269963057";
    if (!document.body?.dataset?.enableWidget) return;

    const originalWrite = document.write;
    const originalWriteln = document.writeln;
    const originalOpen = document.open;

    const restoreDocumentStream = () => {
      document.write = originalWrite;
      document.writeln = originalWriteln;
      document.open = originalOpen;
    };

    const script = document.createElement("script");
    script.src = widgetUrl;
    script.async = true;

    const stopSafetyNet = window.setTimeout(() => {
      restoreDocumentStream();
    }, 4000);

    const handleWidgetComplete = () => {
      restoreDocumentStream();
      window.clearTimeout(stopSafetyNet);
      document.documentElement.classList.add("force-visible");
      document.body.classList.add("force-visible");
    };

    const blockWrite = (reason) => {
      return (...args) => {
        console.warn(`Blocked document.${reason} from third-party widget`, args);
      };
    };

    document.write = blockWrite("write");
    document.writeln = blockWrite("writeln");
    document.open = blockWrite("open");

    script.addEventListener("load", handleWidgetComplete, { once: true });
    script.addEventListener("error", handleWidgetComplete, { once: true });

    document.body.appendChild(script);
  };

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

  window.addEventListener("load", loadWidgetSafely, { once: true });
});
