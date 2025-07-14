alert("Welcome to Archisha's Website!");
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
  const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

document.addEventListener("mousemove", (e) => {
  particles.push({ x: e.clientX, y: e.clientY, alpha: 1 });
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(127, 90, 240, ${p.alpha})`;
    ctx.fill();
    p.alpha -= 0.02;
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(draw);
}
draw();

