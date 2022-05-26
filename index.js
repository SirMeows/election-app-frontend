import "https://unpkg.com/navigo"

import {
    loadTemplate, adjustForMissingHash, renderTemplate, setActiveLink
} from "./utils.js"
import { renderParties } from "./pages/show-parties.js"
import { renderCandidates} from "./pages/show-candidates.js"
import { getAllCandidates, getCandidatesForParty } from "./fetch-facade.js";
import { initiatePartyDropdown } from "./pages/add-candidate.js";

window.addEventListener("load", async () => {
    const router = new Navigo("/", { hash: true })
    const templateShowParties = await loadTemplate("./pages/show-parties.html")
    const templateShowCandidates = await loadTemplate("./pages/show-candidates.html")
    const templateAddCandidate = await loadTemplate("./pages/add-candidate.html")

    adjustForMissingHash()
    await router
        .hooks({
            before(done, match) {
                setActiveLink("top-nav", match.url)
                done()
            }
        })
        .on("/show-parties", () => {
            renderTemplate(templateShowParties, "content")
            renderParties()
        })
        .on("/show-candidates", () => {
            renderTemplate(templateShowCandidates, "content")
            var candidates = getAllCandidates()
            renderCandidates(candidates)
        })

        .on("/show-candidates/:partyId", (navigoMatch) => {
            renderTemplate(templateShowCandidates, "content")
            var candidates = getCandidatesForParty(navigoMatch.data.partyId)
            renderCandidates(candidates)
        })
        .on("/add-candidate", () => {
            renderTemplate(templateAddCandidate, "content")
            initiatePartyDropdown()
        })


        /*.on("/edit-candidate/:candidateId", (navigoMatch) => {
            renderTemplate(templateEditCandidate, "content")
            var candidate = getCandidateById(navigoMatch.data.candidateId)
            editCandidate(candidate)
        })*/
})