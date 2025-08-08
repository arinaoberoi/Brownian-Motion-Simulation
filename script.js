/*
  Simulation code for the Brownian motion web app.

  Brownian motion is a continuous‑time stochastic process whose
  increments over a time interval (t₂ − t₁) are normally distributed
  with mean 0 and variance equal to the difference in time【623170445017917†L99-L105】.
  In physical terms, microscopic particles suspended in a fluid
  experience random collisions with fast‑moving molecules, leading
  to a jittery path【772155142125148†L207-L214】.

  This script generates a two‑dimensional Brownian motion path by
  successively adding normally distributed increments scaled by
  √dt.  The resulting path is drawn on a canvas element and some
  summary statistics (final displacement and mean squared
  displacement) are displayed beneath the plot.
*/

// Generate a normally distributed random number using the
// Box–Muller transform.  Returns a value with mean 0 and
// standard deviation 1.
function randn_bm() {
  let u = 0;
  let v = 0;
  // Convert [0,1) random numbers to (0,1] to avoid zero in log
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Main simulation entry point.  Attaches an event listener to the
// form so that simulation runs when the user submits the form.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bm-form');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const resultsDiv = document.getElementById('results');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Parse user input
    const steps = parseInt(document.getElementById('steps').value, 10);
    const dt = parseFloat(document.getElementById('dt').value);
    if (isNaN(steps) || isNaN(dt) || steps <= 0 || dt <= 0) {
      resultsDiv.textContent = 'Please enter valid positive values for steps and dt.';
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Start at the centre of the canvas
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    // Store the path for later analysis
    const path = [];
    path.push({ x, y });
    // Step size for scaling the visual representation; adjust this
    // factor to control how spread out the path appears on the canvas.
    const scale = 50;
    for (let i = 0; i < steps; i++) {
      const dx = Math.sqrt(dt) * randn_bm();
      const dy = Math.sqrt(dt) * randn_bm();
      x += dx * scale;
      y += dy * scale;
      path.push({ x, y });
    }
    // Draw the path on the canvas
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    // Draw using a pink colour that complements the dark theme
    ctx.strokeStyle = '#e83e8c';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Compute summary statistics
    const dxFinal = path[path.length - 1].x - path[0].x;
    const dyFinal = path[path.length - 1].y - path[0].y;
    const finalDisplacement = Math.sqrt(dxFinal * dxFinal + dyFinal * dyFinal);
    let msdSum = 0;
    for (let i = 0; i < path.length; i++) {
      const dx = path[i].x - path[0].x;
      const dy = path[i].y - path[0].y;
      msdSum += dx * dx + dy * dy;
    }
    const msd = msdSum / path.length;
    // Display results.  We mention that Brownian motion has zero mean
    // displacement and variance proportional to time to help
    // interpret these numbers.
    resultsDiv.innerHTML = `\
      <p><strong>Final displacement:</strong> ${finalDisplacement.toFixed(2)} pixels</p>\
      <p><strong>Mean squared displacement:</strong> ${msd.toFixed(2)} pixels²</p>\
      <p>The average of the displacements (over many independent runs) tends to zero, while the mean squared displacement grows proportionally to the total time (steps × dt), as expected for Brownian motion.</p>`;
  });
});