import {addCandidateRequest, getAllParties} from "../fetch-facade.js";

export function initiatePartyDropdown() {
    getAllParties()
        .then(parties => {
        renderPartyOptions(parties)
    })
}

function renderPartyOptions(parties) {
    const partyOptions =
        parties.map(party => createPartyOption(party)
        ).join("\n")
    document.getElementById("party-select-dropdown").innerHTML = partyOptions;
}

function createPartyOption(party) {
    return `<option value="${party.id}"> ${party.name} </option>`
}

export function addCandidateHandler() {
    document.getElementById("add-candidate-btn").onclick = createNewCandidate;
}


const createNewCandidate = async () => {
    const partyDropdown = document.getElementById("party-select-dropdown")
    const partyId = partyDropdown.value;
    const selectedIndex = partyDropdown.selectedIndex;

    const candidateDto = {
        firstName: document.getElementById("firstName-input").value,
        lastName: document.getElementById("lastName-input").value,
        partyName: partyDropdown.options[selectedIndex].text
    }

    const req = await addCandidateRequest(partyId, candidateDto)
    console.log(JSON.stringify(req))
}