alert("Welcome to Archisha's Website!");

window.onload = () => {
  // Dark Mode toggle function
  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
  };

  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let lastMouse = null;

  document.addEventListener("mousemove", (e) => {
    const currentMouse = { x: e.clientX, y: e.clientY };

    if (lastMouse) {
      const dx = currentMouse.x - lastMouse.x;
      const dy = currentMouse.y - lastMouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Add particles along the line between last and current
      const steps = Math.floor(distance / 5); // smaller step = smoother line

      for (let i = 0; i < steps; i++) {
        const x = lastMouse.x + (dx * i) / steps;
        const y = lastMouse.y + (dy * i) / steps;

        particles.push({
          x,
          y,
          radius: Math.random() * 3 + 1.5,
          alpha: 1,
          color: getRandomColor()
        });
      }
    }

    lastMouse = currentMouse;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRGBA(p.color, p.alpha);
      ctx.fill();
      p.alpha -= 0.01;
      if (p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function getRandomColor() {
    const colors = ['#ff6ec7', '#7f5af0', '#5eead4', '#facc15'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
};
