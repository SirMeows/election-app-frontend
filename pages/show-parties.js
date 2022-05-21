import { getAllParties } from "../fetch-facade.js"

export function renderParties() {
    getAllParties()
        .then(parties => {
            renderRows(parties)
            })
}

function renderRows(parties) {
    const rows = createTableRows(parties);
    document.getElementById("get-all-parties-tbl").innerHTML = rows;
}

function createTableRows(parties) {
    console.log(parties)
    const rows = parties.sort((a,b) => a.name.localeCompare(b.name)).map(party =>// Sorting like this doesn't work for Map
        `
        <tr>
            <td> ${party.tag} </td>
            <td> <a className="nav-link active" href="#/show-candidates/${party.id}" data-navigo="" > ${party.name} </a> </td>
        </tr>       
        `).join("\n")
    return rows;

}
