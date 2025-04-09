// MATRIX BACKGROUND
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -50;
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// RANDOM MESSAGE
const messages = [
  "Initiating data extraction protocol. Please designate starting node.",
  "System ready. Identify primary data source for scraping.",
  "Awaiting coordinates. Where shall we commence the scrape, Commander?",
  "All systems green. Define your target origin for data extraction.",
  "Mission: Scrape the web. First objective? You decide.",
  "Hello, Operator. Select your launch point for data mining.",
  "Initializing scan... Please confirm scraping origin.",
  "Standing by. Where do we begin the glorious data hunt?",
  "Data acquisition module active. Select origin point to proceed.",
  "Scrape bot primed. Feed me a starting point, boss."
];

const msgElement = document.getElementById('scrape-message');
setTimeout(() => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  msgElement.textContent = messages[randomIndex];
}, 2000);

// UI LOGIC
function selectOption(option) {
  document.getElementById("initial-options").classList.add("hidden");

  if (option === "marketplace") {
    document.getElementById("marketplace-options").classList.remove("hidden");
  } else {
    document.getElementById("url-input").classList.remove("hidden");
    document.getElementById("start-button-container").classList.remove("hidden");
  }
}

function chooseMarketplaceMode(mode) {
  document.getElementById("marketplace-options").classList.add("hidden");

  if (mode === "bulk") {
    document.getElementById("bulk-upload").classList.remove("hidden");
  } else {
    document.getElementById("url-input").classList.remove("hidden");
  }

  document.getElementById("start-button-container").classList.remove("hidden");
}

function resetInitialAnimation() {
  const el = document.getElementById("initial-options");
  el.classList.remove("blur-text", "delay-2");
}

function goBack(currentSectionId) {
  document.getElementById(currentSectionId).classList.add("hidden");

  if (currentSectionId === "marketplace-options") {
    document.getElementById("initial-options").classList.remove("hidden");
    resetInitialAnimation();
  } else if (currentSectionId === "bulk-upload" || currentSectionId === "url-input") {
    if (!document.getElementById("marketplace-options").classList.contains("hidden")) {
      document.getElementById("marketplace-options").classList.remove("hidden");
    } else {
      document.getElementById("initial-options").classList.remove("hidden");
      resetInitialAnimation();
    }
  }

  document.getElementById("start-button-container").classList.add("hidden");
}
function startScraping() {
  const urlInput = document.querySelector('#url-input input');
  const url = urlInput.value.trim();

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  fetch("https://web-scraper-backend-7izp.onrender.com/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: url })
  })
  .then(res => res.json())
  .then(data => {
    alert("Scraped Title: " + data.title);
    console.log("Scraped Data:", data);
  })
  .catch(err => {
    alert("Something went wrong while scraping.");
    console.error("Scraping error:", err);
  });
}
