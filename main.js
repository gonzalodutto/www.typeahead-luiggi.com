"use strict";

const endpoint =
  "https://spreadsheets.google.com/feeds/cells/1URGwdSagiUivMfv4SkdBp9zb5HiVjTHBQzTicKiwSiQ/1/public/full?alt=json";

const productos = [];
const productosDetalle = [];

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => productos.push(...data.feed.entry));
// .then((data) => (console.log(data.feed.entry)));

function findMatches(wordToMatch, productos) {
  return productos.filter((producto) => {
    const regex = new RegExp(wordToMatch, "gi");
    if (producto.gs$cell.col === "2") {
      return producto.content.$t.match(regex);
    }
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, productos);
  const html = matchArray
    .map((producto) => {
      return `
        <li>
            <span class="name">${producto.content.$t}</span>
        </li>
      `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.getElementById("search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
