const formEl = document.querySelector("#form");
const resultEl = document.querySelector("#result");
const searchEl = document.querySelector("#search");
const moreEl = document.querySelector("#more");

const apiURL = "https://api.lyrics.ovh";

// Event listener for the Search Field
formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = searchEl.value.trim();
    getSongs(searchTerm);
});

// Get lyrics event listener
resultEl.addEventListener("click", ({ target }) => {
    // Filtering clicks
    if (target.tagName === "BUTTON") {
        // Data attributes can be accessed through dataset object
        const artist = target.dataset.artist;
        const songTitle = target.dataset.songTitle;
        getLyrics(artist, songTitle);
    }
});

// Get songs searching  by song or artist's name
function getSongs(term) {
    axios
        .get(`${apiURL}/suggest/${term}`)
        .then(({ data }) => showSongs(data))
        .catch((err) => console.log(err));
}

// Get previous or next songs

function getMoreSongs(url) {
    // To bypass CORS, We've to prefix 'https://cors-anywhere.herokuapp.com/' to the url
    // Don't know why, but this work around doesn't work with live-server
    axios
        .get(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(({ data }) => showSongs(data))
        .catch((err) => console.log(err));
}

// Show data to the DOM
function showSongs(data) {
    resultEl.innerHTML = `<ul class="songs">
            ${data.data
                .map(
                    (song) => `<li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Get Lyrics</button>
                    </li>`
                )
                .join("")}
        </ul>`;

    // Paginations

    moreEl.innerHTML = "";

    if (data.prev) {
        moreEl.innerHTML = `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`;
    }
    if (data.next) {
        moreEl.innerHTML += `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`;
    }
}

// Get Lyrics funciton
function getLyrics(artist, songTitle) {
    axios
        .get(`${apiURL}/v1/${artist}/${songTitle}`)
        .then(({ data }) => {
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

            result.innerHTML = `
                <h2><strong>${artist}</strong> - ${songTitle}</h2>
                <span>${lyrics}</span>`;

            // We don't to see the next or prev when viewing lyrics
            more.innerHTML = "";
        })
        .catch((err) => console.log(err));
}

// Some songs have no lyrics!😱 Thanks to the API!
