import { getAllParties } from "../fetch-facade.js";

export function initiatePartyDropdown() {
    getAllParties()
        .then(parties => {
        renderPartyOptions(parties)
    })
}

function renderPartyOptions(parties) {
    const partyOptions =
        parties.map(party => {
                createPartyOption(party)
            }
        ).join("\n")
    document.getElementById("party-select-dropdown").innerHTML = partyOptions;
}

function createPartyOption(party) {
    return `<option> ${party.name} </option>`
}