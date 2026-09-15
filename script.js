const recruiterIntro =
  "I'm Vasanth, a Java Backend Developer with hands-on experience supporting production systems and working with Java, Spring Boot, REST APIs, microservices, and SQL. I'm also building practical skills in Python, GCP, and serverless systems. I bring careful debugging, clear incident communication, and ownership from issue discovery through resolution.";

const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2200);
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
    showToast(copied ? "Introduction copied" : "Copy unavailable in this browser");
  }
}

document.querySelector("#copy-intro").addEventListener("click", copyIntro);
document.querySelector("#copy-intro-bottom").addEventListener("click", copyIntro);


const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
  revealObserver.observe(element);
});

const motionButton = document.querySelector('.motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
function setMotion() {
 document.documentElement.classList.toggle('motion-paused', paused);
 motionButton.setAttribute('aria-pressed', String(paused));
 motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
}
setMotion();
motionButton.addEventListener('click', () => { paused = !paused; setMotion(); });
const progress = document.querySelector('.scroll-progress');
let scrollQueued = false;
function updateProgress() {
 const range = document.documentElement.scrollHeight - window.innerHeight;
 progress.style.width = (range > 0 ? window.scrollY / range * 100 : 0) + '%';
 scrollQueued = false;
}
window.addEventListener('scroll', () => {
 if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateProgress); }
}, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();
