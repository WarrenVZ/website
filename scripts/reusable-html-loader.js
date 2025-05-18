async function loadContent(elementId, filePath) {
  try {
      const response = await fetch(filePath);
      const content = await response.text();
      document.getElementById(elementId).innerHTML = content;
      //Load script.js after nav.html is loaded.
      const script = document.createElement('script');
      script.src = '/scripts/script.js';
      document.body.appendChild(script);

  } catch (error) {
      console.error(`Error loading ${filePath} into ${elementId}:`, error);
  }
}

window.addEventListener("load", () => {
  loadContent("nav", "/nav.html");
  loadContent("footer", "/footer.html");
});