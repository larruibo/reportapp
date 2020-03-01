const formSearch = document.querySelector("#formSearch");

const populatereportes = reportes => {
  const reportesUl = document.querySelector("#reportes");
  reportesUl.innerHTML = "";

  reportes.forEach(g => {
    const reporteLi = document.createElement("li");
    reporteLi.textContent = `${g.date} : ${g.reporte} : ${g.violencia} : ${g.latitud} : ${g.longitud}`;

    reportesUl.appendChild(reporteLi);
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
