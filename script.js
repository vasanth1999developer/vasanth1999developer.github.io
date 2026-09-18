const recruiterIntro =
  "I'm Vasanth, a Java Backend Developer with hands-on experience supporting production systems and working with Java, Spring Boot, REST APIs, microservices, and SQL. I'm also building practical skills in Python, GCP, and serverless systems. I bring careful debugging, clear incident communication, and ownership from issue discovery through resolution.";

const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

async function copyIntro() {
  try {
    await navigator.clipboard.writeText(recruiterIntro);
    showToast("Introduction copied");
  } catch {
    const helper = document.createElement("textarea");

    helper.value = recruiterIntro;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";

    document.body.appendChild(helper);
    helper.select();

    const copied = document.execCommand("copy");
    helper.remove();

    showToast(
      copied
        ? "Introduction copied"
        : "Copy unavailable in this browser"
    );
  }
}

/* Copy-introduction buttons */

const copyIntroTop = document.querySelector("#copy-intro");
const copyIntroBottom = document.querySelector("#copy-intro-bottom");

copyIntroTop?.addEventListener("click", copyIntro);
copyIntroBottom?.addEventListener("click", copyIntro);

/* Reveal elements while scrolling */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay =
      `${Math.min(index * 50, 200)}ms`;

    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* Motion controls */

const motionButton = document.querySelector(".motion-toggle");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const phoneMotion = window.matchMedia(
  "(max-width: 700px), (pointer: coarse)"
);

/*
 * Animations are paused by default when:
 * 1. The user prefers reduced motion.
 * 2. The website is opened on a phone or touch device.
 */
let paused = reducedMotion.matches || phoneMotion.matches;
let motionChoiceMade = false;

function setMotion() {
  document.documentElement.classList.toggle(
    "motion-paused",
    paused
  );

  if (!motionButton) return;

  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.textContent = paused
    ? "Resume motion"
    : "Pause motion";
}

setMotion();

motionButton?.addEventListener("click", () => {
  motionChoiceMade = true;
  paused = !paused;
  setMotion();
});

/*
 * Automatically update motion when the screen size changes,
 * unless the visitor already selected a motion preference.
 */
phoneMotion.addEventListener("change", (event) => {
  if (!motionChoiceMade) {
    paused = reducedMotion.matches || event.matches;
    setMotion();
  }
});

reducedMotion.addEventListener("change", (event) => {
  if (!motionChoiceMade) {
    paused = event.matches || phoneMotion.matches;
    setMotion();
  }
});

/* Page scroll-progress indicator */

const progress = document.querySelector(".scroll-progress");
let scrollQueued = false;

function updateProgress() {
  if (!progress) return;

  const scrollRange =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const scrollPercentage =
    scrollRange > 0
      ? (window.scrollY / scrollRange) * 100
      : 0;

  progress.style.width =
    `${Math.min(Math.max(scrollPercentage, 0), 100)}%`;

  scrollQueued = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateProgress);
    }
  },
  { passive: true }
);

window.addEventListener("resize", updateProgress);

updateProgress();
