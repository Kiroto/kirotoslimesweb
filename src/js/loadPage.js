$(() => {
  $("#header").load(`${backpedalString}/src/components/header.html`);
  $("#main-nav").load(`${backpedalString}/src/components/nav.html`);
  $("#footer").load(`${backpedalString}/src/components/footer.html`);
});
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
