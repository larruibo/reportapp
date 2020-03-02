//This js file let us modify the DOM depending on the user's input.
//Filter the reports by date or by keyword

// antoine noreau: The date and keyword filters work very well, quick and responsive. Would be cool to add a date range feature.

//Get the form elements
const formSearch = document.querySelector("#formSearch");
const formSearch2 = document.querySelector("#formSearch2");

//Receive the reports and render the results
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
      reporteDiv.classList.add("alert-info");
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

//Function that fetchs the reports from an Endpoint
const onSearch = evt => {
  const query = document.querySelector("#formSearch input").value;

  fetch(`/reportes/${query}`)
    .then(res => res.json())
    .then(populatereportes);
  evt.preventDefault();
};
const onSearch2 = evt => {
  const query = document.querySelector("#formSearch2 input").value;

  fetch(`/reportes/palabra/${query}`)
    .then(res => res.json())
    .then(populatereportes);
  evt.preventDefault();
};

//Button's Listener
formSearch.addEventListener("submit", onSearch);
formSearch2.addEventListener("submit", onSearch2);
