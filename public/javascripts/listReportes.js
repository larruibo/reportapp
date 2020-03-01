const formSearch = document.querySelector("#formSearch");

const populatereportes = reportes => {
  const reportesDiv = document.querySelector("#reportes");
  reportesDiv.innerHTML = "";

  reportes.forEach(g => {
    const reporteDiv = document.createElement("div");
    if (g.violencia == "on") {
      reporteDiv.classList.add("alert");
      reporteDiv.classList.add("alert-danger");
    } else {
      reporteDiv.classList.add("alert");
      reporteDiv.classList.add("alert-secondary");
    }
    const tit = document.createElement("h3");
    const fecha = document.createElement("h5");
    const cont = document.createElement("p");
    tit.textContent = `${g.titulo}`;
    fecha.textContent = `Fecha: ${g.date} : ${g.hora}`;
    cont.textContent = `${g.reporte}`;
    reporteDiv.appendChild(tit);
    reporteDiv.appendChild(fecha);
    reporteDiv.appendChild(cont);

    reportesDiv.appendChild(reporteDiv);
  });
};

const onSearch = evt => {
  const query = document.querySelector("#formSearch input").value;

  fetch(`/reportes/${query}`)
    .then(res => res.json())
    .then(populatereportes);
  evt.preventDefault();
};
formSearch.addEventListener("submit", onSearch);
