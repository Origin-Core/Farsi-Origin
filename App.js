const FO = (function(){
  "use strict";

  const GH_OWNER = "Origin-Core";
  const GH_REPO  = "Farsi-Origin";
  const API_URL  = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/`;

  const IMAGE_EXTS   = ["png","jpg","jpeg","webp","gif"];
  const ARCHIVE_EXTS = ["zip","rar","7z"];
  const DESC_EXTS    = ["txt","md"];
  const RESERVED     = new Set(["index.html","product.html","template.html","style.css","app.js","readme.md","license","license.md",".gitignore"]);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }

  function humanizeName(base){
    let s = base.replace(/[-_]+/g, " ").trim();
    s = s.replace(/\b([a-zA-Z])/g, m => m.toUpperCase());
    return s;
  }

  function formatSize(bytes){
    const units = ["بایت","کیلوبایت","مگابایت","گیگابایت"];
    let n = bytes, i = 0;
    while(n >= 1024 && i < units.length - 1){ n /= 1024; i++; }
    const val = i === 0 ? n : Math.round(n * 10) / 10;
    return `${val.toLocaleString("fa-IR")} ${units[i]}`;
  }

  // Safe markdown-lite: real line breaks (or a literal <br> the user types),
  // "-" bullet lists, and **bold**. Used for plain .txt/.md descriptions.
  function formatDescription(raw){
    let text = raw.replace(/<br\s*\/?>/gi, "\n");
    text = escapeHtml(text);
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    const lines = text.split(/\r?\n/);
    let html = "", list = [];
    const flush = () => { if(list.length){ html += "<ul>" + list.map(li => `<li>${li}</li>`).join("") + "</ul>"; list = []; } };
    for(const rawLine of lines){
      const line = rawLine.trim();
      if(line === ""){ flush(); continue; }
      const m = line.match(/^[-•]\s*(.+)$/);
      if(m) list.push(m[1]); else { flush(); html += `<p>${line}</p>`; }
    }
    flush();
    return html;
  }

  function groupFiles(files){
    const map = {};
    for(const f of files){
      if(f.type !== "file") continue;
      if(RESERVED.has(f.name.toLowerCase())) continue;
      const dot = f.name.lastIndexOf(".");
      if(dot <= 0) continue;
      const base = f.name.slice(0, dot);
      const ext  = f.name.slice(dot + 1).toLowerCase();
      const key  = base.toLowerCase();
      if(!map[key]) map[key] = { key, displayName: humanizeName(base), image:null, archive:null, desc:null, richHtml:null };
      if(IMAGE_EXTS.includes(ext)) map[key].image = f;
      else if(ARCHIVE_EXTS.includes(ext)) map[key].archive = f;
      else if(DESC_EXTS.includes(ext)) map[key].desc = f;
      else if(ext === "html") map[key].richHtml = f;
    }
    return map;
  }

  let cachedGroups = null;
  async function fetchGroups(){
    if(cachedGroups) return cachedGroups;
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("api-" + res.status);
    const files = await res.json();
    if(!Array.isArray(files)) throw new Error("unexpected-response");
    cachedGroups = groupFiles(files);
    return cachedGroups;
  }

  function products(groups){
    return Object.values(groups).filter(g => g.image && g.archive);
  }

  return {
    GH_OWNER, GH_REPO, reduceMotion,
    escapeHtml, humanizeName, formatSize, formatDescription,
    fetchGroups, products
  };
})();
