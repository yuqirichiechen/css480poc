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
let sorted = false;
let currentInterests = [...rawInterests];

// ── DOM refs ──────────────────────────────────────────────────────────────────
const list     = document.getElementById("interests-list");
const sortBtn  = document.getElementById("sort-btn");
const btnLabel = document.getElementById("btn-label");
const arrow    = document.getElementById("arrow");
const sortInfo = document.getElementById("sort-info");

// ── Render list ───────────────────────────────────────────────────────────────
function renderList(items) {
  list.innerHTML = "";
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML =
      '<span class="emoji">' + item.emoji + "</span>" +
      "<div>" +
        '<div class="item-label">' + item.label + "</div>" +
        '<div class="item-desc">'  + item.desc  + "</div>" +
      "</div>";
    list.appendChild(li);
  });
}

// ── Sort toggle ───────────────────────────────────────────────────────────────
function toggleSort() {
  if (sorted) {
    currentInterests = [...rawInterests];
    sorted = false;
    btnLabel.textContent = "Sort A\u2013Z";
    arrow.classList.remove("flipped");
    sortInfo.textContent = "Default order \u00B7 " + rawInterests.length + " items";
  } else {
    currentInterests = [...rawInterests].sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
    sorted = true;
    btnLabel.textContent = "Reset Order";
    arrow.classList.add("flipped");
    sortInfo.textContent = "A \u2192 Z \u00B7 " + rawInterests.length + " items";
  }
  renderList(currentInterests);
}

// ── Init ──────────────────────────────────────────────────────────────────────
sortBtn.addEventListener("click", toggleSort);
renderList(currentInterests);
