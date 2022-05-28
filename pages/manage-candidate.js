import { sortAlphabetically } from "../utils.js";

export function manageCandidateHandler(data) {
    data.then(candidates => {
        const tableElement = document.getElementById("manage-candidates-tbl");
        const rows = createTableRows(candidates);
        rows.forEach(row =>  tableElement.appendChild(row));
    })
}

function createTableRows(candidates) {
    return sortAlphabetically(candidates).map(candidateDto => createTableRow(candidateDto));
}

function createTableRow(candidate) {
    const rowTemplate = document.getElementById("candidate-row-template")
    const clonedTemplate = rowTemplate.content.cloneNode(true);
    const tdNodes = clonedTemplate.querySelectorAll("td");
    tdNodes.forEach(td => updateNode(td, candidate));
    return clonedTemplate;
}

function updateNode(td, candidate){
    td.textContent = candidate[td.id];
    console.log(candidate[td.id]);
}


