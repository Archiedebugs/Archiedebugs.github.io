alert("Welcome to Archisha's Website!");

window.onload = () => {
  // Dark mode toggle
  window.toggleDarkMode = function () {
    document.body.classList.toggle("dark-mode");
  };

  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  document.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        alpha: 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.015;
      p.radius *= 0.97;

      if (p.alpha <= 0.01 || p.radius <= 0.3) {
        particles.splice(i, 1);
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};
