alert("Welcome to Archisha's Website!");

window.onload = () => {
  //  Dark Mode toggle function
  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
  };

  //  Cursor Canvas Setup
  const canvas = document.getElementById("cursor-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  // 🖱️ Add multiple particles per mouse move
  document.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: e.clientX + Math.random() * 5 - 2.5,
        y: e.clientY + Math.random() * 5 - 2.5,
        radius: Math.random() * 3 + 1.5,
        alpha: 1,
        color: getRandomColor()
      });
    }
  });

  // Particle draw loop
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

  // Resize canvas if window resizes
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  //  Pick a random neon color
  function getRandomColor() {
    const colors = ['#ff6ec7', '#7f5af0', '#5eead4', '#facc15']; // Pink, purple, teal, yellow
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Convert hex color to rgba for transparency
  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
};
