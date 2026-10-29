(function () {
  "use strict";

  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "light" : "dark";
  }

  var saved = "light";
  try {
    saved = localStorage.getItem("sb-theme") || "light";
  } catch (e) {}
  applyTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("sb-theme", next); } catch (e) {}
    });
  }

  var filterBtns = document.querySelectorAll(".filter");
  var items = document.querySelectorAll(".work-item");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.dataset.filter;

      items.forEach(function (item) {
        var tech = item.dataset.tech || "";
        var show = filter === "all" || tech.indexOf(filter) !== -1;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });
})();