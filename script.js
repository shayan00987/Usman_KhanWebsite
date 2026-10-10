/* Accounting & Business with Usman Khan — interactions */

(() => {
  "use strict";

  /* ---------- Mobile menu ---------- */
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Toggle navigation");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Toggle navigation");
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header shadow after scrolling ---------- */
  const header = document.querySelector(".site-header");

  /* ---------- Active navigation (top nav + mobile tab bar) ---------- */
  const navItems = [...document.querySelectorAll("[data-nav]")];
  const targets = [...new Set(navItems.map((a) => a.getAttribute("href").slice(1)))]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const updateActive = () => {
    if (!targets.length) return;
    const line = window.innerHeight * 0.38;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    let activeIds;
    if (atBottom) {
      activeIds = ["contact"];
    } else {
      // The section whose top has most recently crossed the reading line wins.
      // Sections sharing a row (YouTube + Resources) both count as active.
      const passed = targets.filter((el) => el.getBoundingClientRect().top <= line);
      if (!passed.length) {
        activeIds = [targets[0].id];
      } else {
        const topMost = Math.max(...passed.map((el) => el.getBoundingClientRect().top));
        activeIds = passed
          .filter((el) => Math.abs(el.getBoundingClientRect().top - topMost) < 40)
          .map((el) => el.id);
      }
    }

    navItems.forEach((link) => {
      const active = activeIds.includes(link.getAttribute("href").slice(1));
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      updateActive();
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Testimonials: dots for the swipeable phone layout ---------- */
  const track = document.querySelector("#testimonial-track");
  const dotsWrap = document.querySelector("#testimonial-dots");

  if (track && dotsWrap) {
    const cards = [...track.children];
    const dots = cards.map((card, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show testimonial ${i + 1} of ${cards.length}`);
      dot.addEventListener("click", () => {
        const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        track.scrollTo({ left: card.offsetLeft - pad, behavior: "smooth" });
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    const syncDots = () => {
      const trackLeft = track.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - trackLeft - (parseFloat(getComputedStyle(track).paddingLeft) || 0));
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === best)));
    };

    let dotTick = false;
    track.addEventListener("scroll", () => {
      if (dotTick) return;
      dotTick = true;
      requestAnimationFrame(() => { syncDots(); dotTick = false; });
    }, { passive: true });
    syncDots();
  }
})();
