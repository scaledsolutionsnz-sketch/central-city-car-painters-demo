/* Central City Car Painters — shared interactions */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* intro overlay */
  var intro = document.getElementById("intro");
  if (intro) {
    window.addEventListener("load", function () {
      setTimeout(function () { intro.classList.add("done"); }, reduce ? 0 : 1300);
    });
    setTimeout(function () { intro.classList.add("done"); }, 2600); // failsafe
  }

  /* sticky nav */
  var nav = document.querySelector("header.nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("solid");
      else nav.classList.remove("solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* mobile menu */
  var burger = document.querySelector(".burger");
  var links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* hero rotation */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  if (slides.length > 1 && !reduce) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 6000);
  }

  /* scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }

  /* current year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
