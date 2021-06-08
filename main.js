"use strict";

const endpoint =
  "https://spreadsheets.google.com/feeds/cells/1IHYqDTik3RRIDZH2N5v1Kq1GcIvpVvIjGrBFk9Eg9P8/15/public/full?alt=json"; // Json Hoja de calculos general ferrreteria.
// const endpoint =
//   "https://spreadsheets.google.com/feeds/cells/1URGwdSagiUivMfv4SkdBp9zb5HiVjTHBQzTicKiwSiQ/1/public/full?alt=json"; // Json hoja de calcula precios solos.

const productos = [];

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => productos.push(...data.feed.entry));

function findMatches(wordToMatch, productos) {
  return productos.filter((producto) => {
    const regex = new RegExp(wordToMatch, "gi");
    return producto.content.$t.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, productos);
  const html = matchArray
    .map((producto) => {
      return `
        <li>
            <span class="name">
              <b>${producto.content.$t.split(" > ")[0]}</b> 
                - ${producto.content.$t.split(" > ")[1]} -
              <b> $ ${
                producto.content.$t.split(" > ")[2].split(",")[0]
              },${producto.content.$t
        .split(" > ")[2]
        .split(",")[1]
        .slice(0, 2)}</b>
            </span>
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
