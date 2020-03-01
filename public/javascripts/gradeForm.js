const inreportes = document.querySelector("#grade input"),
  outreportes = document.querySelector("#grade output");

const updateGrade = () => (outreportes.textContent = inreportes.value);

inreportes.addEventListener("input", updateGrade);
updateGrade();
