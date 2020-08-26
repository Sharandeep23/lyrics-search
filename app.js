const formEl = document.querySelector("#form");
const resultEl = document.querySelector("#result");
const searchEl = document.querySelector("#search");
const moreEl = document.querySelector("#more");

const apiURL = "https://api.lyrics.ovh";

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = searchEl.value.trim();
    searchSongs(searchTerm);
});
