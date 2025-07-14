alert("Welcome to Archisha's Website!");

window.onload = () => {
  // Dark mode toggle
  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
  };

  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  let trails = [];
  let lastMouse = null;

  document.addEventListener("mousemove", (e) => {
    const point = { x: e.clientX, y: e.clientY, alpha: 1 };
    if (lastMouse) {
      trails.push({ from: { ...lastMouse }, to: { ...point } });
    }
    lastMouse = point;
  });

  function animate() {
    // Clear only the canvas layer, not the background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw trails
    trails.forEach((trail, i) => {
      ctx.beginPath();
      ctx.moveTo(trail.from.x, trail.from.y);
      ctx.lineTo(trail.to.x, trail.to.y);
      ctx.strokeStyle = `rgba(255, 0, 0, ${trail.to.alpha})`;
      ctx.stroke();

      // Fade out
      trail.to.alpha -= 0.02;
      if (trail.to.alpha <= 0) {
        trails.splice(i, 1);
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

