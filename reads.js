// ── Arrow-key navigation for the reads list ──────────────────────────────────
const readsList = document.getElementById("reads-list");
let kbIndex = -1;

function getLinks() {
  return Array.from(readsList.querySelectorAll(".read-link"));
}

function setKbFocus(index) {
  const links = getLinks();
  links.forEach(function(el) { el.classList.remove("kb-focused"); });
  if (index >= 0 && index < links.length) {
    links[index].classList.add("kb-focused");
    links[index].focus();
    kbIndex = index;
  }
}

readsList.addEventListener("keydown", function(e) {
  const links = getLinks();
  if (links.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setKbFocus(kbIndex < links.length - 1 ? kbIndex + 1 : 0);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setKbFocus(kbIndex > 0 ? kbIndex - 1 : links.length - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    setKbFocus(0);
  } else if (e.key === "End") {
    e.preventDefault();
    setKbFocus(links.length - 1);
  }
});

// Track which link has focus so arrow keys know where to start
getLinks().forEach(function(link, i) {
  link.addEventListener("focus", function() { kbIndex = i; });
});
