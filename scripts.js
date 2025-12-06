/* -----------------------------
   Neon Quote Generator — script.js
   ----------------------------- */

const quotes = [
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Dream big. Dare more. Live loud.", author: "Unknown" },
  { text: "Stars can’t shine without darkness.", author: "Unknown" },
  { text: "Code like poetry, ship like lightning.", author: "Dev Motto" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "What you think, you become.", author: "Buddha" },
  { text: "Less comfort, more courage.", author: "Unknown" },
  { text: "Make today worth remembering.", author: "Unknown" },
  { text: "Act boldly and unseen forces will come to your aid.", author: "Dorothy Thompson" },
  { text: "A smooth sea never made a skilled sailor.", author: "Franklin D. Roosevelt" },
  { text: "If not now, then when?", author: "Hesiod" },
  { text: "First create, then critique.", author: "Unknown" },
  { text: "Run where the Wi-Fi is weak and the ideas are strong.", author: "Unknown" },
  { text: "Curiosity fuels the neon heart.", author: "Q-Gen" }
];

// Elements
const qText = document.getElementById("quote-text");
const qAuthor = document.getElementById("quote-author");
const genBtn = document.getElementById("generate-btn");
const styleBtn = document.getElementById("change-style-btn");
const copyBtn = document.getElementById("copy-btn");
const themeToggle = document.getElementById("theme-toggle");
const yearEl = document.getElementById("year");

// populate year
yearEl.textContent = new Date().getFullYear();

// Keep track so generate doesn't repeat same quote twice in a row
let lastIndex = -1;

// Typing function: animate a string into element (promise-based)
function typeText(element, text, speed = 18) {
  return new Promise((resolve) => {
    element.classList.add("typing");
    element.textContent = "";
    let i = 0;
    function step() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(step, speed);
      } else {
        element.classList.remove("typing");
        resolve();
      }
    }
    step();
  });
}

// choose random index not equal to last
function randomIndex() {
  if (quotes.length === 1) return 0;
  let idx;
  do { idx = Math.floor(Math.random() * quotes.length); } while (idx === lastIndex);
  lastIndex = idx;
  return idx;
}

// generate new quote with typing animation
async function generateQuote() {
  const idx = randomIndex();
  const q = quotes[idx];
  // quick fade out
  qText.style.opacity = "0.0";
  qAuthor.style.opacity = "0.0";
  await new Promise(r => setTimeout(r, 140));
  // type
  await typeText(qText, q.text, 16);
  qAuthor.textContent = "- " + q.author;
  qText.style.opacity = "1";
  qAuthor.style.opacity = "1";
}

// change style: cycles accent classes and random rotate fonts subtly
const accents = ["accent-cyan", "accent-pink", "accent-lime"];
let accentIndex = 0;
function changeStyle() {
  // cycle accent
  accentIndex = (accentIndex + 1) % accents.length;
  document.body.classList.remove("accent-cyan","accent-pink","accent-lime");
  document.body.classList.add(accents[accentIndex]);

  // random font tweak: choose orbitron (sci) or share-tech-mono (mono) or inter
  const fonts = [
    '"Orbitron", sans-serif',
    '"Share Tech Mono", monospace',
    '"Inter", sans-serif'
  ];
  const chosen = fonts[Math.floor(Math.random()*fonts.length)];
  document.querySelector(".quote-text").style.fontFamily = chosen;

  // small neon glow pulse
  const prev = document.querySelector(".quote-container");
  prev.animate([{transform:"scale(1)"},{transform:"scale(1.01)"},{transform:"scale(1)"}], {duration:420, easing:"ease-out"});
}

// copy quote
function copyQuote(){
  const txt = qText.textContent + (qAuthor.textContent ? " " + qAuthor.textContent : "");
  navigator.clipboard?.writeText(txt).then(() => {
    copyBtn.textContent = "Copied ✓";
    setTimeout(()=> copyBtn.textContent = "Copy", 1200);
  }).catch(()=>{
    copyBtn.textContent = "Err";
    setTimeout(()=> copyBtn.textContent = "Copy", 1200);
  });
}

// theme toggle (dark/light)
function toggleTheme() {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    themeToggle.textContent = "☾";
  } else {
    document.body.classList.add("light");
    themeToggle.textContent = "☼";
  }
}

// keyboard shortcut: G to generate, S to style, C to copy
document.addEventListener("keydown",(e)=>{
  if (e.key.toLowerCase() === 'g') { genBtn.click(); }
  if (e.key.toLowerCase() === 's') { styleBtn.click(); }
  if (e.key.toLowerCase() === 'c') { copyBtn.click(); }
});

// wire events
genBtn.addEventListener("click", generateQuote);
styleBtn.addEventListener("click", changeStyle);
copyBtn.addEventListener("click", copyQuote);
themeToggle.addEventListener("click", toggleTheme);

// initial: gentle first quote
window.addEventListener("load", async () => {
  await generateQuote();
});
