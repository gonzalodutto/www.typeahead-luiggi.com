"use strict";

// Se contiene en una constante la direccion web del archivo json:
const endpoint =
  "https://spreadsheets.google.com/feeds/cells/1URGwdSagiUivMfv4SkdBp9zb5HiVjTHBQzTicKiwSiQ/1/public/full?alt=json";

// Se crea una array vacia (y se contiene en constantes) para los datos (a filtrar y extraer del archivo json remoto) de los productos:
//
const productos = [];
const productosDetalle = [];

// Se solicita informacion del origen remoto json:
fetch(endpoint)
  .then((res) => res.json())
  // Se guarda en la array contenida en la constante "productos" los datos necesario (se extrae la informacion correcpondiente a cada celda del documento Google Sheet):
  .then((data) => productos.push(...data.feed.entry));

// En la siguiente funcion se crea el proceso por el cual se hace el filtrado de la palabra buscada:
function findMatches(wordToMatch, productos) {
  return productos.filter((producto) => {
    const regex = new RegExp(wordToMatch, "gi");
    // Con el "if" siguiente se condiciona el filtrado solo a las celdas pertenecientes a la columna 2:
    if (producto.gs$cell.col === "2") {
      // La siguiente linea de codigo regresa todos los articulos que coinciden con la el criterio de la "Expresion regular" creada:
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
            <span class="name">${producto.content.$t} ($Precio)</span>
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
