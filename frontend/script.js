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
    alert("Something went wrong.");
    console.error("Scraping error:", err);
  });
}
