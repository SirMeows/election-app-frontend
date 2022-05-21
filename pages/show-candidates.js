

export function renderCandidates(data) {
    data.then(candidates => {
        console.log("rendering candidates: ", candidates)
        const rows = createTableRows(candidates);
        const tableElement = document.getElementById("get-candidates-tbl");
        tableElement.innerHTML = rows
    })


}

function createTableRows(candidates) {
    const rows = candidates.sort((a,b) => a.lastName.localeCompare(b.lastName)).map(candidate =>
        `
        <tr>
            <td> ${candidate.firstName}</td>
            <td> ${candidate.lastName}</td>
            <td> ${candidate.partyName}</td>
        </tr>       
        `).join("\n")
    return rows;
}
