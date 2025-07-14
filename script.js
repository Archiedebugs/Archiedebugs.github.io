alert("Welcome to Archisha's Website!");

window.onload = () => {
  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
  };

  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let lastMouse = null;

  function drawTrail(x, y) {
    if (lastMouse) {
      ctx.beginPath();
      ctx.moveTo(lastMouse.x, lastMouse.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(255, 0, 0, 0.6)"; // red with transparency
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    lastMouse = { x, y };
  }

  // Paint over canvas with transparent black to fade older lines
  function fadeCanvas() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // lower alpha = slower fade
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  document.addEventListener("mousemove", (e) => {
    drawTrail(e.clientX, e.clientY);
  });

  function animate() {
    fadeCanvas();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};
