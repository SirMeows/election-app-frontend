import { sortAlphabetically } from "../utils.js";
import {deleteCandidateRequest} from "../fetch-facade.js";

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
    if(td.id.includes('edit')) {
        td.addEventListener('click', function(){
            handleEditClick(candidate.id)
        })
    } else if(td.id.includes('delete')) {
        td.addEventListener('click',  function(){
            handleDeleteClick(candidate.id)
        })
    } else {
        td.textContent = candidate[td.id];
    }
}

function handleEditClick(candidateId) {
    console.log('edit',candidateId)
}

function handleDeleteClick(candidateId) {
    console.log('delete', candidateId)
    const res = deleteCandidateRequest(candidateId)
        .then()

}


