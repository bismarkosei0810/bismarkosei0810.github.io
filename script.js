// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  const hidden = mobileNav.hasAttribute("hidden");
  if (hidden) {
    mobileNav.removeAttribute("hidden");
    menuBtn.setAttribute("aria-expanded", "true");
  } else {
    mobileNav.setAttribute("hidden", "");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Contact form -> mailto (GitHub Pages friendly)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:bismarkosei0810@gmail.com?subject=${subject}&body=${body}`;
});

// Subtle canvas background (professional, not childish)
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let w = 0, h = 0;
function resize() {
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", () => {
  resize();
  initDots();
});

const dots = [];
const DOTS = 56;

function initDots() {
  dots.length = 0;
  for (let i = 0; i < DOTS; i++) {
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 2
    });
  }
}

function loop() {
  if (!w || !h) return requestAnimationFrame(loop);

  ctx.clearRect(0, 0, w, h);

  // soft overlay
  ctx.fillStyle = "rgba(7, 10, 16, 0.42)";
  ctx.fillRect(0, 0, w, h);

  for (const d of dots) {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < -30) d.x = w + 30;
    if (d.x > w + 30) d.x = -30;
    if (d.y < -30) d.y = h + 30;
    if (d.y > h + 30) d.y = -30;
  }

  // lines
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i], b = dots[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const alpha = 1 - dist / 150;
        ctx.strokeStyle = `rgba(255,255,255,${0.08 * alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // dots
  for (const d of dots) {
    ctx.fillStyle = "rgba(255,255,255,0.70)";
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(loop);
}

resize();
initDots();
loop();
