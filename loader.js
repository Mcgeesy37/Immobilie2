window.addEventListener("load", () => {
  const loader = document.getElementById("siteLoader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 550);
});
