import {getAllCandidates} from "../fetch-facade.js"

export function renderCandidates() {
    getAllCandidates()
        .then(candidates => {
            renderRows(candidates)
        })
}

function renderRows(candidates) {
    const rows = createTableRows(candidates);
    document.getElementById("get-all-candidates-tbl").innerHTML = rows;
}

function createTableRows(candidates) {
    const rows = candidates.sort((a,b) => a.lastName.localeCompare(b.lastName)).map(candidate =>
    //const rows = candidates.map(candidate =>
        `
        <tr>
            <td> ${candidate.firstName}</td>
            <td> ${candidate.lastName}</td>
        </tr>       
        `).join("\n")
    return rows;
}
