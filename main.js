"use strict";

/////////////////////////////////////////////////
// Data json
const endpoint =
 // "https://spreadsheets.google.com/feeds/cells/1IHYqDTik3RRIDZH2N5v1Kq1GcIvpVvIjGrBFk9Eg9P8/15/public/full?alt=json";
 "https://sheetdb.io/api/v1/zycqsa78bnwvh";

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => productos.push(...data.feed.entry));

const productos = [];

/////////////////////////////////////////////////
// Elements
const searchInput = document.getElementById("search");
const suggestions = document.querySelector(".suggestions");
const labelDate = document.querySelector(".date");

/////////////////////////////////////////////////
// Date format
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
const locale = navigator.language;

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

/////////////////////////////////////////////////
// Functions
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
      const codigo = producto.content.$t.split(" > ")[0].padEnd(7, " ");
      const descripcion = producto.content.$t.split(" > ")[1];
      const precio = Intl.NumberFormat("de-DE").format(
        Number(producto.content.$t.split(" > ")[2].replace(",", ".")).toFixed(2)
      );
      return `
        <li>
            <span class="name"><b>${codigo}</b> - ${descripcion} - <b> $ ${precio}</b></span>
        </li>
      `;
    })
    .join("");
  suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
