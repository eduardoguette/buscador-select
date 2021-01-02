// Variables

const marca = document.getElementById("marca");
const year = document.getElementById("year");
const precio_min = document.getElementById("precio-min");
const precio_max = document.getElementById("precio-max");
const puertas = document.getElementById("puertas");
const transmision = document.getElementById("transmision");
const color = document.getElementById("color");

/* selector de los resultados */
const resultado = document.getElementById("resultado");

/* Para llenar el select year */
const max = new Date().getFullYear();
const min = max - 11;

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); /* Mustras los resultados al cargar el DOM */
  getYears();
});

/* Eventos Select */

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  filtrarAuto();
});
precio_min.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});
precio_max.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

// Funciones

function mostrarAutos(autos) {
  limpiarHTML(); // Elimina el html previo
  autos.forEach(
    ({ marca, modelo, year, transmision, precio, puertas, color }) => {
      const p = document.createElement("p");
      p.className = "item-result";
      p.innerHTML = `
      ${marca} ${modelo}  -  ${year} 
      <p>
      Puertas  ${puertas}
      </p> 
      <p>
      Transmisión: ${transmision
        .replace("automatica", "Automática")
        .replace("manual", "Manual")} 
      </p>
      <ps>${color}</ps>
      <p class="text-red">
      Precio: ${precio}  
      </p>
      `;
      resultado.appendChild(p);
    }
  );
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function getYears() {
  for (i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}

/* Function que filtra en base a la busqueda */
function filtrarAuto() {
  mostrarNoResults("");
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarPuertas)
    .filter(filtrarTransmisión)
    .filter(filtrarColor);
  if (resultado.length > 0) {
    limpiarHTML();
    spinner();
    setTimeout(() => {
      mostrarAutos(resultado);
      mostrarNoResults("Resultados:");
    }, 1000);
  } else {
    spinner();
    limpiarHTML();
    setTimeout(() => {
      document.querySelector('.sk-chase').remove()
      mostrarNoResults("No hay resultados, intenta con otros términos.");
    }, 1000);
  }
}

const titleResults = document.querySelector(".title-resultado");
function mostrarNoResults(mensaje) {
  titleResults.textContent = mensaje;
}

function spinner() {
  let div = document.createElement("div");
  div.className = "sk-chase";
  div.innerHTML = `
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
`;
  titleResults.insertBefore(div, titleResults.childNodes[1]);
}

/* Funciones de alto nivel High order function (HOF) */
function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}
function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}
function filtrarMin(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}
function filtrarMax(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}
function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}
function filtrarTransmisión(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision.toLowerCase() === transmision.toLowerCase();
  }
  return auto;
}
function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color.toLowerCase() === color.toLowerCase();
  }
  return auto;
}
