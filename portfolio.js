const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const revealTargets = document.querySelectorAll(
  ".section-heading, .metric, .expertise-grid article, .role, .project-card, .credentials, .contact-band",
);

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const setActiveLink = () => {
  const activationLine = Math.min(window.innerHeight * 0.36, 320);
  let currentSection = [...document.querySelectorAll("main section[id]")]
    .filter((section) => section.getBoundingClientRect().top <= activationLine)
    .pop();

  if (location.hash) {
    const hashedSection = document.querySelector(location.hash);
    const rect = hashedSection?.getBoundingClientRect();
    if (rect && rect.top >= 0 && rect.top <= activationLine + 80) {
      currentSection = hashedSection;
    }
  }

  navLinks.forEach((link) => {
    const isActive = currentSection && link.hash === `#${currentSection.id}`;
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

setHeaderState();
setActiveLink();

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    requestAnimationFrame(setActiveLink);
    window.setTimeout(setActiveLink, 450);
    window.setTimeout(setActiveLink, 900);
  });
});

window.addEventListener("scroll", () => {
  setHeaderState();
  setActiveLink();
}, { passive: true });

window.addEventListener("hashchange", setActiveLink);
window.addEventListener("resize", setActiveLink);
window.setTimeout(setActiveLink, 300);
