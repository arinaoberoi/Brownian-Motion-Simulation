# Brownian Motion Web App

This repository contains a simple web application that visualizes **Brownian motion**.  The app lets you specify the number of simulation steps and the length of each time increment and then draws a 2‑dimensional Brownian path on an HTML5 canvas.  Some summary statistics (final displacement and mean squared displacement) are reported after the simulation.

## Background

* **Physical origin.**  Brownian motion is the random, jittery motion of small particles suspended in a fluid.  The particles move erratically because they are constantly being bombarded by the much smaller, fast‑moving molecules of the fluid【772155142125148†L207-L214】.  Botanist Robert Brown first observed this phenomenon in 1827 when he looked at pollen grains under a microscope【772155142125148†L224-L232】.

* **Mathematical model.**  Mathematically, Brownian motion \(B(t)\) is a stochastic process with stationary, independent increments.  For any two times \(t_1 < t_2\), the increment \(B(t_2) - B(t_1)\) is normally distributed with mean 0 and variance equal to the length of the time interval, \(t_2 - t_1\)【623170445017917†L99-L105】.  The continuity of the paths combined with these Gaussian increments completely characterizes the process.

The simulation in this app uses the discrete approximation suggested in introductory courses: split the time horizon into small steps \(\Delta t\), draw independent Gaussian increments with standard deviation \(\sqrt{\Delta t}\) and add them to the current position.  As the step size decreases and the number of steps increases, the discrete random walk converges to true Brownian motion.
