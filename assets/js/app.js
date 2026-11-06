(() => {
  const navItems = [
    ["index.html","Home"],["calendar.html","Calendar"],["chat.html","Chat"],
    ["groups.html","Find a group"],["profile.html","Profile"],["settings.html","Settings"]
  ];
  const current = location.pathname.split("/").pop() || "index.html";
  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `<header class="site-header container">
      <a class="brand" href="index.html"><span class="brand-mark">♥</span> Freindz</a>
      <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-label="Toggle navigation">☰</button>
      <nav class="nav-links" id="navLinks" aria-label="Main navigation">
        ${navItems.map(([url,label]) => `<a href="${url}" ${current===url?'class="active" aria-current="page"':''}>${label}</a>`).join("")}
      </nav>
    </header>`;
    const toggle = document.getElementById("menuToggle");
    const links = document.getElementById("navLinks");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
  const footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = `<footer class="site-footer container"><span>Made with 💗 by Freindz</span><span>Static demo · Your data stays in this browser</span></footer>`;

  const theme = localStorage.getItem("freindzTheme") || "light";
  if (theme === "dark" || theme === "rainbow") document.body.classList.add(theme);
  try {
    const colors = JSON.parse(localStorage.getItem("freindzCustomColors") || "{}");
    Object.entries(colors).forEach(([key,value]) => {
      const vars = {colorBg:"--bg",colorCard:"--card",colorText:"--text",colorPrimary:"--primary",colorSecondary:"--secondary",colorBorder:"--border"};
      if (vars[key] && /^#[0-9a-f]{6}$/i.test(value)) document.documentElement.style.setProperty(vars[key],value);
    });
  } catch {}
  window.Freindz = {
    escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); },
    getJSON(key,fallback) { try { const value=JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } },
    setJSON(key,value) { localStorage.setItem(key,JSON.stringify(value)); }
  };
})();