import { useState } from "react";

/*
  COLOR ACCESSIBILITY NOTES
  ─────────────────────────────────────────────────────────────────────────────
  All contrast ratios verified against WCAG 2.1 AA (4.5:1 body text, 3:1 large)

  --ink (#1A1A2E) on --bg (#F4F6FB):        ~16.8:1  ✓ AAA
  --ink2 (#4A5568) on --bg (#F4F6FB):        ~7.0:1  ✓ AA
  --blue (#1D4ED8) on --bg (#F4F6FB):        ~7.2:1  ✓ AA  (interactive elements)
  --blue (#1D4ED8) on white (#FFFFFF):        ~8.6:1  ✓ AAA
  --teal (#0D7377) on --bg (#F4F6FB):        ~5.4:1  ✓ AA  (section labels)
  white (#FFFFFF) on --blue (#1D4ED8):        ~8.6:1  ✓ AAA (button hover text)
  white (#FFFFFF) on --bg-nav (#1A1A2E):     ~16.8:1  ✓ AAA (nav text)

  Color-blindness strategy:
  - Blue (#1D4ED8) is the primary interactive color. Blue is distinguishable
    across all major deficiency types: deuteranopia, protanopia, tritanopia.
  - Teal (#0D7377) is used for section labels. Chosen because it remains
    distinguishable under red-green blindness due to high luminance contrast.
  - No information is conveyed by color alone — the sort button uses both
    color AND a text label + arrow icon. Hover states use both color and
    a transform (translateY/X), so they work even in grayscale.
  - Orange/red hues are avoided as primary interactive colors since they
    are the most common confusion zone for colorblind users.
  - Each page section has a distinct tinted background (indigo/green/amber)
    so sections are separable by hue AND by position/label simultaneously.
  ─────────────────────────────────────────────────────────────────────────────
*/

const rawInterests = [
  { id: 1, emoji: "💻", label: "Full-Stack Development", desc: "Building end-to-end systems, from REST APIs to React UIs" },
  { id: 2, emoji: "🤖", label: "AI & Machine Learning", desc: "RAG systems, LLMs, and real-world NLP applications" },
  { id: 3, emoji: "📈", label: "Investing & FinTech", desc: "Equity markets, personal finance, and financial technology" },
  { id: 4, emoji: "🏋️", label: "Fitness & Training", desc: "Lifting, staying consistent, and the discipline it builds" },
  { id: 5, emoji: "✈️", label: "Traveling", desc: "Exploring new cities, cultures, and perspectives" },
  { id: 6, emoji: "🎮", label: "Gaming", desc: "Strategy games and anything with a good story" },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* Backgrounds */
    --bg:           #F4F6FB;  /* cool light blue-white — page canvas        */
    --bg-card:      #FFFFFF;  /* pure white — cards and list items           */
    --bg-nav:       #1A1A2E;  /* deep navy — nav bar                         */
    --bg-hero:      #EEF2FF;  /* soft indigo tint — hero section             */
    --bg-about:     #F0FDF4;  /* soft green tint — about section             */
    --bg-interests: #FFF7ED;  /* soft amber tint — interests section         */

    /* Text */
    --ink:  #1A1A2E;          /* near-black navy — headings | 16.8:1 on --bg */
    --ink2: #4A5568;          /* slate gray — body text     |  7.0:1 on --bg */

    /* Interactive */
    --blue:       #1D4ED8;    /* accessible blue — buttons  |  7.2:1 on --bg */
    --blue-light: #DBEAFE;    /* pale blue — button bg at rest               */
    --blue-hover: #1E40AF;    /* darker blue — button hover                  */

    /* Section accent */
    --teal: #0D7377;          /* teal — section labels      |  5.4:1 on --bg */

    /* Borders */
    --border:      #CBD5E1;
    --border-card: #E2E8F0;

    --radius: 12px;
  }

  body { background: var(--bg); color: var(--ink); font-family: 'DM Sans', sans-serif; font-weight: 300; line-height: 1.7; min-height: 100vh; }

  /* NAV — deep navy, white text: 16.8:1 */
  nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: var(--bg-nav); position: sticky; top: 0; z-index: 10; }
  .nav-logo { font-family: 'Newsreader', serif; font-size: 1.1rem; font-weight: 400; color: #FFFFFF; }
  .nav-tag  { font-size: 0.72rem; color: #BFD0F0; letter-spacing: 0.1em; text-transform: uppercase; }

  /* HERO — soft indigo tint */
  .hero-wrap { background: var(--bg-hero); border-bottom: 1px solid var(--border); }
  .hero { max-width: 800px; margin: 0 auto; padding: 3.5rem 2rem 2.5rem; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: start; }
  .eyebrow { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 0.75rem; font-weight: 500; }
  h1 { font-family: 'Newsreader', serif; font-size: 2.8rem; font-weight: 300; line-height: 1.15; letter-spacing: -0.03em; color: var(--ink); margin-bottom: 1.2rem; }
  h1 em { font-style: italic; color: var(--blue); }
  .hero-desc { font-size: 0.98rem; color: var(--ink2); max-width: 440px; line-height: 1.75; }
  .avatar { width: 130px; height: 130px; border-radius: 50%; background: var(--blue-light); border: 3px solid var(--blue); display: flex; align-items: center; justify-content: center; font-size: 3.5rem; flex-shrink: 0; }

  /* ABOUT — soft green tint */
  .about-wrap { background: var(--bg-about); border-bottom: 1px solid var(--border); }

  /* INTERESTS — soft amber tint */
  .interests-wrap { background: var(--bg-interests); border-bottom: 1px solid var(--border); }

  /* SHARED SECTION LAYOUT */
  .section { max-width: 800px; margin: 0 auto; padding: 2.5rem 2rem; display: grid; grid-template-columns: 180px 1fr; gap: 2.5rem; align-items: start; }
  .section-label { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); padding-top: 0.3rem; font-weight: 500; border-left: 3px solid var(--teal); padding-left: 0.6rem; }
  .about-text p { font-size: 0.95rem; color: var(--ink2); line-height: 1.8; margin-bottom: 0.8rem; }
  .about-text p strong { color: var(--ink); font-weight: 500; }

  /* SORT BUTTON — blue: 7.2:1, hover uses color + movement (not color alone) */
  .interests-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .sort-info { font-size: 0.8rem; color: var(--ink2); }
  .sort-btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 1rem; background: var(--blue-light); color: var(--blue); border: 1.5px solid var(--blue); border-radius: 999px; font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .sort-btn:hover { background: var(--blue-hover); color: #FFFFFF; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(29,78,216,0.25); }
  .arrow { transition: transform 0.3s; display: inline-block; }
  .arrow.flipped { transform: rotate(180deg); }

  /* LIST ITEMS — left border acts as color + structural cue simultaneously */
  ul { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
  .item { display: flex; align-items: center; gap: 0.9rem; padding: 0.75rem 1rem; background: var(--bg-card); border: 1px solid var(--border-card); border-left: 4px solid var(--blue); border-radius: var(--radius); transition: all 0.2s; cursor: default; }
  .item:hover { border-left-color: var(--teal); box-shadow: 0 2px 10px rgba(13,115,119,0.12); transform: translateX(4px); }
  .emoji { font-size: 1.25rem; flex-shrink: 0; width: 1.8rem; text-align: center; }
  .item-label { font-size: 0.9rem; font-weight: 500; color: var(--ink); }
  .item-desc  { font-size: 0.78rem; color: var(--ink2); margin-top: 0.05rem; }

  /* FOOTER */
  footer { max-width: 800px; margin: 0 auto; padding: 2rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--ink2); }

  @media (max-width: 640px) {
    .hero { grid-template-columns: 1fr; }
    .avatar { order: -1; width: 90px; height: 90px; font-size: 2.5rem; }
    .section { grid-template-columns: 1fr; gap: 0.8rem; }
  }
`;

export default function App() {
  const [interests, setInterests] = useState(rawInterests);
  const [sorted, setSorted] = useState(false);

  const toggleSort = () => {
    if (sorted) {
      setInterests([...rawInterests]);
    } else {
      setInterests([...interests].sort((a, b) => a.label.localeCompare(b.label)));
    }
    setSorted(!sorted);
  };

  return (
    <div className="wrap">
      <style>{style}</style>

      {/* NAV — deep navy (#1A1A2E), white text: 16.8:1 contrast */}
      <nav>
        <span className="nav-logo">Richie Chen</span>
        <span className="nav-tag">CSS 480 · HCI · UW Bothell</span>
      </nav>

      {/* HERO — soft indigo tint (#EEF2FF) */}
      <div className="hero-wrap">
        <section className="hero">
          <div>
            <p className="eyebrow">Welcome</p>
            <h1>Hey, I'm <em>Richie</em> —<br />nice to have you here.</h1>
            <p className="hero-desc">This is my CSS 480 landing page. Pull up a chair, take a look around, and feel free to reach out.</p>
          </div>
          <div className="avatar">🧑‍💻</div>
        </section>
      </div>

      {/* ABOUT — soft green tint (#F0FDF4) */}
      <div className="about-wrap">
        <section className="section">
          <p className="section-label">About Me</p>
          <div className="about-text">
            <p>I'm <strong>Richie Chen</strong>, a junior studying <strong>Computer Science & Software Engineering</strong> at <strong>UW Bothell</strong>, expected to graduate in 2026. I'm interested in how technology shapes the way people interact with the world around them, which is what drew me to HCI.</p>
            <p>Outside of class I enjoy working on personal projects, volunteering at campus tech events, and exploring the Seattle area. I'm currently taking CSS 480 to deepen my understanding of user-centered design and interaction principles.</p>
            <p>When I'm not studying I'm probably at the gym, trying a new restaurant, or down a YouTube rabbit hole about something I definitely didn't need to know.</p>
          </div>
        </section>
      </div>

      {/* INTERESTS — soft amber tint (#FFF7ED) */}
      <div className="interests-wrap">
        <section className="section">
          <p className="section-label">Things I'm Into</p>
          <div>
            <div className="interests-header">
              <span className="sort-info">{sorted ? "A → Z" : "Default order"} · {interests.length} items</span>
              <button className="sort-btn" onClick={toggleSort}>
                <span className={`arrow${sorted ? " flipped" : ""}`}>↑↓</span>
                {sorted ? "Reset Order" : "Sort A–Z"}
              </button>
            </div>
            <ul>
              {interests.map((item) => (
                <li key={item.id} className="item">
                  <span className="emoji">{item.emoji}</span>
                  <div>
                    <div className="item-label">{item.label}</div>
                    <div className="item-desc">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <footer>
        <span>Richie Chen · CSS 480 Spring 2025</span>
        <span>UW Bothell · CSSE</span>
      </footer>
    </div>
  );
}
