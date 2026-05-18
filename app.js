// ── Interest data ────────────────────────────────────────────────────────────
const rawInterests = [
  { id: 1, emoji: "💻", label: "Full-Stack Development", desc: "Building end-to-end systems, from REST APIs to React UIs" },
  { id: 2, emoji: "🤖", label: "AI & Machine Learning",  desc: "RAG systems, LLMs, and real-world NLP applications" },
  { id: 3, emoji: "📈", label: "Investing & FinTech",    desc: "Equity markets, personal finance, and financial technology" },
  { id: 4, emoji: "🏋️", label: "Fitness & Training",    desc: "Lifting, staying consistent, and the discipline it builds" },
  { id: 5, emoji: "✈️", label: "Traveling",              desc: "Exploring new cities, cultures, and perspectives" },
  { id: 6, emoji: "🎮", label: "Gaming",                 desc: "Strategy games and anything with a good story" },
];

// ── State ─────────────────────────────────────────────────────────────────────
let sorted          = false;
let currentInterests = [...rawInterests];
let kbIndex         = -1;   // tracks arrow-key focus position in list

// ── DOM refs ──────────────────────────────────────────────────────────────────
const list     = document.getElementById("interests-list");
const sortBtn  = document.getElementById("sort-btn");
const btnLabel = document.getElementById("btn-label");
const arrow    = document.getElementById("arrow");
const sortInfo = document.getElementById("sort-info");

// ── Render list ───────────────────────────────────────────────────────────────
function renderList(items) {
  list.innerHTML = "";
  items.forEach(function(item, i) {
    const li = document.createElement("li");
    li.className = "item";
    li.setAttribute("role", "listitem");
    li.setAttribute("data-index", i);
    li.innerHTML =
      '<span class="emoji" aria-hidden="true">' + item.emoji + "</span>" +
      "<div>" +
        '<div class="item-label">' + item.label + "</div>" +
        '<div class="item-desc">'  + item.desc  + "</div>" +
      "</div>";
    list.appendChild(li);
  });
  kbIndex = -1;
}

// ── Sort toggle ───────────────────────────────────────────────────────────────
function toggleSort() {
  if (sorted) {
    currentInterests = [...rawInterests];
    sorted = false;
    btnLabel.textContent = "Sort A\u2013Z";
    arrow.classList.remove("flipped");
    sortInfo.textContent = "Default order \u00B7 " + rawInterests.length + " items";
    sortBtn.setAttribute("aria-label", "Sort interests list alphabetically");
  } else {
    currentInterests = [...rawInterests].sort(function(a, b) {
      return a.label.localeCompare(b.label);
    });
    sorted = true;
    btnLabel.textContent = "Reset Order";
    arrow.classList.add("flipped");
    sortInfo.textContent = "A \u2192 Z \u00B7 " + rawInterests.length + " items";
    sortBtn.setAttribute("aria-label", "Reset interests list to default order");
  }
  renderList(currentInterests);
}

// ── Arrow-key navigation through interest items ───────────────────────────────
function setKbFocus(index) {
  const items = list.querySelectorAll(".item");
  items.forEach(function(el) { el.classList.remove("kb-focused"); });
  if (index >= 0 && index < items.length) {
    items[index].classList.add("kb-focused");
    items[index].scrollIntoView({ block: "nearest" });
    kbIndex = index;
  }
}

list.addEventListener("keydown", function(e) {
  const items = list.querySelectorAll(".item");
  if (items.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    setKbFocus(Math.min(kbIndex + 1, items.length - 1));
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setKbFocus(Math.max(kbIndex - 1, 0));
  } else if (e.key === "Home") {
    e.preventDefault();
    setKbFocus(0);
  } else if (e.key === "End") {
    e.preventDefault();
    setKbFocus(items.length - 1);
  }
});

// Make list focusable so arrow keys work
list.setAttribute("tabindex", "0");
list.setAttribute("aria-label", "Interests list. Use arrow keys to navigate items.");

// ── Init ──────────────────────────────────────────────────────────────────────
sortBtn.addEventListener("click", toggleSort);
renderList(currentInterests);
