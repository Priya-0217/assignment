# 🚗 Scroll-Based Hero Animation (GSAP + Next.js)

A premium, scroll-driven hero section inspired by modern product websites. This project demonstrates smooth animations, scroll-based interactions, and high-performance UI using **Next.js, React, Tailwind CSS, and GSAP**.

---

## 🔗 Live Demo

👉 https://your-deployment-link-here

---

## 📌 Features

### 🎯 Hero Section

* Full-screen responsive layout (above the fold)
* Letter-spaced animated headline:
  **W E L C O M E  I T Z  F I Z Z**
* Modern UI with gradient + glassmorphism effects

### ✨ Initial Load Animations

* Staggered letter animation (fade + movement + slight 3D effect)
* Smooth reveal of statistics cards
* GSAP timeline for coordinated animation flow

### 🧭 Scroll-Based Animation (Core)

* Hero section pinned during scroll
* Scroll-controlled animation using **GSAP ScrollTrigger**
* Main visual (car/element):

  * Moves horizontally across screen
  * Subtle vertical motion + rotation
* Animation tied to scroll progress using `scrub`

### 🌌 Advanced Motion Effects

* Parallax background elements (clouds, glow)
* Depth-based movement (foreground vs background)
* Smooth interpolation for natural motion
* Subtle hover interactions on stat cards

### ⚡ Performance Optimized

* Uses `transform` and `opacity` only
* Avoids layout reflows and heavy calculations
* `will-change` used for smoother rendering

---

## 🛠️ Tech Stack

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**
* **GSAP (ScrollTrigger)**

---

## 📂 Project Structure

```
/app
  /page.js
/components
  HeroScrollAnimation.jsx
/styles
  globals.css
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/scroll-hero-animation.git
cd scroll-hero-animation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install GSAP

```bash
npm install gsap
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Open in Browser

```
http://localhost:3000
```

---

## 🧠 How It Works

### Scroll Animation

* GSAP's **ScrollTrigger** pins the hero section.
* A timeline is linked to scroll progress using:

  ```js
  scrub: true
  ```
* As the user scrolls, animation progresses smoothly instead of playing automatically.

### Motion System

* All animations use:

  * `transform: translate, scale, rotate`
  * `opacity`
* This ensures GPU acceleration and smooth performance.

### Intro Animation

* Headline letters are split into spans
* GSAP stagger animates each letter
* Stats cards animate with slight delay

---

## 🎛️ Customization

### Adjust Animation Speed

Modify `scrub` value:

```js
scrub: 1   // smoother
scrub: 0.5 // faster
```

### Change Scroll Distance

```js
end: "+=150%"
```

### Modify Movement

```js
x: 300,
y: -50,
rotate: 5
```

---

## 🌟 Bonus Enhancements (Optional Ideas)

* Add scroll progress bar
* Add motion blur effect
* Replace car with SVG or 3D model
* Add sound effects for interaction
* Integrate Locomotive Scroll for smoother scrolling

---

## 📸 Reference

Inspired by:
https://paraschaturvedi.github.io/car-scroll-animation

---

## 📜 License

This project is for educational purposes.

---

## 🙌 Author

Your Name
GitHub: https://github.com/your-username

---

## 💡 Final Notes

This project focuses on:

* Smooth user experience
* High-quality animations
* Clean and maintainable code

Perfect for showcasing frontend animation skills in portfolios 🚀
