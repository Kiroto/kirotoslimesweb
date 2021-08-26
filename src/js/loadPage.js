$(() => {
  $("#header").load(`/src/components/header.html`);
  $("#main-nav").load(`/src/components/nav.html`);
  $("#footer").load(`/src/components/footer.html`);
});
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
