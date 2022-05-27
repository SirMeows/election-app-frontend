export function renderCandidates(data) {
    data.then(candidates => {
        const rows = createTableRows(candidates);
        const tableElement = document.getElementById("get-candidates-tbl");
        tableElement.innerHTML = rows
    })
}

function createTableRows(candidates) {
    //TODO: Rather get with partyId than partyName?
    const rows = candidates.sort((a,b) => a.lastName.localeCompare(b.lastName)).map(candidateDto =>
        `
        <tr>
            <td> ${candidateDto.firstName}</td>
            <td> ${candidateDto.lastName}</td>
            <td> ${candidateDto.partyName}</td>  
        </tr>       
        `).join("\n")
    return rows;
}
