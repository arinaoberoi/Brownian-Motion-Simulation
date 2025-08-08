# Brownian Motion Web App

This repository contains a simple web application that visualizes **Brownian motion**.  The app lets you specify the number of simulation steps and the length of each time increment and then draws a 2‑dimensional Brownian path on an HTML5 canvas.  Some summary statistics (final displacement and mean squared displacement) are reported after the simulation.

## Background

* **Physical origin.**  Brownian motion is the random, jittery motion of small particles suspended in a fluid.  The particles move erratically because they are constantly being bombarded by the much smaller, fast‑moving molecules of the fluid【772155142125148†L207-L214】.  Botanist Robert Brown first observed this phenomenon in 1827 when he looked at pollen grains under a microscope【772155142125148†L224-L232】.

* **Mathematical model.**  Mathematically, Brownian motion \(B(t)\) is a stochastic process with stationary, independent increments.  For any two times \(t_1 < t_2\), the increment \(B(t_2) - B(t_1)\) is normally distributed with mean 0 and variance equal to the length of the time interval, \(t_2 - t_1\)【623170445017917†L99-L105】.  The continuity of the paths combined with these Gaussian increments completely characterizes the process.

The simulation in this app uses the discrete approximation suggested in introductory courses: split the time horizon into small steps \(\Delta t\), draw independent Gaussian increments with standard deviation \(\sqrt{\Delta t}\) and add them to the current position.  As the step size decreases and the number of steps increases, the discrete random walk converges to true Brownian motion.

## How it works

1. The **`index.html`** file defines a form where you can enter:
   * `Number of steps` – the number of increments to simulate.
   * `Time increment (dt)` – the length of each time step.

2. When you click **Simulate**, JavaScript in **`script.js`** performs the following:
   * Uses the **Box–Muller transform** to generate independent standard normal random variables.  Each increment is scaled by \(\sqrt{\Delta t}\) to give it the correct variance【623170445017917†L99-L105】.
   * Adds these increments to the current \(x\) and \(y\) coordinates (the simulation is two‑dimensional) and records each point in a path array.
   * Draws the resulting path on a canvas.
   * Computes the final displacement and the mean squared displacement (MSD) as basic diagnostics.  For Brownian motion, the displacement has an expected value of 0 and the MSD grows linearly with elapsed time【623170445017917†L99-L105】.

3. The **`style.css`** file contains some simple styling to make the form and canvas look nice.

## Running locally

You can view the simulation without any server – just open `index.html` in a web browser:

```sh
xdg-open index.html  # On Linux; or double‑click the file in your file manager
```

If you prefer, you can serve the files with a lightweight server such as Python’s `http.server` module:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000 in your browser
```

## Publishing on GitHub

To make your web app accessible online, you can host it on GitHub Pages.  Here is an outline of the steps:

1. Create a new repository on GitHub (e.g. `brownian-motion-app`).
2. Copy the contents of this directory (`index.html`, `script.js`, `style.css` and `README.md`) into your repository.
3. Commit the files and push them to the `main` branch.  On the GitHub website, navigate to **Settings** → **Pages**, choose the source branch (`main`) and the root directory, and save.  GitHub will build and deploy the site for you.

After a short while your Brownian motion simulator will be available at `https://<your-username>.github.io/<repository-name>/`.

## Extending the project

This application is intentionally simple, but you can build upon it in many ways:

* Allow the user to choose the dimension (1‑D, 2‑D, 3‑D) or the number of independent particles.
* Plot distributions of the displacement and MSD across many runs to illustrate the law of large numbers and the linear growth of variance.
* Implement different types of stochastic processes, such as Brownian motion with drift or geometric Brownian motion (commonly used in finance).
* Add explanatory text or references directly into the page for educational use.

Have fun experimenting with stochastic processes!